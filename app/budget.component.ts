import { Component } from '@angular/core';
import { UserService } from "./user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {
  selectedIndex:number = 1;
  amount:number = 30;
  end:Date;
  userInfos;

  constructor(private userService: UserService, private router: Router) {

  }

  tabChange() {
    if (this.selectedIndex === 1) { // previous tab
      this.userService.getUser().subscribe(userInfos => {
        this.userInfos = userInfos;
      });
    }
  }

  addBudget() {
    let hour = this.end.getHours();
    let minutes = this.end.getMinutes();
    let now = new Date();
    let d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minutes);
    let d;

    if (now < d1) {
      d = d1;
    } else {
      now.setDate(now.getDate() + 1);
      d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minutes);
    }

    this.userService.addBudget(this.amount, d).subscribe(() => {}, () => {});
  }

}
