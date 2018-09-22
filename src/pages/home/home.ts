import { Component } from '@angular/core';
import { NavController, BarcodeScannerOptions, BarcodeScanResult } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  result: BarcodeScanResult;

  constructor(public navCtrl: NavController, private barcode: BarcodeScanner) {
  }

  async scanQRcode(){
    try
    {
      const options: BarcodeScannerOptions ={
        prompt: 'Point your camera at a QR Code',
        torchOn: true
      }

      this.result = await this.barcode.scan(options);
    }
    catch(error)
    {
      console.error(error);
    }
  }

}
