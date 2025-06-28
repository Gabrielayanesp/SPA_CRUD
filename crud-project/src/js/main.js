// Array that stores the products in inventory
let inventory = [];

const objInventory = {
  id: "",
  name: "",
  price: "",
  category: "",
};

// Variable to determine if we are in editing mode
let editando = false;

// Selection of DOM elements
const form = document.querySelector("#form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const categoryInput = document.querySelector("#category");
const btnAdd = document.querySelector("#btnAdd");

// Add a listener event for the form
form.addEventListener("submit", validateForm);

// Function that validates the form before adding or editing a product
function validateForm(e) {
  e.preventDefault(); // Avoid the default behavior of the form

  if (
    nameInput.value === "" ||
    priceInput.value === "" ||
    categoryInput.value === ""
  ) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  if (editando) {
    editInventory();
    editando = false;
  } else {
    const existe = inventory.some((p) => p.name === nameInput.value);
    if (existe) {
      alert("Este producto ya existe.");
      return;
    }

    objInventory.id = Date.now();
    objInventory.name = nameInput.value;
    objInventory.price = priceInput.value;
    objInventory.category = categoryInput.value;

    addInventory();
  }
}

// Function that adds a product to the inventory
function addInventory() {
  inventory.push({ ...objInventory });
  showInventory();
  form.reset();
  cleanObject();
  showConsoleLogs();
}

// Function that clears the values ​​of the inventory object
function cleanObject() {
  objInventory.id = "";
  objInventory.name = "";
  objInventory.price = "";
  objInventory.category = "";
}

// Function that displays all products in inventory
function showInventory() {
  cleanHTML();
  const divInventory = document.querySelector(".div-inventory");

  // Go through the inventory and create items for each product
  inventory.forEach((inventory) => {
    const { id, name, price, category } = inventory;

    const paragraph = document.createElement("p");
    paragraph.textContent = `${id} - ${name} - ${price} - ${category}`;
    paragraph.dataset.id = id;

    // Edit button
    const editButton = document.createElement("button");
    editButton.onclick = () => loadInventory(inventory);
    editButton.textContent = "Edit";
    editButton.classList.add("btn", "btn-edit");
    paragraph.append(editButton);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.onclick = () => deleteInventory(id);
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-delete");
    paragraph.append(deleteButton);

    const hr = document.createElement("hr");
    divInventory.appendChild(paragraph);
    divInventory.appendChild(hr);
  });
}

function loadInventory(inventory) {
  const { id, name, price, category } = inventory;

  nameInput.value = name;
  priceInput.value = price;
  categoryInput.value = category;

  objInventory.id = id;

  form.querySelector('button[type="submit"]').textContent = "Update";

  editando = true;
}

function editInventory() {
  objInventory.name = nameInput.value;
  objInventory.price = priceInput.value;
  objInventory.category = categoryInput.value;

  inventory = inventory.map((inventory) => {
    if (inventory.id === objInventory.id) {
      return { ...objInventory };
    }
    return inventory;
  });

  cleanHTML();
  showInventory();
  form.reset();
  form.querySelector('button[type="submit"]').textContent = "Add";
  editando = false;
}

function deleteInventory(id) {
  inventory = inventory.filter((inventory) => inventory.id !== id);
  cleanHTML();
  showInventory();
  showConsoleLogs();
}

function cleanHTML() {
  const divInventory = document.querySelector(".div-inventory");
  while (divInventory.firstChild) {
    divInventory.removeChild(divInventory.firstChild);
  }
}

function showConsoleLogs() {
  console.clear();
  console.log("Pruebas completas de gestión de datos:");

  console.log("Lista de productos (Objeto):");
  for (const i in inventory) {
    console.log(`Producto ID: ${inventory[i].id}, Detalles:`, inventory[i]);
  }

  const setProductos = new Set(inventory.map((p) => p.name));
  console.log("Set de productos únicos:");
  for (const nombre of setProductos) {
    console.log("Producto único:", nombre);
  }

  const mapProductos = new Map();
  inventory.forEach((p) => {
    mapProductos.set(p.category, p.name);
  });

  console.log("Map de productos y categorías:");
  mapProductos.forEach((producto, categoria) => {
    console.log(`Categoría: ${categoria}, Producto: ${producto}`);
  });
}
