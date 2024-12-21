//Función para validar el formulario
function validarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('mail').value;
    const telefono = document.getElementById('telefono').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value;
    let errores = [];

    if (!nombre) errores.push('nombre');
    if (!email) {
        errores.push('email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errores.push('email inválido');
    }
    if (!telefono) errores.push('telefono');
    if (!asunto) errores.push('asunto');
    if (!mensaje) errores.push('mensaje');

    if (errores.length === 0) {
        console.log('Todos los campos están completos.');
        // Puedes agregar la lógica para enviar el formulario aquí (opcional)
    } else {
        console.log('Por favor, completa los siguientes campos: ' + errores.join(', '));
    }
}
  // Asocia la función al evento submit del formulario
  document.getElementById('contacto').addEventListener('submit', validarFormulario);

  // Array de productos
const productos = [
    {
      nombre: "Desfile Nocturno: la noche de los demonios",
      precio: 11000,
      descuento: "19% OFF",
      imagen: "./assets/img/portada-desfile-nocturno.jpg"
    },
    {
      nombre: "Historias Ocultas Volumen 1: Cuatro caminos, cuatro cadenas",
      precio: 11000,
      descuento: "19% OFF",
      imagen: "./assets/img/portada-historias-ocultas-vol-1.jpg"
    },
    {
      nombre: "Historias Ocultas Volumen 2: Leyendas urbanas",
      precio: "Próximamente disponible",
      imagen: "./assets/img/portada-historias-ocultas-vol-2.jpg"
    },
    {
      nombre: "Remera Sello de Pheberiel",
      precio: 18000,
      imagen: "./assets/img/remera-sello-pheberiel.jpg"
    },
    {
      nombre: "Muñeco Coleccionable 'Parabi' #1 - Tomoe Yamato",
      precio: 18000,
      imagen: "./assets/img/funkopop-parabi-tomoe.jpg"
    },
    {
      nombre: "Llaveros de personaje a elección",
      precio: 1500,
      imagen: "./assets/img/llaveros-paramo-sombrio.jpg"
    }
  ];
  
  // Ciclo para mostrar productos en la consola
  productos.forEach(producto => {
    console.log(`Nombre: ${producto.nombre}`);
    console.log(`Precio: ${producto.precio}`);
    if (producto.descuento) console.log(`Descuento: ${producto.descuento}`);
    console.log(`Imagen: ${producto.imagen}`);
    console.log("------------------------");
  });
  
// Función para renderizar productos en el contenedor HTML
function renderizarProductos() {
    const contenedor = document.getElementById('productos-container');
    contenedor.innerHTML = ""; 

    productos.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto';
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: ${producto.precio}</p>
            ${producto.descuento ? `<p>Descuento: ${producto.descuento}</p>` : ""}
            <button class="btn-detalles" data-index="${index}">Ver más</button>
        `;
        contenedor.appendChild(productoDiv);
    });
}

// Función para manejar el evento click y mostrar descripción ampliada
function mostrarDescripcion(event) {
    const productoElemento = event.target.closest('.producto'); // Identifica el artículo clickeado
    if (productoElemento) {
        const index = productoElemento.getAttribute('data-index'); // Obtiene el índice del producto
        if (index !== null) {
            const producto = productos[index];
            alert(`Descripción del producto:\n${producto.descripcion}`);
        }
    }
}

// Asocia el evento click al contenedor de productos
document.getElementById('productos-container').addEventListener('click', mostrarDescripcion);
