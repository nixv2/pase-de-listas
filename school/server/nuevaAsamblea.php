<?php
	$connection= mysql_connect("localhost","root","root") or die("Connection Failed".mysql_error());
	mysql_select_db("school",$connection)or die("Error loading the DataBase".mysql_error());
	
	$tipoAsam = htmlentities($_POST["asamblea"], ENT_QUOTES);
	$fecha = htmlentities($_POST["fecha"], ENT_QUOTES);
	$horaIni = htmlentities($_POST["horaInit"], ENT_QUOTES);
	$horaFin = htmlentities($_POST["horaFin"], ENT_QUOTES);
	
	$query = sprintf("INSERT INTO asamblea (horaIni,horaFin,fecha,tipo_asamblea,abierta) values ('%s','%s','%s','%s',0)",
			mysql_real_escape_string($horaIni),
			mysql_real_escape_string($horaFin),
			mysql_real_escape_string($fecha),
			mysql_real_escape_string($tipoAsam)
	);
	$rs = mysql_query($query);
	
	echo Json_encode(array(
		"success" 	=> mysql_errno() == 0,
		"msg"		=> mysql_errno() == 0?"La asamblea del $fecha por $tipoAsam <br/>a sido creada correctamente":mysql_error()
	));
