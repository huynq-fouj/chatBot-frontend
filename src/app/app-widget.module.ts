import { ApplicationRef, Injector, NgModule } from "@angular/core";
import { AppWidget } from "./app-widget";
import { BrowserModule } from "@angular/platform-browser";
import { ChatBoxToggle } from "./components/chat-box-toggle/chat-box-toggle";
import { createCustomElement } from "@angular/elements";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ELEMENT_NAME } from "./constants";

@NgModule({
  declarations: [AppWidget],
  imports: [BrowserModule, ChatBoxToggle, NgbModule],
})
export class AppWidgetModule {

  constructor(private injector: Injector) {
    if (!customElements.get(ELEMENT_NAME)) {
      const el = createCustomElement(AppWidget, { injector: this.injector });
      customElements.define(ELEMENT_NAME, el);
      console.log(`Custom element "${ELEMENT_NAME}" defined successfully.`);
    } else {
      console.warn(`Custom element with name "${ELEMENT_NAME}" is already defined.`);
    }
  }

  ngDoBootstrap(appRef: ApplicationRef) {
    const container = document.getElementById(ELEMENT_NAME);
    if (container) {
      appRef.bootstrap(AppWidget, `#${ELEMENT_NAME}`);
    }
  }

}
