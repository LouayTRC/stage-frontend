import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainAComponent } from './components/admin/main-a/main-a.component';
import { HomeComponent } from './components/client/home/home.component';
import { MenuComponent } from './components/admin/menu/menu.component';
import { CommandsComponent } from './components/client/commands/commands.component';
import { HomeAComponent } from './components/admin/home-a/home-a.component';
import { ProductsAComponent } from './components/admin/products-a/products-a.component';
import { CommandsAComponent } from './components/admin/commands-a/commands-a.component';
import { AddProductComponent } from './components/popups/add-product/add-product.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MenuCComponent } from './components/client/menu-c/menu-c.component';
import { MainComponent } from './components/client/main/main.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { UpdateProductComponent } from './components/popups/update-product/update-product.component';
import { PanierComponent } from './components/client/panier/panier.component';
import { ProductCardComponent } from './components/client/product-card/product-card.component';
import { ProductsComponent } from './components/client/products/products.component';
import { ProductDetailsComponent } from './components/client/product-details/product-details.component';
import { SavedComponent } from './components/client/saved/saved.component';
import { CommandDetailComponent } from './components/admin/command-detail/command-detail.component';
import { SaveProductComponent } from './components/popups/save-product/save-product.component';
import { SavedProductsComponent } from './components/client/saved-products/saved-products.component';
import { ErrorComponent } from './components/error/error.component';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import { environment } from 'environement';
@NgModule({
  declarations: [
    AppComponent,
    MainAComponent,
    HomeComponent,
    MenuComponent,
    CommandsComponent,
    HomeAComponent,
    ProductsAComponent,
    CommandsAComponent,
    AddProductComponent,
    MenuCComponent,
    MainComponent,
    SignupComponent,
    LoginComponent,
    UpdateProductComponent,
    PanierComponent,
    ProductCardComponent,
    ProductsComponent,
    ProductDetailsComponent,
    SavedComponent,
    CommandDetailComponent,
    SaveProductComponent,
    SavedProductsComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
