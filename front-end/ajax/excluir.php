<?PHP 
include("../inc/function.php");
$id = $_POST['id'];

$ch = curl_init( $url.$id );
$payload = json_encode( array( $post ) );
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PATCH");
curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
$result = curl_exec($ch);


$response = array("success" => true, "mensagem" => "Cliente excluído com sucesso");
echo json_encode($response);