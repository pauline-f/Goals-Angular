import { Injectable } from '@angular/core';
import { Goal } from '../models/Goal.model';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import { resolve } from 'url';

@Injectable()
export class GoalService {

  goals: Goal[] = [];
  goalsSubject = new Subject<Goal[]>();

  constructor() { }

  emitGoals() {
    this.goalsSubject.next(this.goals);
  }

  saveGoals() {
    firebase.database().ref('/goals').set(this.goals);
  }

  getGoals() {
    firebase.database().ref('/goals')
    .on ('value', (data) => {
      this.goals = data.val() ? data.val() : [];
      this.emitGoals();
    });
  }

  getSingleGoal(id:number) {
    return new Promise (
      (resolve, reject) => {
        firebase.database().ref('/goals/' + id).once('value').then (
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
    this.goals.push(newGoal);
    this.saveGoals();
    this.emitGoals();
  }

  removeGoal(goal:Goal) {
    const goalIndexToRemove = this.goals.findIndex(
      (goalEl) => {
        if (goalEl === goal) {
          return true;
        }
      }
    );
    this.goals.splice(goalIndexToRemove, 1);
    this.saveGoals();
    this.emitGoals();
  }

}
