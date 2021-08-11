<?PHP 
include("../inc/function.php");

$nome = $_POST['nome'];
$tipo_pessoa = $_POST['tipo_pessoa'];
$cnp = limpaCaractere($_POST['cnp']);
$telefone = limpaCaractere($_POST['telefone']);
$tipo = $_POST['tipo'];
$email = $_POST['email'];

$post = [
    'nome' => $nome,
    'tipo_pessoa' => $tipo_pessoa,
    'cnp'   => $cnp,
    'telefone'   => $telefone,
    'email'   => $email,
    'tipo' => $tipo
];

$ch = curl_init( $url );
$payload = json_encode( array( $post ) );
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt( $ch, CURLOPT_POSTFIELDS, json_encode($post) );
curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
$result = curl_exec($ch);



$response = array("success" => true, "mensagem" => "Cliente cadastrado com sucesso!");
echo json_encode($response);