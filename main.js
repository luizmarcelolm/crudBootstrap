'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFilds()
    document.getElementById('modal').classList.remove('active')
}


    const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
    const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

    const deleteClient = (index) => {
        const dbClient = readClient()
        dbClient.splice(index, 1)
        setLocalStorage(dbClient)
    }

    const updateClient = (index, client) => {
        const dbClient = readClient()
        dbClient[index] = client
        setLocalStorage(dbClient)
    }

    const readClient = () => getLocalStorage()

    const createClient = (client) => {
        const dbClient = getLocalStorage()
        dbClient.push (client)
        setLocalStorage(dbClient)
    }

    //validação de campos
    const isValidFields = () => {
       return document.getElementById('form').reportValidity()
    }

    //Limpa campos e fecha modal
    const clearFilds = () => {
        const fields = document.querySelectorAll('.modal-field')
        fields.forEach(field => field.value = "")
    }

    //ação do layout
    const saveClient = () => {
        if(isValidFields()) {
            const client = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                celular: document.getElementById('celular').value,
                cidade: document.getElementById('cidade').value
            }
            createClient(client)
            clearFilds()
            updateTable()
            closeModal()
        }
    }

    //cria uma linha como cadastro
 const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
       <button type = "button" class = "button green" id ="edit-${index}" > editar</button>
       <button type = "button" class = "button red" id = "delete-${index}" > excluir</button>
    </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
 }   

 //atualiza lista sem duplicar conteúdo
 const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
 }

 //atualiza lista do cadastro
const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}  

const fillFields = (index) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
}

const editClient = (index) => {
      const client = readClient()[index]
      fillFields(client)
      openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {
       const [action, index] = event.target.id.split('-')
       if (action == 'edit'){
          editClient(index)
       }else{
        console.log("deletando")

       }
    }
}

//chama função para atualizar lista
updateTable() 

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)

