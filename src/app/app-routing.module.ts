import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasComponent } from './pages/canvas/canvas.component';
import { CardShoppingComponent } from './pages/card-shopping/card-shopping.component';

const routes: Routes = [
  { path: '', redirectTo: 'canvas', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'user-panel',
    loadChildren: () =>
      import('./pages/user-panel/user-panel.module').then(
        (m) => m.UserPanelModule
      ),
  },
  {
    path: 'canvas',
    component: CanvasComponent,
  },
  {
    path: 'card-shopping',
    component: CardShoppingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
