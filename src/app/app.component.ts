import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

declare const firebase: any;
declare const currentUser : any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  user = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router : Router
  ) {

    this.initializeApp();


  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.revisarAuth();
    });
  }

  revisarAuth(){

    console.log(currentUser);
    let thisContext = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.user = true;
       thisContext.router.navigate(['/home']);
       
       console.log(this.user);
      } else {
        // No user is signed in.
      }
    });
  }

}
