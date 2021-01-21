let id
let productos = []

const cargar = function() {
    if (!(JSON.parse(localStorage.getItem('products')) == null)) {
        productos = (JSON.parse(localStorage.getItem('products')))
        id = JSON.parse(localStorage.getItem('id'))
        mostrarDatos()
    } else {
        id = 0
    }
}

const guardarDatos = function(event) {
    event.preventDefault()
    let producto = {
        "id": id++,
        "nombre": document.querySelector("#Nombre").value,
        "cantidad": document.querySelector("#Cantidad").value,
        "precio": document.querySelector("#Precio").value
    }
    productos.push(producto)
    localStorage.setItem(
        'products', JSON.stringify(productos)
    )
    localStorage.setItem(
        'id', JSON.stringify(id)
    )
    mostrarDatos()
}

const mostrarDatos = function() {
    let productos = JSON.parse(localStorage.getItem('products'))
    document.querySelector("table tbody").innerHTML = ''
    productos.forEach(element => {
        document.querySelector("table tbody").innerHTML += `
        <tr>
                <th scope="row">${element.id}</th>
                <td>${element.nombre}</td>
                <td>${element.cantidad}</td>
                <td>${element.precio}</td>
                <td>${element.precio * element.cantidad}</td>
        </tr>
    `
    })
}

const form = document.querySelector('#form')

form.addEventListener('submit', guardarDatos)