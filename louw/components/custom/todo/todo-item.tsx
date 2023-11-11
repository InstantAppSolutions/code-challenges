"use client"

import { DotsVerticalIcon, PlusIcon } from "@radix-ui/react-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "../../ui/button"
import Image from 'next/image'
import { TodoInput } from "./todo-input"
import { TrashIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { todoDTO } from "@/interfaces/todo.interface"
import { useState } from "react"
import useTodoStore from "@/stores/todo.store"

export const TodoItem: React.FC<{ todo: todoDTO }> = ({ todo }) => {
  const store = useTodoStore();

  // const [showAddTodoInput, setShowAddTodoInput] = useState<boolean>(false);

  return (
    <li>
      <div className="grid grid-cols-12 gap-4 my-2 content-center">
        <div className="flex col-span-2 pl-2" onClick={() => store.updateTodo({ ...todo, completed: !todo.completed })}>
          {
            todo.completed ?
              <Image
                className="fill-white-500"
                src="/checkbox-checked.svg"
                alt="Todo Logo"
                width={24}
                height={24}
                priority
              />
              :
              <Image
                src="/checkbox-empty.svg"
                alt="Todo Logo"
                width={24}
                height={24}
                priority
              />
          }
        </div>
        <div className="flex col-span-8" onClick={() => store.updateTodo({ ...todo, completed: !todo.completed })}>
          <p className={todo.completed ? "line-through pt-1.5" : "pt-1.5"}> {todo.task} </p>
        </div>
        <div className="flex col-span-2">
          <Button variant="outline" className="text-destructive hover:!text-white hover:!bg-destructive" type="button" onClick={() => store.deleteTodo(todo)}><TrashIcon className="h-4 w-4" /></Button>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline"><DotsVerticalIcon className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup>
                <DropdownMenuRadioItem className="text-destructive hover:!text-white hover:!bg-destructive " value="delete" onClick={() => store.deleteTodo(todo)}><TrashIcon className="h-4 w-4 mr-2" /> Delete</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="delete" onClick={() => setShowAddTodoInput(!showAddTodoInput)}><PlusIcon className="h-4 w-4 mr-2" /> Add</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
        {/* <div className="col-span-12">
          <div className="pl-6">
            {showAddTodoInput ? <TodoInput parentIds={[...todo.parentsIds, todo.id]} /> : <></>}
          </div>
          <div className="pl-6 mt-2">
            {
              todo.dependentTodoList.map((todo, index) => (
                <TodoItem key={index} todo={todo} />
              ))
            }
          </div>
        </div> */}
      </div>
    </li>

  )
}
