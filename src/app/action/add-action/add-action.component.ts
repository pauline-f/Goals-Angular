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
  allDay: boolean;
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private goalService: GoalService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.idGoal = this.route.snapshot.paramMap.get('id');
    this.initForm();
  }

  initForm() {
    this.addActionForm = this.formBuilder.group( {
      action: ['', Validators.required],
      allDay: [false, Validators.required],
      mon: [false, Validators.required],
      tue: [false, Validators.required],
      wed: [false, Validators.required],
      thu: [false, Validators.required],
      fri: [false, Validators.required],
      sat: [false, Validators.required],
      sun: [false, Validators.required],
    });
  }

  onSaveData() {
    const action = this.addActionForm.get('action').value;
    const allDay = this.addActionForm.get('allDay').value;
    const mon = this.addActionForm.get('mon').value;
    const tue = this.addActionForm.get('tue').value;
    const wed = this.addActionForm.get('wed').value;
    const thu = this.addActionForm.get('thu').value;
    const fri = this.addActionForm.get('fri').value;
    const sat = this.addActionForm.get('sat').value;
    const sun = this.addActionForm.get('sun').value;
    
    const newAction = new Action(null, action, mon, tue, wed, thu, fri, sat, sun);
    this.goalService.createNewAction(newAction, this.idGoal)
    .then(res => {
      this.router.navigate(['/goal', 'list', res]);
  })
    .catch(err => {
      console.log("Error while inserting quote", err);
    });
  }
}
