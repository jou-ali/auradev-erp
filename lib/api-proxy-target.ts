/** Backend API origin for server-side proxy (Vercel → Railway). */
export function getApiProxyTarget(): string {
  const url = (
    process.env.API_PROXY_URL ??
    process.env.NEXT_PUBLIC_API_URL
  )?.replace(/\/$/, '')

  if (!url) {
    throw new Error(
      'API_PROXY_URL is not set. Add it in Vercel env (your backend API origin, no trailing slash).',
    )
  }

  return url
}
