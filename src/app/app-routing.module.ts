import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [{ path: '', component: DashboardComponent }];

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppRoutingModule {}
