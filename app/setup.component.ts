import { Component } from '@angular/core';
import { handleOpenURL, AppURL } from 'nativescript-urlhandler';
import { UserService } from "./user.service";


@Component({
  selector: 'setup',
  templateUrl: './setup.component.html',
  // styleUrls: ['./setup.component.css']
})
export class SetupComponent {
  constructor(private userService: UserService) {

  }
}
