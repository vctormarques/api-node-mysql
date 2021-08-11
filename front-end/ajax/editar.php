<?PHP 
include("../inc/function.php");

$nome = $_POST['nome'];
$tipo_pessoa = $_POST['tipo_pessoa'];
$cnp = limpaCaractere($_POST['cnp']);
$telefone = limpaCaractere($_POST['telefone']);
$tipo = $_POST['tipo'];
$email = $_POST['email'];
$status2 = $_POST['status'];
$id = $_POST['id'];

$post = [
    'nome' => $nome,
    'tipo_pessoa' => $tipo_pessoa,
    'cnp'   => $cnp,
    'telefone'   => $telefone,
    'email'   => $email,
    'tipo' => $tipo,
    'id'   => $id
];


$ch = curl_init( $url );
$payload = json_encode( array( $post ) );
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PATCH");
curl_setopt( $ch, CURLOPT_POSTFIELDS, json_encode($post) );
curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
$result = curl_exec($ch);


$response = array("success" => true, "mensagem" => "Cliente editado com sucesso");
echo json_encode($response);