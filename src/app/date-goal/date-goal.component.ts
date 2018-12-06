import { Component, OnInit } from '@angular/core';
import { GoalService } from '../services/goal.service';
import { Action } from '../models/Action.models';
import { RecapDay } from '../models/RecapDay.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-date-goal',
  templateUrl: './date-goal.component.html',
  styleUrls: ['./date-goal.component.css']
})
export class DateGoalComponent implements OnInit {
  recapDayForm: FormGroup;
  date: Date;
  day: number;
  actions: Action[] = [];
  actionsDone: any[] = [];
  dateToSave: string;
  done: boolean[] = [];
  isChecked: boolean = false;
  actionForADate = [];

  constructor(private goalService: GoalService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.recapDayForm = this.formBuilder.group( {
      done: [false, Validators.required],
    });
    
    // Get date for today
    this.date = new Date();
    this.day = this.date.getDay();
    this.dateToSave = this.date.getDate() + "-" + this.date.getMonth() + "-" + this.date.getFullYear();
    
    var actionDone = [];

      // Get actions in goals for the day
      this.goalService.getGoals().then(goals => {
        for (let id in goals) {
          for (let idAction in goals[id].actions) {
            this.getActionsForADate(goals[id].actions[idAction]);
          }        
          this.actions = this.actionForADate;
        }
        // Check if the day already exists in Firebase
        this.goalService.checkDayExists(this.dateToSave).then (res => {
        if (!res) {
          this.createNewRecapWithDoneFalse();
        } else { //If day exists in Firebase

          var doneArray = [];
          // Browse actions in recapDay
          this.goalService.getARecap(this.dateToSave).then(res => {
            for (let id in res) {
              actionDone.push(res[id]);
              doneArray.push(res[id].done);
            }
            this.done = doneArray;
            this.actionsDone = actionDone;

            var actionToCheck = "";
            // Check if actions exists in Recap
            var actionsGoal = this.actions;

            // Browse actions in goal
            for (let action in actionsGoal) {
              actionToCheck = actionsGoal[action][0];
              var find : boolean = false;
              // Browse action in recap
              for (let a in actionDone) {
                // Check if action in goal already exists in recap
                if (actionToCheck === actionDone[a].idAction) {
                  find = true;
                }
              }
              // If action doesn't exist in recap => add in recap
              if (find === false) {
                var recap = new RecapDay(null, actionsGoal[action][0], actionsGoal[action][1], false);
                this.goalService.createNewRecap(this.dateToSave, recap);
              }
            }
           });
        }
    });
  });
      
}

  createNewRecapWithDoneFalse() {
    for( let action in this.actions) {
      var recap = new RecapDay(null, this.actions[action][0], this.actions[action][1], false);
      this.goalService.createNewRecap(this.dateToSave, recap);
    }
    this.actionsDone = this.actions;
  }

  getActionsForADate(action: Action) {
    if (this.day === 1) {
      if (action.mon === true) {
        this.actionForADate.push([action.id, action.action]);
      }
    }
    if (this.day === 2) {
      if (action.tue === true) {
        this.actionForADate.push([action.id, action.action]);
      }
    }
    if (this.day === 3) {
      if (action.wed === true) {
        this.actionForADate.push([action.id, action.action]);
      }
    }
    if (this.day === 4) {
      if (action.thu === true) {
        this.actionForADate.push([action.id, action.action]);
      }
    }
    if (this.day === 5) {
      if (action.fri === true) {
        this.actionForADate.push([action.id, action.action]);
      }
    }
    if (this.day === 6) {
      if (action.sat === true) {
        this.actionForADate.push([action.id, action.action]);
      }
    }
    if (this.day === 0) {
      if (action.sun === true) {
        this.actionForADate.push([action.id, action.action]);
      }
    }

  }

  saveRecap(id:string, idAction: string, i:number) {
    var elements = (<HTMLInputElement[]><any>document.getElementsByName("done"));
    this.goalService.updateRecap(this.dateToSave, id, idAction, elements[i].checked).then (res => {
      console.log(res);
    });
  }
    
}


