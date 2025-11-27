// API client with mock/demo mode and error handling

import baseUrl from '@/components/BaseUrl';

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';


async function fetchJson(url: string, options: RequestInit = {}) {
  let res;
  try {
    res = await fetch(url, options);
  } catch (err) {
    throw new Error('Network error');
  }
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw { status: res.status, ...error };
  }
  return res.json();
}

export async function analyzeTrade(params: { pair: string }) {
  const { pair } = params;
  const q = new URLSearchParams({ pair });
  // return fetchJson(`${baseUrl}/analyze-holy-grail?${q.toString()}`, {
  //   method: 'POST',
  // });
  return fetchJson(`${baseUrl}/analyze-holy-grail-advanced?${q.toString()}`, {
    method: 'POST',
  });
}

export async function getIndicatorsInfo() {
  if (USE_MOCKS) {
    return import('../mocks/indicators-info.mock.json').then(m => m.default);
  }
  return fetchJson(`${API_BASE}/trades/indicators-info`);
}

export async function getUsage(token: string) {
  if (USE_MOCKS) {
    return { remaining: 4, limit: 7, date: '2025-11-13', used: 3 };
  }
  return fetchJson(`${API_BASE}/trades/usage`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getPreferences(token: string) {
  if (USE_MOCKS) {
    return import('../mocks/preferences.mock.json').then(m => m.default);
  }
  return fetchJson(`${API_BASE}/users/me/preferences`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function updatePreferences(token: string, prefs: any) {
  if (USE_MOCKS) {
    return { success: true };
  }
  return fetchJson(`${API_BASE}/users/me/preferences`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(prefs),
  });
}

export async function getRecentTrades(token: string) {
  if (USE_MOCKS) {
    return import('../mocks/trades.mock.json').then(m => m.default);
  }
  return fetchJson(`${API_BASE}/users/me/trades`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// Auth endpoints
export async function login(email: string, password: string) {
  if (USE_MOCKS) {
    return { access_token: 'mocktoken', token_type: 'bearer', expires_at: '2025-11-14T12:34:56' };
  }
  return fetchJson(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
}

export async function register(email: string, username: string, password: string) {
  if (USE_MOCKS) {
    return { id: 'mockid', email, username, roles: ['user'], daily_trade_limit: 7, trade_usage: null, trade_preferences: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
  }
  return fetchJson(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, password }),
  });
}

export async function getMe(token: string) {
  if (USE_MOCKS) {
    return { id: 'mockid', email: 'user@example.com', username: 'user', roles: ['user'], daily_trade_limit: 7, trade_usage: null, trade_preferences: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
  }
  return fetchJson(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
