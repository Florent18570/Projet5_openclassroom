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
        studentsData.push([localStorage._id, quantity_item, color_item]);
        localStorage.setItem("myArray", JSON.stringify(studentsData));
        // window.location.href = "../../front/html/cart.html";

        array = JSON.parse(localStorage.getItem("myArray")) || [];
        console.log(array);
      }
    }
  };
  xhr.send();
}
