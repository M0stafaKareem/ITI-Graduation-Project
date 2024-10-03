import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from '../models/todo-item.model';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  constructor(private httpClient: HttpClient) {}

  private todosUrl = 'http://127.0.0.1:8000/api/tasks';

  getTodos(): Observable<TodoItem[]> {
    return this.httpClient.get<TodoItem[]>(this.todosUrl);
  }

  getTodoById(id: number): Observable<TodoItem> {
    return this.httpClient.get<TodoItem>(`${this.todosUrl}/${id}`);
  }

  insertTodo(newTodoItem: TodoItem): Observable<TodoItem> {
    return this.httpClient.post<TodoItem>(this.todosUrl, newTodoItem);
  }

  updateTodo(TodoId: string, newTodoItem: TodoItem): Observable<TodoItem> {
    return this.httpClient.put<TodoItem>(
      `${this.todosUrl}/${TodoId}`,
      newTodoItem
    );
  }

  deleteTodo(TodoId: string) {
    return this.httpClient.delete(`${this.todosUrl}/${TodoId}`, {
      responseType: 'text',
    });
  }
}
