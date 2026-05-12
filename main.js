/* ===================== THE TIME-TRAVELER'S AGORA: PREMIUM ENGINE ===================== */

const App = {
    currentEra: 'ancient',
    currentStep: 0,
    userScores: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
    isTypewriting: false,
    typewriterTimeout: null,
    audio: null,
    
    init() {
        this.bindEvents();
        this.initFX();
        this.loadInitialScreen();
    },

    bindEvents() {
        // Global Trigger to start audio on interaction
        const unlockAudio = () => {
            const bgm = document.getElementById('bgm');
            if (bgm) bgm.play().catch(() => {});
            document.removeEventListener('click', unlockAudio);
        };
        document.addEventListener('click', unlockAudio);
    },

    playFX(type) {
        if (this.audio) this.audio.play(type);
    },

    async startQuest(era) {
        this.currentEra = era;
        this.currentStep = 0;
        this.userScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        this.goTo('screen-quest');
        renderQuestion();
    },

    initFX() {
        if (window.particlesJS) {
            particlesJS('particles-js', {
                "particles": {
                    "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
                    "color": { "value": "#c9a050" },
                    "opacity": { "value": 0.3, "random": true },
                    "size": { "value": 2, "random": true },
                    "line_linked": { "enable": true, "distance": 150, "color": "#c9a050", "opacity": 0.1, "width": 1 },
                    "move": { "enable": true, "speed": 0.3, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
                }
            });
        }
    },

    loadInitialScreen() {
        this.goTo('screen-landing');
    },

    goTo(screenId) {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(s => { 
            s.classList.remove('active'); 
            s.style.display = 'none'; 
        });
        const target = document.getElementById(screenId);
        if (target) {
            target.style.display = 'flex';
            setTimeout(() => { 
                target.classList.add('active'); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
            }, 50);
        }
    }
};

// Global Handlers (Forwarding to App for convenience)
function goTo(id) { App.goTo(id); }
function startQuest(era) { App.startQuest(era); }

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
        const opts = [
            { text: data.a1, val: 'a1' },
            { text: data.a2, val: 'a2' }
        ];
        opts.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline';
            btn.style.width = '100%';
            btn.style.textAlign = 'left';
            btn.style.padding = '1.5rem 2rem';
            btn.textContent = opt.text;
            btn.onclick = () => handleAnswer(opt.val);
            optionsWrap.appendChild(btn);
            setTimeout(() => btn.style.opacity = '1', idx * 200);
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
            App.typewriterTimeout = setTimeout(next, 50);
        } else if (callback) callback();
    }
    next();
}

function handleAnswer(choice) {
    const eraData = QUEST_DATA[App.currentEra];
    const weights = eraData[App.currentStep].weight[choice];
    if (weights) {
        for (const [key, val] of Object.entries(weights)) {
            App.userScores[key] += val;
        }
    }
    App.currentStep++;
    if (App.currentStep < 12) renderQuestion();
    else processResult();
}

function processResult() {
    App.goTo('screen-loading');
    let logIdx = 0;
    const logs = ["시공간 동기화 중...", "현자 탐색 중...", "기록 열람 중...", "영혼의 공명 계산 중..."];
    const logInterval = setInterval(() => {
        const el = document.getElementById('loadingLogs');
        if (el) el.textContent = logs[logIdx % logs.length];
        logIdx++;
    }, 1200);

    setTimeout(() => {
        clearInterval(logInterval);
        const s = App.userScores;
        const mbti = [
            s.E >= s.I ? 'E' : 'I',
            s.S >= s.N ? 'S' : 'N',
            s.T >= s.F ? 'T' : 'F',
            s.J >= s.P ? 'J' : 'P'
        ].join('');
        
        const candidates = PHILS_DATA.filter(p => p.era === App.currentEra);
        let match = candidates[0], max = -1;
        candidates.forEach(p => {
            let score = 0;
            for (let i = 0; i < 4; i++) if (p.mbti[i] === mbti[i]) score++;
            if (score > max) { max = score; match = p; }
        });
        showResult(match, mbti);
    }, 5000);
}

function showResult(phil, mbti) {
    document.getElementById('resultMBTI').textContent = mbti;
    document.getElementById('resultName').textContent = phil.name;
    document.getElementById('resultQuote').textContent = `"${phil.quote}"`;
    document.getElementById('resultDesc').textContent = phil.modifier;
    document.getElementById('resultPortrait').style.backgroundImage = `url('${phil.portrait}')`;
    document.getElementById('resultThought').textContent = phil.thought || '심도 있는 사상을 분석 중입니다...';
    document.getElementById('resultStory').textContent = phil.story || '현자의 일화를 불러오는 중입니다...';
    
    // Random match rate for effect
    const rate = 3 + Math.floor(Math.random() * 12);
    document.getElementById('matchRateText').textContent = `${rate}%`;
    document.getElementById('matchRateBar').style.width = `${rate}%`;
    document.getElementById('totalParticipants').textContent = (Math.floor(Math.random() * 1000) + 5400).toLocaleString();

    App.goTo('screen-result');
}

/* ===================== GALLERY & PROFILE ===================== */
function openGallery() {
    App.goTo('screen-hall');
    filterGallery('ancient', document.querySelector('.tab-btn'));
}

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
            <div class="hall-card-img" style="background-image: url('${p.portrait}')">
                <div class="card-mbti">${p.mbti}</div>
            </div>
            <div class="hall-card-info">
                <h4>${p.name}</h4>
                <p>${p.modifier}</p>
            </div>
        `;
        card.onclick = () => openProfile(p.id);
        grid.appendChild(card);
        setTimeout(() => card.style.opacity = '1', idx * 50);
    });
}

function openProfile(id) {
    const p = PHILS_DATA.find(item => item.id === id);
    if (!p) return;

    document.getElementById('profImg').style.backgroundImage = `url('${p.portrait}')`;
    document.getElementById('profName').textContent = p.name;
    document.getElementById('profMBTI').textContent = p.mbti;
    document.getElementById('profQuote').textContent = p.quote;
    document.getElementById('profThought').textContent = p.thought || '사상 정보를 준비 중입니다.';
    document.getElementById('profStory').textContent = p.story || '이야기 정보를 준비 중입니다.';

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
        setTimeout(() => modal.style.display = 'none', 300);
    }
}

function shareResult() {
    alert("결과가 복사되었습니다. (데모 구현)");
}

// Start App
App.init();
