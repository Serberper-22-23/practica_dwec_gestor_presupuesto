



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
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elemento = document.getElementById(idElemento);
    let nwAgrup = document.createElement("div");
    nwAgrup.classList.add("agrupacion");
    let cabecera = document.createElement("h1");
    cabecera.textContent = `Gastos agrupados por ${periodo}`;
    nwAgrup.appendChild(cabecera);
    for(let [clave, valor] of Object.entries(agrup)){
        let dato = document.createElement("div");
        dato.classList.add("agrupacion-dato");
        let claveSpan = document.createElement("span");
        claveSpan.classList.add("agrupacion-dato-clave");
        claveSpan.textContent= clave ;
        dato.appendChild(claveSpan)
        let datoSpan = document.createElement("span");
        valorSpan.classList.add("agrupacion-dato-valor");
        valorSpan.textContent = valor ;
        dato.appendChild(datoSpan);
        nwAgrup.appendChild(dato);
    }
    elemento.appendChild(nwAgrup);
}

export{
mostrarDatoEnId,
mostrarGastoWeb,
mostrarGastosAgrupadosWeb
}