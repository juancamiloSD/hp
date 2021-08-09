import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: '**', pathMatch: 'full', component: HomeComponent}

];
export const appRoutingProviders: any[] = [];
export const APP_ROUTING: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);