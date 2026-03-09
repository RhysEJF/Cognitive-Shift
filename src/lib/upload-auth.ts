const SESSION_COOKIE = 'cs-upload-session';
const SESSION_PREFIX = 'upload-session:';
const STATE_PREFIX = 'upload-oauth-state:';
const RATELIMIT_PREFIX = 'upload-ratelimit:';

const SESSION_TTL = 60 * 60 * 24; // 24 hours
const STATE_TTL = 60 * 5; // 5 minutes
const RATELIMIT_TTL = 600; // 10 minutes
const RATELIMIT_MAX = 20;

interface SessionData {
  login: string;
  avatar_url: string;
  github_id: number;
  created_at: number;
}

function generateSessionId(): string {
  return crypto.randomUUID();
}

async function createSession(
  kv: KVNamespace,
  id: string,
  userData: SessionData,
): Promise<void> {
  await kv.put(SESSION_PREFIX + id, JSON.stringify(userData), {
    expirationTtl: SESSION_TTL,
  });
}

async function getSession(
  kv: KVNamespace,
  id: string,
): Promise<SessionData | null> {
  const raw = await kv.get(SESSION_PREFIX + id);
  if (!raw) return null;
  return JSON.parse(raw) as SessionData;
}

async function deleteSession(kv: KVNamespace, id: string): Promise<void> {
  await kv.delete(SESSION_PREFIX + id);
}

async function storeOAuthState(kv: KVNamespace, state: string): Promise<void> {
  await kv.put(STATE_PREFIX + state, '1', { expirationTtl: STATE_TTL });
}

async function validateOAuthState(
  kv: KVNamespace,
  state: string,
): Promise<boolean> {
  const val = await kv.get(STATE_PREFIX + state);
  if (!val) return false;
  await kv.delete(STATE_PREFIX + state);
  return true;
}

async function checkRateLimit(
  kv: KVNamespace,
  userId: number,
): Promise<{ allowed: boolean; remaining: number }> {
  const key = RATELIMIT_PREFIX + userId;
  const raw = await kv.get(key);
  const count = raw ? parseInt(raw, 10) : 0;

  if (count >= RATELIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  await kv.put(key, String(count + 1), { expirationTtl: RATELIMIT_TTL });
  return { allowed: true, remaining: RATELIMIT_MAX - count - 1 };
}

function isUserAllowed(login: string, env: { UPLOAD_ALLOWED_USERS?: string }): boolean {
  const allowlist = env.UPLOAD_ALLOWED_USERS;
  if (!allowlist) return true; // no allowlist = anyone authenticated
  const users = allowlist.split(',').map((u) => u.trim().toLowerCase());
  return users.includes(login.toLowerCase());
}

function parseCookie(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function sessionCookieHeader(
  sessionId: string,
  maxAge: number = SESSION_TTL,
): string {
  return `${SESSION_COOKIE}=${sessionId}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`;
}

function clearSessionCookieHeader(): string {
  return `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

export {
  SESSION_COOKIE,
  generateSessionId,
  createSession,
  getSession,
  deleteSession,
  storeOAuthState,
  validateOAuthState,
  checkRateLimit,
  isUserAllowed,
  parseCookie,
  sessionCookieHeader,
  clearSessionCookieHeader,
};
export type { SessionData };
