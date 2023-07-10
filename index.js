const express = require('express')

const app = express()

app.listen(3000)

let arrayAnimals = [
    {
        name: 'perro',
        age: 10,
        type: 'Akita'
    },
    {
        name: 'gato',
        age: 5,
        type: 'Ingles'
    },
    {
        name: 'pantera',
        age: 20,
        type: 'Rosa'
    },
]

app.get('/', (req, res)=>{
    let html = '<ul>'
    arrayAnimals.forEach(element =>{
        html += 
        `<li>${element.name}, ${element.age}, <em>${element.type}</em>
            <form action="http://localhost:3000/adoptar">
                <input type="text" name="name">
                <input type="submit" value="Adoptar">
            </form>
        </li>
        <hr>
        `
    })
    html += '</ul>'
    
    res.send(html)
})


app.get('/sumar-animal', (req, res)=>{
    let name = req.query.name
    let type = req.query.type
    let age = req.query.age
    arrayAnimals.push({name, type, age})
    res.redirect('/')
})

app.get('/dejar-animal', (req, res)=>{
    let form = 
    `<form action="http://localhost:3000/sumar-animal">
        <input type="text" name="name" placeholder="Nombre animal">
        <input type="text" name="type" placeholder="Tipo animal">
        <input type="text" name="age" placeholder="Año animal">
        <input type="submit" value="Enviar">
    </form>`
    res.send(form)
})


app.get('/adoptar', (req, res)=>{
    let nameAnimal = req.query.name
    console.log(nameAnimal)
    let animal = arrayAnimals.filter(animals => animals.name === nameAnimal)
    
    res.send(`<h1>${animal[0].name}</h1>`)
})


