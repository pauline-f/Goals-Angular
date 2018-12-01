import { Component, OnInit } from '@angular/core';
import { GoalService } from '../services/goal.service';
import { Action } from '../models/Action.models';
import { RecapDay } from '../models/RecapDay.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



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
  dateToSave: string;
  done: boolean[] = [];
  isChecked: boolean = false;
  

  constructor(private goalService: GoalService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.recapDayForm = this.formBuilder.group( {
      done: [false, Validators.required],
    });

    this.date = new Date();
    this.day = this.date.getDay();
    this.dateToSave = this.date.getDate() + "-" + this.date.getMonth() + "-" + this.date.getFullYear();
    console.log(this.dateToSave);

    var actionDone = [];
    var doneArray = [];

    this.goalService.getARecap(this.dateToSave).then(res => {
      for (let id in res) {
        actionDone.push(res[id].idAction);
        doneArray.push(res[id].done);
      }
      console.log(actionDone);
      console.log(doneArray);
      this.done = doneArray;
    });

    
    this.goalService.getGoals().then(goals => {
      var actionForADate = [];
      var nb = 0;
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
              for (let i in actionDone) {
                if (actionDone[i] === goals[id].actions[idAction].id) {
                  console.log(this.done[i]);
                  //this.done[i] = true;
                  //actionDone[i].checked = true;
                }
              }
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
        nb++;
      }        
      this.actions = actionForADate;
      this.goalService.checkDayExists(this.dateToSave).then (res => {
        console.log(res);
      });
        
      //this.createNewRecapWithDoneFalse();
    });
  }

  createNewRecapWithDoneFalse() {
    for( let action in this.actions) {
      console.log(this.actions[action].id);
      //var recap = new RecapDay(this.actions[action], false);
    }
  }

  clickCheckbox(i:number) {
    var elements = (<HTMLInputElement[]><any>document.getElementsByName("done"));
    console.log(elements);
    elements[i].checked = true;
  }

  saveRecap(idAction: string, i: number) {
    var elements = (<HTMLInputElement[]><any>document.getElementsByName("done"));
    console.log(elements.length);
    for (let element in elements) {
      console.log(idAction);
      console.log(elements[element].checked);
      
      var recap = new RecapDay(idAction, elements[element].checked);
      this.goalService.createNewRecap(this.dateToSave, recap);
    }
    
  }

}
