const quotePool = [
  'Indeed, with hardship comes ease. (Qur’an 94:6)',
  'Allah does not burden a soul beyond that it can bear. (Qur’an 2:286)',
  'The best among you are those who learn the Qur’an and teach it. (Bukhari)',
  'Whoever relies upon Allah, then He is sufficient for them. (Qur’an 65:3)',
];

const logo = document.getElementById('app-logo');
const logoFallback = document.getElementById('logo-fallback');
logo.addEventListener('error', () => {
  logo.style.display = 'none';
  logoFallback.style.display = 'grid';
});
logo.addEventListener('load', () => {
  logoFallback.style.display = 'none';
});

const quoteDisplay = document.getElementById('quote-display');
const nextQuote = document.getElementById('next-quote');
let quoteIndex = Number(localStorage.getItem('quoteIndex') || 0);

function showQuote() {
  quoteDisplay.textContent = quotePool[quoteIndex % quotePool.length];
}

nextQuote.addEventListener('click', () => {
  quoteIndex += 1;
  localStorage.setItem('quoteIndex', String(quoteIndex));
  showQuote();
});
showQuote();

const hasanatCount = document.getElementById('hasanat-count');
const increaseHasanat = document.getElementById('increase-hasanat');
const resetHasanat = document.getElementById('reset-hasanat');
let hasanat = Number(localStorage.getItem('hasanat') || 0);

function renderHasanat() {
  hasanatCount.textContent = String(hasanat);
}

increaseHasanat.addEventListener('click', () => {
  hasanat += 1;
  localStorage.setItem('hasanat', String(hasanat));
  renderHasanat();
});

resetHasanat.addEventListener('click', () => {
  hasanat = 0;
  localStorage.setItem('hasanat', '0');
  renderHasanat();
});
renderHasanat();

const prayerDate = document.getElementById('prayer-date');
const prayerName = document.getElementById('prayer-name');
const markPrayer = document.getElementById('mark-prayer');
const clearPrayerLog = document.getElementById('clear-prayer-log');
const prayerLog = document.getElementById('prayer-log');
const prayerEntries = JSON.parse(localStorage.getItem('prayerEntries') || '[]');

function renderPrayerEntries() {
  prayerLog.innerHTML = '';

  if (prayerEntries.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No prayers logged yet.';
    prayerLog.appendChild(li);
    return;
  }

  prayerEntries
    .slice()
    .reverse()
    .forEach((entry) => {
      const li = document.createElement('li');
      li.textContent = `${entry.date} — ${entry.prayer}`;
      prayerLog.appendChild(li);
    });
}

markPrayer.addEventListener('click', () => {
  if (!prayerDate.value) {
    return;
  }
  prayerEntries.push({ date: prayerDate.value, prayer: prayerName.value });
  localStorage.setItem('prayerEntries', JSON.stringify(prayerEntries));
  renderPrayerEntries();
});

clearPrayerLog.addEventListener('click', () => {
  prayerEntries.length = 0;
  localStorage.setItem('prayerEntries', JSON.stringify(prayerEntries));
  renderPrayerEntries();
});

renderPrayerEntries();

const verseTime = document.getElementById('verse-time');
const saveVerseReminder = document.getElementById('save-verse-reminder');
const verseReminderStatus = document.getElementById('verse-reminder-status');

const savedVerseTime = localStorage.getItem('verseReminderTime');
if (savedVerseTime) {
  verseTime.value = savedVerseTime;
  verseReminderStatus.textContent = `Saved reminder: ${savedVerseTime}`;
}

saveVerseReminder.addEventListener('click', () => {
  if (!verseTime.value) {
    verseReminderStatus.textContent = 'Please select a time first.';
    return;
  }
  localStorage.setItem('verseReminderTime', verseTime.value);
  verseReminderStatus.textContent = `Saved reminder: ${verseTime.value}`;
});

const duaMinutes = document.getElementById('dua-minutes');
const startDuaTimer = document.getElementById('start-dua-timer');
const clearDuaTimer = document.getElementById('clear-dua-timer');
const duaStatus = document.getElementById('dua-status');
let duaTimerId;

startDuaTimer.addEventListener('click', () => {
  const minutes = Number(duaMinutes.value);
  if (!minutes || minutes < 1) {
    duaStatus.textContent = 'Please enter a valid number of minutes.';
    return;
  }

  if (duaTimerId) {
    clearTimeout(duaTimerId);
  }

  duaStatus.textContent = `Timer started for ${minutes} minute(s).`;
  duaTimerId = setTimeout(() => {
    duaStatus.textContent = 'Du’a reminder: take a moment for remembrance.';
    alert('Du’a reminder: take a moment for remembrance.');
    duaTimerId = undefined;
  }, minutes * 60 * 1000);
});

clearDuaTimer.addEventListener('click', () => {
  if (duaTimerId) {
    clearTimeout(duaTimerId);
    duaTimerId = undefined;
    duaStatus.textContent = 'Du’a timer cleared.';
  }
});
