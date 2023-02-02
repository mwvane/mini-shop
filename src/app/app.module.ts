import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { ForgetPasswordComponent } from './Auth/forget-password/forget-password.component';
import { HomeComponent } from './home/home.component';
import { ItemComponent } from './item/item.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QuantitySelectorComponent } from './quantity-selector/quantity-selector.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { EditItemComponent } from './edit-or-create-item/edit-or-create-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { YesNoComponent } from './dialogs/yes-no/yes-no.component';
import { TokenInterceptor } from './ingterceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent,
    HomeComponent,
    ItemComponent,
    QuantitySelectorComponent,
    CartItemComponent,
    EditItemComponent,
    YesNoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
