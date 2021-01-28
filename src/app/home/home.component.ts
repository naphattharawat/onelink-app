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

  selectedFile; //Resumable File Upload Variable
  name; //Resumable File Upload Variable
  uploadPercent; //Resumable File Upload Variable

  progress: any;
  // files: any = [];
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

  uploadFile(event) {
    this.selectedFile = event.target.files[0]; //User selected File
    this.name = this.selectedFile.name;
    console.log(this.selectedFile);
  }


  // uploadFile() {
  //   const files: { [key: string]: File } = this.file.nativeElement.files;
  //   for (let key in files) {
  //     if (!isNaN(parseInt(key))) {
  //       this.files.add(files[key]);
  //     }
  //   }
  //   console.log(this.files);
  // }

  // deleteAttachment(index) {
  //   this.files.splice(index, 1);
  // }
  onClickUpload() {
    //checks file id exists or not, checks on name and last modified
    let fileId = `${this.selectedFile.name}-${this.selectedFile.lastModified}`;
    let headers = new HttpHeaders({
      size: this.selectedFile.size.toString(),
      "x-file-id": fileId,
      name: this.name
    });

    //To know whether file exist or not before making upload
    this.http
      .get("http://localhost:3000/uploads", { headers: headers })
      .subscribe((res: any) => {
        console.log(JSON.stringify(res));
        if (res.status === "file is present") {
          alert("File already exists. Please choose a different file.");
          return;
        }
        let uploadedBytes = res.uploaded; //GET response how much file is uploaded
        let headers2 = new HttpHeaders({
          size: this.selectedFile.size.toString(),
          "x-file-id": fileId,
          "x-start-byte": uploadedBytes.toString(),
          name: this.name
        });
        // Useful for showing animation of Mat Spinner
        const req = new HttpRequest(
          "POST",
          "http://localhost:3000/upload",
          this.selectedFile.slice(uploadedBytes, this.selectedFile.size + 1),
          {
            headers: headers2,
            reportProgress: true //continously fetch data from server of how much file is uploaded
          }
        );
        this.http.request(req).subscribe(
          (res: any) => {
            if (res.type === HttpEventType.UploadProgress) {
              this.uploadPercent = Math.round((100 * res.loaded) / res.total);
              console.log(this.uploadPercent);
              if (this.uploadPercent >= 100) {
                this.name = "";
                this.selectedFile = null;
              }
            } else {
              console.log(JSON.stringify(res));
              if (this.uploadPercent >= 100) {
                this.name = "";
                this.selectedFile = null;
              }
            }
          },
          err => { }
        );
      });
  }

}
