let  deleteAll = document.getElementById("eliminar-todo");

deleteAll.onclick = function(){
    productos = []
    localStorage.clear()    
    document.querySelector("table tbody").innerHTML = ""
}

function deleteProduct( btn ){
    let id = btn.id.split("-")[1]
    let  row = document.getElementById("row-" + id)
    row.parentNode.removeChild(row)

    for( let i = 0; i < productos.length; i++){
        if( productos[i].id == id){
            productos.splice(i,1)
        }
    }
    localStorage.setItem("products", JSON.stringify(productos))

}

