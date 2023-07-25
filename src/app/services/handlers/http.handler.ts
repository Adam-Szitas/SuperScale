import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';

@Injectable()
export class HttpRestHandler{
  public httpErrorHandler(error: HttpErrorResponse): Observable<never> {
    console.error(error);
    return throwError(error);
  }
}
