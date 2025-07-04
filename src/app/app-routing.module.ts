import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// --- Page List --- //
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { RecentComponent } from './pages/recent/recent.component';

const routes: Routes = [  { path: '', redirectTo: 'order', pathMatch: 'full' },
  { path: 'order', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'history', component: RecentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
