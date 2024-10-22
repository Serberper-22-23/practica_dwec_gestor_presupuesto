// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let gastos = [];
let idGasto = 0;


// TODO: Variable global
let presupuesto = 0;


function actualizarPresupuesto(valor) {
    // TODO
    if (typeof(valor) === 'number' && valor>=0 ){
        presupuesto = valor;
        return presupuesto;

    }
    else {
        console.log(`El valor ${valor} no es válido`);
        return -1;
    }

}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}


function CrearGasto( descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    if((typeof valor !== 'number' || valor < 0) ){
        this.valor =0;
    }
    else{
        this.valor = valor;
    }
    // Métodos del objeto, estructura this. + función anónima.
    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${descripcion} con valor ${valor} €`;  
    }

    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
    } 
    // traduccion de parámetro fecha a objeto
    let ms = Date.parse(fecha);
        // si ms es  no válido ms, será funcion now
    if (isNaN(ms)){
        ms = Date.now();

    }
    //Si no asignamos a la propiedad fecha
    else {
        this.fecha = ms;
    }
    //Crear y aplicar la función añadir
    this.etiquetas = [];
    
   
      this.anyadirEtiquetas(...etiquetas);

   
    this.actualizarValor = function (valor) {

        if(valor>0){
            this.valor=valor;
        }
    }
   
  
  }
// funcion prototipo de añadir etiquetas.
//  CrearGasto.prototype.
CrearGasto.prototype.anyadirEtiquetas = function(...etiquetas) {
  
    etiquetas.forEach(etiqueta => {
        let etiquetaExistente = false;
        for (let i = 0; i < this.etiquetas.length; i++) {
          if (this.etiquetas[i] === etiqueta) {
            etiquetaExistente = true;
            break;
          }
        }
  
        if (!etiquetaExistente) {
          this.etiquetas.push(etiqueta);
        }
      });
};




  //Función sin parámetros que devolverá la variable global gastos.
  function listarGastos () {
    return gastos;
  }
  
    //Añadir al objeto gasto pasado como parámetro una propiedad id cuyo valor será el valor actual de la variable global idGasto.
   // Incrementar el valor de la variable global idGasto.
    //Añadir el objeto gasto pasado como parámetro a la variable global gastos. El gasto se debe añadir al final del array.

  function anyadirGasto (gasto) {
    gasto.id = idGasto++ ;
    gastos.push(gasto);
  }
  //Función de 1 parámetro que eliminará de la variable global gastos el objeto gasto cuyo id haya sido pasado como parámetro. 
  //Si no existe un gasto con el id proporcionado, no hará nada.Recuerda que JS tiene la igualdad absoluta
  function borrarGasto (idBorrar) {
    let pos = gastos.findIndex(gasto => gasto.id == idBorrar);
    if (pos!=-1){
    gastos.splice(pos,1);
    }

  }
  //Función sin parámetros que devuelva la suma de todos los gastos creados en la variable global gastos
  //Cuando dicen que devuelva es un return
  //acumulador + gasto , sum 

  function calcularTotalGastos () {
    return gastos.reduce((sum, gasto) => sum + gasto.valor, 0);

  }
  function calcularBalance (){
    return presupuesto - calcularTotalGastos();

  } 


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
     anyadirGasto, 
     borrarGasto, 
     calcularTotalGastos,
     calcularBalance

}
