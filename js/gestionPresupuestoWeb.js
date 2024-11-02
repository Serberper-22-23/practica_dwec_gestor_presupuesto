



function mostrarDatoEnId (idElemento, valor) {
    let elemento = getElementById(idElemento);
    if (elemento){
        elemento.textContent=valor;
    } else {
        console.error( 'El elemento con id'+ idElemento + 'no fue encontrado.');
    }


}
function mostrarGastoWeb (idElemento, gasto){
let container = document.getElementById(idElemento);
if (container){
    //primero los creamos primero divGasto.
    let nuevoGastoDiv = document.createElement("div");
    nuevoGastoDiv.classList.add("gasto");
    // luego su descripción
    let descripDiv = document.createElement("div");
    descripDiv.classList.add("gasto-descripción");
    // luego la fecha 
    let fechaDiv = document.createElement("div");
    fechaDiv.classList.add("gasto-fecha");
    //convertimos las fecha.
    let fechaString = new Date(gasto.fecha).toLocaleDateString();
    fechaDiv.textContent = fechaString;
    // luego la fecha 
    let valorDiv = document.createElement("div");
    valorDiv.classList.add("gasto-valor");

    // las etiquetas
    let etiquetasDiv = document.createElement("div");
    etiquetasDiv.classList.add("gasto-etiquetas");

    for (let etiqueta of gasto.etiquetas){
        let spanEtiquetas = document.createElement("span");
        spanEtiquetas.classList.add("gasto-etiquetas-gasto");
        spanEtiquetas.textContent = etiqueta + " ";
        etiquetasDiv.appendChild(spanEtiquetas);
    }
    nuevoGastoDiv.appendChild(descripDiv);
    nuevoGastoDiv.appendChild(fechaDiv);
    nuevoGastoDiv.appendChild(valorDiv);
    nuevoGastoDiv.appendChild(etiquetasDiv);
}
container.appendChild(nuevoGastoDiv);

}


export{
mostrarDatoEnId,
mostrarGastoWeb,
mostrarGastosAgrupadosWeb
}