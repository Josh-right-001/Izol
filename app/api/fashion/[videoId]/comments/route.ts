import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function GET(request: NextRequest, { params }: { params: { videoId: string } }) {
  try {
    const { data, count } = await supabase
      .from('video_comments')
      .select('*', { count: 'exact' })
      .eq('video_id', params.videoId)
      .order('created_at', { ascending: false })

    return NextResponse.json({ comments: data || [], commentCount: count || 0 })
  } catch (error) {
    console.error('[v0] Fetch comments error:', error)
    return NextResponse.json({ comments: [], commentCount: 0 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { videoId: string } }) {
  try {
    const { comment } = await request.json()
    const userId = request.headers.get('x-user-id') || 'anonymous-' + Date.now()

    await supabase.from('video_comments').insert({
      video_id: params.videoId,
      user_id: userId,
      username: 'User',
      comment_text: comment
    })

    // Get updated comment count
    const { count } = await supabase
      .from('video_comments')
      .select('*', { count: 'exact', head: true })
      .eq('video_id', params.videoId)

    return NextResponse.json({ commentCount: count || 0 })
  } catch (error) {
    console.error('[v0] Add comment error:', error)
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 })
  }
}
