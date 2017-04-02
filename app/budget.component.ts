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
  activeBudget;

  constructor(private userService: UserService, private router: Router) {

  }

  launchBudget() {
    function zeros(n:number):string {
      if (n === 0) {
        return '00';
      } else if (n < 10) {
        return '0' + n;
      } else {
        return '' + n;
      }
    }
    let updateTimeRemaining = () => {
      let now = new Date();
      let diff = ((this.activeBudget.end.getHours() + 24)*3600 + this.activeBudget.end.getMinutes()*60 - now.getHours()*3600 - now.getMinutes()*60 - now.getSeconds()) % (24*3600);
      let remaining = '';
      remaining += zeros(Math.floor(diff/3600)) + ':';
      remaining += zeros(Math.floor((diff % 3600)/60)) + ':';
      remaining += zeros(diff % 60);
      this.activeBudget.remaining = remaining;
    };

    setInterval(updateTimeRemaining, 1000);
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

    this.activeBudget = { amount: this.amount, end: d, remaining: '' };
    this.launchBudget();
  }

}
