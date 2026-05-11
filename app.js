let clothingItems = [];

function addClothingItem(event) {
  event.preventDefault();

  let clothingItem = {
     item: document.getElementById("item").value,
     description: document.getElementById("description").value,
     color: document.getElementById("color").value,
     price: document.getElementById("price").value,
        discount: document.getElementById("discount").value,
     picture: document.getElementById("picture").value,
  };
  clothingItems.push(clothingItem);
    renderItems();

  document.querySelector("form").reset();
  }

function deleteClothingItem(index) {
      let ok = confirm("Are you sure you want to delete this clothing item?");
    if (!ok) return;
  clothingItems.splice(index, 1);
  renderItems();

}

function saveClothingItems() {
  localStorage.setItem("clothingItems", JSON.stringify(clothingItems));
}
function loadClothingItems() {
  let savedClothingItems = localStorage.getItem("clothingItems");
  if (savedClothingItems) {
    clothingItems = JSON.parse(savedClothingItems);
    renderItems();
  }
}
function getPriceColor(finalPrice) {
  if (finalPrice <= 200) {
    return "green";
  } else if (finalPrice <= 700) {
    return "blue";
  } else {
    return "red";
  }
}
function renderItems() {
    let table = document.querySelector("tbody");
    table.innerHTML = "";
    clothingItems.forEach((clothingItem, index) => {
        let row = document.createElement("tr");
       let price = parseFloat(clothingItem.price);
       let discount = parseFloat(clothingItem.discount);
       let finalPrice = price - (price * discount / 100);
       clothingItem.finalPrice = finalPrice.toFixed(2);
        let priceColor = getPriceColor(finalPrice);
        row.innerHTML = `
            <td>${clothingItem.item}</td>
            <td>${clothingItem.description}</td>
            <td style="color: ${clothingItem.color}; font-weight: bold;">${clothingItem.color}</td>
            <td>${clothingItem.price}</td>
            <td>${clothingItem.discount}%</td>
           <td style="color: ${priceColor}; font-weight: bold;">${clothingItem.finalPrice}</td>
            <td><img src="${clothingItem.picture}" width="100" height="100"></td>
            <td><button onclick="deleteClothingItem(${index})">❌</button></td>
        `;
        table.appendChild(row);
    });
}

function updateColorPreview(color) {
  document.getElementById("colorPreview").style.background = color;
  document.getElementById("colorLabel").style.color = color;
}

function countItemsAndAverage() {
const totalItems = clothingItems.length;
const totalPrice = clothingItems.reduce((sum, item) => sum + parseFloat(item.finalPrice), 0);
const averagePrice = totalItems > 0 ? totalPrice / totalItems : 0

document.getElementById("averagePrice").textContent = `Average Price: ${averagePrice}`;
document.getElementById("totalPrice").textContent = `Total Price: ${totalPrice}`;
document.getElementById("totalItems").textContent = `Total Items: ${totalItems}`;
}
