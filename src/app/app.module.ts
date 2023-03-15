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
import { TokenInterceptor } from './ingterceptors/token.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { AdminComponent } from './admin/admin.component';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabMenuModule } from 'primeng/tabmenu';
import { CalendarModule } from 'primeng/calendar';
import { GenerateVoucherComponent } from './modal/generate-voucher/generate-voucher.component';
import { UserDialogComponent } from './modal/user-dialog/user-dialog.component';
import { ProductDialogComponent } from './modal/product-dialog/product-dialog.component';
import { MyProductsComponent } from './modal/my-products/my-products.component';
import { BuyComponent } from './modal/buy/buy.component';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ShowVoucherComponent } from './modal/show-voucher/show-voucher.component';
import { FilterableTableComponent } from './modal/filterable-table/filterable-table.component';
import { HeaderComponent } from './header/header.component';
import { ReportComponent } from './report/report.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import {FileUploadModule} from 'primeng/fileupload';

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
    AdminComponent,
    GenerateVoucherComponent,
    UserDialogComponent,
    ProductDialogComponent,
    MyProductsComponent,
    BuyComponent,
    ShowVoucherComponent,
    FilterableTableComponent,
    HeaderComponent,
    ReportComponent,
    UploadFileComponent,
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
    ToastrModule.forRoot(),
    AccordionModule,
    ButtonModule,
    TooltipModule,
    DropdownModule,
    DialogModule,
    TableModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextModule,
    InputNumberModule,
    TabMenuModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    FileUploadModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
