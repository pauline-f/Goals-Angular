import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor() {
    var config = {
      apiKey: "AIzaSyDHtF3ErWo01MOoBDHf68DbHIt6vVonx98",
      authDomain: "goal-8e283.firebaseapp.com",
      databaseURL: "https://goal-8e283.firebaseio.com",
      projectId: "goal-8e283",
      storageBucket: "goal-8e283.appspot.com",
      messagingSenderId: "895785718127"
    };
    firebase.initializeApp(config);
  }
}
