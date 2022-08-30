
let ataqueJugador;
let ataqueEnemigo;

function iniciarJuego(){
    let botonMascotaJugador= document.getElementById('boton-mascota');
    botonMascotaJugador.addEventListener('click' , seleccionarMascotaJugador);
    
    let botonFuego =document.getElementById('boton-fuego')
    botonFuego.addEventListener('click', ataqueFuego)
    let botonAgua= document.getElementById('boton-agua')
    botonAgua.addEventListener('click', ataqueAgua)
    let botonTierra= document.getElementById('boton-tierra')
    botonTierra.addEventListener('click', ataqueTierra);
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

    crearMensaje();

   
}

function crearMensaje(){
    let sectionMensajes= document.getElementById('mensajes')
    let parrafo= document.createElement('p');
    parrafo.innerHTML= 'Tu mascota ataco con ' + ataqueJugador + ' la mascota del enemigo ataco con ' + ataqueEnemigo + ' -Pendiente🎉'
    sectionMensajes.appendChild(parrafo)

}

function seleccionarMascotaJugador(){
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

function aleatorio(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}


window.addEventListener('load', iniciarJuego);

