window.onload = function () {
    atualizarTabela();
};

function cadastrarPessoa() {
    let nome = document.getElementById("txtNome").value.replace(',', '.');
    let altura = document.getElementById("txtAltura").value.replace(',', '.');
    let peso = document.getElementById("txtPeso").value.replace(',', '.');
    let idade = document.getElementById("txtIdade").value.replace(',', '.');
    let sexo = document.getElementsByName("sexo")[0].checked ? "F" : "M";

    let person = new pessoa(nome, altura, peso, idade, sexo);
    persistirLista(person);

    Swal.fire("OK", "Pessoa inserida com sucesso!", "success")
        .then(() => { atualizarTabela() });
}

class pessoa {
    constructor(nome, altura, peso, idade, sexo) {
        this.nome = nome;
        this.altura = altura;
        this.peso = peso;
        this.idade = idade;
        this.sexo = sexo;
        this.imc = this.calcularIMC().toFixed(1);
        this.faixa = this.sexo === "F" ? this.retornarFaixaMulher() : this.retornarFaixaHomem();
    }

    calcularIMC() {
        return this.peso / (this.altura * this.altura);
    }

    retornarFaixaMulher() {
        if (this.imc <= 19.1) {
            return 'abaixo';
        } else if (19.2 <= this.imc && this.imc <= 25.8) {
            return 'ideal';
        } else if (25.9 <= this.imc && this.imc <= 27.3) {
            return 'sobrepeso';
        } else {
            return 'obesidade';
        }
    }

    retornarFaixaHomem() {
        if (this.imc <= 20.6) {
            return 'abaixo';
        } else if (20.7 <= this.imc && this.imc <= 26.4) {
            return 'ideal';
        } else if (26.5 <= this.imc && this.imc <= 27.8) {
            return 'sobrepeso';
        } else {
            return 'obesidade';
        }
    }

    retornarClasseImc() {
        let nome = document.getElementById("txtNome").value;
        let alerta = document.getElementById("mensagem");
        let atual = document.getElementById("pesoAtual");
        let objetivo = document.getElementById("objetivo");
        let diferença = document.getElementById("diferença");

        let calcObjetivo = 22 * (this.altura * this.altura)
        let diferençaPeso = this.peso - calcObjetivo

        atual.innerText = `${(this.peso).replace('.', ',')} kg`
        objetivo.innerText = `${(calcObjetivo).toFixed(1)} kg`
        diferença.innerText = `${(diferençaPeso.toFixed(1))} kg`

        if (this.imc <= 20.6) {
            alerta.innerHTML = `<p class="main__result">${nome}, você está <strong class="red">abaixo do peso!</strong></p>`;
        } else if (20.7 <= this.imc && this.imc <= 26.4) {
            alerta.innerHTML = `<p class="main__result">${nome}, você está <strong class="green">no seu peso ideal!</strong></p>`;
        } else if (26.5 <= this.imc && this.imc <= 27.8) {
            alerta.innerHTML = `<p class="main__result">${nome}, você está <strong class="orange">um pouco acima do peso!</strong></p>`;
        } else if (27.9 <= this.imc && this.imc <= 31.1) {
            alerta.innerHTML = `<p class="main__result">${nome}, você está <strong class="red">acima do peso!</strong></p>`;
        } else if (this.imc >= 31.3) {
            alerta.innerHTML = `<p class="main__result">${nome}, <strong class="green">ao infinito e além!</strong></p>`;
        }
    }
}

function persistirLista(objeto) {
    var objetoAtual = JSON.parse(localStorage.getItem('listPessoa'));

    if (objetoAtual == null) {
        var inicioLista = [];
        localStorage.setItem('listPessoa', JSON.stringify(inicioLista));
    }

    objetoAtual.push(objeto);
    const objetoJson = JSON.stringify(objetoAtual);
    localStorage.setItem('listPessoa', objetoJson);
}

function atualizarTabela() {
    limparTabela();

    var lista = JSON.parse(localStorage.getItem('listPessoa'));
    if (lista != null && lista.length > 0) {
        lista.forEach(pessoa => {
            inserirLinha(pessoa);
        });
    }
    else {
        adicionarLinhaSemRegistro();
    }
}

function inserirLinha(item) {
    var tabela = document.getElementsByTagName('table')[0];
    var linha = tabela.insertRow(1);

    var nome = linha.insertCell(0);
    var peso = linha.insertCell(1);
    var altura = linha.insertCell(2);
    var idade = linha.insertCell(3);
    var sexo = linha.insertCell(4);
    var imc = linha.insertCell(5);

    nome.innerHTML = '<td>' + item.nome + '</td>';
    peso.innerHTML = '<td>' + item.peso + '</td>';
    altura.innerHTML = '<td>' + item.altura + '</td>';
    idade.innerHTML = '<td>' + item.idade + '</td>';
    sexo.innerHTML = '<td>' + item.sexo + '</td>';
    imc.innerHTML = '<td>' + item.faixa + '</td>';

    atualizarStatus();
}

function atualizarStatus() {
    var qtdAbaixo = 0;
    var qtdIdeal = 0;
    var qtdAcima = 0;

    var lblAbaixo = document.getElementById('qtdAbaixo');
    var lblIdeal = document.getElementById('qtdIdeal');
    var lblAcima = document.getElementById('qtdAcima');

    var lista = JSON.parse(localStorage.getItem('listPessoa'));
    lista.forEach(pessoa => {
        if (pessoa.faixa == 'abaixo') {
            qtdAbaixo += 1;
        }
        else if (pessoa.faixa == 'ideal') {
            qtdIdeal += 1;
        }
        else {
            qtdAcima += 1;
        }
    });

    lblAbaixo.textContent = qtdAbaixo;
    lblIdeal.textContent = qtdIdeal;
    lblAcima.textContent = qtdAcima
}

function limparTabela() {
    var tabela = document.getElementsByTagName('table')[0];
    if (tabela.rows.length < 2) {
        return;
    }

    for (i = 0; i < tabela.rows.length; i++) {
        tabela.deleteRow(1);
    }
}

function adicionarLinhaSemRegistro() {
    var tabela = document.getElementsByTagName('table')[0];
    var linha = tabela.insertRow(1);
    var celula = linha.insertCell(0);
    celula.innerHTML = "<td> SEM REGISTROS </td>";
    celula.colSpan = 6;
}

function limparLista() {
    var listaVazia = [];
    localStorage.setItem('listPessoa', JSON.stringify(listaVazia));
    atualizarTabela();
}

function buscarHora() {

    var mock = {"timeZone":"America/Sao_Paulo","currentLocalTime":"2023-01-23T22:56:19.7946564","currentUtcOffset":{"seconds":-10800,"milliseconds":-10800000,"ticks":-108000000000,"nanoseconds":-10800000000000},"standardUtcOffset":{"seconds":-10800,"milliseconds":-10800000,"ticks":-108000000000,"nanoseconds":-10800000000000},"hasDayLightSaving":false,"isDayLightSavingActive":false,"dstInterval":null}
    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://www.timeapi.io/api/TimeZone/zone?timeZone=America/Sao_Paulo", requestOptions)
        .then(response => response.text())
        .then(result =>  Swal.fire("Hora Atual é:"+ new Date (result.currentLocalTime).toLocaleTimeString()))
        .catch(error => Swal.fire("Hora Atual é: "+ new Date (mock.currentLocalTime).toLocaleTimeString()));
}