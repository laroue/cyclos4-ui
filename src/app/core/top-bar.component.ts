import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, HostBinding } from '@angular/core';
import { User } from 'app/api/models';
import { BreadcrumbService } from 'app/core/breadcrumb.service';
import { FormatService } from 'app/core/format.service';
import { LoginService } from 'app/core/login.service';
import { MenuService, ActiveMenu } from 'app/core/menu.service';
import { LayoutService } from 'app/shared/layout.service';
import { Menu, RootMenuEntry, MenuType } from 'app/shared/menu';
import { Messages } from 'app/messages/messages';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

/**
 * The top bar, which is always visible
 */
@Component({
  selector: 'top-bar',
  templateUrl: 'top-bar.component.html',
  styleUrls: ['top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent implements OnInit {
  // Export to template
  Menu = Menu;
  MenuType = MenuType;

  @HostBinding('class.has-menu') hasMenu = false;

  roots: Observable<RootMenuEntry[]>;
  @Input() activeMenu: ActiveMenu;

  constructor(
    public breadcrumb: BreadcrumbService,
    public format: FormatService,
    public login: LoginService,
    public layout: LayoutService,
    public menu: MenuService,
    public messages: Messages) {
  }

  @Input() user: User;
  @Input() principal: string;

  @Output() toggleSidenav = new EventEmitter<void>();

  ngOnInit(): void {
    if (!environment.splitMenuBar) {
      this.hasMenu = true;
      this.roots = this.menu.menu(MenuType.BAR);
    }
  }
}
