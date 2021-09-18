import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AutosizeModule } from 'ngx-autosize';
import { ClipboardModule } from 'ngx-clipboard';
import { CardListComponent } from './components/card-list/card-list.component';
import { CopyButtonComponent } from './components/copy-button.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { RouterLinkComponent } from './components/router-link.component';
import { AddCodeHeadersDirective } from './directives/add-code-headers.directive';
import { ConvertLinksDirective } from './directives/convert-links.directive';
import { SecuredExternalLinkDirective } from './directives/secured-external-link.directive';
import { FeatherModule } from './modules/feather.module';
import { FontAwesomeModule } from './modules/fontawesome.module';
import { MaterialModule } from './modules/material.module';

// Contient les composants partagés
const COMPONENTS = [
  RouterLinkComponent,
  CopyButtonComponent,
  CardListComponent,
  PageHeaderComponent
];

// Contient les directives partagées
const DIRECTIVES = [
  ConvertLinksDirective,
  AddCodeHeadersDirective,
  SecuredExternalLinkDirective
];

// Contient les modules partagés
const MODULES = [
  MaterialModule,
  FeatherModule,
  CommonModule,
  FormsModule,
  RouterModule,
  ReactiveFormsModule,
  ClipboardModule,
  AutosizeModule,
  FontAwesomeModule
];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  imports: [...MODULES],
  exports: [...DIRECTIVES, ...COMPONENTS, ...MODULES],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
