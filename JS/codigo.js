
            // 1 es piedra, 2 es papel , 3 es tijera
            
            function aleatorio(min,max){
                return Math.floor(Math.random() * (max - min + 1) + max);

            }

            function eleccion(jugada){
                    let resultado= "";
                    if(jugada==1){
                        resultado="Piedra 🪨"
                    } else if(jugada==2){
                        resultado="Papel ✋"

                    } else if(jugada==3) {
                        resultado="Tijera ✂️"
                    } else{
                        resultado="MAL ELEGIDO"
                    }
                    return resultado;
            }

            function combate(){
                if(pc==jugador){
                    alert("Empate")
                }else if(jugador ==1 && pc==3 || jugador==2 && pc==1 ||jugador==3 && pc==2 ){
                    alert("GANASTE")
                    truinfos= triunfos + 1
                }
                else{
                    alert("PERDISTE")
                    perdidas = perdidas + 1
                } 
            }

           
            let pc =0; 
            let jugador;
            let triunfos=0;
            let perdidas=0;
    

            while(triunfos<3 && perdidas<3){
                pc=aleatorio(1,3);
                jugador = prompt("Elige: 1 para piedra, 2 para papel, 3 para tijera")
                //alert("Elegiste " + jugador)

                alert("PC elige: " + eleccion(pc));
                alert("Tu eliges: "+ eleccion(jugador));
                
                //COMBATE

                combate();

                

               /*  if(pc==jugador){
                    alert("Empate")
                }else if(jugador ==1 && pc==3 || jugador==2 && pc==1 ||jugador==3 && pc==2 ){
                    alert("GANASTE")
                    truinfos= triunfos + 1
                }
                else{
                    alert("PERDISTE")
                    perdidas = perdidas + 1
                }  */
                }

                alert("Ganaste: " + triunfos + " Veces. Perdiste " + perdidas + " Veces");
            
            
             
        