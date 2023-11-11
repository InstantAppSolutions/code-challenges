import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { EyeNoneIcon } from "@radix-ui/react-icons"
import { EyeOpenIcon } from "@radix-ui/react-icons"
import { Separator } from "@/components/ui/separator";
import { TodoInput } from "../custom/todo/todo-input"
import { TodoItem } from "../custom/todo/todo-item"
import { TodoItemSkeleton } from "../custom/todo/todo-item-skeleton"
import { getFirestore } from "firebase/firestore";
import { todoDTO } from "@/interfaces/todo.interface"
import useTodoStore from "@/stores/todo.store"

type CardProps = React.ComponentProps<typeof Card>

export const TodoWidget = ({ className, ...props }: CardProps) => {
  const store = useTodoStore();

  const [showCompletedTodos, setShowCompletedTodos] = useState<boolean>(true);
  const [todoList, setTodoList] = useState<todoDTO[]>([]);

  const GetTodos = async () => {
    const docId = "r4QbSuIx3l4xZUuQAKC5";
    const docRef = doc(getFirestore(), "todos", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      store.completeLoading(docSnap.data().todos as todoDTO[], docId);
    } else {
      store.completeLoading([], "");
    }
  }

  useEffect(() => {
    GetTodos();
  }, []);

  useEffect(() => {
    if (showCompletedTodos) {
      setTodoList(store.todoList);
      return;
    }
    setTodoList(store.todoList.filter((todo) => todo.completed === showCompletedTodos));
  }, [showCompletedTodos, store.todoList]);

  const toggleCompleted = () => {
    setShowCompletedTodos(!showCompletedTodos);
  }

  return (
    < Card {...props}>
      <CardHeader>
        <CardTitle>
          <div className="grid grid-cols-2 gap-4">
            <div className="justify-self-start">
              Todo
            </div>
            <div className="justify-self-end">
              <div className="col-span-2">
                {
                  showCompletedTodos ?
                    <Button variant="outline" type="button" onClick={() => toggleCompleted()}><EyeNoneIcon className="h-4 w-4" /></Button> :
                    <Button variant="outline" type="button" onClick={() => toggleCompleted()}><EyeOpenIcon className="h-4 w-4" /></Button>
                }
              </div>
            </div>
          </div>
        </CardTitle>
        <CardDescription>Create, View, Complete and Delete Todos</CardDescription>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent className="grid gap-4">
        <TodoInput parentIds={[]} />
        {store.loading ?
          <TodoItemSkeleton /> :
          <ul>
            {
              todoList.filter((todo) => todo.task.includes(store.searchValue)).map((todo, index) => (
                <TodoItem key={index} todo={todo} />
              ))
            }
          </ul>
        }
      </CardContent>
    </Card >
  )
}
function orderBy(arg0: string, arg1: string): import("@firebase/firestore").QueryCompositeFilterConstraint {
  throw new Error("Function not implemented.")
}
