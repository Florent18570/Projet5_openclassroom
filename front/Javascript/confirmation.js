function main() {
  var urlcourante = document.location.href;
  var url = new URL(urlcourante);
  var search_params = new URLSearchParams(url.search);

  if (search_params.has("id")) {
    var order = search_params.get("id");
  }
  console.log(order);
  document.getElementById("orderId").innerHTML = order;
  localStorage.clear();
}
main();
