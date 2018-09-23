import { Component } from '@angular/core';
import { NavController, BarcodeScannerOptions, BarcodeScanResult } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  result: BarcodeScanResult;
  userScord = <any>;
  userName = <any>;

  constructor(public navCtrl: NavController, private barcode: BarcodeScanner, private afDatabase: AngularFireDatabase
  , private afAuth: AngularFireAuth, public toast: ToastController) {
  }

  async scanQRcode(){
    try
    {
      const options: BarcodeScannerOptions ={
        prompt: 'Point your camera at a QR Code',
        torchOn: true
      }

      this.result = await this.barcode.scan(options);

      this.afDatabase.object('userProfile/' + data.uid + '/').snapshotChanges().subscribe(
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

        if(this.result == this.userName) //find the user
        {
          if(this.userScord > 8)//after eight times purchase, clear the score to zero
          {
            this.userScord = 0;
            //save the userScore to specific user base on the username
            let path= 'userProfile'+'/'+ this.userName;
            this.afDatabase.object(path).set(this.userScord);
          }
          else
          {
            this.userScord = this.userScord + 1;
            //save the userScore to specific user base on the username
            let path= 'userProfile'+'/'+ this.userName;
            this.afDatabase.object(path).set(this.userScord);
          }

        }

      this.toast.create({
        message: 'Success Scan user: '+ this.profileInfo.username + "!",
        duration: 3000
      }).present();
      });
    }

    }
    catch(error)
    {
      console.error(error);
    }
  }

}
