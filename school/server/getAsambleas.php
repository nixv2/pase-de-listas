<?php
	$connection= mysql_connect("localhost","root","root") or die("Connection Failed".mysql_error());
	mysql_select_db("school",$connection)or die("Error loading the DataBase".mysql_error());
	
	$data = array();
	$result = mysql_query("SELECT * FROM asamblea");

	while($row = mysql_fetch_array($result)){
		array_push($data,array(
			"id"		=> $row["id"],
			"tipoAsam"=> $row["tipo_asamblea"],
			"fecha"	=> $row["fecha"],
			"horaIni"	=> $row["horaIni"],
			"horaFin"	=> $row["horaFin"],
			"terminada"=> $row["abierta"],
		));
	}

	echo Json_encode(array(
		"success" => true,
		"data"	=> $data
	));
