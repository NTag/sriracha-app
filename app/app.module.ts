import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AppComponent } from "./app.component";
import { SetupComponent } from "./setup.component";
import { UserService } from "./user.service";

import { routes, navigatableComponents } from "./app.routing";

@NgModule({
  declarations: [AppComponent,
    ...navigatableComponents],
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes)
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [UserService]
})
export class AppModule {}
