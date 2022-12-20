function cadastrarPessoa() {
    let nome = document.getElementById("txtNome").value.replace(',', '.');
    let altura = document.getElementById("txtAltura").value.replace(',', '.');
    let peso = document.getElementById("txtPeso").value.replace(',', '.');
    let idade = document.getElementById("txtIdade").value.replace(',', '.');
    let sexo = document.getElementsByName("sexo")[0].checked ? "F" : "M";

    let person = new pessoa(nome, altura, peso, idade, sexo);
    persistirLista(person);

    Swal.fire("OK", "Pessoa inserida com sucesso!", "success")
        .then(function (){
            atualizarTabela();
        });
    // let form = document.querySelector(".container__form")
    // let dash = document.querySelector(".container__dash")

    // form.style = "pointer-events: none; user-select: none; opacity: 0.2;"
    // dash.style = "pointer-events: inherit; user-select: inherit; opacity: 1;"
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
    var lista = JSON.parse(localStorage.getItem('listPessoa'));
    lista.forEach(pessoa => {
        swal.fire(pessoa.nome + ' está na faixa: ' + pessoa.faixa);
        //atualizar codigo html com os elementos
    });
}
