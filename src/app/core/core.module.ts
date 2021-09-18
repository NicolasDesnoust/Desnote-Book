import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { MarkdownModule } from 'ngx-markdown';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { ThemeHandler } from './services/startup/theme-handler.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MarkdownModule.forChild(),
    LoggerModule.forRoot({
      level: NgxLoggerLevel.INFO,
      serverLogLevel: NgxLoggerLevel.INFO,
    }),
  ],
  providers: [ThemeHandler],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
