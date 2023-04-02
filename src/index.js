let addToy = false;

function fetchData() {
  fetch("http://localhost:3000/toys")
    .then((resp) => resp.json())
    .then((characters) => characters.forEach((toys) => showList(toys)));
}

function showList(toys) {
  let div1 = document.getElementById("toy-collection");
  let div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `<h2>${toys.name}</h2>
<img src="${toys.image}" class="toy-avatar" />
<p>${toys.likes} Likes</p>
<button class="like-btn" id="${toys.id}">Like ❤️</button>`;

  div1.appendChild(div);

  document.getElementById("add-toy-form").addEventListener("submit", (e) => {
    event.preventDefault();
    let name = event.target.name.value;
    let image = event.target.image.value;

    fetch(`http://localhost:3000/toys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        image: image,
        likes: 0,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Successful.`);
        } else {
          console.error(`Failed.`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
