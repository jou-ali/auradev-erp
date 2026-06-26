/** Backend API origin for Vercel → Railway proxy (server-side). */
export function getApiProxyTarget(): string {
  return (
    process.env.API_PROXY_URL ??
    process.env.RAILWAY_API_URL ??
    'https://auradev-erp-backend-production.up.railway.app'
  ).replace(/\/$/, '')
}
