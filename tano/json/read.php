<?php 
	header("Access-Control-Allow-Origin: *");
	header('content-type: application/json; charset=utf-8');

	$string = file_get_contents("_infos.json");

	echo ($string);
?>