const sectionSeleccionarAtaque= document.getElementById('seleccionar-ataque');
const sectionReiniciar= document.getElementById('reiniciar');
const botonMascotaJugador= document.getElementById('boton-mascota');
const botonFuego =document.getElementById('boton-fuego')
const botonAgua= document.getElementById('boton-agua')
const botonTierra= document.getElementById('boton-tierra')
const botonReiniciar = document.getElementById('boton-reiniciar');

const sectionSeleccionarMascota= document.getElementById('seleccionar-mascota');
const inputHipodogue= document.getElementById('hipodogue')
const inputCapipepo= document.getElementById('capipepo');
const inputRatihueya= document.getElementById('ratihueya');
const spanMascotaJugador= document.getElementById('mascota-jugador');

const spanMascotaEnemigo= document.getElementById('mascota-enemigo')

const spanVidasJugador= document.getElementById('vidas-jugador')
const spanVidasEnemigo= document.getElementById('vidas-enemigo');

const sectionMensajes= document.getElementById('resultado')
const ataquesDelJugador= document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo= document.getElementById('ataques-del-enemigo')

let mokepones= [];
let ataqueJugador;
let ataqueEnemigo;
let vidasEnemigo = 3;
let vidasJugador = 3;

class Mokepon{
    constructor(nombre,foto,vida){
        this.nombre = nombre
        this.foto= foto
        this.vida = vida
        this.ataques=[]
    }
}

let hipodogue = new Mokepon('Hipodogue', './Assets/hipodogue.png', 5);
let capipepo = new Mokepon('Capipepo', './Assets/capipepo.png', 5) 
let ratihueya= new Mokepon('Ratihueya', './Assets/ratihueya.png', 5)

hipodogue.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥',  id: 'boton-fuego'},
    {nombre: '⛰️',  id: 'boton-tierra'}
    
)

capipepo.ataques.push(
    {nombre: '⛰️',  id: 'boton-tierra'},
    {nombre: '⛰️',  id: 'boton-tierra'},
    {nombre: '⛰️',  id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥',  id: 'boton-fuego'} 
)

ratihueya.ataques.push(
    {nombre: '🔥',  id: 'boton-fuego'},
    {nombre: '🔥',  id: 'boton-fuego'},
    {nombre: '🔥',  id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '⛰️',  id: 'boton-tierra'}
    
)





function iniciarJuego(){
    sectionSeleccionarAtaque.style.display ='none';
    sectionReiniciar.style.display='none'
    botonMascotaJugador.addEventListener('click' , seleccionarMascotaJugador);
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra);
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function ataqueFuego(){
    ataqueJugador= 'FUEGO'
    ataqueAleatorioEnemigo();
}

function ataqueAgua(){
    ataqueJugador= 'AGUA'
    ataqueAleatorioEnemigo();
}

function ataqueTierra(){
    ataqueJugador= 'TIERRA'
    ataqueAleatorioEnemigo();
}
function ataqueAleatorioEnemigo(){
    let ataqueAleatorio=aleatorio(1,3);

    if(ataqueAleatorio==1){
        ataqueEnemigo='FUEGO'
    } else if(ataqueAleatorio==2){
        ataqueEnemigo='AGUA'
    } else{
        ataqueEnemigo='TIERRA'
    }

    combate(); 
}

function combate(){
    if(ataqueEnemigo == ataqueJugador){
        crearMensaje("EMPATE 😊")
    }
    else if( ataqueJugador== 'FUEGO' && ataqueEnemigo== 'TIERRA'){
        crearMensaje("GANASTE 🎉")
        vidasEnemigo = vidasEnemigo -1
        spanVidasEnemigo.innerHTML= vidasEnemigo;
    }
    else if(ataqueJugador== 'AGUA' && ataqueEnemigo == 'FUEGO'){
        crearMensaje("GANASTE 🎉")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML= vidasEnemigo;
    }
    else if(ataqueJugador=='TIERRA' && ataqueEnemigo== 'AGUA'){
        crearMensaje("GANASTE 🎉")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML= vidasEnemigo;
    }
    else{
        crearMensaje("PERDISTE 😣")
        vidasJugador = vidasJugador -1;
        spanVidasJugador.innerHTML= vidasJugador;
    }

    revisarVidas()



}

function revisarVidas(){
    if(vidasEnemigo==0){
        crearMensajeFinal("!Felicitaciones! GANASTE 🎉🎉")
    } else if(vidasJugador==0){
        crearMensajeFinal("lo siento, Perdiste 🙁")
    }
}



function crearMensaje(resultado){
    let nuevoAtaqueDelJugador= document.createElement('p');
    let nuevoAtaqueDelEnemigo= document.createElement('p');
    sectionMensajes.innerHTML= resultado;
    nuevoAtaqueDelJugador.innerHTML= ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML= ataqueEnemigo;
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML= resultadoFinal
    botonFuego.disabled= true
    botonAgua.disabled= true
    botonTierra.disabled=true 
    sectionReiniciar.style.display='block'
}

function seleccionarMascotaJugador(){
    sectionSeleccionarMascota.style.display ='none';
    sectionSeleccionarAtaque.style.display ='flex';

    if(inputHipodogue.checked){
        spanMascotaJugador.innerHTML='Hipodogue'
    } else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML='Capipepo'
    } else if(inputRatihueya.checked){
        spanMascotaJugador.innerHTML='Ratihueya'
    } else{
        alert("Selecciona una mascota")
    }
    
    seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo(){

    let mascotaAleatorio = aleatorio(1,3);
    
    if(mascotaAleatorio==1){
        spanMascotaEnemigo.innerHTML="Hipodogue"
    } else if(mascotaAleatorio==2){
        spanMascotaEnemigo.innerHTML= "Capipepo"
    }else{
        spanMascotaEnemigo.innerHTML="Ratihueya"
    }


}

function reiniciarJuego(){

    location.reload()

}

function aleatorio(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}


window.addEventListener('load', iniciarJuego);

