import { Skeleton } from '@/components/ui/skeleton'

export default function AdminApprovalsLoading() {
  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72 mt-2" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <div className="rounded-md border border-gray-700 p-4">
          <div className="grid grid-cols-5 gap-4">
            <Skeleton className="h-5 w-32 col-span-1" />
            <Skeleton className="h-5 w-40 col-span-1" />
            <Skeleton className="h-5 w-24 col-span-1" />
            <Skeleton className="h-5 w-32 col-span-1" />
            <Skeleton className="h-5 w-20 col-span-1 justify-self-end" />
          </div>
          <div className="mt-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
