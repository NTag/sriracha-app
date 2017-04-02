import { Component } from '@angular/core';
import { handleOpenURL, AppURL } from 'nativescript-urlhandler';
import { UserService } from "./user.service";
import { getContact } from 'nativescript-contacts';
import { RouterExtensions } from "nativescript-angular/router";
import * as _ from 'lodash';
import { topmost } from 'ui/frame';
declare var UIBarStyle: any;

@Component({
  selector: 'setup-name',
  templateUrl: './setup-name.component.html',
  // styleUrls: ['./setup.component.css']
})
export class SetupNameComponent {
  name:string = '';

  constructor(private userService: UserService, private routerExtensions: RouterExtensions) {
    topmost().ios.controller.navigationBar.translucent = false;
    topmost().ios.controller.navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
  }

  save() {
    this.userService.setUserName(this.name).subscribe(() => {}, () => {});
    this.goNext();
  }

  goNext() {
    this.routerExtensions.navigate(['/setup']);
  }
}
