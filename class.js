class Obj{
    constructor(x,y,w,h,a){
        this.x = x
        this.y = y
        this.w = w 
        this.h = h 
        this.a = a 
    }

    draw_obj(){
        draw.fillStyle = this.a
        draw.fillRect(this.x,this.y,this.w,this.h)
    }
}
class Hero extends Obj{
    dir = 0
    dri = 0
    pts = 0
    draw_hero(){}
    atual_hero(){}
}

class Enemy extends Obj{}

class Wall extends Obj{}

class Text{}

class Shoot{}


