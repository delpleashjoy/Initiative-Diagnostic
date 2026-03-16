// ═══════════════════ WAVE ═══════════════════
const canvas = document.getElementById('signal');
const ctx    = canvas.getContext('2d');
let W, H, phase=0, turbulence=0.6;
function resize(){ W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; }
window.addEventListener('resize',resize); resize();
function drawWave(){
  ctx.clearRect(0,0,W,H);
  for(let l=0;l<5;l++){
    ctx.beginPath();
    ctx.strokeStyle=`rgba(212,175,55,${0.25-l*0.04})`;
    ctx.lineWidth=1;
    for(let x=0;x<=W;x+=3){
      const n=turbulence>0?(Math.random()-0.5)*turbulence*20:0;
      const y=H/2+Math.sin((x/W)*Math.PI*3+phase+l*0.7)*(30+l*12)+n;
      x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.stroke();
  }
  phase+=0.012;
  requestAnimationFrame(drawWave);
}
drawWave();

// ═══════════════════ DATA ═══════════════════
const QUESTIONS = [
  {id:'q1', domain:'Signal 1 of 5', domainShort:'Mental Load', section:1,
   text:'How many times per week do you remind your partner about recurring responsibilities?',
   sub:'Count every reminder — verbal, text, sticky note.',
   opts:[{v:1,t:'Rarely — 0 to 1 times'},{v:2,t:'Sometimes — 2 to 4 times'},{v:3,t:'Often — 5 to 9 times'},{v:4,t:'Daily — 10 or more times'}]},
  {id:'q2', domain:'Signal 1 of 5', domainShort:'Mental Load', section:1,
   text:'When your partner asks "What should we do / get / plan?" — what happens internally?',
   sub:'Notice the feeling before you answer. That reaction is data.',
   opts:[{v:1,t:'I answer easily — no stress'},{v:2,t:'Minor irritation — I answer but feel the weight'},{v:3,t:'Real frustration — a project just landed on me'},{v:4,t:'Resentment — Why is this always mine to carry?'}]},
  {id:'q3', domain:'Signal 1 of 5', domainShort:'Mental Load', section:1,
   text:'How often does your partner notice something needs doing — and handle it — before you mention it?',
   sub:'Think of specific examples, not how you wish it were.',
   opts:[{v:4,t:'Rarely or never'},{v:3,t:'Occasionally — a few times a month'},{v:2,t:'Fairly often — a few times a week'},{v:1,t:'Consistently — he\'s proactive'}]},
  {id:'q4', domain:'Signal 1 of 5', domainShort:'Mental Load', section:1,
   text:'How much of the household mental load do you carry — planning, scheduling, anticipating needs?',
   sub:'Include the invisible work: what you track, anticipate, and pre-solve.',
   opts:[{v:1,t:'Equal share — we carry it together'},{v:2,t:'Slightly more on me — noticeable but manageable'},{v:3,t:'Mostly mine — he contributes occasionally'},{v:4,t:'Almost entirely mine — I do the thinking for both'}]},

  {id:'q6', domain:'Signal 2 of 5', domainShort:'Overfunctioning', section:2,
   text:'When you stop reminding or initiating, what typically happens?',
   sub:'Be honest. This is the question most women answer differently after really sitting with it.',
   opts:[{v:1,t:'He handles it without being asked'},{v:2,t:'It gets done eventually — sometimes late'},{v:3,t:'It often doesn\'t get done — I end up doing it'},{v:4,t:'Nothing happens. I\'ve stopped stopping.'}]},
  {id:'q7', domain:'Signal 2 of 5', domainShort:'Overfunctioning', section:2,
   text:'How often do you take over a task because it\'s "just easier" or "faster to do it yourself"?',
   sub:'Each time you absorb it, you train the system that his effort is optional.',
   opts:[{v:1,t:'Almost never'},{v:2,t:'Occasionally'},{v:3,t:'Often'},{v:4,t:'It\'s my default mode'}]},
  {id:'q9', domain:'Signal 2 of 5', domainShort:'Overfunctioning', section:2,
   text:'Has your competence — your ability to handle everything — made it harder for him to step up?',
   sub:'This isn\'t about blame. It\'s about seeing the feedback loop clearly.',
   opts:[{v:1,t:'No — my competence hasn\'t been a factor'},{v:2,t:'Possibly — I haven\'t fully considered it'},{v:3,t:'Probably — I\'ve made it easy for him not to step up'},{v:4,t:'Yes — I\'ve become the system and he\'s become the user'}]},
  {id:'q10', domain:'Signal 2 of 5', domainShort:'Overfunctioning', section:2,
   text:'How often do you feel exhausted — not just physically, but from the weight of being responsible for everything?',
   opts:[{v:1,t:'Rarely'},{v:2,t:'Sometimes — weekly'},{v:3,t:'Often — several times a week'},{v:4,t:'Almost daily — it\'s my baseline'}]},

  {id:'q11', domain:'Signal 3 of 5', domainShort:'Signal Stability', section:3,
   text:'When conflict or tension arises, what does your partner typically do?',
   sub:'His response pattern here is a direct signal of the system\'s stability.',
   opts:[{v:1,t:'Engages directly — we work through it'},{v:2,t:'Slows down but eventually engages'},{v:3,t:'Goes quiet — withdraws until it blows over'},{v:4,t:'Fully shuts down — sometimes for days'}]},
  {id:'q12', domain:'Signal 3 of 5', domainShort:'Signal Stability', section:3,
   text:'How often do you feel emotionally alone — even when he is physically present?',
   sub:'This is one of the most common — and least talked about — forms of imbalance.',
   opts:[{v:1,t:'Almost never'},{v:2,t:'Occasionally'},{v:3,t:'Frequently'},{v:4,t:'It\'s become the norm'}]},
  {id:'q13', domain:'Signal 3 of 5', domainShort:'Signal Stability', section:3,
   text:'When he does try to step up — even imperfectly — what is your honest reaction?',
   sub:'This is about your pattern, not his effort. Answer without editing yourself.',
   opts:[{v:1,t:'I appreciate it and let him do it his way'},{v:2,t:'I notice it, but I still feel the urge to correct'},{v:3,t:'I often redo it or point out what he missed'},{v:4,t:'It\'s hard to feel grateful — I\'m too exhausted to notice'}]},
  {id:'q14', domain:'Signal 3 of 5', domainShort:'Signal Stability', section:3,
   text:'How easy is it for you to let your partner see that you need him — genuinely, not strategically?',
   sub:'Not asking for help. Needing him. There\'s a difference.',
   opts:[{v:1,t:'Easy — I show it naturally'},{v:2,t:'Possible but uncomfortable — it doesn\'t come naturally'},{v:3,t:'Very difficult — showing need feels like losing ground'},{v:4,t:'I\'ve stopped trying — it feels safer to be self-sufficient'}]},

  {id:'q16', domain:'Signal 4 of 5', domainShort:'Ownership', section:4,
   text:'How clearly defined are responsibility domains in your relationship — who owns what?',
   opts:[{v:1,t:'Very clear — we both know what we own'},{v:2,t:'Somewhat clear — some grey areas'},{v:3,t:'Mostly unclear — ownership shifts constantly'},{v:4,t:'No structure — everything defaults to me'}]},
  {id:'q17', domain:'Signal 4 of 5', domainShort:'Ownership', section:4,
   text:'When a responsibility is handed to your partner, how often does it stay his — without you following up?',
   opts:[{v:1,t:'Almost always — he follows through independently'},{v:2,t:'Usually — occasional slip'},{v:3,t:'Rarely — I always have to check'},{v:4,t:'Never — it always comes back to me'}]},
  {id:'q18', domain:'Signal 4 of 5', domainShort:'Ownership', section:4,
   text:'Has he explicitly acknowledged the imbalance and committed to changing a specific behavior?',
   opts:[{v:1,t:'Yes — and he\'s maintained it'},{v:2,t:'Yes — but the change didn\'t hold'},{v:3,t:'He acknowledges it verbally, then reverts'},{v:4,t:'He denies the imbalance or minimizes it'}]},

  {id:'q20', domain:'Signal 5 of 5', domainShort:'Sustainability', section:5,
   text:'How has your level of resentment changed over the past 12 months?',
   sub:'Resentment is not a character flaw. It\'s a structural signal. Answer honestly.',
   opts:[{v:1,t:'It has decreased — things have improved'},{v:2,t:'It\'s stayed about the same'},{v:3,t:'It has increased — quietly building'},{v:4,t:'It has increased significantly — I feel it often'}]},
  {id:'q22', domain:'Signal 5 of 5', domainShort:'Sustainability', section:5,
   text:'Has attraction or desire toward your partner decreased because of the dynamic — not just general fatigue?',
   sub:'Initiative imbalance and attraction are directly linked. This is foundational, not personal.',
   opts:[{v:1,t:'Not a factor — attraction is strong'},{v:2,t:'Occasionally connected — when he\'s being passive'},{v:3,t:'Often — harder to feel close when I\'m managing him'},{v:4,t:'Significantly — attraction has largely faded'}]},
  {id:'q25', domain:'Signal 5 of 5', domainShort:'Sustainability', section:5,
   text:'If this dynamic corrected — what would feel different first?',
   sub:'There is no wrong answer. This maps what matters most to you.',
   opts:[{v:1,t:'I would stop feeling so alone inside the relationship'},{v:2,t:'I would feel less exhausted — like the weight had lifted'},{v:3,t:'I would feel attracted to him again'},{v:4,t:'I would finally feel like a partner — not a manager'}]},
];

const SECTION_META = {
  1:{name:'Reminder Frequency & Mental Load',         done:'Mental Load Signal Captured',   next:'Overfunctioning & the Competence Trap'},
  2:{name:'Overfunctioning & the Competence Trap',    done:'Overfunctioning Index Logged',   next:'Emotional Withdrawal & Signal Stability'},
  3:{name:'Emotional Withdrawal & Signal Stability',  done:'Withdrawal Signal Recorded',     next:'Ownership Clarity & Responsibility Architecture'},
  4:{name:'Ownership Clarity & Responsibility Architecture', done:'Ownership Architecture Mapped', next:'Emotional Sustainability'},
  5:{name:'Emotional Sustainability',                 done:'All Signals Captured',           next:null},
};

// ═══════════════════ STATE ═══════════════════
let currentQ = 0;
let answers  = {};
let busy     = false;

// ═══════════════════ SCREENS ═══════════════════
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>{ s.classList.remove('active'); s.style.display=''; });
  const el=document.getElementById(id);
  el.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

// ═══════════════════ GATE ═══════════════════
let _gateName      = '';
let _gateEmail     = '';
let _previewScore  = 0;
let _scoreTier     = '';

function submitGate(){
  const name  = document.getElementById('gateName').value.trim();
  const email = document.getElementById('gateEmail').value.trim();
  const err   = document.getElementById('gateError');
  if(!name){ err.textContent='Please enter your first name.'; return; }
  if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ err.textContent='Please enter a valid email address.'; return; }
  err.textContent='';
  _gateName  = name;
  _gateEmail = email;

  // ── Kit subscription — proxied through backend (key stays server-side) ──
  const TIER_TAG = {
    stable:   'imbalance-score-low',
    moderate: 'imbalance-score-moderate',
    high:     'imbalance-score-high',
    critical: 'imbalance-score-critical'
  };
  const tagsToApply = ['diagnostic-lead', TIER_TAG[_scoreTier]].filter(Boolean);

  fetch('/api/subscribe', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      tags:          tagsToApply,
      scoreTier:     _scoreTier,
      initiativeScore: _previewScore
    })
  })
  .then(r => r.json())
  .then(d => console.log('[Kit] Subscribe result:', d.ok))
  .catch(e => console.error('[Kit] Subscribe error:', e));
  // ─────────────────────────────────────────────────────────────────────

  showResults();
}

// ═══════════════════ QUIZ FLOW ═══════════════════
function startQuiz(){
  currentQ=0; answers={}; turbulence=0.6;
  showScreen('quizScreen');
  renderQ(currentQ,'in');
}

function renderQ(idx, dir){
  const q   = QUESTIONS[idx];
  const pct = Math.round((idx/QUESTIONS.length)*100);
  const letters = ['A','B','C','D','E'];
  const sel  = answers[q.id]||null;
  const isLast = idx===QUESTIONS.length-1;

  document.getElementById('progressFill').style.width = pct+'%';
  document.getElementById('progressPct').textContent  = pct+'%';
  document.getElementById('progressQnum').textContent = `${idx+1} / ${QUESTIONS.length}`;
  document.getElementById('progressDomain').textContent = q.domainShort;
  turbulence = 0.6-(pct/100)*0.55;

  const optsHTML = q.opts.map((o,i)=>`
    <div class="opt${sel&&sel.v===o.v?' selected':''}"
         onclick="pickAnswer(this,${o.v},${i})">
      <span class="opt-letter">${letters[i]}</span>
      <span class="opt-text">${o.t}</span>
      <span class="opt-check">✓</span>
    </div>`).join('');

  const card = document.getElementById('questionCard');
  card.className = 'question-card';
  card.innerHTML = `
    <div class="domain-badge"><span class="domain-dot"></span>${q.domain} — ${SECTION_META[q.section].name}</div>
    <div class="q-text">${q.text}</div>
    ${q.sub?`<div class="q-sub">${q.sub}</div>`:''}
    <div class="options-wrap">${optsHTML}</div>
    <div class="nav-row">
      <button class="nav-back${idx===0?' nav-hidden':''}" onclick="goBack()">← Back</button>
      <div class="nav-right">
        <span class="nav-hint${sel?'':' nav-hint-show'}" id="navHint">Select an answer to continue</span>
        <button class="nav-next${sel?' ready':''}" id="nextBtn" onclick="goNext()">
          ${isLast?'▶ &nbsp; Run Diagnostic':'Next &nbsp;→'}
        </button>
      </div>
    </div>`;

  requestAnimationFrame(()=>{
    card.classList.add(dir==='back'?'animate-in-back':'animate-in');
  });
}

function pickAnswer(el, val, optIdx){
  const q = QUESTIONS[currentQ];
  answers[q.id] = {v:val, t:q.opts[optIdx].t};
  document.querySelectorAll('.opt').forEach(o=>o.classList.remove('selected'));
  el.classList.add('selected');
  const btn = document.getElementById('nextBtn');
  if(btn) btn.classList.add('ready');
  const hint = document.getElementById('navHint');
  if(hint) hint.classList.remove('nav-hint-show');
  const delay = QUESTIONS[currentQ].sub ? 600 : 360;
  setTimeout(()=>goNext(), delay);
}

function goNext(){
  if(busy) return;
  const q = QUESTIONS[currentQ];
  if(!answers[q.id]) return;
  const isLastInSection = currentQ<QUESTIONS.length-1 && q.section!==QUESTIONS[currentQ+1].section;
  const isLastQ = currentQ===QUESTIONS.length-1;
  if(isLastQ){ runDiagnostic(); return; }
  if(isLastInSection){ slideCardOut('out', ()=>showTransition(q.section)); return; }
  slideCardOut('out', ()=>{ currentQ++; renderQ(currentQ,'in'); });
}

function goBack(){
  if(busy||currentQ===0) return;
  slideCardOut('out-back', ()=>{ currentQ--; renderQ(currentQ,'back'); });
}

function slideCardOut(animClass, cb){
  busy=true;
  const card=document.getElementById('questionCard');
  card.className='question-card '+(animClass==='out'?'animate-out':'animate-out-back');
  setTimeout(()=>{ busy=false; cb(); }, 260);
}

// ═══════════════════ SECTION TRANSITION ═══════════════════
function showTransition(sectionNum){
  const meta = SECTION_META[sectionNum];
  const nextM= SECTION_META[sectionNum+1];
  const card = document.getElementById('questionCard');
  card.className='question-card animate-in';
  card.innerHTML=`
    <div class="section-transition">
      <div class="st-icon">✓</div>
      <div class="st-tag">Signal ${String(sectionNum).padStart(2,'0')} Complete</div>
      <div class="st-name">${meta.done}</div>
      <div class="st-desc">Signal logged. Moving to the next domain.</div>
      ${nextM?`<div class="st-next-label">Next Signal</div><div class="st-next-name">${nextM.name}</div>`:''}
      <button class="st-btn" onclick="continueAfterTransition()">Continue &nbsp;→</button>
    </div>`;
}

function continueAfterTransition(){
  slideCardOut('out', ()=>{ currentQ++; renderQ(currentQ,'in'); });
}

// ═══════════════════ ANALYZING ═══════════════════
function runDiagnostic(){
  document.getElementById('quizScreen').style.display='none';
  const ov=document.getElementById('analyzingOverlay');
  ov.classList.add('active');

  let pct=0;
  const pi=setInterval(()=>{ pct=Math.min(pct+3,100); document.getElementById('analyzingPct').textContent=pct+'%'; if(pct>=100) clearInterval(pi); },35);

  const steps=[
    {id:'step1',d:100,dur:500},{id:'step2',d:650,dur:500},{id:'step3',d:1200,dur:500},
    {id:'step4',d:1750,dur:500},{id:'step5',d:2250,dur:500},{id:'step6',d:2750,dur:500},
  ];
  steps.forEach(s=>{
    setTimeout(()=>{ document.getElementById(s.id).classList.add('visible','active'); },s.d);
    setTimeout(()=>{ const e=document.getElementById(s.id); e.classList.remove('active'); e.classList.add('done'); },s.d+s.dur);
  });
  setTimeout(()=>{
    ov.classList.remove('active');
    const pd1=Math.round(((v('q1')+v('q2')+v('q3')+v('q4'))/16)*20);
    const pd2=Math.round(((v('q6')+v('q7')+v('q9')+v('q10'))/16)*20);
    const pd3=Math.round(((v('q11')+v('q12')+v('q13')+v('q14'))/16)*20);
    const pd4=Math.round(((v('q16')+v('q17')+v('q18'))/12)*20);
    const pd5=Math.round(((v('q20')+v('q22')+v('q25'))/12)*20);
    const previewScore=Math.min(100,Math.round([pd1,pd2,pd3,pd4,pd5].reduce((s,d)=>s+d,0)/5*5));
    const tierLabel=previewScore<=30?'EARLY DETECTION — PATTERN FORMING':previewScore<=55?'MODERATE DRIFT — CYCLE RUNNING':previewScore<=75?'ADVANCED DRIFT — PATTERN EMBEDDED':'CHRONIC INITIATIVE COLLAPSE';
    _previewScore = previewScore;
    _scoreTier    = previewScore<=30?'stable':previewScore<=55?'moderate':previewScore<=75?'high':'critical';
    const scoreColor=previewScore<=30?'#5cb85c':previewScore<=55?'#D4AF37':previewScore<=75?'#D4AF37':'#e05c5c';
    const scoreNumEl=document.getElementById('gateScoreNum');
    scoreNumEl.innerHTML=`${previewScore}<span>/100</span>`;
    scoreNumEl.style.color=scoreColor;
    const tierEl=document.getElementById('gateScoreTier');
    tierEl.textContent=tierLabel;
    tierEl.style.color=scoreColor;
    tierEl.style.borderColor=scoreColor+'55';
    tierEl.style.background=scoreColor+'11';
    showScreen('gateScreen');
  },3500);
}

// ═══════════════════ RESULTS ═══════════════════
function v(id){ return answers[id]?answers[id].v:1; }
function t(id){ return answers[id]?answers[id].t:''; }

function showResults(){
  showScreen('resultsScreen');
  const gs = document.getElementById('gateScreen');
  gs.classList.remove('active');
  gs.style.display = 'none';

  const d1=Math.round(((v('q1')+v('q2')+v('q3')+v('q4'))/16)*20);
  const d2=Math.round(((v('q6')+v('q7')+v('q9')+v('q10'))/16)*20);
  const d3=Math.round(((v('q11')+v('q12')+v('q13')+v('q14'))/16)*20);
  const d4=Math.round(((v('q16')+v('q17')+v('q18'))/12)*20);
  const d5=Math.round(((v('q20')+v('q22')+v('q25'))/12)*20);

  const domains=[
    {name:'REMINDER FREQUENCY & MENTAL LOAD', raw:d1, max:20},
    {name:'OVERFUNCTIONING INDEX',             raw:d2, max:20},
    {name:'EMOTIONAL WITHDRAWAL SIGNAL',       raw:d3, max:20},
    {name:'OWNERSHIP CLARITY',                 raw:d4, max:20},
    {name:'EMOTIONAL SUSTAINABILITY',          raw:d5, max:20},
  ];

  const totalScore=Math.min(100,Math.round(domains.reduce((s,d)=>s+d.raw,0)/5*5));

  turbulence=0;

  let disp=0;
  const iv=setInterval(()=>{ disp=Math.min(disp+1,totalScore); document.getElementById('scoreDisplay').textContent=disp; if(disp>=totalScore) clearInterval(iv); },35);
  const circ=2*Math.PI*70;
  setTimeout(()=>{
    const c=document.getElementById('scoreCircle');
    c.style.strokeDashoffset=circ-(totalScore/100)*circ;
    c.style.stroke=totalScore>=75?'#e05c5c':totalScore>=50?'#D4AF37':'#5cb85c';
  },300);

  const levels=[
    {max:30,
     level:'YOU CAUGHT IT EARLY',
     title:'Your score is low. The pattern hasn\'t locked in. This is the best possible moment.',
     tagline:'Something brought you here — a small friction, a recurring feeling, an instinct that something is slightly off. That instinct is worth trusting. At this level, structural correction is the easiest it will ever be.',
     trajectory:null,
     benchmark:'Women scoring in your range are rare — most don\'t take a diagnostic until the resentment is already active. You\'re ahead of the curve.',
     insight:'Your diagnostic shows initiative imbalance is present but early-stage. Overfunctioning hasn\'t fully calcified, and emotional connection remains relatively intact. The patterns you\'re sensing are real signals — not overreactions, not perfectionism. This is the easiest stage to correct precisely because neither of you has fully settled into the roles yet. You don\'t need to wait for it to get worse to justify addressing it.'},
    {max:55,
     level:'THE CYCLE IS RUNNING',
     title:'You\'re compensating more than you realise — and he\'s relying on it.',
     tagline:'It looks fine on the outside. You\'re holding it together. But inside, you\'re quietly doing the thinking, planning, and remembering for both of you — and a low-level resentment is starting to build.',
     trajectory:'Without a systemic change, this cycle typically becomes the permanent operating mode within 12–18 months. The resentment gets quieter — not because things improve, but because you stop expecting them to.',
     benchmark:'Women scoring in your range describe their relationship as functional but quietly draining — and have usually been managing the imbalance for 1–2 years without naming it directly.',
     insight:'Your diagnostic reveals an active Competence Trap in development. You are compensating more than you realise, and he is under-initiating more than either of you has named directly. The cycle is self-reinforcing: your competence covers his absence; his absence deepens your competence. This is fixable — but not through conversation alone.'},
    {max:75,
     level:'YOU\'VE BEEN CARRYING THIS A LONG TIME',
     title:'You\'ve been carrying this so long it\'s become invisible — to both of you.',
     tagline:'This isn\'t a rough patch. This is a pattern that has been running long enough that it feels normal. You\'ve adapted to it so well that stepping back feels impossible — like if you stop, everything falls apart.',
     trajectory:'Without a systemic change, attraction erosion and emotional distance typically become the dominant relational tone within 6–12 months. The resentment is already building — even when you\'re not fully aware of it.',
     benchmark:'Women scoring in your range have typically been managing this for 2–4 years. Most say the same thing: "I\'ve tried talking about it. Nothing changes."',
     insight:'Your diagnostic reveals significant imbalance across multiple domains. You are functioning as the relationship\'s planner, logistics manager, and emotional anchor — simultaneously. The pattern has been running long enough that both of you now operate within it automatically. You\'ve become the infrastructure. He\'s become the user. This isn\'t a character flaw on either side. It\'s a systemic problem — and the system is what needs to change.'},
    {max:100,
     level:'YOU\'RE EXHAUSTED — AND YOU\'VE BEEN RIGHT ALL ALONG',
     title:'You\'re exhausted. Not from weakness. From carrying what was never only yours.',
     tagline:'This isn\'t about needing to communicate better or be more patient. You\'ve done that. The resentment you\'re feeling isn\'t irrational — it\'s the accurate signal of a system that has been drawing on you for too long.',
     trajectory:'At this level, the relationship is running on emotional reserves. Chronic imbalance at this stage is strongly linked to emotional exit — even when leaving hasn\'t consciously been considered.',
     benchmark:'Women scoring in your range have typically been managing this alone for 3–5 years. Most can name the exact moment they realised the pattern wasn\'t going to change on its own.',
     insight:'Your diagnostic reveals chronic initiative collapse. The resentment has moved from quiet to active. Attraction, emotional presence, and connection are all affected. You are not too demanding. You are not too much. You have been over-leveraged for too long in a system that stopped working — and you\'ve been absorbing the damage to hold it together. More patience is not the answer. Systemic correction is.'},
  ];

  const lv=levels.find(l=>totalScore<=l.max)||levels[levels.length-1];
  document.getElementById('resultLevel').textContent=lv.level;
  document.getElementById('resultTitle').textContent=lv.title;
  document.getElementById('resultTagline').textContent=lv.tagline;
  document.getElementById('insightText').textContent=lv.insight;
  document.getElementById('resultBenchmark').textContent=lv.benchmark;
  const trajEl=document.getElementById('resultTrajectory');
  if(lv.trajectory){ trajEl.textContent='⚠ '+lv.trajectory; trajEl.classList.add('visible'); }
  else { trajEl.classList.remove('visible'); }

  if(_gateName){
    document.getElementById('resultsGreeting').textContent = 'Welcome, ' + _gateName + '. Here is your structural read.';
  }

  const finds=[];
  if(v('q1')>=3)  finds.push('You\'re reminding him constantly — which means you\'ve become the memory system for both of you.');
  if(v('q6')>=3)  finds.push('When you stop initiating, things stop — which means the whole system depends on you showing up first.');
  if(v('q9')>=3)  finds.push('Your ability to handle everything is making it easier for him not to. That\'s not a compliment to you — it\'s the trap.');
  if(v('q11')>=3) finds.push('He goes quiet when things get hard — and you push harder to reach him. That loop is exhausting both of you.');
  if(v('q18')>=3) finds.push('He says the right things but the behaviour doesn\'t change. Over time, you\'ve stopped trusting his words — for good reason.');
  if(v('q20')>=3) finds.push('The resentment is building. That\'s not you being difficult. That\'s the accurate signal of a system drawing on you for too long.');
  if(v('q22')>=3) finds.push('It\'s hard to feel close to someone you\'re managing. The distance you\'re feeling isn\'t about chemistry — it\'s about architecture.');
  document.getElementById('keyFindings').innerHTML=finds.map(f=>`<div class="finding-item"><span class="finding-dot">▸</span><span>${f}</span></div>`).join('');

  document.getElementById('domainGrid').innerHTML=domains.map(d=>{
    const pct=Math.round((d.raw/d.max)*100);
    return `<div class="domain-card">
      <div class="domain-name">${d.name}</div>
      <div class="domain-bar-track"><div class="domain-bar-fill" data-w="${pct}"></div></div>
      <div class="domain-score-row"><div class="domain-insight">${domainInsight(d.name,pct)}</div><div class="domain-pct">${pct}%</div></div>
    </div>`;
  }).join('');
  setTimeout(()=>document.querySelectorAll('.domain-bar-fill').forEach(e=>e.style.width=e.dataset.w+'%'),100);

  const driftDefs=[
    {qid:'q1',  label:'You\'ve become the reminder system',
     read:t=>`You indicated reminders happen "${t}". When reminders run this high, initiative has embedded itself in you. He is not forgetting. The system has been built around your memory.`,
     firstMove:`This week, let one recurring reminder go unanswered. Don't fill the gap. Don't explain why. Just watch what happens. That gap is where his initiative either grows — or confirms what you already know.`},
    {qid:'q6',  label:'When you stop, everything stops',
     read:t=>`You said: "${t}". The gap only stays invisible because you fill it. When you stop, the system stalls. This is not his laziness. It is a feedback loop that has never been challenged.`,
     firstMove:`Choose one task you have been absorbing silently. Transfer it clearly: "This is yours now. I won't be following up." Then don't follow up. The discomfort you feel is the system resisting change.`},
    {qid:'q9',  label:'Your competence is covering for his absence',
     read:t=>`You indicated: "${t}". Your capability has become the cover for his absence. The more reliably you absorb, the less pressure there is for him to show up. This is not a compliment. It is the trap.`,
     firstMove:`This week, do something imperfectly on purpose — in a domain he could own. Let the standard slip slightly. Not to punish him. To see if he notices. His response is your data.`},
    {qid:'q7',  label:'You take over because it\'s faster — and it\'s costing you',
     read:t=>`You said this happens "${t}". Every time you take over because it\'s easier, you train the system that his effort is optional. The efficiency feels practical. But it accelerates the imbalance.`,
     firstMove:`Next time you feel the urge to take over mid-task, stop. Say nothing. Leave the room if you have to. The inefficiency you\'re tolerating is the space where ownership can transfer.`},
    {qid:'q11', label:'He goes quiet when things get hard',
     read:t=>`You described his conflict response as: "${t}". When he withdraws, you push harder to stay connected. That push gets read as pressure — not as pursuit. The real signal gets lost in the noise.`,
     firstMove:`Next time he withdraws, don't pursue. Say: "I'm here when you're ready." Then stop. What you're installing is the signal that withdrawal doesn't earn distance — it earns a waiting presence.`},
    {qid:'q12', label:'You feel alone even when he\'s in the room',
     read:t=>`You said you feel alone "${t}". Emotional absence while physically present is one of the most exhausting forms of imbalance — because there is no clear moment to name it. It is felt, not seen.`,
     firstMove:`Name it without escalating. Once. "I feel alone even when you're here." Stop there. Don't explain. Don't justify. Give him the data point without the argument attached.`},
    {qid:'q18', label:'He says the right things — but nothing changes',
     read:t=>`You indicated: "${t}". Words of acknowledgment without behavioural follow-through are not progress — they are placation. Over time, they train you not to trust his words. That erosion is real.`,
     firstMove:`The next time he acknowledges the imbalance, respond with: "I appreciate that. What will you do differently this week — specifically?" Then wait. His answer, or his silence, is your data.`},
    {qid:'q20', label:'The resentment is building — quietly',
     read:t=>`You said resentment has "${t}". Rising resentment is not a character flaw. It is the accurate signal of a system that is not sustainable. This is not bitterness. This is data.`,
     firstMove:`Write down the three things generating the most resentment right now. For each one, ask: is this actually mine to carry? If the honest answer is no — that is an ownership transfer waiting to happen.`},
    {qid:'q22', label:'It\'s getting harder to feel close to him',
     read:t=>`You selected: "${t}". It is very difficult to feel desire for someone you\'re managing. The distance you\'re feeling isn\'t about chemistry fading. It\'s about the imbalance creating a polarity collapse.`,
     firstMove:`Stop managing one thing this week — even briefly. Even 20 minutes of not managing creates a different frequency in the room. Notice what happens when you stop running the system.`},
    {qid:'q16', label:'Nobody\'s clear on who owns what',
     read:t=>`You described ownership clarity as: "${t}". When no one clearly owns the outcome, reminders increase and initiative decreases. Ambiguity always resolves toward the person with higher standards — which is you.`,
     firstMove:`Name one domain — just one — and assign it clearly: "This is yours. Fully. I won't touch it." No conditions. No fallback plan. Clear ownership is the only environment where initiative has room to grow.`},
  ];

  const top3=driftDefs.map(d=>({...d,score:v(d.qid),ans:t(d.qid)})).sort((a,b)=>b.score-a.score).slice(0,3);
  document.getElementById('driftBlock').innerHTML=top3.map((item,i)=>`
    <div class="drift-item" id="drift${i}">
      <div class="drift-rank">0${i+1}</div>
      <div class="drift-content">
        <div class="drift-label">${item.label}</div>
        <div class="drift-answer">"${item.ans}"</div>
        <div class="drift-read">${item.read(item.ans)}</div>
        <div class="drift-first-move">
          <div class="drift-first-move-label">⊳ &nbsp;First Move This Week</div>
          <div class="drift-first-move-text">${item.firstMove}</div>
        </div>
      </div>
    </div>`).join('');
  setTimeout(()=>{ const e=document.getElementById('drift0'); if(e) e.classList.add('visible'); },400);
  setTimeout(()=>{ const e=document.getElementById('drift1'); if(e) e.classList.add('visible'); },700);
  setTimeout(()=>{ const e=document.getElementById('drift2'); if(e) e.classList.add('visible'); },1000);

  const ctas={
    stable:{
      after:'Your score shows the pattern is early — which means you still have full range of motion. Most women don\'t catch it here. The ones who do, and act on it, never have to have the exhausted version of this conversation.',
      testimonial:'I took it before things got bad. Honestly the Reset just named what I was already sensing — and gave me the language to shift it before it became a fight. — Founder, 36',
      title:'You Caught It Early. This Is What To Do With That.',
      body:'The 14-day Reset works fastest at this stage — because the system hasn\'t fully calcified. One structural shift per day, starting with the domain your answers flagged most clearly.',
      forward:'The women who catch this early and act on it describe the same thing six months later: the conversation they were dreading never happened. Not because they avoided it — because the structural shift made it unnecessary.',
      btn:'Start My Free Reset →'
    },
    moderate:{
      after:'The cycle is running — but it hasn\'t locked in yet. The 14-day Reset starts where your score left off: the Competence Trap, strategic stepping back, and how to install ownership that actually holds.',
      testimonial:'After Day 5 I stopped repeating myself about the same things. First time in two years he just handled it without me saying a word. — Marketing Director, 42',
      title:'Break The Cycle Before It Becomes The Default',
      body:'Your score shows active imbalance across multiple domains. The course gives you a daily systemic shift — no long sessions, no difficult conversations required to begin.',
      forward:'When women at your score level reach the other side, they consistently describe the same thing: they stopped managing, and he started showing up. Not perfectly. But voluntarily. That shift — from supervised to chosen — is what this course is built to install.',
      btn:'Start My Free Course →'
    },
    high:{
      after:'You\'ve been carrying this long enough that the weight feels normal. The 14-day Reset starts by showing you exactly what you\'ve been absorbing — and gives you a daily step to hand it back, without collapse.',
      testimonial:'By Day 8 something shifted. I didn\'t say a word — he just started noticing things before I had to. — Executive, 41',
      title:'5 Days. One Systemic Shift Per Day.',
      body:'Women at your score level typically see the first measurable change in reminder frequency within the first week — not because of a conversation, but because of a systemic adjustment.',
      forward:'At your level, recalibration doesn\'t just change the dynamic — it changes how you feel in your own body at home. The low-grade vigilance lifts. You stop bracing. You start being present instead of being on duty. That\'s not a small thing. That\'s the relationship you\'ve been keeping yourself from.',
      btn:'Start My Free Course →'
    },
    critical:{
      after:'You\'ve been absorbing this alone for longer than you should have had to. The 14-day Reset starts with the heaviest patterns first — and gives you something real to work with from Day 1.',
      testimonial:'I was so close to leaving. Not because I stopped loving him — because I was exhausted. Day 3 of the course was the first time I saw my own role in the system clearly. — Attorney, 45',
      title:'You\'ve Waited Long Enough. Start Here.',
      body:'Your score signals that the system needs correction — urgently. The 14-day Reset is designed for exactly this level. One day, one shift, no overwhelm.',
      forward:'You have been carrying this alone long enough. What changes first isn\'t dramatic — it\'s quiet. One morning you realise you didn\'t wake up already thinking about what he hasn\'t done. That\'s what a recalibrated system feels like. That\'s what\'s waiting on the other side of this course.',
      btn:'Start My Free Course →'
    }
  };

  const ctaKey=totalScore<=30?'stable':totalScore<=55?'moderate':totalScore<=75?'high':'critical';
  const cta=ctas[ctaKey];
  document.getElementById('ctaAfterState').textContent=cta.after;
  document.getElementById('ctaTestimonial').textContent=cta.testimonial;
  document.getElementById('ctaTitle').textContent=cta.title;
  document.getElementById('ctaBody').textContent=cta.body;
  document.getElementById('ctaForwardState').textContent=cta.forward;
  document.getElementById('ctaBtn').textContent=cta.btn;

  const shareLines={
    stable:   `I just took the Initiative Imbalance Diagnostic™ — scored ${totalScore}/100. Caught it early, before it became resentment. If you're a high-functioning woman who senses something is slightly off in how responsibility is distributed — this diagnostic names it in 5 minutes: https://profDaddyJOY.com/diagnostic`,
    moderate: `My Initiative Imbalance Score is ${totalScore} — Moderate Drift. Apparently the Competence Trap is real. I've been compensating so smoothly the imbalance barely shows. If that sounds familiar, there's a diagnostic built for high-functioning women: https://profDaddyJOY.com/diagnostic`,
    high:     `My Initiative Imbalance Score is ${totalScore} — Advanced Drift. Turns out I've been functioning as the relationship's executive, logistics manager, and emotional architect simultaneously. If you're tired of managing instead of partnering, this diagnostic is worth 8 minutes: https://profDaddyJOY.com/diagnostic`,
    critical: `My Initiative Imbalance Score is ${totalScore} — Chronic Initiative Collapse. I've been absorbing this alone for longer than I realised. If you're a high-performing woman running a relationship with no finish line, there's a free diagnostic that finally named the pattern: https://profDaddyJOY.com/diagnostic`
  };
  const shareText = shareLines[ctaKey];
  document.getElementById('shareCopyText').textContent=shareText;
  window._shareText = shareText;
}

function domainInsight(name,pct){
  if(name.includes('REMINDER')){ if(pct<40) return 'Reminder load is manageable. Ownership is relatively clear.'; if(pct<70) return 'Reminders are frequent enough to indicate ownership ambiguity.'; return 'You are the external brain of the relationship. Ownership has fully defaulted.'; }
  if(name.includes('OVERFUNCTIONING')){ if(pct<40) return 'Overfunctioning is minimal. Space for his initiative exists.'; if(pct<70) return 'Overfunctioning is active — the gap stays invisible because you fill it.'; return 'Chronic overfunctioning. His under-functioning is being systematically hidden.'; }
  if(name.includes('WITHDRAWAL')){ if(pct<40) return 'Emotional connection is relatively stable under pressure.'; if(pct<70) return 'Withdrawal patterns are present. Signal instability is building.'; return 'Emotional withdrawal is a dominant pattern. The signal is breaking down.'; }
  if(name.includes('OWNERSHIP')){ if(pct<40) return 'Ownership domains are relatively clear. Structure exists.'; if(pct<70) return 'Ownership is ambiguous in key areas. Drift is occurring.'; return 'No clear ownership. Everything floats — and lands on you.'; }
  if(name.includes('SUSTAINABILITY')){ if(pct<40) return 'Resentment is low. The relationship has resilience.'; if(pct<70) return 'Resentment is building. The erosion is quiet but measurable.'; return 'Resentment is active and compounding. This is a pre-collapse signal.'; }
  return '';
}

function copyShareText(){
  const text = window._shareText || '';
  if(!text) return;
  navigator.clipboard.writeText(text).then(()=>{
    const btn = document.querySelector('.share-btn');
    const lbl = document.getElementById('shareBtnLabel');
    btn.classList.add('copied');
    lbl.innerHTML = '✓ &nbsp; Copied to Clipboard';
    setTimeout(()=>{ btn.classList.remove('copied'); lbl.innerHTML='⧉ &nbsp; Copy My Result'; },2800);
  }).catch(()=>{
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta);
    const lbl2 = document.getElementById('shareBtnLabel');
    lbl2.innerHTML = '✓ &nbsp; Copied';
    setTimeout(()=>{ lbl2.innerHTML='⧉ &nbsp; Copy My Result'; },2800);
  });
}

function claimCourse(){
  const btn = document.getElementById('ctaBtn');
  btn.textContent = '✓  Reset Confirmed — Check Your Inbox';
  btn.style.background = 'rgba(92,184,92,0.15)';
  btn.style.color = '#5cb85c';
  btn.style.border = '1px solid #5cb85c';
  btn.style.cursor = 'default';
  btn.onclick = null;
  // In production: POST confirmation to your email platform here
  // fetch('/api/confirm-course', {method:'POST', body:JSON.stringify({email:_gateEmail, name:_gateName})})
}

function retake(){
  currentQ=0; answers={}; turbulence=0.6;
  _gateName=''; _gateEmail='';
  document.getElementById('gateName').value='';
  document.getElementById('gateEmail').value='';
  document.getElementById('gateError').textContent='';
  document.getElementById('gateScoreNum').innerHTML='—<span>/100</span>';
  document.getElementById('gateScoreTier').textContent='Calculating...';
  document.getElementById('resultsScreen').classList.remove('active');
  document.getElementById('resultsScreen').style.display='none';
  document.querySelectorAll('.analyzing-step').forEach(s=>s.classList.remove('visible','active','done'));
  showScreen('introScreen');
}
