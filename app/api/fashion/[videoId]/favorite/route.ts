import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function POST(request: NextRequest, { params }: { params: { videoId: string } }) {
  try {
    const { favorited } = await request.json()
    const userId = request.headers.get('x-user-id') || 'anonymous-' + Date.now()

    if (favorited) {
      await supabase.from('video_interactions').insert({
        video_id: params.videoId,
        user_id: userId,
        interaction_type: 'favorite'
      })
    } else {
      await supabase
        .from('video_interactions')
        .delete()
        .eq('video_id', params.videoId)
        .eq('user_id', userId)
        .eq('interaction_type', 'favorite')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Favorite error:', error)
    return NextResponse.json({ error: 'Failed to toggle favorite' }, { status: 500 })
  }
}
