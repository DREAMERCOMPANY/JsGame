
let ataqueJugador;
let ataqueEnemigo;
let vidasEnemigo = 3;
let vidasJugador = 3;


function iniciarJuego(){

    let sectionSeleccionarAtaque= document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display ='none';

    let sectionReiniciar= document.getElementById('reiniciar');
    sectionReiniciar.style.display='none'

    let botonMascotaJugador= document.getElementById('boton-mascota');
    botonMascotaJugador.addEventListener('click' , seleccionarMascotaJugador);

    
    
    let botonFuego =document.getElementById('boton-fuego')
    botonFuego.addEventListener('click', ataqueFuego)
    let botonAgua= document.getElementById('boton-agua')
    botonAgua.addEventListener('click', ataqueAgua)
    let botonTierra= document.getElementById('boton-tierra')
    botonTierra.addEventListener('click', ataqueTierra);

    let botonReiniciar = document.getElementById('boton-reiniciar');
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

    let spanVidasJugador= document.getElementById('vidas-jugador')
    let spanVidasEnemigo= document.getElementById('vidas-enemigo');

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
    let sectionMensajes= document.getElementById('mensajes')
    let parrafo= document.createElement('p');
    parrafo.innerHTML= 'Tu mascota ataco con ' + ataqueJugador + ' la mascota del enemigo ataco con ' + ataqueEnemigo + ' - ' + resultado;
    sectionMensajes.appendChild(parrafo)
    

}

function crearMensajeFinal(resultadoFinal){
    
    let sectionMensajes= document.getElementById('mensajes');
    let parrafo = document.createElement('p')
    parrafo.innerHTML= resultadoFinal
    sectionMensajes.appendChild(parrafo);

    let botonFuego =document.getElementById('boton-fuego')
    botonFuego.disabled= true
    let botonAgua= document.getElementById('boton-agua')
    botonAgua.disabled= true
    let botonTierra= document.getElementById('boton-tierra')
    botonTierra.disabled=true 

    let sectionReiniciar= document.getElementById('reiniciar');
    sectionReiniciar.style.display='block'
}

function seleccionarMascotaJugador(){

    let sectionSeleccionarMascota= document.getElementById('seleccionar-mascota');
    sectionSeleccionarMascota.style.display ='none';

    let sectionSeleccionarAtaque= document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display ='flex';


    let inputHipodogue= document.getElementById('hipodogue')
    let inputCapipepo= document.getElementById('capipepo');
    let inputRatihueya= document.getElementById('ratihueya');
    let spanMascotaJugador= document.getElementById('mascota-jugador');

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
    let spanMascotaEnemigo= document.getElementById('mascota-enemigo')

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

