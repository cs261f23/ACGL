import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-student-sidebar',
  templateUrl: './student-sidebar.component.html',
  styleUrls: ['./student-sidebar.component.css']
})
export class StudentSidebarComponent {
  events: Array<string> = [];
  opened?: any = '';
  expanded: boolean = false;
  icons: Array<boolean> = [false, false]
  @Output() myOpportunitiesEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() opportunitySearchEmitter: EventEmitter<boolean> = new EventEmitter();
  emitters: Array<EventEmitter<boolean>> = [this.myOpportunitiesEmitter, this.opportunitySearchEmitter]

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
