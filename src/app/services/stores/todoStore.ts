import { Injectable, inject, signal } from "@angular/core";
import { SSE_EventSource } from "../backend/httpClient/sse-client";
import { environment as env } from "../../../environments/environment";
import { Itodo, ItodoPayload, TodoStoreType } from "../models/todo";
import { TodoApi } from "../backend/httpRequests/todoApi";

const initialStoreState: TodoStoreType = {
    todos: []
}

@Injectable({
    providedIn: "root"
})
export class TodoStore {

    _ES = inject(SSE_EventSource)

    SSE = this._ES.getEventSource(env.base_url+'/sse')

    todoStore = signal<TodoStoreType>(initialStoreState);

    constructor(private todoApi: TodoApi) {
        
        this.SSE.onmessage = (event) => {
            console.log(event.data)
        }

        this.SSE.addEventListener('add-todo', (event) => {
            console.log('add-todo listener : ', event.data)
            const todo = JSON.parse(event.data)
            this.todoStore.update((state) => {
                state.todos = [...state.todos, todo]
                return state
            })
        })
    }

    closeSSE() {
        this.SSE.close()
    }

    addTodo(payload: ItodoPayload) {
        this.todoApi.addTodo(payload).then(({data}) => {
            // console.log('add-todo : ', data)
            this.todoStore.update((state) => {
                state.todos = [...state.todos, data]
                return state
            })
        })
    }

    updateTodo(data: Itodo, id: string) {
        this.todoApi.updateTodo(data, id).then(({data}) => {
            this.todoStore.update((state) => {
                state.todos = [...state.todos.map(item => {
                    return item._id == id ? data : item
                })]
                return state
            })
        })
    }

    getAllTodo() {
        this.todoApi.getAll().then(({data}) => {
            this.todoStore.update((state) => {
                state.todos = [ ...data]
                return state
            })
        })
    }

    getTodo(id: string) {
        this.todoApi.getTodo(id).then(({data}) => {
            console.log('get Todo: ', data)
            // this.todoStore.update((state) => {
            //     state.todos = [...state.todos.filter(item => item._id !== id)]
            //     return state
            // })
        })
    }

    deleteTodo(id:string) {
        this.todoApi.deleteTodo(id).then(({data}) => {
            // console.log('delete todo result: ', data)
            this.todoStore.update((state) => {
                state.todos = [...state.todos.filter(item => item._id !== data._id)]
                return state
            })
        })
    }
}

/**
 * lib to test later : import { SseClient } from 'angular-sse-client';
 */