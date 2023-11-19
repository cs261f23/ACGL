import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-partner-sidebar',
  templateUrl: './partner-sidebar.component.html',
  styleUrls: ['./partner-sidebar.component.css']
})
export class PartnerSidebarComponent {
  events: Array<string> = [];
  expanded: boolean = false;
  @Output() myOpportunitiesEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() opportunityCreateEmitter: EventEmitter<boolean> = new EventEmitter();
  emitters: Array<EventEmitter<boolean>> = [this.myOpportunitiesEmitter, this.opportunityCreateEmitter]
  innerSection: string = "";

  emitChooser(id: number): EventEmitter<boolean> {
    return this.emitters[id]
  }

  expand(clear: number = 0): void {
    this.expanded = !this.expanded
    if (clear) {
      this.expanded = false
    }

  }


}

