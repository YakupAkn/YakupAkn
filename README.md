# Yakup Delil Akın
Software Developer

Portfolio: https://yakupakn.github.io/YakupAkn/
LinkedIn: https://linkedin.com/in/yakupdelilakin

## About

Hi! I'm **Yakup Delil Akın**, a software developer working on brain-computer interfaces, web development, and cybersecurity. My long-term goal is neuroengineering.

## Selected Projects

### 1. [NeuralCanvas](https://yakupakn.github.io/YakupAkn/neuralcanvas)
Open-source BCI research platform that turns brain signals into visual output.
- **Result:** 80% single-subject motor imagery classification accuracy on PhysioNet data (FBCSP + SVM).
- **Tech:** Python, EEG signal processing, FBCSP, SVM.

*TR: Beyin sinyallerini görsele çeviren açık kaynaklı BCI araştırma platformu.*

### 2. [AthleticoCore](https://athleticocore.netlify.app)
Browser-based, real-time exercise form analysis and performance tracking. Analyzes posture through the camera and gives instant feedback.
- **Tech:** JavaScript, MediaPipe, OpenCV, Tailwind CSS.

*TR: Kamerayla anlık egzersiz formu analizi yapan tarayıcı uygulaması.*

### 3. [Nebula](https://nebulateamapp.vercel.app)
Real-time, multi-tenant Kanban board.
- **Features:** Magic link auth, full RLS (Row Level Security), live on Vercel.
- **Tech:** Next.js, TypeScript, Supabase, Vercel.

*TR: Gerçek zamanlı, çok kiracılı Kanban panosu.*

### 4. [anlat](https://github.com/YakupAkn/anlat)
Open-source analysis tool that runs a suspicious file in a sandbox and explains what it does in plain language.
- **Tech:** Python, sandbox, MIT license.

*TR: Şüpheli dosyanın ne yaptığını sade dille anlatan analiz aracı.*

### 5. [guard](https://github.com/YakupAkn/guard)
Windows security tool that records the lock screen with the camera and uses face recognition to show who touched your computer.
- **Tech:** Python, face recognition, OpenCV.

*TR: Bilgisayarına kimin dokunduğunu gösteren kilit ekranı güvenlik aracı.*

### 6. [link-kontrol](https://github.com/YakupAkn/link-kontrol)
Chrome extension that scans links and flags fake ones. Checks lookalike domains, foreign characters, and http/https status with a rule engine and database.
- **Tech:** JavaScript, Chrome Extension (Manifest), Python.

*TR: Sahte linkleri tespit eden Chrome eklentisi.*

### 7. [MyBad](https://github.com/YakupAkn/MyBad)
Tool that finds forgotten files on a messy drive using Everything search, guided questions, and date filters.
- **Tech:** Python, SQLite, Everything.

*TR: Dağınık diskte unutulan dosyaları bulan araç.*

### 8. [Zinciri Kır](https://github.com/YakupAkn/zinciri-kir)
Open-source, privacy-focused PWA that helps people overcome addictions. No backend.
- **Tech:** JavaScript, PWA.

*TR: Bağımlılıkları yenmeye yardım eden, backend'siz, gizlilik odaklı PWA.*

## More Projects

- [StudyForce](https://github.com/YakupAkn/StudyForce): Study tool I started building during exam week to stay focused.
- [OpenSpatial](https://github.com/YakupAkn/OpenSpatial): Open-source spatial audio effects desktop app.

## Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Languages** | ![Python](https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white) ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black) ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white) |
| **Web** | ![Next.js](https://img.shields.io/badge/-Next.js-000000?logo=nextdotjs&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) PWA, Chrome Extension |
| **Database** | ![Supabase](https://img.shields.io/badge/-Supabase-3FCF8E?logo=supabase&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white) ![SQLite](https://img.shields.io/badge/-SQLite-003B57?logo=sqlite&logoColor=white) |
| **AI & Vision** | ![OpenCV](https://img.shields.io/badge/-OpenCV-5C3EE8?logo=opencv&logoColor=white) ![MediaPipe](https://img.shields.io/badge/-MediaPipe-0097A7?logo=google&logoColor=white) YOLOv8, DeepFace |
| **BCI & Signal Processing** | EEG, FBCSP, SVM, PhysioNet |
| **Deploy** | ![Vercel](https://img.shields.io/badge/-Vercel-000000?logo=vercel&logoColor=white) ![Netlify](https://img.shields.io/badge/-Netlify-00C7B7?logo=netlify&logoColor=white) ![GitHub Pages](https://img.shields.io/badge/-GitHub_Pages-222222?logo=github&logoColor=white) |
| **Hardware** | ESP32, Deneyap Kart |

## Site Structure

The portfolio is a static site served from GitHub Pages. There is no build step: the files in this repository are what gets published. *TR: Statik bir site; build adımı yok, depodaki dosyalar doğrudan yayınlanır.*

```
.
├── index.html            Home: intro, selected projects, about, contact
├── projeler.html         All projects (data loaded from projeler.json)
├── urunler.html          Live digital products (+ Person / ProfessionalService / FAQPage JSON-LD)
├── athletico.html        Athletico (sports tracking PWA)
├── athleticocore.html    AthleticoCore (camera-based exercise form analysis)
├── neuralcanvas.html     NeuralCanvas (BCI research log)
├── phantomlabs.html      Phantom Labs (offline security research framework)
├── zincirikir.html       Zinciri Kır (addiction-recovery PWA)
├── box.html              Boxing page (data in box.json)
├── oyun*.html, drone-simulator.html   Small browser games and simulations
├── 404.html              Not-found page
├── js/
│   ├── layout.js         Shared header and footer (single source for all pages)
│   ├── game-common.js    Shared helpers for the game pages
│   ├── i18n.js           Language switching (9 languages)
│   ├── index.js, main.js, neuralcanvas.js   Page-specific scripts
├── css/                  Page styles
├── locales/              Translation files: tr, en, es, de, fr, it, pt, ru, jp
├── images/               Logos, icons, screenshots
├── tools/wss.py          Favicon generator (run from anywhere: python tools/wss.py)
├── sw.js, manifest.json  Service worker (offline support) and PWA manifest
├── sitemap.xml, ROBOTS.txt   Search engine files
├── llms.txt              Plain-text site summary for language-model tools
├── projeler.json         Project data (source of truth for the project pages)
└── box.json              Data for the boxing page
```

Texts are translated through `locales/*.json`; `js/layout.js` injects the common header and footer, so navigation or footer changes are made in one place.

## Machine-Readable Sources

- [`projeler.json`](projeler.json): structured project data (titles and short descriptions in 9 languages; subtitle and full description in Turkish only; year, tags, technologies, role, demo links). It is the source the project pages read from, and `llms.txt` points to it.
- [`llms.txt`](llms.txt): short plain-text description of who I am, what each page contains, and how to reach me.
- [`sitemap.xml`](sitemap.xml): list of public pages.
- JSON-LD: `index.html` defines the `Person` entity; `urunler.html` adds service and FAQ data and reuses the same `@id`.

*TR: Makine okunabilir kaynaklar yukarıdadır; projelerin tek veri kaynağı `projeler.json`'dır.*

## Contact and Limits

This is a static site: there is no API, form handler or job-intake endpoint. The only way to reach me is the contact information above and in `llms.txt` (email: yakupdelilakin@gmail.com, plus the GitHub and LinkedIn profiles). Tools that read this site can learn about my work, but cannot assign tasks to me through it.
