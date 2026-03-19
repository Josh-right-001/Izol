import { NextRequest, NextResponse } from 'next/server'

// Mock database - in production, use Supabase
const mockDatabase: Record<string, any> = {
  '/': {
    title: 'Accueil',
    description: 'Page d\'accueil principale ISOLELE',
    content: 'Contenu de la page d\'accueil...',
    lastModified: new Date().toISOString(),
  },
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string } }
) {
  try {
    const path = `/${params.path}` || '/'

    const pageData = mockDatabase[path] || {
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string } }
) {
  try {
    const body = await request.json()
    const path = `/${params.path}` || '/'

    // Store in mock database
    mockDatabase[path] = {
      ...body,
      path,
      lastModified: new Date().toISOString(),
    }

    console.log('[v0] Page saved:', path)

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
