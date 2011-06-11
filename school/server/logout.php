<?php
	$connection= mysql_connect("localhost","root","root") or die("Connection Failed".mysql_error());
	mysql_select_db("school",$connection)or die("Error loading the DataBase".mysql_error());
	
	session_start();
	$id = $_SESSION["k_id"];
	echo $id;
	$query = mysql_query("UPDATE users SET enUso = 0 WHERE id=$id");
	session_destroy();
