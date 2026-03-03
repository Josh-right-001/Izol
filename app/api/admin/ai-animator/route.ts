import { NextRequest, NextResponse } from 'next/server'

// AI-powered animation suggestions
const animationSuggestions: Record<string, any[]> = {
  'hero-section': [
    {
      name: 'Fade In Slide Up',
      description: 'Elements fade in while sliding up from bottom',
      duration: '0.8s',
      delay: '0s',
      css: 'animate-fadeInSlideUp'
    },
    {
      name: 'Parallax Scroll',
      description: 'Background moves slower than foreground',
      duration: '1s',
      delay: '0s',
      css: 'animate-parallax'
    },
    {
      name: 'Stagger Animation',
      description: 'Each element animates in sequence',
      duration: '1.2s',
      delay: '0.1s',
      css: 'animate-stagger'
    },
    {
      name: 'Zoom In With Blur',
      description: 'Elements zoom in from blurred state',
      duration: '1s',
      delay: '0s',
      css: 'animate-zoomBlur'
    },
  ],
  'text-content': [
    {
      name: 'Letter Reveal',
      description: 'Characters appear one by one',
      duration: '1.5s',
      delay: '0s',
      css: 'animate-letterReveal'
    },
    {
      name: 'Fade In',
      description: 'Smooth fade in effect',
      duration: '0.6s',
      delay: '0s',
      css: 'animate-fadeIn'
    },
    {
      name: 'Type Writer',
      description: 'Text appears like being typed',
      duration: '2s',
      delay: '0s',
      css: 'animate-typeWriter'
    },
  ],
  'image-gallery': [
    {
      name: 'Grid Reveal',
      description: 'Images appear in grid pattern',
      duration: '1.8s',
      delay: '0.05s',
      css: 'animate-gridReveal'
    },
    {
      name: 'Flip Card',
      description: '3D flip animation on hover',
      duration: '0.6s',
      delay: '0s',
      css: 'animate-flipCard'
    },
    {
      name: 'Mosaic Build',
      description: 'Pieces come together from edges',
      duration: '2s',
      delay: '0.1s',
      css: 'animate-mosaicBuild'
    },
    {
      name: 'Floating Bounce',
      description: 'Subtle floating and bouncing',
      duration: '3s',
      delay: '0s',
      css: 'animate-floatingBounce'
    },
  ],
  'button': [
    {
      name: 'Pulse Glow',
      description: 'Button glows and pulses',
      duration: '2s',
      delay: '0s',
      css: 'animate-pulseGlow'
    },
    {
      name: 'Slide In Arrow',
      description: 'Arrow slides in on hover',
      duration: '0.4s',
      delay: '0s',
      css: 'animate-slideArrow'
    },
    {
      name: 'Expand Width',
      description: 'Button expands on hover',
      duration: '0.3s',
      delay: '0s',
      css: 'animate-expandWidth'
    },
  ],
  'navigation': [
    {
      name: 'Slide Down',
      description: 'Nav slides down with fade',
      duration: '0.5s',
      delay: '0s',
      css: 'animate-slideDown'
    },
    {
      name: 'Blur In',
      description: 'Nav appears with blur effect',
      duration: '0.6s',
      delay: '0s',
      css: 'animate-blurIn'
    },
  ],
  'loading-page': [
    {
      name: 'Fade Through',
      description: 'Smooth fade to next page',
      duration: '0.3s',
      delay: '0s',
      css: 'animate-fadeThrough'
    },
    {
      name: 'Scale Transition',
      description: 'Page scales while fading',
      duration: '0.5s',
      delay: '0s',
      css: 'animate-scaleTransition'
    },
    {
      name: 'Slide Transition',
      description: 'New page slides in',
      duration: '0.4s',
      delay: '0s',
      css: 'animate-slideTransition'
    },
  ]
}

export async function POST(request: NextRequest) {
  try {
    const { elementType, elementName } = await request.json()

    // Find matching suggestions based on element type and name
    let suggestions = animationSuggestions[elementType] || []
    
    if (elementName && !suggestions.length) {
      // Try to match by name keywords
      for (const [key, value] of Object.entries(animationSuggestions)) {
        if (elementName.toLowerCase().includes(key)) {
          suggestions = value
          break
        }
      }
    }

    // If still no match, return general suggestions
    if (!suggestions.length) {
      suggestions = [
        {
          name: 'Fade In',
          description: 'Simple fade in effect',
          duration: '0.6s',
          delay: '0s',
          css: 'animate-fadeIn'
        },
        {
          name: 'Slide Up',
          description: 'Element slides up while fading',
          duration: '0.8s',
          delay: '0s',
          css: 'animate-slideUp'
        }
      ]
    }

    return NextResponse.json({
      success: true,
      elementType,
      elementName,
      suggestions: suggestions.slice(0, 4), // Return top 4 suggestions
      recommendation: suggestions[0], // First suggestion is the recommended one
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate animation suggestions' },
      { status: 500 }
    )
  }
}

// GET to list all available animation types
export async function GET() {
  return NextResponse.json({
    availableAnimations: Object.keys(animationSuggestions),
    totalAnimations: Object.values(animationSuggestions).flat().length,
  })
}
