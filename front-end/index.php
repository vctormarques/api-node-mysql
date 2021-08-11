<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">

    <title>Cervejaria Cidade Imperial</title>
    <style>

    </style>
  </head>
  <body>

<?PHP 
    include("inc/function.php");
    include("inc/modal.html");
    $obj = json_decode(file_get_contents($url), true);  

?>  

        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="">CCI</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
            <div class="my-2">
                <button type="button" 
                        class="btn btn-success"
                        data-toggle="modal" 
                        data-target="#modalCadastrar">Novo Cadastro </button>
            </div>
            <div class="card">
                <div class="card-header"> 
                    Lista de Clientes
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <td>Editar</td>
                                    <td>Excluir</td>
                                    <td>Nome</td>
                                    <td>Tipo</td>
                                    <td>CNP</td>
                                    <td>Telefone</td>
                                    <td>E-mail</td>
                                </tr>
                            </thead>
                            <tbody>
                                <?PHP foreach($obj['response']['clientes'] as $row) { ?>
                                <tr>
                                    <td>
                                        <button type="button" 
                                            class="btn btn-warning btn-sm" 
                                            data-toggle="modal" 
                                            data-target="#modalEditar"
                                            data-cod="<?PHP echo $row['id']; ?>" 
                                            data-nome="<?PHP echo $row['nome']; ?>" 
                                            data-tipopessoa="<?PHP echo $row['tipo_pessoa']; ?>"
                                            data-cnp="<?PHP echo formatCnpjCpf($row['cnp']); ?>"
                                            data-telefone="<?PHP echo formataTelefone($row['contato']['telefone']); ?>"
                                            data-email="<?PHP echo $row['contato']['email']; ?>"
                                            data-tipo="<?PHP echo $row['contato']['tipo']; ?>">
                                                <i class="fa fa-pencil"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" 
                                            class="btn btn-danger btn-sm" 
                                            data-toggle="modal" 
                                            data-target="#modalExcluir"
                                            data-cod="<?PHP echo $row['id']; ?>" 
                                            data-nome="<?PHP echo $row['nome']; ?>">
                                                <i class="fa fa-close"></i>
                                        </button>
                                    </td>
                                    <td><?= $row['nome'] ?></td>
                                    <td><?= $row['tipo_pessoa'] ?></td>
                                    <td><?= formatCnpjCpf($row['cnp']) ?></td>
                                    <td><?= formataTelefone($row['contato']['telefone']) ?></td>
                                    <td><?= $row['contato']['email'] ?></td>
                                </tr>
                                <?PHP } ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

       

    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
    <script src="https://use.fontawesome.com/4299b7b486.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.js"></script>
    <script src="js/scripts.js"></script>
  </body>
</html>