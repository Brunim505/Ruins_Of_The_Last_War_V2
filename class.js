class Obj{

    frame = 0
    timer = 0
    set_visible = true
  
    constructor(x,y,width,height, image){
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.image = image
    }
  
    draw(){
      if (this.set_visible) {
        var img = new Image()
        img.src = this.image
        canvas.drawImage(img, this.x, this.y, this.width, this.height)
      }
    }
    
    collide(obj){
      if (this.x < obj.x + obj.width &&
          this.x + this.width > obj.x &&
          this.y < obj.y + obj.height &&
          this.y + this.height > obj.y)
          {
            return true
          }else {
            return false
          }
    }
  }
  
  class Text{
    texto = ""
    constructor(text){
      this.texto = text
    }
    draw_text(size, font, x, y, color){
      canvas.font = size + "px" + " " + font
      canvas.fillStyle = color
      canvas.fillText(this.texto, x, y)
    }
    update_text(valor){
      this.texto = valor
    }
  }
  
  class Shoot extends Obj{
    move(){
      this.x +=20
    }
  }
  
  class Enemy extends Obj{
    velocidade = Math.random()*(12 - 2) + 2
  move(){
    this.x -= this.velocidade 
    }
  }

  class Muro extends Obj{
    draw(){
      canvas.fillStyle = this.image
      canvas.fillRect(this.x, this.y, this.width, this.height)
    }
  }
  
  
  