import { AlertService } from './help/alert.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { DragDropDirective } from './help/drag-drop.directive';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ShorturlComponent } from './shorturl/shorturl.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { ApiService } from './help/api.service';
import { UploadService } from './help/upload.service';
import { UploadImageComponent } from './upload-image/upload-image.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    DragDropDirective,
    ShorturlComponent,
    QrcodeComponent,
    UploadImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    QRCodeModule,
    HttpClientModule
  ],
  exports: [
    ShorturlComponent,
    QrcodeComponent,
    UploadImageComponent
  ],
  providers: [
    { provide: 'API_URL', useValue: environment.apiUrl },
    ApiService,
    UploadService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
