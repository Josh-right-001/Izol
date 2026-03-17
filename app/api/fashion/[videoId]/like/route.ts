import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function POST(request: NextRequest, { params }: { params: { videoId: string } }) {
  try {
    const { liked } = await request.json()
    const userId = request.headers.get('x-user-id') || 'anonymous-' + Date.now()

    // Toggle like in database
    if (liked) {
      await supabase.from('video_interactions').insert({
        video_id: params.videoId,
        user_id: userId,
        interaction_type: 'like'
      }).on('*', (payload: any) => {
        console.log('[v0] Like inserted:', payload)
      })
    } else {
      await supabase.from('video_interactions').delete().eq('video_id', params.videoId).eq('user_id', userId).eq('interaction_type', 'like')
    }

    // Get updated like count
    const { count } = await supabase
      .from('video_interactions')
      .select('*', { count: 'exact', head: true })
      .eq('video_id', params.videoId)
      .eq('interaction_type', 'like')

    return NextResponse.json({ likeCount: count || 0 })
  } catch (error) {
    console.error('[v0] Like error:', error)
    return NextResponse.json({ error: 'Failed to toggle like' }, { status: 500 })
  }
}
