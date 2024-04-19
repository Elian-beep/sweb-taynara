const nometarefa = document.getElementById('nometarefa');
const btncriar = document.getElementById('btncriar');
const areacards = document.getElementById('areacards');

let tarefas = [];
let ehEditar = false;
let indiceEditar = null;
let idSelecionado = null;

btncriar.addEventListener("click", () => {
    if(ehEditar == false){
        criarTarefa();
    }else{
        editarTarefa();
    }
    nometarefa.value = '';
    ehEditar = false;
});

mostrarLista();

function salvarLista(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function atualizarLista(){
    const listaEmMemoria = localStorage.getItem('tarefas');
    if(listaEmMemoria){
        tarefas = JSON.parse(listaEmMemoria);
    }
}

function mostrarLista(){
    atualizarLista();
    areacards.innerHTML = '';
    tarefas.map(tarefa => {
        criarCard(tarefa);
     });
}
function criarTarefa() {
    const id = Math.random();
    const tarefa = { id, nometarefa: nometarefa.value }
    tarefas.push(tarefa);
    salvarLista();
    criarCard(tarefa);
    nometarefa.value = '';
}

function criarCard(tarefa){
    const divCard = document.createElement('div');
    divCard.classList.add('cartao');
    divCard.innerHTML = `
    <div>
        <input type='checkbox' value='${tarefa.id}'>
        <p>${tarefa.nometarefa}</p>
    </div>
    <div>
        <button onclick='mandarEditar(${tarefa.id})'><img src='https://raw.githubusercontent.com/Elian-beep/assets_icons/main/lapis.png' alt='Icone de um lápis'></button>
        <button onclick='apagarTarefa(${tarefa.id})'><img src='https://raw.githubusercontent.com/Elian-beep/assets_icons/main/lixeira.png' alt='Icone de uma lixeira'></button>
    </div>
    `;
    areacards.appendChild(divCard);
}
function mandarEditar(id){
    idSelecionado = id;
    const indice = tarefas.findIndex(tarefa => tarefa.id === idSelecionado);
    if(indice !== -1){
        nometarefa.value = tarefas[indice].nometarefa;
        indiceEditar = indice;
        ehEditar = true;
    }else{
        console.log('nao encontrado')
    }
}

function editarTarefa(){
    let tarefaEditada = { id: idSelecionado, nometarefa: nometarefa.value };
    tarefas[indiceEditar] = tarefaEditada;
    salvarLista();
    mostrarLista();
}
function apagarTarefa(id){
    const indice = tarefas.findIndex(tarefa => tarefa.id === id);
    if(indice !== -1){
        tarefas.splice(indice, 1);
    }else{
        console.log('nao encontrado')
    }
    salvarLista();
    mostrarLista();
}
