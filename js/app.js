// Variables 

const marcaSelect = document.querySelector('#marca');
const yearSelect = document.querySelector('#year');
const precioMinSelect = document.querySelector('#minimo');
const precioMaxSelect = document.querySelector('#maximo');
const puertasSelect = document.querySelector('#puertas');
const transmisionSelect = document.querySelector('#transmision');
const colorSelect = document.querySelector('#color');


// Contenedor para los resultados
const resultado = document.querySelector('#resultado');

const yearMaximo = new Date().getFullYear(); //Nos traera el año actual
const yearMinimo = yearMaximo - 10;

// Generar un objeto con la busqueda que selecciona en los options

const datosBusquedaSeleccion = {
        marcaOptn: '',
        yearOptn: '',
        precioMinOptn: '',
        precioMaxOptn: '',
        puertasOptn: '',
        transmisionOptn: '',
        colorOptn: ''
}

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // Muestra los autos al cargar 


    // LLena las opciones de años (years)
    llenarSelectYear();
}); 

// Event listener para los select de busqueda que seleccionas
marcaSelect.addEventListener('change', (evento) => {
    datosBusquedaSeleccion.marcaOptn = evento.target.value;

    filtrarAutoGeneral();
});

yearSelect.addEventListener('change', (evento) => {
    datosBusquedaSeleccion.yearOptn = parseInt(evento.target.value);

    filtrarAutoGeneral();
});

precioMinSelect.addEventListener('change', (evento) => {
    datosBusquedaSeleccion.precioMinOptn = parseInt(evento.target.value);

    filtrarAutoGeneral();
});

precioMaxSelect.addEventListener('change', (evento) => {
    datosBusquedaSeleccion.precioMaxOptn = evento.target.value;

    filtrarAutoGeneral();
});

puertasSelect.addEventListener('change', (evento) => {
    datosBusquedaSeleccion.puertasOptn = parseInt(evento.target.value);

    filtrarAutoGeneral();
});

transmisionSelect.addEventListener('change', (evento) => {
    datosBusquedaSeleccion.transmisionOptn = evento.target.value;

    filtrarAutoGeneral();
});

colorSelect.addEventListener('change', (evento) => {
    datosBusquedaSeleccion.colorOptn = evento.target.value;

    filtrarAutoGeneral();

    // console.log(datosBusquedaSeleccion);
});



// Funciones
function mostrarAutos (autos) {
    
    limpiarHTML();
    
    autos.forEach(auto => {
        
        const {marca, modelo, year, puertas, transmision, precio, color} = auto; //Destructuring, simplifia el T. String
        
        const autoHTML = document.createElement('P');

        autoHTML.innerHTML = `Marca: <strong>${marca}</strong>  - Modelo: <strong>${modelo}</strong> - Año: <strong>${year}</strong> - N° de Puertas: <strong>${puertas}</strong> - Transmisión: <strong>${transmision}</strong> - Precio: <strong>S/.${precio}</strong> - Color: <strong>${color}</strong>
        
        `;
    
    // Insertar en el HTML el resultado"

    resultado.appendChild(autoHTML);

    });
}

// Limpiar HTML (Se refiere al HTML inyectado previo del appendChild)

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

// Genera los años del select - year
function llenarSelectYear() { 
    for (let i = yearMaximo; i >= yearMinimo; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion) //Agrega las opciones de año al selectyear tanto en valor como en text content
    }
};

// Funcion que filtra en base a la busqueda 
function filtrarAutoGeneral () {
    const resultado = autos.filter(filtrarMarcaAuto).filter(filtrarYearAuto).filter(filtrarPrecioMinAuto).filter(filtrarPrecioMaxAuto).filter(filtrarPuertasAuto).filter(filtrarTrasmision).filter(filtrarColor);
    
    if (resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado() {

    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultado';
    resultado.appendChild(noResultado);
}


function filtrarMarcaAuto (automovil) {
    if (datosBusquedaSeleccion.marcaOptn) {
        return automovil.marca === datosBusquedaSeleccion.marcaOptn;
    }
    return automovil;
}

function filtrarYearAuto(automovil) {
    if (datosBusquedaSeleccion.yearOptn) {
        return automovil.year === datosBusquedaSeleccion.yearOptn;
    }
    return automovil;
};

function filtrarPrecioMinAuto (automovil) {
    if (datosBusquedaSeleccion.precioMinOptn) {
        return automovil.precio >= datosBusquedaSeleccion.precioMinOptn;
    }
    return automovil;
}

function filtrarPrecioMaxAuto (automovil) {
    if (datosBusquedaSeleccion.precioMaxOptn) {
        return automovil.precio <= datosBusquedaSeleccion.precioMaxOptn;
    }
    return automovil;
}

function filtrarPuertasAuto(automovil) {
    if (datosBusquedaSeleccion.puertasOptn) {
        return automovil.puertas === datosBusquedaSeleccion.puertasOptn;
    }
    return automovil;
}

function filtrarTrasmision (automovil) {
    if (datosBusquedaSeleccion.transmisionOptn) {
        return automovil.transmision === datosBusquedaSeleccion.transmisionOptn;
    }
    return automovil;
}

function filtrarColor (automovil) {
    if (datosBusquedaSeleccion.colorOptn) {
        return automovil.color === datosBusquedaSeleccion.colorOptn;
    }
    return automovil;
}
