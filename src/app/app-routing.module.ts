import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const routes: Routes = [
  {path: 'mainPage', component: MainPageComponent},
  {path: '', redirectTo: '/mainPage', pathMatch: 'full'},
  {path: '**', component: NotFoundPageComponent} // NotFound page needs to be last in routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
