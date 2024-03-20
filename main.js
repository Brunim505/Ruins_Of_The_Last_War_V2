var canvas = document.getElementById('canvas').getContext("2d")
canvas.imageSmoothingEnabled = false

  document.addEventListener("click", (e)=>{
    if(cenaCorrente.click){
      cenaCorrente.click()
    }
  });

  document.addEventListener('keydown',(e)=>{
    if(cenaCorrente.movehero){
        cenaCorrente.movehero(e)
    }
})
document.addEventListener('keyup', (e)=>{
    if(cenaCorrente.movehero){
        cenaCorrente.movehero(e)
    }
})

let cenaCorrente = {}
function mudaCena(cena){  
  cenaCorrente = cena
}

let bullets = 15
let pts = 0


let groupShoot = []
let shoots = {
  draw(){
    groupShoot.forEach((shoot)=>{
      shoot.draw()
      shoot.draw()
    })
  },
  update(){
    groupShoot.forEach((shoot)=>{
      shoot.move()
      if(shoot.x>=1400){
        groupShoot.splice(shoot[0],1)
      }
    })
  },
}

let groupMuro = []
let muro = {
  init(){
    groupMuro.push(new Muro(450,50,20,100,'blue')),
    groupMuro.push(new Muro(450,250,20,100,'blue')),
    groupMuro.push(new Muro(450,450,20,100,'blue'))

  },
  draw(){
    groupMuro.forEach((muro) =>{
      muro.draw()
    })
  } 
}
muro.init()

let groupOrcs = []
let orcs ={
  time : 0,
  spawOrcs(){
    this.time +=10
    size_X = Math.random() * (100 - 80) + 80
    size_Y = Math.random() * (140 - 80) + 80
    pos_Y = Math.random() *(500 - 80) + 80
    if(this.time>=1000  ){
      groupOrcs.push(new Orcs(1400, pos_Y, size_X, size_Y, "assets/orc3.png"))
      this.time=0
    }
  },
  destroyOrcs(){
    groupShoot.forEach((shoot)=>{
      groupOrcs.forEach((orc)=>{
        if(shoot.collide(orc)){
          groupShoot.splice(groupShoot.indexOf(shoot),1)
          groupOrcs.splice(groupOrcs.indexOf(orc),1)
          bullets = 15
          pts += 10
        }
      })
    })
  },

  draw(){
    groupOrcs.forEach((orc)=>{
      orc.draw()
    })
  },
  update(){
    this.spawOrcs()
    this.destroyOrcs()
    groupOrcs.forEach((orc)=>{
      orc.move()
      if(orc.x < 440 ){
        groupOrcs.splice(groupOrcs.indexOf(orc),1)
        mudaCena(gameOver)
      }
    })
  }
}

let infinityBg = {
  bg: new Obj(0,0,1300,600,"assets/fundo.jpg"),
  bg2: new Obj(-1300,0,1300,600,"assets/fundo2.jpg"),
  bg3: new Obj(-2600,0,1300,600,"assets/fundo.jpg"),

  draw(){
    this.bg.draw()
    this.bg2.draw()
    this.bg3.draw()
  },

  moveBg(){
    this.bg.x +=1
    this.bg2.x +=1
    this.bg3.x +=1

    if(this.bg.x >= 2600){
      this.bg.x = 0
    }
    if(this.bg2.x >= 1300){
      this.bg2.x = -1300
    }
    if(this.bg3.x >= 0){
      this.bg3.x = -2600
    }
  },

}

let menu = {
  
  titulo: new Text("Skull-Wave"),   
  titulo2: new Text("Click para Iniciar"),
  hero: new Obj(160,220,150,150, "assets/hero1.png"),
  
  click(){
    mudaCena(game)
  },

  draw(){
    this.titulo.draw_text(80,"Tahoma",420,200,"darkolivegreen")
    this.titulo2.draw_text(40,"Verdana",420,400,"white")
    this.hero.draw()
  },
  update(){
    infinityBg.moveBg()
  },
}

let game = {
  placar_txt: new Text("Pontos: "),
  placar: new Text(pts),
  munição_txt: new Text("Munição: "),
  munição: new Text(bullets),

  hero: new Obj(30,200,80,120, "assets/Shot3.png"),


  click(event){
    if(bullets > 0){
      bullets -= 1
      groupShoot.push(new Shoot(this.hero.x,(this.hero.y+this.hero.height/2)-0,20,10, "assets/bullet.jpg"))
      groupShoot.push(new Shoot(this.hero.x,(this.hero.y+this.hero.height/2)-25 ,20,10, "assets/bullet.jpg"))
      groupShoot.push(new Shoot(this.hero.x,(this.hero.y+this.hero.height/2)-50,20,10, "assets/bullet.jpg"))
    }
  },
  
  movehero(event){
    const speed = 50;
    if (event.key === "a" && this.hero.x > 0) {
        this.hero.x -= speed;
      } else if (event.key === "d" && this.hero.x < canvas.canvas.width - this.hero.width) {
        this.hero.x += speed;
      } else if (event.key === "w" && this.hero.y > 0) {
        this.hero.y -= speed;
      } else if (event.key === "s" && this.hero.y < canvas.canvas.height - this.hero.height) {
        this.hero.y += speed;
      }
      console.log(event)
    },

  draw(){
    this.placar_txt.draw_text(30,"Tahoma",1100,50,"white")
    this.placar.draw_text(30,"Tahoma",1210,50,"white")
    this.munição_txt.draw_text(30,"Tahoma",100,50,"white")
    this.munição.draw_text(30,"Tahoma",210,50,"white")
    this.hero.draw()
    muro.draw()
    shoots.draw()
    orcs.draw()   
  },
  update(){
    infinityBg.moveBg()
    shoots.update()
    orcs.update()
    this.placar.update_text(pts)
  },
}

let gameOver = {
  placar_txt: new Text("Pontos: "),
  placar: new Text(pts),
  lbl_game_over: new Text("Game Over"),

  draw(){
    this.placar_txt.draw_text(30,"Tahoma",1100,50,"white")
    this.placar.draw_text(30,"Tahoma",1210,50,"white")
    this.lbl_game_over.draw_text(80,"Verdana",400,300,"white")
  },
  update(){
    infinityBg.moveBg()
    this.placar.update_text(pts)
  },

  limpa_cena(){
    pts = 0
    bullets = 5
    groupOrcs = []
    groupShoot = []    
  },

  click(){
    this.limpa_cena()
    mudaCena(menu)
  }
}

function main(){
  canvas.clearRect(0,0,1300,600)
  cenaCorrente.draw()
  cenaCorrente.update()
  requestAnimationFrame(main)
}

mudaCena(menu)
main()
