import { Injectable } from '@angular/core';
import { Goal } from '../models/Goal.model';
import * as firebase from 'firebase';
import { AuthGuardService } from '../services/auth-guard.service';

@Injectable()
export class GoalService {

  

  constructor(private authGuardService: AuthGuardService) { }

  getUserUid() {
    return this.authGuardService.getUid();
  }


  saveGoals() {
    
  }

  getGoals() {
    
  }

  getSingleGoal(id:number) {
    return new Promise (
      (resolve, reject) => {
        firebase.database().ref('/goal/' + id).once('value').then (
          (data) => {
            resolve (data.val());
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
