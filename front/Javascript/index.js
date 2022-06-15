// Sending a receiving data in JSON format using GET method
//
var xhr = new XMLHttpRequest();
var url = "http://localhost:3000/api/products";
xhr.open("GET", url, true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function () {
  console.log(xhr.readyState);
  console.log(xhr.status);
  if (xhr.readyState === 4 && xhr.status === 200) {
    var array = localStorage.getItem("myArray");
    console.log(JSON.parse(array));

    var json = JSON.parse(xhr.responseText);
    console.log(json);

    for (var i = 0; i < json.length; i++) {
      a = document.createElement("a");
      a.id = "link" + i;
      a.href = "./product.html?id=" + json[i]._id;
      document.getElementById("items").appendChild(a);

      article = document.createElement("article");
      article.id = "article" + i;
      document.getElementById("link" + i).appendChild(article);

      var img = document.createElement("img");
      img.src = json[i].imageUrl;
      document.getElementById("article" + i).appendChild(img);
      var h3 = document.createElement("h3");
      h3.innerHTML = json[i].name;
      h3.className = "productName";
      document.getElementById("article" + i).appendChild(h3);
      var p = document.createElement("p");
      p.innerHTML = json[i].description;
      p.className = "productDescription";
      document.getElementById("article" + i).appendChild(p);
    }
  }
};
xhr.send();
