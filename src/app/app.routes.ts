import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobOfferFormComponent } from './components/job-offer-form/job-offer-form.component';
import { JobOfferListComponent } from './components/job-offer-list/job-offer-list.component';
import { JobOfferUpdateComponent } from './components/job-offer-update/job-offer-update.component';


export const routes: Routes = [

  { path: 'offer', component: JobOfferFormComponent },
  { path: '', component: JobOfferListComponent },
  {path: ':offer/:id', component: JobOfferUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
