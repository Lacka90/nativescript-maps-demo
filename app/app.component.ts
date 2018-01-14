import { Component } from "@angular/core";

@Component({
  selector: "my-app",
  template: `
    <ActionBar title="Maps Location Examples" class="action-bar"></ActionBar>
    <page-router-outlet></page-router-outlet>
  `
})
export class AppComponent {}
