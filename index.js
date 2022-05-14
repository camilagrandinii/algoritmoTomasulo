var docCalculadora = document.getElementById('calculadora1');
var textoHTML="";
var input = document.getElementById('input_enviar');

input.onclick = () => {
    comecar();
}
function comecar(){
    var num = getNumerador();
    var div = getDivisor();
    resolverIntegral(num, div);
}


function getLimiteInf(){
    var limite_inf = document.getElementById('limite_inf').value;
    return limite_inf;
}
function getLimiteSup(){
    var limite_sup = document.getElementById('limite_sup').value;
    return limite_sup;
}
/* retorna o numerador escrito pelo usuario */
function getNumerador(){
    var numerador = document.getElementById('numerador').value;
    /* tratar o numerador -> separar sinal, numeros com x e sem x, etc */
    return numerador;    
}

/* retorna o divisor escrito pelo usuario e ja separado em funcoes parciais */
function getDivisor(){

    var divisor = document.getElementById('divisor').value;
    var quantFuncParciais = 0;
    /* divisor exponencial */
    if ( divisor[0] != '(' ) {
        divisor = divisor.replaceAll(' ', '');
        divisor = separaExponencial(divisor);
        quantFuncParciais = contParenteses(divisor);
        divisor = separaFuncParcial(divisor, quantFuncParciais);
    }
    else if(contParenteses(divisor) == 2){
        divisor = divisor.replaceAll(' ', '');
        quantFuncParciais = contParenteses(divisor);
        divisor = separaFuncParcial(divisor, quantFuncParciais);
    }
    else if(contParenteses(divisor) == 3){
        divisor = divisor.replace(' ', '');
        quantFuncParciais = contParenteses(divisor);
        divisor = separarDivisor3(divisor); 
    }

    return divisor;
}

/* recebe uma funcao exponencial e realiza a separacao */
function separaExponencial(divisor) {
    var sinais = getSinais(divisor);
    var valores = getCoeficientes(divisor, sinais);
    var delta = (valores.b * valores.b) - 4 * valores.a * valores.c;

    textoHTML+="Quando o divisor é uma função exponencial é necessário fazer a separação, nesse caso usando baskara:<br/><br/>";

    textoHTML+="Valor de Delta => " + delta + "<br/><br/>";

    if(delta < 0){
        textoHTML+="Para Delta negativo, não existem raízes reais. <br/>";
        return "ERRO: delta negativo!"

    } else {
        
        var coeficiente1 = (-valores.b + Math.sqrt(delta)) / (2 * valores.a);
        var coeficiente2 = (-valores.b - Math.sqrt(delta)) / (2 * valores.a);
        
        divisor = montarNovoDenominador(coeficiente1, coeficiente2, sinais); /* tratar exessões !!!!!!! */
        
       textoHTML+="Para Delta positivo, raízes diferentes: <br/>";  
       textoHTML+="x' = " + coeficiente1 + "<br/>";
       textoHTML+="x'' = " + coeficiente2 + "<br/><br/>";
       textoHTML+="Portanto o novo divisor, feito as separações será: ";
       textoHTML+=divisor + " <br/><br/>";

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
    var sinais = {sinal1: '', sinal2: '', sinal3: '', sinal4: ''}
    
    /* colocar a opção de por 3 sinais (o do a tbm) */
    for (i=0; i < divisor.length; i++) {
        if (sinais.sinal1 == '' && (divisor[i] == '+' || divisor[i] == '-' || divisor[i] == '*' || divisor[i] == '/')) {
            sinais.sinal1 = divisor[i];

        } else if( sinais.sinal2 == '' && (divisor[i] == '+' || divisor[i] == '-' || divisor[i] == '*' || divisor[i] == '/')) {
            sinais.sinal2 = divisor[i];

        } else if (sinais.sinal3 == '' && ( divisor[i] == '+' || divisor[i] == '-' || divisor[i] == '*' || divisor[i] == '/') ) {
            sinais.sinal3 = divisor[i];

        }else if (divisor[i] == '+' || divisor[i] == '-' || divisor[i] == '*' || divisor[i] == '/') {
            sinais.sinal4 = divisor[i];

        }
        
    }

    return sinais;  
}
function getSinais2(integrada) {
    var sinais = {sinal1: '', sinal2: ''}
    
    for (i=0; i < integrada.length; i++) {
        if (sinais.sinal1 == '' && (divisor[i] == '+' || divisor[i] == '-')) {
            sinais.sinal1 = divisor[i];

        } else if( sinais.sinal2 == '' && (divisor[i] == '+' || divisor[i] == '-')) {
            sinais.sinal2 = divisor[i];
        }
    }

    return sinais;  
}
function realizaIntegrada(integrada){
    var result=0;
    var sinais = getSinais2(integrada);
    var valores_integrada = {valorA: '', valorB: ''};
    var valores_integradaA = {a1:'', a2:''};
    var valores_integradaB = {b1:'', b2:''};
    var valores_integrada2 = {valorA2: '', valorB2: ''};

    valores_integrada = valores_integrada.split(sinais.sinal2);
    valores_integradaA = valores_integrada.valorA.split('*');
    valores_integradaB = valores_integrada.valorB.split('*');

    valores_integradaA.a1=parseInt(valores_integradaA.a1);
    valores_integradaB.b1=parseInt(valores_integradaB.b1);
    valores_integrada2.valorA2=limpaSomaIntegrada(valores_integradaA.a2);
    valores_integrada2.valorB2=limpaSomaIntegrada(valores_integradaB.b2);

    return result;
}
function limpaSomaIntegrada(integrada){
    integrada = integrada.replaceAll('|', '');
    integrada = integrada.replaceAll("ln", "");

    integrada = integrada.replaceAll("x", getLimiteSup());
    integrada = parseInt(integrada);
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
function separarDivisor3(divisor){
    divisor = divisor.split(")");
    divisor[0] = divisor[0].replaceAll('(', '')
    divisor[1] = divisor[1].replaceAll("(", '')
    divisor[2] = divisor[2].replaceAll("(", '')
    return divisor;
    
}

/* resolve a integral por fracoes parciais
 * recebe o numerador e o divisor ja dividido em funcoes parciais
 */
function resolverIntegral(num, div) {
    quantFrac = div.length;
    limite_inf = getLimiteInf();
    limite_sup = getLimiteSup();
    var sinais = {sinal1:'', sinal2:''}

    if (quantFrac == 2) {

        var funcParciais = encontraFracParciais2(num, div);
        if ( funcParciais.b < 0 ) {
            sinais.sinal1 = "-"
            funcParciais.b = funcParciais.b * -1
        } else {
            sinais.sinal1 = "+"
        }

        textoHTML+="<b>Agora vamos resolver a integral propriamente:</b> <br/>";
        textoHTML+= "<br>";
        textoHTML+="∫"+funcParciais.a+"/("+funcParciais.divA+") "+sinais.sinal1+" "+funcParciais.b+"/("+funcParciais.divB+") <br/>";
        textoHTML+="∫"+funcParciais.a+"/("+funcParciais.divA+") "+sinais.sinal1+" ∫"+funcParciais.b+"/("+funcParciais.divB+")<br/>";
        textoHTML+=funcParciais.a+"*∫1/("+funcParciais.divA+") "+sinais.sinal1+" "+funcParciais.b+"*∫1/("+funcParciais.divB+")<br/>";
        textoHTML+=funcParciais.a+"*ln|"+funcParciais.divA+"| "+sinais.sinal1+" "+funcParciais.b+"*ln|"+funcParciais.divB+"|";

        if (limite_inf=='' && limite_sup==''){
            textoHTML+=" + C<br/>";
        }
        //else{
            //var result = realizaIntegrada(textoHTML);
            //Math.abs(10)-Math.abs(6)
            //Math.log()
        //}
    } else if (quantFrac == 4) {
        docCalculadora.innerHTML=textoHTML;
        var funcParciais = realizaIntegral3(div, num);
    }

    docCalculadora.innerHTML=textoHTML;

}

/* monta as fracoes parciais com 2 funcoes parciais */
function encontraFracParciais2(num, div) {
    var funcParciais = {a:0, divA:div[0], b:0, divB:div[1]};
    var x = getX(funcParciais.divB);
    textoHTML+="<b>Encontrando as fracoes parciais:</b> <br/><br/>"
    /* encontrando b */
    textoHTML+="<strong>Primeiramente vamos descobrir o valor de b: </strong> <br/><br/>"
    textoHTML+="(a/"+ funcParciais.divA + ") + (b/"+ funcParciais.divB +") = "+ num +"/(("+ funcParciais.divA + ") * ("+ funcParciais.divB +"))<br/>"
    textoHTML+="a ("+ funcParciais.divB +") + b ("+ funcParciais.divA +")  = "+ num +" ---> x = "+x+"<br/>"
    textoHTML+="a (0) + b ("+ funcParciais.divA.replace('x', x) +")  = "+ num.replace("x", "*"+x) + "<br/>"


    var resultB = realizaOperacao( funcParciais.divA.replace('x', x) )
    var resultNum = realizaOperacao( num.replace("x", "*"+x) ) 
    
    textoHTML+="b ("+ resultB +")  = "+ resultNum +"<br/>"
    
    
    funcParciais.b = resultNum/resultB;

    textoHTML+="b = "+ funcParciais.b +"<br/><br/>"

    /* encontrando a */
    x = getX(funcParciais.divA);
    textoHTML+="<strong>Agora vamos descobrir o valor de a: </strong> <br/><br/>"
    textoHTML+="a ("+ funcParciais.divB +") + b ("+ funcParciais.divA +")  = "+ num +" ---> x = "+x+"<br/>"
    textoHTML+="a ("+ funcParciais.divB.replace('x', x) +") + b (0)  = "+ num.replace("x", "*"+x) + "<br/>"

    var resultA = realizaOperacao( funcParciais.divB.replace('x', x) )
    var resultNum = realizaOperacao( num.replace("x", "*"+x) )
    
    textoHTML+="a ("+ resultA +")  = "+ resultNum +"<br/>"
    
    
    funcParciais.a = resultNum/resultA;

    textoHTML+="a = "+ funcParciais.a +"<br/><br/>"

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

function realizaIntegral3(divisor, numerador){
    textoHTML+="<b>Encontrando as fracoes parciais:</b> <br/><br/>"
    textoHTML+="<strong>Primeiramente vamos descobrir o valor de c: </strong> <br/><br/>"
    coeficiente1 = divisor[0];
    coeficiente2 = divisor[1];
    coeficiente3 = divisor[2];
    textoHTML+=("∫" + " " + numerador+ "/" + "("+ coeficiente1 + ")");
    textoHTML+=("("+ coeficiente2 + ")");
    textoHTML+=("("+ coeficiente3+ ")"+ "<br/>");

    // tentativa fracoes parciais 
    if(numerador[1]== "x"){
    textoHTML+=("A" +"("+ coeficiente3 + ")"+ "("+ coeficiente2 + ")"+ " + ");
    textoHTML+=("B" +"("+ coeficiente3 + ")"+ "("+ coeficiente1 + ")"+" + ")
    textoHTML+=("C" +"("+ coeficiente1 + ")" +"("+ coeficiente2 + ")"+ " = ");;
    textoHTML+=( numerador+ "<br/>");

    /*
    //qnt de x
    alert(coeficiente1[0])
    //sinal
    alert(coeficiente1[1])
    //valor acompannhado de x
    alert(coeficiente1[3])
    //qnt de x
    alert(coeficiente2[0])
    //sinal
    alert(coeficiente2[2])
    //valor acompannhado de x
    alert(coeficiente2[4])
     //qnt de x
    alert(coeficiente3[0])
     //sinal
    alert(coeficiente3[2])
     //valor acompannhado de x
    alert(coeficiente3[4])
    */
   if(coeficiente3[2] != coeficiente2[2]){
    multi = parseInt(coeficiente3[4]) * parseInt(coeficiente2[4])
    multi = - multi}
    else {
        multi = parseInt(coeficiente3[4]) * parseInt(coeficiente2[4])
        multi = "+" +  multi
    }
    textoHTML+=("A(xˆ2 " + multi  + coeficiente3[2] + coeficiente3[4] + "x "+ coeficiente2[2] + coeficiente2[4] + "x)" + "+ ")
    if(coeficiente3[2] != coeficiente1[1]){
        multi2 = parseInt(coeficiente3[4]) * parseInt(coeficiente1[3])
        multi2 = - multi2}
        else {
            multi2 = parseInt(coeficiente3[4]) * parseInt(coeficiente1[3])
            multi2 = + multi2
        }
    textoHTML+=("B(xˆ2 " + multi2  + coeficiente3[2] + coeficiente3[4] + "x "+ coeficiente1[1] + coeficiente1[3] + "x)" + "+ ")
    if(coeficiente1[1] != coeficiente2[2]){
        multi3 = parseInt(coeficiente2[4]) * parseInt(coeficiente1[3])
        multi3 = - multi3}
        else {
            multi3 = parseInt(coeficiente2[4]) * parseInt(coeficiente1[3])
            multi3 = + multi3
        }
    textoHTML+=("C(xˆ2 " + multi3  + coeficiente1[1] + coeficiente1[3] + "x "+ coeficiente2[2] + coeficiente2[4] + "x)" + "<br/>")
    if(coeficiente3[2] != coeficiente2[2]){
        if(coeficiente3[2] = "-"){
        if(coeficiente3[4] > coeficiente2[4]){
            soma = parseInt(-coeficiente3[4]) + parseInt(coeficiente2[4])
            soma = -coeficiente3[2] + soma
        }
        else if(coeficiente3[4] < coeficiente2[4]){
            soma = parseInt(-coeficiente3[4]) + parseInt(coeficiente2[4])
            soma = "+" + coeficiente2[4] + soma
        }
        else
        soma = 0;
    }
        else {
            if(coeficiente3[2] > coeficiente2[2]){
                soma = "+" + parseInt(-coeficiente3[4]) + parseInt(-coeficiente2[4])
                soma = -coeficiente3[2] + soma
            }
            else if(coeficiente3[2] < coeficiente2[2]){
                soma = "+" +parseInt(-coeficiente3[4]) + parseInt(-coeficiente2[4])
                soma = -coeficiente2[2] + soma
            }
            else
            soma = 0; 
        }
    }
    else {
        soma = coeficiente3[2] + (parseInt(coeficiente3[4]) + parseInt(coeficiente2[4]))
    }
    if(soma!= 0){
    textoHTML+=("A(xˆ2 " + multi+ soma + "x )" + "<br/>")
    A="xˆ2 " + multi  + soma + "x" }
    else {
    textoHTML+=("A(xˆ2" + multi  +  ")" + "<br/>")
    A = "xˆ2" + multi
}
    if(coeficiente3[2] != coeficiente1[1]){
        if(coeficiente3[2] = "-"){
        if(coeficiente3[4] > coeficiente1[3]){
            soma2 = "+" + parseInt(-coeficiente3[4]) + parseInt(coeficiente1[3])
            soma2 = -coeficiente3[2] + soma2
        }
        else if(coeficiente3[4] < coeficiente1[3]){
            soma2 = "+" + parseInt(-coeficiente3[4]) + parseInt(coeficiente1[3])
            soma2 = "+" + coeficiente1[1] + soma2
        }
        else
        soma2 = 0;
    }
        else {
            if(coeficiente3[2] > coeficiente1[1]){
                soma2 = "+" + parseInt(-coeficiente3[4]) + parseInt(-coeficiente1[3])
                soma2 = -coeficiente3[2] + soma2
            }
            else if(coeficiente3[2] < coeficiente1[1]){
                soma2 = "+" + parseInt(-coeficiente3[4]) + parseInt(-coeficiente1[3])
                soma2 = -coeficiente1[1] + soma2
            }
            else
            soma2 = 0; 
        }
    }
    else {
        soma2 = coeficiente3[2] + (parseInt(coeficiente3[4]) + parseInt(coeficiente1[3]))
    }
    if(soma2!= 0){


    textoHTML+=("B(xˆ2 " + multi2  + soma2 + "x )" + "<br/>")
    B="xˆ2 " + multi2  + soma2 + "x"
}
    else {
    textoHTML+=("B(xˆ2" + multi2  +  ")" + "<br/>")
    B="xˆ2 " + multi2  + "x"
}
    if(coeficiente2[2] != coeficiente1[1]){
        if(coeficiente2[2] = "-"){
        if(coeficiente2[4] > coeficiente1[3]){
            soma3 = parseInt(-coeficiente2[4]) + parseInt(coeficiente1[3])
            soma3 = -coeficiente2[2] + soma3
        }
        else if(coeficiente2[4] < coeficiente1[3]){
            soma3 = parseInt(-coeficiente2[4]) + parseInt(coeficiente1[3])
            soma3 = "+" +coeficiente1[1] + soma3
        }
        else
        soma3 = "+" + 0;
    }
        else {
            if(coeficiente2[2] > coeficiente1[1]){
                soma3 = parseInt(-coeficiente2[4]) + parseInt(-coeficiente1[3])
                soma3 = -coeficiente2[2] + soma3
            }
            else if(coeficiente2[2] < coeficiente1[1]){
                soma3 = parseInt(-coeficiente2[4]) + parseInt(-coeficiente1[3])
                soma3 = -coeficiente1[1] + soma3
            }
            else
            soma3 = 0; 
        }
    }
    else {
        soma3 = coeficiente3[2] + (parseInt(coeficiente2[4]) + parseInt(coeficiente1[3]))
    }
    if(soma3!= 0){
    textoHTML+=("C(xˆ2 " + multi3  + soma3 + "x )" + "<br/>")
    C="xˆ2 " + multi3  + soma3 + "x"
    textoHTML+=( "Axˆ2 "+ soma + "Ax" + multi + "A" + ""+ " + ");
    textoHTML+=( "   Bxˆ2 "+ soma2 + "Bx +" + multi2 + "B" + ""+ " + ");
    textoHTML+=( "Cxˆ2 "+ soma3 + "Cx +" + multi3 + "C" + " = ");
    textoHTML+=( numerador+ "<br/>");

    textoHTML+=("A" + " + " +"B + " + "C" +" = " + 0 + "<br/>")
    textoHTML+=( soma + "A" + soma2 + "B" + soma3 + "C" +  "= "+ numerador[0] +"<br/>")
    textoHTML+=(multi + "A" + "+" + multi2 + "B"+ "+" +  multi3 + "C"+ " = 0 "+"<br/>")
    textoHTML+=("{" + "A" + "= "+ " - " +"B" + " - C" + "<br/>")
    textoHTML+=("{" + soma + "(-B" + "-C)" + soma2 + "B" + soma3 + "C"+" = "+ numerador[0]+ "<br/>")
    if(soma[0] == "-"){
        textoHTML+=( -soma + "B +"+ -soma + "C " +  soma2 + "B"+ soma3 + "C"+" = " + numerador[0]+ "<br/>")
        resp = parseFloat(-soma) + parseFloat(soma2)
        resp2 = parseFloat(-soma) + parseFloat(soma3)
        textoHTML+=("{" + resp + "B +" + resp2 + "C"+" = " + numerador[0]+ "<br/>")
        textoHTML+=(multi + "A +" + multi2 + "B +"+  multi3 + "C"+ " = 0 "+"<br/>")
        textoHTML+=(multi + "(-B -C ) +" + multi2 + "B +"+  multi3 + "C"+ " = 0 "+"<br/>")
        if(multi[0] == "+"){
        textoHTML+=(-multi + "B " + -multi + "C +" + multi2 + "B +"+  multi3 + "C"+ " = 0 "+"<br/>")
        resu = parseFloat(-multi) + parseFloat(multi2)
        resu2 = parseFloat(-multi) + parseFloat(multi3)
        textoHTML+=(resu + "B " + resu2 + "C" + " = 0 "+"<br/>")
        textoHTML+=("{" + resp + "B +" + resp2 + "C"+" = " + numerador[0]+ "<br/>")
        textoHTML+=("{" + resu + "B " + resu2 + "C" + " = 0 "+"<br/>")
        textoHTML+=("{" + resp + "B" +  "= " + numerador[0] + "" + -resp2 + "C"+ "<br/>")
        textoHTML+=("{" + resu + "(" + numerador[0] + -resp2 +"C)" + resu2+ "C = 0" + "<br/>")
        total = resu * numerador[0]
        total2 = - resp2 * resu 
        textoHTML+=(total + "+" +total2 + "C " + resu2+ "C"+" = 0" + "<br/>")
        totalC = total2 + resu2
        textoHTML+=(total + "+"+ totalC + "C"+" = 0" + "<br/>")
        C = -total/totalC
        C = C.toFixed(2)
        textoHTML+=(totalC + "C"+" = " + -total+ "<br/>")
        textoHTML+=("C" +  "= " + (C)+ "<br/>")
        C = -total/totalC
        C = C.toFixed(2)
        textoHTML+="<br/>"
        textoHTML+="<strong>Agora vamos descobrir o valor de b: </strong> <br/><br/>"
        textoHTML+=("{" + resp + "B +" + resp2 + "C"+" = " + numerador[0]+ "<br/>")
        total3 = C* resp2
        total3 = Math.ceil(total3)
        textoHTML+=("{" + resp + "B +" + resp2 + "*" + C + "C"+" = " + numerador[0]+ "<br/>")
        textoHTML+=( resp + "B +" + total3+" = " + numerador[0]+ "<br/>")
        textoHTML+=( resp + "B" + " = " + numerador[0] + -total3+ "<br/>")
        totalB =numerador[0] -total3
        textoHTML+=("B" +  "= " + (totalB/resp)+ "<br/>")
        B = totalB/resp 
        textoHTML+="<br/>"
        textoHTML+="<strong>Agora vamos descobrir o valor de a: </strong> <br/><br/>"
        textoHTML+=("{" + "A" + "= "+ " - " +"B" + " - C" + "<br/>")
        textoHTML+=("{" + "A" + "= " +  -B+ -C + "<br/>")
        totalA = -B -C     
        A = totalA.toFixed(2)
        textoHTML+=("{" + "A" + "= " +  A+ "<br/>")
        textoHTML+="<br/>"
        textoHTML+="<b>Agora vamos resolver a integral propriamente:</b> <br/>"
        textoHTML+="<br/>"
        textoHTML+=("∫" + " " + A + "/" + "("+ coeficiente1 + ") + ");
        textoHTML+=("∫" + " " + B + "/" + "("+ coeficiente2 + ")  +  ");
        textoHTML+=("∫" + " " + C + "/" + "("+ coeficiente3 + ")"+ "<br/>");
        textoHTML+=(A +"∫" + " "+ "1/" + "("+ coeficiente1+ ")  ");
        textoHTML+=(B +"∫" + " "+ "1/" + "("+ coeficiente2+ ")"+ " + ");
        textoHTML+=(C +"∫" + " "+ "1/" + "("+ coeficiente3 + ")"+ "<br/>");
        textoHTML+=(A +"ln" + " " + "|"+ coeficiente1 + "| ");
        textoHTML+=(B +"ln" + " " + "|"+ coeficiente2 + "|" + " + ");
        textoHTML+=(C +"ln" + " " + "|"+ coeficiente3 + "|"+ "<br/>");
        textoHTML+="<b>Agora vamos resolver os limites superior e inferiores:</b> <br/>";
        textoHTML+="limite superior:" + limite_sup + "<br/>";
        textoHTML+="limite inferior:" + limite_inf + "<br/>";
        teste1 = coeficiente1.replace("x", limite_sup)
        teste2 = coeficiente2.replace("x", limite_sup)
        teste3 = coeficiente3.replace("x", limite_sup)
        if(teste1[1] == '-'){
        teste1 = parseFloat(teste1[0] - teste1[3])
        resultado = teste1 * A
        if(teste2[2] == '-'){
            teste2 = parseFloat(teste2[0] - teste2[4])
            resultado2 = teste2 * B
            if(resultado2[0] != '-'){
                resultado2 = "+" + resultado2
            }
            else{
                resultado2 = resultado2
            }
            if(teste3[2] == '-'){
                teste3 = parseFloat(teste3[0] - teste3[4])
                resultado3 = teste3 * C
                if(resultado3[0] != '-'){
                resultado3 = resultado3
                }
                else
                resultado3 = resultado3

                textoHTML+=(resultado)
                textoHTML+=(resultado2)
                resultado3 = Math.ceil(resultado3)
                textoHTML+=(resultado3 + "<br/>")


                teste4 = coeficiente1.replace("x", limite_inf)
                teste5 = coeficiente2.replace("x", limite_inf)
                teste6 = coeficiente3.replace("x", limite_inf)
                teste4 = parseFloat(teste4[0] - teste4[3])
                resultado4 = teste4 * A
                teste5 = parseFloat(teste5[0] - teste5[4])
                resultado5 = teste5 * B
                if(resultado5[0] != '-'){
                    resultado5 = "+" + resultado5
                }
                else{
                    resultado5 = resultado5
                }
                teste6 = parseFloat(teste6[0] - teste6[4])
                resultado6 = teste6 * C
                textoHTML+=(resultado4)
                textoHTML+=(resultado5)
                textoHTML+=(resultado6 + "<br/>")
                total1 = parseInt(resultado3) + parseInt(resultado2) + parseInt(resultado) 
                textoHTML+=(total1)
                total2 = Math.floor((resultado6))
                total2 = parseInt(total2) + parseInt(resultado5) + parseInt(resultado4)
                textoHTML+=(total2+ "<br/>")
                totalFinal = total1 - total2
                textoHTML+=(totalFinal)

            }
        }
    }
    }
    }
    else  { 
        textoHTML+=(soma + "B +" + soma + "C " +   soma2 + "B"+" = " + numerador[0]+ "<br/>")}

}
    else {
    textoHTML+=("C(xˆ2" + multi3  +  ")" + "<br/>")
    C="xˆ2 " + multi3  + "x"
    textoHTML+=( "Axˆ2 "+ soma + "Ax" + multi + "A" + ""+ " + ");
    textoHTML+=( "   Bxˆ2 "+ soma2 + "Bx" + multi2 + "B" + ""+ " + ");
    textoHTML+=( "Cxˆ2 " + multi3 + "C" + " = ");
    textoHTML+=( numerador+ "<br/>");
    textoHTML+=("(A + B + C)xˆ2 + " + ("(" + soma + "A" + soma2 + "B" + ")x + ") + ("(" + multi + "A" + multi2 + "B"+  multi3 + "C"+  ")") + "<br/>")


    textoHTML+=("A" + " + " +"B + " + "C" +" = " + 0 + "<br/>")
    textoHTML+=( soma + "A" + soma2 + "B" + " = "+ numerador[0] +"<br/>")
    textoHTML+=(multi + "A" + multi2 + "B"+  multi3 + "C"+ " = 0 "+"<br/>")
    textoHTML+=("{" + "A" + "= "+ " - " +"B" + " - C" + "<br/>")
    textoHTML+=("{" + soma + "(-B" + "-C)" + soma2 + "B" + " = "+ numerador[0]+ "<br/>")
    textoHTML+=("{" + soma + "(-B" + "-C)" + soma2 + "B" + " = "+ numerador[0]+ "<br/>")
    if(soma[0] == "-"){
        textoHTML+=( -soma + "B +" + -soma + "C " +  soma2 + "B"+" = " + numerador[0]+ "<br/>")
        resp = parseFloat(-soma) + parseFloat(soma2)
        textoHTML+=(resp + "B +" + -soma + "C"+" = " + numerador[0]+ "<br/>")
        textoHTML+=(multi + "A" + multi2 + "B"+  multi3 + "C"+ " = 0 "+"<br/>")
        textoHTML+=(multi + "(-B -C )" + multi2 + "B"+  multi3 + "C"+ " = 0 "+"<br/>")
        if(multi[0] == "+"){
        textoHTML+=(-multi + "B " + -multi + "C" + multi2 + "B"+  multi3 + "C"+ " = 0 "+"<br/>")
        resu = parseInt(-multi) + parseInt(multi2)
        resu2 = parseInt(-multi) + parseInt(multi3)
        textoHTML+=(resu + "B " + resu2 + "C" + " = 0 "+"<br/>")
        textoHTML+=("{" + resp + "B +" + -soma + "C"+" = " + numerador[0]+ "<br/>")
        textoHTML+=("{" + resu + "B " + resu2 + "C" + " = 0 "+"<br/>")
        textoHTML+=("{" + resp + "B" +  "= " + numerador[0] + soma + "C"+ "<br/>")
        textoHTML+=(soma + "C" +  "= " + (numerador[0] + " -" + resp + "B")+ "<br/>")
        textoHTML+=("C" +  "= " + (numerador[0]/soma)+ "<br/>")
      
    }
    }
    else  { 
        textoHTML+=(soma + "B +" + soma + "C " +   soma2 + "B"+" = " + numerador[0]+ "<br/>")}
    }
        



    }
// se numerador nao tem x
    else{
        textoHTML+=("A" +"("+ coeficiente2 + ")"+ " + ");
    textoHTML+=("B" +"("+ coeficiente1 + ")"+ " = ");
    textoHTML+=( numerador+ "<br/>");

    textoHTML+=( "A" + coeficiente2[0] + coeficiente2[2] + coeficiente2[4] + "A" + ""+ " + ");
    textoHTML+=("B" + coeficiente1[0] + coeficiente1[1] + coeficiente1[3] + "B" + "= " );
    textoHTML+=( numerador+ "<br/>");
    textoHTML+=("A" + coeficiente2[0]+ " + " +"B" + coeficiente1[0] + " = " + 0+ "<br/>")
    textoHTML+=(coeficiente2[2] + coeficiente2[4] + "A " + coeficiente1[1] + coeficiente1[3] + "B " + " = " + numerador+ "<br/>")
    textoHTML+=("{" + "A" + " + " +"B" + " = " + 0+ "<br/>")
    textoHTML+=("{" + coeficiente2[2] + coeficiente2[4] + "A " + coeficiente1[1] + coeficiente1[3] + "B " + " = " + numerador+ "<br/>")
    textoHTML+=("{" + "A" + "= " + 0+ " - " +"B" + "<br/>")
    textoHTML+=("{" + coeficiente2[2] + coeficiente2[4] + "("+ 0+ " - " +"B" + ")" + coeficiente1[1] + coeficiente1[3] + "B " + " = " + numerador+ "<br/>")
    textoHTML+=(coeficiente2[2] + (coeficiente2[4]* 0))
    if(coeficiente2[2] == "-"){
    //textoHTML+=("+" + coeficiente2[4] + "B" + coeficiente1[1] + coeficiente1[3] + "B " + " = " + numerador+ "<br/>")
    if(coeficiente1[1] == "+")
    resp = parseFloat(coeficiente2[4]) + parseFloat(coeficiente1[3])
    else
    resp = parseFloat(coeficiente2[4]) + parseFloat(-coeficiente1[3])
    textoHTML+=(resp+ "B")
    textoHTML+=(coeficiente2[2] + (coeficiente2[4]* 0)+ "="+ numerador+ "<br/>")
    textoHTML+=(numerador + " = "  + resp + "B "+ "<br/>")
    textoHTML+=( "B= " + (numerador)/resp+ "<br/>")
    // OLHAR ESSA LINHA DPS PQ TA DIVIDINDO
    B =  (coeficiente2[2] + (coeficiente2[4]* 0))/-resp
    textoHTML+=("{" + "A" + "= " + 0+ " - " +"B" + "<br/>")
    textoHTML+=("{" + "A" + "= "+  -B + "<br/>")
    A =parseFloat(-B)
    textoHTML+=("A= "+ A+ "<br/>")
    textoHTML+=("∫" + " " + A + "/" + "("+ coeficiente1 + ") + ");
    textoHTML+=("∫" + " " + B + "/" + "("+ coeficiente2 + ")"+ "<br/>");
    textoHTML+=(A +"∫" + " "+ "1/" + "("+ coeficiente1+ ")"+ " + ");
    textoHTML+=(B +"∫" + " "+ "1/" + "("+ coeficiente2 + ")"+ "<br/>");
    textoHTML+=(A +"ln" + " " + "|"+ coeficiente1 + "|" + " + ");
    textoHTML+=(B +"ln" + " " + "|"+ coeficiente2 + "|");
}
    else{
    textoHTML+=(" -" + coeficiente2[4] + "B" + coeficiente1[1] + coeficiente1[3] + "B " + " = " + "0"+ "<br/>")
    if(coeficiente1[1] == "+")
    resp = parseFloat(-coeficiente2[4]) + parseFloat(coeficiente1[3])
    else
    resp = parseFloat(-coeficiente2[4]) + parseFloat(-coeficiente1[3])
    textoHTML+=( resp + "B ")
    textoHTML+=(coeficiente2[2] + (coeficiente2[4]* numerador[0])+ "<br/>")
    textoHTML+=(coeficiente2[2] + (coeficiente2[4]* numerador[0]) + " = "  + -resp + "B "+ "<br/>")
    textoHTML+=( "B= " + (coeficiente2[2] + (coeficiente2[4]* numerador[0]))/-resp+ "<br/>")
    
    B =  (coeficiente2[2] + (coeficiente2[4]* numerador[0]))/-resp
    textoHTML+=("{" + "A" + "= " + numerador[0]+ " - " +"B" + "<br/>")
    textoHTML+=("{" + "A" + "= " + numerador[0] +  -B + "<br/>")
    A = parseFloat(numerador[0]) + parseFloat(-B)
    textoHTML+=("A= "+ A+ "<br/>")
    textoHTML+=("∫" + " " + A + "/" + "("+ coeficiente1 + ") + ");
    textoHTML+=("∫" + " " + B + "/" + "("+ coeficiente2 + ")"+ "<br/>");
    textoHTML+=(A +"∫" + " "+ "1/" + "("+ coeficiente1+ ")"+ " + ");
    textoHTML+=(B +"∫" + " "+ "1/" + "("+ coeficiente2 + ")"+ "<br/>");
    textoHTML+=(A +"ln" + " " + "|"+ coeficiente1 + "|" + " + ");
    textoHTML+=(B +"ln" + " " + "|"+ coeficiente2 + "|");
    }
    }
}