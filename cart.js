let items = [];

function renderItems() {
  const list = document.getElementById("itemList");
  list.innerHTML = '';

  items.forEach((item, index) => {
    const total = item.quantity * item.price;
    list.innerHTML += `
      <li class="bg-white p-4 rounded shadow flex justify-between items-center">
        <div>
          <strong>${item.name}</strong><br>
          ₹${item.price} × ${item.quantity} = <strong>₹${total}</strong>
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
  const price = parseFloat(document.getElementById("itemPrice").value.trim());
  const quantity = parseInt(document.getElementById("itemQty").value.trim());

  if (!name || isNaN(price) || isNaN(quantity) || quantity <= 0) {
    alert("Please enter valid item name, price and quantity.");
    return;
  }

  items.push({ name, price, quantity });
  renderItems();

  document.getElementById("itemName").value = '';
  document.getElementById("itemPrice").value = '';
  document.getElementById("itemQty").value = '';
}

function deleteItem(index) {
  items.splice(index, 1);
  renderItems();
}

function editItem(index) {
  const newName = prompt("Enter new item name:", items[index].name);
  const newPrice = parseFloat(prompt("Enter new price:", items[index].price));
  const newQty = parseInt(prompt("Enter new quantity:", items[index].quantity));

  if (newName && !isNaN(newPrice) && !isNaN(newQty) && newQty > 0) {
    items[index] = { name: newName, price: newPrice, quantity: newQty };
    renderItems();
  }
}
