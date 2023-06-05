const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
// const liValue = document.getElementsByTagName("li");
// const arr = [];

function addItem(e) {
  e.preventDefault();

  if (itemInput.value === "") {
    const div = document.createElement("div");
    div.className = "no-item";
    const text = document.createTextNode("Please add an item");
    div.appendChild(text);
    document.querySelector("form").appendChild(div);
    setTimeout(() => document.querySelector(".no-item").remove(), 2000);
    return;
  }

  const li = document.createElement("li");
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
  li.appendChild(document.createTextNode(itemInput.value));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  itemList.appendChild(li);
  checkUI();
  itemInput.value = "";
  // }
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

function removeItem(e) {
  if (e.target.classList.contains("fa-solid")) {
    // if (confirm("Are you sure?")) {
    // gives a message = [Violation] 'click' handler took 1280ms
    const Item = document.querySelector(".remove-item");
    Item.parentElement.remove();
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

function clearItems() {
  //   if (e.target.classList.contains("btn-clear")) {
  //     itemList.innerHTML = " ";
  //   }
  //   itemList.innerHTML = " ";
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
    checkUI();
  }
  // console.log(arr.splice(0, arr.length));
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

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", onSearch);

checkUI();
