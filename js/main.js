const almacen = [
    {
        id:1,
        nombre:'camisa',
        marca:'polo',
        categoria:'ropa',
        descripcion:'camisa manga corta',
        stock:20,
        precio:10
    }
]

const comprarNav = document.getElementById('comprarNav')
const comprar = document.getElementById('comprar')
const catalogoProductos = document.getElementById('catalogoProductos')
const mensaje = document.getElementById('mensaje')
const venderNav = document.getElementById('venderNav')
const vender = document.getElementById('vender')
const inicio = document.getElementById('inicio')
const formulario = document.getElementById('formulario')
const btnAcecptarMensaje = document.getElementById('botonAceptarMensaje')


inicio.addEventListener('click',clickInicio)
comprar.addEventListener('click',clickVender)
comprarNav.addEventListener('click',clickVender)
venderNav.addEventListener('click', mostrarProductos)
vender.addEventListener('click', mostrarProductos)

formulario.addEventListener('submit', function(event){

    event.preventDefault();
    //console.log(event);
   // console.log('entro en agregar producto');
    const nuevoId = obtenerSiguienteId()

    const formData = new FormData(formulario);
    const newData = {id:nuevoId}
    formData.forEach( (value,key) => {
        newData[key] = value
    })

    almacen.push(newData);
    mostrarMensaje('Se ha guardado exitosamente')
    console.log(newData);
    formulario.reset();
    //formulario.style.display = 'none'

    setTimeout(function() {
        mensaje.style.display = 'none';
    }, 3000);


    
})

function mostrarProductos() {
    ocultarSeccionPrincipal();
    catalogoProductos.innerHTML = '';

    almacen.forEach(art => {
        const card = document.createElement('div')
        card.className = 'card'
        const cardImg = document.createElement('img')
        cardImg.className = 'card img'
        cardImg.src = art.img  
        cardImg.alt = art.nombre 
        const cardBody = document.createElement('div')
        cardBody.className = 'card-body'
        const titulo = document.createElement('h3')
        titulo.className = 'card-title'
        titulo.textContent = art.nombre
        const marca = document.createElement('p')
        marca.textContent = art.marca
        const categoria = document.createElement('p')
        categoria.textContent = art.categoria
        const descripcion = document.createElement('p')
        descripcion.className = 'card-text'
        descripcion.textContent = art.descripcion
        const precio = document.createElement('p')
        descripcion.className = 'card-price'
        precio.textContent = `Precio: $${art.precio} - Stock: ${art.stock}`
        const boton = document.createElement('button')
        boton.textContent = 'Eliminar'
        boton.className = 'botonEliminar'
        boton.id = `boton${art.id}`
        boton.onclick = () => {
            eliminarProducto(art.id)
        }
        const botonEditar = document.createElement('button')
        botonEditar.textContent = 'Editar'
        botonEditar.className = 'botonEditar'
        botonEditar.onclick = () => {
            editarProducto(art.id);
        }

        console.log(art);
        
        cardBody.appendChild(titulo)
        cardBody.appendChild(cardImg)
        cardBody.appendChild(marca)
        cardBody.appendChild(categoria)
        cardBody.appendChild(descripcion)
        cardBody.appendChild(precio)
        cardBody.appendChild(boton)
        cardBody.appendChild(botonEditar)
        card.appendChild(cardBody)
        catalogoProductos.appendChild(card)
        
    })

    formulario.style.display = 'none'


    
}

function clickVender(){
    ocultarSeccionPrincipal();
    catalogoProductos.innerHTML = '';
    formulario.style.display = 'block'
}

function clickInicio(){
    document.getElementById('seccionPrincipal').style.display = 'block'; 
    catalogoProductos.innerHTML = '';
}

function ocultarSeccionPrincipal() {
    document.getElementById('seccionPrincipal').style.display = 'none'; 
}


function mostrarMensaje(mensajeMostar) {
    mensaje.style.display = 'block'
    mensaje.textContent = mensajeMostar

    setTimeout(function() {
        mensaje.style.display = 'none';
    }, 5000);
    
}

mostrarMensaje()

const obtenerSiguienteId = () => {
    console.log(almacen.length);
    
    if (almacen.length >= 1){
        const ids = almacen.map(articulo => articulo.id)
        const maxId = Math.max(...ids)
        return maxId + 1
    } else {
        return 1
    }
}


function eliminarProducto(id) {
    // Filtra el producto a eliminar del array
    const articuloEliminar = almacen.filter(art => art.id !== id);
    
    console.log(articuloEliminar);
    console.log(almacen);
    
}

function editarProducto(id) {
     
    // Encuentra el producto por su ID
    const producto = almacen.find(art => art.id === id);
    if (producto) {
        // Cargar los datos del producto en el formulario
        formulario.style.display = 'block';
        document.getElementById('nombre').value = producto.nombre;
        document.getElementById('marca').value = producto.marca;
        document.getElementById('categoria').value = producto.categoria;
        document.getElementById('descripcion').value = producto.descripcion;
        document.getElementById('stock').value = producto.stock;
        document.getElementById('precio').value = producto.precio;

        // Cambiar el texto del botón de submit a "Guardar Cambios"
        document.getElementById('botonSubmit').textContent = 'Guardar Cambios';

        // Modificar la función de submit para actualizar el producto existente
        formulario.onsubmit = function(event) {
            event.preventDefault();

            // Actualizar los valores del producto en el array
            producto.nombre = document.getElementById('nombre').value;
            producto.marca = document.getElementById('marca').value;
            producto.categoria = document.getElementById('categoria').value;
            producto.descripcion = document.getElementById('descripcion').value;
            producto.stock = parseInt(document.getElementById('stock').value);
            producto.precio = parseFloat(document.getElementById('precio').value);

            // Actualizar la vista del catálogo de productos
            mostrarProductos();
            
            mostrarMensaje('Producto editado exitosamente');

            // Restablecer el formulario y el botón de submit
            formulario.reset();
            formulario.style.display = 'none';
            document.getElementById('botonSubmit').textContent = 'Añadir Producto';
        };
    }
}


/*function eliminarProducto(id){
    console.log(id);
    let articuloEliminar = almacen.filter(art => art.id !== id)
    console.log(articuloEliminar);
     

    
    
}*/

/*formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitamos que se recargue la página al enviar el formulario

    // Mostramos la notificación
    mensaje.style.display = 'block';

    // Ocultamos la notificación después de 5 segundos
    setTimeout(function() {
        mensaje.style.display = 'none';
    }, 5000);

    // Aquí puedes agregar el código para manejar el formulario, como enviarlo al servidor
});*/






/* const element = document.createElement("div");
    element.innerHTML = `
            <div class="container">
        <div class="card">
            <div class="card-body">
                <h3 class="card-title">Producto 1</h3>
                <p class="card-text">Descripción del producto 1.</p>
                <p class="card-price">$10.00</p>
            </div>
        </div>
        `;
    productos.appendChild(element);*/


/*

// Variables golbales

let almacen = [];
const comprasNav = document.getElementById('comprasNav')
const ventasNav = document.getElementById('ventasNAv')
const formulario = document.getElementById('formulario')

// Funciones

const CrearItem = (id,nombre,marca,categoria,descripcion,stock,precio) => {

    let item = {
      id: id,
      nombre: nombre,
      marca: marca,
      categoria: categoria,
      descripcion: descripcion,
      stock: stock,
      precio: precio
    }
  
    almacen.push(item);
  
    return item;
  
  }
 
 // EventListener

 formulario.addEventListener('submit', (e) => {

    e.preventDefault();
    let id = document.querySelector('#actividad').value;
  
    CrearItem(actividadUI);
    GuardarDB();
  
    formularioUI.reset();
  
  });
*/
