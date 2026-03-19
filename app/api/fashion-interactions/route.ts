import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceRole)

export async function POST(request: NextRequest) {
  try {
    const { videoId, action, value } = await request.json()

    if (!videoId || !action) {
      return NextResponse.json({ error: 'Missing videoId or action' }, { status: 400 })
    }

    const userId = request.headers.get('x-user-id') || 'anonymous'

    switch (action) {
      case 'like': {
        const { data, error } = await supabase
          .from('video_interactions')
          .upsert(
            { video_id: videoId, user_id: userId, liked: value },
            { onConflict: 'video_id,user_id' }
          )
          .select()

        if (error) throw error
        return NextResponse.json({ success: true, data })
      }

      case 'favorite': {
        const { data, error } = await supabase
          .from('video_interactions')
          .upsert(
            { video_id: videoId, user_id: userId, favorited: value },
            { onConflict: 'video_id,user_id' }
          )
          .select()

        if (error) throw error
        return NextResponse.json({ success: true, data })
      }

      case 'share': {
        const { data, error } = await supabase
          .from('video_interactions')
          .upsert(
            { video_id: videoId, user_id: userId, shared: true },
            { onConflict: 'video_id,user_id' }
          )
          .select()

        if (error) throw error
        return NextResponse.json({ success: true, data })
      }

      case 'comment': {
        const { username, commentText } = await request.json()
        
        if (!commentText) {
          return NextResponse.json({ error: 'Missing comment text' }, { status: 400 })
        }

        const { data, error } = await supabase
          .from('video_comments')
          .insert({
            video_id: videoId,
            user_id: userId,
            username: username || 'Anonymous',
            comment_text: commentText
          })
          .select()

        if (error) throw error
        return NextResponse.json({ success: true, data })
      }

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
    }
  } catch (error) {
    console.error('[v0] API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process interaction' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const videoId = request.nextUrl.searchParams.get('videoId')

    if (!videoId) {
      return NextResponse.json({ error: 'Missing videoId' }, { status: 400 })
    }

    const { data: interactions, error: intError } = await supabase
      .from('video_interactions')
      .select('*')
      .eq('video_id', videoId)

    const { data: comments, error: commError } = await supabase
      .from('video_comments')
      .select('*')
      .eq('video_id', videoId)
      .order('created_at', { ascending: false })

    if (intError || commError) {
      throw intError || commError
    }

    return NextResponse.json({
      interactions,
      comments,
      stats: {
        totalLikes: interactions?.filter(i => i.liked).length || 0,
        totalFavorites: interactions?.filter(i => i.favorited).length || 0,
        totalShares: interactions?.filter(i => i.shared).length || 0,
        totalComments: comments?.length || 0
      }
    })
  } catch (error) {
    console.error('[v0] API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch interactions' },
      { status: 500 }
    )
  }
}
