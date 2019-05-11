import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { GameComponent } from './game/game.component';
const routes: Routes = [
  {path:'game',component:GameComponent}
];
@NgModule({
  imports:      [ BrowserModule, FormsModule ,RouterModule.forRoot(routes)],
  declarations: [ AppComponent, HelloComponent, GameComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
