import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {  Params ,ActivatedRoute } from '@angular/router';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flyInOut, visibility,expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      visibility(),
      expand()
    ]
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
  errMess: string;
  dishcopy: Dish;
  visibility = 'shown';
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
    private location: Location,private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) { this.createForm();}

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
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
      errmess => this.errMess = <any>errmess);
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
    this.newComment = this.commentForm.value;
    this.newComment.date = new Date().toISOString();
    console.log(this.newComment);
    this.dishcopy.comments.push(this.newComment);
    this.dishservice.putDish(this.dishcopy)
    .subscribe(dish => {
      this.dish = dish; this.dishcopy = dish;
    },
    errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
    this.commentsFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      comment: '',
      rating: '',
    });
  }
 
}
