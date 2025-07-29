import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'inventory',
    loadComponent: () => import('./features/inventory/inventory/inventory').then(m => m.Inventory)
  },
  { path: '', redirectTo: 'inventory', pathMatch: 'full' }
];
