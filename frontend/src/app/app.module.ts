import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { SavingsComponent } from './savings/savings.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { InterestComponent } from './interest/interest.component';
import { ReportComponent } from './report/report.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { ProfileService } from './services/profile.service'; // เพิ่มการ import ProfileService
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ProfileComponent,
    SavingsComponent,
    DepositComponent,
    WithdrawComponent,
    InterestComponent,
    ReportComponent,
    TransactionHistoryComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ComplaintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(withFetch()), // For server-side rendering
    provideClientHydration() // For client-side hydration
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
