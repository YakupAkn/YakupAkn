
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
        
        container.innerHTML = ''; 

        projects.forEach(proj => {
            // Status rengini ve metnini belirle
            let statusKey = 'lab-status-ongoing';
            let badgeColor = 'bg-green-600';
            
            if(proj.status === 'PLANNED') { statusKey = 'lab-status-planned'; badgeColor = 'bg-gray-600'; }
            if(proj.status === 'COMPLETED') { statusKey = 'lab-status-completed'; badgeColor = 'bg-blue-600'; }

            // Özeti seçili dilde al, yoksa İngilizce, yoksa ilk bulduğunu al
            const summaryText = proj.summary[currentLang] || proj.summary['en'] || Object.values(proj.summary)[0];
            const statusText = t[statusKey] || proj.status;

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
        container.innerHTML = `<div class="text-red-600 font-mono">${t['lab-error'] || 'ERROR'}</div>`;
    }
}

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
                    <h3 class="text-sm font-bold mb-4">${t['lab-growth'] || 'Growth'}</h3>
                    <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div class="h-full bg-black" style="width: ${data.growthData.progress}%"></div>
                    </div>
                    <div class="flex justify-between text-[10px] mt-1 text-gray-500">
                        <span>${t['lab-day'] || 'Day'} ${data.growthData.currentDay}</span>
                        <span>${t['lab-target'] || 'Target'} ${data.growthData.targetDay}</span>
                    </div>
                </div>
            </article>
        `;

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
