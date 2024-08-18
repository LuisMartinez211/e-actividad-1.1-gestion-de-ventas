// Inicializa el almacén desde localStorage o utiliza un valor predeterminado
const almacen = JSON.parse(localStorage.getItem('almacen')) || [
    {
        id: 1,
        nombre: 'camisa',
        img: './img/camisa.webp',
        marca: 'polo',
        categoria: 'ropa',
        descripcion: 'camisa manga corta',
        stock: 20,
        precio: 10
    }
];

const comprarNav = document.getElementById('comprarNav');
const comprar = document.getElementById('comprar');
const catalogoProductos = document.getElementById('catalogoProductos');
const mensaje = document.getElementById('mensaje');
const venderNav = document.getElementById('venderNav');
const vender = document.getElementById('vender');
const inicio = document.getElementById('inicio');
const formulario = document.getElementById('formulario');
const botonBuscar = document.getElementById('botonBuscar');
const busquedaNombre = document.getElementById('busquedaNombre');
const inputImagen = document.getElementById('imagen'); 
const seccionBuscar = document.getElementById('seccionBuscar')
const f = document.getElementById('f')

inicio.addEventListener('click', clickInicio);
comprar.addEventListener('click', clickVender);
comprarNav.addEventListener('click', clickVender);
venderNav.addEventListener('click', mostrarProductos);
vender.addEventListener('click', mostrarProductos);
botonBuscar.addEventListener('click', buscarProducto);

f.style.display = 'none'
seccionBuscar.style.display = 'none'

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const nuevoId = obtenerSiguienteId();
    const formData = new FormData(formulario);
    const newData = { id: nuevoId };

    formData.forEach((value, key) => {
        newData[key] = value;
    });

   
    const archivoImagen = formData.get('imagen');
    if (archivoImagen && archivoImagen.size > 0) {
        const reader = new FileReader();
        reader.onload = function (e) {
            newData.img = e.target.result; 
            guardarProducto(newData);
        };
        reader.readAsDataURL(archivoImagen); 
    } else {
        newData.img = './img/placeholder.png'; 
        guardarProducto(newData);
    }
});

function guardarProducto(producto) {
    almacen.push(producto);
    guardarAlmacen();
    mostrarMensaje('Se ha guardado exitosamente');
    mostrarProductos(); 
    formulario.reset();
}

function mostrarProductos() {
    ocultarSeccionPrincipal();
    catalogoProductos.innerHTML = '';
    seccionBuscar.style.display = 'block'
    f.style.display = 'none'

    almacen.forEach(art => {
        const card = document.createElement('div');
        card.className = 'card';
        const cardImg = document.createElement('img');
        cardImg.className = 'card img';
        cardImg.src = art.img;
        cardImg.alt = art.nombre;
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        const titulo = document.createElement('h3');
        titulo.className = 'card-title';
        titulo.textContent = art.nombre;
        const marca = document.createElement('p');
        marca.textContent = art.marca;
        const categoria = document.createElement('p');
        categoria.textContent = art.categoria;
        const descripcion = document.createElement('p');
        descripcion.className = 'card-text';
        descripcion.textContent = art.descripcion;
        const precio = document.createElement('p');
        descripcion.className = 'card-price';
        precio.textContent = `Precio: $${art.precio} - Stock: ${art.stock}`;
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.className = 'botonEliminar';
        botonEliminar.id = `boton${art.id}`;
        botonEliminar.onclick = () => {
            eliminarProducto(art.id);
        };
        const botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar';
        botonEditar.className = 'botonEditar';
        botonEditar.onclick = () => {
            editarProducto(art.id);
        };

        cardBody.appendChild(titulo);
        cardBody.appendChild(cardImg);
        cardBody.appendChild(marca);
        cardBody.appendChild(categoria);
        cardBody.appendChild(descripcion);
        cardBody.appendChild(precio);
        cardBody.appendChild(botonEliminar);
        cardBody.appendChild(botonEditar);
        card.appendChild(cardBody);
        catalogoProductos.appendChild(card);
    });
    
    //formulario.style.display = 'none';
}

function clickVender() {
    ocultarSeccionPrincipal();
    catalogoProductos.innerHTML = '';
    f.style.display = 'block'
    formulario.style.display = 'block';
    seccionBuscar.style.display = 'none'
}

function clickInicio() {
    document.getElementById('seccionPrincipal').style.display = 'block';
    catalogoProductos.innerHTML = '';
    seccionBuscar.style.display = 'none';
    f.style.display = 'none'
    
}

function ocultarSeccionPrincipal() {
    document.getElementById('seccionPrincipal').style.display = 'none';
}

function mostrarMensaje(mensajeMostar) {
    mensaje.style.display = 'block';
    mensaje.textContent = mensajeMostar;

    setTimeout(function () {
        mensaje.style.display = 'none';
    }, 5000);
}

function obtenerSiguienteId() {
    if (almacen.length >= 1) {
        const ids = almacen.map(articulo => articulo.id);
        const maxId = Math.max(...ids);
        return maxId + 1;
    } else {
        return 1;
    }
}

function eliminarProducto(id) {
    const indice = almacen.findIndex(art => art.id === id);
    if (indice !== -1) {
        almacen.splice(indice, 1);
        guardarAlmacen();
        mostrarProductos(); 
        mostrarMensaje('Producto eliminado exitosamente');
    }
}

function editarProducto(id) {
    f.style.display = 'block'
    const producto = almacen.find(art => art.id === id);
    if (producto) {
        formulario.style.display = 'block';
        document.getElementById('nombre').value = producto.nombre;
        document.getElementById('marca').value = producto.marca;
        document.getElementById('categoria').value = producto.categoria;
        document.getElementById('descripcion').value = producto.descripcion;
        document.getElementById('stock').value = producto.stock;
        document.getElementById('precio').value = producto.precio;



        document.getElementById('botonSubmit').textContent = 'Guardar Cambios';

        formulario.onsubmit = function (event) {
            event.preventDefault();

            producto.nombre = document.getElementById('nombre').value;
            producto.marca = document.getElementById('marca').value;
            producto.categoria = document.getElementById('categoria').value;
            producto.descripcion = document.getElementById('descripcion').value;
            producto.stock = parseInt(document.getElementById('stock').value);
            producto.precio = parseFloat(document.getElementById('precio').value);

            guardarAlmacen();
            mostrarProductos();
            mostrarMensaje('Producto editado exitosamente');
            formulario.reset();
            formulario.style.display = 'none';
            document.getElementById('botonSubmit').textContent = 'Añadir Producto';
           
            eliminarProducto(producto.id);
        };
    }
}

function buscarProducto() {
    const nombreBuscado = busquedaNombre.value.toLowerCase();
    catalogoProductos.innerHTML = '';

    const productosFiltrados = almacen.filter(art => art.nombre.toLowerCase().includes(nombreBuscado));

    if (productosFiltrados.length > 0) {
        productosFiltrados.forEach(art => {
            const card = document.createElement('div');
            card.className = 'card';
            card.id = `card${art.id}`;

            const cardImg = document.createElement('img');
            cardImg.className = 'card img';
            cardImg.src = art.img;
            cardImg.alt = art.nombre;

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const titulo = document.createElement('h3');
            titulo.className = 'card-title';
            titulo.textContent = art.nombre;

            const marca = document.createElement('p');
            marca.textContent = art.marca;

            const categoria = document.createElement('p');
            categoria.textContent = art.categoria;

            const descripcion = document.createElement('p');
            descripcion.className = 'card-text';
            descripcion.textContent = art.descripcion;

            const precio = document.createElement('p');
            descripcion.className = 'card-price';
            precio.textContent = `Precio: $${art.precio} - Stock: ${art.stock}`;

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.className = 'botonEliminar';
            botonEliminar.onclick = () => {
                eliminarProducto(art.id);
            };

            const botonEditar = document.createElement('button');
            botonEditar.textContent = 'Editar';
            botonEditar.className = 'botonEditar';
            botonEditar.onclick = () => {
                editarProducto(art.id);
            };

            cardBody.appendChild(titulo);
            cardBody.appendChild(cardImg);
            cardBody.appendChild(marca);
            cardBody.appendChild(categoria);
            cardBody.appendChild(descripcion);
            cardBody.appendChild(precio);
            cardBody.appendChild(botonEliminar);
            cardBody.appendChild(botonEditar);
            card.appendChild(cardBody);
            catalogoProductos.appendChild(card);
        });
    } else {
        const mensajeNoEncontrado = document.createElement('p');
        mensajeNoEncontrado.textContent = 'No se encontraron productos con ese nombre.';
        catalogoProductos.appendChild(mensajeNoEncontrado);
    }
}

// Función para guardar el almacén en localStorage
function guardarAlmacen() {
    localStorage.setItem('almacen', JSON.stringify(almacen));
}
