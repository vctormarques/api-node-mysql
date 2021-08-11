$('#modalEditar').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var cod = button.data('cod')
    var nome = button.data('nome')
    var tipoPessoa = button.data('tipopessoa')
    var cnp = button.data('cnp')
    var telefone = button.data('telefone')
    var email = button.data('email')
    var tipo = button.data('tipo')

    var modal = $(this)
    modal.find('.modal-header').text('Editar')
    modal.find('.codExclusao').val(cod)
    modal.find('.nome').val(nome)
    modal.find('.tipoPessoa').val(tipoPessoa)
    modal.find('.cnp').val(cnp)
    modal.find('.telefone').val(telefone)
    modal.find('.email').val(email)
    modal.find('.tipo').val(tipo)
});

$('#modalExcluir').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var cod = button.data('cod')
    var nome = button.data('nome')

    var modal = $(this)
    modal.find('.modal-header').text('Excluir')
    modal.find('.codExclusao').val(cod)
    modal.find('.modal-body').text('Deseja realmente excluir a pessoa ' + nome + ' ?')
});


$(document).ready(function () {

    $('#btnCadastrar').click(function () {
        var dados = $('#formCadastrar').serialize();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'ajax/cadastrar.php',
            async: true,
            data: dados,
            success: function (response) {
                if (response.success) {
                    $(".fade").hide();
                    mostraDialogo(response.mensagem, "success", 4000);
                    setTimeout(function () { location.reload(); }, 1000);
                } else {
                    console.log(response.mensagem);
                }
            }

        });
        return false;
    });

    $('#btnEditar').click(function () {
        var dados = $('#formEditar').serialize();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'ajax/editar.php',
            async: true,
            data: dados,
            success: function (response) {
                if (response.success) {
                    $(".fade").hide();
                    mostraDialogo(response.mensagem, "success", 4000);
                    setTimeout(function () { location.reload(); }, 1000);
                } else {
                    console.log(response.mensagem);
                }
            }

        });
        return false;
    });

    $('#btnExcluir').click(function () {
        var dados = $('#formExcluir').serialize();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'ajax/excluir.php',
            async: true,
            data: dados,
            success: function (response) {
                if (response.success) {
                    $(".fade").hide();
                    mostraDialogo(response.mensagem, "success", 4000);
                    setTimeout(function () { location.reload(); }, 1000);
                } else {
                    console.log(response.mensagem);
                }
            }

        });
        return false;
    });

});

/* Scripts */
function mostraDialogo(mensagem, tipo, tempo) {
    if ($("#message").is(":visible")) {
        return false;
    }
    if (!tempo) {
        var tempo = 3000;
    }
    if (!tipo) {
        var tipo = "info";
    }
    var cssMessage =
        "display: block; position: fixed; top: 0; left: 30%; right: 30%; width: auto; padding-top: 10px; z-index: 9999";
    var cssInner = "margin: 0 auto; box-shadow: 1px 1px 5px black;";

    var dialogo = "";
    dialogo += '<div id="message" style="' + cssMessage + '">';
    dialogo += '    <div class="alert alert-' + tipo + ' alert-dismissable" style="' + cssInner + '">';
    dialogo += '    <a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>';
    dialogo += mensagem;
    dialogo += '    </div>';
    dialogo += '</div>';

    $("body").append(dialogo);
    $("#message").hide();
    $("#message").fadeIn(200);

    setTimeout(function () {
        $('#message').fadeOut(300, function () {
            $(this).remove();
        });
    }, tempo);
}


$(".mascaraCNP").keydown(function () {
    try {
        $(".mascaraCNP").unmask();
    } catch (e) { }

    var tamanho = $(".mascaraCNP").val().length;

    if (tamanho < 11) {
        $(".mascaraCNP").mask("999.999.999-99");
    } else {
        $(".mascaraCNP").mask("99.999.999/9999-99");
    }

    var elem = this;
    setTimeout(function () {
        elem.selectionStart = elem.selectionEnd = 10000;
    }, 0);
    var currentValue = $(this).val();
    $(this).val('');
    $(this).val(currentValue);
})

$('.mascaraTelefone').mask('(00) 0000-00009');
$('.mascaraTelefone').blur(function (event) {
    if ($(this).val().length == 15) {
        $('.mascaraTelefone').mask('(00) 00000-0009');
    } else {
        $('.mascaraTelefone').mask('(00) 0000-00009');
    }
});