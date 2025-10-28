
// JAVASCRIPT - Crearguifos.html

// Variables

var arr = [];
var misGuifos = document.getElementById("misGuifos");
var image = document.getElementById("imagen");
let form = new FormData();
var recorder; // globally accessible
var apiKey = "zLngW6Npv5ek7URDYXee7tp7lXqHIwxu";

// Cambiar tema light - dark mode 

function day(){
    themeCss.href="";
    logo.src='assets/gifOF_logo.png';
  }
  function night(){
    themeCss.href="css/dark-mode.css";
    logo.src='assets/gifOF_logo_dark.png';
  }  


  // Contabilizador

  window.onload = function() {
    pantalla = document.getElementById("screen");
 }
 var isMarch = false; 
 var acumularTime = 0; 
 function start () {
          if (isMarch == false) { 
             timeInicial = new Date();
             control = setInterval(cronometro,10);
             isMarch = true;
             }
          }
 function cronometro () { 
          timeActual = new Date();
          acumularTime = timeActual - timeInicial;
          acumularTime2 = new Date();
          acumularTime2.setTime(acumularTime); 
          cc = Math.round(acumularTime2.getMilliseconds()/10);
          ss = acumularTime2.getSeconds();
          mm = acumularTime2.getMinutes();
          if (cc < 10) {cc = "0"+cc;}
          if (ss < 10) {ss = "0"+ss;} 
          if (mm < 10) {mm = "0"+mm;}
          pantalla.innerHTML = +mm+" : "+ss+" : "+cc;
          }
 
 function stop () { 
          if (isMarch == true) {
             clearInterval(control);
             isMarch = false;
             }     
          }      
 
 function reset () {
          if (isMarch == true) {
             clearInterval(control);
             isMarch = false;
             }
          acumularTime = 0;
          pantalla.innerHTML = "00 : 00 : 00";
          }


  // FUNCIÓN VÍDEO

  // Obtener camara

  function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(camera) {
        callback(camera);
    }).catch(function(error) {
        console.error(error);
    });
}

// Dejar de grabar callback

function stopRecordingCallback() {
    document.querySelector('h1').innerHTML = 'Vista Previa. Guifo Size: ' + bytesToSize(recorder.getBlob().size);
    image.src = URL.createObjectURL(recorder.getBlob());
    gifDescarga.href = URL.createObjectURL(recorder.getBlob()); // Para descargar Guifo
    form.append('file', recorder.getBlob(), 'myGif.gif');
    console.log(form.get('file'));
}

// Grabar

function getStreamAndRecord() {
    this.disabled = true;
    captureCamera(function(camera) {
        document.querySelector('h1').innerHTML = 'Esperando Al Gif Recorder Para Empezar...';
        recorder = RecordRTC(camera, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function() {
                document.querySelector('h1').innerHTML = 'Capturando Tu Guifo.';
            },
            onGifPreview: function(gifURL) {
                image.src = gifURL;
            }
        });

        recorder.startRecording();

        // release camera on stopRecording
        recorder.camera = camera;

        document.getElementById('btn-stop-recording').disabled = false;
    });
};

// Deja de grabar

function stopRecording() {
    this.disabled = true;
    recorder.stopRecording(stopRecordingCallback);
};

// Función para copiar enlance

var copyTextareaBtn = document.getElementById("js-textareacopybtn");

copyTextareaBtn.addEventListener('click', function(event) {
  var copyTextarea = document.querySelector('.js-copytextarea');
  copyTextarea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
});

// Upload a Giphy - Upload a

function uploadGif() {
    document.getElementById("timer").style.display = "none";
    subirGuifo();
    fetch("https://upload.giphy.com/v1/gifs?api_key=" + apiKey, {
    method: "POST",
    body: form
})
    .then(response => {
        console.log(response.status);
        return response.json();
        
    })
    .then(data => {
        var dataId = data.data.id;
        fetch("https://api.giphy.com/v1/gifs/" + dataId + "?api_key=" + apiKey)
        .then(response => {
            return response.json();
        })
    
        .then(json => {
            console.log(json);



            console.log(json)
            localStorage.setItem(data.data.id, JSON.stringify(json));

                    
            var y = localStorage.getItem(dataId);    //obtengo la data
                var yparsed = JSON.parse(y);              //la convierto
                var urlmygif = yparsed.data.images.original.url;      //obtengo la url
                console.log(urlmygif);


                const divCajas = document.createElement("div");
                divCajas.classList.add("gifs-container");
                misGuifos.appendChild(divCajas);

                const gifSubido = document.createElement("img");
                gifSubido.classList.add("gif-sugerencias");
                divCajas.appendChild(gifSubido);

                gifSubido.src = urlmygif;
                document.getElementById("gif-subido2").src = urlmygif;
                var copyTextarea = document.querySelector('.js-copytextarea');
                copyTextarea.value = urlmygif;
                console.log(copyTextarea);
               

                })

                    document.querySelector('h1').innerHTML = 'Guifo Subido Con Éxito.';
                    guifoSubido();    
    
    })

}

// LOCAL STORAGE
    
    function addToLocalStorage() {
        for (i = 0; i <localStorage.length; i++ ) {
            arr[i]=localStorage.key(i);
            }
            console.log(arr);
        
            arr.forEach(keyvalue=> {    //para cada valor del array
            var x = localStorage.getItem(keyvalue);    //obtengo la data
            var xparsed = JSON.parse(x);              //la convierto
            var urlmygif = xparsed.data.images.original.url;      //obtengo la url
            console.log(urlmygif);


            const divCajas = document.createElement("div");
            divCajas.classList.add("gifs-container");
            misGuifos.appendChild(divCajas);

            const gifSubido = document.createElement("img");
            gifSubido.classList.add("gif-sugerencias");
            divCajas.appendChild(gifSubido);

            gifSubido.src = urlmygif;
            })
        }

addToLocalStorage(); // Ejecución de la función

// Cambios en el DOM al presionar botones

function startVideo() {
  document.getElementById("recuadro").style.display = "none";
  document.getElementById("recuadro3").style.display = "block";
}

function startRecord() {
    start();
    document.getElementById("recuadro4").style.display = "none";
    document.getElementById("recuadro5").style.display = "block";
    document.getElementById("recuadro6").style.display = "none";
}

function stopRecord() {
    stop();
    document.getElementById("recuadro5").style.display = "none";
    document.getElementById("recuadro6").style.display = "block";
}

function subirGuifo() {
    document.getElementById("recuadro6").style.display = "none";
    document.getElementById("recuadro7").style.display = "block";
    document.getElementById("imagen").style.display = "none";
}

function guifoSubido() {
    document.getElementById("recuadro8").style.display = "block";
    document.getElementById("recuadro7").style.display = "none";
}




