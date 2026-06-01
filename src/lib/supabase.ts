type SupabaseRequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  body?: unknown
  prefer?: string
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_KEY

  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or Supabase API key environment variable.')
  }

  return {
    url: url.replace(/\/$/, ''),
    key,
  }
}

export async function supabaseRest(path: string, options: SupabaseRequestOptions = {}) {
  const { url, key } = getSupabaseConfig()
  const response = await fetch(`${url}/rest/v1/${path.replace(/^\//, '')}`, {
    method: options.method || 'GET',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...(options.prefer ? { Prefer: options.prefer } : {}),
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(detail || `Supabase request failed with status ${response.status}.`)
  }

  if (response.status === 204) {
    return null
  }

  const text = await response.text()
  return text ? JSON.parse(text) : null
}
