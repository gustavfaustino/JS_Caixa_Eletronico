const ERRO_NOME = "Digite um nome válido e sem números!";
var saldo = 100.5;
var extrato = [
    "Compra em mercado: R$ 25,00",
    "Depósito: R$ 200,00",
    "Compra em farmácia: R$ 15,50"
];
const SENHA_CORRETA = "3589";

// Verificação de acesso
function verificaAcesso() {
    setTimeout(function () {
        try {
            let acesso = prompt("Digite seu nome de usuário:");

            if (acesso.trim() === "" || /\d/.test(acesso)) {
                exibirErro(ERRO_NOME);
            } else {
                exibirBoasVindas(acesso);
                mostrarOpcoes();
            }
        } catch (error) {
            console.error("Erro ao obter nome de usuário:", error);
            exibirErro("Ocorreu um erro. Tente novamente.");
        }
    }, 1000);
}

// Mensagem de erro
function exibirErro(mensagem) {
    alert(mensagem);
    verificaAcesso();
}

// Mensagem de boas vindas
function exibirBoasVindas(nome) {
    document.getElementById(
        "mensagemBoasVindas"
    ).textContent = `Olá ${nome}, é um prazer ter você por aqui!`;
}

// Lógica de mostrar opções
function mostrarOpcoes() {
    document.getElementById("escolhas").style.display = "block";

    document
        .getElementById("opcao")
        .addEventListener("change", function () {
            const opcaoSelecionada = parseInt(this.value);

            document.getElementById("btnOperacao").style.display = "none";
            if (opcaoSelecionada === 1 || opcaoSelecionada === 2 || opcaoSelecionada === 3 || opcaoSelecionada === 5) {
                solicitarSenha(opcaoSelecionada);
            } else {
                switch (opcaoSelecionada) {
                    case 4:
                        operacaoDeposito();
                        break;
                    case 0:
                        sair();
                        break;
                    case 6:
                        document.getElementById("resultado").style.display = "none";
                        document.getElementById("opcao").value = "6";
                        break;
                    default:
                        alert("Opção inválida.");
                }
            }
        });
}

// Função de verificação de senha
function solicitarSenha(opcao) {
    let senha = prompt("Digite sua senha:");
    if (senha === SENHA_CORRETA) {
        executarOperacao(opcao);
    } else {
        alert("Senha incorreta. Tente novamente.");
        solicitarSenha(opcao); // Rechama a função caso a senha esteja errada
    }
}

// Executa operações com base na opção selecionada
function executarOperacao(opcaoSelecionada) {
    switch (opcaoSelecionada) {
        case 1:
            exibirResultado(`Seu saldo atual é: R$ ${saldo.toFixed(2)}`);
            break;
        case 2:
            exibirExtrato();
            break;
        case 3:
            operacaoSaque();
            break;
        case 5:
            operacaoTransferencia();
            break;
        default:
            alert("Opção inválida.");
    }
}

// Função para exibir resultado
function exibirResultado(mensagem) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.textContent = mensagem;
    resultadoDiv.style.display = "block";
}

// Função para exibir extrato
function exibirExtrato() {
    const extratoTexto = extrato.join("\n");
    alert(`Extrato:\n${extratoTexto}`);
}

// Operação de saque
function operacaoSaque() {
    let valor = parseFloat(prompt("Digite o valor do saque:"));
    if (isNaN(valor) || valor <= 0 || valor > saldo) {
        alert("Operação não autorizada. Valor inválido ou saldo insuficiente.");
    } else {
        saldo -= valor;
        extrato.push(`Saque: R$ ${valor.toFixed(2)}`);
        exibirResultado(
            `Saque de R$ ${valor.toFixed(2)} realizado com sucesso!`
        );
    }
}

// Operação de depósito
function operacaoDeposito() {
    let valor = parseFloat(prompt("Digite o valor do depósito:"));
    if (isNaN(valor) || valor <= 0) {
        alert("Operação não autorizada. Valor inválido.");
    } else {
        saldo += valor;
        extrato.push(`Depósito: R$ ${valor.toFixed(2)}`);
        exibirResultado(
            `Depósito de R$ ${valor.toFixed(2)} realizado com sucesso!`
        );
    }
}

// Operação de transferência
function operacaoTransferencia() {
    let conta = prompt("Digite o número da conta:");
    if (!/^\d+$/.test(conta)) {
        alert("Número de conta inválido.");
        return;
    }

    let valor = parseFloat(prompt("Digite o valor da transferência:"));
    if (isNaN(valor) || valor <= 0 || valor > saldo) {
        alert("Operação não autorizada. Valor inválido ou saldo insuficiente.");
    } else {
        saldo -= valor;
        extrato.push(`Transferência para conta ${conta}: R$ ${valor.toFixed(2)}`);
        exibirResultado(
            `Transferência de R$ ${valor.toFixed(2)} para a conta ${conta} realizada com sucesso!`
        );
    }
}

// Função de sair
function sair() {
    const nome = document.getElementById("mensagemBoasVindas").textContent.split(" ")[1];
    document.getElementById("mensagemBoasVindas").textContent = "";
    document.getElementById("escolhas").style.display = "none";
    document.getElementById("resultado").textContent = "";

    const container = document.querySelector(".container");
    container.innerHTML = `
          <p>${nome}, foi um prazer ter você por aqui!</p>
          <button id="btnRecomecar" class="btn btn-primary mt-2">Recomeçar</button>
        `;

    document
        .getElementById("btnRecomecar")
        .addEventListener("click", function () {
            container.innerHTML = "";
            verificaAcesso();
        });
}

verificaAcesso();