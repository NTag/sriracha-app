import { Component } from '@angular/core';
import { handleOpenURL, AppURL } from 'nativescript-urlhandler';
import { UserService } from "./user.service";
import { getContact } from 'nativescript-contacts';
import { RouterExtensions } from "nativescript-angular/router";
import * as _ from 'lodash';
import { topmost } from 'ui/frame';
declare var UIBarStyle: any;

@Component({
  selector: 'setup',
  templateUrl: './setup.component.html',
  // styleUrls: ['./setup.component.css']
})
export class SetupComponent {
  friends:any[] = [];
  constructor(private userService: UserService, private routerExtensions: RouterExtensions) {
    topmost().ios.controller.navigationBar.translucent = false;
    topmost().ios.controller.navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
  }

  addFriend() {
    getContact().then(args => {
      /// Returns args:
      /// args.data: Generic cross platform JSON object
      /// args.reponse: "selected" or "cancelled" depending on wheter the user selected a contact.

      if (args.response === "selected") {
        let contact = args.data;

        if (_.find(this.friends, c => { return c.id === contact.id })) {
          alert('You have already added this friend');
          return;
        }

        this.friends.push({
          id: contact.id,
          name: contact.name.given + " " + contact.name.family,
          phoneNumbers: _.map(contact.phoneNumbers, 'value')
        });
      }

      if (this.friends.length === 3) {
        console.dump(this.friends);
        _.forEach(this.friends, friend => {
          this.userService.addFriend(friend).subscribe(() => {}, () => {});
        });
      }
    });
  }

  removeFriend(i:number) {
    this.friends.splice(i, 1);
  }

  goHome() {
    this.routerExtensions.navigate(['/budget'], { clearHistory: true });
  }
}
