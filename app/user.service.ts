import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private access_token:string;

  public getAccessToken():string {
    return this.access_token;
  }
  public setAccessToken(access_token:string) {
    this.access_token = access_token;
  }
}
