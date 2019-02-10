import { FormsModule } from '@angular/forms';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { UserService } from './user.service';
import { AuthServiceService } from './auth-service.service';
import { AuthGuardService } from './auth-guard.service';
import { environment } from './../environments/environment';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrdSuccessComponent } from './ord-success/ord-success.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular5-data-table';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrdSuccessComponent,
    MyOrderComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    DataTableModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CustomFormsModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component:ProductsComponent},
      {path: 'login',component:LoginComponent},
      {path:'products',component:ProductsComponent,canActivate:[AuthGuardService,AdminAuthGuardService]},
      {path:'shopping-cart',component:ShoppingCartComponent},
      {path:'check-out',component:CheckOutComponent, canActivate:[AuthGuardService]},
      {path:'my/orders',component:MyOrderComponent, canActivate:[AuthGuardService]},
      {path:'order-success',component:OrdSuccessComponent, canActivate:[AuthGuardService]},
      {path:'admin/products/new',component:ProductFormComponent, canActivate:[AuthGuardService,AdminAuthGuardService]},
      {path:'admin/products/:id',component:ProductFormComponent, canActivate:[AuthGuardService,AdminAuthGuardService]},
      {path:'admin/orders',component:AdminOrdersComponent, canActivate:[AuthGuardService,AdminAuthGuardService]},
      {path:'admin/products',component:AdminProductsComponent, canActivate:[AuthGuardService,AdminAuthGuardService]}
    ])
  ],
  providers: [
    AuthGuardService,
    AuthServiceService,
    UserService,
    AdminAuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
