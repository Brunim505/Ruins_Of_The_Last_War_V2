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

let robot_music = new Audio("assets/audios/robot_music.mp3")
let esq_music = new Audio("assets/audios/esq_music.mp3")
let demon_music = new Audio("assets/audios/demon_music.mp3")
let menu_music = new Audio("assets/audios/menu_music.mp3")
let game_over_audio = new Audio("assets/audios/game_over.wav")
let shoot_audio = new Audio("assets/audios/shot.mp3")
let you_win_audio = new Audio("assets/audios/you_win.wav")

let bullets = 2
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
    groupMuro.push(new Obj(450,310,80,120,'assets/wall/wall2.png')),
    groupMuro.push(new Obj(450,380,80,120,'assets/wall/wall2.png')),
    groupMuro.push(new Obj(450,450,80,120,'assets/wall/wall3.png')),
    groupMuro.push(new Obj(450,520,80,120,'assets/wall/wall3.png'))

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
    pos_Y = Math.random() * (460 - 250) + 250 
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
          bullets = 2
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
    if(this.time>=500  ){
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
          bullets = 2
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
    if(this.time>=250  ){
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
          bullets = 2
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
let bgmenu2 = {
  bg: new Obj(0,0,1300,600,"assets/backgrounds/menu2.png"),

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
    if(pts >= 300){
      mudaCena(end_game)
    }
  }
}

let graveyard = {
  bg: new Obj(0,0,1300,600,"assets/backgrounds/fase2.png"),

  draw(){
    this.bg.draw()
  },
  next_level(){
    if(pts >= 200){
      mudaCena(fase3)
    }
  }
}

let apocalypse = {
  bg: new Obj(0,0,1300,600,"assets/backgrounds/fase3.png"),

  draw(){
    this.bg.draw()
  },
  next_level(){
    if(pts >= 100){
      mudaCena(fase2)
    }
  }
}



let menu = {
  
  titulo2: new Text("Aperte Espaço Para Iniciar"),
  
  inicio(event){
    if (event.key == " "){
      mudaCena(menu2);
      console.log()
    }
  },

  draw(){
    bgmenu.draw()
    logo.draw()
    this.titulo2.draw_text(40,"Verdana",420,400,"white")
    menu_music.play()
  },
  update(){
  },
}
let menu2 = {
  
  inicio(event){
    if (event.key == " "){
      mudaCena(fase1);
      console.log()
    }
  },

  draw(){
    bgmenu2.draw()
    menu_music.play()
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
    shoot_audio.play()
    if(bullets > 0){
      bullets -= 1
      groupShoot.push(new Shoot(165,(this.hero.y+this.hero.height/2)+10,20,10, "assets/hero/bullet.jpg"))
    }
  },
  
  movehero(event){
    const speed = 50;
    if (event.key === "a" && this.hero.x > 50) {
        this.hero.x -= speed;
      } else if (event.key === "d" && this.hero.x < 440 - this.hero.width) {
        this.hero.x += speed;
      } else if (event.key === "w" && this.hero.y > 250 ) {
        this.hero.y -= speed;
      } else if (event.key === "s" && this.hero.y < 600 - this.hero.height) {
        this.hero.y += speed;
      }
      console.log(event)
    },

  draw(){
    apocalypse.draw()
    this.placar_txt.draw_text(30,"Tahoma",1100,50,"white")
    this.placar.draw_text(30,"Tahoma",1210,50,"white")
    this.vida_txt.draw_text(30,"Tahoma",100,50,"white")
    this.vida.draw_text(30,"Tahoma",230,50,"white")
    this.hero.draw()
    muro.draw()
    shoots.draw()
    enemys.draw()
    menu_music.pause()
    robot_music.play()   
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
    enemys.update('esq')
    this.placar.update_text(pts)
    this.vida.update_text(vida)
    if (pts >= 100) {
      this.limpa_cena()
      apocalypse.next_level();
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
    shoot_audio.play()
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
    robot_music.pause()
    demon_music.play()
  },
  update(){
    shoots.update()
    enemys2.update()
    enemys2.update('demo')
    this.placar.update_text(pts)
    this.vida.update_text(vida)
    if (pts >= 200) {
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
    shoot_audio.play()
    if(bullets > 0){
      bullets -= 1
      groupShoot.push(new Shoot(165,(this.hero.y+this.hero.height/2)+0,20,10, "assets/hero/bullet.jpg"))
    }
  },
  
  movehero(event){
    const speed = 50;
    if (event.key === "a" && this.hero.x > 50) {
        this.hero.x -= speed;
      } else if (event.key === "d" && this.hero.x < 440 - this.hero.width) {
        this.hero.x += speed;
      } else if (event.key === "w" && this.hero.y > 210 ) {
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
    enemys3.draw()
    muro.draw()
    shoots.draw()
    demon_music.pause()
    esq_music.play()

  },
  update(){
    shoots.update()
    enemys3.update()
    enemys3.update('robo')
    this.placar.update_text(pts)
    this.vida.update_text(vida)
    if (pts >= 300) {
      this.limpa_cena()
      city.next_level();
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
    robot_music.pause()
    esq_music.pause()
    demon_music.pause()
    game_over_audio.play()

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
    robot_music.pause()
    esq_music.pause()
    demon_music.pause()
    you_win_audio.play()

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
