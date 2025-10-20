import { createClient } from 'contentful'
import { NextRequest, NextResponse } from 'next/server'

// Configurando cliente Contentful
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Parâmetro slug é necessário' },
        { status: 400 }
      )
    }
    
    const entries = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    })
    
    if (entries.items.length === 0) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ post: entries.items[0] })
  } catch (error) {
    console.error('Erro ao buscar post:', error)
    return NextResponse.json(
      { error: 'Erro ao processar a requisição' },
      { status: 500 }
    )
  }
} 