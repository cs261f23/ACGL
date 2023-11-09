import { Component, EventEmitter, Output } from '@angular/core';

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
  @Output() myOpportunitiesEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() opportunitySearchEmitter: EventEmitter<boolean> = new EventEmitter();

  emitChooser(): EventEmitter<boolean> {
    for (let i = 0; i < this.icons.length; i++) {
      if (this.icons[i]) {
        if (i == 0)
          return this.myOpportunitiesEmitter;
        return this.opportunitySearchEmitter;
      }
    }
    return this.opportunitySearchEmitter;
  }

  expand(number: any): void {
    let toggle;
    try {
      toggle = this.icons[number];
    }
    catch {
      toggle = false
    }

    this.icons = [false, false]
    if (!toggle) {
      this.expanded = true
      this.icons[number] = true
    }

  }

}
