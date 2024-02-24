import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './components/product/product.component';
import { MaterialModule } from 'src/material.module';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { AddSuperTagComponent } from './components/add-super-tag/add-super-tag.component';
import { AddTagComponent } from './components/add-tag/add-tag.component';
import { UpdateProductsTagComponent } from './components/update-products-tag/update-products-tag.component';
import { AddEntryVoucherComponent } from './components/add-entry-voucher/add-entry-voucher.component';
import { DisplayEntryVoouchersComponent } from './components/display-entry-voouchers/display-entry-voouchers.component';
import { AddAnotherProductConfDialogueComponent } from './components/add-another-product-conf-dialogue/add-another-product-conf-dialogue.component';
import { PositiveIntegerDirective } from './custom_directives/PositiveIntegerDirective';
import { DisplayReleaseFormsComponent } from './components/display-release-forms/display-release-forms.component';
import { AddReleaseFormComponent } from './components/add-release-form/add-release-form.component';
import { ExitVoucherComponent } from './components/exit-voucher/exit-voucher.component';
import { DisplaySuperTagsComponent } from './components/display-super-tags/display-super-tags.component';
import { DisplayTagsComponent } from './components/display-tags/display-tags.component';
import { DisplayProductsComponent } from './components/display-products/display-products.component';
import { DisplayTagsHistoryComponent } from './components/display-tags-history/display-tags-history.component';
import { DisplayProductsHistoryComponent } from './components/display-products-history/display-products-history.component';
import { InventaireComponent } from './components/inventaire/inventaire.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ExitVoucherListComponent } from './components/exit-voucher-list/exit-voucher-list.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8890',
        realm: 'gestion_bien',
        clientId: 'gestion_bien_client'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    SingleProductComponent,
    AddProductComponent,
    ConfirmationDialogComponent,
    AddSuperTagComponent,
    AddTagComponent,
    UpdateProductsTagComponent,
    AddEntryVoucherComponent,
    DisplayEntryVoouchersComponent,
    AddAnotherProductConfDialogueComponent,
    PositiveIntegerDirective,
    DisplayReleaseFormsComponent,
    AddReleaseFormComponent,
    ExitVoucherComponent,
    DisplaySuperTagsComponent,
    DisplayTagsComponent,
    DisplayProductsComponent,
    DisplayTagsHistoryComponent,
    DisplayProductsHistoryComponent,
    InventaireComponent,
    ExitVoucherListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatStepperModule,
    KeycloakAngularModule

  ],
  providers: [DatePipe,{
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
