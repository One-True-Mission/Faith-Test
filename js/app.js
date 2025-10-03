// ---------- app.js (safe for GitHub Pages) ----------
const sliderSelector = '#brightness';
const BR_KEY = 'bg_brightness_pct';

function applyBrightness(pct){
  const value = Math.max(50, Math.min(115, Number(pct)||85));
  const normalized = (value/100).toFixed(2);
  document.documentElement.style.setProperty('--bg-brightness', normalized);
}
function initBrightness(){
  const saved = localStorage.getItem(BR_KEY);
  const slider = document.querySelector(sliderSelector);
  if(slider){
    if(saved){ slider.value = saved; applyBrightness(saved); }
    slider.addEventListener('input', (e)=>{
      const v = e.target.value;
      localStorage.setItem(BR_KEY, v);
      applyBrightness(v);
    });
  }else if(saved){ applyBrightness(saved); }
}

// Off-canvas menu
const menu = {
  wrap: null, btn: null, close: null, backdrop: null,
  open(){ this.wrap.classList.add('open'); this.wrap.setAttribute('aria-hidden','false'); this.btn?.setAttribute('aria-expanded','true'); this.backdrop.hidden = false; },
  hide(){ this.wrap.classList.remove('open'); this.wrap.setAttribute('aria-hidden','true'); this.btn?.setAttribute('aria-expanded','false'); this.backdrop.hidden = true; },
  init(){
    this.wrap = document.getElementById('sidemenu');
    this.btn = document.querySelector('.hamburger');
    this.backdrop = document.querySelector('.backdrop');
    if(!this.wrap || !this.btn) return;
    this.close = this.wrap.querySelector('.close');
    this.btn.addEventListener('click', ()=> this.open());
    this.close?.addEventListener('click', ()=> this.hide());
    this.backdrop?.addEventListener('click', ()=> this.hide());
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') this.hide(); });
  }
};

// ---- Scripture data fallback (used if JSON fetch fails) ----
const FALLBACK = {"scriptures":[
{"ref":"John 3:16","verse":"God loved the world so much that He gave His one and only Son, so that everyone who trusts in Him will not be lost but will have eternal life.","meaning":"The Father’s love is proved through Jesus. Salvation isn’t earned; it’s received by trusting in Christ.","keywords":["love","gospel","salvation"]},
{"ref":"Psalm 23:1","verse":"The Lord is my shepherd; I have everything I truly need.","meaning":"God personally guides and cares for His people like a shepherd. In His care, we lack nothing essential.","keywords":["shepherd","care","provision"]},
{"ref":"Jeremiah 29:11","verse":"I know the plans I have for you—plans for peace and not for harm, to give you a future and a hope.","meaning":"Spoken to Israel in exile, this reveals God’s heart: He aims for restoration and hope even after hard seasons.","keywords":["hope","future","plans"]},
{"ref":"Proverbs 3:5-6","verse":"Trust the Lord with all your heart; don’t lean on your own understanding. In all your ways acknowledge Him, and He will make your paths straight.","meaning":"Real wisdom is surrender. When we rely on God more than ourselves, He guides our steps.","keywords":["trust","guidance","wisdom"]},
{"ref":"Romans 8:28","verse":"We know that God works all things together for the good of those who love Him and are called according to His purpose.","meaning":"God can weave even painful things into His good plan for His people.","keywords":["purpose","good","sovereignty"]},
{"ref":"Philippians 4:13","verse":"I can do all this through Christ who gives me strength.","meaning":"Our ability to endure and obey comes from Christ’s power, not self-reliance.","keywords":["strength","Christ","endurance"]},
{"ref":"Isaiah 41:10","verse":"Don’t fear, for I am with you; don’t be discouraged, for I am your God. I will strengthen and help you; I will hold you up.","meaning":"God’s presence drives out fear. He pledges strength and support to His people.","keywords":["fear","presence","help"]},
{"ref":"Matthew 11:28","verse":"Come to Me, all who are tired and weighed down, and I will give you rest.","meaning":"Jesus welcomes the exhausted and offers rest for the soul—through Himself.","keywords":["rest","yoke","welcome"]},
{"ref":"Psalm 46:1","verse":"God is our refuge and strength, a very present help in trouble.","meaning":"In chaos, God is not distant. He is a safe place and real help right now.","keywords":["refuge","strength","help"]},
{"ref":"Joshua 1:9","verse":"Be strong and courageous. Do not be afraid or discouraged, for the Lord your God is with you wherever you go.","meaning":"Courage grows from God’s presence, not from perfect circumstances.","keywords":["courage","presence","mission"]},
{"ref":"1 Corinthians 13:4-7","verse":"Love is patient and kind; it isn’t jealous or proud or rude. It doesn’t insist on its own way, keeps no record of wrongs, and never gives up.","meaning":"Biblical love is self-giving and durable. It acts for others’ good and keeps going.","keywords":["love","patience","kindness"]},
{"ref":"2 Timothy 1:7","verse":"God didn’t give us a spirit of fear, but of power, love, and a sound mind.","meaning":"The Spirit produces courage, loving action, and clear thinking in believers.","keywords":["fear","power","Spirit"]},
{"ref":"Psalm 91:1-2","verse":"Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty… ‘My refuge and fortress—my God in whom I trust.’","meaning":"Security is found by drawing near to God and trusting His protection.","keywords":["protection","rest","trust"]},
{"ref":"Romans 12:2","verse":"Don’t be shaped by this world, but be transformed by renewing your mind, so you can know God’s good, pleasing, perfect will.","meaning":"Change comes as God’s truth reshapes how we think, leading us to God’s ways.","keywords":["transformed","mind","will of God"]},
{"ref":"Matthew 6:33","verse":"Seek first God’s kingdom and His righteousness, and all these things will be provided to you.","meaning":"Put God’s rule first; He will handle your needs.","keywords":["kingdom","priority","provision"]},
{"ref":"Psalm 121:1-2","verse":"I lift my eyes to the hills—where does my help come from? My help comes from the Lord, Maker of heaven and earth.","meaning":"True help isn’t in places or people but in the Creator.","keywords":["help","Creator","trust"]},
{"ref":"Ephesians 2:8-9","verse":"By grace you have been saved through faith—and this is not from yourselves; it is God’s gift—not by works, so no one can boast.","meaning":"Salvation is undeserved kindness received by trusting Jesus, not by earning it.","keywords":["grace","faith","gift"]},
{"ref":"Hebrews 11:1","verse":"Faith is confidence in what we hope for and assurance about what we do not see.","meaning":"Faith trusts God’s promises even before they’re visible.","keywords":["faith","assurance","hope"]},
{"ref":"1 Peter 5:7","verse":"Cast all your worries on Him, because He cares for you.","meaning":"God invites you to unload your anxiety onto Him—He truly cares.","keywords":["anxiety","care","humility"]},
{"ref":"James 1:5","verse":"If you lack wisdom, ask God, who gives generously to all without finding fault, and it will be given to you.","meaning":"God welcomes sincere requests for guidance and gladly provides wisdom.","keywords":["wisdom","ask","generous"]},
{"ref":"Psalm 37:4","verse":"Delight yourself in the Lord, and He will give you the desires of your heart.","meaning":"As we enjoy God, our desires are shaped and satisfied in Him.","keywords":["delight","desires","joy"]},
{"ref":"Galatians 5:22-23","verse":"The fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control.","meaning":"The Spirit grows Christlike character in believers.","keywords":["fruit","Spirit","character"]},
{"ref":"Isaiah 40:31","verse":"Those who wait on the Lord will renew their strength; they will soar on wings like eagles; they will run and not grow weary.","meaning":"Confidence in God revives weary hearts with new strength.","keywords":["strength","wait","renew"]},
{"ref":"John 14:6","verse":"Jesus said, ‘I am the way, the truth, and the life. No one comes to the Father except through Me.’","meaning":"Jesus is the only path to God—He Himself is the way.","keywords":["way","truth","life"]},
{"ref":"John 1:1","verse":"In the beginning was the Word, and the Word was with God, and the Word was God.","meaning":"Jesus (the Word) is eternal and fully God.","keywords":["Word","divinity","eternal"]},
{"ref":"Psalm 118:24","verse":"This is the day the Lord has made; let’s rejoice and be glad in it.","meaning":"Gratitude is fitting because every day is a gift from God.","keywords":["joy","day","gratitude"]},
{"ref":"Lamentations 3:22-23","verse":"Because of the Lord’s faithful love we are not consumed; His mercies never end—they are new every morning.","meaning":"God’s mercy resets daily; His faithfulness sustains us even in grief.","keywords":["mercy","faithfulness","hope"]},
{"ref":"Matthew 5:9","verse":"Blessed are the peacemakers, for they will be called children of God.","meaning":"Those who actively pursue peace show the family likeness of their Father.","keywords":["peace","blessed","beatitudes"]},
{"ref":"Romans 5:8","verse":"God proves His love for us in this: while we were still sinners, Christ died for us.","meaning":"Jesus died for the unworthy—that’s the measure of God’s love.","keywords":["love","cross","grace"]},
{"ref":"1 John 1:9","verse":"If we confess our sins, He is faithful and just to forgive us and to cleanse us from all unrighteousness.","meaning":"Forgiveness is certain for the repentant because of Christ’s work.","keywords":["confession","forgiveness","cleansing"]},
{"ref":"Psalm 27:1","verse":"The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?","meaning":"God’s saving presence dissolves fear of people and threats.","keywords":["light","salvation","fearless"]},
{"ref":"Isaiah 53:5","verse":"He was pierced for our transgressions, crushed for our iniquities; punishment for our peace was on Him, and by His wounds we are healed.","meaning":"The suffering Servant (Jesus) paid for our sins to bring us peace with God.","keywords":["atonement","cross","healing"]},
{"ref":"John 16:33","verse":"In this world you will have trouble. But take heart—I have overcome the world.","meaning":"Hardship is certain, but Jesus’ victory is greater and final.","keywords":["overcome","peace","trouble"]},
{"ref":"Proverbs 18:10","verse":"The name of the Lord is a strong tower; the righteous run to it and are safe.","meaning":"Calling on God is a real refuge in danger.","keywords":["name","safety","refuge"]},
{"ref":"Psalm 34:8","verse":"Taste and see that the Lord is good; blessed is the one who takes refuge in Him.","meaning":"Experience God personally and trust Him; you’ll find goodness there.","keywords":["goodness","refuge","experience"]},
{"ref":"Colossians 3:23","verse":"Whatever you do, work at it with all your heart, as working for the Lord and not for people.","meaning":"Every task can be worship when done for Christ.","keywords":["work","heart","worship"]},
{"ref":"Matthew 7:7","verse":"Ask, and it will be given to you; seek, and you will find; knock, and the door will be opened to you.","meaning":"Persistent prayer is welcomed by God.","keywords":["ask","seek","knock"]},
{"ref":"Revelation 3:20","verse":"Look, I stand at the door and knock. If anyone hears My voice and opens the door, I will come in and dine with them, and they with Me.","meaning":"Jesus invites personal fellowship with those who welcome Him.","keywords":["fellowship","invite","presence"]},
{"ref":"1 Thessalonians 5:16-18","verse":"Rejoice always, pray continually, give thanks in all circumstances; this is God’s will for you in Christ Jesus.","meaning":"A life shaped by joy, prayer, and gratitude pleases God in every season.","keywords":["rejoice","pray","thanks"]},
{"ref":"Micah 6:8","verse":"What does the Lord require of you? To act justly, love mercy, and walk humbly with your God.","meaning":"God desires justice, compassion, and humility in everyday life.","keywords":["justice","mercy","humility"]},
{"ref":"Proverbs 16:3","verse":"Commit your work to the Lord, and your plans will be established.","meaning":"Place your projects under God’s rule and depend on His guidance.","keywords":["work","plans","commit"]},
{"ref":"Psalm 19:14","verse":"May the words of my mouth and the meditation of my heart be pleasing to You, Lord, my Rock and my Redeemer.","meaning":"Ask God to shape both speech and inner life to honor Him.","keywords":["speech","heart","pleasing"]},
{"ref":"Romans 10:9","verse":"If you confess with your mouth ‘Jesus is Lord’ and believe in your heart that God raised Him from the dead, you will be saved.","meaning":"Salvation comes through trusting the risen Jesus as Lord.","keywords":["confession","belief","salvation"]},
{"ref":"John 10:10","verse":"The thief comes to steal, kill, and destroy; I came that they may have life—life to the full.","meaning":"Jesus offers abundant, real life in contrast to the enemy’s ruin.","keywords":["life","abundant","enemy"]},
{"ref":"Philippians 4:6-7","verse":"Don’t be anxious about anything, but in everything, by prayer and petition with thanksgiving, present your requests to God. God’s peace, beyond understanding, will guard your hearts and minds in Christ Jesus.","meaning":"Trade anxiety for prayer with gratitude; God’s peace will guard you.","keywords":["anxiety","peace","prayer"]},
{"ref":"Psalm 51:10","verse":"Create in me a clean heart, O God, and renew a right spirit within me.","meaning":"Ask God to cleanse and reset your inner life.","keywords":["repentance","renew","clean heart"]},
{"ref":"Matthew 22:37-39","verse":"Love the Lord your God with all your heart, soul, and mind… and love your neighbor as yourself.","meaning":"The greatest commands: wholehearted love for God and practical love for people.","keywords":["love God","love neighbor","greatest command"]},
{"ref":"1 Corinthians 10:13","verse":"No temptation has overtaken you except what is common to humanity. God is faithful; He will not let you be tempted beyond what you can bear, but will provide a way out so you can endure.","meaning":"Temptation is real but not unbeatable; God always provides an escape.","keywords":["temptation","escape","faithful"]},
{"ref":"Ephesians 6:11","verse":"Put on the full armor of God so you can stand against the schemes of the devil.","meaning":"Resist evil by relying on God’s equipment and truth.","keywords":["armor","spiritual battle","stand"]},
{"ref":"Psalm 139:14","verse":"I praise You because I am fearfully and wonderfully made; Your works are marvelous—I know this well.","meaning":"God designed you with care and purpose; you have real worth in Him.","keywords":["identity","worthy","created"]}
]};

// Helpers
function hashString(s){ let h=0; for(let i=0;i<s.length;i++){ h=(h<<5)-h+s.charCodeAt(i); h|=0; } return Math.abs(h); }
function pickDailyIndex(total){
  const d = new Date();
  const key = `${d.getUTCFullYear()}-${d.getUTCMonth()+1}-${d.getUTCDate()}`;
  return hashString(key) % total;
}
function renderScripture(item){
  if(!item) return;
  document.getElementById('ref').textContent = item.ref;
  document.getElementById('verse').textContent = item.verse;
  document.getElementById('meaning').textContent = item.meaning;
}
function normalized(s){ return (s||'').toLowerCase(); }
function searchItems(items, q){
  const qq = normalized(q);
  if(!qq) return null;
  return items.find(it =>
    normalized(it.ref).includes(qq) ||
    normalized(it.verse).includes(qq) ||
    normalized(it.meaning).includes(qq) ||
    (it.keywords||[]).some(k => normalized(k).includes(qq))
  ) || null;
}

async function loadData(){
  try{
    const res = await fetch('data/scriptures.json', {cache: 'no-store'});
    if(!res.ok) throw new Error('fetch failed');
    const data = await res.json();
    if(Array.isArray(data?.scriptures) && data.scriptures.length) return data.scriptures;
    return FALLBACK.scriptures;
  }catch(e){
    return FALLBACK.scriptures; // fallback so site still works
  }
}

async function initScripture(){
  const items = await loadData();
  let current = items[pickDailyIndex(items.length)];
  renderScripture(current);

  const form = document.getElementById('searchForm');
  const field = document.getElementById('q');
  form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const q = field.value.trim();
    if(!q){ field.focus(); return; }
    const hit = searchItems(items, q);
    if(hit){ current = hit; renderScripture(current); }
    else{
      document.getElementById('ref').textContent = 'Coming soon';
      document.getElementById('verse').textContent = 'We don\'t have that verse yet. Check back later!';
      document.getElementById('meaning').textContent = 'Tip: try a different reference (e.g., “John 3:16”) or a few keywords (e.g., “good shepherd hope”).';
    }
  });

  document.getElementById('another')?.addEventListener('click', (e)=>{
    e.preventDefault();
    let i = Math.floor(Math.random()*items.length);
    if(items[i] === current) i = (i+1) % items.length;
    current = items[i]; renderScripture(current);
  });

  document.getElementById('copy')?.addEventListener('click', async ()=>{
    const text = `${current.ref}\n${current.verse}\n\nWhat this means:\n${current.meaning}`;
    try{ await navigator.clipboard.writeText(text); alert('Copied to clipboard.'); }
    catch{ alert('Copy failed.'); }
  });

  document.getElementById('share')?.addEventListener('click', async ()=>{
    const text = `${current.ref} — ${current.verse}`;
    if(navigator.share){ try{ await navigator.share({ text }); }catch{} }
    else{ alert('Sharing not supported on this device.'); }
  });
}

function initYear(){ const el = document.getElementById('year'); if(el) el.textContent = new Date().getFullYear(); }

// iOS momentum scroll hint
(function(){ const div = document.createElement('div'); div.style.height='1px'; document.body.appendChild(div); setTimeout(()=>div.remove(),0); })();

window.addEventListener('DOMContentLoaded', ()=>{
  initBrightness();
  menu.init();
  initScripture();
  initYear();
});
