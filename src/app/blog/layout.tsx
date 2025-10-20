import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Celebrere',
  description: 'Leia nossos artigos sobre eventos, decoração e experiências únicas.',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
} 