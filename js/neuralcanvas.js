// Blog content as JSON
const blogData = [
    {
        date: '10.06.2026',
        tag: 'Blog 01',
        title: 'Başlangıç: NeuralCanvas fikri',
        content: 'Bu proje, beyin sinyallerini görsel bir dile çevirebilen bir araştırma alanı olarak kurgulandı. İlk hedef bitmiş ürün değil, okunabilir bir araştırma akışı kurmaktı.'
    }
];

const flowData = {
    nodes: [
        { id: 'source', x: 60, y: 40, title: '1. Veri Kaynağı', subtitle: 'EEG / sensör / deneysel giriş' },
        { id: 'preprocess', x: 280, y: 40, title: '2. Ön İşleme', subtitle: 'Gürültü azaltma / temizleme' },
        { id: 'model', x: 500, y: 40, title: '3. Model', subtitle: 'Sınıflandırma / pattern' },
        { id: 'visual', x: 720, y: 40, title: '4. Görsel Çıktı', subtitle: 'Canvas ve sunum' }
    ],
    edges: [
        { from: 'source', to: 'preprocess' },
        { from: 'preprocess', to: 'model' },
        { from: 'model', to: 'visual' }
    ]
};

function createSVGElement(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

function renderFlowGraph() {
    const flowGraph = document.getElementById('flow-graph');
    if (!flowGraph) return;
    flowGraph.innerHTML = '';
    const defs = createSVGElement('defs');
    const marker = createSVGElement('marker');
    marker.setAttribute('id', 'arrowhead');
    marker.setAttribute('markerWidth', '10');
    marker.setAttribute('markerHeight', '10');
    marker.setAttribute('refX', '8');
    marker.setAttribute('refY', '5');
    marker.setAttribute('orient', 'auto');
    marker.setAttribute('markerUnits', 'strokeWidth');
    const markerPath = createSVGElement('path');
    markerPath.setAttribute('d', 'M0,0 L10,5 L0,10 Z');
    markerPath.setAttribute('fill', 'rgba(255, 61, 0, 0.85)');
    marker.appendChild(markerPath);
    defs.appendChild(marker);
    flowGraph.appendChild(defs);
    const nodeWidth = 160;
    const nodeHeight = 100
    flowData.edges.forEach(edge => {
        const source = flowData.nodes.find(n => n.id === edge.from);
        const target = flowData.nodes.find(n => n.id === edge.to);
        if (!source || !target) return;
        const startX = source.x + nodeWidth;
        const startY = source.y + nodeHeight / 2;
        const endX = target.x;
        const endY = target.y + nodeHeight / 2;
        const path = createSVGElement('path');
        path.setAttribute('class', 'edge-line');
        path.setAttribute('d', `M${startX} ${startY} Q${(startX + endX) / 2} ${startY} ${endX} ${endY}`);
        path.setAttribute('marker-end', 'url(#arrowhead)');
        flowGraph.appendChild(path);
    });
    flowData.nodes.forEach(node => {
        const group = createSVGElement('g');
        group.setAttribute('transform', `translate(${node.x}, ${node.y})`);
        const rect = createSVGElement('rect');
        rect.setAttribute('class', 'node-rect');
        rect.setAttribute('x', '0');
        rect.setAttribute('y', '0');
        rect.setAttribute('width', nodeWidth.toString());
        rect.setAttribute('height', nodeHeight.toString());
        rect.setAttribute('rx', '12');
        rect.setAttribute('ry', '12');
        group.appendChild(rect);
        const title = createSVGElement('text');
        title.setAttribute('class', 'node-title');
        title.setAttribute('x', '12');
        title.setAttribute('y', '35');
        title.setAttribute('font-size', '16');
        title.textContent = node.title;
        group.appendChild(title);
        const subtitle = createSVGElement('text');
        subtitle.setAttribute('class', 'node-subtitle');
        subtitle.setAttribute('x', '12');
        subtitle.setAttribute('y', '62');
        subtitle.setAttribute('font-size', '12');
        subtitle.textContent = node.subtitle;
        group.appendChild(subtitle);
        flowGraph.appendChild(group);
    });
}
function renderBlogArticles() {
    const blogList = document.getElementById('blog-list');
    if (!blogList) return;
    blogList.innerHTML = blogData.map(item => `
        <article class="rounded-3xl border border-black/10 bg-white p-6 card-hover">
            <div class="flex items-center justify-between gap-4 mb-4">
                <span class="text-[11px] uppercase tracking-[0.25em] font-bold text-primary-700">${item.date}</span>
                <span class="text-xs text-zinc-400 uppercase tracking-[0.2em]">${item.tag}</span>
            </div>
            <h4 class="text-2xl font-display font-bold uppercase mb-3">${item.title}</h4>
            <p class="text-zinc-600 text-sm leading-relaxed">${item.content}</p>
        </article>
    `).join('');
}


function initCursor() {
    const cursor = document.getElementById('cursor');
    const outline = document.getElementById('cursor-outline');
    if (!cursor || !outline) return;
    let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });
    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        outline.style.left = `${outlineX}px`;
        outline.style.top = `${outlineY}px`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    const hoverables = document.querySelectorAll('a, button, .card-hover, .stat-card');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}
function initMobileNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    if (!menuToggle || !mobileNav || !mobileNavClose) return;
    menuToggle.addEventListener('click', () => {
        mobileNav.classList.remove('hidden');
    });
    mobileNavClose.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
    });
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.add('hidden');
        });
    });
    mobileNav.addEventListener('click', (e) => {
        if (e.target === mobileNav) {
            mobileNav.classList.add('hidden');
        }
    });
}
function initScrollHeader() {
    const header = document.getElementById('main-header');
    const progress = document.getElementById('scroll-progress');
    if (!header || !progress) return;
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progress.style.width = `${percent}%`;
        if (scrollTop > 50) {
            header.classList.add('nav-blur', 'py-4');
            header.classList.remove('py-5');
        } else {
            header.classList.remove('nav-blur', 'py-4');
            header.classList.add('py-5');
        }
    });
}
function initializePage() {
    renderBlogArticles();
    renderFlowGraph();
    initCursor();
    initMobileNavigation();
    initScrollHeader();
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}
