import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class UserService {
  private access_token:string;
  private username:string;
  private apiUrl = 'http://localhost:8080';

  constructor(private http: Http) {}

  public addFriend(friend) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post(
      this.apiUrl + '/api/' + this.getUsername() + '/addfriend/',
      JSON.stringify(friend),
      { headers: headers }
    )
    .catch(this.handleErrors);
  }

  public addBudget(amount:number, end:Date) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post(
      this.apiUrl + '/user/' + this.getUsername() + '/budget/',
      JSON.stringify({
        amount: amount,
        end: end.toISOString()
      }),
      { headers: headers }
    )
    .catch(this.handleErrors);
  }

  public getUser() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.get(this.apiUrl + '/user/' + this.getUsername(),
      { headers: headers }
    )
    .map(body => { return body.json() })
    .catch(this.handleErrors);
  }

  public setUserName(name:string) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post(this.apiUrl + '/user/' + this.getUsername(),
      { name: name },
      { headers: headers }
    )
    .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }

  public getAccessToken():string {
    return this.access_token;
  }
  public setAccessToken(access_token:string) {
    this.access_token = access_token;
  }

  public getUsername():string {
    return this.username;
  }
  public setUsername(username:string) {
    this.username = username;
  }
}
