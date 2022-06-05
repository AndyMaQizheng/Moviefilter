import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

// Set location of items component will use.
@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.css']
})

export class FilterComponentComponent  {

  // Define inputs that the componet will use.
  @Input() FilterItems: string[] = []; // The list of items to display in the component.
  @Input() DataColumnName: string = ""; // The name of the column to display in the component.

  // Define output.
  @Output() filtersChanged = new EventEmitter<Set<string>>(); // Event that fires when a checkbox is selected. Listened for on the parent.

  @ViewChild("filterTable") filterTable!: ElementRef; // A reference to the table that we can loop through.

  currentFilters: Set<string> = new Set<string>();

  toggleItem(item: string) {
    if(this.currentFilters.has(item)) {
      this.currentFilters.delete(item);
    }
    else {
      this.currentFilters.add(item);
    }

    this.filtersChanged.emit(this.currentFilters);
  }
}
