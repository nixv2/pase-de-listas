<?php
	$connection= mysql_connect("localhost","root","root") or die("Connection Failed".mysql_error());
	mysql_select_db("school",$connection)or die("Error loading the DataBase".mysql_error());
	
	$user = $_POST['user'];
	$passwrd = $_POST["passwrd"];
	
	$query = mysql_query("SELECT * FROM users");
	
	while($row = mysql_fetch_array($query)){
		if($row["enUso"] == 1){
			echo "{success : false, errors: { reason: 'Sesion en curso.<br/>Cerrer sesion anterior' }}";
		}else{
			if($user == $row["username"] && $passwrd == $row["passwrd"]){
				session_start();
				$id = $row["id"];
				$_SESSION["k_id"] = $row["id"];
				$_SESSION["k_username"] = $row["username"];
				
				$qr = mysql_query("UPDATE users SET enUso = 1 WHERE id=$id");
				
				echo "{success : true}";
			}else {
				echo "{success : false, errors: { reason: 'Usuario y contrasena no concuerdan.' }}";
			}
		}
	}
