function comecar(){
    var num = getNumerador();
    var div = getDivisor();
    resolverIntegral(num, div);
}

/* retorna o numerador escrito pelo usuario */
function getNumerador(){
    var denominador = "2x";
    /* tratar o numerador -> separar sinal, numeros com x e sem x, etc */
    return denominador;
    
}

/* retorna o divisor escrito pelo usuario e ja separado em funcoes parciais */
function getDivisor(){
    var divisor = "x^2-4";
    divisor = divisor.replaceAll(' ', '');
    
    /* divisor exponencial */
    if ( divisor[0] != '(' ) {
        divisor = separaExponencial(divisor);
    }
    
    /* divisor com 2 divisoes */
    var quantFuncParciais = contParenteses(divisor);
    divisor = separaFuncParcial(divisor, quantFuncParciais);

    return divisor;
}

/* recebe uma funcao exponencial e realiza a separacao */
function separaExponencial(divisor) {
    var sinais = getSinais(divisor);
    var valores = getCoeficientes(divisor, sinais);
    var delta = (valores.b * valores.b) - 4 * valores.a * valores.c;

    document.write("Quando o divisor é uma função exponencial é necessário fazer a separação, nesse caso usando baskara:<br/><br/>");

    document.write("Valor de Delta => " + delta + "<br/><br/>");

    if(delta < 0){
        document.write("Para Delta negativo, não existem raízes reais. <br/>");
        return "ERRO: delta negativo!"

    } else {
        
        var coeficiente1 = (-valores.b + Math.sqrt(delta)) / (2 * valores.a);
        var coeficiente2 = (-valores.b - Math.sqrt(delta)) / (2 * valores.a);
        
        divisor = montarNovoDenominador(coeficiente1, coeficiente2, sinais); /* tratar exessões !!!!!!! */
        
        document.write("Para Delta positivo, raízes diferentes: <br/>");  
        document.write("x' = " + coeficiente1 + "<br/>");
        document.write("x'' = " + coeficiente2 + "<br/><br/>");
        document.write("Portanto o novo divisor, feito as separações será: ");
        document.write(divisor + " <br/><br/>");

        return divisor;
    }

}

/* retorna o a, b e c de uma função exponencial */
function getCoeficientes(divisor, sinais){
    var valores = {a:0, b:0, c:0}
    var aux = "";

    for(i=0; i<divisor.length; i++){
        aux += divisor[i];
        /* a */
        if (divisor[i]=='x' && divisor[i+1]=='^' && divisor[i+2]=='2') {
            valores.a = aux + "^2";
            i += 2;
            aux = "";

        /* b */
        } else if (divisor[i]=='x'){
            valores.b = aux;
            aux = ""

        /* c */
        } else if ( i == (divisor.length - 1) ) {
            valores.c = aux;
        }

    }

    valores = separaValores(valores);
    
    return valores;
}

/* recebe os coeficientes de uma funcao exponencial e monta a string correspondente as funcoes parciais */
function montarNovoDenominador(x1, x2, sinais) {
    var novoDen = "(x"+ sinais.sinal1 + x1 + ")(x"+ sinais.sinal1 + x2 + ")"; 
    novoDen = novoDen.replaceAll("+-", "-");
    novoDen = novoDen.replaceAll("--", "+");

    return novoDen;
}

/* retorna os sinais de uma funcao */
function getSinais(divisor) {
    var sinais = {sinal1: '', sinal2: '', sinal3: ''}
    
    /* colocar a opção de por 3 sinais (o do a tbm) */
    for (i=0; i < divisor.length; i++) {
        if (sinais.sinal1 == '' && (divisor[i] == '+' || divisor[i] == '-' || divisor[i] == '*' || divisor[i] == '/')) {
            sinais.sinal1 = divisor[i];

        } else if( sinais.sinal2 == '' && (divisor[i] == '+' || divisor[i] == '-' || divisor[i] == '*' || divisor[i] == '/')) {
            sinais.sinal2 = divisor[i];

        } else if (divisor[i] == '+' || divisor[i] == '-' || divisor[i] == '*' || divisor[i] == '/') {
            sinais.sinal3 = divisor[i];

        }
        
    }

    return sinais;  
}

/* separa os valores de uma funcao exponencial */
function separaValores(valores) {
    
    /* a */
    if (valores.a != 0) {
        if (valores.a[0] == 'x' ) {
            valores.a = 1;

        } else {
            valores.a = valores.a.split('x')[0];
            
            if (valores.a[0] == '-'){
                if (valores.a.length == 1) {
                    valores.a = -1;
                } else {
                    valores.a = valores.areplace('-', '') * -1;
                }
            } else {
                valores.a = valores.a * 1;
            }
            
        }
    }
    
    /* b */
    if (valores.b != 0) {

        if(valores.b[1] == 'x' ) {
            valores.b = 1;
    
        } else {
    
            valores.b = valores.b.split('x')[0];
    
            if(valores.b[0] == '-'){
                valores.b = valores.b.replace('-', '') * -1;
    
            } else if(valores.b[0] == '+'){
                valores.b = valores.b.replace('+', '') * 1;
            }
        }
    }

    /* c */
    if (valores.c != 0) {
        if(valores.c[0] == '-'){
            valores.c = valores.c.replace('-', '') * -1;
    
        } else if(valores.c[0] == '+'){
            valores.c = valores.c.replace('+', '') * 1;
        }
    }
   
    return valores;
}

/* conta a quantidade de funcoes parciais */
function contParenteses(divisor){
    var cont=0;

    for(i = 0; i < divisor.length; i++){
        if(divisor.charAt(i) == "(") {
            cont++;
        } 
    }

    return cont;
}

/* separa as funcoes parciais que se encontram entre parentesis */
function separaFuncParcial(divisor, quantFunc){
    divisor = divisor.split(")(");
    divisor[0] = divisor[0].replace('(', '')
    divisor[1] = divisor[1].replace(")", '')
    if(quantFunc == 3){
        divisor[2] = divisor[2].replace(")", '')
    }
    return divisor
}

/* resolve a integral por fracoes parciais
 * recebe o numerador e o divisor ja dividido em funcoes parciais
 */
function resolverIntegral(num, div) {
    quantFrac = div.length;
    
    if (quantFrac == 2) {
        var funcParciais = encontraFracParciais2(num, div);

    } else if (quantFrac == 3) {
        var funcParciais = encontraFracParciais3(num, div);
    }
}

/* monta as fracoes parciais com 2 funcoes parciais */
function encontraFracParciais2(num, div) {
    var funcParciais = {a:0, divA:div[0], b:0, divB:div[1]};
    var x = getX(funcParciais.divB);

    document.write("Encontrando as fracoes parciais: <br/><br/>")
    /* encontrando b */
    document.write("Primeiramente vamos descobrir o valor de b: <br/>")
    document.write("(a/"+ funcParciais.divA + ") + (b/"+ funcParciais.divB +") = "+ num +"/(("+ funcParciais.divA + ") * ("+ funcParciais.divB +"))<br/>")
    document.write("a ("+ funcParciais.divB +") + b ("+ funcParciais.divA +")  = "+ num +" ---> x = "+x+"<br/>")
    document.write("a (0) + b ("+ funcParciais.divA.replace('x', x) +")  = "+ num.replace("x", "*"+x) + "<br/>")


    var resultB = realizaOperacao( funcParciais.divA.replace('x', x) )
    var resultNum = realizaOperacao( num.replace("x", "*"+x) ) 
    
    document.write("b ("+ resultB +")  = "+ resultNum +"<br/>")
    
    
    funcParciais.b = resultNum/resultB;

    document.write("b = "+ funcParciais.b +"<br/><br/>")

    /* encontrando a */
    x = getX(funcParciais.divA);
    document.write("Agora vamos descobrir o valor de a: <br/>")
    document.write("a ("+ funcParciais.divB +") + b ("+ funcParciais.divA +")  = "+ num +" ---> x = "+x+"<br/>")
    document.write("a ("+ funcParciais.divB.replace('x', x) +") + b (0)  = "+ num.replace("x", "*"+x) + "<br/>")

    var resultA = realizaOperacao( funcParciais.divB.replace('x', x) )
    var resultNum = realizaOperacao( num.replace("x", "*"+x) )
    
    document.write("a ("+ resultA +")  = "+ resultNum +"<br/>")
    
    
    funcParciais.a = resultNum/resultA;

    document.write("a = "+ funcParciais.a +"<br/><br/>")

    return funcParciais;
}

/* retorna o valor de x que sera usado para zerar o valor de a */
function getX(div) {
    var sinal = getSinais(div).sinal1;

    div = div.split(sinal)[1] 
    
    if (sinal == '+') {
        div = div * -1
    }
    
    return div;
}

/* monta as fracoes parciais com 3 funcoes parciais */
function encontraFracParciais3(num, div) {
    var funcParciais = {a:0, divA:div[0], b:0, divB:div[1], c:0, divC:div[2]};

    return funcParciais;
}   

/* recebe uma string que representa uma operacao matematica e retorna o resultado */
function realizaOperacao(op) {
    var sinalOp = ''
    var result;
    var num1, num2;

    for (i=1; i < op.length; i++) {
        if (op[i] == '+' || op[i] == '-' || op[i] == '*' || op[i] == '/' ) {
            sinalOp = op[i]
            break
        }
    }

    /* se aminha operacao so tiver um numero (nao tiver sinal) */
    if (sinalOp == '') {
        return op
    }
    
    
    num1 = op.substring(0, i).trim()
    
    if (num1[0] == '-') {
        num1 = num1.replace('-', '') * -1
        console.log(op)
    } else {
        num1 = num1 * 1
    }
    
    num2 = op.substring(i+1).trim()
    
    if (num2[0] == '-') {
        num2 = num2.replace('-', '') * -1

    } else {
        num2 = num2 * 1
    }


    switch(sinalOp) {
        case '+':
            result = num1 + num2;
        break;

        case '-':
            result = num1 - num2;
        break;

        case '*':
            result = num1 * num2;
        break;

        case '/':
            result = num1 / num2;
        break;
    }

    
    
    return result;
}

/* function realizaIntegral2(divisor, numerador){
    coeficiente1 = divisor[0];
    coeficiente2 = divisor[1];

    document.write("∫" + " " + numerador+ "/" + "(x "+ coeficiente1 + ")");
    document.write("(x  "+ coeficiente2 + ")"+ "<br/>");

    // tentativa fracoes parciais 
    document.write("A" +"(x  "+ coeficiente2 + ")"+ " + ");
    document.write("B" +"(x  "+ "+ " +coeficiente1 + ")"+ " = ");
    document.write( numerador+ "<br/>");
    document.write("Ax" + " + "+ coeficiente2 + "A" + ""+ " + ");
    document.write("Bx" + " + "+ coeficiente1 + "B" + ""+ " = " + numerador+ "<br/>");
    document.write("Ax + Bx = " + numerador+ "<br/>")
    document.write(coeficiente2 + "A" + "+" + coeficiente1 + "B = 0" )
} */


function realizaIntegral(divisor, numerador) {
    numerador = getNumerador(numerador)

        document.write("∫" + " " + numerador+ "/" + "(x "+ coeficiente1 + ")");
        document.write("(x  "+ coeficiente2 + ")"+ "<br/>");

        // tentativa fracoes parciais 
        document.write("A" +"(x  "+ coeficiente2 + ")"+ " + ");
        document.write("B" +"(x  "+ "+ " +coeficiente1 + ")"+ " = ");
        document.write( numerador+ "<br/>");
        document.write("Ax" + " + "+ coeficiente2 + "A" + ""+ " + ");
        document.write("Bx" + " + "+ coeficiente1 + "B" + ""+ " = " + numerador+ "<br/>");
        document.write("Ax + Bx = " + numerador+ "<br/>")
        document.write(coeficiente2 + "A" + "+" + coeficiente1 + "B = 0" )
}