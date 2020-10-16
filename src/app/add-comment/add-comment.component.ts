import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';



@Component({
  selector: 'app-addcomment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  commentForm: FormGroup;
  newComment: Comment;
  data: Array<Dish>;
  @Input() selectedFeatures: any = [];
  
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
  
  constructor(private fb: FormBuilder,private dishservice: DishService) {  this.createForm(); }
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
  ngOnInit(): void {
  }
  onSubmit() {
    this.newComment = (this.commentForm.value);
    this.selectedFeatures.push(this.newComment) ;
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    var d = new Date();
    var n = d.toLocaleDateString("en-US", options);
    document.getElementById("demo1").innerHTML = n;
    // document.getElementById("demo1").innerHTML = this.selectedFeatures.push(this.newComment);
    //  this.dishservice.createUser(this.newComment).subscribe(data => { });
    console.log(this.newComment);
    this.commentForm.reset({
      author: '',
      comment: '',
      rating: '',
    });
    this.commentsFormDirective.resetForm();
  }
 
}
