import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import * as platform from "platform";
declare var GMSServices: any;

if (platform.isIOS) { 
  GMSServices.provideAPIKey("MAPS_API_KEY");
}

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { MapComponent } from "./pages/map/map.component";

@NgModule({
  declarations: [AppComponent, MapComponent],
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
