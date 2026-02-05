import time
import random
import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# --- AYARLAR ---
HEDEF_SAYI = 10  # Kaç işletme çekilecek? (Test için az tut)
ARAMA_TERIMI = "Oto Yıkama" # Burayı değiştir

def random_sleep(min_s=1, max_s=3):
    time.sleep(random.uniform(min_s, max_s))

def get_data_atlas():
    # Tarayıcı Ayarları
    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")
    options.add_argument("--lang=tr-TR") 
    # options.add_argument("--headless") # Arka planda çalışması için bunu açabilirsin ama şimdilik kapalı kalsın, izle.

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    wait = WebDriverWait(driver, 10)

    veriler = []

    try:
        print(f"Bot Başlatılıyor: {ARAMA_TERIMI}")
        driver.get(f"https://www.google.com/maps/search/{ARAMA_TERIMI}")
        random_sleep(3, 5)

        # 1. LİSTEYİ YÜKLEME (SCROLL)
        # Sol paneldeki işletme listesini bul
        # Not: Google Maps'te 'role="feed"' genelde listeyi tutan div'dir.
        try:
            scrollable_div = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'div[role="feed"]')))
        except:
            print("Liste alanı bulunamadı. İnternet yavaş veya Google yapıyı değiştirdi.")
            return

        print("İşletmeler listeleniyor...")
        
        # Yeterli sayıya ulaşana kadar scroll yap
        while True:
            cards = driver.find_elements(By.CSS_SELECTOR, "a.hfpxzc") # İşletme kartlarının sınıfı
            if len(cards) >= HEDEF_SAYI:
                break
            
            # Scroll yap
            driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight", scrollable_div)
            random_sleep(2, 3)
            print(f"Yüklenen: {len(cards)}")
            
            # Eğer sayfa sonuna geldiysek ve daha fazla yüklenmiyorsa döngüyü kır (Sonsuz döngü koruması)
            if len(cards) > 50 and len(cards) < HEDEF_SAYI: 
                 # Bazen Google max 20-30 sonuç gösterir, zorlamayalım.
                 break

        print(f"Toplam {len(cards)} aday bulundu. Detaylar çekiliyor...")

        # 2. DETAYLARI ÇEKME (TIKLAMA DÖNGÜSÜ)
        # Kartları tekrar buluyoruz (bazen DOM yenilenir)
        cards = driver.find_elements(By.CSS_SELECTOR, "a.hfpxzc")

        for index, card in enumerate(cards[:HEDEF_SAYI]):
            try:
                print(f"--- İşleniyor ({index + 1}/{HEDEF_SAYI}) ---")
                
                # Kartın görünür olmasını sağla
                driver.execute_script("arguments[0].scrollIntoView();", card)
                
                # TIKLA
                card.click()
                random_sleep(2, 4) # Detay panelinin açılmasını bekle

                # VERİLERİ ÇEK
                # İsim (Genellikle h1 etiketindedir)
                try:
                    isim = driver.find_element(By.TAG_NAME, "h1").text
                except:
                    isim = "İsim Bulunamadı"

                # Telefon ve Web Sitesini Bulmak için XPATH kullanacağız.
                # Google Maps'te telefon ikonları genelde belirli bir yapıdadır.
                # '0' veya '+90' ile başlayan butonları arayabiliriz veya ikon class'ına bakabiliriz.
                
                telefon = "Yok"
                website = "Yok"

                # Detay panelindeki tüm buton-benzeri alanları tarayalım
                # Bu yöntem class isimleri değişse bile çalışır (Daha sağlam)
                detay_alani = driver.find_element(By.CSS_SELECTOR, 'div[role="main"]')
                texts = detay_alani.text.split('\n')
                
                for text in texts:
                    # Basit Telefon Algılama Mantığı
                    if text.startswith("+90") or (text.startswith("0") and len(text) > 10):
                        telefon = text
                    
                    # Basit Web Sitesi Algılama (.com .net vb içeren)
                    if ".com" in text or ".net" in text or ".org" in text or "www." in text:
                        # Google bazen 'Web sitesi: blabla.com' yazar, temizleyelim
                        website = text

                print(f"📍 {isim} | 📞 {telefon}")

                veriler.append({
                    "İsim": isim,
                    "Telefon": telefon,
                    "Website": website,
                    "Kategori": ARAMA_TERIMI,
                    "Durum": "Başarılı"
                })

                # Geri butonuna basmaya gerek yok, listedeki bir sonraki elemana tıklayınca zaten değişecek.
                
            except Exception as e:
                print(f"Hata oluştu: {e}")
                # Hata olsa bile listeye ekle ki kayıp olmasın
                veriler.append({"İsim": "HATA", "Durum": str(e)})

    except Exception as e:
        print("Genel Hata:", e)

    finally:
        # 3. KAYDETME
        if veriler:
            df = pd.read_json(pd.DataFrame(veriler).to_json()) # Türkçe karakter sorunu olmasın diye dolaylı çeviri
            df = pd.DataFrame(veriler)
            dosya_adi = f"{ARAMA_TERIMI.replace(' ', '_')}_Lead_Listesi.xlsx"
            df.to_excel(dosya_adi, index=False)
            print(f"✅ Bitti! {dosya_adi} oluşturuldu.")
        
        driver.quit()

# Çalıştır
get_data_atlas()