import { Component, OnInit } from '@angular/core';
import {Input } from '@angular/core';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input('size') size;
   @Input('Gamedifficulty') Gamedifficulty;
  
    result = 0;
   
    ngOnInit() {
      console.log("the size is"+this.size)
     this.start();
    }//END OF on INIT
   reset(){
     let cUser = document.getElementById("user");
      let cenemy = document.getElementById("enemy");
      let stage = document.getElementById("stage");
      stage.width=stage.width;
      cenemy.width=cenemy.width;
      cUser.width=cUser.width;
     console.log("resest callced")
     this.start();
   }
   createRandom(){
     var Coordx = [];
        var Coordy = [];
        for (let i = 0; i < this.size; i++) {
            Coordx[i] = Math.floor(Math.random() * this.size);
            Coordy[i] = Math.floor(Math.random() * this.size);
            
        }
        let flag=false;
      for(let i=0;i<this.size;i++){
        for(let j=i+1;j<this.size;j++){
            if(Coordx[i]==Coordx[j] && Coordy[i]==Coordy[j]){
                flag=true;
            }
        }
      }
      if(flag){
        console.log('creating random')
        this.createRandom();
      }
        return [Coordx,Coordy]
   }
start(){
 console.log("size is "+this.size)
        //this.drawEnemies();
        let chances=Math.floor(this.size*this.size/3);
        this.drawRectable();
        let RandomXY=this.createRandom();
        if(this.Gamedifficulty=='easy'){
          chances=this.size*this.size;
        }
        else if(this.Gamedifficulty=='medium')
        chances=this.size*this.size/2;
        this.drawUser(RandomXY[0], RandomXY[1],this.size,chances);
}
    drawUser(Coordx, Coordy,size,diff:number) {
      let resetFlag=false;
      var img = document.getElementById("img");
      var user=document.getElementById("userimg");
  
        //create emenies
        var cenemy = document.getElementById("enemy");
        var ctxEnemy = cenemy.getContext("2d");
        for (let i = 0; i < this.size; i++) {
            
            ctxEnemy.drawImage(img,Coordx[i] * 50, Coordy[i] * 50, 50, 50);
        }

        //cUser
        var cUser = document.getElementById("user");
        var ctxUser = cUser.getContext("2d");
        var xPos = Math.floor(size*50/2);
        var yPos = Math.floor(size*50/2);;
        var count = 0;
        var moves = 0;
        ctxUser.drawImage(user,xPos, yPos, 50, 50)
   
        function move(e) {
            moves++;
            if (moves == diff){
                alert('you lost')
                    alert('Press restart game to play again')
              
               }
            if (e.keyCode == 39 && xPos < 50 * (size-1)) {
                xPos += 50;
                ctxUser.clearRect(xPos - 50, yPos, 50, 50)
                ctxUser.drawImage(user,xPos, yPos, 50, 50);
            }
            if (e.keyCode == 37 && xPos > 0) {
                xPos -= 50;
                ctxUser.clearRect(xPos + 50, yPos, 50, 50)
                ctxUser.drawImage(user,xPos, yPos, 50, 50);
            }
            if (e.keyCode == 40 && yPos < 50 * (size-1)) {
                yPos += 50;
                ctxUser.clearRect(xPos, yPos - 50, 50, 50)
                ctxUser.drawImage(user,xPos, yPos, 50, 50);
            }
            if (e.keyCode == 38 && yPos > 0) {
                yPos -= 50;
                ctxUser.clearRect(xPos, yPos + 50, 50, 50)
                ctxUser.drawImage(user,xPos, yPos, 50, 50);
            }
            //cUser.width = cUser.width;

            if (deleteEnemy(Coordx, Coordy)) {
                count++;
                console.log("hy count" + count)
                if (count ==size) {
                    alert('you won!!!')
                    alert('Press restart game to play again')
                    
                }
            }

        }
    if(resetFlag)
    this.reset();
    
        function deleteEnemy(Coordx, Coordy) {
            let flag = false;
            for (let i = 0; i < size; i++) {

                if (Coordx[i] * 50 == xPos && Coordy[i] * 50 == yPos) {
                    ctxEnemy.clearRect(xPos, yPos, 50, 50)
                    flag = true;
                }

            }
            return flag;
        }
        document.onkeydown = move;
    }

    drawRectable() {

        var c = document.getElementById("stage");
        var ctx = c.getContext("2d");

        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                ctx.moveTo(0, 50 * j);
                ctx.lineTo(50 * j, 50 * j);
                ctx.stroke();

                ctx.moveTo(50 * i, 0);
                ctx.lineTo(50 * i, 50 * j);
                ctx.strokeStyle = "#F0F8FF"
                ctx.stroke();
                var left = 0;
                for (var a = 0; a < this.size; a++) {
                    for (var b = 0; b < this.size; b += 2) {
                        let startX = b * 50;
                        if (a % 2 == 0) startX = (b + 1) * 50;
                        ctx.fillStyle = "#F0F8FF";
                        ctx.fillRect(startX + left, (a * 50), 50, 50);
                    }
                }
            }
        }

    }

}