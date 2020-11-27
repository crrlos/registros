import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalGuard } from '../principal.guard';
import { HomePage } from './home.page';
const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [PrincipalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
