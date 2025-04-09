// cart.js

let items = [];

function renderItems() {
  const list = document.getElementById("itemList");
  list.innerHTML = '';

  items.forEach((item, index) => {
    list.innerHTML += `
      <li class="bg-white p-4 rounded shadow flex justify-between items-center">
        <div>
          <strong>${item.name}</strong> - $${item.price}
        </div>
        <div>
          <button onclick="editItem(${index})" class="text-blue-500 hover:underline mr-2">Edit</button>
          <button onclick="deleteItem(${index})" class="text-red-500 hover:underline">Delete</button>
        </div>
      </li>
    `;
  });
}

function addItem() {
  const name = document.getElementById("itemName").value.trim();
  const price = document.getElementById("itemPrice").value.trim();

  if (!name || !price) {
    alert("Please enter both name and price.");
    return;
  }

  items.push({ name, price });
  renderItems();

  document.getElementById("itemName").value = '';
  document.getElementById("itemPrice").value = '';
}

function deleteItem(index) {
  items.splice(index, 1);
  renderItems();
}

function editItem(index) {
  const newName = prompt("Enter new item name:", items[index].name);
  const newPrice = prompt("Enter new price:", items[index].price);

  if (newName && newPrice) {
    items[index].name = newName;
    items[index].price = newPrice;
    renderItems();
  }
}
