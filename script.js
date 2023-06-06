const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
// const liValue = document.getElementsByTagName("li");
// const arr = [];

function displayItems() {
  const itemsInStorage = getItemsFromLS();
  itemsInStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}
function onAddItemSubmit(e) {
  e.preventDefault();
  const itemValue = itemInput.value;
  if (itemInput.value === "") {
    const div = document.createElement("div");
    div.className = "no-item";
    const text = document.createTextNode("Please add an item");
    div.appendChild(text);
    document.querySelector("form").appendChild(div);
    setTimeout(() => document.querySelector(".no-item").remove(), 2000);
    return;
  }

  // if (arr.includes(itemInput.value)) {
  //   const div = document.createElement("div");
  //   div.className = "ex-item";
  //   const text = document.createTextNode(
  //     "This item is already present in the list"
  //   );
  //   div.appendChild(text);
  //   document.querySelector("form").appendChild(div);
  //   setTimeout(() => document.querySelector(".ex-item").remove(), 2000);
  // } else {
  // arr.push(itemInput.value);
  addItemToDOM(itemValue);
  additemToLS(itemValue);

  checkUI();
  itemInput.value = "";
  // }
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
function removeItem(e) {
  if (e.target.classList.contains("fa-solid")) {
    // if (confirm("Are you sure?")) {
    // gives a message = [Violation] 'click' handler took 1280ms
    const Item = document.querySelector(".remove-item");
    Item.parentElement.remove();
    // removeItemFromLC(Item.parentElement);
    const textValue = Item.parentElement.textContent;
    removeItemFromLS(textValue);
    checkUI();
    // const arrLength = arr.length;
    // for (let itr = 0; itr < arrLength; itr++) {
    //   if (arr[itr] === itemInput.value) {
    //     console.log(arr[itr]);
    //     console.log(arr);
    //   }
  }

  // for (const itr = 0; itr < liValue.length; itr++) {
  //   if (arr[itr] === itemInput.value) {
  //     console.log(liValue.length);
  //     console.log(arr[itr]);
  //     delete arr[itr];
  //   }
  // }
  // }
  // const itr = 0;
  // while (itr < arr.length) {
  //   if (arr[itr] === itemInput.value) {
  //     arr.splice(itr, 1);
  //   }
  //   itr++;
  // }
  // }
}

function removeItemFromLS(textValue) {
  let itemsInStorage = getItemsFromLS();
  itemsInStorage = itemsInStorage.filter((i) => i !== textValue);
  localStorage.setItem("items", JSON.stringify(itemsInStorage));
}

// function removeItemFromLC(item) {
//   let itemsInStorage = getItemsFromLS();
//   itemsInStorage = console.log(itemsInStorage.filter((i) => i !== item));
//   localStorage.setItem("items", JSON.stringify(itemsInStorage));
// }
function clearItems() {
  //   if (e.target.classList.contains("btn-clear")) {
  //     itemList.innerHTML = " ";
  //   }
  //   itemList.innerHTML = " ";
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

function checkUI() {
  if (itemList.children.length > 0) {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  } else {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  }
}

// function Init() {
itemForm.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", onSearch);
document.addEventListener("DOMContentLoaded", displayItems);
// }

checkUI();
// Init();
