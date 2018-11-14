import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GoalService } from '../../services/goal.service';
import { Goal } from '../../models/Goal.model';
import { Action } from '../../models/Action.models';

@Component({
  selector: 'app-single-goal',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  idGoal: string;
  goal: Goal;
  name: string;
  actions: Action[] = []; 

  constructor(private router: Router, private route: ActivatedRoute, private goalService: GoalService) { }

  ngOnInit() {
    this.idGoal = this.route.snapshot.paramMap.get('id');
    this.goalService.getAGoal(this.idGoal).then(res => {
      this.goal = res;
      this.name = res.goal;
    });

    this.goalService.getActions(this.idGoal).then(res => {
      for (let action in res) {
        this.actions.push(res[action]);
      }
    });

  }

  addAction(id: string) {
    this.router.navigate(['/action', 'add', id]);
  }

}
