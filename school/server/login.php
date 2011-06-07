<?php
	$connection= mysql_connect("localhost","root","root") or die("Connection Failed".mysql_error());
	mysql_select_db("school",$connection)or die("Error loading the DataBase".mysql_error());
	
	$user = $_POST['user'];
	$passwrd = $_POST["passwrd"];
	$data = array();
	
	$query = mysql_query("SELECT * FROM users");
	
	if($row = mysql_fetch_array($query)){
		if($user == $row["username"] && $passwrd == $row["passwrd"]){
			session_start();
			$_SESSION["k_username"] = $row["username"];
			echo "{success : true}";
		}else {
			echo "{success : false, errors: { reason: 'Usuario y contrasena no concuerdan.' }}";
		}
	}
