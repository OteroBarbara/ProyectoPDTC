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
        "id": id,
        "nombre": document.querySelector("#Nombre").value,
        "cantidad": document.querySelector("#Cantidad").value,
        "precio": document.querySelector("#Precio").value,
    }
    if (validar(producto.nombre, producto.cantidad, producto.precio)) {
        id++
        productos.push(producto)
        localStorage.setItem(
            'products', JSON.stringify(productos)
        )
        localStorage.setItem(
            'id', JSON.stringify(id)
        )
        mostrarDatos()
    }
}

const validar = function(nombre, cantidad, precio) {
    let productos = JSON.parse(localStorage.getItem('products'))
    let iguales = false
    if (productos != null) {
        productos.forEach(element => {
            if (element.nombre == nombre) {
                iguales = true;
            }
        })
    }
    if (iguales) {
        alert("El nombre ingresado ya existe en la base de datos.")
        return false
    } else if (!((/^\d+$/gm).test(cantidad))) {
        alert("En cantidad debe ingresar un número entero no negativo.")
        return false
    } else if (!((/^\d+(\.\d{1,2})?$/gm).test(precio))) {
        alert("En precio debe ingresar un número real no negativo.")
        return false
    } else {
        return true
    }
}

const mostrarDatos = function() {
    let productos = JSON.parse(localStorage.getItem('products'))
    document.querySelector("table tbody").innerHTML = ''
    productos.forEach(element => {
        document.querySelector("table tbody").innerHTML += `
        <tr id="row-${element.id}">
                <th scope="row">${element.id}</th>
                <td>${element.nombre}</td>
                <td>${element.cantidad}</td>
                <td>${element.precio}</td>
                <td>${element.precio * element.cantidad}</td>
                <td><input type="button" class="btn btn-danger" value="X" id="btn-${element.id}" onclick="deleteProduct(this)"/></td> 
        </tr>
    `
    })
}

const form = document.querySelector('#form')

form.addEventListener('submit', guardarDatos)

let deleteAll = document.getElementById("eliminar-todo");

deleteAll.onclick = function() {
    productos = []
    localStorage.clear()
    document.querySelector("table tbody").innerHTML = ""
    id = 0
}

function deleteProduct(btn) {
    let id = btn.id.split("-")[1]
    let row = document.getElementById("row-" + id)
    row.parentNode.removeChild(row)

    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id == id) {
            productos.splice(i, 1)
        }
    }
    localStorage.setItem("products", JSON.stringify(productos))

}