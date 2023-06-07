const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

function displayItems() {
  const itemsInStorage = getItemsFromLS();
  itemsInStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}
function onAddItemSubmit(e) {
  e.preventDefault();
  const itemValue = itemInput.value;
  if (itemValue === "") {
    const div = document.createElement("div");
    div.className = "no-item";
    const text = document.createTextNode("Please add an item");
    div.appendChild(text);
    document.querySelector("form").appendChild(div);
    setTimeout(() => document.querySelector(".no-item").remove(), 2000);
    return;
  }

  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".editItemColor");
    console.log("x");
    removeItemFromLS(itemToEdit.textContent);
    itemToEdit.classList.remove("editItemColor");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (noDuplicate(itemValue)) {
      const div = document.createElement("div");
      div.className = "no-dup-item";
      const text = document.createTextNode("Item already exits");
      div.appendChild(text);
      document.querySelector("form").appendChild(div);
      setTimeout(() => document.querySelector(".no-dup-item").remove(), 2000);
      return;
    }
  }

  addItemToDOM(itemValue);
  additemToLS(itemValue);

  checkUI();
  itemInput.value = "";
}

function addItemToDOM(item) {
  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);
}

function additemToLS(item) {
  // add item to local storage
  const itemsInStorage = getItemsFromLS();
  itemsInStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemsInStorage));
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function getItemsFromLS() {
  let itemsInStorage;
  if (localStorage.getItem("items") === null) {
    itemsInStorage = [];
  } else {
    itemsInStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsInStorage;
}
function removeItem(item) {
  // if (confirm("Are you sure?")) {
  item.remove();
  removeItemFromLS(item.textContent);
  checkUI();
  // }
}

function removeItemFromLS(textValue) {
  let itemsInStorage = getItemsFromLS();
  itemsInStorage = itemsInStorage.filter((i) => i !== textValue);
  localStorage.setItem("items", JSON.stringify(itemsInStorage));
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
    checkUI();
  }
  localStorage.removeItem("items");
}

function onSearch() {
  const text = itemFilter.value.toLowerCase();
  const items = itemList.querySelectorAll("li");
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    item.style.display = itemName.includes(text) ? "flex" : "none";
  });
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else if (e.target.closest("li")) {
    editItem(e.target);
  }
}

function noDuplicate(item) {
  const itemsInStorage = getItemsFromLS();
  return itemsInStorage.includes(item);
}

function editItem(item) {
  let isEditMode = true;
  itemList.querySelectorAll("li").forEach((i) => {
    i.classList.remove("editItemColor");
  });
  item.classList.add("editItemColor");
  formBtn.innerHTML = "Update item";
  formBtn.style.backgroundColor = "#228822";
  itemInput.value = item.textContent;
}

function checkUI() {
  itemInput.value = "";
  if (itemList.children.length > 0) {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  } else {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  }
  formBtn.innerHTML = "Add item";
  formBtn.style.backgroundColor = "#333";
  isEditMode = false;
}

function Init() {
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", onSearch);
  document.addEventListener("DOMContentLoaded", displayItems);
}

checkUI();
Init();
