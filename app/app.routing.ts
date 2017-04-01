import { LoginComponent } from "./login.component";
import { SetupComponent } from "./setup.component";
import { BudgetComponent } from "./budget.component";

export const routes = [
  { path: "", component: LoginComponent },
  { path: "setup", component: SetupComponent },
  { path: "budget", component: BudgetComponent }
];

export const navigatableComponents = [
  LoginComponent,
  SetupComponent,
  BudgetComponent
];
