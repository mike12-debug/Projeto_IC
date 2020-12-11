//Grupo:003, Nomes: Francisco Pimenta - 54973, Pedro Quintão - 54971, Miguel Duarte - 54941, Gonçalo Ferreira - 55166

"use strict";
var tabelaOrigin = document.querySelector("#tabela-cuba tbody");
var utilizador = localStorage.getItem("currentAccount")
.slice(1,localStorage.getItem("currentAccount").length -1);

$(document).ready(showNomeAlbum());
$(document).ready(mostraCapaAlbunsWorkspace());
$(document).ready(currentAccPlacer());
//$(document).ready(aplica_filtros());

$("#right-top-right-bar button img").addClass("disabled-image-button")
document.getElementById("botao-eliminar").disabled = true;    
document.getElementById("href-partilhar").disabled = true;

if (localStorage.getItem("imagensImportadas" + utilizador)) {
    document.getElementById("p-album").innerHTML = ""; 
} else {
    document.getElementById("p-album").innerHTML = "Ainda não tem fotografias na galeria.\
    Vá até à página <a href=importar.html>Importar</a> e descarregue as suas primeiras fotografias.";
}

if (localStorage.getItem("criarAlbum") == "True") {
    abreNomeAlbum();
    
    localStorage.setItem("criarAlbum", "False");
}

if (localStorage.getItem("arrayImagensDiferentesAlbuns" + utilizador) == "[]" || localStorage.getItem("arrayImagensDiferentesAlbuns" + utilizador) == null) {
    document.getElementById("botao-selecionar-album").disabled = true;
    document.getElementById("botao-selecionar-todos-album").disabled = true;
} else {
    document.getElementById("botao-selecionar-album").disabled = false;
    document.getElementById("botao-selecionar-todos-album").disabled = false;
}

function abreNomeAlbum() {
    $("#botao-confirmar").addClass("disabled");
    $('input[type=checkbox]').prop('checked', false);
    disableBackground()
    document.getElementsByClassName("album_modal")[0].style.display = "inline-block";
    document.getElementsByClassName("album_modal")[0].style.zIndex = "9";
    document.getElementsByClassName("dimmer")[0].style.opacity = "1";
    if (localStorage.getItem("imagensImportadas" + utilizador) != null) {
        document.getElementById("botao-confirmar").disabled = false;
        document.getElementById("popup-sem-fotos").style.display = "none";
    } else {
        document.getElementById("botao-confirmar").disabled = true;
        document.getElementById("popup-sem-fotos").style.display = "block";
    }
    
}

function currentAccPlacer(){
    var usernameLoggedInToParse = localStorage.getItem("currentAccount");
    var usernameLoggedIn = JSON.parse(usernameLoggedInToParse);
    document.getElementById("usernameCurrentAccount").innerHTML = usernameLoggedIn;
}

function closeNomeAlbum() {
    enableBackground()
    document.getElementsByClassName("album_modal")[0].style.display = "none";
    document.getElementsByClassName("dimmer")[0].style.opacity = "0";
    document.getElementById("popup-sem-fotos").style.display = "none";
    localStorage.removeItem("fotosAlbum" + utilizador);
    enableBackground();
}

function albumCriado() {
    enableBackground()
    document.getElementsByClassName('popup-partilha')[0].style.display ='none';
    document.getElementsByClassName('dimmer')[0].style.opacity = '0';
    document.getElementsByClassName('popupAlbum')[0].style.display ='block';
    document.getElementsByClassName('popup-partilha')[0].style.display ='none';
    $('.popupAlbum').fadeOut(7000);

    localStorage.setItem('album-criado' + utilizador, 'true');

}

function closeCriaAlbum() {
    document.getElementsByClassName('popup-album')[0].style.display ='none';
    document.getElementsByClassName("dimmer")[0].style.opacity = "0";
    document.getElementById("remover-filtros-album").style.display = "none";
    enableBackground()
    tiraFiltros();
}

function openAlbumPhotos() {
    document.getElementsByClassName("dimmer")[0].style.opacity = "1";
    document.getElementById("opcoes-album").style.display = "block";
   
    /* Coloca a primeira foto escolhida para ser a capa do album */
    document.getElementById("fundo-fotos-album").style.display = "block";
}

function closeAlbumPhotos() {
    $("#opcoes-album").fadeToggle(200);
        $("#fundo-fotos-album").fadeToggle(200);/* 
    document.getElementById("opcoes-album").style.display = "none";
    document.getElementById("fundo-fotos-album").style.display = "none"; */
    document.getElementsByClassName("dimmer")[0].style.opacity = "0";
    enableBackground()
}

function closePopupAlbumCriado() {
    document.getElementsByClassName("popupAlbum")[0].style.display = "none";

}

function openFiltros() {
    document.getElementById("imagem_filtros").src = "images/filtros_icon_black1.png";
    if ( document.getElementById("popup-filtros-album").style.display == "block" ) {
        $("#popup-filtros-album").slideUp();
        document.getElementById("imagem_filtros").src = "images/filtros_icon_black.png";
    } else {
        $("#popup-filtros-album").slideDown();
    }
}

function tiraFiltros() {
    document.getElementById("imagem_filtros").src = "images/filtros_icon_black.png";
    document.getElementById("popup-filtros-album").style.display = "none";
    document.getElementById("desfocadas").checked = false;
    document.getElementById("localização").checked = false;
    document.getElementById("jack_russell").checked = false;
    document.getElementById("monumentos").checked = false;
    document.getElementById("praia").checked = false;
    document.getElementById("dia").checked = false;
    document.getElementById("cuba").checked = false;
    document.getElementById("franca").checked = false;
    document.getElementById("filtros-localizacao").style.display = "none";
}

function abreLocalizacao() {
    if (document.getElementById("localização").checked == true) {
        document.getElementById("filtros-localizacao").style.display = "block";
    } else {
        document.getElementById("filtros-localizacao").style.display = "none";
        document.getElementById("cuba").checked = false;
        document.getElementById("franca").checked = false;
    }
}

function aplica_filtros(funcao) {

    if (funcao == "filtros") {
        let imagensFiltradas = []  
        let filtrosDesejados = [] 
        var listFiltrosToParse = localStorage.getItem("imagensFiltros" + utilizador)
        var listFiltrosImgs = JSON.parse(listFiltrosToParse); 
        var checkboxDesfocadas = document.getElementById("desfocadas").checked; 
        var checkboxJack_Russell = document.getElementById("jack_russell").checked; 
        var checkboxMonumentos = document.getElementById("monumentos").checked;
        var checkboxPraia = document.getElementById("praia").checked;
        var checkboxDia = document.getElementById("dia").checked;
        var checkboxFranca = document.getElementById("franca").checked;
        var checkboxCuba = document.getElementById("cuba").checked;
        var checkboxLocalizacao = document.getElementById("localização").checked;
        document.getElementById("remover-filtros-album").style.display = "block";

        localStorage.setItem("desfocadas" + utilizador, checkboxDesfocadas)
        localStorage.setItem("jack_russell" + utilizador, checkboxJack_Russell)
        localStorage.setItem("monumentos" + utilizador, checkboxMonumentos)
        localStorage.setItem("praia" + utilizador, checkboxPraia)
        localStorage.setItem("dia" + utilizador, checkboxDia)
        localStorage.setItem("franca" + utilizador, checkboxFranca)
        localStorage.setItem("cuba" + utilizador, checkboxCuba)

        if(localStorage.getItem("desfocadas" + utilizador) == "true"){    
            filtrosDesejados.push(" Desfocadas")
            for(let img = 0; img < listFiltrosImgs.length; img++) {
                let imageToCheck = listFiltrosImgs[img]["desfocadas"];
                if(imageToCheck == "true"){
                    imagensFiltradas.push(listFiltrosImgs[img])
                }
            }
        }
            if(localStorage.getItem("jack_russell" + utilizador) == "true"){
                filtrosDesejados.push(" Jack Russell")
                for(let img = 0; img < listFiltrosImgs.length; img++) {
                    let imageToCheck = listFiltrosImgs[img]["jack_russell"];
                    if(imageToCheck == "true"){
                        imagensFiltradas.push(listFiltrosImgs[img])
                    }
                }
            }
                if(localStorage.getItem("cuba" + utilizador) == "true"){
                    filtrosDesejados.push(" Cuba")
                    console.log(listFiltrosImgs);
                    for(let img = 0; img < listFiltrosImgs.length; img++) {
                        let imageToCheck = listFiltrosImgs[img]["cuba"];
                        console.log(imageToCheck);
                        if(imageToCheck == "true"){
                            imagensFiltradas.push(listFiltrosImgs[img])
                            console.log(imagensFiltradas)
                        }
                    }
                }
                    if(localStorage.getItem("franca" + utilizador) == "true"){
                        filtrosDesejados.push(" França")
                        console.log(listFiltrosImgs);
                        for(let img = 0; img < listFiltrosImgs.length; img++) {
                            let imageToCheck = listFiltrosImgs[img]["franca"];
                            console.log(imageToCheck);
                            if(imageToCheck == "true"){
                                imagensFiltradas.push(listFiltrosImgs[img])
                                console.log(imagensFiltradas)
                            }
                        }
                    }
                        if(localStorage.getItem("monumentos" + utilizador) == "true"){
                            filtrosDesejados.push(" Monumentos")
                            for(let img = 0; img < listFiltrosImgs.length; img++) {
                                let imageToCheck = listFiltrosImgs[img]["monumentos"];
                                if(imageToCheck == "true"){
                                    imagensFiltradas.push(listFiltrosImgs[img]);
                                }
                            }
                        }
                            if(localStorage.getItem("praia" + utilizador) == "true"){
                                filtrosDesejados.push(" Praia")
                                for(let img = 0; img < listFiltrosImgs.length; img++) {
                                    let imageToCheck = listFiltrosImgs[img]["praia"];
                                    if(imageToCheck == "true"){
                                        imagensFiltradas.push(listFiltrosImgs[img]);
                                    }
                                }                       
                            }
                                if(localStorage.getItem("dia" + utilizador) == "true"){
                                    filtrosDesejados.push(" Dia")
                                    for(let img = 0; img < listFiltrosImgs.length; img++) {
                                        let imageToCheck = listFiltrosImgs[img]["dia"];
                                        if(imageToCheck == "true"){
                                            imagensFiltradas.push(listFiltrosImgs[img])
                                        }
                                    }
                                }
        localStorage.setItem("filtrosSelecionados" + utilizador, filtrosDesejados);
        var srcImagensFiltradas = []; 

        var srcImagensFiltradas = []; 
        for(let i = 0; i < imagensFiltradas.length; i++){
            let srcImg = imagensFiltradas[i]["imgSrcObj"];
            srcImagensFiltradas.push(srcImg);
        }
        var arrayImgFicar = [];
        
        for (var x = 0; x < srcImagensFiltradas.length; x++ ) {
            var imgComparada = srcImagensFiltradas[x];
            for (var y = x + 1; y < srcImagensFiltradas.length; y++ ) {
                var imgComparar = srcImagensFiltradas[y];
                if (imgComparada == imgComparar) {
                    delete srcImagensFiltradas[y];
                } 
            }
        }   

        for (let img of srcImagensFiltradas) {
            if (img != undefined) {
                arrayImgFicar.push(img);
            } 
        }
        var toPLaceInHtml = localStorage.getItem("filtrosSelecionados" + utilizador)
        document.getElementById("text-creation-filtros").innerHTML = "Filtros aplicados:" + toPLaceInHtml;
        var tabela = document.querySelector("#tabela-album tbody");
        tabela.innerHTML=" ";   
        var x = 0
        var trElement;
        for(var i = 0; i < arrayImgFicar.length; i++){
            if(i % 4 == 0 || x == 0){
                trElement = document.createElement('tr');
                trElement.setAttribute('id', "tr${x}");
                x++
            }

            let srcImg = arrayImgFicar[i];
            let linha = document.createElement("td");
            linha.innerHTML = "<label class='option-item-album'>" +
                                "<input type='checkbox' class='checkbox-album'>" +
                                "<div class='option-inner-album'>" +
                                    "<img width='220px' height='140px' src='" + srcImg + "'>" +
                                "</div>" +
                            "</label>";
                    
            trElement.appendChild(linha);
            tabela.appendChild(trElement);
        }

        localStorage.setItem("imagensFiltradas" + utilizador, JSON.stringify(arrayImgFicar));
        checkboxDesfocadas = document.getElementById("desfocadas").checked = false;
        checkboxFranca = document.getElementById("franca").checked = false;
        checkboxCuba = document.getElementById("cuba").checked = false;
        checkboxLocalizacao = document.getElementById("localização").checked = false;
        checkboxJack_Russell = document.getElementById("jack_russell").checked = false;
        checkboxMonumentos = document.getElementById("monumentos").checked = false;
        checkboxPraia = document.getElementById("praia").checked = false;
        checkboxDia = document.getElementById("dia").checked = false;
        document.getElementById("imagem_filtros").src = "images/filtros_icon_black.png";
        document.getElementsByClassName("popupFiltrosAplicados-album")[0].style.display = "block";
        document.getElementById("popup-filtros-album").style.display = "none";
        $('.popupFiltrosAplicados-album').fadeOut(7000);
        console.log(listFiltrosImgs);
        tiraFiltros();

    } else{
        document.getElementById("remover-filtros-album").style.display = "none";
        var toPLaceInHtml = localStorage.getItem("filtrosSelecionados" + utilizador);
        document.getElementById("text-creation-filtros").innerHTML = "";
        var tabela = document.querySelector("#tabela-album tbody");
        let arrayImagens = JSON.parse(localStorage.getItem("imagensImportadas" + utilizador));
        tabela.innerHTML=" ";   
        var x = 0;
        var i = 0;
        var trElement;
        for(let srcImg of arrayImagens){
            if(i % 4 == 0 || x == 0){
                trElement = document.createElement('tr');
                trElement.setAttribute('id', "tr${x}");
                x++
            }

            
            let linha = document.createElement("td");
            linha.innerHTML = "<label class='option-item-album'>" +
                                "<input type='checkbox' class='checkbox-album'>" +
                                "<div class='option-inner-album'>" +
                                    "<img width='220px' height='140px' src='" + srcImg + "'>" +
                                "</div>" +
                            "</label>";
                    
            trElement.appendChild(linha);
            tabela.appendChild(trElement)
            i++;
        }
    
    }
        
}

function closePopupFiltrosAplicados(){
    document.getElementsByClassName("popupFiltrosAplicados-album")[0].style.display = "none"

}

function showNomeAlbum(){

    if (localStorage.getItem("imagensImportadas" + utilizador) != null) {
        document.getElementById("fotos-album").style.display = "block";
    } else {
        document.getElementById("fotos-album").style.display = "none";
    }
}

function nomeAlbumDado(){

    var arrayFotos;
    let arrayNomesAlbum = [];
    let toResetForm = document.forms.nomeDoAlbum;
    let ff = document.forms.nomeDoAlbum.elements.aName.value;
    toResetForm.reset();
    if (localStorage.getItem("nomesAlbums" + utilizador) == null) {
        arrayNomesAlbum.push(ff);
        localStorage.setItem("nomesAlbums" + utilizador, JSON.stringify(arrayNomesAlbum)); 
    } else {
        let nomesAlbums = JSON.parse(localStorage.getItem("nomesAlbums" + utilizador));

        nomesAlbums.push(ff);
        localStorage.setItem("nomesAlbums" + utilizador, JSON.stringify(nomesAlbums));
    }

    if (localStorage.getItem("fotosAlbum" + utilizador) || localStorage.getItem("fotosFavortitosAlbum" + utilizador)) {
        if ( JSON.parse(localStorage.getItem("arrayImagensDiferentesAlbuns" + utilizador)) == null) {
            arrayFotos = [];
        } else {
            arrayFotos = JSON.parse(localStorage.getItem("arrayImagensDiferentesAlbuns" + utilizador))
        }
        if (localStorage.getItem("fotosAlbum" + utilizador)) {
            arrayFotos.push(JSON.parse(localStorage.getItem("fotosAlbum" + utilizador)))
        } else {
            arrayFotos.push(JSON.parse(localStorage.getItem("fotosFavoritosAlbum" + utilizador)))
        }
        
        document.getElementsByClassName("dimmer")[0].style.display = 0;
        arrayFotos.push(JSON.parse(localStorage.getItem("fotosAlbum" + utilizador)))
        localStorage.setItem("arrayImagensDiferentesAlbuns" + utilizador, JSON.stringify(arrayFotos));
        mostraCapaAlbunsWorkspace();
        enableBackground();
        location.reload();
    } else {
        preencheTabelaAlbum();
        document.getElementsByClassName('popup-album')[0].style.display ='block';
    }

    localStorage.removeItem("fotosAlbum" + utilizador)
    document.getElementsByClassName("album_modal")[0].style.display = "none";
    
}

function verificaCampo(){
    if (document.forms.nomeDoAlbum.elements.aName.value == "") {
        document.getElementById("botao-confirmar").disabled = true;  
    } else {
        $("#botao-confirmar").removeClass("disabled");
        document.getElementById("botao-confirmar").disabled = false;
    }
}

function open_popup(popup) {
    let numeroAlbunsEliminados = document.querySelectorAll('input[type=checkbox]:checked').length
    if (numeroAlbunsEliminados > 1) {
        document.getElementsByClassName("numero-albuns-eliminar")[0].innerHTML = "Tem a certeza que pretende eliminar " + numeroAlbunsEliminados + " álbuns?"
    } else {
        document.getElementsByClassName("numero-albuns-eliminar")[0].innerHTML = "Tem a certeza que pretende eliminar o álbum selecionado?"
    }
    
    document.getElementsByClassName("dimmer")[0].style.opacity="1"
    document.getElementById(popup).style.display = "block";
    disableBackground();   
}

function close_popup(popup) {
    document.getElementsByClassName("dimmer")[0].style.opacity="0"
    document.getElementById(popup).style.display = "none";
    enableBackground();
}

function preencheTabelaAlbum() {

    if (JSON.parse(localStorage.getItem("fotosAlbum" + utilizador))) {
        var arrayImagens = JSON.parse(localStorage.getItem("fotosAlbum" + utilizador))
    } else if (JSON.parse(localStorage.getItem("fotosFavortitosAlbum" + utilizador))) {
        var arrayImagens = JSON.parse(localStorage.getItem("fotosFavortitosAlbum" + utilizador))
    } else {
        var arrayImagens = JSON.parse(localStorage.getItem("imagensImportadas" + utilizador))
    }
   
    var tabela = document.querySelector("#tabela-album tbody");
    tabela.innerHTML = "";
    var x = 0;
    var i = 0;
    var trElement;        
    for (let imagens of arrayImagens) {
            if(i%4 == 0 || x == 0){
                trElement = document.createElement('tr');
                trElement.setAttribute('id', `tr${x}`);
                x++;
            }

            let linha = document.createElement("td");
            linha.innerHTML = "<label class='option-item-album'>" +
                                "<input type='checkbox' onclick='imagem_selecionada()' class='checkbox-album'>" +
                                "<div class='option-inner-album'>" +
                                    "<img width='220px' height='140px' src='" + imagens + "'>" +
                                "</div>" +
                            "</label>";
            trElement.appendChild(linha);
            tabela.appendChild(trElement);
            i++;

            }

    
}


/* aqui cria cada album */
function preencheTabelaAlbumCriado() {
    
    if (document.querySelectorAll('input[type=checkbox]:checked').length != 0) {
  
        var arrayImagensGuardadas = document.querySelectorAll('input[type=checkbox]:checked'); 
        var tabela = document.querySelector("#fotos-album tbody");
        tabela.innerHTML = "";
        var x = 0;
        var i = 0;
        var trElement;
        var arrayFotos;
        var arrayImagensAlbuns = [];
    
        if ( JSON.parse(localStorage.getItem("arrayImagensDiferentesAlbuns" + utilizador)) == null) {
            arrayFotos = [];
        } else {
            arrayFotos = JSON.parse(localStorage.getItem("arrayImagensDiferentesAlbuns" + utilizador))
        }
    
        /* Cria tabela que vai conter as fotos que vão ficar no album */
        for (let input of arrayImagensGuardadas) {
                
            if(i%4 == 0 || x == 0){
                trElement = document.createElement('tr');
                trElement.setAttribute('id', `tr${x}`);
                x++;
            }
            let src = input.parentElement.children[1].children[0].getAttribute('src');
            arrayImagensAlbuns.push(src);
            
            let linha = document.createElement("td");
            linha.innerHTML = "<label class='option-item-album'>" +
                                    "<input type='checkbox' class='checkbox-album'>" +
                                    "<div class='option-inner-album'>" +
                                        "<img width='220px' height='140px' src='" + src + "'>" +
                                    "</div>" +
                                "</label>";
            trElement.appendChild(linha);
            tabela.appendChild(trElement);
            i++; 
             
        }
        arrayFotos.push(arrayImagensAlbuns);
        localStorage.setItem("arrayImagensDiferentesAlbuns" + utilizador, JSON.stringify(arrayFotos));
        document.getElementsByClassName('popup-album')[0].style.display ='none';
        document.getElementsByClassName('dimmer')[0].style.opacity = '0';
        document.getElementsByClassName('popupAlbum')[0].style.display ='block';
        $('.popupAlbum').fadeOut(7000);
        mostraCapaAlbunsWorkspace();
        enableBackground()
    }
    document.getElementById("remover-filtros-album").style.display = "none";
    /* window.location.reload() */
}  

/* Aqui mostra o album selecionado no workspace */
function mostraAlbumSelecionado(indice) {

    if (document.getElementById("botao-selecionar-album").innerHTML == "Selecionar") {

        disableBackground();
        $("input[type=checkbox]").attr("disabled", true);
        localStorage.setItem("indiceAlbumAMostrar" + utilizador, indice)
        var arrayImagensGuardadas = JSON.parse(localStorage.getItem("arrayImagensDiferentesAlbuns" + utilizador))[indice]; 
        var tabela = document.querySelector("#fotos-album tbody");
        tabela.innerHTML = "";
        var x = 0;
        var i = 0;
        var trElement;
        /* Cria tabela que vai conter as fotos que vão ficar no album */
        for (let input of arrayImagensGuardadas) {
                
            if(i%4 == 0 || x == 0){
                trElement = document.createElement('tr');
                trElement.setAttribute('id', `tr${x}`);
                x++;
            }
            
            let linha = document.createElement("td");
            linha.innerHTML = "<label class='option-item-album'>" +
                                    "<div class='option-inner-album' onclick=close_open_slideShow('abrir','" + input + "')>" +
                                        "<img width='220px' height='140px' src='" + input + "'>" +
                                    "</div>" +
                                "</label>";
            trElement.appendChild(linha);
            tabela.appendChild(trElement);
            i++; 

            
        }
        document.getElementsByClassName("dimmer")[0].style.opacity = "1";
        $("#opcoes-album").fadeToggle(200);
        $("#fundo-fotos-album").fadeToggle(200);
        /* document.getElementById("opcoes-album").style.display = "block";
        document.getElementById("fundo-fotos-album").style.display = "block"; */ 
    }
}   

function mostraCapaAlbunsWorkspace() {  

    if (localStorage.getItem("arrayImagensDiferentesAlbuns" + utilizador) != null & localStorage.getItem("arrayImagensDiferentesAlbuns" + utilizador) != [] ) {
        
        let nomesAlbums = JSON.parse(localStorage.getItem("nomesAlbums" + utilizador));
        for(var i = 0; i < nomesAlbums.length; i++) {

            document.getElementById("botao-selecionar-album").disabled = false;
            document.getElementById("botao-selecionar-todos-album").disabled = false;
            document.getElementById("botao-eliminar").disabled = false;
            document.getElementById("botao-partilhar").disabled = false;
            var arrayImagensDiferentesAlbuns = JSON.parse(localStorage.getItem("arrayImagensDiferentesAlbuns" + utilizador));  
            var tabela = document.querySelector("#disposicao-albuns-tabela tbody");
            tabela.innerHTML = "";
            var x = 0;
            var i = 0;
            var trElement;
            var contador = 0;
            for (let imagens of arrayImagensDiferentesAlbuns) {
                let ff = nomesAlbums[i];
                    if(i%4 == 0 || x == 0){
                        trElement = document.createElement('tr');
                        trElement.setAttribute('id', `tr${x}`);
                        x++;
                    }
                    let linha = document.createElement("td");
                    linha.innerHTML = "<label class='option-item'>" +
                                        "<input type='checkbox' id=" + contador + " class='checkbox'>" +
                                        "<div class='option-inner margin-bottom-capa-album' onclick='mostraAlbumSelecionado(" + contador + ")'>" +
                                            "<img width='250px' height='155px' src='" + imagens[0] + "'>" +
                                            ff +
                                        "</div>" +
                                    "</label>";
                    trElement.appendChild(linha);
                    tabela.appendChild(trElement);
                    i++;
                    contador++;
                    }
            
            document.getElementsByClassName("dimmer")[0].style.opacity="0"
            document.getElementsByClassName('popup-album')[0].style.display ='none';
        }

        } else {
            document.getElementById("botao-selecionar-album").disabled = true;
            document.getElementById("botao-selecionar-todos-album").disabled = true;
            document.getElementById("botao-eliminar").disabled = true;
            document.getElementById("botao-partilhar").disabled = true;
        }

        if (localStorage.getItem("imagensImportadas" + utilizador) != null) {
            document.getElementById("botao-criar-album").disabled = false;
        } else {
            document.getElementById("botao-criar-album").disabled = true;
        }
    
}

function disableBackground() {
    $("#side-bar").addClass("disabled");
    $("#right-top-right-bar").addClass("disabled");
    $("#left-top-right-bar").addClass("disabled");
    $("#memento").addClass("disabled");
}

function enableBackground() {
    $("#side-bar").removeClass("disabled");
    $("#right-top-right-bar").removeClass("disabled");
    $("#left-top-right-bar").removeClass("disabled");
    $("#memento").removeClass("disabled");
}

function enable_galeria() {

    if (document.getElementById("botao-selecionar-album").innerHTML == "Selecionar") {
        document.getElementById("botao-selecionar-album").innerHTML = "Cancelar"
        $("input[type=checkbox]").attr("disabled", false);
        document.getElementById("href-partilhar").href = "partilhar.html";
        document.getElementById("botao-criar-album").disabled = true;

    } else {
        document.getElementById("botao-selecionar-album").innerHTML = "Selecionar"
        $("input[type=checkbox]").attr("disabled", true);
        document.getElementById("botao-criar-album").disabled = false;
        document.getElementById("botao-eliminar").disabled = true;
        document.getElementById("botao-partilhar").disabled = true;
        document.getElementById("href-partilhar").disabled = true;
        document.getElementById("href-partilhar").href = ""; 
        $("#right-top-right-bar button img").addClass("disabled-image-button");
        

        for (let imagem of document.querySelectorAll('input[type=checkbox]:checked')) {
            imagem.checked = false; 
        }   
    }
}   

function imagem_selecionada() {
    
    if (document.querySelectorAll('input[type=checkbox]:checked').length > 0) {
        $("#right-top-right-bar button img").removeClass("disabled-image-button");
        document.getElementById("botao-criar-album").disabled = false;

        document.getElementById("botao-eliminar").disabled = false;
        document.getElementById("botao-partilhar").disabled = false;
        document.getElementById("href-partilhar").disabled = false;
        document.getElementById("href-partilhar").href = "partilhar.html";
    } else {
        $("#right-top-right-bar button img").addClass("disabled-image-button");
        document.getElementById("botao-eliminar").disabled = true;    
        document.getElementById("botao-criar-album").disabled = true;
        document.getElementById("href-partilhar").disabled = true;
        document.getElementById("href-partilhar").href = "";
    }
}  

var elementos = document.querySelectorAll('input[type=checkbox]');
for (let element of elementos) {
    element.addEventListener("change", imagem_selecionada);
}

function selecionaTodos(input) {
    
    if (input == "album") {
        var boxes = document.getElementsByClassName("checkbox");
    } else {
        var boxes = document.getElementsByClassName("checkbox-album");
    }
    
    if (document.querySelectorAll('input[type=checkbox]:checked').length == 0) {
        for (var x = 0; x < boxes.length; x++) {
            var obj = boxes[x];
            obj.checked = true;
            imagem_selecionada();
            document.getElementById("botao-criar-album").disabled = true;
        }
    } else {
        for (var x = 0; x < boxes.length; x++) {
            var obj = boxes[x];
            obj.checked = false;
            $("#right-top-right-bar button img").addClass("disabled-image-button");
            document.getElementById("botao-eliminar").disabled = true;   
            document.getElementById("href-partilhar").disabled = true;
            document.getElementById("botao-criar-album").disabled = false;
            document.getElementById("href-partilhar").href = "";
        }
    }
}

function open_dropup() {
    if (document.getElementsByClassName("dropup-content")[0].style.display == "none" || 
    document.getElementsByClassName("dropup-content")[0].style.display == "") {
      document.getElementsByClassName("dropup-content")[0].style.display = "block";
      $('.dropup-content').fadeIn(100);
    } else {
      $('.dropup-content').fadeOut(100);
    }
    
}

function delete_albums() {
    let arrayApagar = document.querySelectorAll('#disposicao-albuns-tabela input[type=checkbox]:checked');
    let arrayAlbums = JSON.parse(localStorage.getItem('arrayImagensDiferentesAlbuns' + utilizador));
    let nomesAlbums = JSON.parse(localStorage.getItem('nomesAlbums' + utilizador));
    let indexesApagar = [];
    let arrayAlbumsFicar = [];
    let arrayNomesFicar = [];

    for (let albumApagado of arrayApagar) {
       let indexApagar = albumApagado.getAttribute('id');
       indexesApagar.push(indexApagar);
    }

    for (let index of indexesApagar) {
        delete arrayAlbums[index];
        delete nomesAlbums[index]; 
    }

    for (let album of arrayAlbums) {
        if (album != undefined) {
            arrayAlbumsFicar.push(album);
        } 
    }

    for (let nome of nomesAlbums) {
        if (nome != undefined) {
            arrayNomesFicar.push(nome);
        } 
    }

    localStorage.setItem('arrayImagensDiferentesAlbuns' + utilizador, JSON.stringify(arrayAlbumsFicar));
    localStorage.setItem('nomesAlbums' + utilizador, JSON.stringify(arrayNomesFicar));

    for (let album of document.querySelectorAll('#disposicao-albuns-tabela input[type=checkbox]:checked')) {
        album.checked = false; 
    }

    window.location.reload()
}

function slideShow(direcao) {
    
    let indiceAlbumAMostrar = localStorage.getItem("indiceAlbumAMostrar" + utilizador);
    var arrayImagensImportadas = JSON.parse(localStorage.getItem("arrayImagensDiferentesAlbuns" + utilizador))[indiceAlbumAMostrar];
    var tamanhoArray = arrayImagensImportadas.length;
    var imagemInicial = document.getElementById("imagemCarrossel").getAttribute("src");
    var indiceImagemAtual = (arrayImagensImportadas.indexOf(imagemInicial));
        
    if (direcao == "direita") {  
        if (arrayImagensImportadas.indexOf
        (arrayImagensImportadas[indiceImagemAtual + 1]) == tamanhoArray - 1) {
            document.getElementById("seta-direita").style.display = "none";
        } else {
            document.getElementById("seta-direita").style.display = "block";
        }
        var imagemAlterada = document.getElementById("imagemCarrossel").src = arrayImagensImportadas[indiceImagemAtual + 1 ];
        document.getElementsByClassName("numero-fotografias")[0].innerHTML = (indiceImagemAtual + 2) + "/" + tamanhoArray;  
    } else {
        if (arrayImagensImportadas.indexOf
        (arrayImagensImportadas[indiceImagemAtual - 1]) == 0) {
            document.getElementById("seta-esquerda").style.display = "none";
        } else {
            document.getElementById("seta-esquerda").style.display = "block";
        }
        var imagemAlterada = document.getElementById("imagemCarrossel").src = arrayImagensImportadas[indiceImagemAtual - 1];   
        document.getElementsByClassName("numero-fotografias")[0].innerHTML = (indiceImagemAtual) + "/" + tamanhoArray;
    }
    
    var indiceImagemAlterada = arrayImagensImportadas.indexOf(imagemAlterada);
    localStorage.setItem("imagemAtual", arrayImagensImportadas[indiceImagemAtual + 1 ]);

    if (indiceImagemAlterada == 0) {
        document.getElementById("seta-esquerda").style.display = "none";
        document.getElementById("seta-direita").style.display = "block";
    } else if (indiceImagemAlterada == tamanhoArray -1) {
        document.getElementById("seta-esquerda").style.display = "block";
        document.getElementById("seta-direita").style.display = "none";
    } else {
        document.getElementById("seta-esquerda").style.display = "block";
        document.getElementById("seta-direita").style.display = "block";
    }
   

    
}

function close_open_slideShow(funcao, imagem) {


    document.getElementById("disposicao-albuns").disabled = true;   
    document.getElementById("imagemCarrossel").src = imagem;
    let indiceAlbumAMostrar = localStorage.getItem("indiceAlbumAMostrar" + utilizador);
    var arrayImagensImportadas = JSON.parse(localStorage.getItem("arrayImagensDiferentesAlbuns" + utilizador))[indiceAlbumAMostrar];
    var tamanhoArray = arrayImagensImportadas.length;
    let imagemInicial = document.getElementById("imagemCarrossel").getAttribute("src");
    let indiceImagemAtual = (arrayImagensImportadas.indexOf(imagemInicial));

    if($("input[type=checkbox]").attr("disabled")) {
        if (funcao == "fechar") {
            document.getElementById("imagemCarrossel").src = localStorage.getItem("imagemAtual");
            document.getElementById('fundo-fotos-album').style.display ='block';
            $(".slideShow").fadeToggle(200)  
            document.getElementById('fotos-album').style.display ='block';
            document.getElementById('opcoes-album').style.display ='block';
            document.getElementsByClassName("slideShow")[0].style.display = "none";
            document.getElementsByClassName("numero-fotografias")[0].style.display = "none";
            
            
    } else {
        document.getElementById('fundo-fotos-album').style.display ='none';
        document.getElementById('fotos-album').style.display ='none';
        document.getElementById('opcoes-album').style.display ='none';
        $(".slideShow").fadeToggle(200);
        document.getElementsByClassName("dimmer")[0].style.opacity="1";
        document.getElementById("imagemCarrossel").src = imagem;
        document.getElementsByClassName("numero-fotografias")[0].style.display = "block";
        document.getElementsByClassName("numero-fotografias")[0].innerHTML = (indiceImagemAtual + 1) + "/" + tamanhoArray;
        localStorage.setItem("imagemAtual", imagem);

        }
    }

    if (arrayImagensImportadas.indexOf
    (arrayImagensImportadas[indiceImagemAtual]) == tamanhoArray - 1) {
        document.getElementById("seta-direita").style.display = "none";
    } else {
        document.getElementById("seta-direita").style.display = "block";
    }

    if (arrayImagensImportadas.indexOf
        (arrayImagensImportadas[indiceImagemAtual]) == 0) {
            document.getElementById("seta-esquerda").style.display = "none";
    } else {
        document.getElementById("seta-esquerda").style.display = "block";
    }
    
}

function guardarFotosAlbum() {

    let albunsList = [];

        for (let input of document.querySelectorAll('input[type=checkbox]:checked')) {
            let srcAlbum = input.parentElement.children[1].children[0].getAttribute('src');
            albunsList.push(srcAlbum)
        }
    
        localStorage.setItem("albunsPartilhar" + utilizador, JSON.stringify(albunsList))
}