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

    // Check if the day already exists in Firebase
    this.goalService.checkDayExists(this.dateToSave).then (res => {
      if (!res) { //If day doesn't exist in Firebase
        this.createNewRecapWithDoneFalse();
      } else { //If day exists
        var doneArray = [];
        this.goalService.getARecap(this.dateToSave).then(res => {
          for (let id in res) {
            actionDone.push(res[id].idAction);
            doneArray.push(res[id].done);
          }
          
          this.done = doneArray;
        });
        



        var actionForADate = [];
        this.goalService.getGoals().then(goals => {
          
          for (let id in goals) {
            
            for (let idAction in goals[id].actions) {
              if (this.day === 1) {
                if (goals[id].actions[idAction].mon === true) {
                  actionForADate.push(goals[id].actions[idAction]);
                  for (let i in actionDone) {
                    if (actionDone[i] === goals[id].actions[idAction].id) {
                      console.log(this.done[i]);
                      this.done[i];
                      //this.done[i] = true;
                      //actionDone[i].checked = true;
                    }
                  }
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
              if (this.day === 0) {
                if (goals[id].actions[idAction].sun === true) {
                  actionForADate.push(goals[id].actions[idAction]);
                }
              }
            }
          }        
          this.actions = actionForADate;
          this.actionsDone = actionDone;
          
          
          var actionToCheck = "";
          // Check if actions exists in Recap
          for (let action in this.actions) {
            actionToCheck = this.actions[action].id;
            
            var find : boolean = false;
            for (let a in this.actionsDone) {
              if (actionToCheck === this.actionsDone[a]) {
                find = true;
              }
            }
            if (find === false) {
              console.log("Find === false");
              var recap = new RecapDay(this.actions[action].id, false);
              this.goalService.createNewRecap(this.dateToSave, recap);
            }
          }
          
        });


      }
    });

  }

  

  createNewRecapWithDoneFalse() {
    for( let action in this.actions) {
      console.log(this.actions[action].id);
      var recap = new RecapDay(this.actions[action].id, false);
      this.goalService.createNewRecap(this.dateToSave, recap);
    }
  }

  clickCheckbox(i:number) {
    var elements = (<HTMLInputElement[]><any>document.getElementsByName("done"));
    console.log(elements);
    elements[i].checked = true;
  }

  saveRecap(idAction: string, i: number) {
    this.goalService.checkActionExistsForADay(this.dateToSave, idAction).then (res => {
      console.log(res);
    });


    //var elements = (<HTMLInputElement[]><any>document.getElementsByName("done"));
    //console.log(elements.length);
    //for (let element in elements) {
    //  console.log(idAction);
    //  console.log(elements[element].checked);
      
    //  var recap = new RecapDay(idAction, elements[element].checked);
    //  this.goalService.createNewRecap(this.dateToSave, recap);
    }
    
}


