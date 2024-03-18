var canvas = document.getElementById('canvas').getContext("2d")
canvas.imageSmoothingEnabled = false

  document.addEventListener("click", (e)=>{
    if(cenaCorrente.click){
      cenaCorrente.click()
    }
  });

  document.addEventListener('keydown',(e)=>{
    if(cenaCorrente.moveHeroi){
        cenaCorrente.moveHeroi(e)
    }
})
document.addEventListener('keyup', (e)=>{
    if(cenaCorrente.moveHeroi){
        cenaCorrente.moveHeroi(e)
    }
})

let cenaCorrente = {}
function mudaCena(cena){  
  cenaCorrente = cena
}

let bullets = 5
let pts = 0


let groupShoot = []
let shoots = {
  draw(){
    groupShoot.forEach((shoot)=>{
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

let groupOrcs = []
let orcs ={
  time : 0,
  spawOrcs(){
    this.time +=1
    size_X = Math.random() * (100 - 80) + 80
    size_Y = Math.random() * (140 - 80) + 80
    pos_Y = Math.random() *(500 - 80) + 80
    if(this.time>=60){
      groupOrcs.push(new Orcs(1400, pos_Y, size_X, size_Y, "assets/orc2.png"))
      this.time=0
    }
  },
  destroyOrcs(){
    groupShoot.forEach((shoot)=>{
      groupOrcs.forEach((orc)=>{
        if(shoot.collide(orc)){
          groupShoot.splice(groupShoot.indexOf(shoot),1)
          groupOrcs.splice(groupOrcs.indexOf(orc),1)
          bullets = 5
          pts += 5
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
      if(orc.x < -100){
        groupOrcs.splice(groupOrcs.indexOf(orc),1)
        mudaCena(gameOver)
      }
    })
  }
}

let menu = {
  
  titulo: new Text("Skull-Wave"),   
  titulo2: new Text("Click para Iniciar"),
  heroi: new Obj(30,380,80,120, "assets/heroi1.png"),
  
  click(){
    mudaCena(game)
  },

  draw(){
    this.titulo.draw_text(80,"Tahoma",420,200,"darkolivegreen")
    this.titulo2.draw_text(40,"Verdana",420,400,"white")
    this.heroi.draw()
  },
  update(){
  },
}

let game = {
  placar_txt: new Text("Pontos: "),
  placar: new Text(pts),
  heroi: new Obj(30,200,80,120, "assets/heroi1.png"),


  click(){
    if(bullets > 0){
      bullets -= 1
      groupShoot.push(new Shoot(this.heroi.x,(this.heroi.y+this.heroi.height/2)-30,18,8, "assets/tiro5.png"))
    }
  },
  
  moveHeroi(event){
    const speed = 40;
    if (event.key === "a" && this.heroi.x > 0) {
        this.heroi.x -= speed;
      } else if (event.key === "d" && this.heroi.x < canvas.canvas.width - this.heroi.width) {
        this.heroi.x += speed;
      } else if (event.key === "w" && this.heroi.y > 0) {
        this.heroi.y -= speed;
      } else if (event.key === "s" && this.heroi.y < canvas.canvas.height - this.heroi.height) {
        this.heroi.y += speed;
      }
      console.log(event)
    },

  draw(){
    this.placar_txt.draw_text(30,"Tahoma",1100,50,"white")
    this.placar.draw_text(30,"Tahoma",1210,50,"white")
    this.heroi.draw()
    shoots.draw()
    orcs.draw()   
  },
  update(){
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
