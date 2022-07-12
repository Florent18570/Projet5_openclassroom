var array = localStorage.getItem("myArray");
console.log(JSON.parse(array));

var urlcourante = document.location.href;
var url = new URL(urlcourante);
var search_params = new URLSearchParams(url.search);

if (search_params.has("id")) {
  var id = search_params.get("id");

  // console.log(id);

  // Sending a receiving data in JSON format using GET method

  var xhr = new XMLHttpRequest();
  var url = "http://localhost:3000/api/products/" + id;
  // console.log(url);
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      // console.log(json);

      img = document.createElement("img");
      img.src = json.imageUrl;
      img.alt = json.altTxt;
      document.getElementById("item__img").appendChild(img);

      h1 = document.createElement("h1");
      h1.innerHTML = json.name;
      h1.id = "title";
      document.getElementById("item__content__titlePrice").appendChild(h1);

      span = document.createElement("span");
      span.innerHTML = json.price;
      span.id = "price";
      document.getElementById("price").appendChild(span);

      p = document.createElement("p");
      p.innerHTML = json.description;
      p.id = "price";
      document.getElementById("description").appendChild(p);

      for (var i = 0; i < json.colors.length; i++) {
        option = document.createElement("option");
        option.innerHTML = json.colors[i];
        option.value = json.colors[i];
        document.getElementById("colors").appendChild(option);
      }

      document
        .getElementById("colors")
        .addEventListener("change", optionselected);
      document
        .getElementById("quantity")
        .addEventListener("change", quantity_selected);

      var color_item;
      var quantity_item;

      function optionselected() {
        var select = document.getElementById("colors");
        var option = select.options[select.selectedIndex].text;
        // console.log(JSON.stringify(option));
        color_item = JSON.stringify(option);
      }
      function quantity_selected() {
        // console.log(document.getElementById("quantity").value);
        quantity_item = document.getElementById("quantity").value;
      }

      // Store an array in local storage
      // The array to store

      if (localStorage.getItem("myArray") != []) {
        var studentsData = JSON.parse(localStorage.getItem("myArray")) || [];
      } else {
        var studentsData = [];
      }

      document
        .getElementById("addToCart")
        .addEventListener("click", localStorageadd);

      localStorage._id = json._id;

      function localStorageadd() {
        if (
          document.getElementById("colors").value == "" ||
          document.getElementById("quantity").value == ""
        ) {
          window.alert("Veuillez remplir tout les champs");
        } else if (
          document.getElementById("colors").value ==
          "--SVP, choisissez une couleur --"
        ) {
          window.alert("Merci de choisir une couleur");
        } else if (
          document.getElementById("quantity").value <= 0 ||
          document.getElementById("quantity").value > 100
        ) {
          window.alert("Merci de remplir une quantité entre 1 et 100");
        } else {
          //Si il n'y a pas de canap

          // Crée et ajoute des valeurs dans le localstorage
          if (array == null || array == []) {
            console.log("titi");
            studentsData.push([localStorage._id, quantity_item, color_item]);
            localStorage.setItem("myArray", JSON.stringify(studentsData));

            array = JSON.parse(localStorage.getItem("myArray")) || [];
          }

          // Si le local storage existe
          // Si la valeur ne vaut pas exactement la meme ajoute un nouveau
          //canap sinon ajouter +1 dans l'ancien canap
          else {
            array = JSON.parse(localStorage.getItem("myArray"));
            // console.log(array.length);
            var l = 0;
            for (var m = 0; m < array.length; m++) {
              if (
                array[m][0] == id &&
                array[m][2].replaceAll('"', "") ==
                  document.getElementById("colors").value
              ) {
                storageqte = parseInt(array[m][1]);
                qte_form = parseInt(quantity_item);
                console.log(array);
                array[m][0] = id;
                array[m][1] = (storageqte + qte_form).toString();
                array[m][2] = document.getElementById("colors").value;

                if (storageqte + qte_form > 100) {
                  window.alert("Le nombre de canapé dépasse la limite fixé ! ");
                } else {
                  console.log(array);
                  console.log(storageqte + qte_form);
                  localStorage.setItem("myArray", JSON.stringify(array));
                  array = JSON.parse(localStorage.getItem("myArray")) || [];
                  window.alert(
                    "combinaison canap existe déjà vous avez ajouté " +
                      quantity_item +
                      " items dans le panier"
                  );
                  l = 1;
                  // console.log(array2);
                }
              }
            }

            if (l == 0) {
              window.alert("Votre article à été ajouté au panier !");
              studentsData.push([localStorage._id, quantity_item, color_item]);
              localStorage.setItem("myArray", JSON.stringify(studentsData));
              console.log(array);
            }
          }
        }
      }
    }
  };
}
xhr.send();
