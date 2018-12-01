import { Injectable } from '@angular/core';
import { Goal } from '../models/Goal.model';
import * as firebase from 'firebase';
import { AuthGuardService } from '../services/auth-guard.service';
import { Action } from '../models/Action.models';
import { RecapDay } from '../models/RecapDay.models';

@Injectable()
export class GoalService {

  

  constructor(private authGuardService: AuthGuardService) { }

  getUserUid() {
    return this.authGuardService.getUid();
  }

  getGoals() {
    return new Promise<Goal[]>(
      (resolve, reject) => {
        firebase.database().ref('goal/' + this.getUserUid()).once('value', (data) => {
            resolve(data.val());
          }, () => {
            resolve([]);
          }
        );
      }
    );
  }

  getActions(idGoal: string) {
    return new Promise<Action[]>(
      (resolve, reject) => {
        firebase.database().ref('goal/' + this.getUserUid() + '/' + idGoal + '/' + 'actions').once('value', (data) => {
            resolve(data.val());
          }, () => {
            resolve([]);
          }
        );
      }
    );
  }

  getAGoal(id:string) {
    return new Promise<Goal>(
      (resolve, reject) => {
        firebase.database().ref('goal/' + this.getUserUid() + "/" + id).once('value').then (
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }


  createNewGoal(newGoal:Goal) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('goal/' + this.getUserUid()).push(newGoal).then (
          (data) => {
            resolve(data.key);
            //Update id with the firebase value
            var newGoalKey = data.key;
            var goal = {id: newGoalKey};
            return firebase.database().ref('goal/' + this.getUserUid() + '/' + newGoalKey).update(goal);
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewAction(newAction:Action, idGoal:string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('goal/' + this.getUserUid() + '/' + idGoal + '/' + 'actions').push(newAction).then (
          (data) => {
            resolve(data.key);
            //Update id with the firebase value
            var newActionKey = data.key;
            var action = {id: newActionKey};
            return firebase.database().ref('goal/' + this.getUserUid() + '/' + idGoal + '/' + 'actions' + '/' + newActionKey).update(action);
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  checkDayExists(day:string) {
    return new Promise(
      (resolve, reject) => {
        //firebase.database().ref('recapDay/' + this.getUserUid() + '/' + day).on("value", function(snapshot) {
        firebase.database().ref('recapDay/' + this.getUserUid() + '/' + day).once("value").then (
          function(snapshot) {
          //(snapshot) => {
            resolve(snapshot.exists());
          }, (error) => {
            reject(error);
          }
        );
      });
  }

  createNewRecap(day:string, newRecap:RecapDay) {
    return new Promise(
      (resolve, reject) => {
        //Search if the date already exists
        //firebase.database().ref('recapDay/' + this.getUserUid()).child('recapDay/' + this.getUserUid()).equalTo(day).on("value", function(snapshot) {
        //firebase.database().ref('recapDay/' + this.getUserUid()).on("value", function(snapshot) {
        //  console.log(snapshot.val());
        //  snapshot.forEach(function(data) {
        //    if (data.key === day) {
        //      console.log(data.key); 
        //    }
        //  });
        //});

        
        firebase.database().ref('recapDay/' + this.getUserUid() + '/' + day).push(newRecap).then (
          (data) => {
            resolve(data.key);
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  getARecap(day:string) {
    return new Promise<RecapDay>(
      (resolve, reject) => {
        firebase.database().ref('recapDay/' + this.getUserUid() + "/" + day).once('value').then (
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  

  removeGoal(goal:Goal) {
    
  }

}
