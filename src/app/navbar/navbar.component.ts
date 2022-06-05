import { Component, Input, OnInit } from '@angular/core';
import { MainPageComponent } from '../main-page/main-page.component';
import { FilterComponentComponent } from '../filter-component/filter-component.component';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() MainPageComponent: MainPageComponent | undefined;
  @Input() FilterComponentComponent: FilterComponentComponent | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
