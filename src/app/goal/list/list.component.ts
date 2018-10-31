import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GoalService } from '../../services/goal.service';
import { Router } from '@angular/router';
import { Goal } from '../../models/Goal.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  goals: Goal[];
  goalsSubscription: Subscription;

  constructor(private goalService: GoalService,
              private router: Router) { }

  ngOnInit() {
    this.goalsSubscription = this.goalService.goalsSubject.subscribe(
      (goals: Goal[]) => {
        this.goals = goals;
      }
    );
    this.goalService.getGoals();
    this.goalService.emitGoals();
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

  ngOnDestroy() {
    this.goalsSubscription.unsubscribe();
  }
}
