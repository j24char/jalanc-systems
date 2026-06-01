import { NextResponse } from 'next/server'
import { supabaseRest } from '@/lib/supabase'

type LeadPayload = {
  name?: string
  email?: string
  project_type?: string
  timeline?: string
  message?: string
  page?: string
  page_url?: string
  session_id?: string
  source?: string
  status?: string
  utm?: string
  user_agent?: string
}

export async function POST(request: Request) {
  let payload: LeadPayload

  try {
    payload = (await request.json()) as LeadPayload
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!payload.name || !payload.email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
  }

  const lead = {
    name: payload.name,
    email: payload.email,
    project_type: payload.project_type || null,
    timeline: payload.timeline || null,
    message: payload.message || null,
    page: payload.page || null,
    page_url: payload.page_url || null,
    session_id: payload.session_id || null,
    source: payload.source || 'website',
    status: payload.status || 'new',
    utm: payload.utm || null,
    user_agent: payload.user_agent || null,
  }

  try {
    await supabaseRest('leads', {
      method: 'POST',
      body: lead,
      prefer: 'return=minimal',
    })
  } catch (error) {
    console.error('Failed to save lead:', error)
    return NextResponse.json(
      { error: 'Failed to save lead.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}
