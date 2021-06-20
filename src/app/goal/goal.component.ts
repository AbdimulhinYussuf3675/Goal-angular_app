import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert-service/alert.service';
import { Goal } from '../goal'
import { GoalService } from '../goal-service/goal.service'
import { HttpClient } from '@angular/common/http'
import { Quote } from '../quote-class/quote'
@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
  goals: Goal[]
  alertservice:AlertService;
  message: string = 'The goal has been deleted'
  quote: Quote;

  constructor(goalService: GoalService, alertService:AlertService, private http:HttpClient ) {
    this.goals = goalService.getGoals()
    this.alertservice = alertService
  }

  ngOnInit(): void {}
  
  
  addNewGoal(goal) {
    let goalLength = this.goals.length;
    goal.id = goalLength + 1;
    goal.completeDate = new Date(goal.completeDate)
    this.goals.push(goal)
  }
  toggleDetails(index) {
    this.goals[index].showDescription = !this.goals[index].showDescription;
  } completeGoal(isComplete, index) {
    if (isComplete) {
      this.goals.splice(index, 1);
    }
  }
  deleteGoal(isComplete, index) {
    if (isComplete) {
      let toDelete = confirm(
        `Are you sure you want to delete ${this.goals[index].name}?`)
        if (toDelete){
          this.goals.slice(index,1)
          this.alertservice.alertMe("The goal has been deleted")
        }
      }
    }
  }