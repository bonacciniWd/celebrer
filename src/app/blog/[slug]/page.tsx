'use client'

import { useEffect, useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Head from 'next/head'

// Opções de renderização do conteúdo
const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="mb-6 text-gray-700">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: any) => (
      <h2 className="text-2xl font-bold mb-4 text-gray-800 mt-8">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3 className="text-xl font-bold mb-3 text-gray-800 mt-6">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="list-disc pl-6 mb-6 text-gray-700">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <ol className="list-decimal pl-6 mb-6 text-gray-700">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
      <li className="mb-2">{children}</li>
    ),
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <a href={node.data.uri} className="text-[#C1A87D] hover:text-[#D4BC8C] underline">
        {children}
      </a>
    ),
    [BLOCKS.QUOTE]: (node: any, children: any) => (
      <blockquote className="border-l-4 border-[#C1A87D] pl-4 italic my-6 text-gray-600">
        {children}
      </blockquote>
    ),
  },
}

// Componente de formatação de data
function formatDate(dateValue: any): string {
  if (!dateValue) return ''
  
  try {
    const date = new Date(dateValue)
    return date.toLocaleDateString('pt-BR')
  } catch (error) {
    console.error('Erro ao formatar data:', error)
    return ''
  }
}

// Componente principal
export default function BlogPost() {
  const params = useParams()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Atualiza o título da página quando o post é carregado
  useEffect(() => {
    if (post?.fields?.title) {
      document.title = `${post.fields.title} - Blog Celebrere`
    } else if (error) {
      document.title = 'Post não encontrado - Blog Celebrere'
    }
  }, [post, error])
  
  useEffect(() => {
    async function fetchPost() {
      try {
        const slug = params?.slug
        if (!slug) {
          setError('Post não encontrado')
          setLoading(false)
          return
        }
        
        const response = await fetch(`/api/blog/post?slug=${slug}`)
        if (!response.ok) {
          throw new Error('Falha ao carregar o post')
        }
        
        const data = await response.json()
        setPost(data.post)
        setLoading(false)
      } catch (error) {
        console.error('Erro ao buscar post:', error)
        setError('Erro ao carregar o post')
        setLoading(false)
      }
    }
    
    fetchPost()
  }, [params])
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C1A87D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando post...</p>
        </div>
      </div>
    )
  }
  
  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-center px-4">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Post não encontrado</h2>
          <p className="text-gray-600 mb-8">{error || 'O post que você está procurando não existe ou foi removido.'}</p>
          <Link href="/blog" className="bg-[#C1A87D] text-black px-6 py-3 rounded-lg hover:bg-[#D4BC8C] transition-colors font-semibold">
            Voltar para o Blog
          </Link>
        </div>
      </div>
    )
  }
  
  const { title, content, featuredImage } = post.fields
  const date = post.fields.date || post.fields.publishDate || post.sys.createdAt
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link 
          href="/blog" 
          className="inline-block mb-8 text-[#C1A87D] hover:text-[#D4BC8C] font-semibold transition-colors"
        >
          ← Voltar para o blog
        </Link>
        
        <h1 className="text-4xl font-bold mb-6 text-gray-800">{title}</h1>
        
        {date && (
          <div className="mb-8 text-[#C1A87D]">
            Publicado em {formatDate(date)}
          </div>
        )}
        
        {featuredImage?.fields?.file?.url && (
          <div className="relative w-full h-[400px] mb-10 rounded-xl overflow-hidden">
            <Image
              src={`https:${featuredImage.fields.file.url}`}
              alt={title || 'Blog post'}
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </div>
        )}
        
        <div className="prose prose-lg max-w-none">
          {content && documentToReactComponents(content, options)}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-300">
          <Link 
            href="/blog" 
            className="inline-block text-[#C1A87D] hover:text-[#D4BC8C] font-semibold transition-colors"
          >
            ← Voltar para o blog
          </Link>
        </div>
      </div>
    </div>
  )
}
