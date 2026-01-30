import json
import os
from datetime import datetime

DATA_FILE = 'data.json'

def load_data():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_data(data):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def add_entry():
    print("\n--- YENİ GİRİŞ EKLE ---")
    title = input("Başlık: ")
    category = input("Kategori (Projeler/Kişisel/Bilgi Bankası/Fikirler): ")
    tags = input("Etiketler (virgülle ayır): ").split(',')
    tags = [t.strip() for t in tags]
    
    print("İçerik (Markdown destekli, bitince yeni satırda 'END' yazıp enter'a bas):")
    lines = []
    while True:
        line = input()
        if line == 'END':
            break
        lines.append(line)
    content = '\n'.join(lines)
    
    data = load_data()
    new_id = 1 if not data else max(d['id'] for d in data) + 1
    
    new_entry = {
        "id": new_id,
        "title": title,
        "category": category,
        "tags": tags,
        "content": content,
        "date": datetime.now().strftime("%Y-%m-%d")
    }
    
    data.insert(0, new_entry) # En yeni en başa
    save_data(data)
    print(f"\n[+] '{title}' başarıyla kaydedildi!")

if __name__ == "__main__":
    while True:
        print("\n1. Yeni Giriş Ekle")
        print("2. Çıkış")
        choice = input("Seçim: ")
        if choice == '1':
            add_entry()
        elif choice == '2':
            break