function setProductList() {
	if (localStorage.getItem('products') === null) {
		localStorage.setItem('products', JSON.stringify([]))
	}
}
setProductList()
let productList = JSON.parse(localStorage.getItem('products'))

function renderProductList() {
	tableBody = document.getElementById('tableBody')
	tableBody.innerHTML = ''
	if (productList.length == 0) {
		tableBody.innerHTML +=
			'<tr><td colspan="7">Não há produtos cadastrados</td></tr>'
	} else {
		productList.forEach(product => {
			tableBody.innerHTML += `<tr><td>${product.id}</td><td>${
				product.name
			}</td><td>R$ ${product.value}</td><td>${
				product.availability == true
					? '<span class="badge rounded-pill bg-success">Disponível</span>'
					: '<span class="badge rounded-pill bg-danger">Indisponível</span>'
			}</td><td style="max-width: 30px">${product.description}</td>
                     <td>

                         <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-id="${
								product.id
							}">Editar</button>
                                  <button type="button" class="btn btn-danger" data-bs-toggle="modal"  data-bs-target="#deleteModal" data-bs-id="${
										product.id
									}">X</button>

                     </td></tr>`
		})
	}
}

renderProductList()

let deleteModal = document.getElementById('deleteModal')
deleteModal = addEventListener('show.bs.modal', event => {
	var button = event.relatedTarget
	var id = button.getAttribute('data-bs-id')
	let text = this.deleteModal.querySelector('p')
	text.textContent = 'Deletar o produto de ID : ' + id
	let buttonDelete = document.getElementById('deleteConfirm')
	buttonDelete.setAttribute('data-id', id)
})
function confirmDelete() {
	let button = document.getElementById('deleteConfirm')
	var id = button.getAttribute('data-id')
	let index = productList.findIndex(obj => obj.id == id)
	productList.splice(index, 1)
	localStorage.setItem('products', JSON.stringify(productList))
	renderProductList()
}

let editModal = document.getElementById('editModal')

editModal.addEventListener('show.bs.modal', function (event) {
	var button = event.relatedTarget

	var id = button.getAttribute('data-bs-id')
	let editForm = document.getElementById('editForm')
	editForm.setAttribute('data-id', id)

	let productList = JSON.parse(localStorage.getItem('products'))
	let product = productList.filter(product => product.id == id)
	let editProductName = document.getElementById('editProductName')
	editProductName.value = product[0].name
	let editProductValue = document.getElementById('editProductValue')
	editProductValue.value = product[0].value
	let editDescriProduto = document.getElementById('editDescriProduto')
	editDescriProduto.value = product[0].description
	let editProductAvailable = document.getElementById('editProductAvailable')
	editProductAvailable.checked = product[0].availability
})
//teste

function submit(e) {
	e.preventDefault()
	let productName = document.getElementById('inputProductName').value
	let productValue = document.getElementById('inputProductValue').value
	let productDescription = document.getElementById('descriProduto').value
	let productAvailable = document.getElementById(
		'inputProductAvailable'
	).checked
	let product = {
		id: (Date.now().toString(36) + productName.slice(0, 3)).toUpperCase(),
		name: productName,
		value: productValue,
		description: productDescription,
		availability: productAvailable
	}
	productList.push(product)
	localStorage.setItem('products', JSON.stringify(productList))

	renderProductList()
}

function saveEdit(e) {
	e.preventDefault()
	let editForm = document.getElementById('editForm').elements
	let id = document.getElementById('editForm').getAttribute('data-id')
	let productName = editForm[0].value
	let productValue = editForm[1].value
	let productDescription = editForm[2].value
	let productAvailable = editForm[3].checked

	let index = productList.findIndex(obj => obj.id == id)
	let product = {
		id: id,
		name: productName,
		value: productValue,
		description: productDescription,
		availability: productAvailable
	}
	productList[index] = product
	localStorage.setItem('products', JSON.stringify(productList))
	renderProductList()
}
let productForm = document.getElementById('productForm')
productForm.addEventListener('submit', submit)

let editForm = document.getElementById('editForm')
editForm.addEventListener('submit', saveEdit)
