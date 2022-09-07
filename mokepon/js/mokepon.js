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

let mokepones= [];
let ataqueJugador;
let ataqueEnemigo;
let opcionDeMokepones;
let inputHipodogue;
let inputCapipepo;
let inputRatihueya;
let mascotaJugador;
let ataquesMokepon;
let botonFuego; 
let botonAgua;
let botonTierra;

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

mokepones.push(hipodogue,capipepo,ratihueya);





function iniciarJuego(){
    sectionSeleccionarAtaque.style.display ='none';

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
    
    extraerAtaques(mascotaJugador);
    seleccionarMascotaEnemigo();
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
        <button id=${ataque.id} class="boton-de-ataque">${ataque.nombre}</button>
        `

        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego =document.getElementById('boton-fuego')
    botonAgua= document.getElementById('boton-agua')
    botonTierra= document.getElementById('boton-tierra')

    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra);
    





}

function seleccionarMascotaEnemigo(){

    let mascotaAleatoria = aleatorio(0, mokepones.length -1);
    
   
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre

}

function reiniciarJuego(){

    location.reload()

}

function aleatorio(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}


window.addEventListener('load', iniciarJuego);

