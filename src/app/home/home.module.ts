import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MatchdayComponent } from './matchday/matchday.component';

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HomeComponent, LeaderboardComponent, MatchdayComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class HomeModule { }
