import { NextRequest, NextResponse } from 'next/server'
import { getApiProxyTarget } from './api-proxy-target'

const HOP_BY_HOP = new Set([
  'connection',
  'content-length',
  'host',
  'keep-alive',
  'te',
  'trailers',
  'transfer-encoding',
  'upgrade',
])

export async function proxyToBackend(
  req: NextRequest,
  upstreamPath: string,
): Promise<NextResponse> {
  const target = getApiProxyTarget()
  const url = `${target}${upstreamPath}${req.nextUrl.search}`

  const headers = new Headers()
  req.headers.forEach((value, key) => {
    if (!HOP_BY_HOP.has(key.toLowerCase())) {
      headers.set(key, value)
    }
  })

  const body =
    req.method !== 'GET' && req.method !== 'HEAD'
      ? await req.arrayBuffer()
      : undefined

  const res = await fetch(url, {
    method: req.method,
    headers,
    body,
    cache: 'no-store',
  })

  const resHeaders = new Headers()
  res.headers.forEach((value, key) => {
    if (!HOP_BY_HOP.has(key.toLowerCase())) {
      resHeaders.set(key, value)
    }
  })

  return new NextResponse(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: resHeaders,
  })
}
