var form = document.querySelector("#form");
var inputTarefa = document.getElementById("inputTarefa")
var listaTarefa = document.querySelector("#listaDeTarefas");
var tarefas = [];


form.addEventListener("submit", function (event) {
    event.preventDefault();
    addTarefa();
})

carregarTarefas();

function carregarTarefas() {
    document.getElementById("listaDeTarefas").innerHTML = "";
    var localTarefas = localStorage.getItem('tarefas');
    if (localTarefas != null) {
        tarefas = JSON.parse(localTarefas);
        for (var i = 0; i < tarefas.length; i++) {
            if (tarefas[i].status != "excluido") {
                addTarefaNaLista(tarefas[i].nome, tarefas[i].status, i);
            }
        }
    }
}

function addTarefaNaLista(tarefa, status, id) {
    // criar um li para adicionar um item na lista de tarefas
    var novaTarefa = document.createElement("li");
    //criar botão de excluir
    var btnExcluir = document.createElement("button");
    btnExcluir.className = "excluir";
    btnExcluir.addEventListener("click", excluir);
    btnExcluir.title = "Clique para excluir";
    btnExcluir.id = id;
    // criar um checkbox para definir se a tarefa foi concluída
    var check = document.createElement("input");
    check.type = "checkbox";
    check.id = id;

    check.addEventListener("click", concluir);

    if (status == "concluida") {
        check.checked = "checked";
        check.title = "Clique para reativar a atividade";
    }
    else
        check.title = "Clique para concluir";

    // adiciona o checkbox no li
    novaTarefa.appendChild(check);

    // criar um label para o checkbox
    var label = document.createElement("label");
    label.innerHTML = tarefa;

    label.className = "tachado";

    // adiciona o label no li
    novaTarefa.appendChild(label);

    //Adicionar botao excluir
    novaTarefa.appendChild(btnExcluir);

    // adiciona o li no lu
    listaTarefa.appendChild(novaTarefa);
}

function addTarefa() {
    var textoDaTarefa = inputTarefa.value;
    if (textoDaTarefa.length > 0) {
        var tarefa =
        {
            nome: textoDaTarefa,
            status: "afazer"
        }
        tarefas.push(tarefa);

        localStorage.setItem('tarefas', JSON.stringify(tarefas))

        //limpa o campo e define o foco
        inputTarefa.value = "";
        inputTarefa.focus();
        carregarTarefas();
    }
    else {
        alert("Favor inserir uma tarefa.")
    }
}

function concluir() {
    var localTarefas = localStorage.getItem('tarefas');
    if (localTarefas != null) {
        var tarefasSalvas = JSON.parse(localTarefas);

        if (tarefasSalvas[this.id].status == "concluida")
            tarefasSalvas[this.id].status = "afazer";
        else
            tarefasSalvas[this.id].status = "concluida";

        localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas));
        carregarTarefas();
    }
}

function excluir() {
    if (confirm('Deseja realmente excluir?')) {
        var localTarefas = localStorage.getItem('tarefas');
        if (localTarefas != null) {
            var tarefasSalvas = JSON.parse(localTarefas);
            tarefasSalvas[this.id].status = "excluido";
            localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas));
            carregarTarefas();
        }
    }

}

