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
  document.addEventListener('keydown',(e)=>{
    if(cenaCorrente.inicio){
        cenaCorrente.inicio(e)
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

let audio1 = new Audio("assets/audios/musica1.mp3")
let audio3 = new Audio("assets/audios/game_over.wav")
let audio4 = new Audio("assets/audios/shot.mp3")
let audio5 = new Audio("assets/audios/you_win.wav")

let bullets = 15
let pts = 0
let vida = 5


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

let groupEnemy = []
let enemys ={
  time : 0,
  spawEnemys(){
    this.time +=10
    // size_X = Math.random() * (100 - 80) + 80
    // size_Y = Math.random() * (140 - 80) + 80
    pos_Y = Math.random() * (460 - 200) + 200 
    if(this.time>=1000  ){
      groupEnemy.push(new Enemy(1400, pos_Y, 100, 150, "Assets/esq1.png"))
        // pos y minimo = 460
        // 290

      this.time=0
    }
  },
  destroyEnemy(){
    groupShoot.forEach((shoot)=>{
     groupEnemy.forEach((enemy)=>{
        if(shoot.collide(enemy)){
          groupShoot.splice(groupShoot.indexOf(shoot),1)
          groupEnemy.splice(groupEnemy.indexOf(enemy),1)
          bullets = 15
          pts += 10
        }
      })
    })
  },

  draw(){
    groupEnemy.forEach((enemy)=>{
      enemy.draw()
    })
  },
  update(){
    this.spawEnemys()
    this.destroyEnemy()
      groupEnemy.forEach((enemy)=>{
      enemy.move()
      enemy.anim('esq')
      if(enemy.x < 440 ){
        groupEnemy.splice(groupEnemy.indexOf(enemy),1)
        vida -= 1
      }
      else if(vida <= 0){
        mudaCena(gameOver)
      }
    
    })
  }
}
let enemys2 ={
  time : 0,
  spawEnemys(){
    this.time +=10
    // size_X = Math.random() * (100 - 80) + 80
    // size_Y = Math.random() * (140 - 80) + 80
    pos_Y = Math.random() * (460 - 200) + 200 
    if(this.time>=1000  ){
      groupEnemy.push(new Enemy(1400, pos_Y, 100, 180, "Assets/demo1.png"))
        // pos y minimo = 460
        // 290

      this.time=0
    }
  },
  destroyEnemy(){
    groupShoot.forEach((shoot)=>{
     groupEnemy.forEach((enemy)=>{
        if(shoot.collide(enemy)){
          groupShoot.splice(groupShoot.indexOf(shoot),1)
          groupEnemy.splice(groupEnemy.indexOf(enemy),1)
          bullets = 15
          pts += 10
      
        }
      })
    })
  },

  draw(){
    groupEnemy.forEach((enemy)=>{
      enemy.draw()
    })
  },
  update(){
    this.spawEnemys()
    this.destroyEnemy()
      groupEnemy.forEach((enemy)=>{
      enemy.move()
      enemy.anim2('demo')
      if(enemy.x < 440 ){
        groupEnemy.splice(groupEnemy.indexOf(enemy),1)
        vida -= 1
      }
      else if(vida <= 0){
        mudaCena(gameOver)
      }
    
    })
  }
}

let enemys3 ={
  time : 0,
  spawEnemys(){
    this.time +=10
    // size_X = Math.random() * (100 - 80) + 80
    // size_Y = Math.random() * (140 - 80) + 80
    pos_Y = Math.random() * (460 - 200) + 200 
    if(this.time>=1000  ){
      groupEnemy.push(new Enemy(1400, pos_Y, 80, 150, "Assets/robo1.png"))
        // pos y minimo = 460
        // 290

      this.time=0
    }
  },
  destroyEnemy(){
    groupShoot.forEach((shoot)=>{
     groupEnemy.forEach((enemy)=>{
        if(shoot.collide(enemy)){
          groupShoot.splice(groupShoot.indexOf(shoot),1)
          groupEnemy.splice(groupEnemy.indexOf(enemy),1)
          bullets = 15
          pts += 10
    
        }
      })
    })
  },

  draw(){
    groupEnemy.forEach((enemy)=>{
      enemy.draw()
    })
  },
  update(){
    this.spawEnemys()
    this.destroyEnemy()
      groupEnemy.forEach((enemy)=>{
      enemy.move()
      enemy.anim('robo')
      if(enemy.x < 440 ){
        groupEnemy.splice(groupEnemy.indexOf(enemy),1)
        vida -= 1
      }
      else if(vida <= 0){
        mudaCena(gameOver)
      }
    })
  }
}
let bgmenu = {
  bg: new Obj(0,0,1300,600,"assets/backgrounds/menu.jpeg"),

  draw(){
    this.bg.draw()
  },
}
let bggame_over = {
  bg: new Obj(0,0,1300,600,"assets/Backgrounds/game_over.jpg"),

  draw(){
    this.bg.draw()
  },
}

let bgend_game = {
  bg: new Obj(0,0,1300,600,"assets/Backgrounds/end_game.jpg"),

  draw(){
    this.bg.draw()
  },
}

let logo = {
  bg: new Obj(400,50,500,262,"assets/backgrounds/logo.png"),

  draw(){
    this.bg.draw()
  },
}

let you_lose = {
  bg: new Obj(400,50,500,500,"assets/backgrounds/you_lose.png"),

  draw(){
    this.bg.draw()
  },
}

let you_won = {
  bg: new Obj(400,50,500,500,"assets/backgrounds/you_won.png"),

  draw(){
    this.bg.draw()
  },
}


let city = {
  bg: new Obj(0,0,1300,600,"assets/backgrounds/fase1.png"),

  draw(){
    this.bg.draw()  
  },
  next_level(){
    if(pts >= 50){
      mudaCena(fase2)
    }
  }
}

let graveyard = {
  bg: new Obj(0,0,1300,600,"assets/backgrounds/fase2.png"),

  draw(){
    this.bg.draw()
  },
  next_level(){
    if(pts >= 100){
      mudaCena(fase3)
    }
  }
}

let desert = {
  bg: new Obj(0,0,1300,600,"assets/backgrounds/fase2.png"),

  draw(){
    this.bg.draw()
  },
  next_level(){
    if(pts >= 150){
      mudaCena(end_game)
    }
  }
}



let menu = {
  
  titulo2: new Text("Aperte Espaço Para Iniciar"),
  
  inicio(event){
    if (event.key == " "){
      mudaCena(fase1);
      console.log()
    }
  },

  draw(){

    bgmenu.draw()
    logo.draw()
    this.titulo2.draw_text(40,"Verdana",420,400,"white")
  },
  update(){
  },
}

let lore1 = {}

let fase1 = {
  placar_txt: new Text("Pontos: "),
  placar: new Text(pts),
  vida_txt: new Text("Vida: "),
  vida: new Text(vida),

  hero: new Obj(30,300,100,150, "assets/hero/hero1.png"),


  click(){
    audio4.play()
    if(bullets > 0){
      bullets -= 1
      groupShoot.push(new Shoot(165,(this.hero.y+this.hero.height/2)+25,20,10, "assets/hero/bullet.jpg"))
    }
  },
  
  movehero(event){
    const speed = 50;
    if (event.key === "a" && this.hero.x > 50) {
        this.hero.x -= speed;
      } else if (event.key === "d" && this.hero.x < 440 - this.hero.width) {
        this.hero.x += speed;
      } else if (event.key === "w" && this.hero.y > 200 ) {
        this.hero.y -= speed;
      } else if (event.key === "s" && this.hero.y < 550 - this.hero.height) {
        this.hero.y += speed;
      }
      console.log(event)
    },

  draw(){
    city.draw()
    this.placar_txt.draw_text(30,"Tahoma",1100,50,"white")
    this.placar.draw_text(30,"Tahoma",1210,50,"white")
    this.vida_txt.draw_text(30,"Tahoma",100,50,"white")
    this.vida.draw_text(30,"Tahoma",230,50,"white")
    this.hero.draw()
    muro.draw()
    shoots.draw()
    enemys.draw()
    audio1.play()   
  },
  limpa_cena(){
    bullets = 15
    vida = 5
    groupEnemy = []
    groupShoot = [] 
  },
  update(){
    shoots.update()
    enemys.update()
    enemys.update('robo')
    this.placar.update_text(pts)
    this.vida.update_text(vida)
    if (pts >= 50) {
      this.limpa_cena()
      city.next_level();
  } 
}
}

let lore2 = {}

let fase2 = {
  
  placar_txt: new Text("Pontos: "),
  placar: new Text(pts),
  vida_txt: new Text("Vida: "),
  vida: new Text(vida),
  hero: new Obj(30,300,100,150, "assets/hero/hero1.png"),


  limpa_cena(){
    bullets = 15
    vida = 5
    groupEnemy = []
    groupShoot = []
  },

  click(){
    audio4.play()
    if(bullets > 0){
      bullets -= 1
      groupShoot.push(new Shoot(165,(this.hero.y+this.hero.height/2)+25,20,10, "assets/hero/bullet.jpg"))
    }
  },
  
  movehero(event){
    const speed = 50;
    if (event.key === "a" && this.hero.x > 50) {
        this.hero.x -= speed;
      } else if (event.key === "d" && this.hero.x < 440 - this.hero.width) {
        this.hero.x += speed;
      } else if (event.key === "w" && this.hero.y > 150 ) {
        this.hero.y -= speed;
      } else if (event.key === "s" && this.hero.y < 550 - this.hero.height) {
        this.hero.y += speed;
      }
      console.log(event)
    },

  draw(){
    graveyard.draw()
    this.placar_txt.draw_text(30,"Tahoma",1100,50,"white")
    this.placar.draw_text(30,"Tahoma",1210,50,"white")
    this.vida_txt.draw_text(30,"Tahoma",100,50,"white")
    this.vida.draw_text(30,"Tahoma",230,50,"white")
    this.hero.draw()
    muro.draw()
    shoots.draw()
    enemys2.draw()
  },
  update(){
    shoots.update()
    enemys2.update()
    enemys2.update('esq')
    this.placar.update_text(pts)
    this.vida.update_text(vida)
    if (pts >= 100) {
      this.limpa_cena()
      graveyard.next_level();
  } 
  },
}

let lore3 = {}

let fase3 = {
  
  placar_txt: new Text("Pontos: "),
  placar: new Text(pts),
  vida_txt: new Text("Vida: "),
  vida: new Text(vida),
  hero: new Obj(30,300,100,150, "assets/hero/hero1.png"),

  limpa_cena(){
    bullets = 15
    vida = 0
    groupEnemy = []
    groupShoot = []  
  },
  

  click(){
    audio4.play()
    if(bullets > 0){
      bullets -= 1
      groupShoot.push(new Shoot(165,(this.hero.y+this.hero.height/2)+25,20,10, "assets/hero/bullet.jpg"))
    }
  },
  
  movehero(event){
    const speed = 50;
    if (event.key === "a" && this.hero.x > 50) {
        this.hero.x -= speed;
      } else if (event.key === "d" && this.hero.x < 440 - this.hero.width) {
        this.hero.x += speed;
      } else if (event.key === "w" && this.hero.y > 150 ) {
        this.hero.y -= speed;
      } else if (event.key === "s" && this.hero.y < 550 - this.hero.height) {
        this.hero.y += speed;
      }
      console.log(event)
    },

  draw(){
    desert.draw()
    this.placar_txt.draw_text(30,"Tahoma",1100,50,"white")
    this.placar.draw_text(30,"Tahoma",1210,50,"white")
    this.vida_txt.draw_text(30,"Tahoma",100,50,"white")
    this.vida.draw_text(30,"Tahoma",230,50,"white")
    this.hero.draw()
    enemys3.draw()
    muro.draw()
    shoots.draw()

  },
  update(){
    shoots.update()
    enemys3.update()
    enemys3.update('robo')
    this.placar.update_text(pts)
    this.vida.update_text(vida)
    if (pts >= 150) {
      this.limpa_cena()
      desert.next_level();
  } 
  },
}

let lorelost = {}

let gameOver = {
  placar_txt: new Text("Pontos: "),
  placar: new Text(pts),

  draw(){
    bggame_over.draw()
    you_lose.draw()
    this.placar_txt.draw_text(30,"Tahoma",1100,50,"black")
    audio1.pause()
    audio3.play()

  },
  update(){
    this.placar.update_text(pts)
  },

  limpa_cena(){
    pts = 0
    bullets = 15
    vida = 5
    groupEnemy = []
    groupShoot = []    
  },

  inicio(event){
    if (event.key == " "){
    this.limpa_cena()
    mudaCena(menu)
  }
}
}

let lorewon = {}

let end_game = {
  placar_txt: new Text("Pontos: "),
  placar: new Text(pts),
  titulo2: new Text("Aperte Espaço Para Reiniciar"),

  draw(){
    bgend_game.draw()
    you_won.draw()
    this.placar_txt.draw_text(30,"Tahoma",1100,50,"black")
    this.placar.draw_text(30,"Tahoma",1210,50,"black")
    this.titulo2.draw_text(40,"Verdana",420,400,"black")
    audio1.pause()
    audio5.play()

  },
  update(){
    this.placar.update_text(pts)
  },

  limpa_cena(){
    pts = 0
    bullets = 15
    vida = 5
    groupEnemy = []
    groupShoot = []    
  },

  inicio(event){
    if (event.key == " "){
    this.limpa_cena()
    mudaCena(menu)
  }
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
