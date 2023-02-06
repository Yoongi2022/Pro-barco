class Boat {
    constructor(x,y,width,heigth,boatPos){
        var options = {
            restitution :0.8,
            friction : 1.0,
            density : 1.0,
        }
        //Crear el cuerpo
        this.body = Bodies.rectangle(x,y,width,heigth,options);
        this.width = width;
        this.heigth = heigth;
        this.animation = boatanimation;
        this.speed = 0.05;
        this.Boatposition = boatPos;
        boatanimation
        this.image = loadImage("boat.png")
        World.add(world,this.body);
    }
    animate(){
        this.speed += 0.05;
        //Redondea los números
        var index = floor(this.speed % this.animation.length);
    }
    display (){
        var angle = this.body.angle;
        var pos = this.body.position;

        push();
        translate(pos.x,pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index],0,this.Boatposition,this.width,this.heigth);
        pop();
    }
}