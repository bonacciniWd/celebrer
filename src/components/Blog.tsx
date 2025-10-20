'use client';

import { useEffect, useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, Document } from '@contentful/rich-text-types';
import client from '@/lib/contentful';
import Image from 'next/image';
import Link from 'next/link';
import { Entry, EntryFields } from 'contentful';

interface BlogPostFields {
  title: string;
  slug: string;
  content: Document;
  featuredImage: EntryFields.Asset;
  date: string;
}

interface BlogPost {
  sys: {
    id: string;
    contentType: {
      sys: {
        id: 'blogPost';
      };
    };
  };
  fields: BlogPostFields;
}

// Função para extrair texto puro do documento Contentful
function extractPlainText(content: Document): string {
  let text = '';
  
  if (!content || !content.content) return text;
  
  content.content.forEach(node => {
    if (node.nodeType === 'paragraph') {
      node.content?.forEach(textNode => {
        if (textNode.nodeType === 'text') {
          text += textNode.value + ' ';
        }
      });
    }
  });
  
  return text.trim();
}

export default function Blog() {
  const [posts, setPosts] = useState<Entry<BlogPost>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'blogPost',
          order: ['-sys.createdAt'],
          limit: 6,
          include: 2,
        });
        setPosts(response.items as Entry<BlogPost>[]);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C1A87D]"></div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">Nosso Blog</h2>
          <p className="text-gray-800 text-lg">Fique por dentro das novidades e dicas sobre drinks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const imageUrl = post.fields.featuredImage?.fields?.file?.url;
            if (!imageUrl) return null;
            
            // Extrair texto resumido do conteúdo
            const plainText = extractPlainText(post.fields.content);
            const excerpt = plainText.length > 120 
              ? plainText.substring(0, 120) + '...' 
              : plainText;
            
            return (
              <article
                key={post.sys.id}
                className="bg-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="relative h-48">
                  <Image
                    src={`https:${imageUrl}`}
                    alt={post.fields.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-black mb-2 line-clamp-2">{post.fields.title}</h3>
                  <div className="text-gray-800 text-sm mb-4">
                    {new Date(post.fields.date).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="text-gray-800 mb-4 flex-grow">
                    <p className="line-clamp-3">{excerpt}</p>
                  </div>
                  <Link
                    href={`/blog/${post.fields.slug}`}
                    className="mt-auto inline-block text-[#C1A87D] hover:text-[#D4BC8C] font-semibold transition-colors duration-200"
                  >
                    Ler mais →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
} 