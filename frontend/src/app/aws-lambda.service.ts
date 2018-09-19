import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const lambdaEndPoint = 'https://uso3f6rce3.execute-api.us-east-1.amazonaws.com/dev/';
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
    return this.http.get(lambdaEndPoint + 'get-users');
  }

  invokePost(userParams: UserParams): Observable<any> {
    const body = {
      userParameters: userParams
    };

    return this.http.post(localEndPoint, body);
  }

}
