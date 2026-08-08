const inputTarefa = document.getElementById('nova-tarefa');
const btnAdicionar = document.getElementById('btn-adicionar');
const listaTarefas = document.getElementById('lista-tarefas');

// 1. Carregar as tarefas salvas assim que o site abrir
document.addEventListener('DOMContentLoaded', carregarTarefas);

function adicionarTarefa() {
    const texto = inputTarefa.value.trim();

    if (texto === "") {
        alert("Por favor, escreva uma tarefa antes de adicionar!");
        return;
    }

    const tarefaObj = {
        texto: texto,
        concluida: false
    };

    criarElementoTarefa(tarefaObj);
    salvarNoLocalStorage();

    inputTarefa.value = "";
    inputTarefa.focus();
}

function criarElementoTarefa(tarefaObj) {
    const li = document.createElement('li');
    li.textContent = tarefaObj.texto;

    if (tarefaObj.concluida) {
        li.classList.add('concluida');
    }

    const btnApagar = document.createElement('button');
    btnApagar.textContent = '❌';
    btnApagar.classList.add('btn-apagar');

    btnApagar.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        salvarNoLocalStorage();
    });

    li.addEventListener('click', () => {
        li.classList.toggle('concluida');
        salvarNoLocalStorage();
    });

    li.appendChild(btnApagar);
    listaTarefas.appendChild(li);
}

// 2. Função para salvar a lista atual no navegador
function salvarNoLocalStorage() {
    const tarefas = [];
    const itens = listaTarefas.querySelectorAll('li');

    itens.forEach(item => {
        tarefas.push({
            texto: item.firstChild.textContent,
            concluida: item.classList.contains('concluida')
        });
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// 3. Função para buscar as tarefas salvas quando abrir a página
function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        const tarefas = JSON.parse(tarefasSalvas);
        tarefas.forEach(tarefaObj => {
            criarElementoTarefa(tarefaObj);
        });
    }
}

btnAdicionar.addEventListener('click', adicionarTarefa);

inputTarefa.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        adicionarTarefa();
    }
});