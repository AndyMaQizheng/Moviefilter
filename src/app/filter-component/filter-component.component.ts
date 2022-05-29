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

  // Event that fires when a checkbox is selected.
  checkChanged(event: any) {

    // TODO: Could probably improve performance by keeping one static list and adding and removing from it on check changed instead of looping each time.

    var requestedFilters: Set<string> = new Set<string>(); // New up an empty list of filters

    var table = this.filterTable.nativeElement as HTMLTableElement; // Get reference to table from ViewChild.

    if(table) { // If not null
      Array.from(table.rows).forEach((row) => { // Loop through rows
        var item = row.cells[1].firstChild as HTMLInputElement; // Cast the second column to an input element
        if(item && item.checked) { // If element not null and is checked, add value to filters list.
          requestedFilters.add(item.value);
        }
      });
    }

    this.filtersChanged.emit(requestedFilters); // Fire event, passing list of filters.
  }
}
