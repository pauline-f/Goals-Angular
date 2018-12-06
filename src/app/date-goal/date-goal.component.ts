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

    var actionForADate = [];
      this.goalService.getGoals().then(goals => {
        
        for (let id in goals) {
          
          for (let idAction in goals[id].actions) {
            
            if (this.day === 1) {
              if (goals[id].actions[idAction].mon === true) {
                var value = [goals[id].actions[idAction].id, goals[id].actions[idAction].action];
                actionForADate.push(value);
                for (let i in actionDone) {
                  if (actionDone[i] === goals[id].actions[idAction].id) {
                //    console.log(this.done[i]);
                    this.done[i];
                    //this.done[i] = true;
                    //actionDone[i].checked = true;
                  }
                }
              }
            }
            if (this.day === 2) {
              if (goals[id].actions[idAction].tue === true) {
                actionForADate.push([goals[id].actions[idAction].id, goals[id].actions[idAction].action]);
                for (let i in actionDone) {
                  if (actionDone[i] === goals[id].actions[idAction].id) {
                    //console.log(this.done[i]);
                    this.done[i];
                    //this.done[i] = true;
                    //actionDone[i].checked = true;
                  }
                }
              }
            }
            if (this.day === 3) {
              if (goals[id].actions[idAction].wed === true) {
                actionForADate.push([goals[id].actions[idAction].id, goals[id].actions[idAction].action]);
                //for (let i in actionDone) {
                //  if (actionDone[i] === goals[id].actions[idAction].id) {
                //    console.log(this.done[i]);
                //    this.done[i];
                //  }
                //}
              }
            }
            if (this.day === 4) {
              if (goals[id].actions[idAction].thu === true) {
                actionForADate.push([goals[id].actions[idAction].id, goals[id].actions[idAction].action]);
              }
            }
            if (this.day === 5) {
              if (goals[id].actions[idAction].fri === true) {
                actionForADate.push([goals[id].actions[idAction].id, goals[id].actions[idAction].action]);
              }
            }
            if (this.day === 6) {
              if (goals[id].actions[idAction].sat === true) {
                actionForADate.push([goals[id].actions[idAction].id, goals[id].actions[idAction].action]);
              }
            }
            if (this.day === 0) {
              if (goals[id].actions[idAction].sun === true) {
                actionForADate.push([goals[id].actions[idAction].id, goals[id].actions[idAction].action]);
              }
            }
          }
        }        
        this.actions = actionForADate;

        console.log(this.actions);



      // Check if the day already exists in Firebase
      this.goalService.checkDayExists(this.dateToSave).then (res => {
      if (!res) {
        this.createNewRecapWithDoneFalse();
      } 
      
      if (res) { //If day exists in Firebase
        var doneArray = [];
        // Get actions in recapDay
        this.goalService.getARecap(this.dateToSave).then(res => {
          for (let id in res) {
            actionDone.push(res[id]);
            doneArray.push(res[id].done);
          }
          this.done = doneArray;
          this.actionsDone = actionDone;

          console.log(actionDone);

        var actionToCheck = "";
        // Check if actions exists in Recap
        var actionsGoal = this.actions;
        //console.log(actionsGoal);

        for (let action in actionsGoal) {
          console.log("parcours goals");
          //console.log(action);
          //console.log(actionsGoal[action]);
          actionToCheck = actionsGoal[action][0];
          console.log(actionToCheck);
          var find : boolean = false;

          for (let a in actionDone) {
            if (actionToCheck === actionDone[a].idAction) {
              find = true;
            }
          }
          console.log(find);
          if (find === false) {
            var recap = new RecapDay(null, actionsGoal[action][0], actionsGoal[action][1], false);
            console.log(recap);
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
      //this.actionsDone.push(this.actions[action].id);
      //console.log(this.actions[action]);
      var recap = new RecapDay(null, this.actions[action][0], this.actions[action][1], false);
      this.goalService.createNewRecap(this.dateToSave, recap);
    }
    this.actionsDone = this.actions;
  }

  clickCheckbox(i:number) {
    var elements = (<HTMLInputElement[]><any>document.getElementsByName("done"));
    //console.log(elements);
    elements[i].checked = true;
  }

  saveRecap(id:string, idAction: string, i:number) {
    var elements = (<HTMLInputElement[]><any>document.getElementsByName("done"));
    //for (let element in elements) {
      //console.log(idAction);
      //console.log(elements[i].checked);
      
      //var recap = new RecapDay(idAction, elements[i].checked);
      this.goalService.updateRecap(this.dateToSave, id, idAction, elements[i].checked).then (res => {
        //console.log(res);
      });


    //var elements = (<HTMLInputElement[]><any>document.getElementsByName("done"));
    //console.log(elements.length);
    //for (let element in elements) {
    //  console.log(idAction);
    //  console.log(elements[element].checked);
      
    //  var recap = new RecapDay(idAction, elements[element].checked);
    //  this.goalService.createNewRecap(this.dateToSave, recap);
    //}
  }
    
}


