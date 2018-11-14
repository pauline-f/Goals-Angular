import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GoalService } from '../../services/goal.service';
import { Action } from '../../models/Action.models';

@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.css']
})
export class AddActionComponent implements OnInit {

  addActionForm: FormGroup;
  idGoal: string;
  

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private goalService: GoalService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.idGoal = this.route.snapshot.paramMap.get('id');
    console.log(this.idGoal);
    this.initForm();
  }

  initForm() {
    this.addActionForm = this.formBuilder.group( {
      action: ['', Validators.required],
    });
  }

  onSaveData() {
    const action = this.addActionForm.get('action').value;
    
    const newAction = new Action(action);
    this.goalService.createNewAction(newAction, this.idGoal)
    .then(res => {
      this.router.navigate(['/goal', 'list', res]);
  })
    .catch(err => {
      console.log("Error while inserting quote", err);
    });
  }

}
