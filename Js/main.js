var productsList;
localStorage.getItem("productsList") == null
  ? (productsList = [])
  : (productsList = JSON.parse(localStorage.getItem("productsList")));
productsList.forEach((product) => {
  product.originalName = product.name;
});
displayProduct(productsList);
var counter;
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCateg");
var productDesc = document.getElementById("productDesc");
var svaeBtn = document.getElementById("svaeBtn");
function localStorageUpdate() {
  localStorage.setItem("productsList", JSON.stringify(productsList));
}
function addProduct() {
  if (validateName()) {
    var product = {
      name: productName.value,
      price: productPrice.value,
      categ: productCategory.value,
      desc: productDesc.value,
      originalName: productName.value,
    };
    productsList.push(product);
    localStorageUpdate();
    displayProduct(productsList);
    clearInputs();
    svaeBtn.classList.add("d-none");
  }
}
function displayProduct(data) {
  var cartona = "";
  for (var i = 0; i < data.length; i++) {
    cartona += `  
      <tr>
        <td>${i + 1}</td>
        <td>${data[i].newName ? data[i].newName : data[i].name}</td>
        <td>${data[i].price}</td>
        <td>${data[i].categ}</td>
        <td>${data[i].desc}</td>
        <td><button onclick="updateProduct(${i})" class="btn btn-warning">update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
      </tr>`;
  }
  document.getElementById("data").innerHTML = cartona;
}
function deleteProduct(index) {
  productsList.splice(index, 1);
  localStorageUpdate();
  displayProduct(productsList);
}
function clearInputs() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
}
function updateProduct(index) {
  productName.value = productsList[index].name;
  productPrice.value = productsList[index].price;
  productCategory.value = productsList[index].categ;
  productDesc.value = productsList[index].desc;
  counter = index;
  svaeBtn.classList.remove("d-none");
}
function savaUpdate() {
  if (validateName()) {
    productsList[counter].name = productName.value;
    productsList[counter].price = productPrice.value;
    productsList[counter].categ = productCategory.value;
    productsList[counter].desc = productDesc.value;
    productsList[counter].originalName = productName.value;
    localStorageUpdate();
    displayProduct(productsList);
    svaeBtn.classList.add("d-none");
    clearInputs();
  }
}
function searchProduct(data) {
  var searchData = data.toLowerCase();
  var regex = new RegExp(searchData, "gi");
  var newProductsList = [];
  for (var i = 0; i < productsList.length; i++) {
    if (searchData) {
      if (productsList[i].originalName.toLowerCase().includes(searchData)) {
        productsList[i].newName = productsList[i].originalName.replace(
          regex,
          (match) => `<span class="text-warning">${match}</span>`
        );
        newProductsList.push(productsList[i]);
      }
    } else {
      productsList[i].newName = productsList[i].originalName;
      newProductsList.push(productsList[i]);
    }
  }
  displayProduct(newProductsList);
}
function validateName() {
  var regex = /^[A-Za-z]{4}$/;
  if (regex.test(productName.value)) {
    productName.style.border = "none";
    document.getElementById("invalidName").classList.add("d-none");
    return true;
  } else {
    productName.style.border = "solid 10px red";
    document.getElementById("invalidName").classList.remove("d-none");
    return false;
  }
}