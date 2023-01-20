

const back = document.querySelector(".back");

const container = document.querySelector(".row");

window.addEventListener("load", () => {
    const ninjas = JSON.parse(localStorage.getItem("moreAboutNinja"));
    console.log(ninjas);
    cardTemplate(ninjas);
})


function cardTemplate(base) {
    const template = `
        <div class="card">
            <div class="card_image">
                <img src="${base.image}">
            </div>
            <div class="aboutNinja">
                <h2><span>Name:</span> ${base.name}</h2>
                <h2><span>Power:</span> ${base.power}</h2>
                <h2><span>Village:</span> ${base.village}</h2>
                <h2><span>Level:</span> ${base.level}</h2>
                <h2><span>Clan:</span> ${base.clan}</h2>
            </div>
        </div>
    `

    container.innerHTML = template;
}


back.addEventListener("click", (e) => {
    e.preventDefault();

    window.open("../index.html", "_self");
})
