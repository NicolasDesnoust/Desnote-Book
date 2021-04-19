import { Component, Input } from '@angular/core';

import { Category } from 'src/app/core/model/category';

@Component({
  selector: 'app-category-list',
  template: `
    <mat-list>
      <div mat-subheader class="category-list-title">Catégories</div>
    </mat-list>

    <mat-chip-list aria-label="Category selection">
      <mat-chip
        class="category-tag mat-elevation-z0"
        *ngFor="let category of categories"
        [routerLink]="'/categories/' + category.id"
      >
        {{ category.label }}
      </mat-chip>
    </mat-chip-list>
  `,
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  @Input() categories: Category[] = [];
}
