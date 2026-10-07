// This script fetches new leads from the Supabase database and appends them to a JSONL file.
//
// To run: node scripts/read-new-leads.mjs

import { appendFile, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const statePath = path.join(root, 'lead-export-state.json')
const outputPath = path.join(root, 'new-leads.jsonl')
const pageSize = 1000

function parseEnv(text) {
  const values = {}
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/)
    if (!match) continue

    let value = match[2]
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    } else {
      value = value.replace(/\s+#.*$/, '')
    }
    values[match[1]] = value
  }
  return values
}

async function loadConfig() {
  const values = {}
  for (const filename of ['.env', '.env.local']) {
    try {
      Object.assign(values, parseEnv(await readFile(path.join(root, filename), 'utf8')))
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
    }
  }
  Object.assign(values, process.env)

  const url = values.SUPABASE_URL
  const key = values.SUPABASE_SERVICE_ROLE_KEY || values.SUPABASE_SECRET_KEY || values.SUPABASE_KEY
  if (!url || !key) {
    throw new Error('Set SUPABASE_URL and a Supabase key in .env, .env.local, or the environment.')
  }
  return { url: url.replace(/\/$/, ''), key }
}

async function readCursor() {
  try {
    return JSON.parse(await readFile(statePath, 'utf8'))
  } catch (error) {
    if (error.code === 'ENOENT') return null
    throw new Error(`Could not read ${path.basename(statePath)}: ${error.message}`)
  }
}

function isAfterCursor(row, cursor) {
  if (!cursor) return true
  return row.created_at > cursor.created_at ||
    (row.created_at === cursor.created_at && String(row.id) > String(cursor.id))
}

async function fetchPage(config, offset, cursor) {
  const endpoint = new URL(`${config.url}/rest/v1/leads`)
  endpoint.searchParams.set('select', '*')
  endpoint.searchParams.set('order', 'created_at.asc,id.asc')
  endpoint.searchParams.set('limit', String(pageSize))
  endpoint.searchParams.set('offset', String(offset))
  if (cursor) endpoint.searchParams.set('created_at', `gte.${cursor.created_at}`)

  const response = await fetch(endpoint, {
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      Accept: 'application/json',
    },
  })
  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Supabase returned ${response.status}: ${detail}`)
  }

  const rows = await response.json()
  if (!Array.isArray(rows)) throw new Error('Supabase returned an unexpected response for leads.')
  return rows
}

async function main() {
  const config = await loadConfig()
  const previousCursor = await readCursor()
  const found = []
  let offset = 0

  while (true) {
    const page = await fetchPage(config, offset, previousCursor)
    found.push(...page.filter((row) => isAfterCursor(row, previousCursor)))
    if (page.length < pageSize) break
    offset += page.length
  }

  found.sort((a, b) => {
    if (a.created_at !== b.created_at) return a.created_at < b.created_at ? -1 : 1
    return String(a.id) < String(b.id) ? -1 : String(a.id) > String(b.id) ? 1 : 0
  })

  if (found.length) {
    await appendFile(outputPath, found.map((row) => JSON.stringify(row)).join('\n') + '\n', 'utf8')
    const last = found.at(-1)
    const tempPath = `${statePath}.tmp`
    await writeFile(tempPath, `${JSON.stringify({ created_at: last.created_at, id: last.id }, null, 2)}\n`, 'utf8')
    await rename(tempPath, statePath)
    console.log(`Found ${found.length} new lead${found.length === 1 ? '' : 's'}; appended to ${path.basename(outputPath)}.`)
    for (const row of found) {
      console.log(`${row.created_at}  ${row.name || '(no name)'}  ${row.email || '(no email)'}`)
    }
  } else {
    console.log('No new leads since the previous run.')
  }
}

main().catch((error) => {
  console.error(`Lead export failed: ${error.message}`)
  process.exitCode = 1
})
