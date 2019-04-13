import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  review$;

  constructor(private data: DataService) { }

  getReviewData() {
    this.data.getReview().subscribe(
      data => this.review$ = data
    );
  }

  ngOnInit() {
    this.getReviewData();
  }

}
