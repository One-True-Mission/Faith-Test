/* ==========================================
   One True Mission – Faith Site Script
   - Off-canvas menu + ESC/backdrop close
   - Verse of the Day (deterministic by date)
   - Scripture search
   - Copy / Share
   - Brightness slider (persisted)
   - Footer year
========================================== */

// -------------------- Scripture Bank --------------------
const SCRIPTURES = [
  { ref: "Joshua 1:9 (NIV)", text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go." },
  { ref: "Psalm 23:1 (NIV)", text: "The Lord is my shepherd, I lack nothing." },
  { ref: "Psalm 23:4 (NIV)", text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me." },
  { ref: "Psalm 27:1 (NIV)", text: "The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?" },
  { ref: "Psalm 34:18 (NIV)", text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit." },
  { ref: "Psalm 46:1 (NIV)", text: "God is our refuge and strength, an ever-present help in trouble." },
  { ref: "Psalm 55:22 (NIV)", text: "Cast your cares on the Lord and he will sustain you; he will never let the righteous be shaken." },
  { ref: "Proverbs 3:5-6 (NIV)", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." },
  { ref: "Isaiah 26:3 (NIV)", text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you." },
  { ref: "Isaiah 40:31 (NIV)", text: "Those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint." },
  { ref: "Isaiah 41:10 (NIV)", text: "Do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand." },
  { ref: "Lamentations 3:22-23 (NIV)", text: "Because of the Lord’s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness." },
  { ref: "Matthew 5:14 (NIV)", text: "You are the light of the world. A town built on a hill cannot be hidden." },
  { ref: "Matthew 6:33 (NIV)", text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well." },
  { ref: "Matthew 11:28 (NIV)", text: "Come to me, all you who are weary and burdened, and I will give you rest." },
  { ref: "Matthew 19:26 (NIV)", text: "With man this is impossible, but with God all things are possible." },
  { ref: "Mark 9:23 (NIV)", text: "Everything is possible for one who believes." },
  { ref: "Mark 10:27 (NIV)", text: "With man this is impossible, but not with God; all things are possible with God." },
  { ref: "Luke 1:37 (NIV)", text: "For no word from God will ever fail." },
  { ref: "Luke 12:32 (NIV)", text: "Do not be afraid, little flock, for your Father has been pleased to give you the kingdom." },
  { ref: "John 3:16 (NIV)", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
  { ref: "John 8:12 (NIV)", text: "I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life." },
  { ref: "John 14:27 (NIV)", text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid." },
  { ref: "John 16:33 (NIV)", text: "In this world you will have trouble. But take heart! I have overcome the world." },
  { ref: "Acts 1:8 (NIV)", text: "You will receive power when the Holy Spirit comes on you; and you will be my witnesses..." },
  { ref: "Romans 5:8 (NIV)", text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us." },
  { ref: "Romans 8:1 (NIV)", text: "Therefore, there is now no condemnation for those who are in Christ Jesus." },
  { ref: "Romans 8:28 (NIV)", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose." },
  { ref: "Romans 12:2 (NIV)", text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind..." },
  { ref: "1 Corinthians 10:13 (NIV)", text: "God is faithful; he will not let you be tempted beyond what you can bear..." },
  { ref: "1 Corinthians 16:13 (NIV)", text: "Be on your guard; stand firm in the faith; be courageous; be strong." },
  { ref: "2 Corinthians 5:7 (NIV)", text: "For we live by faith, not by sight." },
  { ref: "2 Corinthians 12:9 (NIV)", text: "My grace is sufficient for you, for my power is made perfect in weakness." },
  { ref: "Galatians 2:20 (NIV)", text: "I have been crucified with Christ and I no longer live, but Christ lives in me." },
  { ref: "Galatians 6:9 (NIV)", text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up." },
  { ref: "Ephesians 2:8-9 (NIV)", text: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God..." },
  { ref: "Ephesians 3:20 (NIV)", text: "Now to him who is able to do immeasurably more than all we ask or imagine..." },
  { ref: "Ephesians 6:10 (NIV)", text: "Be strong in the Lord and in his mighty power." },
  { ref: "Philippians 1:6 (NIV)", text: "He who began a good work in you will carry it on to completion until the day of Christ Jesus." },
  { ref: "Philippians 4:6-7 (NIV)", text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God..." },
  { ref: "Philippians 4:13 (NIV)", text: "I can do all this through him who gives me strength." },
  { ref: "Colossians 3:15 (NIV)", text: "Let the peace of Christ rule in your hearts..." },
  { ref: "Colossians 3:23 (NIV)", text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters." },
  { ref: "1 Thessalonians 5:16-18 (NIV)", text: "Rejoice always, pray continually, give thanks in all circumstances..." },
  { ref: "2 Timothy 1:7 (NIV)", text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline." },
  { ref: "Hebrews 10:23 (NIV)", text: "Let us hold unswervingly to the hope we profess, for he who promised is faithful." },
  { ref: "Hebrews 11:1 (NIV)", text: "Now faith is confidence in what we hope for and assurance about what we do not see." },
  { ref: "Hebrews 12:1-2 (NIV)", text: "Let us run with perseverance the race marked out for us, fixing our eyes on Jesus..." },
  { ref: "James 1:5 (NIV)", text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault..." },
  { ref: "1 Peter 5:7 (NIV)", text: "Cast all your anxiety on him because he cares for you." },
  { ref: "1 John 4:18 (NIV)", text: "There is no fear in love. But perfect love drives out fear..." },
  { ref: "Revelation 21:4 (NIV)", text: "‘He will wipe every tear from their eyes. There will be no more death’ or mourning or crying or pain..." }
];
// (If you want the larger bank we used earlier, I can append it too.)

// -------------------- Elements --------------------
const menu = document.getElementById('sidemenu');
const hamburger = document.querySelector('.hamburger');
const yearSpan = document.getElementById('year');
const brightnessInput = document.getElementById('brightness');

const votdText = document.getElementById('votdText');
const votdRef = document.getElementById('votdRef');
const copyBtn = document.getElementById('copyBtn');
const shareBtn = document.getElementById('shareBtn');
const newVerseBtn = document.getElementById('newVerseBtn');

const searchInput = document.getElementById('searchInput');
const resultsEl = document.getElementById('results');

// -------------------- Menu Toggle --------------------
if (hamburger && menu) {
  const setAria = () => hamburger.setAttribute('aria-expanded', menu.classList.contains('open') ? 'true' : 'false');
  hamburger.addEventListener('click', () => {
    menu.classList.toggle('open');
    menu.setAttribute('aria-hidden', !menu.classList.contains('open'));
    setAria();
  });

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
      setAria();
    }
  });

  // Close when clicking outside menu (simple backdrop behavior)
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !hamburger.contains(e.target) && menu.classList.contains('open')) {
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
      setAria();
    }
  });
}

// -------------------- Footer Year --------------------
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// -------------------- Brightness Slider (persist) --------------------
(function initBrightness(){
  try {
    const pctKey = 'bg_brightness_pct';
    const cssKey = 'bg_brightness';

    // read stored
    const storedPct = localStorage.getItem(pctKey);
    const storedCss = localStorage.getItem(cssKey);
    if (storedCss) document.documentElement.style.setProperty('--bg-brightness', storedCss);
    if (brightnessInput) {
      brightnessInput.value = storedPct ? Number(storedPct) : 85;
      brightnessInput.addEventListener('input', e => {
        const pct = Number(e.target.value);
        const cssVal = (pct/100).toFixed(2);
        document.documentElement.style.setProperty('--bg-brightness', cssVal);
        localStorage.setItem(pctKey, String(pct));
        localStorage.setItem(cssKey, cssVal);
      });
    }
  } catch (e) { /* no-op */ }
})();

// -------------------- Verse of the Day --------------------
function seededIndexByDate(dateStr) {
  // Simple deterministic hash → stable "verse of the day"
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash) % SCRIPTURES.length;
  return idx;
}

function setVOTD(index) {
  const verse = SCRIPTURES[index];
  if (!verse) return;
  if (votdText) votdText.textContent = verse.text;
  if (votdRef) votdRef.textContent = verse.ref;
  // Persist for the day
  const today = new Date().toISOString().slice(0,10);
  localStorage.setItem('votd_date', today);
  localStorage.setItem('votd_index', String(index));
}

function initVOTD() {
  if (!(votdText && votdRef)) return;
  const today = new Date().toISOString().slice(0,10);
  const savedDate = localStorage.getItem('votd_date');
  const savedIndex = Number(localStorage.getItem('votd_index'));

  if (savedDate === today && Number.isInteger(savedIndex)) {
    setVOTD(savedIndex);
  } else {
    const idx = seededIndexByDate(today);
    setVOTD(idx);
  }

  if (newVerseBtn) {
    newVerseBtn.addEventListener('click', () => {
      // show a different one (random different from current)
      const current = Number(localStorage.getItem('votd_index')) || 0;
      let next = Math.floor(Math.random() * SCRIPTURES.length);
      if (next === current) next = (current + 1) % SCRIPTURES.length;
      setVOTD(next);
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const text = `${votdText.textContent} — ${votdRef.textContent}`;
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = "Copied!";
        setTimeout(() => copyBtn.textContent = "Copy", 1200);
      } catch { /* ignore */ }
    });
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const text = `${votdText.textContent} — ${votdRef.textContent}`;
      if (navigator.share) {
        try {
          await navigator.share({ text });
        } catch { /* ignore */ }
      } else {
        try {
          await navigator.clipboard.writeText(text);
          shareBtn.textContent = "Copied!";
          setTimeout(() => shareBtn.textContent = "Share", 1200);
        } catch { /* ignore */ }
      }
    });
  }
}

// -------------------- Scripture Search --------------------
function searchScriptures(query) {
  if (!query) return [];
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SCRIPTURES.filter(v =>
    v.text.toLowerCase().includes(q) ||
    v.ref.toLowerCase().includes(q)
  ).slice(0, 100);
}

function renderResults(items) {
  if (!resultsEl) return;
  resultsEl.innerHTML = '';
  if (!items.length) return;

  for (const v of items) {
    const li = document.createElement('li');
    li.className = 'result';
    const h = document.createElement('p');
    h.className = 'result-ref';
    h.textContent = v.ref;
    const p = document.createElement('p');
    p.className = 'result-text';
    p.textContent = v.text;
    li.appendChild(h);
    li.appendChild(p);
    resultsEl.appendChild(li);
  }
}

function initSearch() {
  if (!searchInput) return;
  let last = '';
  const doSearch = () => {
    const q = searchInput.value || '';
    if (q === last) return;
    last = q;
    const matches = searchScriptures(q);
    renderResults(matches);
  };
  searchInput.addEventListener('input', doSearch);
}

// -------------------- Boot --------------------
document.addEventListener('DOMContentLoaded', () => {
  initVOTD();
  initSearch();
});
