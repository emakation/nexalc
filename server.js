import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// In-memory cache for live exchange rates
let ratesCache = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

async function fetchLiveRates() {
  const now = Date.now();
  if (ratesCache && (now - lastCacheTime < CACHE_TTL_MS)) {
    return ratesCache;
  }

  // Primary: Open Exchange Rates API (real-time mid-market, 160+ currencies)
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', { signal: AbortSignal.timeout(6000) });
    if (res.ok) {
      const data = await res.json();
      if (data && data.rates && typeof data.rates.EUR === 'number') {
        ratesCache = {
          success: true,
          base: 'USD',
          rates: data.rates,
          date: data.time_last_update_utc || new Date().toUTCString(),
          source: 'Live Interbank Forex Feed'
        };
        lastCacheTime = now;
        return ratesCache;
      }
    }
  } catch (err) {
    console.warn('Primary rates API failed, trying fallback:', err.message);
  }

  // Fallback 1: jsDelivr currency-api (300+ currencies)
  try {
    const res = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json', { signal: AbortSignal.timeout(6000) });
    if (res.ok) {
      const data = await res.json();
      if (data && data.usd) {
        const normalized = {};
        for (const [k, v] of Object.entries(data.usd)) {
          normalized[k.toUpperCase()] = v;
        }
        normalized.USD = 1;
        ratesCache = {
          success: true,
          base: 'USD',
          rates: normalized,
          date: data.date || new Date().toISOString(),
          source: 'Live Global Currency API'
        };
        lastCacheTime = now;
        return ratesCache;
      }
    }
  } catch (err) {
    console.warn('Secondary rates API failed:', err.message);
  }

  // Fallback 2: European Central Bank via Frankfurter
  try {
    const res = await fetch('https://api.frankfurter.app/latest?from=USD', { signal: AbortSignal.timeout(6000) });
    if (res.ok) {
      const data = await res.json();
      if (data && data.rates) {
        const rates = { ...data.rates, USD: 1 };
        ratesCache = {
          success: true,
          base: 'USD',
          rates,
          date: data.date,
          source: 'European Central Bank Feed'
        };
        lastCacheTime = now;
        return ratesCache;
      }
    }
  } catch (err) {
    console.warn('Frankfurter rates API failed:', err.message);
  }

  // If previous cache exists, return it even if expired
  if (ratesCache) {
    return ratesCache;
  }

  return null;
}

// API endpoint for currency rates
app.get('/api/rates', async (req, res) => {
  try {
    const ratesData = await fetchLiveRates();
    if (ratesData) {
      res.setHeader('Cache-Control', 'public, max-age=300');
      return res.json(ratesData);
    }
    res.status(503).json({ success: false, error: 'Rates service temporarily unavailable' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve static assets and HTML pages
app.use(express.static(__dirname, {
  extensions: ['html'],
  index: 'index.html',
  redirect: true
}));

// Fallback to index.html for not found paths
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`NexAlc server running on http://0.0.0.0:${PORT}`);
});
