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


  //Función sin parámetros que devolverá la variable global gastos.
  function listarGastos () {
    return gastos;
  }
  
  function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
  
    // Validar el valor
    if (typeof valor !== 'number' || valor < 0) {
      this.valor = 0;
    } else {
      this.valor = valor;
    }
  
    // Función mostrarGasto
    this.mostrarGasto = function () {
      return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };
  
    // Función para actualizar la descripción
    this.actualizarDescripcion = function (descripcion) {
      this.descripcion = descripcion;
    };
  
    // Validar la fecha
    let ms = Date.parse(fecha);
    if (isNaN(ms)) {
      this.fecha = Date.now(); // Si no es válida, se toma la fecha actual
    } else {
      this.fecha = ms;
    }
    this.anyadirEtiquetas = function (...etiquetas) {
      etiquetas.forEach(etiqueta => {
        if (!this.etiquetas.includes(etiqueta)) {
          this.etiquetas.push(etiqueta);
        }
      });
    };
  
    // Inicialización de etiquetas
    this.etiquetas = [];
        // Función para añadir etiquetas (ahora definida dentro del constructor)

    this.anyadirEtiquetas(...etiquetas); // Aquí ya está disponible `this.anyadirEtiquetas`
  
    // Función para actualizar el valor
    this.actualizarValor = function (valor) {
      if (valor > 0) {
        this.valor = valor;
      }
    };
  
    // Función para mostrar el gasto completo
    this.mostrarGastoCompleto = function () {
      let fechaTexto = new Date(this.fecha).toLocaleString();
      let etiTex = this.etiquetas.map(etiqueta => `- ${etiqueta}`).join('\n');
      let texto = `Gasto correspondiente a descripción del gasto con valor ${this.valor} €.\nFecha: ${fechaTexto}\nEtiquetas:\n${etiTex}`;
      return texto;
    };
  
    // Función para actualizar la fecha
    this.actualizarFecha = function (nwDate) {
      let parsedDate = Date.parse(nwDate);
      if (!isNaN(parsedDate)) {
        this.fecha = parsedDate;
      }
    };
  
    // Función para borrar etiquetas
    this.borrarEtiquetas = function (...etiquetas) {
      let newEti = [];
      for (let eti of this.etiquetas) {
        if (etiquetas.indexOf(eti) === -1) {
          newEti.push(eti);
        }
      }
      this.etiquetas = newEti;
    };
  
    // Función para obtener el período de agrupación
    this.obtenerPeriodoAgrupacion = function (periodo) {
      let nwDate = new Date(this.fecha);
      let anyo = nwDate.getFullYear();
      let mes = nwDate.getMonth() + 1;
      let dia = nwDate.getDate();
  
      return periodo === "anyo" ? `${anyo}` :
        periodo === "mes" && mes < 10 ? `${anyo}-0${mes}` :
          periodo === "mes" && mes <= 12 ? `${anyo}-${mes}` :
            periodo === "dia" && dia < 10 && mes < 10 ? `${anyo}-0${mes}-0${dia}` :
              periodo === "dia" && dia < 10 && mes <= 12 ? `${anyo}-${mes}-0${dia}` :
                periodo === "dia" && dia >= 10 && mes < 10 ? `${anyo}-0${mes}-${dia}` :
                  periodo === "dia" && dia >= 10 && mes <= 12 ? `${anyo}-${mes}-${dia}` :
                    "Fecha no válida";
    };
  

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
  function filtrarGastos (filtros) {

  return gastos.filter((gasto)=>{

    if (filtros.fechaDesde){
      let fechaDesde = Date.parse(filtros.fechaDesde);
      //si el gasto es anterior a la fecha mas baja o no hay fecha desde, iremos insertando las condicines para no cumplir
      if (isNaN(fechaDesde) || gasto.fecha < fechaDesde) {
        return false;
      }
    }
    if (filtros.fechaHasta){
      let fechaHasta = Date.parse(filtros.fechaHasta);
      //si el gasto es anterior a la fecha mas baja o no hay fecha desde
      if (isNaN(fechaHasta) || gasto.fecha > fechaHasta) {
        return false;
      }
    }
    if (filtros.valorMinimo && gasto.valor < filtros.valorMinimo){
      return false;
    }
    if (filtros.valorMaximo && gasto.valor > filtros.valorMaximo){
      return false;
    }

    if (filtros.descripcionContiene &&
        !gasto.descripcion.toLowerCase().includes(filtros.descripcionContiene.toLowerCase())){
      return false;
    }
    if (
      filtros.etiquetasTiene && Array.isArray(filtros.etiquetasTiene) &&
      filtros.etiquetasTiene.length > 0 && !filtros.etiquetasTiene.some((etiqueta) =>
        gasto.etiquetas.includes(etiqueta.toLowerCase())
      )
    ) {
      return false;
    }

    return true;

  });

  }
  function agruparGastos ( periodo = "mes", etiquetas = [], fechaDesde, fechaHasta) {
    let gastosFiltro = filtrarGastos({
      fechaDesde: fechaDesde,
      fechaHasta: fechaHasta,
      etiquetasTiene: etiquetas
    });
    let resultado = gastosFiltro.reduce((acumulador, gasto) => {
      let idPeriodo = gasto.obtenerPeriodoAgrupacion(periodo);
      acumulador[idPeriodo] = ((acumulador[idPeriodo] || 0) + gasto.valor);
      return acumulador;
    }, {});
      return resultado;

    }
  
  function transformarListadoEtiquetas(textoEtiquetas){
    // Regex de lo que buscamos
    let regex= /[^,.:;\s] +/gi;
    //Capturamos el string
    let etiquetas = str.match(regex);
    // cadena encontrada
    return etiquetas;

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
     calcularBalance,
     filtrarGastos,
     agruparGastos,
     transformarListadoEtiquetas

}
