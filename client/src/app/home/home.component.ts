import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  registerMode : boolean = false;
  model: any ={}

  registerToggle(){
    this.registerMode = true;
  }
  cancelRegisterMode(event: boolean){
    this.registerMode = false;
  }

}
