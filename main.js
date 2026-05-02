/* ===================== THE TIME-TRAVELER'S AGORA: MODULAR ENGINE ===================== */

// Supabase Configuration
const SUPABASE_URL = (typeof CONFIG !== 'undefined') ? CONFIG.SUPABASE_URL : '';
const SUPABASE_KEY = (typeof CONFIG !== 'undefined') ? CONFIG.SUPABASE_KEY : '';
const supabaseClient = (typeof supabase !== 'undefined' && SUPABASE_URL && SUPABASE_KEY) ? supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// App State
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
        this.initAudio();
        this.loadInitialScreen();
    },

    initAudio() {
        this.audio = new ProceduralAudioManager();
        // No loading wait needed anymore
    },

    bindEvents() {
        const dot = document.querySelector('.cursor-dot');
        const outline = document.querySelector('.cursor-outline');
        const constellations = document.querySelectorAll('.constellation');
        
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            if (dot) { dot.style.left = `${posX}px`; dot.style.top = `${posY}px`; dot.style.opacity = '1'; }
            if (outline) { outline.style.left = `${posX}px`; outline.style.top = `${posY}px`; outline.style.opacity = '1'; }
            
            constellations.forEach(constEl => {
                const rect = constEl.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const dist = Math.hypot(posX - centerX, posY - centerY);
                if (dist < 250) constEl.classList.add('active');
                else constEl.classList.remove('active');
            });
        });
        
        document.addEventListener('mouseover', (e) => {
            if (outline && (e.target.tagName === 'BUTTON' || e.target.closest('.era-card') || e.target.closest('.hall-card'))) {
                outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                outline.style.backgroundColor = 'rgba(201, 160, 80, 0.1)';
            }
        });
        document.addEventListener('mouseout', (e) => {
            if (outline && (e.target.tagName === 'BUTTON' || e.target.closest('.era-card') || e.target.closest('.hall-card'))) {
                outline.style.transform = 'translate(-50%, -50%) scale(1)';
                outline.style.backgroundColor = 'transparent';
            }
        });
    },

    initFX() {
        if (window.particlesJS) {
            particlesJS('particles-js', {
                "particles": {
                    "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                    "color": { "value": "#ffd700" },
                    "opacity": { "value": 0.4, "random": true },
                    "size": { "value": 2, "random": true },
                    "line_linked": { "enable": true, "distance": 150, "color": "#ffd700", "opacity": 0.1, "width": 1 },
                    "move": { "enable": true, "speed": 0.5, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
                }
            });
        }
    },

    loadInitialScreen() {
        this.goTo('screen-landing');
    },

    goTo(screenId) {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(s => { s.classList.remove('active'); s.style.display = 'none'; });
        const target = document.getElementById(screenId);
        if (target) {
            target.style.display = 'flex';
            setTimeout(() => { target.classList.add('active'); window.scrollTo({ top: 0, behavior: 'smooth' }); }, 50);
        }
    },

    playFX(type) {
        if (this.audio) this.audio.play(type);
    }
};

/* ===================== PROCEDURAL AUDIO ENGINE (SYNTHESIS) ===================== */
class ProceduralAudioManager {
    constructor() {
        this.context = null;
        this.initialized = false;
        this.noiseBuffer = null;
    }

    init() {
        if (this.initialized) return;
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        
        // Generate a 0.2s white noise buffer once
        const bufferSize = this.context.sampleRate * 0.2;
        this.noiseBuffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
        const data = this.noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        this.initialized = true;
    }

    async resume() {
        if (!this.initialized) this.init();
        if (this.context && this.context.state === 'suspended') await this.context.resume();
    }

    // Synthesize a pure, high-end mechanical typewriter "clink" (No bass thud)
    createClickNode(time, volume = 0.2) {
        if (!this.initialized) return;

        const now = time;
        
        // Layer 1: High-frequency metallic impact
        const osc = this.context.createOscillator();
        const oscGain = this.context.createGain();
        osc.type = 'triangle'; // Richer than sine but cleaner than square
        osc.frequency.setValueAtTime(3500 + Math.random() * 500, now);
        
        oscGain.gain.setValueAtTime(0, now);
        oscGain.gain.linearRampToValueAtTime(volume * 0.5, now + 0.003); // Soft attack to avoid "thud"
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
        
        osc.connect(oscGain);
        oscGain.connect(this.context.destination);
        osc.start(now);
        osc.stop(now + 0.03);

        // Layer 2: Mechanical "Clink" (Filtered high-pass noise)
        const noise = this.context.createBufferSource();
        noise.buffer = this.noiseBuffer;
        const filter = this.context.createBiquadFilter();
        const noiseGain = this.context.createGain();
        
        filter.type = 'highpass';
        filter.frequency.value = 2500; // Strictly cut all bass/mid "thud"
        
        const resFilter = this.context.createBiquadFilter();
        resFilter.type = 'bandpass';
        resFilter.frequency.value = 4000;
        resFilter.Q.value = 5; // Resonant metallic peak
        
        noiseGain.gain.setValueAtTime(0, now);
        noiseGain.gain.linearRampToValueAtTime(volume, now + 0.005);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        
        noise.connect(filter);
        filter.connect(resFilter);
        resFilter.connect(noiseGain);
        noiseGain.connect(this.context.destination);
        
        noise.start(now);
        noise.stop(now + 0.08);
    }

    scheduleTypewriter(textLength, interval = 85) {
        if (!this.initialized) return;
        const now = this.context.currentTime;
        for (let i = 0; i < textLength; i++) {
            this.createClickNode(now + (i * (interval / 1000)), 0.3);
        }
    }

    play(name) {
        if (!this.initialized) return;
        const now = this.context.currentTime;
        if (name === 'click') {
            // Lower frequency "thump" for buttons
            const osc = this.context.createOscillator();
            const gain = this.context.createGain();
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.connect(gain);
            gain.connect(this.context.destination);
            osc.start(now);
            osc.stop(now + 0.1);
        }
    }
}

// Global Handlers
function goTo(id) { App.goTo(id); }

async function startQuest(era) {
    if (App.audio) await App.audio.resume();
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
            btn.onclick = () => { App.playFX('click'); handleAnswer(opt.val); };
            optionsWrap.appendChild(btn);
            setTimeout(() => btn.classList.add('show'), idx * 250 + 200);
        });
    });
}

function typewrite(el, text, callback) {
    if (App.typewriterTimeout) clearTimeout(App.typewriterTimeout);
    el.textContent = '';
    let i = 0;
    const interval = 85;
    if (App.audio && App.audio.initialized) {
        App.audio.scheduleTypewriter(text.replace(/ /g, '').length, interval);
    }
    function next() {
        if (i < text.length) {
            el.textContent += text[i];
            i++;
            App.typewriterTimeout = setTimeout(next, text[i-1] === ' ' ? 20 : interval);
        } else {
            if (callback) callback();
        }
    }
    next();
}

function handleAnswer(choice) {
    const eraData = QUEST_DATA[App.currentEra];
    const weights = eraData[App.currentStep].weight[choice];
    if (weights) { for (const [key, val] of Object.entries(weights)) App.userScores[key] += val; }
    App.currentStep++;
    if (App.currentStep < 12) renderQuestion();
    else processResult();
}

function processResult() {
    App.goTo('screen-loading');
    updateLoadingLogs();
    setTimeout(() => {
        const s = App.userScores;
        const mbti = [s.E>=s.I?'E':'I', s.S>=s.N?'S':'N', s.T>=s.F?'T':'F', s.J>=s.P?'J':'P'].join('');
        const candidates = PHILS_DATA.filter(p => p.era === App.currentEra);
        let match = candidates[0], max = -1;
        candidates.forEach(p => {
            let score = 0;
            for (let i=0; i<4; i++) if (p.mbti[i] === mbti[i]) score++;
            if (score > max) { max = score; match = p; }
        });
        saveResultToSupabase(match.id, mbti, App.currentEra);
        showResult(match, mbti);
    }, 5000);
}

async function saveResultToSupabase(philId, mbti, era) {
    if (!supabaseClient) return;
    try { await supabaseClient.from('results').insert([{ phil_id: philId, mbti: mbti, era: era }]); } catch (e) {}
}

function showResult(phil, mbti) {
    document.getElementById('resultMBTI').textContent = mbti;
    document.getElementById('resultName').textContent = phil.name;
    document.getElementById('resultQuote').textContent = phil.quote;
    document.getElementById('resultDesc').textContent = phil.modifier;
    document.getElementById('resultPortrait').style.backgroundImage = `url('${phil.portrait}')`;
    updateRealStatistics(phil.id);
    App.goTo('screen-result');
}

async function updateRealStatistics(philId) {
    if (!supabaseClient) return;
    try {
        const { count: total } = await supabaseClient.from('results').select('*', { count: 'exact', head: true });
        const { count: match } = await supabaseClient.from('results').select('*', { count: 'exact', head: true }).eq('phil_id', philId);
        const rate = total > 0 ? Math.round((match / total) * 100) : 0;
        document.getElementById('totalParticipants').textContent = total.toLocaleString();
        document.getElementById('matchRateText').textContent = `${rate}%`;
        document.getElementById('matchRateBar').style.width = `${rate}%`;
    } catch (e) {}
}

const LOADING_LOGS = ["시공간 동기화 중...", "현자 탐색 중...", "기록 열람 중...", "좌표 계산 중..."];
function updateLoadingLogs() {
    const logEl = document.getElementById('loadingLogs');
    if (!logEl) return;
    let i = 0;
    const interval = setInterval(() => {
        if (document.getElementById('screen-loading').classList.contains('active')) {
            logEl.textContent = LOADING_LOGS[i % LOADING_LOGS.length];
            i++;
        } else clearInterval(interval);
    }, 1200);
}

// Start App
App.init();
