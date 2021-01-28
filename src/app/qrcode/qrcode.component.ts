import { ApiService } from './../help/api.service';
import { UploadService } from './../help/upload.service';
import { AlertService } from './../help/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {

  shortUrl: any;
  url: any;
  urlIOS = '';
  urlIOSIpad = '';
  urlAndroid = '';
  urlMicrosoft = '';
  urlOld = '';
  isSave = false;
  constructor(
    private alertService: AlertService,
    private uploadService: UploadService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }
  async onClickSave() {
    try {
      let url = this.url;
      this.urlOld = this.url;
      if (!this.url.includes('https://', 0) || !this.url.includes('http://', 0)) {
        url = 'http://' + this.url;
      }
      this.isSave = true;
      const data = [{
        type: 'WEB',
        url
      }];
      if (this.urlIOS.length) {
        data.push({ type: 'IOS', url: this.urlIOS });
      }
      if (this.urlIOSIpad.length) {
        data.push({ type: 'IOS_IPAD', url: this.urlIOSIpad });
      }
      if (this.urlAndroid.length) {
        data.push({ type: 'ANDROID', url: this.urlAndroid });
      }
      if (this.urlMicrosoft.length) {
        data.push({ type: 'MICROSOFT_STORE', url: this.urlMicrosoft });
      }
      const rs: any = await this.apiService.saveShortUrl('QRCODE', data);
      if (rs.ok) {
        this.shortUrl = rs.rows.url;
      }
      this.onClear();
      this.isSave = false;
    } catch (error) {
      this.isSave = false;
      this.alertService.error(error);
    }
  }

  onClickCopy() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.shortUrl;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.alertService.alert('คัดลอกเรียบร้อย');
  }

  onClear() {
    this.url = '';
    this.urlIOS = '';
    this.urlIOSIpad = '';
    this.urlAndroid = '';
    this.urlMicrosoft = '';
  }
  onKey(e) {
    console.log(e.keyCode);

    if (e.keyCode === 13) {
      this.onClickSave();
    }
  }

}
