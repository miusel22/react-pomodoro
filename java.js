
		var tf;
		var start;
		var length;
		var end;
		var x;
		var now;
		var remaining;
		var minutes;
		var seconds;
		var d;
		var i;
		var left;
		var right;
		var line=[];
		var slice;
		var pauseTime;
		var pauseLength;

		//definimos el valor en el que va a iniciar
		$(document).ready(function (){
		    tf = 25;
        $('#display').html('25:00');});


		function display () {
                $('#display').empty().html(tf + ':00');
		}

		//añadiendo más tiempo
		$('#more').on('click',function() {
		    tf = tf + 1 ;
		    display();
		});

		//restando más tiempo
        $('#less').on('click',function() {
            if (tf > 1) {
                tf = tf - 1;
                display();
            }
		});


        // cambia el contador por segundos
        function a () {
            x = setInterval(function () {

                
                now = $.now();

                

                remaining = end - now;

                // basicamente con lo que todo funciona
                minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                seconds = Math.round((remaining % (1000 * 60)) / 1000);

               

                if (seconds == 60) {
                    document.getElementById("display").innerHTML = "1:00";
                }

                else if (seconds < 10) {
                    document.getElementById("display").innerHTML = minutes + ":0" + seconds;
                }

                else document.getElementById("display").innerHTML = minutes + ":" + seconds;


                // si llegó al final,muestra el mensaje fin
                if (remaining < 0) {
                    clearInterval(x);
                    document.getElementById("display").innerHTML = "FIN";
                }

                

               

                

            }, 1000);

        }

		//empezar o resumen
        $('#go').on('click', function () {

		//si le dio empezar
            if (isNaN(pauseTime)) {
                start = $.now();
                length = tf * 60 * 1000;
                end = start + length;
                a();
            }

		//si es resumen
            else {
                start = $.now();
                end = start + pauseLength;
            	a();
            }

        });

        //pausa
        $('#pause').on('click', function () {
            pauseTime = $.now();
            pauseLength = end - pauseTime;
            clearInterval(x);

        });

        //parar
        $('#reset').on('click',function() {
            clearInterval(x);
           
            tf = 25;
            display();
			pauseTime = NaN;
        });

