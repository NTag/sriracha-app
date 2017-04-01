import { Component } from "@angular/core";
import { handleOpenURL, AppURL } from 'nativescript-urlhandler';
import { openUrl } from 'utils/utils';

@Component({
  selector: "my-app",
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor() {
    handleOpenURL((appURL: AppURL) => {
      console.log('Got the following appURL', appURL);
    });
  }

  monzoConnect() {
    openUrl('https://auth.getmondo.co.uk/?client_id=oauthclient_00009IxQz65UhA8dG2z4Sn&redirect_uri=http://google.com&response_type=code&state=randomSTRING');
  }
}
