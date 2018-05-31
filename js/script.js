{
    let calculadora = {
        buttonCalculPulsado: '',
        
        resultadoAcumulado: 0,
        
        cajaResultado: undefined,
        
        dibujarcalculadora: function () {
            let divCalculadora = document.createElement('div');
            divCalculadora.setAttribute('id', 'divCalculadora');
            
            calculadora.cajaResultado = document.getElementById('cajaResultado');
            calculadora.cajaResultado = document.createElement('input');
            calculadora.cajaResultado.setAttribute('type', 'text');
            calculadora.cajaResultado.setAttribute('id', 'cajaResultado');
            calculadora.cajaResultado.setAttribute('disabled', '');
            calculadora.cajaResultado.value = 0;
            
            let botones = ['CE', 'C', '%', '+', 7, 8, 9, '-', 4, 5, 6, 'x', 1, 2, 3, '/', 0, '+/-', '.', '='];
            divCalculadora.appendChild(calculadora.cajaResultado);
            
            let elementInputBotones = document.createElement('div');
            elementInputBotones.setAttribute('id', 'inputBotones');
            
            let button;
            
            for (let i = 0; i < botones.length; i++) {
                button = document.createElement('button');
                button.appendChild(document.createTextNode(botones[i]));
                button.addEventListener('click', calculadora.clickButtoncalculadora, false);
                elementInputBotones.appendChild(button);
            }
            
            divCalculadora.appendChild(elementInputBotones);
            document.body.appendChild(divCalculadora);
        },
        
        sumar: function(numero1, numero2) {
            return numero1 + numero2;
        },
        restar: function(numero1, numero2) {
            return numero1 - numero2;
        },
        multiplicar: function(numero1, numero2) {
            return numero1 * numero2;
        },
        dividir: function(numero1, numero2) {
            return numero1 / numero2;
        },
        
        calcularResultadoAcumulado: function(calculadora, cajaResultado) {
            switch (calculadora.buttonCalculPulsado) {
                case '+':
                return calculadora.sumar(parseFloat(calculadora.resultadoAcumulado), parseFloat(cajaResultado.value));
                case '-':
                return calculadora.restar(parseFloat(calculadora.resultadoAcumulado), parseFloat(cajaResultado.value));
                case 'x':
                return calculadora.multiplicar(parseFloat(calculadora.resultadoAcumulado), parseFloat(cajaResultado.value));
                case '/':
                return calculadora.dividir(parseFloat(calculadora.resultadoAcumulado), parseFloat(cajaResultado.value));
            }
        },
        
        clickButtoncalculadora : function () {
            let simbolo = this.innerText;
            switch (simbolo) {
                case 'CE': 
                    calculadora.cajaResultado.value = '0';
                    calculadora.buttonCalculPulsado = '';
                    calculadora.resultadoAcumulado = 0;
                break;
                case 'C': 
                    let cadenaRecortada = calculadora.cajaResultado.value.slice(0, calculadora.cajaResultado.value.length - 1);
                    if (cadenaRecortada == 0 || cajaResultado.value.split('').indexOf('-') != -1) {
                        calculadora.cajaResultado.value = 0;
                    } else {
                        calculadora.cajaResultado.value = cadenaRecortada;
                    }
                break;
                case '%': 
                    if (calculadora.cajaResultado.value != '')
                        calculadora.cajaResultado.value = parseFloat(calculadora.cajaResultado.value) / 100;
                break;
                case '+':
                case '-':
                case 'x':
                case '/':
                    if (calculadora.buttonCalculPulsado != '' && calculadora.cajaResultado.value != '') {
                        calculadora.resultadoAcumulado = calculadora.calcularResultadoAcumulado(calculadora, calculadora.cajaResultado);
                        calculadora.buttonCalculPulsado = simbolo;
                        calculadora.cajaResultado.value = calculadora.resultadoAcumulado;
                    } else {
                        calculadora.resultadoAcumulado = parseFloat(calculadora.cajaResultado.value);
                        calculadora.buttonCalculPulsado = simbolo;
                        calculadora.cajaResultado.value = calculadora.resultadoAcumulado;
                    }
                break;
                case '+/-':
                    if (calculadora.cajaResultado.value != '' && calculadora.cajaResultado.value != '0') {
                        let primerCaracter = calculadora.cajaResultado.value.slice(0, 1);
                        if (primerCaracter == '-')
                            calculadora.cajaResultado.value = calculadora.cajaResultado.value.replace('-', '');
                        else
                            calculadora.cajaResultado.value = '-' + calculadora.cajaResultado.value;
                    }
                break;
                case '.':
                    if (calculadora.cajaResultado.value != '' && calculadora.cajaResultado.value.match(/\./g) != '.') {
                        calculadora.cajaResultado.value = calculadora.cajaResultado.value + '.';
                    }
                break;
                case '=':
                    if (calculadora.buttonCalculPulsado != '' && calculadora.cajaResultado.value.length > 0) {
                        calculadora.resultadoAcumulado = calculadora.calcularResultadoAcumulado(calculadora, calculadora.cajaResultado);
                        calculadora.cajaResultado.value = calculadora.resultadoAcumulado;
                        calculadora.buttonCalculPulsado = '';
                    } else {
                        calculadora.buttonCalculPulsado = '';
                        calculadora.cajaResultado.value = calculadora.resultadoAcumulado;
                    }
                break;
                default:
                    if (calculadora.cajaResultado.value == '0' || calculadora.buttonCalculPulsado != '')
                        calculadora.cajaResultado.value = simbolo;
                    else
                        calculadora.cajaResultado.value += simbolo;
                
                break;
            }
        }
    };
    
    calculadora.dibujarcalculadora();
}