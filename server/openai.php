<?php
require_once 'vendor/autoload.php';
use GuzzleHttp\Client;

$OPENAI_API_KEY = 'YOUR OPENAI API KEY HERE';
$openai_client = OpenAI::client($OPENAI_API_KEY);
?>