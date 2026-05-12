/* ===================== THE TIME-TRAVELER'S AGORA: LUXURY ENGINE ===================== */

const App = {
    currentEra: 'ancient',
    currentStep: 0,
    userScores: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
    typewriterTimeout: null,
    
    init() {
        console.log("Agora Luxury Engine Initializing...");
        this.bindEvents();
        this.initFX();
        this.goTo('screen-landing');
    },

    bindEvents() {
        const unlockAudio = () => {
            const bgm = document.getElementById('bgm');
            if (bgm) bgm.play().catch(() => {});
            document.removeEventListener('click', unlockAudio);
        };
        document.addEventListener('click', unlockAudio);
    },

    initFX() {
        if (window.particlesJS) {
            particlesJS('particles-js', {
                "particles": {
                    "number": { "value": 30, "density": { "enable": true, "value_area": 800 } },
                    "color": { "value": "#d4af37" },
                    "opacity": { "value": 0.2, "random": true },
                    "size": { "value": 1.5, "random": true },
                    "line_linked": { "enable": false },
                    "move": { "enable": true, "speed": 0.5, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
                }
            });
        }
    },

    goTo(screenId) {
        console.log("Transitioning to:", screenId);
        const screens = document.querySelectorAll('.screen');
        const target = document.getElementById(screenId);
        
        if (!target) return;

        // 1. Hide all active screens (without delay to prevent overlap)
        screens.forEach(s => { 
            if (s !== target) {
                s.classList.remove('active'); 
                s.style.display = 'none';
            }
        });
        
        // 2. Show target screen
        target.style.display = 'flex';
        setTimeout(() => { 
            target.classList.add('active'); 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }, 50);
    },

    async startQuest(era) {
        this.currentEra = era || 'ancient';
        this.currentStep = 0;
        this.userScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        this.goTo('screen-quest');
        setTimeout(() => renderQuestion(), 1000);
    }
};

// Global Handlers
function goTo(id) { App.goTo(id); }
function startQuest(era) { App.startQuest(era); }
function openGallery() { 
    App.goTo('screen-hall'); 
    setTimeout(() => renderGallery('ancient'), 1000);
}

function renderQuestion() {
    const eraData = QUEST_DATA[App.currentEra];
    if (!eraData || !eraData[App.currentStep]) return;
    
    const data = eraData[App.currentStep];
    const textEl = document.getElementById('typewriterText');
    const optionsWrap = document.getElementById('optionsWrap');
    
    document.getElementById('stepLabel').textContent = `COORD: ${String(App.currentStep + 1).padStart(2, '0')} / 12`;
    document.getElementById('progressBar').style.width = `${((App.currentStep + 1) / 12) * 100}%`;
    
    optionsWrap.innerHTML = '';
    typewrite(textEl, data.q, () => {
        const opts = [{ text: data.a1, val: 'a1' }, { text: data.a2, val: 'a2' }];
        opts.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt.text;
            btn.style.opacity = '0';
            btn.onclick = () => handleAnswer(opt.val);
            optionsWrap.appendChild(btn);
            setTimeout(() => {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, idx * 300);
        });
    });
}

function typewrite(el, text, callback) {
    if (App.typewriterTimeout) clearTimeout(App.typewriterTimeout);
    el.textContent = '';
    let i = 0;
    function next() {
        if (i < text.length) {
            el.textContent += text[i];
            i++;
            App.typewriterTimeout = setTimeout(next, 70);
        } else if (callback) callback();
    }
    next();
}

function handleAnswer(choice) {
    const eraData = QUEST_DATA[App.currentEra];
    const weights = eraData[App.currentStep].weight[choice];
    if (weights) {
        for (const [key, val] of Object.entries(weights)) App.userScores[key] += val;
    }
    App.currentStep++;
    if (App.currentStep < 12) renderQuestion();
    else processResult();
}

function processResult() {
    App.goTo('screen-loading');
    setTimeout(() => {
        const s = App.userScores;
        const mbti = [s.E >= s.I ? 'E' : 'I', s.S >= s.N ? 'S' : 'N', s.T >= s.F ? 'T' : 'F', s.J >= s.P ? 'J' : 'P'].join('');
        const candidates = PHILS_DATA.filter(p => p.era === App.currentEra);
        let match = candidates[0], max = -1;
        candidates.forEach(p => {
            let score = 0;
            for (let i = 0; i < 4; i++) if (p.mbti[i] === mbti[i]) score++;
            if (score > max) { max = score; match = p; }
        });
        showResult(match, mbti);
    }, 4500);
}

function showResult(phil, mbti) {
    document.getElementById('resultMBTI').textContent = mbti;
    document.getElementById('resultName').textContent = phil.name;
    document.getElementById('resultQuote').textContent = `"${phil.quote}"`;
    document.getElementById('resultDesc').textContent = phil.modifier;
    document.getElementById('resultPortrait').style.backgroundImage = `url('${phil.portrait}')`;
    document.getElementById('resultThought').textContent = phil.thought;
    document.getElementById('resultStory').textContent = phil.story;
    App.goTo('screen-result');
}

/* ===================== GALLERY ===================== */
function filterGallery(era, btn) {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderGallery(era);
}

function renderGallery(era) {
    const grid = document.getElementById('hall-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const filtered = PHILS_DATA.filter(p => p.era === era);
    filtered.forEach((p, idx) => {
        const card = document.createElement('div');
        card.className = 'hall-card';
        card.innerHTML = `
            <div class="card-frame">
                <img src="${p.portrait}" class="card-img" alt="${p.name}">
            </div>
            <div class="hall-card-info">
                <p class="modal-mbti-tag" style="font-size: 0.6rem; margin-bottom: 0.5rem;">${p.mbti}</p>
                <h4 class="kr-serif" style="font-size: 1.1rem; color: var(--ivory);">${p.name}</h4>
                <p class="kr-serif" style="font-size: 0.75rem; color: var(--gold); opacity: 0.8;">${p.modifier}</p>
            </div>
        `;
        card.onclick = () => openProfile(p.id);
        grid.appendChild(card);
    });
}

function openProfile(id) {
    const p = PHILS_DATA.find(item => item.id === id);
    if (!p) return;
    document.getElementById('profImg').style.backgroundImage = `url('${p.portrait}')`;
    document.getElementById('profName').textContent = p.name;
    document.getElementById('profMBTI').textContent = p.mbti;
    document.getElementById('profQuote').textContent = `"${p.quote}"`;
    document.getElementById('profThought').textContent = p.thought;
    document.getElementById('profStory').textContent = p.story;
    const modal = document.getElementById('modal-profile');
    if (modal) { 
        modal.style.display = 'flex'; 
        setTimeout(() => modal.classList.add('active'), 10); 
    }
}

function closeProfile() {
    const modal = document.getElementById('modal-profile');
    if (modal) { 
        modal.classList.remove('active'); 
        setTimeout(() => modal.style.display = 'none', 800); 
    }
}

// Initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}
