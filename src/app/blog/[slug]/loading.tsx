export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="h-6 bg-gray-200 rounded w-32 mb-8 animate-pulse"></div>
        
        <div className="h-10 bg-gray-200 rounded w-3/4 mb-6 animate-pulse"></div>
        <div className="h-5 bg-gray-200 rounded w-48 mb-10 animate-pulse"></div>
        
        <div className="h-[400px] bg-gray-200 rounded-xl mb-10 animate-pulse"></div>
        
        <div className="space-y-6">
          <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-5/6 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-4/5 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
} 