import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function POST(request: NextRequest, { params }: { params: { videoId: string } }) {
  try {
    const userId = request.headers.get('x-user-id') || 'anonymous-' + Date.now()

    await supabase.from('video_interactions').insert({
      video_id: params.videoId,
      user_id: userId,
      interaction_type: 'share'
    }).on('*', () => {})

    // Get updated share count
    const { count } = await supabase
      .from('video_interactions')
      .select('*', { count: 'exact', head: true })
      .eq('video_id', params.videoId)
      .eq('interaction_type', 'share')

    return NextResponse.json({ shareCount: count || 0 })
  } catch (error) {
    console.error('[v0] Share error:', error)
    return NextResponse.json({ error: 'Failed to share' }, { status: 500 })
  }
}
