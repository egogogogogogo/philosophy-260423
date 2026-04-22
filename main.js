/* ===================== THE TIME-TRAVELER'S AGORA: CORE ENGINE ===================== */

// ===================== DATA: PHILOSOPHERS (32) =====================
const PHILS_DATA = [
    // Ancient
    { id: 'socrates', mbti: 'ENTP', trait: 'individual', name: '소크라테스', era: 'ancient', quote: '"너 자신을 알라."', modifier: '무지의 깨달음', achievements: '산파술을 통한 진리 탐구, 서양 철학의 기초 확립', traits: '끊임없는 질문과 비판적 사고, 행동하는 지성', portrait: 'assets/portraits/founders.png' },
    { id: 'plato', mbti: 'INFJ', trait: 'action', name: '플라톤', era: 'ancient', quote: '"이데아를 보라."', modifier: '이상주의의 아버지', achievements: '아카데메이아 설립, 국가론 저술, 형이상학 체계 구축', traits: '영원한 본질 추구, 완벽한 질서와 도덕 강조', portrait: 'assets/portraits/plato_aristotle.png' },
    { id: 'aristotle', mbti: 'ENTJ', trait: 'action', name: '아리스토텔레스', era: 'ancient', quote: '"행복은 활동 속에 있다."', modifier: '지성의 거인', achievements: '논리학 체계화, 자연과학 및 정치학의 토대 마련', traits: '현실적 관찰과 분석, 체계적인 질서 추구', portrait: 'assets/portraits/plato_aristotle.png' },
    { id: 'heraclitus', mbti: 'INTJ', trait: 'observe', name: '헤라클레이토스', era: 'ancient', quote: '"만물은 흐른다."', modifier: '변화의 현자', achievements: '생성 철학의 시초, 로고스 개념 확립', traits: '변화의 본질 통찰, 냉철한 직관과 사유', portrait: 'assets/portraits/heraclitus.png' },
    { id: 'laozi', mbti: 'INFP', trait: 'individual', name: '노자', era: 'ancient', quote: '"무위자연."', modifier: '순리의 스승', achievements: '도덕경 저술, 도가 철학의 창시', traits: '자연스러운 삶 추구, 인위적 강제 거부', portrait: 'assets/portraits/laozi_diogenes.png' },
    { id: 'confucius', mbti: 'ISTJ', trait: 'action', name: '공자', era: 'ancient', quote: '"배우고 때로 익히면 즐겁지 아니한가."', modifier: '조화의 성인', achievements: '유교 사상 확립, 교육의 보급 및 사회 윤리 정립', traits: '예우와 도덕 중시, 실천적 윤리 실현', portrait: 'assets/portraits/founders.png' },
    { id: 'diogenes', mbti: 'ISTP', trait: 'action', name: '디오게네스', era: 'ancient', quote: '"햇빛을 가리지 마시오."', modifier: '견유학파의 기인', achievements: '기성 관습의 파괴, 극단적 자활과 자유 실천', traits: '솔직하고 거침없는 행동, 소박함 속에 찾은 진리', portrait: 'assets/portraits/laozi_diogenes.png' },
    { id: 'epicurus', mbti: 'ISFP', trait: 'collective', name: '에피쿠로스', era: 'ancient', quote: '"우정과 고요함."', modifier: '평온의 추구자', achievements: '쾌락주의 철학 정립, 아타락시아 개념 제시', traits: '소박한 삶의 기쁨, 고통 없는 육체와 평온한 정신', portrait: 'assets/portraits/epicurus_marcus.png' },
    { id: 'marcus_aurelius', mbti: 'INFJ', trait: 'observe', name: '마르쿠스 아우렐리우스', era: 'ancient', quote: '"평온을 유지하라."', modifier: '명상하는 황제', achievements: '명상록 저술, 스토아 철학의 완성', traits: '철저한 자기 절제, 우주의 질서에 대한 수용', portrait: 'assets/portraits/epicurus_marcus.png' },
    { id: 'zeno', mbti: 'ISTJ', trait: 'observe', name: '제논', era: 'ancient', quote: '"우주와 조화롭게 살라."', modifier: '부동심의 창시자', achievements: '스토아 학파 설립, 논리적이고 금욕적인 도덕관 정립', traits: '이성적 통개, 어떤 상황에도 흔들리지 않는 평정심', portrait: 'assets/portraits/zeno.png' },

    // Medieval
    { id: 'augustine', mbti: 'ISFJ', trait: 'collective', name: '아우구스티누스', era: 'medieval', quote: '"내 영혼의 고백."', modifier: '은총의 박사', achievements: '고백록 저술, 기독교 신학의 철학적 토대 마련', traits: '내면적 성찰, 신앙과 이성의 조화 모색', portrait: 'medieval_background_1776688375951.png' },
    { id: 'aquinas', mbti: 'ISTJ', trait: 'observe', name: '토마스 아퀴나스', era: 'medieval', quote: '"이성과 신앙은 둘 다 진리다."', modifier: '스콜라의 집대성자', achievements: '신학대전 집필, 아리스토텔레스 철학의 기독교적 수용', traits: '엄밀한 논리 분석, 질서 정연한 세계관 추구', portrait: 'medieval_background_1776688375951.png' },
    { id: 'anselm', mbti: 'INFJ', trait: 'observe', name: '안셀무스', era: 'medieval', quote: '"이해하기 위해 믿는다."', modifier: '안토니아의 거인', achievements: '본체론적 신의 존재 증명, 스콜라 철학의 아버지', traits: '깊은 신앙적 사유, 논리적 증명에 대한 열정', portrait: 'medieval_background_1776688375951.png' },
    { id: 'erasmus', mbti: 'ENFP', trait: 'individual', name: '에라스무스', era: 'medieval', quote: '"스스로 생각하라."', modifier: '인문주의의 거장', achievements: '우신예찬 저술, 종교 개혁의 사상적 발판 마련', traits: '자유로운 정신, 비판적이지만 평화적인 태도', portrait: 'medieval_background_1776688375951.png' },

    // Modern Early
    { id: 'descartes', mbti: 'INTP', trait: 'individual', name: '데카르트', era: 'modern_early', quote: '"나는 생각한다, 고로 나는 존재한다."', modifier: '근대 철학의 아버지', achievements: '합리주의 서설, 좌표계 발명, 이원론적 세계관 확립', traits: '철저한 회의와 의심, 명증한 지식 추구', portrait: 'modern_early_background_1776688395164.png' },
    { id: 'spinoza', mbti: 'INTP', trait: 'collective', name: '스피노자', era: 'modern_early', quote: '"신은 곧 자연이다."', modifier: '범신론의 사유자', achievements: '에티카 저술, 결정론적 세계관 정립', traits: '감정으로부터의 해방, 영원의 관점에서 보는 지혜', portrait: 'modern_early_background_1776688395164.png' },
    { id: 'kant', mbti: 'ISTJ', trait: 'observe', name: '칸트', era: 'modern_early', quote: '"정언명령을 따르라."', modifier: '도덕의 수호자', achievements: '비판 철학 체계 완성, 의무론적 윤리학 확립', traits: '철저한 원칙 준수, 보편적 도덕 법칙에 대한 신념', portrait: 'modern_early_background_1776688395164.png' },
    { id: 'hume', mbti: 'ESTP', trait: 'action', name: '흄', era: 'modern_early', quote: '"이성은 감정의 노예."', modifier: '경험론의 대가', achievements: '인간 본성에 관한 논고 저술, 인과율에 대한 비판', traits: '현실적 관찰 중시, 회의적인 시각과 실용적 태도', portrait: 'modern_early_background_1776688395164.png' },
    { id: 'rousseau', mbti: 'ENFP', trait: 'individual', name: '루소', era: 'modern_early', quote: '"자연으로 돌아가라."', modifier: '고귀한 야만인의 대변인', achievements: '사회계약론 저술, 교육 철학 에밀 집필', traits: '감성과 감정의 회복, 직접적인 민주주의와 자유 갈망', portrait: 'modern_early_background_1776688395164.png' },
    { id: 'hobbes', mbti: 'ESTJ', trait: 'action', name: '홉스', era: 'modern_early', quote: '"만인의 만인에 대한 투쟁."', modifier: '계약론의 실재주의자', achievements: '리바이어던 저술, 근대 정치 철학의 기초 확립', traits: '권력과 질서의 필요성 강조, 현실적인 인간 본성 통찰', portrait: 'modern_early_background_1776688395164.png' },
    { id: 'locke', mbti: 'ISTP', trait: 'observe', name: '존 로크', era: 'modern_early', quote: '"인간의 마음은 백지다."', modifier: '자유주의의 시조', achievements: '통치론 저술, 경험론적 인식론 확립', traits: '개인의 권리와 자유 중시, 합리적인 정부 관념 제시', portrait: 'modern_early_background_1776688395164.png' },

    // Modern Late
    { id: 'nietzsche', mbti: 'INTJ', trait: 'action', name: '니체', era: 'modern_late', quote: '"신은 죽었다."', modifier: '망치의 철학자', achievements: '초인(Übermensch) 사상, 영원회귀 및 힘의 의지 주창', traits: '기존 가치의 전복, 강인한 삶에 대한 긍정과 창조', portrait: 'modern_late_background_1776688411010.png' },
    { id: 'camus', mbti: 'ISFP', trait: 'individual', name: '카뮈', era: 'modern_late', quote: '"부조리 속에서 미소 지으라."', modifier: '부조리의 반항아', achievements: '이방인 저술, 실존주의와 인도주의의 독자적 노선', traits: '주어짐에 대한 거부와 반항, 현재의 삶에 대한 충실함', portrait: 'modern_late_background_1776688411010.png' },
    { id: 'kierkegaard', mbti: 'INFP', trait: 'collective', name: '키에르케고르', era: 'modern_late', quote: '"신 앞에 선 단독자."', modifier: '주체적 진리의 구도자', achievements: '실존주의 철학의 선구자, 신앙의 도약 개념 제시', traits: '깊은 내면적 고뇌, 개별적 실존의 정체성 탐구', portrait: 'modern_late_background_1776688411010.png' },
    { id: 'schopenhauer', mbti: 'INFJ', trait: 'observe', name: '쇼펜하우어', era: 'modern_late', quote: '"삶은 고통이다."', modifier: '의지의 염세주의자', achievements: '의지와 표상으로서의 세계 저술, 동양 철학적 사유의 결합', traits: '세속적 욕망의 덧없음 통찰, 고독한 사유와 해탈 추구', portrait: 'modern_late_background_1776688411010.png' },
    { id: 'sartre', mbti: 'ENTP', trait: 'action', name: '사르트르', era: 'modern_late', quote: '"실존은 본질에 앞선다."', modifier: '자유의 사도', achievements: '존재와 무 저술, 참여 문학 및 실존주의 유행 주도', traits: '절대적인 자유와 책임, 행동하는 지식인의 표본', portrait: 'modern_late_background_1776688411010.png' },
    { id: 'heidegger', mbti: 'INTP', trait: 'observe', name: '하이데거', era: 'modern_late', quote: '"존재의 목소리를 들으라."', modifier: '존재의 탐구자', achievements: '존재와 시간 저술, 현존재(Dasein) 개념 정립', traits: '언어와 존재의 본질 사유, 기술 문명에 대한 근원적 비판', portrait: 'modern_late_background_1776688411010.png' },
    { id: 'foucault', mbti: 'ENTP', trait: 'individual', name: '푸코', era: 'modern_late', quote: '"지식은 권력이다."', modifier: '광기의 역사학자', achievements: '구조주의 대안 제시, 미시 권력과 감시 체계 분석', traits: '사회적 억압 구조 폭로, 지식의 고고학적 탐구', portrait: 'modern_late_background_1776688411010.png' },
    { id: 'hannah_arendt', mbti: 'ENTJ', trait: 'action', name: '한나 아렌트', era: 'modern_late', quote: '"악의 평범성."', modifier: '정치적 주체의 발견자', achievements: '전체주의의 기원 저술, 인간의 조건 분석', traits: '공적인 삶과 정치적 행동의 중요성 강조, 비판적 판단력', portrait: 'modern_late_background_1776688411010.png' },
    { id: 'simone_de_beauvoir', mbti: 'INFJ', trait: 'individual', name: '보부아르', era: 'modern_late', quote: '"여성은 태어나는 것이 아니라 만들어지는 것이다."', modifier: '제2의 성의 탐험가', achievements: '페미니즘 철학의 토대 마련, 실존주의적 윤리학 정립', traits: '타자성에 대한 비판, 주체적인 여성의 삶 고취', portrait: 'modern_late_background_1776688411010.png' },
    { id: 'wittgenstein', mbti: 'INTJ', trait: 'observe', name: '비트겐슈타인', era: 'modern_late', quote: '"말할 수 없는 것에 대해서는 침묵해야 한다."', modifier: '언어의 문법학자', achievements: '논리철학논고 및 철학적 탐구 저술, 현대 분석철학 주도', traits: '언어의 한계 규정, 엄밀한 논리적 정합성 추구', portrait: 'modern_late_background_1776688411010.png' },
    { id: 'marx', mbti: 'INTJ', trait: 'action', name: '마르크스', era: 'modern_late', quote: '"철학자들은 세계를 해석했다. 중요한 것은 변혁하는 것이다."', modifier: '변혁의 선언자', achievements: '자본론 집필, 유물론적 사관 및 공산사회 이론 정립', traits: '사회 구조적 모순 분석, 실천적 혁명 정신', portrait: 'modern_late_background_1776688411010.png' }
];

const QUEST_DATA = {
    ancient: [
        { q: '아고라의 노인이 묻습니다. "지혜란 무엇입니까?"', a1: '나의 무지를 깨닫는 것', a2: '세상의 질서를 관찰하는 것', weight: { a1: { I: 2, N: 1 }, a2: { E: 2, S: 1 } } },
        { q: '"눈앞의 사물들은 진짜입니까, 이데아의 그림자입니까?"', a1: '보이지 않는 본질이 진짜다', a2: '만지는 현실이 진짜다', weight: { a1: { N: 2, J: 1 }, a2: { S: 2, P: 1 } } },
        { q: '"행복은 어디에 있습니까?"', a1: '이성적 덕의 실천', a2: '고통 없는 평온함', weight: { a1: { J: 2, T: 1 }, a2: { P: 2, F: 1 } } },
        { q: '"만물은 고정된 원소입니까, 흐르는 변화임적입니까?"', a1: '변하지 않는 원리가 있다', a2: '만물은 끊임없이 흐른다', weight: { a1: { S: 2, J: 1 }, a2: { N: 2, P: 1 } } },
        { q: '"정의는 무엇입니까?"', a1: '영혼의 조화로운 질서', a2: '강자의 유익함', weight: { a1: { I: 2, F: 1 }, a2: { E: 2, T: 1 } } },
        { q: '"국가는 누가 다스려야 합니까?"', a1: '지혜를 갖춘 철학자', a2: '자유로운 시민들', weight: { a1: { N: 2, J: 1 }, a2: { S: 2, P: 1 } } },
        { q: '"위험 앞에서 당신은?"', a1: '이성적으로 판단하여 후퇴', a2: '명예를 지키기 위해 돌진', weight: { a1: { T: 2, I: 1 }, a2: { F: 2, E: 1 } } },
        { q: '"우정이란?"', a1: '영혼의 완전한 결합', a2: '필요를 채우는 합리적 협력', weight: { a1: { F: 2, I: 1 }, a2: { T: 2, E: 1 } } },
        { q: '"자유란?"', a1: '욕망을 절제하는 내적 힘', a2: '행동의 방해를 받지 않는 것', weight: { a1: { J: 2, S: 1 }, a2: { P: 2, N: 1 } } },
        { q: '"운명이 당신을 억압한다면?"', a1: '평정심을 지키며 수용한다', a2: '저항하여 운명을 개척한다', weight: { a1: { I: 2, S: 1 }, a2: { E: 2, N: 1 } } },
        { q: '"죽음은?"', a1: '영혼의 자유로워지는 축복', a2: '감각이 사라지는 영원한 잠', weight: { a1: { N: 2, F: 1 }, a2: { S: 2, T: 1 } } },
        { q: '"어떤 삶을 살겠습니까?"', a1: '우주의 질서(Logos)에 순응', a2: '나만의 열정(Pathos)을 실현', weight: { a1: { J: 2, T: 1 }, a2: { P: 2, F: 1 } } }
    ],
    medieval: [
        { q: '"진리는 신의 계시입니까, 인간의 이성입니까?"', a1: '무조건적인 신앙과 계시', a2: '논리적인 증명과 토론', weight: { a1: { F: 2, J: 1 }, a2: { T: 2, P: 1 } } },
        { q: '"보편적 개념은 실제로 존재합니까?"', a1: '보편 실재가 존재한다', a2: '이름일 뿐이며 개별자만 실재한다', weight: { a1: { N: 2, J: 1 }, a2: { S: 2, P: 1 } } },
        { q: '"악은 왜 존재합니까?"', a1: '선의 결핍일 뿐이다', a2: '잘못된 자유의지의 결과다', weight: { a1: { I: 2, N: 1 }, a2: { E: 2, S: 1 } } },
        { q: '"신을 알기 위해서 무엇이 먼저입니까?"', a1: '믿음이 있어야 이해할 수 있다', a2: '의심하고 먼저 따져봐야 한다', weight: { a1: { F: 2, J: 1 }, a2: { T: 2, P: 1 } } },
        { q: '"수도원으로 들어가겠습니까?"', a1: '그렇다, 내면의 정화가 우선이다', a2: '아니다, 세상 속에서 실천하겠다', weight: { a1: { I: 2, F: 1 }, a2: { E: 2, T: 1 } } },
        { q: '"신의 법과 세속의 법이 충돌한다면?"', a1: '영원한 신의 법을 따른다', a2: '현실의 정당한 법을 따른다', weight: { a1: { J: 2, N: 1 }, a2: { P: 2, S: 1 } } },
        { q: '"죽음 이후의 삶은?"', a1: '천상의 복락 혹은 심판', a2: '자연의 에너지로 회귀', weight: { a1: { N: 2, F: 1 }, a2: { S: 2, T: 1 } } },
        { q: '"전통과 독창성 중 무엇이 중요합니까?"', a1: '오랜 세월 검증된 교회의 전통', a2: '개인의 주관적 영성 체험', weight: { a1: { S: 2, J: 1 }, a2: { N: 2, P: 1 } } },
        { q: '"인간의 본질은?"', a1: '은총이 필요한 죄인', a2: '이성을 갖춘 선한 가능성', weight: { a1: { I: 2, F: 1 }, a2: { E: 2, T: 1 } } },
        { q: '"토론을 즐기십니까?"', a1: '아니오, 신비한 침묵을 선호합니다', a2: '예, 엄밀한 논리 싸움을 즐깁니다', weight: { a1: { I: 2, N: 1 }, a2: { E: 2, S: 1 } } },
        { q: '"사랑(Agape)은?"', a1: '신성한 의무다', a2: '영원한 갈망이다', weight: { a1: { J: 2, T: 1 }, a2: { P: 2, F: 1 } } },
        { q: '"삶의 동력은?"', a1: '변치 않는 신앙', a2: '지적인 탐구', weight: { a1: { F: 2, J: 1 }, a2: { T: 2, P: 1 } } }
    ],
    modern_early: [
        { q: '"모든 것을 의심해보십시오. 확실한 것은 무엇입니까?"', a1: '생각하는 나의 존재', a2: '객관적인 수학적 질서', weight: { a1: { I: 2, N: 1 }, a2: { E: 2, S: 1 } } },
        { q: '"지식의 근원은 무엇입니까?"', a1: '타고난 이성적 관념', a2: '경험을 통한 습득', weight: { a1: { N: 2, J: 1 }, a2: { S: 2, P: 1 } } },
        { q: '"자연은 당신에게 어떤 의미입니까?"', a1: '신의 경이로운 섭리', a2: '정교하게 돌아가는 기계', weight: { a1: { F: 2, J: 1 }, a2: { T: 2, P: 1 } } },
        { q: '"국가는 왜 존재해야 합니까?"', a1: '강력한 힘으로 질서를 잡기 위해', a2: '개인의 자유를 계약으로 보장하기 위해', weight: { a1: { T: 2, J: 1 }, a2: { F: 2, P: 1 } } },
        { q: '"자유의지는 존재합니까?"', a1: '우리는 전적으로 자유롭다', a2: '물리적 인과법칙에 결정되어 있다', weight: { a1: { E: 2, J: 1 }, a2: { I: 2, P: 1 } } },
        { q: '"실험을 반복하시겠습니까?"', a1: '예, 귀납적 사실이 중요하다', a2: '아니오, 연역적 사유가 중요하다', weight: { a1: { E: 2, S: 1 }, a2: { I: 2, N: 1 } } },
        { q: '"도덕의 기준은?"', a1: '누구에게나 예외 없는 의무', a2: '최대 다수의 최대 행복', weight: { a1: { J: 2, T: 1 }, a2: { P: 2, F: 1 } } },
        { q: '"신은 어떤 존재입니까?"', a1: '우주를 설계한 정교한 건축가', a2: '나의 고통을 아는 인격적 존재', weight: { a1: { T: 2, N: 1 }, a2: { F: 2, S: 1 } } },
        { q: '"감정은 이성에게 무엇입니까?"', a1: '다스리고 통제해야 할 대상', a2: '이성을 움직이게 하는 실제 주인', weight: { a1: { J: 2, T: 1 }, a2: { P: 2, F: 1 } } },
        { q: '"과학의 발전에 대해?"', a1: '인류를 낙원으로 인도할 빛', a2: '도구적 이성의 타락일 뿐', weight: { a1: { N: 2, E: 1 }, a2: { S: 2, I: 1 } } },
        { q: '"진리를 찾는 신뢰할 만한 방법은?"', a1: '수학적 연역법', a2: '관찰에 근거한 귀납법', weight: { a1: { J: 2, N: 1 }, a2: { P: 2, S: 1 } } },
        { q: '"미래의 세계는?"', a1: '투명한 이성의 시대', a2: '억압 없는 자유의 시대', weight: { a1: { T: 2, J: 1 }, a2: { F: 2, P: 1 } } }
    ],
    modern_late: [
        { q: '"신은 죽었습니다. 이제 무엇을 따르겠습니까?"', a1: '과거를 파괴하고 나만의 가치 창조', a2: '전통의 미덕을 지키며 질서 유지', weight: { a1: { N: 2, P: 1 }, a2: { S: 2, J: 1 } } },
        { q: '"부조리한 우주를 보며 어떤 기분이 듭니까?"', a1: '허무를 직시하고 당당히 반항한다', a2: '보이지 않는 거대한 의지가 있다고 믿는다', weight: { a1: { N: 2, T: 1 }, a2: { S: 2, F: 1 } } },
        { q: '"어떤 인간이 되고 싶습니까?"', a1: '한계를 극복하는 강인한 초인', a2: '고통받는 자를 돌보는 연민의 인간', weight: { a1: { E: 2, T: 1 }, a2: { I: 2, F: 1 } } },
        { q: '"현대 문명에서 가장 두려운 것은?"', a1: '시스템의 부속품이 되는 것', a2: '군중 속에서 나를 잃어버리는 것', weight: { a1: { I: 2, N: 1 }, a2: { E: 2, S: 1 } } },
        { q: '"삶의 본질은?"', a1: '본질은 고통이며 쾌락은 잠시뿐이다', a2: '나 자신이 긍정한다면 충분히 즐겁다', weight: { a1: { I: 2, T: 1 }, a2: { E: 2, F: 1 } } },
        { q: '"당신을 정의하는 것은?"', a1: '주어진 상황과 타고난 기질', a2: '내가 매 순간 내리는 자유로운 선택', weight: { a1: { S: 2, J: 1 }, a2: { N: 2, P: 1 } } },
        { q: '"언어는 진리의 집입니까, 감옥입니까?"', a1: '진리를 가두는 한계일 뿐이다', a2: '진리를 드러내는 유일한 통로다', weight: { a1: { I: 2, N: 1 }, a2: { E: 2, S: 1 } } },
        { q: '"타인은 당신에게?"', a1: '나의 자유를 감시하는 지옥이다', a2: '함께 책임져야 할 동반자', weight: { a1: { T: 2, I: 1 }, a2: { F: 2, E: 1 } } },
        { q: '"죽음은?"', a1: '실존을 깨우는 비장하고 엄숙한 공포', a2: '부질없지만 담담히 받아들임', weight: { a1: { J: 2, N: 1 }, a2: { P: 2, S: 1 } } },
        { q: '"기계가 인간을 대체한다면?"', a1: '인간의 존엄은 대체 불가능하다', a2: '시스템과 진화하며 적응하겠다', weight: { a1: { F: 2, I: 1 }, a2: { T: 2, E: 1 } } },
        { q: '"무엇이 당신을 움직입니까?"', a1: '권력과 승리의 의지', a2: '조용한 관조와 해탈', weight: { a1: { E: 2, T: 1 }, a2: { I: 2, F: 1 } } },
        { q: '"어떤 세계를 창조하시겠습니까?"', a1: '영원히 되풀이되어도 당당한 세계', a2: '찰나의 유일한 가치가 빛나는 세계', weight: { a1: { J: 2, N: 1 }, a2: { P: 2, S: 1 } } }
    ]
};

// ===================== STATE =====================
let currentEra = 'ancient';
let currentStep = 0;
let userScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
let currentQuestions = [];
let isTypewriting = false;

// ===================== CORE FUNCTIONS =====================
// ===================== IMMERSIVE AUDIO ENGINE (WEB AUDIO SYNTH) =====================
let audioCtx = null;

function initAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function playTypewriterClick() {
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    // Synthesis for a "Heavy Mechanical Click"
    const bufferSize = audioCtx.sampleRate * 0.05; // 50ms
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1; // White noise
    }

    const noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    // Slight randomization for organic feel (800Hz - 1200Hz)
    filter.frequency.value = 800 + Math.random() * 400; 
    filter.Q.value = 1.5;

    const envelope = audioCtx.createGain();
    envelope.gain.setValueAtTime(0, audioCtx.currentTime);
    envelope.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.005);
    envelope.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

    noiseSource.connect(filter);
    filter.connect(envelope);
    envelope.connect(audioCtx.destination);

    noiseSource.start();
}

// Global listener to unlock audio context on first user gesture
document.addEventListener('click', initAudio, { once: true });
document.addEventListener('keydown', initAudio, { once: true });

function goTo(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    window.scrollTo(0, 0);
}

function startQuest(era) {
    currentEra = era;
    currentStep = 0;
    userScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    currentQuestions = QUEST_DATA[era];
    
    const bgMap = {
        ancient: 'assets/ancient_bg.png',
        medieval: 'assets/medieval_bg.png',
        modern_early: 'assets/modern_early_bg.png',
        modern_late: 'assets/modern_late_bg.png'
    };
    document.getElementById('screen-quest').style.backgroundImage = `url('${bgMap[era]}')`;
    
    goTo('screen-quest');
    renderQuestion();
}

function renderQuestion() {
    const data = currentQuestions[currentStep];
    const textEl = document.getElementById('typewriterText');
    const optionsWrap = document.getElementById('optionsWrap');
    
    document.getElementById('stepLabel').textContent = `STEP ${String(currentStep + 1).padStart(2, '0')} / 12`;
    document.getElementById('progressBar').style.width = `${((currentStep + 1) / 12) * 100}%`;
    optionsWrap.innerHTML = '';
    
    typewrite(textEl, data.q, () => {
        renderOptions(data);
    }, true);
}

function typewrite(el, text, callback, showCursor = false) {
    el.textContent = '';
    let i = 0;
    isTypewriting = true;

    const contentSpan = document.createElement('span');
    el.appendChild(contentSpan);

    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    if (showCursor) el.appendChild(cursor);

    const interval = setInterval(() => {
        contentSpan.textContent += text[i];
        if (text[i] !== ' ') {
            playTypewriterClick(); // Use synth instead of Audio object
        }
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            isTypewriting = false;
            if (callback) callback();
        }
    }, 45); 
}

function renderOptions(data) {
    const wrap = document.getElementById('optionsWrap');
    const opts = [
        { text: data.a1, val: 'a1' },
        { text: data.a2, val: 'a2' }
    ];
    
    opts.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt.text;
        btn.onclick = () => handleAnswer(opt.val);
        wrap.appendChild(btn);
        
        // Staggered reveal
        setTimeout(() => btn.classList.add('show'), idx * 200 + 100);
    });
}

function handleAnswer(choice) {
    if (isTypewriting) return;
    
    const weights = currentQuestions[currentStep].weight[choice];
    for (const [key, val] of Object.entries(weights)) {
        userScores[key] += val;
    }
    
    if (currentStep < 11) {
        currentStep++;
        renderQuestion();
    } else {
        processResult();
    }
}

function processResult() {
    goTo('screen-loading');
    
    const logs = [
        "영역적 사유의 패턴 분석 중...",
        "역사의 지평선 너머와 연결 중...",
        "MBTI 차원 벡터 계산 완료.",
        "가장 가까운 현자를 찾았습니다."
    ];
    
    let logIdx = 0;
    const logInterval = setInterval(() => {
        document.getElementById('loadingLogs').textContent = logs[logIdx];
        logIdx++;
        if (logIdx >= logs.length) clearInterval(logInterval);
    }, 1200);

    setTimeout(() => {
        const mbti = calculateMBTI();
        const match = findMatch(mbti, currentEra);
        showResult(match, mbti);
    }, 5000);
}

function calculateMBTI() {
    return [
        userScores.E >= userScores.I ? 'E' : 'I',
        userScores.N >= userScores.S ? 'N' : 'S',
        userScores.T >= userScores.F ? 'T' : 'F',
        userScores.J >= userScores.P ? 'J' : 'P'
    ].join('');
}

function findMatch(mbti, era) {
    const candidates = PHILS_DATA.filter(p => p.era === era);
    let bestMatch = candidates[0];
    let maxScore = -1;
    
    candidates.forEach(p => {
        let score = 0;
        for (let i = 0; i < 4; i++) { if (p.mbti[i] === mbti[i]) score++; }
        if (score > maxScore) { maxScore = score; bestMatch = p; }
    });
    return bestMatch;
}

function showResult(phil, mbti) {
    document.getElementById('resultMBTI').textContent = mbti;
    document.getElementById('resultName').textContent = phil.name;
    document.getElementById('resultQuote').textContent = phil.quote;
    document.getElementById('resultDesc').textContent = phil.modifier;
    
    const bgMap = {
        ancient: 'assets/ancient_bg.png',
        medieval: 'assets/medieval_bg.png',
        modern_early: 'assets/modern_early_bg.png',
        modern_late: 'assets/modern_late_bg.png'
    };
    document.getElementById('screen-result').style.backgroundImage = `url('${bgMap[phil.era]}')`;
    goTo('screen-result');
}

// ===================== GALLERY & SHARE =====================
function openGallery() {
    const grid = document.getElementById('hallGrid');
    grid.innerHTML = '';
    
    PHILS_DATA.forEach(p => {
        const card = document.createElement('div');
        card.className = 'hall-card';
        card.innerHTML = `
            <div class="hall-card-img" style="background-image: url('${p.portrait}')"></div>
            <div class="hall-card-info">
                <span class="hall-card-mbti">${p.mbti}</span>
                <span class="hall-card-name">${p.name}</span>
                <span class="hall-card-mod">${p.modifier}</span>
            </div>
        `;
        card.onclick = () => openProfile(p);
        grid.appendChild(card);
    });
    
    goTo('screen-hall');
}

function openProfile(p) {
    const modal = document.getElementById('modal-profile');
    document.getElementById('profName').textContent = p.name;
    document.getElementById('profMBTI').textContent = p.mbti;
    document.getElementById('profQuote').textContent = p.quote;
    document.getElementById('profAchievements').textContent = p.achievements;
    document.getElementById('profTraits').textContent = p.traits;
    document.getElementById('profImg').style.backgroundImage = `url('${p.portrait}')`;
    
    modal.classList.add('active');
}

function closeProfile() {
    document.getElementById('modal-profile').classList.remove('active');
}

function shareResult() {
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            showToast("링크가 클립보드에 복사되었습니다.");
        }).catch(() => {
            openShareModal(url);
        });
    } else {
        openShareModal(url);
    }
}

function openShareModal(url) {
    const popup = document.getElementById('modal-share');
    document.getElementById('shareUrlInput').value = url;
    popup.classList.add('active');
}

function closeShare() {
    document.getElementById('modal-share').classList.remove('active');
}

function copyUrlFromModal() {
    const input = document.getElementById('shareUrlInput');
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand('copy');
    showToast("URL이 복사되었습니다.");
    closeShare();
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===================== INIT =====================
window.onload = () => {
    // Initial Landing BG
    document.getElementById('screen-landing').style.backgroundImage = "url('assets/landing_bg.png')";
    
    // Typewriter intro
    const sub = document.getElementById('landingSubtitle');
    if (sub) {
        const txt = sub.textContent;
        sub.textContent = '';
        setTimeout(() => {
            typewrite(sub, txt, null, true);
        }, 800);
    }
};
