import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

import { create } from "zustand";
import { todoDTO } from "@/interfaces/todo.interface";

const appendTodo = (todoList: todoDTO[], createTodo: todoDTO): todoDTO[] => [
  ...todoList,
  createTodo,
];

const createTodoFirebase = (
  todoList: todoDTO[],
  docId: string,
  createTodo: todoDTO
): todoDTO[] => {
  const todoRef = collection(getFirestore(), "todos");

  const updatedTodoList = appendTodo(todoList, createTodo);

  setDoc(doc(todoRef, docId), {
    todos: updatedTodoList,
  });

  return updatedTodoList;
};

const updateTodo = (todoList: todoDTO[], updateTodo: todoDTO): todoDTO[] => {
  return todoList.map((todo) => {
    if (todo.id === updateTodo.id) {
      return updateTodo;
    }

    return todo;
  });
};

const updateTodoFirebase = (
  todoList: todoDTO[],
  docId: string,
  createTodo: todoDTO
): todoDTO[] => {
  const todoRef = collection(getFirestore(), "todos");

  const updatedTodoList = updateTodo(todoList, createTodo);

  setDoc(doc(todoRef, docId), {
    todos: updatedTodoList,
  });

  return updatedTodoList;
};

const removeTodo = (todoList: todoDTO[], deleteTodo: todoDTO): todoDTO[] =>
  todoList.filter((todo) => todo.id !== deleteTodo.id);

const deleteTodoFirebase = (
  todoList: todoDTO[],
  docId: string,
  deleteTodo: todoDTO
): todoDTO[] => {
  const todoRef = collection(getFirestore(), "todos");

  const updatedTodoList = removeTodo(todoList, deleteTodo);

  setDoc(doc(todoRef, docId), {
    todos: updatedTodoList,
  });

  return updatedTodoList;
};

// const updateNestedTodo = (
//   todoList: todoDTO[],
//   updateTodo: todoDTO,
//   currentIndex = 0
// ) => {
//   if (updateTodo.parentsIds.length === 0) {
//     return todoList.map((todo) => {
//       if (todo.id === updateTodo.id) {
//         return updateTodo;
//       }

//       return todo;
//     });
//   }
//   return todoList.map((todo) => {
//     if (updateTodo.parentsIds.length - 1 === currentIndex) {
//       todo.dependentTodoList = todo.dependentTodoList.map((todo) => {
//         if (todo.id === updateTodo.id) {
//           return updateTodo;
//         }

//         return todo;
//       });
//     }

//     if (todo.id === updateTodo.parentsIds[currentIndex]) {
//       todo.dependentTodoList = updateNestedTodo(
//         todo.dependentTodoList,
//         updateTodo,
//         currentIndex + 1
//       );

//       return todo;
//     }

//     return todo;
//   });
// };

// const addNestedTodo = (
//   todoList: todoDTO[],
//   createTodo: todoDTO,
//   currentIndex = 0
// ) => {
//   if (createTodo.parentsIds.length === 0) {
//     return [...todoList, createTodo];
//   }
//   return todoList.map((todo) => {
//     if (createTodo.parentsIds.length - 1 === currentIndex) {
//       todo.dependentTodoList = [...todo.dependentTodoList, createTodo];

//       return todo;
//     }

//     if (todo.id === createTodo.parentsIds[currentIndex]) {
//       todo.dependentTodoList = addNestedTodo(
//         todo.dependentTodoList,
//         createTodo,
//         currentIndex + 1
//       );

//       return todo;
//     }

//     return todo;
//   });
// };

// const deleteNestedTodo = (
//   todoList: todoDTO[],
//   deleteTodo: todoDTO,
//   currentIndex = 0
// ) => {
//   if (deleteTodo.parentsIds.length === 0) {
//     return todoList.filter((todo) => todo.id !== deleteTodo.id);
//   }
//   return todoList.map((todo) => {
//     if (deleteTodo.parentsIds.length - 1 === currentIndex) {
//       todo.dependentTodoList = [...todo.dependentTodoList, deleteTodo];

//       return todo;
//     }

//     if (todo.id === deleteTodo.parentsIds[currentIndex]) {
//       todo.dependentTodoList = addNestedTodo(
//         todo.dependentTodoList,
//         deleteTodo,
//         currentIndex + 1
//       );

//       return todo;
//     }

//     return todo;
//   });
// };

type TodoStore = {
  todoList: todoDTO[];
  loading: boolean;
  docId: string;
  searchValue: string;
  setSearchValue(value: string): void;
  completeLoading: (todoList: todoDTO[], docId: string) => void;
  createTodo: (todo: todoDTO) => void;
  updateTodo: (todo: todoDTO) => void;
  deleteTodo: (todo: todoDTO) => void;
};

const useTodoStore = create<TodoStore>(
  (set): TodoStore => ({
    todoList: [],
    loading: true,
    docId: "",
    searchValue: "",
    setSearchValue: (value: string) =>
      set((state) => ({
        ...state,
        searchValue: value,
      })),
    completeLoading: (todoList: todoDTO[], docId: string) =>
      set((state) => ({
        ...state,
        loading: false,
        docId: docId,
        todoList: todoList,
      })),
    createTodo: async (todo: todoDTO) => {
      set((state) => ({
        ...state,
        todoList: createTodoFirebase(state.todoList, state.docId, todo),
      }));
    },
    updateTodo: async (todo: todoDTO) =>
      set((state) => ({
        ...state,
        todoList: updateTodoFirebase(state.todoList, state.docId, todo),
      })),
    deleteTodo: async (todo: todoDTO) =>
      set((state) => ({
        ...state,
        todoList: deleteTodoFirebase(state.todoList, state.docId, todo),
      })),
  })
);

export default useTodoStore;
