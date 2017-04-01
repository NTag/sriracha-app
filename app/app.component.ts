import { Component } from "@angular/core";
import { handleOpenURL, AppURL } from 'nativescript-urlhandler';

@Component({
  selector: "my-app",
  template: `
    <ActionBar title="My App"></ActionBar>
    <!-- Your UI components go here -->
  `
})
export class AppComponent {
  constructor() {
      handleOpenURL((appURL: AppURL) => {
        console.log('Got the following appURL', appURL);
      });
    }
}
