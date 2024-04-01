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
  document.addEventListener('keydown',(e)=>{
    if(cenaCorrente.infinity_game){
        cenaCorrente.infinity_game(e)
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
    groupMuro.push(new Obj(450,240,80,120,'assets/wall/wall3.png')),
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
let enemy_count = 0
let enemys ={
  time : 0,
  spawEnemys(){
    this.time +=10
    // size_X = Math.random() * (100 - 80) + 80
    // size_Y = Math.random() * (140 - 80) + 80
    pos_Y = Math.random() * (460 - 250) + 250 
    if(this.time>=500 && enemy_count<30 ){
      groupEnemy.push(new Enemy(1300, pos_Y, 100, 150, "Assets/esq1.png"))
      enemy_count += 1
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
    if(this.time>=250  && enemy_count<55 ){
      groupEnemy.push(new Enemy(1300, pos_Y, 100, 180, "Assets/demo1.png"))
      enemy_count += 1
    
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
    if(this.time>=250  && enemy_count<105 ){
      groupEnemy.push(new Enemy(1300, pos_Y, 80, 150, "Assets/robo1.png"))
      enemy_count += 1
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
  bg: new Obj(1,2,1300,600,"assets/backgrounds/menu2.png"),

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
  lore: new Obj(1,2,1300,600,"assets/backgrounds/lore_robo.png"),

  draw(){
    this.bg.draw()  
  },
  draw_lore(){
    this.lore.draw()
  },
  next_level(){
    if(pts >= 1750){
      mudaCena(end_game)
    }
  }
}

let graveyard = {
  bg: new Obj(0,0,1300,600,"assets/backgrounds/fase2.png"),
  lore: new Obj(1,2,1300,600,"assets/backgrounds/lore_demon.png"),
  draw(){
    this.bg.draw()
  },
  draw_lore(){
    this.lore.draw()
  },
  next_level(){
    if(pts >= 7/50){
      mudaCena(lore3)
    }
  }
}

let apocalypse = {
  bg: new Obj(0,0,1300,600,"assets/backgrounds/fase3.png"),
  lore: new Obj(1,2,1300,600,"assets/backgrounds/lore_esq.png"),
  draw(){
    this.bg.draw()
  },
  draw_lore(){
    this.lore.draw()
  },
  next_level(){
    if(pts >= 250){
      mudaCena(lore2)
    }
  }
}



let menu = {
  
  titulo2: new Text("Aperte Espaço Para Iniciar o modo História"),
  titulo3: new Text("Aperte F Para Iniciar o modo Infinito"),
  
  inicio(event){
    if (event.key == " "){
      mudaCena(menu2);
      console.log()
    }
  },

  infinity_game(event){
    if (event.key == "f"){
      mudaCena(infinity_game);
    }
  },

  draw(){
    bgmenu.draw()
    logo.draw()
    this.titulo2.draw_text(40,"Verdana",250,400,"white")
    this.titulo3.draw_text(40,"Verdana",300,450,"white")
    menu_music.play()
  },
  update(){
  },
}
let menu2 = {
  
  inicio(event){
    if (event.key == " "){
      mudaCena(lore1);
      console.log()
    }
  },

  draw(){
    bgmenu2.draw()
  },
  update(){
  },
}

let lore1 = {  
  inicio(event){
    if (event.key == " "){
      mudaCena(fase1);
      console.log()
    }
  },

  draw(){
    apocalypse.draw_lore()
  },
  update(){
  },}

let fase1 = {
  placar_txt: new Text("Pontos: "),
  placar: new Text(pts),
  vida_txt: new Text("Vida: "),
  vida: new Text(vida),

  hero: new Obj(30,300,100,150, "assets/hero/hero1.png"),


  click(){
    shoot_audio.play()
    this.hero.anim_hero('Shot')
    if(bullets > 0){
      bullets -= 1
      groupShoot.push(new Shoot((this.hero.x)+90,(this.hero.y+this.hero.height/2)+10,20,10, "assets/hero/bullet.jpg"))
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
    enemy_count = 0
    bullets = 2
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
    if (pts >= 250) {
      this.limpa_cena()
      apocalypse.next_level();
  } 
}
}

let lore2 = {  
  inicio(event){
  if (event.key == " "){
    mudaCena(fase2);
    console.log()
  }
},

draw(){
  robot_music.pause()   
  graveyard.draw_lore()
  menu_music.play()
},
update(){
},}

let fase2 = {
  
  placar_txt: new Text("Pontos: "),
  placar: new Text(pts),
  vida_txt: new Text("Vida: "),
  vida: new Text(vida),
  hero: new Obj(30,300,100,150, "assets/hero/hero1.png"),


  limpa_cena(){
    enemy_count = 0
    bullets = 2
    vida = 5
    groupEnemy = []
    groupShoot = []
  },

  click(){
    shoot_audio.play()
    this.hero.anim_hero('Shot')
    if(bullets > 0){
      bullets -= 1
      groupShoot.push(new Shoot((this.hero.x)+90,(this.hero.y+this.hero.height/2)+10,20,10, "assets/hero/bullet.jpg"))
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
    menu_music.pause()
    demon_music.play()

  },
  update(){
    shoots.update()
    enemys2.update()
    enemys2.update('demo')
    this.placar.update_text(pts)
    this.vida.update_text(vida)
    if (pts >= 750) {
      this.limpa_cena()
      graveyard.next_level();
  } 
  },
}

let lore3 = {inicio(event){
  if (event.key == " "){
    mudaCena(fase3);
    console.log()
  }
},

draw(){
  demon_music.pause()
  city.draw_lore()
  menu_music.play()
},
update(){
},}

let fase3 = {
  
  placar_txt: new Text("Pontos: "),
  placar: new Text(pts),
  vida_txt: new Text("Vida: "),
  vida: new Text(vida),
  hero: new Obj(30,300,100,150, "assets/hero/hero1.png"),

  limpa_cena(){
    enemy_count = 0
    bullets = 2
    vida = 0
    groupEnemy = []
    groupShoot = []  
  },
  

  click(){
    shoot_audio.play()
    this.hero.anim_hero('Shot')
    if(bullets > 0){
      bullets -= 1
      groupShoot.push(new Shoot((this.hero.x)+90,(this.hero.y+this.hero.height/2)+10,20,10, "assets/hero/bullet.jpg"))
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
    menu_music.pause()
    esq_music.play()

  },
  update(){
    shoots.update()
    enemys3.update()
    enemys3.update('robo')
    this.placar.update_text(pts)
    this.vida.update_text(vida)
    if (pts >= 1750) {
      this.limpa_cena()
      city.next_level();
  } 
  },
}

let infinity_game = {
  
  placar_txt: new Text("Pontos: "),
  placar: new Text(pts),
  vida_txt: new Text("Vida: "),
  vida: new Text(vida),
  hero: new Obj(30,300,100,150, "assets/hero/hero1.png"),

  limpa_cena(){
    enemy_count = 0
    bullets = 2
    vida = 0
    groupEnemy = []
    groupShoot = []  
  },
  

  click(){
    enemy_count = 0
    shoot_audio.play()
    this.hero.anim_hero('Shot')
    if(bullets > 0){
      bullets -= 1
      groupShoot.push(new Shoot((this.hero.x)+90,(this.hero.y+this.hero.height/2)+10,20,10, "assets/hero/bullet.jpg"))
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
    menu_music.pause()
    esq_music.play()

  },
  update(){
    shoots.update()
    enemys3.update()
    enemys3.update('robo')
    this.placar.update_text(pts)
    this.vida.update_text(vida)
  },
}

let lorelost = {}

let gameOver = {
  placar: new Text(pts),
  titulo2: new Text("Aperte Espaço Para Reiniciar"),

  draw(){
    bggame_over.draw()
    you_lose.draw()
    this.titulo2.draw_text(40,"Verdana",420,400,"white")
    robot_music.pause()
    esq_music.pause()
    demon_music.pause()
    game_over_audio.play()

  },
  update(){
    this.placar.update_text(pts)
  },

  limpa_cena(){
    enemy_count = 0
    pts = 0
    bullets = 2
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
  titulo2: new Text("Aperte Espaço Para Reiniciar"),

  draw(){
    bgend_game.draw()
    you_won.draw()
    this.titulo2.draw_text(40,"Verdana",420,400,"white")
    robot_music.pause()
    esq_music.pause()
    demon_music.pause()
    you_win_audio.play()

  },
  update(){
    this.placar.update_text(pts)
  },

  limpa_cena(){
    enemy_count = 0
    pts = 0
    bullets = 2
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
