function unirMensagens(json, formatarTexto) {
    var mensagem = '';
    var separador = '';
    var quebraLinha = '';

    if (formatarTexto) {
        separador = '*';
    }
    if (json.length > 1) {
        quebraLinha = "<br />";
    }
//    for (i = 0; i < json.length; i++) {
        mensagem += separador + ' ' + json.message + quebraLinha;
//    }
    return mensagem;
}

function setMensagemErroPadrao(idLocal) {

    //Apaga mensagens anteriores
    removerMensagensDeAviso();
    //removeLoader();

    //var url = '<c:url value="/" />';
    //var imageMensagem = url + "images/error_icon4.png";

    cssDivMensagem = "msgError msgBorder";
    $(".msgBorder, .msgError").hide();
    mensagem = "A operação não pode ser realizada!";

    $("#msg" + idLocal + "").removeClass().html('<span style="font: bold 14px Arial,Helvetica,sans-serif; color: #FF0000;">&nbsp; Erro!&nbsp; </span>' + mensagem + '').addClass(cssDivMensagem).fadeIn();

}

function removerMensagensDeAviso() {
    $(".msgBorder, .msgError").fadeOut();
}

function recuperaMensagemEmJson(json, identificadorElemento, exibeConfirmacao) {
    var mensagem = unirMensagens(json, false);
    if (json.category == "success") {
        if (exibeConfirmacao) {
            setMensagemAviso(identificadorElemento, mensagem, "1");
        }
        return "success";
    } else if (json.category == "error") {
        setMensagemAviso(identificadorElemento, mensagem, "0");
        return "error";
    } else {
        setMensagemErroPadrao(identificadorElemento);
        return "error";
    }
}

function setMensagemAviso(idLocal, mensagem, tipo) {
    // Tipo = "0" -> Erro
    // Tipo = "1" -> Sucesso
    // Tipo = "2" -> Captcha

    //Apaga mensagens anteriores

    //var url = '<c:url value="/" />';
    var cssDivMensagem = "";
    //var tipoMensagem = "";

    if (tipo == '1') {
        cssDivMensagem = "msgBorder msgError";
        $(".msgBorder, .msgError").hide();
        $("#msg" + idLocal + "").removeClass().html('<span>&nbsp; Ok!&nbsp; </span>' + mensagem).addClass(cssDivMensagem).show();
    } else if (tipo == '2') {
        cssDivMensagem = "errorMsgCaptcha";
        $(".errorMsgCaptcha").hide();
        $("#msg" + idLocal + "").removeClass().html(mensagem).addClass(cssDivMensagem).show();
    } else {
        cssDivMensagem = "msgError msgBorder";
        $(".msgBorder, .msgError").hide();
        $("#msg" + idLocal + "").removeClass().html('<span>&nbsp; Erro!&nbsp; </span>' + mensagem).addClass(cssDivMensagem).show();
    }
}

function converteBytes(bytes, precision) {
    var kilobyte = 1000;
    var megabyte = kilobyte * 1000;
    var gigabyte = megabyte * 1000;
    var terabyte = gigabyte * 1000;

    if ((bytes >= 0) && (bytes < kilobyte)) {
        return bytes + ' B';
    } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
        return (bytes / kilobyte).toFixed(precision) + ' KB';
    } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
        return (bytes / megabyte).toFixed(precision) + ' MB';
    } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
        return (bytes / gigabyte).toFixed(precision) + ' GB';
    } else if (bytes >= terabyte) {
        return (bytes / terabyte).toFixed(precision) + ' TB';
    } else {
        return bytes + ' B';
    }
}

function geraTabelaDeTempoEstimadoDeDownload(tamanhoArquivo) {

    tamanhoArquivo = parseInt(tamanhoArquivo);
    var speedVar = new Array(4);
    var descricao = new Array(4);

    speedVar[1] = parseInt("7000");
    speedVar[2] = parseInt("32000");
    speedVar[3] = parseInt("96000");
    speedVar[4] = parseInt("187500");

    descricao[1] = "Discado (56K)";
    descricao[2] = "DSL/Cabo (256K)";
    descricao[3] = "DSL/Cabo (768K)";
    descricao[4] = "T1 (1,5M)";

    var tabelaDeTempoEstimadoDeDownload = '<table>' +
            '<tr>' +
            '	<th>Velocidade</th>' +
            '	<th>Tempo Estimado</th>' +
            '</tr>';
    for (a == 1; a <= 4; a++) {
        with (Math) {
            var speed = speedVar[a];
            var TotalTime = (tamanhoArquivo / speed);
            var TotalHours = floor((TotalTime / 3600));
            var TotalHoursMod = (TotalTime % 3600);
            var TotalMin = floor(TotalHoursMod / 60);
            var TotalMinMod = (TotalHoursMod % 60);
            var TotalSec = floor(TotalMinMod);
            tabelaDeTempoEstimadoDeDownload += '<tr><td>' + descricao[a] + ' :</td><td>';
            if (TotalHours != "0") {
                tabelaDeTempoEstimadoDeDownload += TotalHours + ' Horas, ';
            }
            if (TotalMin != "0") {
                tabelaDeTempoEstimadoDeDownload += TotalMin + ' Minutos, ';
            }
            tabelaDeTempoEstimadoDeDownload += TotalSec + ' Segundos</td></tr>';
        }
    }
    tabelaDeTempoEstimadoDeDownload += '</table>';
    return tabelaDeTempoEstimadoDeDownload;
}


function abrirJanelaModal(idJanela) {
    $("#" + idJanela + "").fadeIn(500).animate({opacity: "0.9"}, 200, "swing");
    $("#overlay").fadeIn(50).animate({opacity: "0.5"}, 200, "swing");
}

function fecharJanelaModal() {
    $(".janelaModal, #overlay").fadeOut(500);
}

$(document).ready(function() {

    $(document).keydown(function(e) {
        if (e.which == 27)
        {
            fecharJanelaModal();
        }
    });

    function refreshCaptcha() {
        $("#captchaInput").val('').focus();
        $("#captchaImg").attr('src', 'captcha.jpg?' + Math.floor(Math.random() * 100) + ' " />');
    }

    $(function() {
        $('#captchaImg').live('click', function() {
            refreshCaptcha();
        });
    });

    $("#overlay").live('click', function() {
        fecharJanelaModal();
    });
    //************* captcha para documentos *****************
    $(".salvaDocumento").live('click', function() {
        var numeroID = $(this).attr('id');
        $("#NumeroID").val(numeroID);
        abrirJanelaModal("janelaModalCaptchaDownload");
        
        var captcha = $("#conteudoCaptcha").html();
       
        var mensagemLog = '<div id="mensagemLogAcesso" style="padding: 20px;color: #6F6F6F;    text-align: justify; font:10px Arial,Helvetica,sans-serif">';
        mensagemLog += 'Sr. Usuário,';
        mensagemLog += 'A disponibilização de Documentos atende aos princípios de acesso à informação e da sua divulgação, constantes da Lei Nº 12.527 de 2011 (Lei de Acesso à Informação, art. 6º ';
        mensagemLog += 'ao 8º).';
        mensagemLog += 'Nossos sistemas armazenarão o dia e a hora em que a informação foi consultada pelo usuário. Portanto, o uso indevido das informações acessadas sujeitará o seu autor às sanções cabíveis.';
        mensagemLog += '</div>';
                
        $("#janelaModalCaptchaDownload fieldset").html(captcha);
        $("#janelaModalCaptchaDownload fieldset").append(mensagemLog);
        
        $("#janelaModalCaptchaDownload #captchaInput").focus();
        refreshCaptcha();
    });
    
    $("#captchaForm").live('submit', function() {
        var numeroID = $("#NumeroID").val();
        var captcha = $("#captchaInput").val();
        var codDiretoria = $("#codDiretoria").val();
        if (captcha == "" || captcha == null) {
          $("#msgErroCaptcha").html("Digite os Carateres da Imagem!");
          $("#msgErroCaptcha").show();
           return false;
        }

        var url = '/pePI/servlet/ImagemDocumentoPdfController';

        $.ajax({
            type: "GET",
            url: url,
            data: {
                "action": "validaCaptcha",
                "NumID": numeroID,
                "captcha": captcha},
            error: function() {
                fecharJanelaModal();
                alert("Erro inesperado! Favor tentar mais tarde!");
            },
            beforeSend: function() {
                $("#captchaConteiner").hide();
                $("#loader").show();
            },
            success: function(json) {

                $("#captchaConteiner").show();
                $("#loader").hide();

                var retorno = recuperaMensagemEmJson(json, "ErroCaptcha", false);

                //var sessionId = json[0].sessionId;
               
                if (retorno == "success") {
                	window.location.href = "/pePI/servlet/ImagemDocumentoPdfController?CodDiretoria="+codDiretoria+"&PswdID="+captcha+"&NumeroID="+numeroID;
                    fecharJanelaModal();
                }
                if (retorno == "error") {
                    mensagem = unirMensagens(json, false);
                    refreshCaptcha();
                    setMensagemAviso("ErroCaptcha", mensagem, "2");
                    $("#captchaInput").focus();
                }

            }
        });
        return false;
    });
});