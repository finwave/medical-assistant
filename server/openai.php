<?php
require_once 'vendor/autoload.php';
use GuzzleHttp\Client;

$OPENAI_API_KEY = 'Your OpenAI API key here';
$openai_client = OpenAI::client($OPENAI_API_KEY);
?>