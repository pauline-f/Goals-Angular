import { Component, OnInit, OnDestroy } from '@angular/core';
import { GoalService } from '../../services/goal.service';
import { Router } from '@angular/router';
import { Goal } from '../../models/Goal.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  goals: Goal[] = [];

  constructor(private goalService: GoalService,
              private router: Router) { }

  ngOnInit() {
    this.goalService.getGoals().then(goals => {
      
      for (let id in goals) {
        var actions = [];
        for (let idAction in goals[id].actions) {
          actions.push(goals[id].actions[idAction]);
        }
        var goal = new Goal(goals[id].id, goals[id].goal, actions);
        this.goals.push(goal);

      }
    });
  }

  onNewGoal() {
    this.router.navigate(['/goal', 'add']);
  }

  onDeleteGoal(goal: Goal) {
    this.goalService.removeGoal(goal);
  }

  onViewGoal(id: string) {
    this.router.navigate(['/goal', 'view', id]);
  }

  
}
