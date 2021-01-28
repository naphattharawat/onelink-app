import { AlertService } from './../help/alert.service';
import { UploadService } from './../help/upload.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  selectedFile; //Resumable File Upload Variable
  name; //Resumable File Upload Variable
  uploadPercent; //Resumable File Upload Variable
  progress: any;
  url: any;
  isFile = false;
  isSave = false;
  // files: any;
  @ViewChild('fileInput', { static: false }) file;
  public files: Set<File> = new Set();
  constructor(
    private http: HttpClient,
    private uploadService: UploadService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  // uploadFile(event) {
  //   console.log(event);
  //   this.selectedFile = event.target.files[0]; //User selected File
  //   this.name = this.selectedFile.name;
  //   console.log(this.selectedFile);
  // }


  uploadFile(e) {
    try {
      console.log(e);
      
      this.isFile = true;
      const files: { [key: string]: File } = this.file.nativeElement.files;
      // this.files = files;
      this.selectedFile = files[0];
      this.name = this.selectedFile.name;
      if (this.files.size > 0) {
        this.files.clear();
      }
      this.files.add(files[0]);
    } catch (error) {
      console.log(error);
      this.isFile = false;

    }
  }

  deleteAttachment() {
    this.isFile = false;
    this.files.clear();
  }

  onClickCopy(val) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.alertService.alert('คัดลอกเรียบร้อย');
  }


  async onClickUpload() {
    try {
      this.isSave = true;
      const rs: any = await this.uploadService.upload2(this.selectedFile, this.name);
      console.log(rs);

      if (rs.ok) {
        this.url = rs.rows;
        this.deleteAttachment();
        this.alertService.alert('อัพโหลดเรียบร้อย');
      }
      this.isSave = false;
    } catch (error) {
      this.isSave = false;
      console.log(error);

    }
  }
}
