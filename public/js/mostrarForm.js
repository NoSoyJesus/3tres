function mostrarF(){
    const formulario = document.querySelector("#formularioAgreg");
    const estilo = window.getComputedStyle(formulario);

    if(estilo.display === "none"){
        formulario.style.display = "block";
    } else {
        formulario.style.display = "none";
    }
}
