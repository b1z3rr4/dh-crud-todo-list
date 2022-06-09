//{ id: "1", title: 'Novo projeto', tasks: [] }
//to-do list
const { response } = require('express');
const { request } = require('express');
const express = require('express');

const app = express();

app.use(express.json());

let id = 0;

const projetos = [];

app.post('/projects', (request, response) =>{
    id++;
    const { title, tasks } = request.body;
    
    const projeto = { id: `${id}`, title, tasks };
    projetos.push(projeto);

    return response.json(projeto);
});

app.post('/projects/:id/tasks', (request, response) =>{
    const { id } = request.params;
    const { tasks } = request.body;
    
    const projetoIndex = projetos.findIndex(projeto => projeto.id === id);
    
    if (projetoIndex < 0){
        return response.status(400).json({error: 'Projeto não encontrado.'});
    };

    projetos[projetoIndex].tasks.push(...tasks)

    const projeto = { id:  projetos[projetoIndex].id,
    title: projetos[projetoIndex].title,
    tasks: projetos[projetoIndex].tasks
    };

    return response.json(projeto);
});

app.get("/projects", (request, response) => {
    return response.json(projetos)
})

app.put("/projects/:id", (request, response) => {
    const { id } = request.params;
    const { title } = request.body;

    const projetoIndex = projetos.findIndex(projeto => projeto.id === id);

    if (projetoIndex < 0){
        return response.status(400).json({error: 'Projeto não encontrado.'});
    };

    const projeto = {
        id: projetos[projetoIndex].id,
        title,
        tasks: projetos[projetoIndex].tasks
    };

    projetos[projetoIndex] = projeto;

    return response.json(projeto);
})

app.put("/projects/:id/:index", (request, response) => {
    const { id, index } = request.params;
    const { task } = request.body;

    const projetoIndex = projetos.findIndex(projeto => projeto.id === id);

    if (projetoIndex < 0){
        return response.status(400).json({error: 'Projeto não encontrado.'});
    };

    projetos[projetoIndex].tasks[index] = task;

    const projeto = {
        id: projetos[projetoIndex].id,
        title: projetos[projetoIndex].title,
        tasks: projetos[projetoIndex].tasks
    };

    projetos[projetoIndex] = projeto;

    return response.json(projeto);
})

app.delete("/projects/:id", (request, response) => {
    const { id } = request.params;

    const projetoIndex = projetos.findIndex(projeto => projeto.id === id);

    if (projetoIndex < 0){
        return response.status(400).json({error: 'Projeto não encontrado.'});
    };

    projetos.splice(projetoIndex, 1)
    
    return response.status(204).send()
    //response.status(200).json('Sucesso!')
})

app.listen(8080);