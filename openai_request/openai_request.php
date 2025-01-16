<?php
// Allows localhost connection (Next.js Visual Studio Code -> npm run dev).
header('Access-Control-Allow-Origin: http://localhost:3000');

require_once 'vendor/autoload.php';
use GuzzleHttp\Client;

if(!isset($_POST) || $_POST["request"] == NULL) {
    echo "ERROR";
} else {
    // Include your OpenAI API key here.
    $OPENAI_API_KEY = 'YOUR OPENAI API KEY HERE';
    
    $request = $_POST["request"];
    $client = OpenAI::client($OPENAI_API_KEY);

    $data = $client->chat()->create([
        'model' => 'gpt-4o-mini',
        'messages' => [[
            'role' => 'user',
            'content' => $request,
         ]],
    ]);

    $output = $data['choices'][0]['message']['content'];
    echo($output);
}

?>