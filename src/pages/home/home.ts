import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner';

//import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  result: BarcodeScanResult;
  userScord: number;
  userName: any;

  constructor(private barcode: BarcodeScanner, private afDatabase: AngularFireDatabase
  , public toast: ToastController) {
  }

  async scanQRcode(){
    try
    {
      const options: BarcodeScannerOptions ={
        prompt: 'Point your camera at a QR Code',
        torchOn: true
      }

      this.result = await this.barcode.scan(options);

      this.afDatabase.object('userProfile/' + this.result.text + '/').snapshotChanges().subscribe(
      (action)=>{
        if(action.payload.val())
        {
          //console.log(action.payload.val().username);
          let user:any = action.payload.val();
          this.userScord = user.userScord;
          this.userName = user.username;
        }
        else
        {
          console.log("None Data");
        }
        });

        if(this.userScord => 8)//after eight times purchase, clear the score to zero
        {
          this.userScord = 0;
          //save the userScore to specific user base on the username
          let path= 'userProfile'+'/'+ this.result.text + '/userScord';
          this.afDatabase.object(path).set(this.userScord);
        }
        else
        {
          this.userScord = this.userScord + 1;
          //save the userScore to specific user base on the username
          let path= 'userProfile'+'/'+ this.result.text + '/userScord';
          this.afDatabase.object(path).set(this.userScord);
        }


        this.toast.create({
          message: 'Success Scan user: '+ this.userName + "!",
          duration: 3000
        }).present();


    }
    catch(error)
    {
      console.error(error);
    }
  }

}
