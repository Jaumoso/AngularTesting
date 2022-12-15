import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  errMess: string;

  constructor(private leaderService: LeaderService) { }

  ngOnInit() {
   this.leaderService.getLeaders()
   .subscribe((leader) =>  this.leaders = leader, errmess => this.errMess = <any>errmess);
  }

}
