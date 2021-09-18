import { Component } from '@angular/core';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss'],
})
export class SubHeaderComponent {
  navItems = [
    {
      link: '/blog',
      label: 'Tutoriels',
    },
    {
      link: '/cheet-sheets',
      label: 'Cheet Sheets',
    },
    {
      link: '/courses',
      label: 'Cours',
    },
  ];
}
