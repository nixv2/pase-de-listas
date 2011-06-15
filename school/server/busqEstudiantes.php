<?php
	$connection= mysql_connect("localhost","root","root") or die("Connection Failed".mysql_error());
	mysql_select_db("school",$connection)or die("Error loading the DataBase".mysql_error());
	
	$start = isset($_POST['start'])?$_POST['start']:0;//posición a iniciar
	$limit = isset($_POST['limit'])?$_POST['limit']:10;//número de registros que seran mostrados
	$record = $_POST["records"];//recor del cual se hara la busqueda
	
	$data = array();
	$result = mysql_query("SELECT * FROM estudiantes WHERE nombre LIKE '%$record%' OR apellido LIKE '%$record%' OR nombre_enmedio LIKE '%$record%' OR carrera LIKE '%$record%' ");

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
		"total"	=> count($data),
		"data"	=> array_splice($data,$start,$limit)
	));
