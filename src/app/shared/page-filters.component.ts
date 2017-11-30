import { Component, Injector } from '@angular/core';
import { BaseComponent } from 'app/shared/base.component';

/**
 * A section that shows query filters for the current page
 */
@Component({
  selector: 'page-filters',
  templateUrl: 'page-filters.component.html',
  styleUrls: ['page-filters.component.scss']
})
export class PageFiltersComponent extends BaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }
}
