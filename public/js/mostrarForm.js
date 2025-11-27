function mostrarF(){
    const formulario = document.querySelector("#formularioAgreg");
    const estilo = window.getComputedStyle(formulario);

    console.log(estilo.display); 

    if(estilo.display === "none"){
        formulario.style.display = "block";
    } else {
        formulario.style.display = "none";
    }
}
