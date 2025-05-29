import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FoodComponent } from "../food/food.component";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private router: Router){}

  goToFood(){
    this.router.navigate(['/food']);
    console.log("works");
  }

  
goToHome() {
  this.router.navigate(['/']);
}

}
