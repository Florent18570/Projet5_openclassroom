// ID retrieval with URL
var urlcourante = document.location.href;
var url = new URL(urlcourante);
var search_params = new URLSearchParams(url.search);
var erreur = 0;
var erreur2 = 0;
var erreur3 = 0;
var erreur4 = 0;
var erreur5 = 0;
var erreur6 = 0;

var elementcreate = 0;

if (search_params.has("id")) {
  var id = search_params.get("id");

  // Sending a receiving data in JSON format using GET method
  var xhr = new XMLHttpRequest();
  var url = "http://localhost:3000/api/products/" + id;
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // storage of the return value of the api in json
      var json = JSON.parse(xhr.responseText);

      // creation of html tags by adding the values retrieved from the api
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

      /**
       * retrieve the "color" value selected in the "select" html tag
       * */
      function optionselected() {
        var select = document.getElementById("colors");
        var option = select.options[select.selectedIndex].text;
        color_item = JSON.stringify(option);
      }

      /**
       * recovery of the selected "quantity" value
       * */
      function quantity_selected() {
        quantity_item = document.getElementById("quantity").value;
      }

      // Store an array in local storage
      // The array to store
      if (localStorage.getItem("myArray") != []) {
        var localstorageData =
          JSON.parse(localStorage.getItem("myArray")) || [];
      } else {
        var localstorageData = [];
      }

      document
        .getElementById("addToCart")
        .addEventListener("click", localStorageadd);

      localStorage._id = json._id;

      /**
       * Add id, quantity and color values in the localstorage
       * the form must be filled in according to some condition, the values must not be empty, the quantity must be between 1 and 100
       * */
      function localStorageadd() {
        if (elementcreate == 0) {
          alert_champsnul = document.createElement("h4");
          elementcreate = 1;
        }
        if (
          document.getElementById("colors").value == "" ||
          document.getElementById("quantity").value == ""
        ) {
          if (erreur == 0) {
            alert_champsnul.innerHTML = "Veuillez remplir tout les champs ! ";
            alert_champsnul.style.color = "red";
            document
              .getElementById("item__content__settings")
              .appendChild(alert_champsnul);
            erreur6 = 0;
            erreur5 = 0;
            erreur4 = 0;
            erreur3 = 0;
            erreur2 = 0;
            erreur++;
          }
        } else if (
          document.getElementById("colors").value ==
          "--SVP, choisissez une couleur --"
        ) {
          window.alert("Merci de choisir une couleur");
        } else if (
          document.getElementById("quantity").value <= 0 ||
          document.getElementById("quantity").value > 100
        ) {
          if (erreur2 == 0) {
            alert_champsnul.innerHTML =
              "Merci de remplir une quantité entre 1 et 100";
            alert_champsnul.style.color = "red";
            document
              .getElementById("item__content__settings")
              .appendChild(alert_champsnul);
            erreur6 = 0;
            erreur5 = 0;
            erreur4 = 0;
            erreur3 = 0;
            erreur2++;
            erreur = 0;
          }
        } else {
          //if the sofa does not exist
          // Create and add values in the localstorage
          array = JSON.parse(localStorage.getItem("myArray")) || [];
          console.log(array);
          if (array == null || array.length == 0) {
            localstorageData.push([
              localStorage._id,
              quantity_item,
              color_item,
            ]);
            localStorage.setItem("myArray", JSON.stringify(localstorageData));
            array = JSON.parse(localStorage.getItem("myArray")) || [];
          }

          // if the combination color + id exist
          // Si la valeur ne vaut pas exactement la meme ajoute un nouveau
          //canap sinon ajouter +1 dans l'ancien canap
          else {
            array = JSON.parse(localStorage.getItem("myArray"));

            // this condition to check if the combination color + id  exists
            for (var m = 0; m < array.length; m++) {
              var l = 0;
              // If the combination exist
              if (
                array[m][0] == id &&
                array[m][2].replaceAll('"', "") ==
                  document.getElementById("colors").value
              ) {
                // modification of the table by adding the number of quantity of the basket plus the quantity of the form
                storageqte = parseInt(array[m][1]);
                qte_form = parseInt(quantity_item);
                console.log(array);
                array[m][0] = id;
                array[m][1] = (storageqte + qte_form).toString();
                array[m][2] = document.getElementById("colors").value;

                // The quantity cannot exceed 100 in the basket
                if (storageqte + qte_form > 100) {
                  if (erreur3 == 0) {
                    alert_champsnul.innerHTML =
                      "Le nombre de canapé dépasse la limite fixé ! ";
                    alert_champsnul.style.color = "red";
                    document
                      .getElementById("item__content__settings")
                      .appendChild(alert_champsnul);
                    erreur6 = 0;
                    erreur5 = 0;
                    erreur4 = 0;
                    erreur3++;
                    erreur2 = 0;
                    erreur = 0;
                  }
                  l = 1;
                }

                // Adding the quantity of the selected sofa to the basket
                else {
                  console.log(array);
                  console.log(storageqte + qte_form);
                  localStorage.setItem("myArray", JSON.stringify(array));
                  array = JSON.parse(localStorage.getItem("myArray")) || [];
                  if (erreur4 == 0) {
                    alert_champsnul.innerHTML =
                      "Ce canapé existe déjà dans le panier vous en avez ajouté " +
                      quantity_item;
                    alert_champsnul.style.color = "green";
                    document
                      .getElementById("item__content__settings")
                      .appendChild(alert_champsnul);
                    erreur6 = 0;
                    erreur5 = 0;
                    erreur4++;
                    erreur3 = 0;
                    erreur2 = 0;
                    erreur = 0;
                  }
                  l = 1;
                }
              }
            }

            //if the item does not exist in the cart and in the localstorage (id,quantity, color)
            if (l == 0) {
              if (erreur5 == 0) {
                alert_champsnul.innerHTML =
                  "Votre article à été ajouté au panier ! ";
                alert_champsnul.style.color = "green";
                document
                  .getElementById("item__content__settings")
                  .appendChild(alert_champsnul);
                erreur6 = 0;
                erreur5++;
                erreur4 = 0;
                erreur3 = 0;
                erreur2 = 0;
                erreur = 0;
              }
              localstorageData.push([
                localStorage._id,
                quantity_item,
                color_item,
              ]);
              localStorage.setItem("myArray", JSON.stringify(localstorageData));
              console.log(array);
            }
          }
        }
      }
    }
  };
}
xhr.send();
