// Función para validar el formulario
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
  } else {
      console.log('Por favor, completa los siguientes campos: ' + errores.join(', '));
  }
}

// Asocia la función al evento submit del formulario
document.getElementById('contacto').addEventListener('submit', validarFormulario);

// Array de productos con descripciones ampliadas
const productos = [
  {
      id: 1,
      nombre: "Desfile Nocturno: la noche de los demonios",
      precio: 11000,
      descuento: "19% OFF",
      imagen: "./assets/img/portada-desfile-nocturno.jpg",
      descripcion: "Una novela de terror que transcurre en Buenos Aires del 2017. Mediante un pacto con el diablo, un grupo de secundaria libera toda clase de demonios en la ciudad."
  },
  {
      nombre: "Historias Ocultas Volumen 1: Cuatro caminos, cuatro cadenas",
      precio: 11000,
      descuento: "19% OFF",
      imagen: "./assets/img/portada-historias-ocultas-vol-1.jpg",
      descripcion: "Cuatro relatos interconectados que revelan secretos oscuros de quienes se atreven a buscar respuestas."
  },
  {
      id: 2,
      nombre: "Historias Ocultas Volumen 2: Leyendas urbanas",
      precio: "Próximamente disponible",
      imagen: "./assets/img/portada-historias-ocultas-vol-2.jpg",
      descripcion: "Descubre las leyendas urbanas que nadie se atreve a contar. Disponible pronto."
  },
  {
      id: 3,
      nombre: "Remera Sello de Pheberiel",
      precio: 18000,
      imagen: "./assets/img/remera-sello-pheberiel.jpg",
      descripcion: "Remera negra de algodón con el emblemático sello de Pheberiel estampado con los colores de Páramo Sombrío: verde y negro."
  },
  {
      id: 4,
      nombre: "Muñeco Coleccionable 'Parabi' #1 - Tomoe Yamato",
      precio: 18000,
      imagen: "./assets/img/funkopop-parabi-tomoe.jpg",
      descripcion: "Figura coleccionable hecha con impresora 3d del personaje Tomoe Yamato."
  },
  {
     id: 5,
      nombre: "Llaveros de personaje a elección",
      precio: 1500,
      imagen: "./assets/img/llaveros-paramo-sombrio.jpg",
      descripcion: "Llaveros de alta calidad con ilustraciones de los personajes favoritos de nuestras historias."
  }
];

// Función para generar una lista de productos en la consola
function listarProductosEnConsola() {
    console.log("Lista de productos disponibles:");
    productos.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.nombre} - Precio: ${producto.precio}`);
    });
}

// Llamar a la función para mostrar los productos en la consola
listarProductosEnConsola();

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
  const boton = event.target.closest('.btn-detalles'); // Identifica el botón clickeado
  if (boton) {
      const index = boton.getAttribute('data-index'); // Obtiene el índice del producto
      if (index !== null) {
          const producto = productos[index];
          alert(`Descripción del producto:\n${producto.descripcion}`);
      }
  }
}

// Renderiza los productos al cargar la página
renderizarProductos();

// Asocia el evento click al contenedor de productos
document.getElementById('productos-container').addEventListener('click', mostrarDescripcion);


// Obtener la referencia al elemento de la lista de provincias
const listaProvincias = document.getElementById('lista-provincias');

// Hacer la petición a la API y actualizar la lista
fetch('https://apis.datos.gob.ar/georef/api/provincias')
  .then(response => response.json())
  .then(data => {
    const provinciasList = document.getElementById('lista-provincias');

    data.provincias.forEach(provincia => {
      const provinciaCard = document.createElement('div');
      provinciaCard.classList.add('provincia-card');

      const provinciaTitle = document.createElement('h3');
      provinciaTitle.textContent = provincia.nombre;

      provinciaCard.appendChild(provinciaTitle);
      provinciasList.appendChild(provinciaCard);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
  const productosContainer = document.getElementById('productos-container');

// Función para crear un botón "Añadir al carrito"
function crearBotonAgregar(productoId) {
  const boton = document.createElement('button');
  boton.textContent = 'Añadir al carrito';
  boton.addEventListener('click', () => {
    agregarAlCarrito(productoId);
  });
  return boton;
}

// Iteramos sobre cada producto y agregamos el botón
productos.forEach((producto, index) => {
  const productoDiv = document.querySelector(`.producto:nth-child(${index + 1})`);
  const botonAgregar = crearBotonAgregar(producto.id);
  productoDiv.appendChild(botonAgregar);
});

// Array para almacenar los productos en el carrito
let carrito = [];

// Función para agregar un producto al carrito de compras
function agregarAlCarrito(productoId) {
  const producto = productos.find(p => p.id === productoId);
  if (producto) {
    const productoEnCarrito = carrito.find(p => p.id === productoId);
    if (productoEnCarrito) {
      productoEnCarrito.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    console.log('Producto agregado al carrito:', producto);
    actualizarCarrito();
  } else {
    console.log('Producto no encontrado');
  }
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
  const carritoContainer = document.getElementById('carrito-container');
  carritoContainer.innerHTML = ""; // Limpiar el contenido anterior

  carrito.forEach((producto, index) => {
    const productoDiv = document.createElement('div');
    productoDiv.className = 'producto-carrito';
    productoDiv.innerHTML = `
      <p>${producto.nombre} - Precio: ${producto.precio} - Cantidad: ${producto.cantidad}</p>
      <input type="number" min="1" value="${producto.cantidad}" class="cantidad-producto" data-index="${index}">
      <button class="btn-eliminar" data-index="${index}">Eliminar</button>
    `;
    carritoContainer.appendChild(productoDiv);
  });

  // Guardar el carrito actualizado en localStorage
  guardarCarrito();
}

// Función para manejar el evento click y eliminar un producto del carrito
function eliminarDelCarrito(event) {
  const boton = event.target.closest('.btn-eliminar');
  if (boton) {
    const index = boton.getAttribute('data-index');
    if (index !== null) {
      carrito.splice(index, 1);
      actualizarCarrito();
    }
  }
}

// Asocia el evento click al contenedor del carrito
document.getElementById('carrito-container').addEventListener('click', eliminarDelCarrito);

// Guardar el carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Cargar el carrito desde localStorage
function cargarCarrito() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();
  }
}

// Función para manejar el evento input y cambiar la cantidad de un producto en el carrito
function cambiarCantidad(event) {
  const input = event.target.closest('.cantidad-producto');
  if (input) {
    const index = input.getAttribute('data-index');
    if (index !== null) {
      carrito[index].cantidad = parseInt(input.value);
      guardarCarrito();
    }
  }
}

// Asocia el evento input al contenedor del carrito para cambiar la cantidad
document.getElementById('carrito-container').addEventListener('input', cambiarCantidad);

// Cargar el carrito al cargar la página
cargarCarrito();
