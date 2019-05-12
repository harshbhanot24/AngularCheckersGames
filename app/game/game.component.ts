import { Component, OnInit } from '@angular/core';
import {Input } from '@angular/core';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input('size') size;
result = 0;
   
    ngOnInit() {
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
        
        this.drawRectable();
        let RandomXY=this.createRandom();

        this.drawUser(RandomXY[0], RandomXY[1],this.size);
}
    drawUser(Coordx, Coordy,size) {
      let resetFlag=false;
      var img = document.getElementById("img");
      var user=document.getElementById("userimg");
  
        //create emenies
        var cenemy = document.getElementById("enemy");
        var ctxEnemy = cenemy.getContext("2d");
        for (let i = 0; i < this.size; i++) {
            
            ctxEnemy.drawImage(img,Coordx[i] * 70, Coordy[i] * 70, 70, 70);
        }

        //cUser
        var cUser = document.getElementById("user");
        var ctxUser = cUser.getContext("2d");
        var xPos = 0;
        var yPos = 0;
        var count = 0;
        var moves = 0;
        ctxUser.drawImage(user,xPos, yPos, 70, 70)

        function move(e) {
            moves++;
            if (moves == 30)
                alert('you lost')

            if (e.keyCode == 39 && xPos < 70 * (size-1)) {
                xPos += 70;
                ctxUser.clearRect(xPos - 70, yPos, 70, 70)
                ctxUser.drawImage(user,xPos, yPos, 70, 70);
            }
            if (e.keyCode == 37 && xPos > 0) {
                xPos -= 70;
                ctxUser.clearRect(xPos + 70, yPos, 70, 70)
                ctxUser.drawImage(user,xPos, yPos, 70, 70);
            }
            if (e.keyCode == 40 && yPos < 70 * (size-1)) {
                yPos += 70;
                ctxUser.clearRect(xPos, yPos - 70, 70, 70)
                ctxUser.drawImage(user,xPos, yPos, 70, 70);
            }
            if (e.keyCode == 38 && yPos > 0) {
                yPos -= 70;
                ctxUser.clearRect(xPos, yPos + 70, 70, 70)
                ctxUser.drawImage(user,xPos, yPos, 70, 70);
            }
            //cUser.width = cUser.width;

            if (deleteEnemy(Coordx, Coordy)) {
                count++;
                console.log("hy count" + count)
                if (count ==size) {
                    alert('you won')
                    resetFlag=true;
                }
            }

        }
    if(resetFlag)
    this.reset();
    }
        function deleteEnemy(Coordx, Coordy) {
            let flag = false;
            for (let i = 0; i < size; i++) {

                if (Coordx[i] * 70 == xPos && Coordy[i] * 70 == yPos) {
                    ctxEnemy.clearRect(xPos, yPos, 70, 70)
                    flag = true;
                }

            }
            return flag;
        }
        document.onkeydown = move;
  

    drawRectable() {

        var c = document.getElementById("stage");
        var ctx = c.getContext("2d");

        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                ctx.moveTo(0, 70 * j);
                ctx.lineTo(70 * j, 70 * j);
                ctx.stroke();

                ctx.moveTo(70 * i, 0);
                ctx.lineTo(70 * i, 70 * j);
                ctx.strokeStyle = "#F0F8FF"
                ctx.stroke();
                var left = 0;
                for (var a = 0; a < this.size; a++) {
                    for (var b = 0; b < this.size; b += 2) {
                        let startX = b * 70;
                        if (a % 2 == 0) startX = (b + 1) * 70;
                        ctx.fillStyle = "#F0F8FF";
                        ctx.fillRect(startX + left, (a * 70), 70, 70);
                    }
                }
            }
        }

    }

}