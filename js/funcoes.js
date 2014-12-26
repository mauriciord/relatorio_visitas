function IniciarData() {

    var data = document.getElementById("data");

    data.value = RetornarDataAtual();
}

function RetornarDataAtual() {

    hoje = new Date();
    dia = hoje.getDate();
    mes = hoje.getMonth() + 1; // comeca em zero
    ano = hoje.getFullYear();
    hora = hoje.getHours();
    minutos = hoje.getMinutes();

    if (dia < 10)
        dia = "0" + dia;

    if (mes < 10)
        mes = "0" + mes;

    if (ano < 2000)
        ano = "19" + ano;

    return dia + "/" + mes + "/" + ano + " " + hora + ":" + minutos;
}

function FormatarData(campo, evento) {

	if (!handleEnter(campo, evento))
		return;

    var valorCampo = "";
    var digitosValidos = "0123456789";
    var teclaDigitada = String.fromCharCode(evento.keyCode);

    if (digitosValidos.indexOf(teclaDigitada) < 0)
        return false;

    valorCampo = campo.value;
    if (campo.value.length >= 5)
        campo.value = valorCampo.substring(0, 5) + "/" + valorCampo.substring(6);
    else if (campo.value.length >= 2)
        campo.value = valorCampo.substring(0, 2) + "/" + valorCampo.substring(3);
}

function VerificarNumero(valor) {

    var digitosValidos = "0123456789";

    if (digitosValidos.indexOf(valor) < 0)
        return false;

    return true;
}

function FormatarCampo(campo, mascara, evento) {
    /* mascara deve ser:
        # para qualquer caracter;
        9 para numericos;
        X para texto; */

    if (!handleEnter(campo, evento))
        return;

    var i = campo.value.length;
    if (i >= mascara.length)
        return false;

    var texto = mascara.substring(i);
    i = 0;
    var digitoMascara = texto.substring(i, i + 1);
    while (digitoMascara != '#' && digitoMascara != 'X' && digitoMascara != '9' && i < texto.length) {
        campo.value += digitoMascara;
        i++;
        digitoMascara = texto.substring(i, i + 1);
    }

    if (VerificarNumero(String.fromCharCode(evento.keyCode))) {
        if (digitoMascara == 'X')
            return false;
    }
    else {
        if (digitoMascara == '9')
            return false;
    }
}

function FormatarValor(campo, separadorMilhar, separadorDecimal, evento, tamanhoMax) {

    if (!handleEnter(campo, evento))
        return;

    if (campo.readOnly)
        return false;

    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789';
    var aux = aux2 = '';
    var whichCode = (window.Event) ? evento.which : evento.keyCode;

    if (whichCode == 13) 
        return true;
    
    key = String.fromCharCode(whichCode);  // Valor para o código da Chave
    if (strCheck.indexOf(key) == -1) 
        return false;  // Chave inválida

    len = campo.value.length;
    if (len >= tamanhoMax)
        return false;

    for (i = 0; i < len; i++)
        if ((campo.value.charAt(i) != '0') && (campo.value.charAt(i) != separadorDecimal))
            break;
    aux = '';
    for (; i < len; i++)
        if (strCheck.indexOf(campo.value.charAt(i)) != -1) 
            aux += campo.value.charAt(i);
    
    aux += key;
    len = aux.length;
    if (len == 0) 
        campo.value = '';
    if (len == 1) 
        campo.value = '0' + separadorDecimal + '0' + aux;
    if (len == 2) 
        campo.value = '0' + separadorDecimal + aux;
    if (len > 2) {
        aux2 = '';
        for (j = 0, i = len - 3; i >= 0; i--) {
            if (j == 3) {
                aux2 += separadorMilhar;
                j = 0;
            }
            aux2 += aux.charAt(i);
            j++;
        }
        campo.value = '';
        len2 = aux2.length;
        for (i = len2 - 1; i >= 0; i--)
            campo.value += aux2.charAt(i);
        campo.value += separadorDecimal + aux.substr(len - 2, len);
    }
    return false;
}

function handleEnter (field, event) {

    var code = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (code == 13) {

        if ( !ValidarCampo(field, event) )
            return true;
    
        var i;
        for (i = 0; i < field.form.elements.length; i++)
            if (field == field.form.elements[i])
                break;

        i = (i + 1) % field.form.elements.length;
        field.form.elements[i].focus();
    }
    else
        return true;
}   