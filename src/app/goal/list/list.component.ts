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
        this.goals.push(goals[id]);
      }
    });
  }

  onNewGoal() {
    this.router.navigate(['/goal', 'add']);
  }

  onDeleteGoal(goal: Goal) {
    this.goalService.removeGoal(goal);
  }

  onViewGoal(id: number) {
    console.log(id);
    this.router.navigate(['/goal', 'view', id]);
  }

  
}
