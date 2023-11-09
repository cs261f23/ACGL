import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  events: Array<string> = [];
  opened?: any = '';
  expanded: boolean = false;
  icons: Array<boolean> = [false, false]

  expand(number: any): void {
    let toggle;
    try {
      toggle = this.icons[number];
    }
    catch {
      toggle = false
    }

    this.icons = [false, false]
    toggle ? {} :
      this.icons[number] = true

  }

}
