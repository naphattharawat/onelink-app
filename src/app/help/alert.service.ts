import { Injectable, HostListener } from '@angular/core';

import { default as swal } from 'sweetalert2';

@Injectable()
export class AlertService {

  btn: boolean;
  constructor() { }

  error(text: any = 'เกิดข้อผิดพลาด', title: any = '') {

    const option: any = {
      title,
      text,
      type: 'error',
      confirmButtonText: 'ตกลง'
    };
    swal.fire(option);

  }

  alert(title = 'ดำเนินการเสร็จเรียบร้อย', text = '') {
    const Toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer);
        toast.addEventListener('mouseleave', swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'success',
      title
    });
  }

  success(title = 'ดำเนินการเสร็จเรียบร้อย', text = '') {

    const option: any = {
      title,
      text,
      timer: 3000,
      type: 'success',
      confirmButtonText: 'ตกลง'
    };
    swal.fire(option);

  }

  serverError() {

    const option: any = {
      title: 'เกิดข้อผิดพลาด',
      text: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์',
      type: 'error',
      confirmButtonText: 'ตกลง'
    };
    swal.fire(option);

  }

  async confirm(text = 'คุณต้องการดำเนินการนี้ ใช่หรือไม่?',) {
    const option: any = {
      title: '',
      text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ดำเนินการ!',
      cancelButtonText: 'ยกเลิก'
    };

    return swal.fire(option).then((result) => {
      if (result.value) {
        return true;
      } else {
        return false;
      }
    });
  }

  async deleted(text = 'คุณต้องการลบ ใช่หรือไม่?') {

    const option: any = {
      title: '',
      text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ดำเนินการ!',
      cancelButtonText: 'ยกเลิก'
    };

    return swal.fire(option).then((result) => {
      if (result.value) {
        return true;
      } else {
        return false;
      }
    });
  }
}
