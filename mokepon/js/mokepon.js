

function iniciarJuego(){
    let botonMascotaJugador= document.getElementById('boton-mascota');
    botonMascotaJugador.addEventListener('click' , seleccionarMascotaJugador);
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

    let ataqueAleatorio = aleatorio(1,3);
    let spanMascotaEnemigo= document.getElementById('mascota-enemigo')

    if(ataqueAleatorio==1){
        spanMascotaEnemigo.innerHTML="Hipodogue"
    } else if(ataqueAleatorio==2){
        spanMascotaEnemigo.innerHTML= "Capipepo"
    }else{
        spanMascotaEnemigo.innerHTML="Ratihueya"
    }


}

function aleatorio(min,max){
    Math.floor(Math.random() * (max - min + 1) + min)
}


window.addEventListener('load', iniciarJuego);

