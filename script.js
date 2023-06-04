const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");

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
  li.appendChild(document.createTextNode(itemInput.value));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  itemList.appendChild(li);
  itemInput.value = "";
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
  if (e.target.id.contains("fa-solid")) {
    // if (confirm("Are you sure?")) {
    // gives a message = [Violation] 'click' handler took 1280ms
    const Item = document.querySelector(".remove-item");
    Item.parentElement.remove();
    // }
  }
}

function clearItem() {
  //   if (e.target.classList.contains("btn-clear")) {
  //     itemList.innerHTML = " ";
  //   }
  //   itemList.innerHTML = " ";
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
}
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItem);
