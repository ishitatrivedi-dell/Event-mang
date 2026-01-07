import React from 'react';
import { cn } from '../../utils/cn';

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200 dark:bg-gray-700',
        className
      )}
      {...props}
    />
  );
};

const CardSkeleton = () => {
  return (
    <div className="rounded-2xl shadow-glass backdrop-blur-xl border border-gray-200/20 dark:border-gray-700/20 overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};

const EventCardSkeleton = () => {
  return <CardSkeleton />;
};

const StatsSkeleton = () => {
  return (
    <div className="rounded-2xl shadow-glass backdrop-blur-xl p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-12" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
};

export { Skeleton, CardSkeleton, EventCardSkeleton, StatsSkeleton };
