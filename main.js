/* ===================== THE TIME-TRAVELER'S AGORA: MODULAR ENGINE ===================== */

// App State
const App = {
    currentEra: 'ancient',
    currentStep: 0,
    userScores: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
    isTypewriting: false,
    
    init() {
        this.bindEvents();
        this.initFX();
        this.loadInitialScreen();
    },

    bindEvents() {
        const dot = document.querySelector('.cursor-dot');
        const outline = document.querySelector('.cursor-outline');
        
        const constellations = document.querySelectorAll('.constellation');
        
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            dot.style.left = `${posX}px`;
            dot.style.top = `${posY}px`;
            outline.style.left = `${posX}px`;
            outline.style.top = `${posY}px`;
            
            // Constellation Proximity Check
            constellations.forEach(constEl => {
                const rect = constEl.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const dist = Math.hypot(posX - centerX, posY - centerY);
                
                if (dist < 250) {
                    constEl.classList.add('active');
                } else {
                    constEl.classList.remove('active');
                }
            });
        });
        
        // Button/Card Hover FX
        document.addEventListener('mouseover', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.closest('.era-card') || e.target.closest('.hall-card')) {
                outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                outline.style.backgroundColor = 'rgba(201, 160, 80, 0.1)';
            }
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.closest('.era-card') || e.target.closest('.hall-card')) {
                outline.style.transform = 'translate(-50%, -50%) scale(1)';
                outline.style.backgroundColor = 'transparent';
            }
        });
    },

    initFX() {
        if (window.particlesJS) {
            particlesJS('particles-js', {
                "particles": {
                    "number": { "value": 70, "density": { "enable": true, "value_area": 800 } },
                    "color": { "value": "#ffd700" },
                    "opacity": { "value": 0.5, "random": true },
                    "size": { "value": 2, "random": true },
                    "line_linked": { "enable": true, "distance": 150, "color": "#ffd700", "opacity": 0.15, "width": 1 },
                    "move": { "enable": true, "speed": 0.6, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
                },
                "interactivity": {
                    "detect_on": "window",
                    "events": {
                        "onhover": { "enable": true, "mode": "grab" },
                        "onclick": { "enable": true, "mode": "push" }
                    },
                    "modes": {
                        "grab": { "distance": 220, "line_linked": { "opacity": 0.4 } },
                        "push": { "particles_nb": 4 }
                    }
                }
            });
        }
    },

    loadInitialScreen() {
        document.getElementById('screen-landing').style.backgroundImage = "url('assets/landing_bg.png')";
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

// Global Handlers (for HTML onclicks)
function goTo(id) { App.goTo(id); }

function startQuest(era) {
    App.currentEra = era;
    App.currentStep = 0;
    App.userScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    App.goTo('screen-quest');
    renderQuestion();
}

function renderQuestion() {
    const data = QUEST_DATA[App.currentEra][App.currentStep];
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
            btn.onclick = () => handleAnswer(opt.val);
            optionsWrap.appendChild(btn);
            setTimeout(() => btn.classList.add('show'), idx * 200 + 100);
        });
    });
}

function typewrite(el, text, callback) {
    el.textContent = '';
    let i = 0;
    App.isTypewriting = true;
    const interval = setInterval(() => {
        el.textContent += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            App.isTypewriting = false;
            if (callback) callback();
        }
    }, 40);
}

function handleAnswer(choice) {
    if (App.isTypewriting) return;
    const weights = QUEST_DATA[App.currentEra][App.currentStep].weight[choice];
    for (const [key, val] of Object.entries(weights)) {
        App.userScores[key] += val;
    }
    if (App.currentStep < 11) {
        App.currentStep++;
        renderQuestion();
    } else {
        processResult();
    }
}

function processResult() {
    App.goTo('screen-loading');
    setTimeout(() => {
        const scores = App.userScores;
        const mbti = [
            scores.E >= scores.I ? 'E' : 'I',
            scores.N >= scores.S ? 'N' : 'S',
            scores.T >= scores.F ? 'T' : 'F',
            scores.J >= scores.P ? 'J' : 'P'
        ].join('');
        
        const candidates = PHILS_DATA.filter(p => p.era === App.currentEra);
        let match = candidates[0];
        let maxScore = -1;
        candidates.forEach(p => {
            let score = 0;
            for (let i = 0; i < 4; i++) { if (p.mbti[i] === mbti[i]) score++; }
            if (score > maxScore) { maxScore = score; match = p; }
        });
        
        showResult(match, mbti);
    }, 4000);
}

function showResult(phil, mbti) {
    document.getElementById('resultMBTI').textContent = mbti;
    document.getElementById('resultName').textContent = phil.name;
    document.getElementById('resultQuote').textContent = phil.quote;
    document.getElementById('resultDesc').textContent = phil.modifier;
    document.getElementById('resultPortrait').style.backgroundImage = `url('${phil.portrait}')`;
    document.getElementById('totalParticipants').textContent = (12482 + Math.floor(Math.random() * 100)).toLocaleString();
    document.getElementById('matchRateBar').style.width = "8%";
    document.getElementById('matchRateText').textContent = "8%";
    App.goTo('screen-result');
}

function openGallery() {
    // Default to ancient
    const firstTab = document.querySelector('.tab-btn');
    filterGallery('ancient', firstTab);
    App.goTo('screen-hall');
}

const MBTI_ORDER = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP'
];

function filterGallery(era, btn) {
    // Tab UI update
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Filtering & Sorting
    const grid = document.getElementById('hallGrid');
    grid.innerHTML = '';
    
    let filtered = PHILS_DATA.filter(p => p.era === era);
    
    // Sort by MBTI_ORDER
    filtered.sort((a, b) => {
        return MBTI_ORDER.indexOf(a.mbti) - MBTI_ORDER.indexOf(b.mbti);
    });

    filtered.forEach((p, idx) => {
        const card = document.createElement('div');
        card.className = 'hall-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        card.innerHTML = `
            <div class="hall-card-img" 
                 style="background-image: url('${p.portrait}')" 
                 role="img" 
                 aria-label="${p.name} - ${p.modifier} 초상화">
                <span class="card-mbti">${p.mbti}</span>
            </div>
            <div class="hall-card-info">
                <h4>${p.name}</h4>
                <p>${p.modifier}</p>
            </div>
        `;
        card.onclick = () => openProfile(p);
        grid.appendChild(card);
        
        // Staggered entrance animation
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, idx * 50);
    });
}

function openProfile(p) {
    document.getElementById('profImg').style.backgroundImage = `url('${p.portrait}')`;
    document.getElementById('profName').textContent = p.name;
    document.getElementById('profMBTI').textContent = p.mbti;
    document.getElementById('profQuote').textContent = p.quote;
    document.getElementById('profAchievements').textContent = p.achievements;
    document.getElementById('profTraits').textContent = p.traits;
    document.getElementById('modal-profile').classList.add('active');
}

function closeProfile() {
    document.getElementById('modal-profile').classList.remove('active');
}

function shareResult() {
    const dummy = document.createElement('input');
    document.body.appendChild(dummy);
    dummy.value = window.location.href;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    alert("좌표가 복사되었습니다.");
}

// Initialize App
window.onload = () => App.init();
