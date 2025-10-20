'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Função para formatar data
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
export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/blog/posts')
        if (!response.ok) {
          throw new Error('Falha ao carregar os posts')
        }
        
        const data = await response.json()
        setPosts(data.posts)
        setLoading(false)
      } catch (error) {
        console.error('Erro ao buscar posts:', error)
        setError('Erro ao carregar os posts')
        setLoading(false)
      }
    }
    
    fetchPosts()
  }, [])
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <Link 
            href="/" 
            className="inline-block mb-8 text-[#C1A87D] hover:text-[#D4BC8C] font-semibold transition-colors"
          >
            ← Voltar para o site
          </Link>
          
          <h1 className="text-4xl font-bold mb-12 text-gray-800">Blog</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <Link 
            href="/" 
            className="inline-block mb-8 text-[#C1A87D] hover:text-[#D4BC8C] font-semibold transition-colors"
          >
            ← Voltar para o site
          </Link>
          
          <h1 className="text-4xl font-bold mb-8 text-gray-800">Blog</h1>
          
          <div className="bg-white rounded-xl shadow-md p-8 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Erro ao carregar posts</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-[#C1A87D] text-black px-6 py-3 rounded-lg hover:bg-[#D4BC8C] transition-colors font-semibold"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Botão de voltar ao site principal */}
        <Link 
          href="/" 
          className="inline-block mb-8 text-[#C1A87D] hover:text-[#D4BC8C] font-semibold transition-colors"
        >
          ← Voltar para o site
        </Link>
        
        <h1 className="text-4xl font-bold mb-12 text-gray-800">Blog</h1>
        
        {posts.length === 0 ? (
          <p className="text-gray-600">Nenhum post encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => {
              const { title, slug, featuredImage } = post.fields
              const date = post.fields.date || post.fields.publishDate || post.sys.createdAt
              const imageUrl = featuredImage?.fields?.file?.url
              
              return (
                <Link 
                  href={`/blog/${slug}`}
                  key={post.sys.id}
                  className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:shadow-[#C1A87D]/10 transition-all transform hover:-translate-y-1"
                >
                  {imageUrl && (
                    <div className="relative h-48">
                      <Image
                        src={`https:${imageUrl}`}
                        alt={title || ''}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
                    {date && (
                      <p className="text-[#C1A87D] text-sm">
                        {formatDate(date)}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
} 