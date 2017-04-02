import { Component } from '@angular/core';
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { topmost } from 'ui/frame';
declare var UIBarStyle: any;

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
  cancelable:boolean = false;
  timeCancel:number = 10;
  timerCancel;

  constructor(private userService: UserService, private router: Router) {
    topmost().ios.controller.navigationBar.translucent = false;
    topmost().ios.controller.navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;

    this.updateBudgetInfos();
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

  updateUserInfos() {
    this.userService.getUser().subscribe(userInfos => {
      console.dump(userInfos);
      this.userInfos = userInfos;
    }, error => console.log('error', error));
  }
  updateBudgetInfos() {
    this.userService.getBudget().subscribe(budget => {
      console.dump(budget);
      if (budget && budget.amount !== undefined && budget.end) {
        this.activeBudget = {
          amount: parseInt(budget.amount),
          end: new Date(budget.end),
          remaining: ''
        };
        this.launchBudget();
      }
    });
  }

  tabChange() {
    if (this.selectedIndex === 1) { // previous tab
      this.updateUserInfos();
    } else if (this.selectedIndex === 0) { // budget tab
      this.updateBudgetInfos();
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

    this.activeBudget = { amount: this.amount, end: d, remaining: '' };
    this.launchBudget();

    this.cancelable = true;
    this.timerCancel = setInterval(() => {
      if (this.timeCancel > 0) {
        this.timeCancel--;
      } else {
        clearInterval(this.timerCancel);
        this.userService.addBudget(this.amount, d).subscribe(() => {}, () => {});
        this.cancelable = false;
        this.timeCancel = 10;
      }
    }, 1000);
  }

  cancelBudget() {
    clearInterval(this.timerCancel);
    this.timeCancel = 10;
    this.activeBudget = null;
    this.cancelable = false;
  }

}
