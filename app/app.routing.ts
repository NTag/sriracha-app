import { LoginComponent } from "./login.component";
import { SetupComponent } from "./setup.component";

export const routes = [
  { path: "", component: LoginComponent },
  { path: "setup", component: SetupComponent }
];

export const navigatableComponents = [
  LoginComponent,
  SetupComponent
];
