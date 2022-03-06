import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { NgAisModule } from 'angular-instantsearch';
import { ClickOutsideModule } from 'ng-click-outside';
import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from '../shared/shared.module';
import { LeftSidenavComponent } from './components/left-sidenav/left-sidenav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { SubHeaderComponent } from './components/sub-header/sub-header.component';
import { MainLayoutComponent } from './containers/main-layout/main-layout.component';
import { NavbarOnlyLayoutComponent } from './containers/navbar-only-layout/navbar-only-layout.component';

const COMPONENTS = [
  NavbarComponent,
  LeftSidenavComponent,
  SubHeaderComponent,
  SearchbarComponent,
];

const LAYOUTS = [MainLayoutComponent, NavbarOnlyLayoutComponent];

@NgModule({
  declarations: [...COMPONENTS, ...LAYOUTS],
  imports: [
    SharedModule,
    MarkdownModule.forChild(),
    NgAisModule,
    A11yModule,
    ClickOutsideModule,
  ],
})
export class LayoutsModule {}
