const database = [
    {
        id:1,
        name:'Naruto Uzumaki',
        power:'Nine tails',
        village:'Konoha',
        level:'7th Hokage',
        clan:'Uzumaki',
        image:'https://pa1.narvii.com/7422/b16cfd8029b2e6a4ec1764b3644e9396fa8d209dr1-480-270_hq.gif'
    },
    {   
        id:2,
        name:'Sasuke Uchiha',
        power:'Rinnegan + MS',
        village:'Konoha',
        level:'Shadow Hokage',
        clan:'Uchiha',
        image:'https://i.pinimg.com/originals/71/48/c8/7148c82838437c6d8ad478848e68d482.gif '
    },
    {
        id:3,
        name:'Kakashi Hatake',
        power:'Purple Chidori + MS',
        village:'Konoha',
        level:'6th Hokage',
        clan:'White Claw',
        image:'https://thumbs.gfycat.com/TotalOptimalAmericantoad-size_restricted.gif'
    },
    {
        id:4,
        name:'Minato Namikaze',
        power:'Rasengan + Yellow flash Fuuijin',
        village:'Konoha',
        level:'4th Hokage',
        clan:'Namikaze',
        image:'https://thumbs.gfycat.com/SaltyLateBasil-size_restricted.gif'
    },
    {
        id:5,
        name:'Itachi Uchiha',
        power:'MS + Genjutsu',
        village:'Konoha',
        level:'Unlimited',
        clan:'Akatsuki',
        image:'https://media0.giphy.com/media/CchzkJJ6UrQmQ/giphy.gif'
    },
    {
        id:6,
        name:'Madara Uchiha',
        power:'MS + Six Path',
        village:'Konoha',
        level:'Destroyer',
        clan:'Akatsuki',
        image:'https://media1.tenor.com/images/fe60d20d14d53b4e0929b0a0b17c0781/tenor.gif?itemid=17049380'
    },
    {
        id:7,
        name:'Hashirama Senju',
        power:'Wood Style + Regeneration',
        village:'Konoha',
        level:'God of War',
        clan:'Senju',
        image:'https://i.makeagif.com/media/7-28-2016/_eMaFk.gif'
    },
    {
        id:8,
        name:'Pain (Tendo)',
        power:'Six path',
        village:'Hidden Rain',
        level:'God',
        clan:'Akatsuki',
        image:'https://thumbs.gfycat.com/JampackedExcitableHydra-size_restricted.gif'
    },
    {
        id:9,
        name:'Commando A',
        power:'Light shield',
        village:'Hidden Cloud',
        level:'4th Hokage',
        clan:'Lighter',
        image:'https://i.pinimg.com/originals/93/85/90/938590c23c6565490f49b7f4646f7601.gif'
    },
    {
        id:10,
        name:'Gaara',
        power:'Shukakus Land',
        village:'Hidden Land',
        level:'5th Kazekage',
        clan:'Land',
        image:'https://i.gifer.com/C393.gif'
    },
    {
        id:11,
        name:'Kisame Hoshikage',
        power:'White Shark + Water Style',
        village:'Hidden Rain',
        level:'Untail bijuu',
        clan:'Akatsuki',
        image:'https://steamuserimages-a.akamaihd.net/ugc/941711796106927460/EDA08FFEF3AFDFFCD5241FD00926BCB4DAF47C09/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
    },
    {
        id:12,
        name:'Killer B',
        power:'Eight Tail + Katana',
        village:'Hidden Cloud',
        level:'Rap God',
        clan:'Lighter',
        image:'https://qph.fs.quoracdn.net/main-qimg-8380be95c048107f587b8a5ebf70fd9f'
    },    
    
]

const names = document.querySelector(".names");

const lastnames = document.querySelector(".lastnames");

const avatares = document.querySelector(".avatares");

const signOut = document.querySelector(".signOut");

const select = document.querySelector(".select");

const search = document.querySelector(".search");

const bars = document.querySelector(".bars");

const sidebar = document.querySelector(".sidebar");

const container = document.querySelector(".row");


window.addEventListener("load", () => {
    if(!localStorage.getItem("ninjas")) {
        localStorage.setItem("ninjas", JSON.stringify(database));
    } else {
        const ninjas = JSON.parse(localStorage.getItem("ninjas"));

        const ninjasWithID = ninjas.map((item, index) => {
            return {...item, id: index}
        })

        localStorage.setItem("ninjas", JSON.stringify(ninjasWithID));

        const newNinjas = JSON.parse(localStorage.getItem("ninjas"));

        cardTemplate(newNinjas);

    }
})



function cardTemplate(base) {
    const template = base.map(({name, image, id}) => {
        return `
            <div class="card">
                <h2>${name}</h2>

                <img src="${image}">
                
                <button onclick="More('${id}')">More</button>
                <button class="delete" onclick="Delete(${id})">Delete</button>
            </div>
        `
    }).join("");

    container.innerHTML = template;
}


function More(id) {
    const ninjas = JSON.parse(localStorage.getItem("ninjas"));
    const founded = ninjas.find(item => item.id === parseInt(id));

    localStorage.setItem("moreAboutNinja", JSON.stringify(founded));
    window.open("../more.html", "_self");
}


function Delete(id) {
    console.log(id);
    const ninja = JSON.parse(localStorage.getItem("ninjas"));

    const filtered = ninja.filter(item => item.id !== id);

    localStorage.setItem("ninjas", JSON.stringify(filtered));

    window.location.reload();
}


signOut.addEventListener("click", (btn) => {
    btn.preventDefault();

    localStorage.setItem("access_token", "false");

    localStorage.setItem("currentUser", null);

    window.open("../auth.html", "_self");
})



window.addEventListener("load", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    names.innerHTML = currentUser.name;
})


window.addEventListener("load", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    lastnames.innerHTML = currentUser.lastname;
})


window.addEventListener("load", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    avatares.innerHTML = `<img src="${currentUser.avatar}">` ;
})


window.addEventListener("load", () => {
    if(!localStorage.getItem("access_token") || localStorage.getItem("access_token") === "false") {
        window.open("../auth.html", "_self");
    }
})



select.addEventListener("change", e => {
    const value = e.target.value;

    var mode = ["name", "village", "clan"];

    if(mode.includes(value)) {
        search.setAttribute("placeholder", `Search by ${value}`);
    }
})


search.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();

    const ninjas = JSON.parse(localStorage.getItem("ninjas"));

    if(select.value === "name") {
        const filtered = ninjas.filter(item => item.name.toLowerCase().includes(value));
        cardTemplate(filtered);
    } else if (select.value === "clan") {
        const filtered = ninjas.filter(item => item.clan.toLowerCase().includes(value));
        cardTemplate(filtered);
    } else {
        const filtered = ninjas.filter(item => item.village.toLowerCase().includes(value));
        cardTemplate(filtered);
    }
})



bars.addEventListener("click", e => {
    e.preventDefault();

    bars.classList.toggle("activeBar");

    sidebar.classList.toggle("activeSidebar");
})



const name = document.querySelector(".name");

const power = document.querySelector(".power");

const village = document.querySelector(".village");

const image = document.querySelector(".image");

const clan = document.querySelector(".clan");

const level = document.querySelector(".level");

const addNinja = document.querySelector(".addNinja");

const error = document.querySelector(".error");


addNinja.addEventListener("click", (e) => {
    e.preventDefault();

    if(name.value !== "" && image.value !== "" && power.value !== "" && village !== "" && clan !== "" && level.value !== "") {
        const ninjas = JSON.parse(localStorage.getItem("ninjas"));

        localStorage.setItem("ninjas", JSON.stringify(
            [
                ...ninjas,
                {
                    name: name.value,
                    power: power.value,
                    village: village.value,
                    clan: clan.value,
                    level: level.value,
                    image: image.value
                }
            ]
        ))

        window.location.reload();

    } else {
        error.innerHTML = "Все поля должны быть заполнены!"
    }
})





