import { AlertService } from './../help/alert.service';
import { ApiService } from '../help/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shorturl',
  templateUrl: './shorturl.component.html',
  styleUrls: ['./shorturl.component.css']
})
export class ShorturlComponent implements OnInit {

  shortUrl = '';
  url = '';
  oldUrl = '';
  urlIOS = '';
  urlIOSIpad = '';
  urlAndroid = '';
  urlMicrosoft = '';
  isSave = false;
  constructor(
    private apiService: ApiService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  async onClickSave() {
    try {
      if (!this.url.includes('https://', 0) || !this.url.includes('http://', 0)) {
        this.url = 'http://' + this.url;
      }
      this.isSave = true;
      const data = [{
        type: 'WEB',
        url: this.url
      }];
      const rs: any = await this.apiService.saveShortUrl('URL', data);
      if (rs.ok) {
        this.shortUrl = rs.rows.url;
        this.oldUrl = this.url;
        this.url = '';
      }
      console.log(rs);
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

  onKey(e) {
    if (e.keyCode === 13) {
      this.onClickSave();
    }
  }
}
