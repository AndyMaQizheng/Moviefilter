import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.css']
})

export class FilterComponentComponent  {

  @Input() FilterItems: string[] = [];
  @Output() filtersChanged = new EventEmitter<Set<string>>(); 
  @ViewChild("filterTable") filterTable!: ElementRef;

  checkChanged(event: any) {

    var requestedFilters: Set<string> = new Set<string>();

    var table = this.filterTable.nativeElement as HTMLTableElement;

    if(table) {
      Array.from(table.rows).forEach((row) => {
        var item = row.cells[1].firstChild as HTMLInputElement;
        if(item && item.checked) {
          requestedFilters.add(item.value);
        }
      });
    }

    this.filtersChanged.emit(requestedFilters);
  }
}
