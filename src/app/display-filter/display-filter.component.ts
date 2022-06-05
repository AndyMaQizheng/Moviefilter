import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';


@Component({
  selector: 'app-display-filter',
  templateUrl: './display-filter.component.html',
  styleUrls: ['./display-filter.component.css']
})
export class DisplayFilterComponent implements OnInit {

  filters: string[] =  [];
  @Output() filtersChanged = new EventEmitter<Set<string>>();

  onItemsChanged(filters: Map<string, Set<string>>) {
    this.filters = [];

    for (const x of filters.values()) {
      x.forEach(element => {
        this.filters.push(element);
      });      
    }
  }

      // Delete the filter by clicking the X
  onDelete() {

  }

  constructor() { }

  ngOnInit(): void {
  }
}
