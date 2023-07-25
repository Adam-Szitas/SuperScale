import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { HttpRestHandler } from '../handlers/http.handler';

@Injectable()
export class TasksService{

  private readonly baseUrl: string = 'http://64.225.105.163:3000';

  constructor(private http: HttpClient, private httpHandler: HttpRestHandler){}

  public getTasks(): Observable<Task[]>{
    const headers = new HttpHeaders({'accept': '*/*'});
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`, { headers }).pipe(
      catchError(this.httpHandler.httpErrorHandler)
    );
  }

  public updateTask(task: any): Observable<any>{
    const body = {
      name: task.name,
      type: task.type,
      fields: {
        durationInHours: task.duration
      }
    };

    const headers = new HttpHeaders({'accept': 'application/json'})
    return this.http.put(`${this.baseUrl}/tasks/${task.id}`, body, { headers }).pipe(
      catchError(this.httpHandler.httpErrorHandler)
    )
  }

  public deleteTask(task: any): Observable<any>{
    const headers = new HttpHeaders({'accept': '*/*'});
    return this.http.delete(`${this.baseUrl}/tasks/${task.id}`, { headers }).pipe(
      catchError(this.httpHandler.httpErrorHandler)
    )
  }
}

export interface Task{
  name: string;
  type: string;
  __v: number;
  _id: string;
  fields: {
    durationInHours: number;
  }
}
