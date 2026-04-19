// Garantir que o DOM esteja carregado antes de executar o script (Boas práticas)
document.addEventListener('DOMContentLoaded', () => {
    
    // Estado do Jogo encapsulado
    const estado = {
        dinheiro: 500,
        solo: 100,
        turno: 1,
        maxTurnos: 10
    };

    // Mapeamento de elementos do DOM para evitar múltiplas buscas
    const elDinheiro = document.getElementById('dinheiro');
    const elSoloTexto = document.getElementById('solo-texto');
    const elTurno = document.getElementById('turno');
    const elMensagem = document.getElementById('mensagem');
    const elBarraProgresso = document.getElementById('barra-progresso');
    const botoes = document.querySelectorAll('.btn-acao');

    // Inicializar Event Listeners (Adequação à regra "Sem JS Inline")
    botoes.forEach(botao => {
        botao.addEventListener('click', (evento) => {
            const acaoEscolhida = evento.target.getAttribute('data-acao');
            jogar(acaoEscolhida);
        });
    });

    // Função Principal de Ação
    function jogar(acao) {
        if (estado.turno > estado.maxTurnos) return;

        if (acao === 'monocultura') {
            estado.dinheiro += 200;
            estado.solo -= 25;
            elMensagem.innerText = "Você lucrou rápido, mas a saúde do solo caiu drasticamente!";
        } else if (acao === 'rotacao') {
            estado.dinheiro += 100;
            estado.solo -= 5;
            elMensagem.innerText = "Rotação de culturas: lucro consciente e solo preservado.";
        } else if (acao === 'descanso') {
            estado.dinheiro -= 50; 
            estado.solo += 20; 
            elMensagem.innerText = "Solo em descanso. Recuperando nutrientes.";
        }

        // Limite superior do solo
        if (estado.solo > 100) estado.solo = 100;
        
        estado.turno++;
        atualizarInterface();
        verificarFimDeJogo();
    }

    // Manipulação Avançada do DOM
    function atualizarInterface() {
        elDinheiro.innerText = estado.dinheiro;
        elTurno.innerText = estado.turno > estado.maxTurnos ? estado.maxTurnos : estado.turno;
        
        // Evita exibir valores negativos no texto
        const soloExibicao = estado.solo < 0 ? 0 : estado.solo;
        elSoloTexto.innerText = soloExibicao;
        
        // Atualiza a Barra de Progresso visualmente
        elBarraProgresso.style.width = `${soloExibicao}%`;

        // Lógica de cores baseada na saúde (Mostra domínio de JS + CSS)
        if (estado.solo <= 30) {
            elBarraProgresso.style.backgroundColor = '#d32f2f'; // Vermelho (Crítico)
        } else if (estado.solo <= 60) {
            elBarraProgresso.style.backgroundColor = '#fbc02d'; // Amarelo (Atenção)
        } else {
            elBarraProgresso.style.backgroundColor = '#2e7d32'; // Verde (Saudável)
        }
    }

    // Condições de Vitória/Derrota
    function verificarFimDeJogo() {
        if (estado.solo <= 0) {
            elMensagem.innerHTML = "<strong>FIM DE JOGO:</strong> O solo esgotou. Sem meio ambiente, não há produção futura.";
            desabilitarControles();
        } else if (estado.turno > estado.maxTurnos) {
            elMensagem.innerHTML = `<strong>PARABÉNS!</strong> Rodadas finalizadas com R$ ${estado.dinheiro} e ${estado.solo}% de saúde do solo. O futuro agradece!`;
            desabilitarControles();
        }
    }

    function desabilitarControles() {
        botoes.forEach(btn => btn.disabled = true);
    }
});
