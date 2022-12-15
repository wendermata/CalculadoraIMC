function Calcular() {
    let altura = document.getElementById("txtAltura").value.replace(',', '.');
    let peso = document.getElementById("txtPeso").value.replace(',', '.');
    let idade = document.getElementById("txtIdade").value.replace(',', '.');
    let pessoa = '';

    let form = document.querySelector(".container__form")
    let dash = document.querySelector(".container__dash")

    form.style = "pointer-events: none; user-select: none; opacity: 0.2;"
    dash.style = "pointer-events: inherit; user-select: inherit; opacity: 1;"

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

class mulher {
    constructor(altura, peso, idade) {
        this.altura = altura;
        this.peso = peso;
        this.idade = idade;
        this.imc = CalcularIMC(this.altura, this.peso).toFixed(1);
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
        
        if (this.imc <= 19.1) {
            alerta.innerHTML = `<p class="main__result">${nome}, você está <strong class="red">abaixo do peso!</strong></p>`;
        } else if (19.2 <= this.imc && this.imc <= 25.8) {
            alerta.innerHTML = `<p class="main__result">${nome}, você está <strong class="green">no seu peso ideal!</strong></p>`;
        } else if (25.9 <= this.imc && this.imc <= 27.3) {
            alerta.innerHTML = `<p class="main__result">${nome}, você está <strong class="orange">um pouco acima do peso!</strong></p>`;
        } else if (27.4 <= this.imc && this.imc <= 32.3) {
            alerta.innerHTML = `<p class="main__result">${nome}, você está <strong class="red">acima do peso!</strong></p>`;
        } else if (this.imc >= 32.4) {
            alerta.innerHTML = `<p class="main__result">${nome}, <strong class="green">ao infinito e além!</strong></p>`;
        }
    }
}