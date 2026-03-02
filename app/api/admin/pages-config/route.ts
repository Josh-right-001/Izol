import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('pages')
      .select('id, name, slug, is_public, is_visible, meta_title, meta_description, featured')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json([], { status: 500 })
  }
}
