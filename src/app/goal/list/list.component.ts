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
  goals: Goal[];
  
  constructor(private goalService: GoalService,
              private router: Router) { }

  ngOnInit() {
    
  }

  onNewGoal() {
    this.router.navigate(['/goal', 'add']);
  }

  onDeleteGoal(goal: Goal) {
    this.goalService.removeGoal(goal);
  }

  onViewGoal(id: number) {
    this.router.navigate(['/goal', 'view', id]);
  }

  
}
