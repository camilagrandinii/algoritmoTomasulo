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
    return cont;
}
function realizaIntegral2(divisor, numerador){
    coeficiente1 = divisor[0];
    coeficiente2 = divisor[1];
    document.write("∫" + " " + numerador+ "/" + "("+ coeficiente1 + ")");
    document.write("("+ coeficiente2 + ")"+ "<br/>");

    // tentativa fracoes parciais 
    if(numerador[1]== "x"){
    document.write("A" +"("+ coeficiente2 + ")"+ " + ");
    document.write("B" +"("+ coeficiente1 + ")"+ " = ");
    document.write( numerador+ "<br/>");

    /*
    qnt de x
    alert(coeficiente1[0])
    sinal
    alert(coeficiente1[1])
    valor acompannhado de x
    alert(coeficiente1[3])
    qnt de x
    alert(coeficiente2[0])
    sinal
    alert(coeficiente2[2])
    valor acompannhado de x
    alert(coeficiente2[4])
    */
    document.write( "A" + coeficiente2[0] + coeficiente2[2] + coeficiente2[4] + "A" + ""+ " + ");
    document.write("B" + coeficiente1[0] + coeficiente1[1] + coeficiente1[3] + "B" + "= " );
    document.write( numerador+ "<br/>");
    document.write("A" + coeficiente2[0]+ " + " +"B" + coeficiente1[0] + " = " + numerador+ "<br/>")
    document.write(coeficiente2[2] + coeficiente2[4] + "A " + coeficiente1[1] + coeficiente1[3] + "B " + " = " + "0"+ "<br/>")
    document.write("{" + "A" + " + " +"B" + " = " + numerador[0]+ "<br/>")
    document.write("{" + coeficiente2[2] + coeficiente2[4] + "A " + coeficiente1[1] + coeficiente1[3] + "B " + " = " + "0"+ "<br/>")
    document.write("{" + "A" + "= " + numerador[0]+ " - " +"B" + "<br/>")
    document.write("{" + coeficiente2[2] + coeficiente2[4] + "("+ numerador[0]+ " - " +"B" + ")" + coeficiente1[1] + coeficiente1[3] + "B " + " = " + "0"+ "<br/>")
    document.write(coeficiente2[2] + (coeficiente2[4]* numerador[0]))
    if(coeficiente2[2] == "-"){
    document.write("+" + coeficiente2[4] + "B" + coeficiente1[1] + coeficiente1[3] + "B " + " = " + "0"+ "<br/>")
    if(coeficiente1[1] == "+")
    resp = parseInt(coeficiente2[4]) + parseInt(coeficiente1[3])
    else
    resp = parseInt(coeficiente2[4]) + parseInt(-coeficiente1[3])
    document.write(resp+ "B")
    document.write(coeficiente2[2] + (coeficiente2[4]* numerador[0])+ "=0"+ "<br/>")
    document.write(coeficiente2[2] + (coeficiente2[4]* numerador[0]) + " = "  + -resp + "B "+ "<br/>")
    document.write( "B= " + (coeficiente2[2] + (coeficiente2[4]* numerador[0]))/-resp+ "<br/>")
    B =  (coeficiente2[2] + (coeficiente2[4]* numerador[0]))/-resp
    document.write("{" + "A" + "= " + numerador[0]+ " - " +"B" + "<br/>")
    document.write("{" + "A" + "= " + numerador[0] +  -B + "<br/>")
    A = parseInt(numerador[0]) + parseInt(-B)
    document.write("A= "+ A+ "<br/>")
    document.write("∫" + " " + A + "/" + "("+ coeficiente1 + ") + ");
    document.write("∫" + " " + B + "/" + "("+ coeficiente2 + ")"+ "<br/>");
    document.write(A +"∫" + " "+ "1/" + "("+ coeficiente1+ ")"+ " + ");
    document.write(B +"∫" + " "+ "1/" + "("+ coeficiente2 + ")"+ "<br/>");
    document.write(A +"ln" + " " + "|"+ coeficiente1 + "|" + " + ");
    document.write(B +"ln" + " " + "|"+ coeficiente2 + "|");
}
    else{
    document.write(" -" + coeficiente2[4] + "B" + coeficiente1[1] + coeficiente1[3] + "B " + " = " + "0"+ "<br/>")
    if(coeficiente1[1] == "+")
    resp = parseFloat(-coeficiente2[4]) + parseFloat(coeficiente1[3])
    else
    resp = parseFloat(-coeficiente2[4]) + parseFloat(-coeficiente1[3])
    document.write( resp + "B ")
    document.write(coeficiente2[2] + (coeficiente2[4]* numerador[0])+ "<br/>")
    document.write(coeficiente2[2] + (coeficiente2[4]* numerador[0]) + " = "  + -resp + "B "+ "<br/>")
    document.write( "B= " + (coeficiente2[2] + (coeficiente2[4]* numerador[0]))/-resp+ "<br/>")
    B =  (coeficiente2[2] + (coeficiente2[4]* numerador[0]))/-resp
    document.write("{" + "A" + "= " + numerador[0]+ " - " +"B" + "<br/>")
    document.write("{" + "A" + "= " + numerador[0] +  -B + "<br/>")
    A = parseFloat(numerador[0]) + parseFloat(-B)
    document.write("A= "+ A+ "<br/>")
    document.write("∫" + " " + A + "/" + "("+ coeficiente1 + ") + ");
    document.write("∫" + " " + B + "/" + "("+ coeficiente2 + ")"+ "<br/>");
    document.write(A +"∫" + " "+ "1/" + "("+ coeficiente1+ ")"+ " + ");
    document.write(B +"∫" + " "+ "1/" + "("+ coeficiente2 + ")"+ "<br/>");
    document.write(A +"ln" + " " + "|"+ coeficiente1 + "|" + " + ");
    document.write(B +"ln" + " " + "|"+ coeficiente2 + "|");
    }
}
// se numerador nao tem x
    else{
        document.write("A" +"("+ coeficiente2 + ")"+ " + ");
    document.write("B" +"("+ coeficiente1 + ")"+ " = ");
    document.write( numerador+ "<br/>");

    document.write( "A" + coeficiente2[0] + coeficiente2[2] + coeficiente2[4] + "A" + ""+ " + ");
    document.write("B" + coeficiente1[0] + coeficiente1[1] + coeficiente1[3] + "B" + "= " );
    document.write( numerador+ "<br/>");
    document.write("A" + coeficiente2[0]+ " + " +"B" + coeficiente1[0] + " = " + 0+ "<br/>")
    document.write(coeficiente2[2] + coeficiente2[4] + "A " + coeficiente1[1] + coeficiente1[3] + "B " + " = " + numerador+ "<br/>")
    document.write("{" + "A" + " + " +"B" + " = " + 0+ "<br/>")
    document.write("{" + coeficiente2[2] + coeficiente2[4] + "A " + coeficiente1[1] + coeficiente1[3] + "B " + " = " + numerador+ "<br/>")
    document.write("{" + "A" + "= " + 0+ " - " +"B" + "<br/>")
    document.write("{" + coeficiente2[2] + coeficiente2[4] + "("+ 0+ " - " +"B" + ")" + coeficiente1[1] + coeficiente1[3] + "B " + " = " + numerador+ "<br/>")
    document.write(coeficiente2[2] + (coeficiente2[4]* 0))
    if(coeficiente2[2] == "-"){
    document.write("+" + coeficiente2[4] + "B" + coeficiente1[1] + coeficiente1[3] + "B " + " = " + numerador+ "<br/>")
    if(coeficiente1[1] == "+")
    resp = parseFloat(coeficiente2[4]) + parseFloat(coeficiente1[3])
    else
    resp = parseFloat(coeficiente2[4]) + parseFloat(-coeficiente1[3])
    document.write(resp+ "B")
    document.write(coeficiente2[2] + (coeficiente2[4]* 0)+ "="+ numerador+ "<br/>")
    document.write(numerador + " = "  + resp + "B "+ "<br/>")
    document.write( "B= " + (numerador)/resp+ "<br/>")
    // OLHAR ESSA LINHA DPS PQ TA DIVIDINDO
    B =  (coeficiente2[2] + (coeficiente2[4]* 0))/-resp
    document.write("{" + "A" + "= " + 0+ " - " +"B" + "<br/>")
    document.write("{" + "A" + "= "+  -B + "<br/>")
    A =parseFloat(-B)
    document.write("A= "+ A+ "<br/>")
    document.write("∫" + " " + A + "/" + "("+ coeficiente1 + ") + ");
    document.write("∫" + " " + B + "/" + "("+ coeficiente2 + ")"+ "<br/>");
    document.write(A +"∫" + " "+ "1/" + "("+ coeficiente1+ ")"+ " + ");
    document.write(B +"∫" + " "+ "1/" + "("+ coeficiente2 + ")"+ "<br/>");
    document.write(A +"ln" + " " + "|"+ coeficiente1 + "|" + " + ");
    document.write(B +"ln" + " " + "|"+ coeficiente2 + "|");
}
    else{
    document.write(" -" + coeficiente2[4] + "B" + coeficiente1[1] + coeficiente1[3] + "B " + " = " + "0"+ "<br/>")
    if(coeficiente1[1] == "+")
    resp = parseFloat(-coeficiente2[4]) + parseFloat(coeficiente1[3])
    else
    resp = parseFloat(-coeficiente2[4]) + parseFloat(-coeficiente1[3])
    document.write( resp + "B ")
    document.write(coeficiente2[2] + (coeficiente2[4]* numerador[0])+ "<br/>")
    document.write(coeficiente2[2] + (coeficiente2[4]* numerador[0]) + " = "  + -resp + "B "+ "<br/>")
    document.write( "B= " + (coeficiente2[2] + (coeficiente2[4]* numerador[0]))/-resp+ "<br/>")
    
    B =  (coeficiente2[2] + (coeficiente2[4]* numerador[0]))/-resp
    document.write("{" + "A" + "= " + numerador[0]+ " - " +"B" + "<br/>")
    document.write("{" + "A" + "= " + numerador[0] +  -B + "<br/>")
    A = parseFloat(numerador[0]) + parseFloat(-B)
    document.write("A= "+ A+ "<br/>")
    document.write("∫" + " " + A + "/" + "("+ coeficiente1 + ") + ");
    document.write("∫" + " " + B + "/" + "("+ coeficiente2 + ")"+ "<br/>");
    document.write(A +"∫" + " "+ "1/" + "("+ coeficiente1+ ")"+ " + ");
    document.write(B +"∫" + " "+ "1/" + "("+ coeficiente2 + ")"+ "<br/>");
    document.write(A +"ln" + " " + "|"+ coeficiente1 + "|" + " + ");
    document.write(B +"ln" + " " + "|"+ coeficiente2 + "|");
    }
    }
}


function separarDivisor2(divisor){
    divisor = divisor.split(")(");
    divisor[0] = divisor[0].replaceAll('(', '')
    divisor[1] = divisor[1].replaceAll(")", '')
    return divisor
    
}
function separarDivisor3(divisor){
    divisor = divisor.split(")");
    divisor[0] = divisor[0].replaceAll('(', '')
    divisor[1] = divisor[1].replaceAll("(", '')
    divisor[2] = divisor[2].replaceAll("(", '')
    return divisor;
    
}
function realizaIntegral3(divisor, numerador){
    coeficiente1 = divisor[0];
    coeficiente2 = divisor[1];
    coeficiente3 = divisor[2];
    document.write("∫" + " " + numerador+ "/" + "("+ coeficiente1 + ")");
    document.write("("+ coeficiente2 + ")");
    document.write("("+ coeficiente3+ ")"+ "<br/>");

    // tentativa fracoes parciais 
    if(numerador[1]== "x"){
    document.write("A" +"("+ coeficiente3 + ")"+ "("+ coeficiente2 + ")"+ " + ");
    document.write("B" +"("+ coeficiente3 + ")"+ "("+ coeficiente1 + ")"+" + ")
    document.write("C" +"("+ coeficiente1 + ")" +"("+ coeficiente2 + ")"+ " = ");;
    document.write( numerador+ "<br/>");

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
    document.write("A(xˆ2 " + multi  + coeficiente3[2] + coeficiente3[4] + "x "+ coeficiente2[2] + coeficiente2[4] + "x)" + "+ ")
    if(coeficiente3[2] != coeficiente1[1]){
        multi2 = parseInt(coeficiente3[4]) * parseInt(coeficiente1[3])
        multi2 = - multi2}
        else {
            multi2 = parseInt(coeficiente3[4]) * parseInt(coeficiente1[3])
            multi2 = + multi2
        }
    document.write("B(xˆ2 " + multi2  + coeficiente3[2] + coeficiente3[4] + "x "+ coeficiente1[1] + coeficiente1[3] + "x)" + "+ ")
    if(coeficiente1[1] != coeficiente2[2]){
        multi3 = parseInt(coeficiente2[4]) * parseInt(coeficiente1[3])
        multi3 = - multi3}
        else {
            multi3 = parseInt(coeficiente2[4]) * parseInt(coeficiente1[3])
            multi3 = + multi3
        }
    document.write("C(xˆ2 " + multi3  + coeficiente1[1] + coeficiente1[3] + "x "+ coeficiente2[2] + coeficiente2[4] + "x)" + "<br/>")
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
    document.write("A(xˆ2 " + multi+ soma + "x )" + "<br/>")
    A="xˆ2 " + multi  + soma + "x" }
    else {
    document.write("A(xˆ2" + multi  +  ")" + "<br/>")
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
        soma2 = coeficiente3[2] + (parseInt(coeficiente3[4]) + parseInt(coeficiente2[4]))
    }
    if(soma2!= 0){


    document.write("B(xˆ2 " + multi2  + soma2 + "x )" + "<br/>")
    B="xˆ2 " + multi2  + soma2 + "x"
}
    else {
    document.write("B(xˆ2" + multi2  +  ")" + "<br/>")
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
        soma3 = coeficiente3[2] + (parseInt(coeficiente3[4]) + parseInt(coeficiente2[4]))
    }
    if(soma3!= 0){
    document.write("C(xˆ2 " + multi3  + soma3 + "x )" + "<br/>")
    C="xˆ2 " + multi3  + soma3 + "x"
    document.write( "Axˆ2 "+ soma + "Ax" + multi + "A" + ""+ " + ");
    document.write( "   Bxˆ2 "+ soma2 + "Bx" + multi2 + "B" + ""+ " + ");
    document.write( "Cxˆ2 "+ soma3 + "Cx" + multi3 + "B" + "");
    document.write( numerador+ "<br/>");

}
    else {
    document.write("C(xˆ2" + multi3  +  ")" + "<br/>")
    C="xˆ2 " + multi3  + "x"
    document.write( "Axˆ2 "+ soma + "Ax" + multi + "A" + ""+ " + ");
    document.write( "   Bxˆ2 "+ soma2 + "Bx" + multi2 + "B" + ""+ " + ");
    document.write( "Cxˆ2 " + multi3 + "C" + " = ");
    document.write( numerador+ "<br/>");
    document.write("(A + B + C)xˆ2 + " + ("(" + soma + "A" + soma2 + "B" + ")x + ") + ("(" + multi + "A" + multi2 + "B"+  multi3 + "C"+  ")") + "<br/>")
}

    document.write("A" + " + " +"B + " + "C" +" = " + 0 + "<br/>")
    document.write( soma + "A" + soma2 + "B" + " = "+ numerador[0] +"<br/>")
    document.write(multi + "A" + multi2 + "B"+  multi3 + "C"+ " = 0 "+"<br/>")
    document.write("{" + "A" + "= "+ " - " +"B" + " - C" + "<br/>")
    document.write("{" + soma + "(-B" + "-C)" + soma2 + "B" + " = "+ numerador[0]+ "<br/>")
    document.write("{" + soma + "(-B" + "-C)" + soma2 + "B" + " = "+ numerador[0]+ "<br/>")
    if(soma[0] == "-"){
        document.write( -soma + "B +" + -soma + "C " +  soma2 + "B"+" = " + numerador[0]+ "<br/>")
        resp = parseFloat(-soma) + parseFloat(soma2)
        document.write(resp + "B +" + -soma + "C"+" = " + numerador[0]+ "<br/>")
        document.write(multi + "A" + multi2 + "B"+  multi3 + "C"+ " = 0 "+"<br/>")
        document.write(multi + "(-B -C )" + multi2 + "B"+  multi3 + "C"+ " = 0 "+"<br/>")
        if(multi[0] == "+"){
        document.write(-multi + "B " + -multi + "C" + multi2 + "B"+  multi3 + "C"+ " = 0 "+"<br/>")
        resu = parseInt(-multi) + parseInt(multi2)
        resu2 = parseInt(-multi) + parseInt(multi3)
        document.write(resu + "B " + resu2 + "C" + " = 0 "+"<br/>")
        document.write("{" + resp + "B +" + -soma + "C"+" = " + numerador[0]+ "<br/>")
        document.write("{" + resu + "B " + resu2 + "C" + " = 0 "+"<br/>")
        document.write("{" + resp + "B" +  "= " + numerador[0] + soma + "C"+ "<br/>")
        document.write(resp + "B" +  "= " + (numerador[0] + soma + "C")+ "<br/>")
    }
    }
    else  { 
        document.write(soma + "B +" + soma + "C " +   soma2 + "B"+" = " + numerador[0]+ "<br/>")}



    document.write(coeficiente2[2] + (coeficiente2[4]* numerador[0])+ "=0"+ "<br/>")
    document.write(coeficiente2[2] + (coeficiente2[4]* numerador[0]) + " = "  + -resp + "B "+ "<br/>")
    document.write( "B= " + (coeficiente2[2] + (coeficiente2[4]* numerador[0]))/-resp+ "<br/>")
    B =  (coeficiente2[2] + (coeficiente2[4]* numerador[0]))/-resp
    document.write("{" + "A" + "= " + numerador[0]+ " - " +"B" + "<br/>")
    document.write("{" + "A" + "= " + numerador[0] +  -B + "<br/>")
    A = parseInt(numerador[0]) + parseInt(-B)
    document.write("A= "+ A+ "<br/>")
    document.write("∫" + " " + A + "/" + "("+ coeficiente1 + ") + ");
    document.write("∫" + " " + B + "/" + "("+ coeficiente2 + ")"+ "<br/>");
    document.write(A +"∫" + " "+ "1/" + "("+ coeficiente1+ ")"+ " + ");
    document.write(B +"∫" + " "+ "1/" + "("+ coeficiente2 + ")"+ "<br/>");
    document.write(A +"ln" + " " + "|"+ coeficiente1 + "|" + " + ");
    document.write(B +"ln" + " " + "|"+ coeficiente2 + "|");
    }
// se numerador nao tem x
    else{
        document.write("A" +"("+ coeficiente2 + ")"+ " + ");
    document.write("B" +"("+ coeficiente1 + ")"+ " = ");
    document.write( numerador+ "<br/>");

    document.write( "A" + coeficiente2[0] + coeficiente2[2] + coeficiente2[4] + "A" + ""+ " + ");
    document.write("B" + coeficiente1[0] + coeficiente1[1] + coeficiente1[3] + "B" + "= " );
    document.write( numerador+ "<br/>");
    document.write("A" + coeficiente2[0]+ " + " +"B" + coeficiente1[0] + " = " + 0+ "<br/>")
    document.write(coeficiente2[2] + coeficiente2[4] + "A " + coeficiente1[1] + coeficiente1[3] + "B " + " = " + numerador+ "<br/>")
    document.write("{" + "A" + " + " +"B" + " = " + 0+ "<br/>")
    document.write("{" + coeficiente2[2] + coeficiente2[4] + "A " + coeficiente1[1] + coeficiente1[3] + "B " + " = " + numerador+ "<br/>")
    document.write("{" + "A" + "= " + 0+ " - " +"B" + "<br/>")
    document.write("{" + coeficiente2[2] + coeficiente2[4] + "("+ 0+ " - " +"B" + ")" + coeficiente1[1] + coeficiente1[3] + "B " + " = " + numerador+ "<br/>")
    document.write(coeficiente2[2] + (coeficiente2[4]* 0))
    if(coeficiente2[2] == "-"){
    document.write("+" + coeficiente2[4] + "B" + coeficiente1[1] + coeficiente1[3] + "B " + " = " + numerador+ "<br/>")
    if(coeficiente1[1] == "+")
    resp = parseFloat(coeficiente2[4]) + parseFloat(coeficiente1[3])
    else
    resp = parseFloat(coeficiente2[4]) + parseFloat(-coeficiente1[3])
    document.write(resp+ "B")
    document.write(coeficiente2[2] + (coeficiente2[4]* 0)+ "="+ numerador+ "<br/>")
    document.write(numerador + " = "  + resp + "B "+ "<br/>")
    document.write( "B= " + (numerador)/resp+ "<br/>")
    // OLHAR ESSA LINHA DPS PQ TA DIVIDINDO
    B =  (coeficiente2[2] + (coeficiente2[4]* 0))/-resp
    document.write("{" + "A" + "= " + 0+ " - " +"B" + "<br/>")
    document.write("{" + "A" + "= "+  -B + "<br/>")
    A =parseFloat(-B)
    document.write("A= "+ A+ "<br/>")
    document.write("∫" + " " + A + "/" + "("+ coeficiente1 + ") + ");
    document.write("∫" + " " + B + "/" + "("+ coeficiente2 + ")"+ "<br/>");
    document.write(A +"∫" + " "+ "1/" + "("+ coeficiente1+ ")"+ " + ");
    document.write(B +"∫" + " "+ "1/" + "("+ coeficiente2 + ")"+ "<br/>");
    document.write(A +"ln" + " " + "|"+ coeficiente1 + "|" + " + ");
    document.write(B +"ln" + " " + "|"+ coeficiente2 + "|");
}
    else{
    document.write(" -" + coeficiente2[4] + "B" + coeficiente1[1] + coeficiente1[3] + "B " + " = " + "0"+ "<br/>")
    if(coeficiente1[1] == "+")
    resp = parseFloat(-coeficiente2[4]) + parseFloat(coeficiente1[3])
    else
    resp = parseFloat(-coeficiente2[4]) + parseFloat(-coeficiente1[3])
    document.write( resp + "B ")
    document.write(coeficiente2[2] + (coeficiente2[4]* numerador[0])+ "<br/>")
    document.write(coeficiente2[2] + (coeficiente2[4]* numerador[0]) + " = "  + -resp + "B "+ "<br/>")
    document.write( "B= " + (coeficiente2[2] + (coeficiente2[4]* numerador[0]))/-resp+ "<br/>")
    
    B =  (coeficiente2[2] + (coeficiente2[4]* numerador[0]))/-resp
    document.write("{" + "A" + "= " + numerador[0]+ " - " +"B" + "<br/>")
    document.write("{" + "A" + "= " + numerador[0] +  -B + "<br/>")
    A = parseFloat(numerador[0]) + parseFloat(-B)
    document.write("A= "+ A+ "<br/>")
    document.write("∫" + " " + A + "/" + "("+ coeficiente1 + ") + ");
    document.write("∫" + " " + B + "/" + "("+ coeficiente2 + ")"+ "<br/>");
    document.write(A +"∫" + " "+ "1/" + "("+ coeficiente1+ ")"+ " + ");
    document.write(B +"∫" + " "+ "1/" + "("+ coeficiente2 + ")"+ "<br/>");
    document.write(A +"ln" + " " + "|"+ coeficiente1 + "|" + " + ");
    document.write(B +"ln" + " " + "|"+ coeficiente2 + "|");
    }
    }
}

function getDivisor(){
    var divisor = "(x + 1)(x + 2)";
    divisor = divisor.replace(' ', '');
    
    if ( divisor[0] != '(' ) {
        divisor = separarDivisor(divisor);
    }
    else if(contParenteses(divisor) == 2){
        divisor = separarDivisor2(divisor); 
        realizaIntegral2(divisor, getNumerador());
    }
    else if(contParenteses(divisor) == 3){
        divisor = separarDivisor3(divisor); 
        realizaIntegral3(divisor, getNumerador());
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


// VALORES COM , NN ROLA, TRES PARENTESES, DPS DA DECOMPOR