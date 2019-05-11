import {
    Component
}
from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    result = 0;
    ngOnInit() {

        //this.drawEnemies();
        var Coordx = [];
        var Coordy = [];
        for (let i = 0; i < 8; i++) {
            Coordx[i] = Math.floor(Math.random() * 8);
            Coordy[i] = Math.floor(Math.random() * 8);
            console.log(Coordx)
        }
        this.drawRectable();

        this.drawUser(Coordx, Coordy);
    }
    name = 'Angular 5';

    drawUser(Coordx, Coordy) {

        //create emenies
        var cenemy = document.getElementById("enemy");
        var ctxEnemy = cenemy.getContext("2d");
        for (let i = 0; i < 8; i++) {
            ctxEnemy.fillStyle = "#FF0000";
            ctxEnemy.fillRect(Coordx[i] * 70, Coordy[i] * 70, 70, 70);
        }

        //cUser
        var cUser = document.getElementById("user");
        var ctxUser = cUser.getContext("2d");
        var xPos = 0;
        var yPos = 0;
        var count = 0;
        var moves = 0;
        ctxUser.fillRect(xPos, yPos, 70, 70)

        function move(e) {
            moves++;
            if (moves == 30)
                alert('you lost')

            if (e.keyCode == 39 && xPos < 70 * 7) {
                xPos += 70;
                ctxUser.clearRect(xPos - 70, yPos, 70, 70)
                ctxUser.fillRect(xPos, yPos, 70, 70);
            }
            if (e.keyCode == 37 && xPos > 0) {
                xPos -= 70;
                ctxUser.clearRect(xPos + 70, yPos, 70, 70)
                ctxUser.fillRect(xPos, yPos, 70, 70);
            }
            if (e.keyCode == 40 && yPos < 70 * 7) {
                yPos += 70;
                ctxUser.clearRect(xPos, yPos - 70, 70, 70)
                ctxUser.fillRect(xPos, yPos, 70, 70);
            }
            if (e.keyCode == 38 && yPos > 0) {
                yPos -= 70;
                ctxUser.clearRect(xPos, yPos + 70, 70, 70)
                ctxUser.fillRect(xPos, yPos, 70, 70);
            }
            //cUser.width = cUser.width;

            if (deleteEnemy(Coordx, Coordy)) {
                count++;
                console.log("hy count" + count)
                if (count == 8) {
                    alert('you won')
                }
            }

        }

        function deleteEnemy(Coordx, Coordy) {
            let flag = false;
            for (let i = 0; i < 8; i++) {

                if (Coordx[i] * 70 == xPos && Coordy[i] * 70 == yPos) {
                    ctxEnemy.clearRect(xPos, yPos, 70, 70)
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

        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                ctx.moveTo(0, 70 * j);
                ctx.lineTo(560, 70 * j);
                ctx.stroke();

                ctx.moveTo(70 * i, 0);
                ctx.lineTo(70 * i, 560);
                ctx.strokeStyle = "#F0F8FF"
                ctx.stroke();
                var left = 0;
                for (var a = 0; a < 8; a++) {
                    for (var b = 0; b < 8; b += 2) {
                        let startX = b * 70;
                        if (a % 2 == 0) startX = (b + 1) * 70;
                        ctx.fillStyle = "#F0F8FF";
                        ctx.fillRect(startX + left, (a * 70), 70, 70);
                    }
                }
            }
        }

        // var canvas = document.getElementById('stage');
        // if (canvas.getContext) {
        //   var ctx = canvas.getContext('2d');

        //   ctx.fillStyle = "#D74022";
        //   ctx.fillRect(25, 25, 150, 150);

        //   ctx.fillStyle = "rgba(0,0,0,0.5)";
        //   ctx.clearRect(60, 60, 120, 120);
        //   ctx.strokeRect(90, 90, 80, 80);
        // }

    }

}