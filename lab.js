let currentLang = localStorage.getItem('preferredLanguage') || 'tr';
let translations = {};

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Önce Dili Yükle
    await loadLabLanguage(currentLang);
    
    // 2. Sonra Projeleri Çek
    fetchProjects();
});

// --- DİL YÜKLEME FONKSİYONU ---
async function loadLabLanguage(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);
        translations = await response.json();
        
        // Statik metinleri çevir (data-i18n olanlar)
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key]) el.innerText = translations[key];
        });

    } catch (e) {
        console.error("Dil yüklenemedi, varsayılan İngilizce kullanılacak.");
    }
}

// --- LİSTE ÇEKME ---
async function fetchProjects() {
    const container = document.getElementById('project-container');
    try {
        const response = await fetch('data/lab-projects.json');
        const projects = await response.json();
        
        container.innerHTML = ''; 

        projects.forEach(proj => {
            // Status rengini ve metnini belirle
            let statusKey = 'lab-status-ongoing';
            let badgeColor = 'bg-green-600';
            
            if(proj.status === 'PLANNED') { statusKey = 'lab-status-planned'; badgeColor = 'bg-gray-600'; }
            if(proj.status === 'COMPLETED') { statusKey = 'lab-status-completed'; badgeColor = 'bg-blue-600'; }

            // Özeti seçili dilde al, yoksa İngilizce, yoksa ilk bulduğunu al
            const summaryText = proj.summary[currentLang] || proj.summary['en'] || Object.values(proj.summary)[0];
            const statusText = translations[statusKey] || proj.status;

            const html = `
                <article class="report-card cursor-pointer group" onclick="loadProjectDetail('${proj.id}')">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-2xl font-bold group-hover:text-blue-600 transition-colors">${proj.title}</h2>
                        <span class="status-badge ${badgeColor}">${statusText}</span>
                    </div>
                    <p class="text-gray-700 font-mono text-sm mb-4">${summaryText}</p>
                    <div class="text-xs text-gray-400 font-mono flex justify-between">
                        <span>ID: ${proj.id}</span>
                        <span>DATE: ${proj.date}</span>
                    </div>
                </article>
            `;
            container.innerHTML += html;
        });
    } catch (error) {
        container.innerHTML = `<div class="text-red-600 font-mono">${translations['lab-error'] || 'ERROR'}</div>`;
    }
}

// --- DETAY ÇEKME ---
async function loadProjectDetail(projectId) {
    const listView = document.getElementById('view-list');
    const detailView = document.getElementById('view-detail');
    const contentDiv = document.getElementById('detail-content');

    listView.classList.add('hidden');
    detailView.classList.remove('hidden');
    contentDiv.innerHTML = `<div class="text-center font-mono mt-20">${translations['lab-loading'] || 'Loading...'}</div>`;

    try {
        const response = await fetch(`lab-projects/${projectId}.json`);
        const data = await response.json();

        // Dil verilerini seç
        const subtitle = data.subtitle[currentLang] || data.subtitle['en'];
        const objective = data.objective[currentLang] || data.objective['en'];
        const description = data.description[currentLang] || data.description['en'];
        const logs = data.logs[currentLang] || data.logs['en'] || [];

        // Status metni
        let statusKey = 'lab-status-ongoing';
        if(data.status === 'PLANNED') statusKey = 'lab-status-planned';
        const statusText = translations[statusKey] || data.status;

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
                            <strong>${translations['lab-subject']}:</strong> ${subtitle}<br>
                            <strong>${translations['lab-objective']}:</strong> ${objective}<br>
                            <strong>${translations['lab-start-date']}:</strong> ${data.startDate}
                        </p>
                        
                        <div class="p-4 bg-gray-100 text-xs font-mono border-l-4 border-black mb-6">
                            ${logs.map(log => `<div>${log}</div>`).join('')}
                        </div>

                        <p class="text-gray-800 text-sm leading-relaxed whitespace-pre-line">
                            ${description}
                        </p>
                    </div>

                    <div class="border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 min-h-[200px]">
                        <div class="text-center text-gray-400 text-xs">
                            NO VISUAL DATA
                        </div>
                    </div>
                </div>

                <div class="mt-8 pt-6 border-t border-gray-200">
                    <h3 class="text-sm font-bold mb-4">${translations['lab-growth']}</h3>
                    <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div class="h-full bg-black" style="width: ${data.growthData.progress}%"></div>
                    </div>
                    <div class="flex justify-between text-[10px] mt-1 text-gray-500">
                        <span>${translations['lab-day']} ${data.growthData.currentDay}</span>
                        <span>${translations['lab-target']} ${data.growthData.targetDay}</span>
                    </div>
                </div>
            </article>
        `;

    } catch (error) {
        contentDiv.innerHTML = `<div class="text-red-600 font-mono text-center mt-10">${translations['lab-error']}</div>`;
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

// --- LANGUAGE & THEME (Mevcut fonksiyonlarına entegre edilecek) ---
function setLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
    location.reload(); // Sayfayı yenileyerek dili uygula
}

// --- HELP MODAL ---
function showHelp() {
    alert("SYSTEM DIAGNOSTICS:\n\n- Use 'System Config' to alter visual parameters.\n- All experiments are classified.\n- Do not touch the samples.");
}