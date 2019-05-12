import {
    Component
}from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  tough=['easy','medium','tough']
  Size=[4,6,8,10,12,14]
     flag:Boolean=false;
      Gamesize;
      Gamedifficulty;
loginForm = new FormGroup(
    {
      size: new FormControl('', [Validators.required]),
      difficulty: new FormControl('',
      [Validators.required])
    }
  );
  save(){
    this.flag=true;
    this.Gamesize=this.loginForm.value.size;
    this.Gamedifficulty=this.loginForm.value.difficulty;
  }
   get size(){
   return this.loginForm.get('size');
 }
  get difficulty(){
   return this.loginForm.get('difficulty');
 }
}