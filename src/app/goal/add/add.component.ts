import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoalService } from '../../services/goal.service';
import { Goal } from '../../models/Goal.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addGoalForm: FormGroup;
  

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private goalService: GoalService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addGoalForm = this.formBuilder.group( {
      goal: ['', Validators.required],
    });
  }

  onSaveData() {
    const goal = this.addGoalForm.get('goal').value;
    
    const newGoal = new Goal(goal);
    this.goalService.createNewGoal(newGoal)
    .then(res => {
      this.router.navigate(['/goal', 'list', res]);
  })
    .catch(err => {
      console.log("Error while inserting quote", err);
    });

    
  }
}
