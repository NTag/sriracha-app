import { LoginComponent } from "./login.component";
import { SetupComponent } from "./setup.component";
import { SetupNameComponent } from "./setup-name.component";
import { BudgetComponent } from "./budget.component";

export const routes = [
  { path: "", component: LoginComponent },
  { path: 'setup-name', component: SetupNameComponent },
  { path: "setup", component: SetupComponent },
  { path: "budget", component: BudgetComponent }
];

export const navigatableComponents = [
  LoginComponent,
  SetupComponent,
  SetupNameComponent,
  BudgetComponent
];
