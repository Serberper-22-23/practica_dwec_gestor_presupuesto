
"use strict";


import * as gestionPresupuesto from './gestionPresupuesto.js';
function mostrarDatoEnId (idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    if (elemento){
        elemento.textContent = valor;
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
    descripDiv.classList.add("gasto-descripcion");
    descripDiv.textContent = gasto.descripcion;
    // luego la fecha 
    let fechaDiv = document.createElement("div");
    fechaDiv.classList.add("gasto-fecha");
    //convertimos las fecha.
    let fechaString = new Date(gasto.fecha).toLocaleDateString();
    fechaDiv.textContent = fechaString;
    // luego la fecha 
    let valorDiv = document.createElement("div");
    valorDiv.classList.add("gasto-valor");
    valorDiv.textContent = gasto.valor;

    // las etiquetas
    let etiquetasDiv = document.createElement("div");
    etiquetasDiv.classList.add("gasto-etiquetas");

    for (let etiqueta of gasto.etiquetas){
        let spanEtiquetas = document.createElement("span");
        spanEtiquetas.classList.add("gasto-etiquetas-etiqueta");
        spanEtiquetas.textContent = etiqueta ;
        spanEtiquetas.style.display = "block";
        etiquetasDiv.appendChild(spanEtiquetas);
        let handlerBorraEtiquetas = new BorrarEtiquetasHandle();
        handlerBorraEtiquetas.gasto = gasto;
        handlerBorraEtiquetas.etiqueta = etiqueta;
        spanEtiquetas.addEventListener('click', handlerBorraEtiquetas);
       
        

    }
    nuevoGastoDiv.appendChild(descripDiv);
    nuevoGastoDiv.appendChild(fechaDiv);
    nuevoGastoDiv.appendChild(valorDiv);
    nuevoGastoDiv.appendChild(etiquetasDiv);
    container.appendChild(nuevoGastoDiv);

    let botonEditar = document.createElement("button");
    //hay que definir el botón para que no sea submit.
    botonEditar.type = "button";
    botonEditar.className = "gasto-editar";
    botonEditar.textContent = "Editar";
    //Crear un nuevo objeto a partir de la función constructora EditarHandle.
    let handlerEditar = new editarHandle(gasto);
    botonEditar.addEventListener('click', handlerEditar);
    nuevoGastoDiv.appendChild(botonEditar);

    let botonBorrar = document.createElement("button");
    botonBorrar.type = "button";
    botonBorrar.className = "gasto-borrar";
    botonBorrar.textContent = "Borrar";
    let handlerBorrar = new BorrarHandle (gasto);
    botonBorrar.addEventListener('click', handlerBorrar);
    nuevoGastoDiv.appendChild(botonBorrar);

} else {
    console.error('El contenedor con el id ' + idElemento + ' no fue encontrado.');
}


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
        claveSpan.textContent= clave + ": ";
        dato.appendChild(claveSpan)
        let datoSpan = document.createElement("span");
        datoSpan.classList.add("agrupacion-dato-valor");
        datoSpan.textContent = valor ;
        dato.appendChild(datoSpan);
        nwAgrup.appendChild(dato);
    }
    elemento.appendChild(nwAgrup);
}

function repintar () {
    gestionPresupuesto.mostrarPresupuesto();
    //Mostrar el presupuesto en div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
    mostrarDatoEnId ("presupuesto",gestionPresupuesto.mostrarPresupuesto());
    //Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
    mostrarDatoEnId ("gastos-totales", gestionPresupuesto.calcularTotalGastos());
    //Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
    mostrarDatoEnId ("balance-total", gestionPresupuesto.calcularBalance());
    //Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información. Puedes utilizar innerHTML para borrar el contenido de dicha capa.
    document.getElementById("listado-gastos-completo").innerHTML = '';
    //Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
    let listaGastos = gestionPresupuesto.listarGastos();

    for (let gasto of listaGastos){
    mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}
function actualizarPresupuestoWeb () {
    //pedir el nuevo presupuesto, hay que pasarlo a valor
let nuevoPresupuestoStr = prompt("Introduce el nuevo presupuesto:");
let nuevoPresupuesto = parseFloat(nuevoPresupuestoStr);
gestionPresupuesto.actualizarPresupuesto(nuevoPresupuesto);
repintar();
}

let btnActualPresupuesto = document.getElementById("actualizarpresupuesto");
btnActualPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb () {
let nwDescripcion = prompt('Introduce la descripción del gasto');
let valGasto = parseFloat(prompt("Introduce el valor del gasto"));
let nwFecha = prompt("Introduce la fecha del gasto en formato yyyy-mm-dd");
let nombresEtiqueta = prompt("Introduce las etiquetas separadas por ,");
let arrayEtiquetas = nombresEtiqueta.split(',');

let nwGasto = new gestionPresupuesto.CrearGasto (nwDescripcion, valGasto, nwFecha, arrayEtiquetas);

gestionPresupuesto.anyadirGasto(nwGasto);
repintar();
}
let btnAnyadirGasto = document.getElementById("anyadirgasto");
btnAnyadirGasto.addEventListener("click", nuevoGastoWeb);

function editarHandle (gasto) {
    this.gasto = gasto;
    this.handleEvent = function (){
    let nwDescripcion = prompt('Introduce el la nueva descripción del gasto');
    let valGasto = parseFloat(prompt("Introduce el nuevo valor del gasto"));
    let nwFecha = prompt("Introduce la nueva fecha del gasto en formato yyyy-mm-dd");
    let nombresEtiqueta = prompt("Introduce las nuevas etiquetas separadas por ,");
    //borramos todas las eetiquetas
    this.gasto.etiquetas = [];
    this.gasto.actualizarDescripcion(nwDescripcion);
    this.gasto.actualizarValor(valGasto);
    this.gasto.actualizarFecha(nwFecha);
    this.gasto.anyadirEtiquetas(...nombresEtiqueta.split(", "));
    repintar();
    }
}

function BorrarHandle (gasto){
    this.gasto = gasto;
    this.handleEvent = function(){
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}
function BorrarEtiquetasHandle () {

    this.handleEvent = function () {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}


    




export{
mostrarDatoEnId,
mostrarGastoWeb,
mostrarGastosAgrupadosWeb
}