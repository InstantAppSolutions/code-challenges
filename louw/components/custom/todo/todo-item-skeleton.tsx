"use client"

import { Skeleton } from "@/components/ui/skeleton"

export const TodoItemSkeleton = () => {
  const todoList = Array.from(Array(5).keys())
  return (
    todoList.map((todo, index) => (
      <div key={index}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2 pl-2 m-1">
            <Skeleton className="h-6 w-8" />
          </div>
          <div className="col-span-8">
            <Skeleton className="h-6 w-full m-1" />
          </div>
          <div className="col-span-2">
            <Skeleton className="h-6 w-8 m-1" />
          </div>
        </div>
      </div>
    )));
}
