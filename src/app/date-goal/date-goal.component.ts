import { Component, OnInit } from '@angular/core';
import { GoalService } from '../services/goal.service';
import { Action } from '../models/Action.models';

@Component({
  selector: 'app-date-goal',
  templateUrl: './date-goal.component.html',
  styleUrls: ['./date-goal.component.css']
})
export class DateGoalComponent implements OnInit {
  date: Date;
  day: number;
  actions: Action[] = [];

  constructor(private goalService: GoalService) { }

  ngOnInit() {
    this.date = new Date;
    this.day = this.date.getDay();
    
    this.goalService.getGoals().then(goals => {
      var actionForADate = [];
      for (let id in goals) {
        
        for (let idAction in goals[id].actions) {
          if (this.day === 1) {
            if (goals[id].actions[idAction].mon === true) {
              actionForADate.push(goals[id].actions[idAction]);
            }
          }
          if (this.day === 2) {
            if (goals[id].actions[idAction].tue === true) {
              actionForADate.push(goals[id].actions[idAction]);
            }
          }
          if (this.day === 3) {
            if (goals[id].actions[idAction].wed === true) {
              actionForADate.push(goals[id].actions[idAction]);
            }
          }
          if (this.day === 4) {
            if (goals[id].actions[idAction].thu === true) {
              actionForADate.push(goals[id].actions[idAction]);
            }
          }
          if (this.day === 5) {
            if (goals[id].actions[idAction].fri === true) {
              actionForADate.push(goals[id].actions[idAction]);
            }
          }
          if (this.day === 6) {
            if (goals[id].actions[idAction].sat === true) {
              actionForADate.push(goals[id].actions[idAction]);
            }
          }
          if (this.day === 7) {
            if (goals[id].actions[idAction].sun === true) {
              actionForADate.push(goals[id].actions[idAction]);
            }
          }
        }
      }        
      this.actions = actionForADate;
    });
  }

}
