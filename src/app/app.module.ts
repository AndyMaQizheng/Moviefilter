import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule} from "@angular/material/table";
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilterComponentComponent } from './filter-component/filter-component.component';
import { LargeNumSuffixPipe } from './large-num-suffix.pipe';
import { AddSpacePipe } from './add-space.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponentComponent,
    LargeNumSuffixPipe,
    AddSpacePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatTooltipModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
