import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'moveitmoveit';
  data = [];

  constructor(
    private _http: HttpClient
  ) {}

  ngOnInit() {

  }

  moveItMoveIt(input, orientation) {
    const min = 0;
    const max = 45;
    const random =
    Math.floor(Math.random() * (+max - +min)) + +min;
    console.log(random);
    const ori = orientation === 'v' ? 'vertical' : 'horizontal';
    // console.log(orientation);
    const locationH = 'http://10.32.13.163:8081/camcontrol/vertical?degrees=' + random;
    const locationV = 'http://10.32.13.163:8081/camcontrol/horizontal?degrees=' + random;
    this._http.post(locationH, '').pipe(res => res).subscribe(data => {
      console.log('ok');
    });

    setTimeout(() => {
      this._http.post(locationV, '').pipe(res => res).subscribe(data => {
        console.log('ok');
      });
    }, 500);
  }
}
