import { Component, Input, Injector } from '@angular/core';
import { BaseComponent } from 'app/shared/base.component';

/**
 * A section that is displayed above the page in the layout
 */
@Component({
  selector: 'page-header',
  templateUrl: 'page-header.component.html',
  styleUrls: ['page-header.component.scss']
})
export class PageHeaderComponent extends BaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }

  @Input()
  title: string;
}
