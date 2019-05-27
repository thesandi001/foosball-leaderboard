import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  providers: [ ApiService ]
})
export class LeaderboardComponent implements OnInit {

  players: any = [];

  constructor(
  	private _api: ApiService
  ) { }

  ngOnInit() {
  	this.getLeaderboard();
  }

  getLeaderboard() {
  	this._api.getAll().subscribe(
  		(res: any) => {
  			this.sortByScore(res);
  		},
  		(err: any) => {
  			console.log(err);
  		},
  	);
  }

  sortByScore(data) {
  	data.sort((a, b) => (a.score < b.score) ? 1 : -1);
  	this.players = data.slice(0, 10);
  }

}
