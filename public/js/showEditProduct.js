function showFE(){
    const formulario = document.querySelector("#formularioEdit");
    const estilo = window.getComputedStyle(formulario);

    if(estilo.display === "none"){
        formulario.style.display = "block";
    } else {
        formulario.style.display = "none";
    }
}
