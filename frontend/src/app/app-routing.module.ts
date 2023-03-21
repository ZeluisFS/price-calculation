import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'calculation',
    loadChildren: () => import('./calculation/calculation.module').then(m => m.CalculationModule)
  },
  {
    path: '',
    redirectTo: 'calculation',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'calculation'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
