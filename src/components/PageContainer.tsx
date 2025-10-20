import * as React from "react"

type Props = {
  children: React.ReactNode
  className?: string
}

export default function PageContainer({ children, className = "" }: Props) {
  return (
    <div className={`mx-auto w-full max-w-screen-xl bg-gray-100 px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  )
}
