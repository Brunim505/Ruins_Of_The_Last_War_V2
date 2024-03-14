class Obj{
    constructor(x,y,w,h,a){
        this.x = x
        this.y = y
        this.w = w 
        this.h = h 
        this.a = a
    }
    des_img(){
        let img = new Image()
        img.src = this.a
        ctx.drawImage(img,this.x, this.y, this.w, this.h)
    }
    des_obj(){
        ctx.fillStyle = this.a
        ctx.fillRect(this.x,this.y,this.w,this.h)
    } 

    
    
}
class Hero extends Obj{}

class Enemy extends Obj{}

class Wall extends Obj{
    life = 10
    point(objeto){
        if((objeto.y>=680)&&(objeto.y <= 684)){
            return true
        }else{
            false
        }
    }
    
    colid(objeto){
        if((this.x < objeto.x + objeto.w)&&
          (this.x + this.w > objeto.x)&&
          (this.y < objeto.y + objeto.h)&&
          (this.y + this.h > objeto.y)){
            return true
        }else{
            false
        }
    }
    
}

class Text{
    des_text(text,x,y,cor,font){
        ctx.fillStyle = cor
        ctx.lineWidth = '5'
        ctx.font = font
        ctx.fillText(text,x,y)
    }
}

class Shoot extends Obj{
    
    des_tiro(){
        ctx.beginPath()
        ctx.lineWidth = '1'
        ctx.strokeStyle = 'orange'
        ctx.fillStyle = 'darkorange'
        ctx.rect(this.x, this.y,10,10)
        ctx.closePath()
        ctx.stroke()
        ctx.fill()
    }
    recomeca(){
        this.y = -100
        this.x = 700
    }
    atual_tiro(){
        this.y += 1
       if(this.y >= 780){
        this.recomeca()
       }
    }
}


