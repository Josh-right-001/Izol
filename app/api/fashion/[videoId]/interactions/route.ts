import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function GET(request: NextRequest, { params }: { params: { videoId: string } }) {
  try {
    const userId = request.headers.get('x-user-id') || 'anonymous-' + Date.now()

    // Get counts for all interaction types
    const { count: likesCount } = await supabase
      .from('video_interactions')
      .select('*', { count: 'exact', head: true })
      .eq('video_id', params.videoId)
      .eq('interaction_type', 'like')

    const { count: commentsCount } = await supabase
      .from('video_comments')
      .select('*', { count: 'exact', head: true })
      .eq('video_id', params.videoId)

    const { count: sharesCount } = await supabase
      .from('video_interactions')
      .select('*', { count: 'exact', head: true })
      .eq('video_id', params.videoId)
      .eq('interaction_type', 'share')

    // Check if user has liked or favorited
    const { data: userLike } = await supabase
      .from('video_interactions')
      .select('*')
      .eq('video_id', params.videoId)
      .eq('user_id', userId)
      .eq('interaction_type', 'like')
      .single()

    const { data: userFavorite } = await supabase
      .from('video_interactions')
      .select('*')
      .eq('video_id', params.videoId)
      .eq('user_id', userId)
      .eq('interaction_type', 'favorite')
      .single()

    return NextResponse.json({
      likes: likesCount || 0,
      comments: commentsCount || 0,
      shares: sharesCount || 0,
      userLiked: !!userLike,
      userFavorited: !!userFavorite
    })
  } catch (error) {
    console.error('[v0] Interactions error:', error)
    return NextResponse.json({
      likes: 0,
      comments: 0,
      shares: 0,
      userLiked: false,
      userFavorited: false
    })
  }
}
