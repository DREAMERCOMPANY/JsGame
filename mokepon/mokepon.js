const sectionSeleccionarAtaque= document.getElementById('seleccionar-ataque');
const sectionReiniciar= document.getElementById('reiniciar');
const botonMascotaJugador= document.getElementById('boton-mascota');
const botonReiniciar = document.getElementById('boton-reiniciar');

const sectionSeleccionarMascota= document.getElementById('seleccionar-mascota');

const spanMascotaJugador= document.getElementById('mascota-jugador');

const spanMascotaEnemigo= document.getElementById('mascota-enemigo')

const spanVidasJugador= document.getElementById('vidas-jugador')
const spanVidasEnemigo= document.getElementById('vidas-enemigo');

const sectionMensajes= document.getElementById('resultado')
const ataquesDelJugador= document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo= document.getElementById('ataques-del-enemigo')
const contenedorTarjetas =document.getElementById('contenedorTarjetas')
const contenedorAtaques= document.getElementById('contenedorAtaques');

const sectionVerMapa= document.getElementById('ver-mapa')
const mapa= document.getElementById('mapa')

let jugadorId = null
let mokepones= [];
let mokeponesEnemigos= []
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let inputHipodogue;
let inputCapipepo;
let inputRatihueya;
let mascotaJugador;
let mascotaJugadorObjeto;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonFuego; 
let botones=[]
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let botonAgua;
let botonTierra;
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src= './Assets/mokemap.png'
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa= 350

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}
alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width= anchoDelMapa
mapa.height= alturaQueBuscamos

let vidasEnemigo = 3;
let vidasJugador = 3;

class Mokepon{
    constructor(nombre,foto,vida, fotoMapa, id = null ){
        this.id = id
        this.nombre = nombre
        this.foto= foto
        this.vida = vida
        this.ataques=[]
        this.ancho=40
        this.alto=40
        this.x=aleatorio(0, mapa.width - this.ancho)
        this.y=aleatorio(0, mapa.height - this.alto)
        this.mapaFoto= new Image()
        this.mapaFoto.src=fotoMapa
        this.velocidadX=0
        this.velocidadY=0

    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
            )
    }
}

let hipodogue = new Mokepon('Hipodogue', './Assets/hipodogue.png', 5 , './Assets/hipodoge_face.png');
let capipepo = new Mokepon('Capipepo', './Assets/capipepo.png', 5 , './Assets/capipepo_face.png') 
let ratihueya= new Mokepon('Ratihueya', './Assets/ratihueya.png', 5 , './Assets/ratigueya_face.png')


const HIPODOGE_ATAQUES = [
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥',  id: 'boton-fuego'},
    {nombre: '⛰️',  id: 'boton-tierra'} 
]

hipodogue.ataques.push(...HIPODOGE_ATAQUES)



const CAPIPEPO_ATAQUES =[
    {nombre: '⛰️',  id: 'boton-tierra'},
    {nombre: '⛰️',  id: 'boton-tierra'},
    {nombre: '⛰️',  id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥',  id: 'boton-fuego'} 
]
capipepo.ataques.push(...CAPIPEPO_ATAQUES)



const RATIHUEYA_ATAQUES= [
    {nombre: '🔥',  id: 'boton-fuego'},
    {nombre: '🔥',  id: 'boton-fuego'},
    {nombre: '🔥',  id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '⛰️',  id: 'boton-tierra'}
]

ratihueya.ataques.push(...RATIHUEYA_ATAQUES)

mokepones.push(hipodogue,capipepo,ratihueya);





function iniciarJuego(){
    sectionSeleccionarAtaque.style.display ='none';
    sectionVerMapa.style.display= 'none'

    mokepones.forEach((mokepon) =>{
        opcionDeMokepones= `
        <input type="radio" name="mascota" id=${mokepon.nombre}>
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones;

        inputHipodogue= document.getElementById('Hipodogue')
        inputCapipepo= document.getElementById('Capipepo');
        inputRatihueya= document.getElementById('Ratihueya');
    })


    sectionReiniciar.style.display='none'
    botonMascotaJugador.addEventListener('click' , seleccionarMascotaJugador);
    
    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function(res){
            
            if(res.ok){
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }

        })
}


function ataqueAleatorioEnemigo(){
    let ataqueAleatorio=aleatorio(0, ataquesMokeponEnemigo.length -1);

    if(ataqueAleatorio==0 || ataqueAleatorio==1){
        ataqueEnemigo.push('FUEGO')
    } else if(ataqueAleatorio==3 || ataqueAleatorio==4){
        ataqueEnemigo.push('AGUA')
    } else{
        ataqueEnemigo.push('TIERRA')
    }

    console.log(ataqueEnemigo)

    iniciarPelea();

    
}

function iniciarPelea(){
    if(ataqueJugador.length===5){
        combate()
    }
}

function indexAmbosOponentes(jugador,enemigo){

    indexAtaqueJugador= ataqueJugador[jugador]
    indexAtaqueEnemigo= ataqueEnemigo[enemigo]

}

function combate(){

    for(let index=0; index < ataqueJugador.length; index++){

        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes(index,index)
            crearMensaje("EMPATE 😊")
           
        } else if(ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA'){
            indexAmbosOponentes(index,index)
            crearMensaje("GANASTE 😊")
            victoriasJugador++
            spanVidasJugador.innerHTML= victoriasJugador
        }else if(ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO'){
            indexAmbosOponentes(index,index)
            crearMensaje("GANASTE 😊")
            victoriasJugador++
            spanVidasJugador.innerHTML= victoriasJugador
        }else if(ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA'){
            indexAmbosOponentes(index,index)
            crearMensaje("GANASTE 😊")
            victoriasJugador++
            spanVidasJugador.innerHTML= victoriasJugador
        }else{
            indexAmbosOponentes(index,index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
           spanVidasEnemigo.innerHTML= victoriasEnemigo

        }

    }
    revisarVidas()



}

function revisarVidas(){
    if(victoriasJugador===victoriasEnemigo){
        crearMensajeFinal("Esto fue un empate!")
    } else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("FELICITACIONES! , GANASTE! :)")
    }else{
        crearMensaje('Lo siento, perdiste :(')
    }
}



function crearMensaje(resultado){
    let nuevoAtaqueDelJugador= document.createElement('p');
    let nuevoAtaqueDelEnemigo= document.createElement('p');
    sectionMensajes.innerHTML= resultado;
    nuevoAtaqueDelJugador.innerHTML= indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML= indexAtaqueEnemigo;
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML= resultadoFinal
   
    sectionReiniciar.style.display='block'
}

function seleccionarMascotaJugador(){
    sectionSeleccionarMascota.style.display ='none';

    if(inputHipodogue.checked){
        spanMascotaJugador.innerHTML= inputHipodogue.id
        mascotaJugador=inputHipodogue.id
    } else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML=inputCapipepo.id
        mascotaJugador=inputCapipepo.id
    } else if(inputRatihueya.checked){
        spanMascotaJugador.innerHTML=inputRatihueya.id
        mascotaJugador=inputRatihueya.id
    } else{
        alert("Selecciona una mascota")
    }
    

    seleccionarMokepon(mascotaJugador)
    
    extraerAtaques(mascotaJugador);
    sectionVerMapa.style.display= 'flex';
    iniciarMapa()
   
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers :{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
        
}

function extraerAtaques(mascotaJugador){
    let ataques;
    for(let i=0; i < mokepones.length ; i++){
        if(mascotaJugador === mokepones[i].nombre){
            ataques= mokepones[i].ataques

        }
    }

    mostrarAtaques(ataques);

}

function mostrarAtaques(ataques){
    ataques.forEach((ataque)=>{
        ataquesMokepon= `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `

        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego =document.getElementById('boton-fuego')
    botonAgua= document.getElementById('boton-agua')
    botonTierra= document.getElementById('boton-tierra')
    botones= document.querySelectorAll('.BAtaque')

    
    
}

function secuenciaAtaque(){
   botones.forEach((boton) => {
    boton.addEventListener('click' ,(e) => {
        if(e.target.textContent=== '🔥'){

            ataqueJugador.push('FUEGO')
            console.log(ataqueJugador)
            boton.style.background = '#112f58'
            boton.disabled= true;


        } else if(e.target.textContent === '💧'){
            ataqueJugador.push('AGUA')
            console.log(ataqueJugador)
            boton.style.background = '#112f58'
            boton.disabled= true;

        } else{
            ataqueJugador.push('TIERRA')
            console.log(ataqueJugador)
            boton.style.background = '#112f58'
            boton.disabled= true;

        }

        ataqueAleatorioEnemigo()
    })
   })

  

}

function seleccionarMascotaEnemigo(){

    let mascotaAleatoria = aleatorio(0, mokepones.length -1);
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo= mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()

}

function reiniciarJuego(){

    location.reload()

}

function aleatorio(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas(){

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
        )
        mascotaJugadorObjeto.pintarMokepon()

        enviarPosicion(mascotaJugadorObjeto.x , mascotaJugadorObjeto.y)

        mokeponesEnemigos.forEach(function(mokepon){
            mokepon.pintarMokepon();
        })
        
        if(mascotaJugadorObjeto.velocidadX !==0 || mascotaJugadorObjeto.velocidadY !==0){
            revisarColision(hipodogueEnemigo)
            revisarColision(capipepoEnemigo)
            revisarColision(ratihueyaEnemigo)
        }

        
}

function enviarPosicion(x,y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res){
        if(res.ok){
            res.json()
                .then(function({enemigos}){
                    console.log(enemigos)
                    
                    mokeponesEnemigos = enemigos.map(function(enemigo){
                        let mokeponEnemigo = null
                        const mokeponNombre= enemigo.mokepon.nombre || ""
                        if(mokeponNombre === "Hipodogue"){
                             mokeponEnemigo = new Mokepon('Hipodogue', './Assets/hipodogue.png', 5 , './Assets/hipodoge_face.png');
                        }else if( mokeponNombre === "Capipepo"){
                             mokeponEnemigo = new Mokepon('Capipepo', './Assets/capipepo.png', 5 , './Assets/capipepo_face.png') 
                        }else if(mokeponNombre === "Ratihueya"){
                             mokeponEnemigo= new Mokepon('Ratihueya', './Assets/ratihueya.png', 5 , './Assets/ratigueya_face.png')

                        }

                        
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y

                        return mokeponEnemigo

                    })

                    
       
                    

                    
                })
        }
    })

}

function moverDerecha(){
    mascotaJugadorObjeto .velocidadX = 5
}

function moverIzquierda(){
    mascotaJugadorObjeto .velocidadX = -5
}

function moverAbajo(){
    mascotaJugadorObjeto .velocidadY = 5
}

function moverArriba(){
    
    mascotaJugadorObjeto .velocidadY = -5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX=0
    mascotaJugadorObjeto.velocidadY=0

}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba();
            break

        case 'ArrowDown':
            moverAbajo();
            break
        
        case 'ArrowLeft':
            moverIzquierda()
            break
        
        case 'ArrowRight':
            moverDerecha()
            break
    
        default:
            break
    }

}
function iniciarMapa(){
    
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50);

    window.addEventListener('keydown', sePresionoUnaTecla);
    window.addEventListener('keyup', detenerMovimiento);
}

function obtenerObjetoMascota(){
    for(let i=0; i < mokepones.length ; i++){
        if(mascotaJugador === mokepones[i].nombre){
            return mokepones[i]

        }
    }
}



function revisarColision(enemigo){const arribaEnemigo=enemigo.y
    const abajoEnemigo=enemigo.y+enemigo.alto
    const derechaEnemigo=enemigo.x+enemigo.ancho
    const izquierdaEnemigo=enemigo.x
    const arribaMascota=mascotaJugadorObjeto.y
    const abajoMascota=mascotaJugadorObjeto.y+mascotaJugadorObjeto.alto
    const derechaMascota=mascotaJugadorObjeto.x+mascotaJugadorObjeto.ancho
    const izquierdaMascota=mascotaJugadorObjeto.x
    if(abajoMascota<arribaEnemigo||arribaMascota>abajoEnemigo||derechaMascota<izquierdaEnemigo||izquierdaMascota>derechaEnemigo){return}
    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display ='flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo);
    
}

window.addEventListener('load', iniciarJuego);

