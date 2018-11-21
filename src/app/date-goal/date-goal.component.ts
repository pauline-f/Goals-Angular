import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-goal',
  templateUrl: './date-goal.component.html',
  styleUrls: ['./date-goal.component.css']
})
export class DateGoalComponent implements OnInit {
  date: Date;
  constructor() { }

  ngOnInit() {
    this.date = new Date;
  }

}
