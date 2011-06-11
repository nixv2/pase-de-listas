<?php
	$connection= mysql_connect("localhost","root","root") or die("Connection Failed".mysql_error());
	mysql_select_db("school",$connection)or die("Error loading the DataBase".mysql_error());

	$matricula = htmlentities($_POST["matricula"], ENT_QUOTES);
	$nombre = htmlentities($_POST["nombre"], ENT_QUOTES);
	$mi = htmlentities($_POST["iniNombre"], ENT_QUOTES);
	$apellido = htmlentities($_POST["apellido"], ENT_QUOTES);
	$email = htmlentities($_POST["email"], ENT_QUOTES);
	$carrera = htmlentities($_POST["carrera"], ENT_QUOTES);
	$semestre = htmlentities($_POST["semestre"], ENT_QUOTES);
	
	$query = sprintf("INSERT INTO estudiantes (matricula,nombre,nombre_enmedio,apellido,email,carrera,semestre,num_faltas,acreditado) 				VALUES (%d,'%s','%s','%s','%s','%s',%d,0,0)",
		mysql_real_escape_string($matricula),
		mysql_real_escape_string($nombre),
		mysql_real_escape_string($mi),
		mysql_real_escape_string($apellido),
		mysql_real_escape_string($email),
		mysql_real_escape_string($carrera),
		mysql_real_escape_string($semestre)
	);
	
	$rs = mysql_query($query);
	
	echo Json_encode(array(
		"success"	=> mysql_errno() == 0,
		"msg"	=> mysql_errno() == 0?"El estudiante con matricula $matricula, <br/> fue agregado correctamente.":mysql_error()
	));
