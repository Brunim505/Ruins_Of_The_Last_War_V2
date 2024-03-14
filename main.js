const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
const centerX_canvas = canvas.width / 2;
const centerY_canvas = canvas.height / 2;
let wall = new Wall(200,300,768,512,'./assets/IMAGEM')
let tiro = new Shoot(-1800,750,100,100,'red')
let t1 = new Text()
let t2 = new Text()

 function pontos(){
  if(wall.point(tiro)){
      wall.pts +=1
  }
}
 function colisao(){
   if(wall.colid(tiro)){
      wall.life -= 1
    console.log(wall.colid(tiro))
       tiro.recomeca()
   }
}
 function desenha(){
    t1.des_text('Vida: ',360,24,'yellow','26px Times')
    t2.des_text(wall.life,460,24,'yellow','26px Times')
    tiro.des_tiro()
    wall.des_img()
 }
 function atualiza(){
   tiro.atual_tiro()
   colisao()
 }

 function main(){
   ctx.clearRect(0,0,500,700)
   desenha()
   atualiza()
  }
  
  
  
  setInterval(main,10)
     
