import { createClient } from 'contentful'
import { NextResponse } from 'next/server'

// Configurando cliente Contentful
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

export async function GET() {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
    })
    
    return NextResponse.json({ posts: entries.items })
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    return NextResponse.json(
      { error: 'Erro ao processar a requisição' },
      { status: 500 }
    )
  }
} 