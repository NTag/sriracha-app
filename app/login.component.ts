import { Component } from '@angular/core';
import { handleOpenURL, AppURL } from 'nativescript-urlhandler';
import { openUrl } from 'utils/utils';
import { UserService } from "./user.service";
import { RouterExtensions } from "nativescript-angular/router";
import { topmost } from 'ui/frame';
declare var UIBarStyle: any;


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userService: UserService, private routerExtensions: RouterExtensions) {
    topmost().ios.controller.navigationBar.translucent = false;
    topmost().ios.controller.navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
    
    handleOpenURL((appURL: AppURL) => {
      console.log('Got the following appURL', appURL);

      if (/monzo-connect/.test(appURL.path)) {
        if (appURL.params.has('access_token') && appURL.params.has('username')) {
          console.log('access_token', appURL.params.get('access_token'), 'username', appURL.params.get('username'));
          this.userService.setAccessToken(appURL.params.get('access_token'));
          this.userService.setUsername(appURL.params.get('username'));
          this.routerExtensions.navigate(["/setup-name"], { clearHistory: true });
        }
      }
    });
  }

  monzoConnect() {
    openUrl('https://auth.getmondo.co.uk/?client_id=oauthclient_00009IxQz65UhA8dG2z4Sn&redirect_uri=http://localhost:8080/monzo-connect&response_type=code&state=randomSTRING');
  }
}
