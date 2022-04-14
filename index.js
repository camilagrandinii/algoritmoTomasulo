function comecar(){
    getNumerador();
    getDivisor();
}

function getNumerador(){
    var denominador = "2x";
    
    return denominador;
    
}
function contParenteses(divisor){
    var cont=0;
    for(i = 0; i < divisor.length; i++){
        if(divisor.charAt(i) == "(") 
        cont++;
    }
    alert(cont);
    return cont;
}
function realizaIntegral2(divisor, numerador){
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
}


function separarDivisor2(divisor){
    divisor = divisor.split(")(");
    alert(divisor)
    divisor = divisor[0].replaceAll('(', '')
    divisor = divisor.replaceAll(")", '')
    
}

function getDivisor(){
    var divisor = "(x + 1)(x + 2)";
    divisor = divisor.replace(' ', '');
    
    if ( divisor[0] != '(' ) {
        divisor = separarDivisor(divisor);
    }
    else if(contParenteses(divisor) == 2){
        divisor = separarDivisor2(divisor); 
        alert(divisor)
        realizaIntegral2(divisor, getNumerador());
    }
    
    return divisor;
}

function separarDivisor(divisor, numerador) {
    var sinais = getSinais(divisor);

    var valores = getValores(divisor, sinais);

    var delta = (valores.b * valores.b) - 4 * valores.a * valores.c;

    document.write("Valor de Delta => " + delta + "<br/><br/>");

    if(delta < 0){
        document.write("Para Delta negativo, não existem raízes reais. <br/>");

    } else {
        
        document.write("Para Delta positivo, raízes diferentes: <br/>");  
        

        coeficiente1 = (-valores.b + Math.sqrt(delta)) / (2 * valores.a);
        coeficiente2 = (-valores.b - Math.sqrt(delta)) / (2 * valores.a);
        
        
        document.write("x' = " + coeficiente1 + "<br/>");
        document.write("x'' = " + coeficiente2 + "<br/>");
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
    }
   

    function getSinais(divisor) {
        var sinal1 = '';
        var sinal2 = '';
        
        /* colocar a opção de por 3 sinais (o do a tbm) */
        for(i=0; i < divisor.length; i++){
            if(sinal1 == '' && (divisor[i] == '+' || divisor[i] == '-')){
                sinal1 = divisor[i];
    
            }else if(divisor[i] == '+' || divisor[i] == '-'){
                sinal2 = divisor[i];
            }
        }
    
        var sinais = {sinal1: sinal1, sinal2: sinal2}
        
        return sinais;
    
    }

function getValores(divisor, sinais){
    var valores
    var a
    var b
    var c


    if (sinais.sinal1 == sinais.sinal2){
        valores = divisor.split(sinais.sinal1)
        a = valores[0]
        b = valores[1].replaceAll(' ', '')
        c = valores[2].replaceAll(' ', '')
    } else {
        valores = divisor.split(sinais.sinal1)
        console.log(valores)
        a = valores[0]
        valores = valores[1].split(sinais.sinal2)
        b = valores[0].replaceAll(' ', '')
        c = valores[1].replaceAll(' ', '')
    }

    

    b = sinais.sinal1 + b;
    c = sinais.sinal2 + c;

    valores = {a:a, b:b, c:c}

    valores = separaValores(valores);
    
    
    return valores;
}

function separaValores(valores) {
    /* a */
    if(valores.a[0] == 'x' ) {
        valores.a = 1;
    } else {
        valores.a = valores.a.split('x')[0];
        if(valores.a[0] == '-'){
            valores.a = valores.a * -1;
        }
        
    }

    /* b */
    if(valores.b[1] == 'x' ) {
        valores.b = 1;
    } else {
        valores.b = valores.b.split('x')[0];
        if(valores.b[0] == '-'){
            valores.b = valores.b * -1;
        }
        else if(valores.b[0] == '+'){
            valores.b = valores.b * -1;
        }
    }

    /* c */
    if(valores.c[0] == '-'){
        valores.c = valores.c * 1;
    }
    else if(valores.c[0] == '+'){
        valores.c = valores.c * 1;
    }
   

    return valores;
}


