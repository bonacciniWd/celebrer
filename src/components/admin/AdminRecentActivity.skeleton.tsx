import { Skeleton } from '@/components/ui/skeleton'

export default function AdminRecentActivitySkeleton() {
  return (
    <div className="col-span-3">
      <Skeleton className="h-8 w-56 mb-3" />
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    </div>
  )
}
