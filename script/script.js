/* JavaScript */

// Memoria de temas
// Aplicar tema guardado y otros onload
window.addEventListener("DOMContentLoaded", () => {
    // Tema guardado
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "night") {
        themeCss.href = "css/dark-mode.css";
        logo.src = 'assets/gifOF_logo_dark.png';
    } else {
        themeCss.href = "css/style.css";
        logo.src = 'assets/gifOF_logo.png';
    }

    // Contador
    pantalla = document.getElementById("screen");
});

// VARIABLES

var giphyAPItrend = 'https://api.giphy.com/v1/gifs/trending?api_key=v9mgWil42Pqc1lyo9rTv7sDH1QmlmFFM&limit=20&rating=G';
var themeCss = document.getElementById("themeCss");

// Cambiar tema light - dark mode 

function day(){
  logo.src='assets/gifOF_logo.png';
  themeCss.href="";
  localStorage.setItem("theme", "day"); // Guardamo temaa
}
function night(){
  logo.src='assets/gifOF_logo_dark.png';
  themeCss.href="css/dark-mode.css";
  localStorage.setItem("theme", "night"); // Guardamos tema
}

// Función para despeglar menú sugerencias


function resultsSuggestions() {
  document.getElementById("menu-nav3").style.display = "block";
}



// Sugerencias

    fetch(giphyAPItrend) // HAce el pedido por api a ghipy
    .then(response => { // Toma la respuesta y la convierte a un archivo json
        return response.json();
    })

    .then(json => { // Muestra en pantall el json con el .log
        console.log(json)

        for(i = 0; i < 4; i++) { // 4 PRIMEROS RESULTADOS PARA "HOY TE SUGERIMOS"
        

          console.log(json);

          document.getElementById("gif1").src = json.data[0].images.original.url;
          var string1 = json.data[0].title;
          var firstSplit = string1.slice(0, 35);
          document.getElementById("gif-sugerencias-title1").innerHTML = firstSplit;
          document.getElementById("gif2").src = json.data[1].images.original.url;
          var string2 = json.data[1].title;
          var secondSplit = string2.slice(0, 35);
          document.getElementById("gif-sugerencias-title2").innerHTML = secondSplit;
          document.getElementById("gif3").src = json.data[2].images.original.url;
          var string3 = json.data[2].title;
          var thirdSplit = string3.slice(0, 35);
          document.getElementById("gif-sugerencias-title3").innerHTML = thirdSplit;
          document.getElementById("gif4").src = json.data[3].images.original.url;
          var string4 = json.data[3].title;
          var fourSplit = string4.slice(0, 35);
          document.getElementById("gif-sugerencias-title4").innerHTML = fourSplit;

      }



        for(i = 4; i < json.data.length; i++) {
            
            console.log(json);

            const divCajas = document.createElement("div");
            divCajas.classList.add("gifs-container");
            misGuifos2.appendChild(divCajas);

            const gifSubido = document.createElement("img");
            const gifTitle = document.createElement("p");
            gifSubido.classList.add("gif-sugerencias");
            gifTitle.classList.add("gif-tags");
            divCajas.appendChild(gifSubido);
            divCajas.appendChild(gifTitle);

            gifSubido.src = json.data[i].images.original.url;
            gifTitle.innerHTML = json.data[i].title;
        }
    })


/* Función Búsqueda */

    function getSearchResults() {

      document.getElementById("misGuifos").innerHTML = ''; // Borra resultados anteriores

    var searchValue = document.getElementById("userSearch").value; // lee  lo q el user ingresa
    
  fetch('https://api.giphy.com/v1/gifs/search?api_key=v9mgWil42Pqc1lyo9rTv7sDH1QmlmFFM&q=' + searchValue + '&limit=20&offset=0&rating=G&lang=en')
  .then(response => { // con fetch manda lo q el user ingreasa a la API en peticion GEt y combierte a json
    return response.json();
  })

  .then(json => {
    console.log(json) // Muestra en pantalla
    document.getElementById("texto3").innerHTML = "Resultados para: [ " + searchValue + " ]";

    for(i = 0; i < json.data.length; i++) { // Bucle recoore gift encontrados
        
        console.log(json);
        

        const divCajas = document.createElement("div"); // Crea caja donde van los gift
        divCajas.classList.add("gifs-container");
        misGuifos.appendChild(divCajas);

        const gifSubido = document.createElement("img"); // crea imagn y titulo con sus clases css
        const gifTitle = document.createElement("p");
        gifSubido.classList.add("gif-sugerencias");
        gifTitle.classList.add("gif-tags");
        divCajas.appendChild(gifSubido);
        divCajas.appendChild(gifTitle);

        gifSubido.src = json.data[i].images.original.url; // COntenido obtenido de la API 
        gifTitle.innerHTML = json.data[i].title;
    }
  

  return data
  })
  .catch((error) => { // Manejo de errorres por si API Fallara
  return error
  })

    }

    function hideResults() {
     document.getElementById("searchResults").style.display = "block";// Mostrar secion de resultado en busqueda y ocultar gif tendencia
     document.getElementById("tendencias").style.display = "none";
    }

  /* Función Búsqueda para menú despegable */

  function getSearchResultsSuggestions() {

    var hidden = document.getElementById("misGuifos"); 
    console.log(hidden);
    hidden.innerHTML = '';
  
fetch('https://api.giphy.com/v1/gifs/search?api_key=v9mgWil42Pqc1lyo9rTv7sDH1QmlmFFM&q=' + n + '&limit=20&offset=0&rating=G&lang=en')
.then(response => {
  return response.json();
})

.then(json => {
  console.log(json);
  document.getElementById("texto3").innerHTML = "Resultados para: [ " + n + " ]"; // n variable guardada para sugerencias matrix etc.

  for(i = 0; i < json.data.length; i++) {
      
      console.log(json);
      

      const divCajas = document.createElement("div");
      divCajas.classList.add("gifs-container");
      misGuifos.appendChild(divCajas);

      const gifSubido = document.createElement("img");
      const gifTitle = document.createElement("p");
      gifSubido.classList.add("gif-sugerencias");
      gifTitle.classList.add("gif-tags");
      divCajas.appendChild(gifSubido);
      divCajas.appendChild(gifTitle);

      gifSubido.src = json.data[i].images.original.url;
      gifTitle.innerHTML = json.data[i].title;
  }


return data
})
.catch((error) => {
return error
})

// Tres funciones distintas para cada opción del menu desplegable del buscador

  }

  function getSearchResultsSuggestionsNumberOne() {
    n = "matrix";
    getSearchResultsSuggestions();
    console.log(n);
  }

  function getSearchResultsSuggestionsNumberTwo() {
    n = "python";
    getSearchResultsSuggestions();
    console.log(n);
  }

  function getSearchResultsSuggestionsNumberThree() {
    n = "memes";
    getSearchResultsSuggestions();
    console.log(n);
  }
  // Búsqueda con Enter
  const input = document.getElementById("userSearch"); // Agregado buscador escuchando Enter

  input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      getSearchResults();
      hideResults();
  }
  });




