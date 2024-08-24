function IrParaCategoria(i) {
    switch (i) {
        case 1:
            RClass(1);
            break;
        case 2:
            RClass(2);
            break;
        case 3:
            RClass(3);
            break;
        default:
            RClass(0);
            break;
    }
}
function RClass(i) {
    document.querySelector('#F' + i).classList.add("Focus");
    document.querySelector('#F' + i).scrollIntoView({ behavior: 'smooth' });
    setInterval(function () { ReClass(i) }, 1500);
}
function ReClass(i) {
    document.querySelector('#F' + i).classList.remove("Focus");
}
var scrollD = [];
var scrollV = -10000;
var dis = 1500;
var Id = -1;
var speed = 30;
var start = true;
var l;
var al = 0;
var alI = 0;
var maxCategoty = conteudojson.categorias.length;
function ScrollbarControl(right, id) {
    if (scrollV == 0 || scrollV == -10000) {
        if (right) {
            Id = id;
            scrollV = dis;
            l = 1;
            alI = id;
            al += 1;

        }
        else {
            Id = id;
            scrollV = -dis;
            l = -1;
            alI = id;
            al -= 1;
        }
    }
}
setInterval(() => {
    if (start) {
        for (i = 0; i < maxCategoty; i++) {
            document.getElementById("Se" + i).scrollLeft -= 10000;
            scrollD[i] = document.getElementById("Se" + i).scrollLeft;
            document.getElementById(i + "left").style = "display:none;";
            var c = conteudojson.categorias[i];
            var vs = (c.space + 1) * 3;
            for (ii = 0; ii < c.content.length; ii++) {
                if (ii < vs) {
                    document.getElementById(i + "-" + ii).classList.remove("BlockE");
                }
                else {
                    document.getElementById(i + "-" + ii).classList.add("BlockE");
                }
            }
            if (document.getElementById("Se" + i).scrollLeft + document.getElementById("Se" + i).clientWidth === document.getElementById("Se" + i).scrollWidth) {

                document.getElementById(i + "right").style = "display:none;";
            }
        }
        start = false;
    }
    if (Id != -1) {
        if (document.getElementById("Se" + Id).scrollLeft === 0) {
            document.getElementById(Id + "left").style = "display:none;";
        }
        else {
            document.getElementById(Id + "left").style = "display:block;";
        }
        if (document.getElementById("Se" + Id).scrollLeft + document.getElementById("Se" + Id).clientWidth === document.getElementById("Se" + Id).scrollWidth) {

            document.getElementById(Id + "right").style = "display:none;";
        }
        else {

            document.getElementById(Id + "right").style = "display:block;";
        }
        if (scrollV > 0) {
            if (l == -1) {
                scrollV = 0;
            }
            else {
                document.getElementById("Se" + Id).scrollLeft += speed;
                scrollV -= speed;
                scrollD[Id] = document.getElementById("Se" + Id).scrollLeft
            }
        }
        else if (scrollV < 0) {
            if (l == 1) {
                scrollV = 0;
            }
            else {
                document.getElementById("Se" + Id).scrollLeft -= speed;
                scrollV += speed;
                scrollD[Id] = document.getElementById("Se" + Id).scrollLeft
            }
        }
        else {
            scrollD[Id] = document.getElementById("Se" + Id).scrollLeft
            l = 0;
            for (i = 0; i < maxCategoty; i++) {
                var c = conteudojson.categorias[i];
                if (al != 0 && alI == i) {
                    c = conteudojson.categorias[i];
                    c.space += al;
                    al = 0;
                }
                var vs = (c.space + 1) * 3;
                var minS = vs - 3;

                for (ii = 0; ii < c.content.length; ii++) {
                    var m = ((minS + vs) / 2) + 0.5;
                    
                    if (ii < vs && ii >= minS) {
                        document.getElementById(i + "-" + ii).classList.remove("BlockE");
                    }
                    else {

                        document.getElementById(i + "-" + ii).classList.add("BlockE");
                    }
                }
            }
            Id = -1;
        }
    }
}, 5);
setInterval(() => {
    for (i = 0; i < maxCategoty; i++) {
        if (document.getElementById("Se" + i).scrollLeft != scrollD[i] && scrollV == 0 && l == 0) {
            document.getElementById("Se" + i).scrollLeft = scrollD[i];
        }
    }
}, 250);
//Gerador da Pagina
var conteudo = "";
var conteudoNav = "";
var conteudoV = "";
const r = Math.round(Math.random()*(conteudojson.categorias.length-1));
const rr = Math.round(Math.random()*(conteudojson.categorias[r].content.length-1));
var linkR = conteudojson.categorias[r].content[rr].Link;
if (linkR.includes("?")) {
    let [baseUrl, existingParams] = linkR.split("?");
    linkR = baseUrl + "?autoplay=1&mute=1&" + existingParams;
} else {
    linkR += "?autoplay=1&mute=1"; 
}
conteudoV = `<div id="bg"></div><iframe class="ifr" src="${linkR}" allow='autoplay'></iframe>`;
for (i = 0; i < conteudojson.categorias.length; i++) {
    const c = conteudojson.categorias[i];

    conteudoNav += `
    <li>
    <button onclick="IrParaCategoria(${c.id});">${c.Nome}</button>
    </li>
    `;
    conteudo += `
    <!-- Nav Categoria ${c.id}-->
    <nav class='gnav' id="F${c.id}">
    <h1>${c.Nome}</h1>
    <button onclick="ScrollbarControl(false,${c.id})" id="${c.id}left" class="btnL "><</button>
    <button onclick="ScrollbarControl(true,${c.id})" id="${c.id}right" class="btnL btnLR">></button>
    <nav class="VideosL" id="Se${c.id}">
    `;
    var m;
    var p = c.content.length;
    if (c.content.length % 3 == 0) {
        m = c.content.length;
    }
    else if ((c.content.length + 1) % 3 == 0) {
        m = c.content.length + 1;
    }
    else {
        m = c.content.length + 2;
    }

    var cv = c.content[0];
    for (ii = 0; ii < m; ii++) {
        if (ii < p) {
            cv = c.content[ii];
        }
        else {
            cv = c.content[p - ii];
        }
        conteudo += `
    <div class="localV" id="${c.id}-${cv.id}">
   <iframe  src="${cv.Link};controls=0"picture-in-picture; allowfullscreen ></iframe>

    <p>${cv.Nome}</p>
    </div>
    `;
    }
    conteudo += `
    </nav>
    </nav>
    <!-- End Nav Categoria ${c.id}-->
    `;
}
document.getElementById("Content").innerHTML = conteudo;
document.getElementById("contentNav").innerHTML = conteudoNav;
document.getElementById("VP").innerHTML = conteudoV;