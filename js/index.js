
$(document).ready( ()=>{
    /*
    blink_rows(txt = ".row", times = 2, time = 100);
    */
   startAnimation();
})

function startAnimation(){
    anim_buttons();
}
function anim_buttons(){
    //Guarda los nombres de las clases de los botones
    let ids = new Array();
    $("#frame").children().each(function () {
        let id = $(this).attr("id")
        if(typeof id !== 'undefined'){
            ids.push(id);
        }
    });

    //Hace la animación de fade in de los botones con un retraso de 300 milisegundos entre cada uno
    let index = 0;
    let fade_anim = setInterval(function() {
        if(index < ids.length){
            setVisible("#" + ids[index], 1000);
            index++;
        }
        else{
            clearInterval(fade_anim);
        }
    }, 300)

    //La animación del contenedor de los botones
    $(".line").each(function(){
        $(this).hide();
        $(this).show(1300);
    })
    //El timeout se debe tener en cuenta con el retraso de la funcion para que la animacion
    //inicie cuando la pag cargue
    setTimeout(() => {
        anim_phrase("#frase1", "Make it simple.", 2);
    }, 900);
}
//Un fadeIn personalizado, que permite que el elemento este renderizado
function setVisible(name, time){
    $(name).css({opacity: 0.0, visibility: "visible"}).animate({
        opacity:1.0
    }, time);
}
/*
*Realiza una animación sobre un parrafo del tag 
*/
function anim_phrase(tag, frase, tiempo){
    let characters= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!"#$%&/()=?¡+´}ñ1234567890';
    //Numero de iteraciones hasta colocar la letra correspondiente.
    const NITER = 9;
    //subStr guarda el valor provisional de las letras, final guarda la frase que queda en el tag
    let subStr="", final = "";

    let j=0;
    let done = false;
    console.log(frase.length);
    let outInterval = setInterval(function() {
        if(j<frase.length){
            let i = 0;
            let interval =  setInterval(function () {
                //Comprueba si el numero de iteraciones ya pasó
                if (i < NITER){
                    //Parece que el valor de j se actualiza para cuando el intervalo
                    //no ha muerto, luego esto se hace necesario
                    //un poco ineficiente pero tolerable
                    if(j == frase.length){
                        $(tag).text(final);
                        i++;
                    }
                    else{
                        //Se selleciona una letra del arreglo de forma aleatoria.
                        subStr=characters.charAt(Math.floor(Math.random() * characters.length));
                        //Se suma a la frase final la letra provisional
                        $(tag).text(final + subStr);
                        i++
                    }
                }
                else{
                    clearInterval(interval);
                }
            //Este intervalo de tiempo no importa tanto ya que la velocidad depende del intervalo del bucle exterior       
            }, 100);
            //Se coloca una a una las letras de la frase final.
            final+=frase.charAt(j);
            j++;
        }
        else{
            clearInterval(outInterval);
        }
    
    }, 200);  
}
function blink_rows(txt = null, times = 2, time = 1000){
    if(txt === null){
        return "No valid param";
    }
    else{
        blinks = times * 2
        for (let i=0; i<blinks; i++){
            if(i%2 == 0){
                $(txt).fadeOut(time);
            }
            else{
                $(txt).fadeIn(time);
            }
        }
    }
}
function delay(){
    setTimeout(()=> console.log('delayed'), 2000);
    return 0;
}
