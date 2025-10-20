import { Skeleton } from '@/components/ui/skeleton'

export default function AdminOverviewSkeleton() {
  return (
    <div className="col-span-4">
      <Skeleton className="h-8 w-40 mb-3" />
      <Skeleton className="h-40 w-full" />
    </div>
  )
}
