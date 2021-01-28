import { UploadService } from '../help/upload.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  shortUrl: any;
  url: any;

  urlIOS = '';
  urlIOSIpad = '';
  urlAndroid = '';
  urlMicrosoft = '';

  // @ViewChild('fileInput', { static: false }) file;
  // public files: Set<File> = new Set();


  constructor(
    private uploadService: UploadService,
    private http: HttpClient
  ) {
  }
  ngOnInit() {
  }

  // uploadFile(event) {
  //   // tslint:disable-next-line:prefer-for-of
  //   for (let index = 0; index < event.length; index++) {
  //     const element = event[index];
  //     this.files.push(element.name);
  //   }
  //   console.log(this.files);

  // }


}
