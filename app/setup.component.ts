import { Component } from '@angular/core';
import { handleOpenURL, AppURL } from 'nativescript-urlhandler';
import { UserService } from "./user.service";
import { getContact } from 'nativescript-contacts';
import { RouterExtensions } from "nativescript-angular/router";
import * as _ from 'lodash';

@Component({
  selector: 'setup',
  templateUrl: './setup.component.html',
  // styleUrls: ['./setup.component.css']
})
export class SetupComponent {
  friends:any[] = [];
  constructor(private userService: UserService, private routerExtensions: RouterExtensions) {

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
          firstname: contact.name.given,
          lastname: contact.name.family,
          display: contact.name.given + " " + contact.name.family,
          phoneNumbers: contact.phoneNumbers
        });
      }

      if (this.friends.length === 5) {
        // Send the list to the backend
      }
    });
  }

  goHome() {
    this.routerExtensions.navigate(['/budget'], { clearHistory: true });
  }
}
