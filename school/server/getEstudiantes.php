<?php
	$connection= mysql_connect("localhost","root","root") or die("Connection Failed".mysql_error());
	mysql_select_db("school",$connection)or die("Error loading the DataBase".mysql_error());
	
	$data = array();
	$result = mysql_query("SELECT * FROM estudiantes");

	while($row = mysql_fetch_array($result)){
		array_push($data,array(
			"id"		=> $row["matricula"],
			"nombre"	=> $row["nombre"]." ".$row["nombre_enmedio"]." ".$row["apellido"],
			"carrera"	=> $row["carrera"],
			"semestre"=> $row["semestre"],
			"faltas"	=> $row["num_faltas"],
			"ac"		=> $row["acreditado"],
			"mail"	=> $row["email"]
		));
	}

	echo Json_encode(array(
		"success" => true,
		"data"	=> $data
	));
