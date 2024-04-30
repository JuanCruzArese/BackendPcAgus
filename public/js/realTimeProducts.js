const socket = io();

socket.emit('Actualizacion');

const listaDeProductos = document.getElementById('listaDeProductos');

// Codigo para agregar productos //
document.getElementById("agregarProducto").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {
        title: document.getElementById('titleAG').value.trim(),
        description: document.getElementById('descriptionAG').value.trim(),
        code: document.getElementById('codeAG').value.trim(),
        stock: document.getElementById('stockAG').value.trim(),
        thumbnail: document.getElementById('thumbnailAG').value.trim(),
        price: document.getElementById('priceAG').value.trim(),
        available: document.getElementById('availableAG').checked
    };

    try {
        const agregacion = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await agregacion.json();
        console.log(data);
        socket.emit('Actualizacion');
    } catch (error) {
        console.error("Error al agregar el producto", error);
    }
});

// Codigo para eliminar productos //
document.getElementById("eliminarProducto").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("idDelete").value;
    try {
        const eliminacion = await fetch(`/api/products/${id}`, { method: "DELETE" });
        const data = await eliminacion.json();
        console.log(data);
        socket.emit('Actualizacion')
    } catch (error) {
        console.error("Error al eliminar el producto", error);
    }
});

// Codigo para editar productos //
document.getElementById('editarProducto').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('idPut').value;
    const formData = {
        title: document.getElementById('titleED').value.trim() !== '' ? document.getElementById('titleED').value.trim() : undefined,
        description: document.getElementById('descriptionED').value.trim() !== '' ? document.getElementById('descriptionED').value.trim() : undefined,
        code: document.getElementById('codeED').value.trim() !== '' ? document.getElementById('codeED').value.trim() : undefined,
        stock: document.getElementById('stockED').value.trim() !== '' ? document.getElementById('stockED').value.trim() : undefined,
        thumbnail: document.getElementById('thumbnailED').value.trim() !== '' ? document.getElementById('thumbnailED').value.trim() : undefined,
        price: document.getElementById('priceED').value.trim() !== '' ? document.getElementById('priceED').value.trim() : undefined,
        available: document.getElementById('availableED').checked
    };

    try {
        const actualizacion = await fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await actualizacion.json();
        console.log(data);
        socket.emit('Actualizacion')
    } catch (error) {
        console.error('Error al editar el producto:', error);
    }
});

socket.on("Actualizacion2", data =>{
    if (data && Array.isArray(data)) {
        listaDeProductos.innerHTML = `
            <ul>
                ${data.map(product => `
                    <li>
                        <p>Title: ${product.title}</p>
                        <p>Description: ${product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Available: ${product.available ? 'Yes' : 'No'}</p>
                        <p>Id: ${product.id}</p>
                    </li>
                `).join('')}
            </ul>
        `;
    } else {
        console.error("Datos no válidos recibidos del servidor:", data);
    }
});