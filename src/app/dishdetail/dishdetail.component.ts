import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Comment } from '../shared/comment';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
        state('shown', style({
            transform: 'scale(1.0)',
            opacity: 1
        })),
        state('hidden', style({
            transform: 'scale(0.5)',
            opacity: 0
        })),
        transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  errMsg: string;

  dishcopy: Dish;
  visibility = 'shown';

  commentForm: FormGroup;
  comment: Comment;
  rating: number;
  @ViewChild('cform') commentFormDirective;


  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Author name is required.',
      'minlength': 'Name must be at least 2 characters long.',
    },
    'comment': {
      'required': 'Comment is required.',
    },

  };

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) {
      this.createForm();
    }

  ngOnInit() {
    this.dishService.getDishIds()
    .subscribe((dishIds: string[]) =>  this.dishIds = dishIds, errmess => this.errMsg = <any>errmess);

    this.route.params.pipe(switchMap((params: Params) => {
      this.visibility = 'hidden';
      return this.dishService.getDish(params['id']); }))
    .subscribe((dish) => {
      this.dish = dish; this.dishcopy = dish;
      this.setPrevNext(dish.id);
      this.visibility = 'shown'; }, errmess => this.errMsg = <any>errmess);
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack() {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      rating: 5,
      comment: ['', Validators.required],
      author: ['', [Validators.required, Validators.minLength(2)]],
      date: ''
    });

    this.commentForm.valueChanges
    .subscribe((data) => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
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

  onSubmit() {
    this.comment = this.commentForm.value;

    const d = new Date();
    const date = d.toISOString();
    this.comment.date = date;

    // View and push the new comment
    console.log(this.comment);
    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy)
    .subscribe(dish => {
      this.dish = dish;
      this.dishcopy = dish;
    },
    errmess => {this.dish = null; this.dishcopy = null; this.errMsg = <any>errmess; });
    // reset the form
    this.commentForm.reset({
      rating: 5,
      comment: '',
      author: '',
      date: ''
    });
    /* this.commentFormDirective.resetForm(); */
  }
}
