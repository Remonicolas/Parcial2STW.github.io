/* JavaScript */

// VARIABLES

var giphyAPItrend = 'https://api.giphy.com/v1/gifs/trending?api_key=zLngW6Npv5ek7URDYXee7tp7lXqHIwxu&limit=20&rating=G';
var themeCss = document.getElementById("themeCss");

// Cambiar tema light - dark mode 

function day(){
  logo.src='assets/gifOF_logo.png';
  themeCss.href="";
}
function night(){
  logo.src='assets/gifOF_logo_dark.png';
  themeCss.href="css/dark-mode.css";
}

// Función para despeglar menú sugerencias


function resultsSuggestions() {
  document.getElementById("menu-nav3").style.display = "block";
}



// Sugerencias

    fetch(giphyAPItrend)
    .then(response => {
        return response.json();
    })

    .then(json => {
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

      document.getElementById("misGuifos").innerHTML = '';

    var searchValue = document.getElementById("userSearch").value;
    
  fetch('https://api.giphy.com/v1/gifs/search?api_key=zLngW6Npv5ek7URDYXee7tp7lXqHIwxu&q=' + searchValue + '&limit=20&offset=0&rating=G&lang=en')
  .then(response => {
    return response.json();
  })

  .then(json => {
    console.log(json)
    document.getElementById("texto3").innerHTML = "Resultados para: [ " + searchValue + " ]";

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

    }

    function hideResults() {
     document.getElementById("searchResults").style.display = "block";
     document.getElementById("tendencias").style.display = "none";
    }

  /* Función Búsqueda para menú despegable */

  function getSearchResultsSuggestions() {

    var hidden = document.getElementById("misGuifos");
    console.log(hidden);
    hidden.innerHTML = '';
  
fetch('https://api.giphy.com/v1/gifs/search?api_key=zLngW6Npv5ek7URDYXee7tp7lXqHIwxu&q=' + n + '&limit=20&offset=0&rating=G&lang=en')
.then(response => {
  return response.json();
})

.then(json => {
  console.log(json);
  document.getElementById("texto3").innerHTML = "Resultados para: [ " + n + " ]";

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
    n = "memes";
    getSearchResultsSuggestions();
    console.log(n);
  }

  function getSearchResultsSuggestionsNumberTwo() {
    n = "coding";
    getSearchResultsSuggestions();
    console.log(n);
  }

  function getSearchResultsSuggestionsNumberThree() {
    n = "tomb raider";
    getSearchResultsSuggestions();
    console.log(n);
  }

