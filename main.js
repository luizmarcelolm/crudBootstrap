'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

    const tempClient = {
        nome: "Luiz Marcelo",
        email: "luizmarcelolm@hotmail.com",
        celular: "1234556789",
        cidade: "São José dos Campos"
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

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)