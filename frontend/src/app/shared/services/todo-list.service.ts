import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from '../models/todo-item.model';
import { DOMAIN } from '../constants/domain';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  constructor(private httpClient: HttpClient) {}

  private todosUrl = `${DOMAIN.test}/tasks`;

  getTodos(): Observable<TodoItem[]> {
    return this.httpClient.get<TodoItem[]>(this.todosUrl);
  }

  getTodoById(id: number): Observable<TodoItem> {
    return this.httpClient.get<TodoItem>(`${this.todosUrl}/${id}`);
  }

  insertTodo(newTodoItem: TodoItem): Observable<TodoItem> {
    console.log(newTodoItem);

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
