import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function JobListingLoading() {
  return (
    <div className="flex flex-col gap-6">
      {[...Array(10)].map((item, index) => (
        <Card className="p-6" key={index}>
          <div className="flex items-start gap-4">
            <Skeleton className="h-14 w-14 rounded" />
            <div className="space-y-3 flex-1">
              <Skeleton className="h-5 w-[300px]" />
              <Skeleton className="h-4 w-[200px]" />
              <div className="flex gap-4 mt-4">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[120px]" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
