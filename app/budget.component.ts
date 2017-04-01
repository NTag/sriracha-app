import { Component } from '@angular/core';
import { UserService } from "./user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {
  constructor(private userService: UserService, private router: Router) {

  }

}
