import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Products',
        icon: 'pi pi-home',
        routerLink: '/products',
      },
      {
        label: 'Orders',
        icon: 'pi pi-home',
        routerLink: '/orders',
      },
    ];
  }
}
