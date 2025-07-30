import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard/dashboard')
      .then(m => m.Dashboard)
  },
  {
    path: 'inventory',
    loadComponent: () => import('./features/inventory/inventory/inventory')
      .then(m => m.Inventory)
  },
  {
    path: 'crm',
    loadComponent: () => import('./features/crm/crm/crm')
      .then(m => m.Crm)
  },
  {
    path: 'finance',
    loadComponent: () => import('./features/finance/finance/finance')
      .then(m => m.Finance)
  },
  {
    path: 'hr',
    loadComponent: () => import('./features/hr/hr/hr')
      .then(m => m.Hr)
  },
  {
    path: 'reports',
    loadComponent: () => import('./features/reports/reports/reports')
      .then(m => m.Reports)
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
