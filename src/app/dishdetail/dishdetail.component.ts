import { Component, OnInit, ViewChild } from '@angular/core';
import {  Params ,ActivatedRoute } from '@angular/router';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  commentForm: FormGroup;
  newComment: Comment;
  selectedFeatures: any = [];
  date  = new Date();

  @ViewChild('fform') commentsFormDirective;

  formErrors = {
    'author': '',
    'comment': '',
    'rating':''
  };
 
  validationMessages = {
    'author': {
      'required':      ' Name is required.',
      'minlength':     ' Name must be at least 2 characters long.',
      'maxlength':     ' cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'comment is required.',
      'minlength':     'comment must be enter here.',
      'maxlength':     'comment cannot be more than 25 characters long.'
    },
    'rating': {
      'required':      'rating is required.',
      'pattern':       'rating must contain only numbers.'
    }
  };
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,private fb: FormBuilder) { this.createForm();}

    createForm() : void{
   
      this.commentForm = this.fb.group({
        author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
        comment: ['', [Validators.required, Validators.maxLength(50)] ],
        rating: [0, [Validators.required] ],
      });
      this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
      this.onValueChanged();
    }

    onValueChanged(data?: any) {
      if (!this.commentForm) { return; }
      const form = this.commentForm;
      for (const field in this.formErrors) {
        if (this.formErrors.hasOwnProperty(field)) {
          // clear previous error message (if any)
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
    }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    // this.dish = this.dishservice.getDish(id);
    this.dishservice.getDish(id).subscribe(dishes => this.dish = dishes);
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }
  onSubmit() {
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    var d = new Date();
    var n = d.toLocaleDateString("en-US", options);
    document.getElementById("demo").innerHTML =  n;
    this.newComment = this.commentForm.value;
    console.log(this.newComment);
    this.dish.comments.push(this.newComment)+ (document.getElementById("demo").innerHTML =  n);
    this.commentForm.reset({
      author: '',
      comment: '',
      rating: '',
    });
    this.commentsFormDirective.resetForm();
  }
 
}
