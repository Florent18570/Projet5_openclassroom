array = JSON.parse(localStorage.getItem("myArray")) || [];

window.onload = function () {
  var f = (function () {
    var xhr = [],
      i;
    for (var i = 0; i < array.length; i++) {
      //for loop
      (function (i) {
        xhr[i] = new XMLHttpRequest();
        url = "http://localhost:3000/api/products/" + array[i][0];
        xhr[i].open("GET", url, true);
        xhr[i].onreadystatechange = function () {
          if (xhr[i].readyState === 4 && xhr[i].status === 200) {
            var json = JSON.parse(xhr[i].responseText);
            console.log(json);
            prix_total = json.price * localStorage.quantity;

            div_supp = document.createElement("div");
            div_supp.id = "div_supp" + i;
            div_supp.className = "div_supp";
            document.getElementById("cart__items").appendChild(div_supp);

            article = document.createElement("article");
            article.id = "cart__item" + i;
            article.className = "cart__item";
            document.getElementById("div_supp" + i).appendChild(article);

            div1 = document.createElement("div");
            div1.id = "cart__item__img" + i;
            div1.className = "cart__item__img";
            document.getElementById("cart__item" + i).appendChild(div1);

            img = document.createElement("img");
            img.src = json.imageUrl;
            img.alt = json.altTxt;
            document.getElementById("cart__item__img" + i).appendChild(img);

            div2 = document.createElement("div");
            div2.id = "cart__item__content" + i;
            div2.className = "cart__item__content";
            document.getElementById("cart__item" + i).appendChild(div2);

            div3 = document.createElement("div");
            div3.id = "cart__item__content__description" + i;
            div3.className = "cart__item__content__description";

            document
              .getElementById("cart__item__content" + i)
              .appendChild(div3);

            h2 = document.createElement("h2");
            h2.id = "h2_product" + i;
            h2.className = "h2_product";
            h2.innerHTML = "Nom du produit : ";

            document
              .getElementById("cart__item__content__description" + i)
              .appendChild(h2);

            p1 = document.createElement("p");
            p1.id = "p_product" + i;
            p1.innerHTML = json.name;
            p1.className = "p_product";

            document
              .getElementById("cart__item__content__description" + i)
              .appendChild(p1);

            p2 = document.createElement("p");
            p2.id = "p_color" + i;
            p2.innerHTML = array[i][2];
            p2.className = "p_color";

            document
              .getElementById("cart__item__content__description" + i)
              .appendChild(p2);

            p3 = document.createElement("p");
            p3.id = "p_value" + i;
            p3.innerHTML = array[i][1] * json.price;
            p3.className = "p_value";

            document
              .getElementById("cart__item__content__description" + i)
              .appendChild(p3);

            // //content settings

            div4 = document.createElement("div");
            div4.id = "cart__item__content__settings" + i;
            div4.className = "cart__item__content__settings";

            document
              .getElementById("cart__item__content" + i)
              .appendChild(div4);

            div5 = document.createElement("div");
            div5.id = "cart__item__content__settings__quantity" + i;
            div5.className = "cart__item__content__settings__quantity";

            document
              .getElementById("cart__item__content__settings" + i)
              .appendChild(div5);

            p4 = document.createElement("p");
            p4.id = "Qté" + i;
            p4.className = "Qté";

            document
              .getElementById("cart__item__content__settings__quantity" + i)
              .appendChild(p4);

            input = document.createElement("input");
            input.id = "itemQuantity" + i;
            input.className = "itemQuantity";
            input.name = "itemQuantity";
            input.min = "1";
            input.max = "100";
            input.type = "number";
            input.value = array[i][1];
            document
              .getElementById("cart__item__content__settings__quantity" + i)
              .appendChild(input);

            //content settings delete
            div6 = document.createElement("div");
            div6.id = "cart__item__content__settings__delete" + i;
            div6.className = "cart__item__content__settings__delete";

            document
              .getElementById("cart__item__content__settings" + i)
              .appendChild(div6);

            p5 = document.createElement("p");
            p5.id = "deleteItem" + i;
            p5.className = "deleteItem";
            p5.innerHTML = "Supprimer";

            document
              .getElementById("cart__item__content__settings__delete" + i)
              .appendChild(p5);

            document
              .getElementById("itemQuantity" + i)
              .addEventListener("change", change_total_price);

            function change_total_price() {
              document.getElementById("p_value" + i).innerHTML =
                json.price * document.getElementById("itemQuantity" + i).value;
              console.log(
                json.price * document.getElementById("itemQuantity" + i).value
              );
            }

            //Suppression
            document
              .getElementById("deleteItem" + i)
              .addEventListener("click", delete_article);

            function delete_article() {
              array = JSON.parse(localStorage.getItem("myArray")) || [];
              var myNode = document.getElementById("div_supp" + i);
              while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
              }
              console.log(array.length);
              var spliced = array.splice(i, 3);

              console.log(spliced);
              console.log("Remaining elements: " + array);
              // localStorage.clear();
              localStorage.setItem("myArray", JSON.stringify(array));
              location.reload();
            }
          }
        };
        xhr[i].send();
      })(i);
    }
  })();

  function validateForm() {
    var name = document.getElementsByName("firstName").value;
    console.log(document.getElementsByName("firstName").value);
    if (name.value == 1) {
      document.getElementById("errorname").innerHTML =
        "Veuillez entrez un nom valide";
      name.focus();
      return false;
    } else {
      document.getElementById("errorname").innerHTML = "";
    }
  }

  document.getElementById("order").addEventListener("click", validateForm);
};
