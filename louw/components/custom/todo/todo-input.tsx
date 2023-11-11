"use client"

import * as z from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusIcon } from "@radix-ui/react-icons"
import { todoDTO } from "@/interfaces/todo.interface"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import useTodoStore from "@/stores/todo.store"
import { zodResolver } from "@hookform/resolvers/zod"

export const TodoInput: React.FC<{ parentIds: string[] }> = ({ parentIds }) => {
  const store = useTodoStore();

  const formSchema = z.object({
    todo: z.string().max(50).min(2, {
      message: "Todo should be at least 2 characters long.",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: "",
    },
  })

  function onSubmit(form: z.infer<typeof formSchema>) {
    const todo: todoDTO = {
      id: Math.random().toString(36),
      task: form.todo,
      completed: false,
      parentsIds: parentIds,
      dependentTodoList: []
    }

    store.createTodo(todo);
  }

  const watch = form.watch("todo");

  useEffect(() => {
    store.setSearchValue(watch);
  }, [watch]);

  return (
    <div className="items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4 ">
            <div className="col-span-10">
              <FormField
                control={form.control}
                name="todo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Search or Add for Todo" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <Button type="submit"><PlusIcon className="h-4 w-4" /></Button>
            </div>
          </div >
        </form>
      </Form>
    </div >
  )
}
