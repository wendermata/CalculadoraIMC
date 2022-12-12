function Calcular() {
    var altura = document.getElementById("txtAltura").value;
    var peso = document.getElementById("txtPeso").value;
    var idade = document.getElementById("txtIdade").value;
    let pessoa = '';

    if (document.getElementsByName("sexo")[0].checked) {
        pessoa = new mulher(altura, peso, idade);
        pessoa.retornarClasseImc();
    }
    else {
        pessoa = new homem(altura, peso, idade);
        pessoa.retornarClasseImc();
    }
}

function CalcularIMC(altura, peso) {
    return peso / (altura * altura);
}

class homem {
    constructor(altura, peso, idade) {
        this.altura = altura;
        this.peso = peso;
        this.idade = idade;
        this.imc = CalcularIMC(this.altura, this.peso).toFixed(1);
    }

    retornarClasseImc() {
        let alerta = document.getElementById("mensagem");
        if (this.imc <= 20.6) {
            alerta.innerHTML = "<p>Abaixo do peso!</p>";
        }
        else if (20.7 <= this.imc && this.imc <= 26.4) {
            alerta.innerHTML = "<p>Peso ideal!</p>";
        }
        else if (26.5 <= this.imc && this.imc <= 27.8) {
            alerta.innerHTML = "<p>Pouco acima do peso!</p>";
        }
        else if (27.9 <= this.imc && this.imc <= 31.1) {
            alerta.innerHTML = "<p>Acima do peso!</p>";
        }
        else if (this.imc >= 31.3) {
            alerta.innerHTML = "<p>Ao infinito e além!</p>";
        }
    }
}

class mulher {
    constructor(altura, peso, idade) {
        this.altura = altura;
        this.peso = peso;
        this.idade = idade;
        this.imc = CalcularIMC(this.altura, this.peso).toFixed(1);
    }

    retornarClasseImc() {
        let alerta = document.getElementById("menssagem");
        if (this.imc <= 19.1) {
            alerta.innerHTML = "<p>Abaixo do peso!</p>";
        }
        else if (19.2 <= this.imc && this.imc <= 25.8) {
            alerta.innerHTML = "<p>Peso ideal!</p>";
        }
        else if (25.9 <= this.imc && this.imc <= 27.3) {
            alerta.innerHTML = "<p>Pouco acima do peso!</p>";
        }
        else if (27.4 <= this.imc && this.imc <= 32.3) {
            alerta.innerHTML = "<p>Acima do peso!</p>";
        }
        else if (this.imc >= 32.4) {
            alerta.innerHTML = "<p>Ao infinito e além!</p>";
        }
    }
}