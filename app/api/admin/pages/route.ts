import { NextRequest, NextResponse } from 'next/server'

// This is a mock API for now - in production, connect to Supabase
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const path = searchParams.get('path')

    if (!path) {
      return NextResponse.json(
        { error: 'Path parameter required' },
        { status: 400 }
      )
    }

    // Mock response - in production, query database
    const mockPages: Record<string, any> = {
      '/': {
        title: 'Accueil',
        description: 'Page d\'accueil principale ISOLELE',
        content: 'Contenu de la page d\'accueil...',
        lastModified: new Date().toISOString(),
      },
      '/about': {
        title: 'À Propos',
        description: 'Informations sur ISOLELE',
        content: 'Contenu à propos...',
        lastModified: new Date().toISOString(),
      },
      '/characters': {
        title: 'Personnages',
        description: 'Tous les héros de l\'univers ISOLELE',
        content: 'Liste des personnages...',
        lastModified: new Date().toISOString(),
      },
    }

    const pageData = mockPages[path] || {
      title: 'Page',
      description: 'Description',
      content: 'Contenu',
      lastModified: new Date().toISOString(),
    }

    return NextResponse.json(pageData)
  } catch (error) {
    console.error('[v0] API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path, title, description, content } = body

    if (!path) {
      return NextResponse.json(
        { error: 'Path is required' },
        { status: 400 }
      )
    }

    // In production, save to Supabase here
    console.log('[v0] Saving page:', { path, title, description, content })

    return NextResponse.json({
      success: true,
      message: 'Page saved successfully',
      path,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[v0] API Error:', error)
    return NextResponse.json(
      { error: 'Failed to save page' },
      { status: 500 }
    )
  }
}
