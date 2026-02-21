import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.component') },
  // The translate-blog component will be imported when it exists. For now, it's just a placeholder route to satisfy the tests and router linking
  // { path: 'translate-blog', component: TranslationComponent },
  { path: '**', redirectTo: 'home' }
];
