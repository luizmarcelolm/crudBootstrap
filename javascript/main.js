'use strict'

//Abre modal
const openModal = () => document.getElementById('modal')
   .classList.add('active')

//Fecha modal
const closeModal = () => {
    clearFields()
    document.getElementById('modal')
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

// CRUD - create read update delete
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

//Atualiza item
const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

//Lê item do local storage
const readClient = () => getLocalStorage()

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push (client)
    setLocalStorage(dbClient)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome1').dataset.index = 'new'
    document.querySelector(".modal-header>h2").textContent  = 'Novo Cliente'
}

//Salva cliente
const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome1: document.getElementById('nome1').value,
            nome2: document.getElementById('nome2').value,
            genero: document.getElementById('genero').value,
            cidade: document.getElementById('cidade').value,
            data: document.getElementById('data').value
        }
        const index = document.getElementById('nome1').dataset.index
        if (index == 'new') {
            createClient(client)
            updateTable()
            closeModal()
        } else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }
    }
}

//Cria linha com dados
const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome1}</td>
        <td>${client.nome2}</td>
        <td>${client.genero}</td>
        <td>${client.cidade}</td>
        <td>${client.data}</td>
        <td>
            <button type="button" class="btn btn-outline-success" data-toggle="collapse" data-target="#dados" id="edit-${index}">Editar</button>
            <button type="button" class="btn btn-outline-danger" id="delete-${index}">Excluir</button>
           
        </td>
    `  
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

//Limpa tabela
const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

//Atualiza item
const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('nome1').value = client.nome1
    document.getElementById('nome2').value = client.nome2
    document.getElementById('genero').value = client.genero
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome1').dataset.index = client.index
}

//Edita item
const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    document.querySelector(".modal-header>h2").textContent  = `Editando ${client.nome1}`

}

//Deleta item
const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editClient(index)
        } else {
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome1}`)
            if (response) {
                deleteClient(index)
                updateTable()
            }
        }
    }
}

updateTable()

// chama funcções dos botões
document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)