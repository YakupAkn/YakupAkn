<<<<<<< HEAD
/* YDA LABS OS v2.0 CORE */

const CONFIG = {
    sounds: { hover: 'assets/hover.mp3', click: 'assets/click.mp3' }, // Opsiyonel ses
    typingSpeed: 20
};

class LabSystem {
    constructor() {
        this.lang = localStorage.getItem('yda_lang') || 'tr';
        this.crtEnabled = localStorage.getItem('yda_crt') !== 'false'; // Default on
        this.soundEnabled = false;
        this.projects = [];
        this.translations = {};
        
        this.init();
    }

    async init() {
        this.uiBootSequence();
        await this.loadTranslations();
        await this.fetchProjects();
        this.setupCanvas();
        this.startClock();
=======

// lab.js - Integrated with i18n.js

document.addEventListener('DOMContentLoaded', () => {
    // i18n.js will trigger 'languageChanged' when translations are ready.
    // We wait for that event to fetch projects.
});

window.addEventListener('languageChanged', () => {
    console.log('Lab: Language changed, fetching projects...');
    fetchProjects();

    // Update static texts that might have been missed if they were dynamically added
    // But mostly i18n.js handles data-i18n.
    // However, if we change language, i18n.js re-runs applyTranslations().
});

// --- LİSTE ÇEKME ---
async function fetchProjects() {
    const container = document.getElementById('project-container');
    const currentLang = localStorage.getItem('preferredLanguage') || 'tr';

    // Use global translations object from i18n.js
    const t = window.translations || {};

    try {
        const response = await fetch('data/lab-projects.json');
        const projects = await response.json();
>>>>>>> 6bf48dbe5c7ac0506a05d5697152ce90268527a5
        
        // İlk ayar durumlarını uygula
        if(!this.crtEnabled) document.body.classList.remove('crt-active');
        else document.body.classList.add('crt-active');
        
        this.updateLangIndicator();
    }

    // --- SİSTEM BAŞLATMA EFEKTİ ---
    uiBootSequence() {
        const bar = document.getElementById('boot-bar');
        const screen = document.getElementById('boot-screen');
        const list = document.getElementById('view-list');

<<<<<<< HEAD
        setTimeout(() => { bar.style.width = '40%'; }, 100);
        setTimeout(() => { bar.style.width = '100%'; }, 800);
        
        setTimeout(() => {
            screen.style.opacity = '0';
            setTimeout(() => { screen.remove(); list.style.opacity = '1'; }, 500);
        }, 1200);
    }
=======
            // Özeti seçili dilde al, yoksa İngilizce, yoksa ilk bulduğunu al
            const summaryText = proj.summary[currentLang] || proj.summary['en'] || Object.values(proj.summary)[0];
            const statusText = t[statusKey] || proj.status;
>>>>>>> 6bf48dbe5c7ac0506a05d5697152ce90268527a5

    // --- VERİ YÖNETİMİ ---
    async loadTranslations() {
        try {
            const response = await fetch(`locales/${this.lang}_labs.json`);
            this.translations = await response.json();
        } catch (e) { console.warn('Lang pack missing, fallback to keys'); }
    }

    async fetchProjects() {
        try {
            // Gerçek ortamda burası fetch('data/lab-projects.json') olur.
            // Örnek veri ile simüle ediyoruz:
            const res = await fetch('data/lab-projects.json'); 
            this.projects = await res.json();
            this.renderProjects();
        } catch (e) {
            console.error('System Data Error');
        }
    }

    // --- RENDER (LİSTE GÖRÜNÜMÜ) ---
    renderProjects() {
        const container = document.getElementById('view-list');
        container.innerHTML = '';

        this.projects.forEach((proj, index) => {
            const summary = proj.summary[this.lang] || proj.summary['en'];
            const statusColor = proj.status === 'ONGOING' ? 'text-green-400' : 'text-gray-500';

            const card = document.createElement('div');
            card.className = 'project-card p-6 rounded-lg group';
            card.style.animationDelay = `${index * 100}ms`; // Kademeli giriş
            card.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                    <span class="font-mono text-xs border border-green-900 px-2 py-0.5 rounded text-green-700 bg-green-900/10">
                        ${proj.id}
                    </span>
                    <i class="ri-folder-shield-2-line text-2xl opacity-50 group-hover:text-green-400 transition-colors"></i>
                </div>
                <h3 class="text-xl font-bold mb-2 group-hover:text-white transition-colors">${proj.title}</h3>
                <div class="h-1 w-12 bg-green-900 group-hover:bg-green-500 transition-all mb-4"></div>
                <p class="text-sm text-gray-400 font-mono line-clamp-2 mb-4">${summary}</p>
                <div class="flex justify-between items-center text-xs font-mono mt-auto pt-4 border-t border-green-900/30">
                    <span class="${statusColor} animate-pulse">● ${proj.status}</span>
                    <span class="text-gray-500">${proj.date}</span>
                </div>
            `;
            card.onclick = () => this.openProject(proj.id);
            container.appendChild(card);
        });
<<<<<<< HEAD
=======
    } catch (error) {
        container.innerHTML = `<div class="text-red-600 font-mono">${t['lab-error'] || 'ERROR'}</div>`;
>>>>>>> 6bf48dbe5c7ac0506a05d5697152ce90268527a5
    }

<<<<<<< HEAD
    // --- DETAY GÖRÜNÜMÜ ---
    async openProject(id) {
        const list = document.getElementById('view-list');
        const detail = document.getElementById('view-detail');
        const content = document.getElementById('detail-content');

        // Geçiş animasyonu
        content.innerHTML = '<div class="text-center mt-20 font-mono animate-pulse">ACCESSING ENCRYPTED DATA...</div>';
        detail.classList.remove('hidden');
        
        try {
            const res = await fetch(`lab-projects/${id}.json`);
            const data = await res.json();
            this.renderDetail(data);
        } catch (e) {
            content.innerHTML = 'DATA CORRUPTED.';
        }
    }
=======
// --- DETAY ÇEKME ---
async function loadProjectDetail(projectId) {
    const listView = document.getElementById('view-list');
    const detailView = document.getElementById('view-detail');
    const contentDiv = document.getElementById('detail-content');
    const currentLang = localStorage.getItem('preferredLanguage') || 'tr';
    const t = window.translations || {};

    listView.classList.add('hidden');
    detailView.classList.remove('hidden');
    contentDiv.innerHTML = `<div class="text-center font-mono mt-20">${t['lab-loading'] || 'Loading...'}</div>`;
>>>>>>> 6bf48dbe5c7ac0506a05d5697152ce90268527a5

    renderDetail(data) {
        const content = document.getElementById('detail-content');
        const t = (key) => this.translations[key] || key; // Çeviri yardımcısı
        
        const sub = data.subtitle[this.lang] || data.subtitle['en'];
        const obj = data.objective[this.lang] || data.objective['en'];
        const desc = data.description[this.lang] || data.description['en'];
        const logs = data.logs[this.lang] || data.logs['en'];

        // Görsel veya Placeholder
        let visualArea = '';
        if(data.image) {
            visualArea = `<img src="${data.image}" class="w-full h-64 object-cover border border-green-500/30 filter grayscale hover:grayscale-0 transition-all">`;
        } else {
            visualArea = `
                <div class="w-full h-64 border border-dashed border-green-900 flex items-center justify-center bg-green-900/5">
                    <div class="text-green-900 font-mono text-center">
                        <i class="ri-eye-off-line text-4xl mb-2 block"></i>
                        NO VISUAL FEED
                    </div>
                </div>`;
        }

<<<<<<< HEAD
        content.innerHTML = `
            <div class="grid lg:grid-cols-3 gap-8 pb-20">
                <div class="lg:col-span-2 space-y-6">
                    <div class="border-b border-green-800 pb-4">
                        <div class="flex items-center gap-3 mb-2">
                            <h2 class="text-3xl font-black text-white">${data.title}</h2>
                            <span class="text-xs bg-green-900 text-green-100 px-2 py-1 rounded">${data.status}</span>
=======
        // Status metni
        let statusKey = 'lab-status-ongoing';
        if(data.status === 'PLANNED') statusKey = 'lab-status-planned';
        const statusText = t[statusKey] || data.status;

        contentDiv.innerHTML = `
            <article class="report-card relative overflow-hidden mt-8 animate-fade-in">
                <div class="absolute -right-4 -top-4 opacity-10 rotate-12 text-6xl font-black pointer-events-none">
                    ${data.id}
                </div>

                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-3xl font-bold">${data.title}</h2>
                    <span class="status-badge bg-green-600">${statusText}</span>
                </div>

                <div class="grid md:grid-cols-3 gap-8">
                    <div class="md:col-span-2 space-y-4">
                        <p class="text-sm font-mono border-b pb-4 mb-4">
                            <strong>${t['lab-subject'] || 'Subject'}:</strong> ${subtitle}<br>
                            <strong>${t['lab-objective'] || 'Objective'}:</strong> ${objective}<br>
                            <strong>${t['lab-start-date'] || 'Start Date'}:</strong> ${data.startDate}
                        </p>
                        
                        <div class="p-4 bg-gray-100 text-xs font-mono border-l-4 border-black mb-6">
                            ${logs.map(log => `<div>${log}</div>`).join('')}
>>>>>>> 6bf48dbe5c7ac0506a05d5697152ce90268527a5
                        </div>
                        <p class="text-green-600 font-mono text-sm">${sub}</p>
                    </div>

                    <div class="bg-green-900/10 p-4 rounded border-l-2 border-green-500">
                        <h4 class="text-xs font-bold text-green-400 mb-2 uppercase tracking-wider">Objectıve</h4>
                        <p class="text-sm text-gray-300 font-mono">${obj}</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xs font-bold text-green-400 uppercase tracking-wider border-b border-green-900 pb-1">Experiment Logs</h4>
                        <div class="font-mono text-xs space-y-2 max-h-60 overflow-y-auto custom-scrollbar p-2 bg-black/50 rounded">
                            ${logs.map(l => `<div class="hover:bg-green-900/20 px-2 py-1 transition-colors border-l border-transparent hover:border-green-500">${l}</div>`).join('')}
                        </div>
                    </div>

                    <div class="space-y-2">
                        <h4 class="text-xs font-bold text-green-400 uppercase tracking-wider border-b border-green-900 pb-1">Analysıs</h4>
                        <p id="typewriter-area" class="text-sm text-gray-300 leading-relaxed font-mono"></p>
                    </div>
                </div>

<<<<<<< HEAD
                <div class="space-y-6">
                    ${visualArea}

                    <div class="bg-black/50 border border-green-900 p-4 rounded">
                        <div class="flex justify-between text-xs mb-2 font-bold text-green-400">
                            <span>PROGRESS</span>
                            <span>${data.growthData.progress}%</span>
                        </div>
                        <div class="w-full bg-green-900/30 h-2 rounded-full overflow-hidden">
                            <div class="h-full bg-green-500 shadow-[0_0_10px_#00ff41]" style="width: ${data.growthData.progress}%"></div>
                        </div>
                        <div class="flex justify-between text-[10px] mt-2 text-gray-500 font-mono">
                            <span>DAY: ${data.growthData.currentDay}</span>
                            <span>TARGET: ${data.growthData.targetDay}</span>
                        </div>
                    </div>
                    
                    <div class="p-4 border border-dashed border-green-900/50 text-[10px] text-gray-500 font-mono">
                        <div>REF: ${data.id}</div>
                        <div>START: ${data.startDate}</div>
                        <div>SEC_LVL: 3</div>
=======
                <div class="mt-8 pt-6 border-t border-gray-200">
                    <h3 class="text-sm font-bold mb-4">${t['lab-growth'] || 'Growth'}</h3>
                    <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div class="h-full bg-black" style="width: ${data.growthData.progress}%"></div>
                    </div>
                    <div class="flex justify-between text-[10px] mt-1 text-gray-500">
                        <span>${t['lab-day'] || 'Day'} ${data.growthData.currentDay}</span>
                        <span>${t['lab-target'] || 'Target'} ${data.growthData.targetDay}</span>
>>>>>>> 6bf48dbe5c7ac0506a05d5697152ce90268527a5
                    </div>
                </div>
            </div>
        `;

<<<<<<< HEAD
        // Typewriter Efekti ile açıklamayı yaz
        this.typeWriter(document.getElementById('typewriter-area'), desc);
    }

    typeWriter(element, text) {
        let i = 0;
        element.innerHTML = '';
        const interval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                // Otomatik scroll
                const viewport = document.getElementById('detail-content');
                // Sadece kullanıcı aşağıdaysa scroll yap (opsiyonel)
            } else {
                clearInterval(interval);
            }
        }, 5); // Hızlı yazım
    }

    closeProject() {
        document.getElementById('view-detail').classList.add('hidden');
    }

    // --- SİSTEM AYARLARI ---
    toggleCRT() {
        this.crtEnabled = !this.crtEnabled;
        localStorage.setItem('yda_crt', this.crtEnabled);
        document.body.classList.toggle('crt-active', this.crtEnabled);
        this.updateButtons();
    }

    toggleLang() {
        const languages = ['tr', 'en', 'de', 'es'];
        // Mevcut dilin indeksi bul, bir sonrakine geç (sonuncudaysa başa dön)
        let currentIndex = languages.indexOf(this.lang);
        this.lang = languages[(currentIndex + 1) % languages.length];

        localStorage.setItem('yda_lang', this.lang);
        this.updateLangIndicator();
        
        // Yeni hazırladığımız _labs.json dosyalarını yükle
        this.loadTranslations().then(() => {
            this.fetchProjects(); // Listeyi yeni dille tekrar oluştur
            
            // Eğer detay görünümü (modal) açıksa onu kapatıp listeye dönmek en güvenlisidir
            this.closeProject();
        });
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        this.updateButtons();
    }

    updateButtons() {
        // İlgili butonların 'active' classını yönet
        const btns = document.querySelectorAll('.dock-btn');
        // (Basitlik için class toggle mantığı HTML'de onclick ile bağlanabilir)
    }

    updateLangIndicator() {
        document.getElementById('lang-indicator').innerText = this.lang.toUpperCase();
    }

    // --- EFEKTLER ---
    setupCanvas() {
        const canvas = document.getElementById('bio-canvas');
        const ctx = canvas.getContext('2d');
        let width, height, particles = [];

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        
        window.addEventListener('resize', resize);
        resize();

        // Parçacık Oluştur
        for(let i=0; i<50; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#00ff41';
            
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if(p.x < 0) p.x = width;
                if(p.x > width) p.x = 0;
                if(p.y < 0) p.y = height;
                if(p.y > height) p.y = 0;

                ctx.globalAlpha = 0.1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Ağ bağlantıları
            ctx.strokeStyle = '#00ff41';
            ctx.lineWidth = 0.5;
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if(dist < 100) {
                        ctx.globalAlpha = 0.1 - (dist/100)*0.1;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };
        animate();
    }

    startClock() {
        setInterval(() => {
            const now = new Date();
            document.getElementById('clock').innerText = now.toLocaleTimeString('tr-TR');
        }, 1000);
    }
}

// Sistemi Başlat
const System = new LabSystem();
=======
    } catch (error) {
        contentDiv.innerHTML = `<div class="text-red-600 font-mono text-center mt-10">${t['lab-error'] || 'Error loading project'}</div>`;
    }
}

function closeProject() {
    document.getElementById('view-detail').classList.add('hidden');
    document.getElementById('view-list').classList.remove('hidden');
    window.scrollTo(0, 0);
}


// --- BIOSENSOR CONTROLS ---
function toggleBiosensor(state) {
    const layer = document.getElementById('biosensor-layer');
    if (state) {
        layer.classList.remove('hidden');
        // Mouse takibi başlat
        document.addEventListener('mousemove', updateCoords);
    } else {
        layer.classList.add('hidden');
        document.removeEventListener('mousemove', updateCoords);
    }
}

function updateCoords(e) {
    const el = document.getElementById('mouse-coords');
    if(el) el.innerText = `X:${e.clientX} Y:${e.clientY}`;
}

// --- THEME ---
function setTheme(theme) {
    // Basic Dark/Light mode implementation
    if (theme === 'dark') {
        document.body.style.backgroundColor = '#111';
        document.body.style.color = '#f4f4f4';

        const gridBg = document.querySelector('.grid-bg');
        if(gridBg) {
             gridBg.style.backgroundImage = `
                linear-gradient(#333 1px, transparent 1px),
                linear-gradient(90deg, #333 1px, transparent 1px)
             `;
        }

        // Styles for dynamic elements
        const style = document.createElement('style');
        style.id = 'dark-theme-style';
        style.innerHTML = `
            .report-card { background: #222; border-color: #444; color: #f4f4f4; }
            .back-btn { background: #222; border-color: #fff; color: #fff; }
            .back-btn:hover { background: #fff; color: #000; }
        `;
        document.head.appendChild(style);

    } else {
        // Light (Default)
        document.body.style.backgroundColor = '';
        document.body.style.color = '';

        const gridBg = document.querySelector('.grid-bg');
        if(gridBg) gridBg.style.backgroundImage = '';

        const style = document.getElementById('dark-theme-style');
        if(style) style.remove();
    }
}
>>>>>>> 6bf48dbe5c7ac0506a05d5697152ce90268527a5
