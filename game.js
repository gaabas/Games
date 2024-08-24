// Estado do jogo
const gameState = {
    recursos: {
        madeira: 0,
        argila: 0,
        ferro: 0
    },
    edificios: {
        quartel: 0,
        ferreiro: 0,
        armazem: 0
    },
    unidades: {
        lanceiro: 0
    }
};

// Funções para atualizar a interface
function atualizarRecursos() {
    document.getElementById('madeira-valor').textContent = gameState.recursos.madeira;
    document.getElementById('argila-valor').textContent = gameState.recursos.argila;
    document.getElementById('ferro-valor').textContent = gameState.recursos.ferro;
}

function atualizarEdificios() {
    document.getElementById('nivel-quartel').textContent = gameState.edificios.quartel;
    document.getElementById('nivel-ferreiro').textContent = gameState.edificios.ferreiro;
    document.getElementById('nivel-armazem').textContent = gameState.edificios.armazem;
}

function atualizarUnidades() {
    document.getElementById('quantidade-lanceiro').textContent = gameState.unidades.lanceiro;
}

// Funções para coletar recursos
function coletarRecurso(tipo, quantidade = 1) {
    gameState.recursos[tipo] += quantidade;
    atualizarRecursos();
}

// Funções para construir edifícios
function construirEdificio(tipo) {
    const custos = {
        quartel: { madeira: 50, argila: 30, ferro: 20 },
        ferreiro: { madeira: 30, argila: 50, ferro: 20 },
        armazem: { madeira: 30, argila: 30, ferro: 30 }
    };

    const custo = custos[tipo];
    if (gameState.recursos.madeira >= custo.madeira &&
        gameState.recursos.argila >= custo.argila &&
        gameState.recursos.ferro >= custo.ferro) {
        
        gameState.recursos.madeira -= custo.madeira;
        gameState.recursos.argila -= custo.argila;
        gameState.recursos.ferro -= custo.ferro;
        
        gameState.edificios[tipo]++;
        
        atualizarRecursos();
        atualizarEdificios();
    } else {
        alert("Recursos insuficientes para construir " + tipo);
    }
}

// Função para treinar unidades
function treinarUnidade(tipo) {
    const custos = {
        lanceiro: { madeira: 30, argila: 30, ferro: 10 }
    };

    const custo = custos[tipo];
    if (gameState.recursos.madeira >= custo.madeira &&
        gameState.recursos.argila >= custo.argila &&
        gameState.recursos.ferro >= custo.ferro) {
        
        gameState.recursos.madeira -= custo.madeira;
        gameState.recursos.argila -= custo.argila;
        gameState.recursos.ferro -= custo.ferro;
        
        gameState.unidades[tipo]++;
        
        atualizarRecursos();
        atualizarUnidades();
    } else {
        alert("Recursos insuficientes para treinar " + tipo);
    }
}

// Event listeners
document.getElementById('coletar-madeira').addEventListener('click', () => coletarRecurso('madeira'));
document.getElementById('coletar-argila').addEventListener('click', () => coletarRecurso('argila'));
document.getElementById('coletar-ferro').addEventListener('click', () => coletarRecurso('ferro'));

document.getElementById('construir-quartel').addEventListener('click', () => construirEdificio('quartel'));
document.getElementById('construir-ferreiro').addEventListener('click', () => construirEdificio('ferreiro'));
document.getElementById('construir-armazem').addEventListener('click', () => construirEdificio('armazem'));

document.getElementById('treinar-lanceiro').addEventListener('click', () => treinarUnidade('lanceiro'));

// Inicialização
atualizarRecursos();
atualizarEdificios();
atualizarUnidades();