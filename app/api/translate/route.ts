import { NextRequest, NextResponse } from 'next/server';
import { translateWithGemini, generateDescription } from '@/lib/gemini-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, targetLanguage, type = 'translate' } = body;

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Missing required fields: text, targetLanguage' },
        { status: 400 }
      );
    }

    let result;

    if (type === 'generate-description') {
      const { subject, context } = body;
      if (!subject || !context) {
        return NextResponse.json(
          { error: 'Missing required fields for description: subject, context' },
          { status: 400 }
        );
      }
      result = await generateDescription(subject, context);
      return NextResponse.json({ description: result });
    }

    // Default: translate
    const response = await translateWithGemini({
      text,
      targetLanguage,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('[API] Translation error:', error);
    return NextResponse.json(
      { error: 'Translation failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Translation API endpoint',
    methods: ['POST'],
    example: {
      method: 'POST',
      body: {
        text: 'Hello world',
        targetLanguage: 'French',
        type: 'translate' // or 'generate-description'
      }
    }
  });
}
