<?php
include 'openai.php';

// For local testing of the website (Visual Studio Code),
// enable this line to accept localhost "client" connection.
header('Access-Control-Allow-Origin: http://localhost:3000');

//we define the response encoding, by default we will use json
header("Content-Type: application/json; charset=UTF-8");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['input'])) {
            $input = $_GET['input'];
            $output = $openai_client->chat()->create([
                'model' => 'gpt-4o-mini',
                'messages' => [[
                    'role' => 'user',
                    'content' => $input,
                    ]],
            ]);
            $result = $output['choices'][0]['message']['content'];
            $data = array('result' => $result);
            echo json_encode($data);
        } else {
            echo json_encode("ERROR");
        }
        break;
    default:
        echo json_encode("ERROR");
        break;
}
?>