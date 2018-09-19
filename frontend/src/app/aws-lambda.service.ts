import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

// Modificar esta constante con el endPoint de la función lambda
const lambdaEndPoint = 'https://et4edg7ntl.execute-api.us-east-1.amazonaws.com/dev/';
const localEndPoint = 'http://localhost:3000/register';

interface UserParams {
  firstName: string;
  lastName: string;
  email: string;
  cc: string;
  // serial: string;
}

@Injectable({
  providedIn: 'root'
})
export class AwsLambdaService {

  constructor(
    private http: HttpClient
  ) { }

  invokeGet(): Observable<any> {
    return this.http.get(lambdaEndPoint + 'users/read');
  }

  invokePost(userParams: UserParams): Observable<any> {
    const body = {
      userParameters: userParams
    };

    return this.http.post(lambdaEndPoint + 'users/create', body);
  }

}
