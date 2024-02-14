import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/client/home/home.component';
import { MainAComponent } from './components/admin/main-a/main-a.component';
import { HomeAComponent } from './components/admin/home-a/home-a.component';
import { ProductsAComponent } from './components/admin/products-a/products-a.component';
import { CommandsAComponent } from './components/admin/commands-a/commands-a.component';
import { MainComponent } from './components/client/main/main.component';
import { PanierComponent } from './components/client/panier/panier.component';
import { ProductsComponent } from './components/client/products/products.component';
import { ProductDetailsComponent } from './components/client/product-details/product-details.component';
import { SavedComponent } from './components/client/saved/saved.component';
import { CommandsComponent } from './components/client/commands/commands.component';
import { CommandDetailComponent } from './components/admin/command-detail/command-detail.component';
import { SavedProductsComponent } from './components/client/saved-products/saved-products.component';
import { clientGuard } from './guard/client.guard';
import { adminGuard } from './guard/admin.guard';
import { ErrorComponent } from './components/error/error.component';


const routes: Routes = [
  {path:'client',component:MainComponent,children:[
    {path:'home',title:'home',component:HomeComponent},
    {path:'products',title:'products',component:ProductsComponent},
    {path:'products/:id',title:'product details',component:ProductDetailsComponent},
    {path:'commands',title:'Commands',component:CommandsComponent,canActivate:[clientGuard]},
    {path:'saved',title:'Playlists',component:SavedComponent,canActivate:[clientGuard]},
    {path:'saved/:id',title:'saved Products',component:SavedProductsComponent,canActivate:[clientGuard]},
    {path:'panier',title:'panier',component:PanierComponent},
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'**',title:'Error',component:ErrorComponent}
  ]},
  
  
  {path:'dashboard',component:MainAComponent,children:[
    {path:'home',title:'home',component:HomeAComponent},
    {path:'products',title:'products',component:ProductsAComponent},
    {path:'commands',title:'commands',component:CommandsAComponent},
    {path:'commands/:id',title:'command detail',component:CommandDetailComponent},
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'**',title:'Error',component:ErrorComponent}
  ],canActivate:[adminGuard]},

  {path:'',redirectTo:'client',pathMatch:'full'},
  {path:'**',title:'Error',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
