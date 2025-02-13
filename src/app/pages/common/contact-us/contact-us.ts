import { Component, OnInit } from '@angular/core'
import {  NavController } from '@ionic/angular'
import { CallNumber } from '@ionic-native/call-number/ngx'
import { EmailComposer } from '@ionic-native/email-composer/ngx'
import { ComingSoonPage } from '../coming-soon/coming-soon'

/**
 * Generated class for the ContactUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
  styleUrls:['contact-us.scss']
})
export class ContactUsPage implements OnInit {
  bypassAppChooser: boolean = false
  constructor(
    public navCtrl: NavController,
    private emailComposer: EmailComposer,
    private callNumber: CallNumber
  ) {}

  ngOnInit() {
    console.log('ngOnInit ContactUsPage')
  }

  async gotoYouTube() {
    // this.navCtrl.push(ComingSoonPage)
    // await this.navCtrl.navigateForward('ComingSoonPage')
    window.open('https://www.youtube.com/@UJustbeUniverse', '_system'); 
  }
  async gotoFacebook() {
    // this.navCtrl.push(ComingSoonPage)
    // await this.navCtrl.navigateForward('ComingSoonPage')
    window.open('https://www.facebook.com/UJustBeUniverse1/', '_system'); 
  }
  async gotoInstagram() {
    // this.navCtrl.push(ComingSoonPage)
    // await this.navCtrl.navigateForward('ComingSoonPage')
    window.open('https://www.instagram.com/ujustbeuniverse/', '_system'); 
  }

  openUrl(){ window.open('https://www.youtube.com/embed/kEU9q1LOcI0', '_system'); }

  gotoKeypad(val) {
    this.callNumber
      .callNumber(val, this.bypassAppChooser)
      .then((res: any) => console.log('Launched dialer!', res))
      .catch((err) => console.log('Error launching dialer', err))
  }
  openEmailComposer(val) {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        //Now we know we can send
        console.log('open composer')
      }
    })
    let email = {
      to: val,
    }

    // Send a text message using default options
    this.emailComposer.open(email)
  }
}
