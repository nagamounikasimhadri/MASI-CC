import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Home } from './home/home';
import { Registrations } from './registrations/registrations';
export const routes: Routes = [{
    path:'', component:Home},
    {path:'register', component:Register},
    {path: 'registrations', component: Registrations}
];
