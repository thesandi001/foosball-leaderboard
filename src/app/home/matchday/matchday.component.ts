import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-matchday',
  templateUrl: './matchday.component.html',
  styleUrls: ['./matchday.component.scss'],
  providers: [ ApiService ]
})
export class MatchdayComponent implements OnInit {

	players: any = [];
	player1: any;
	player2: any;
	player3: any;
	player4: any;
	team1: any = {};
	team2: any = {};
	k = 60; // max point per match (constant in ELO algo)

  constructor(
  	private _api: ApiService
  ) { }

  ngOnInit() {
  	this.getAll();
  }

  getAll() {
  	this._api.getAll().subscribe(
  		(res: any) => {
  			this.sortByName(res);
  		},
  		(err: any) => {
  			console.log(err);
  		},
  	);
  }

  sortByName(data) {
  	this.players = data.sort((a, b) => (a.player > b.player) ? 1 : -1);
  }

  checkELO() {
  	if(this.player1 && this.player2) {
  		this.team1.avg_score = this.Average(this.player1.score,this.player2.score);  		
  	}
  	if(this.player3 && this.player4) {
  		this.team2.avg_score = this.Average(this.player3.score,this.player4.score);  		
  	}
  	if(this.player1 && this.player2 && this.player3 && this.player4) {
  		this.team2.probability = this.Probability(this.team1.avg_score,this.team2.avg_score);
  		this.team2.probability_percent = this.ProbabilityPercent(this.team1.avg_score,this.team2.avg_score);
  		this.team1.probability = this.Probability(this.team2.avg_score,this.team1.avg_score);
  		this.team1.probability_percent = this.ProbabilityPercent(this.team2.avg_score,this.team1.avg_score);
  	}
  }

  declareWinner(team) {
  	if(team == 1) {
  		this.player1.new_score = this.UpdatePoints(this.player1.score,this.team2.avg_score,1).Ra;
  		this.player2.new_score = this.UpdatePoints(this.player2.score,this.team2.avg_score,1).Ra;
  		this.player3.new_score = this.UpdatePoints(this.player3.score,this.team1.avg_score,0).Ra;
  		this.player4.new_score = this.UpdatePoints(this.player4.score,this.team1.avg_score,0).Ra;
  	} else if (team == 2) {
  		this.player1.new_score = this.UpdatePoints(this.player1.score,this.team2.avg_score,0).Ra;
  		this.player2.new_score = this.UpdatePoints(this.player2.score,this.team2.avg_score,0).Ra;
  		this.player3.new_score = this.UpdatePoints(this.player3.score,this.team1.avg_score,1).Ra;
  		this.player4.new_score = this.UpdatePoints(this.player4.score,this.team1.avg_score,1).Ra;
  	}
  } 

  // To calculate the Winning Probability of Player B 
  // P(B) = Probability(Ra, Rb); 
  // -------------------------------------------------
  // To calculate the Winning Probability of Player A 
  // P(A) = Probability(Rb, Ra);

	Probability(Ra, Rb) { 
		return 1.0 * 1.0 / (1 + 1.0 * Math.pow(10, 1.0 * (Ra - Rb) / 400)); 
	}	

	ProbabilityPercent(Ra, Rb) { 
		return Math.round(this.Probability(Ra,Rb) * 100);
	}

	Average(Ra, Rb) {
		return Math.round( ( Ra + Rb ) / 2 );
	}

	// Case 1 When Player A wins 
	// Updating the Elo Ratings 
	// Ra = Ra + K * (1 - Pa); 
	// Rb = Rb + K * (0 - Pb); 
	// ---------------------------
	// Case 0 When Player B wins 
	// Updating the Elo Ratings 
	// Ra = Ra + K * (0 - Pa);
	// Rb = Rb + K * (1 - Pb);

	UpdatePoints(Ra, Rb, isAWinner) {
		if(isAWinner) {
			Ra = Ra + this.k * (1 - this.Probability(Rb,Ra)); 
			Rb = Rb + this.k * (0 - this.Probability(Ra,Rb)); 
		} else {
			Ra = Ra + this.k * (0 - this.Probability(Rb,Ra)); 
			Rb = Rb + this.k * (1 - this.Probability(Ra,Rb)); 
		}
		return { Ra: Math.round(Ra), Rb: Math.round(Rb) };
	}

}
