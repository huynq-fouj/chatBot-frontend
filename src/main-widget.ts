/// <reference types="@angular/localize" />

import { AppWidgetModule } from './app/app-widget.module';
import { platformBrowser } from '@angular/platform-browser';

platformBrowser().bootstrapModule(AppWidgetModule);
