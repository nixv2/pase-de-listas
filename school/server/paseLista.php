<?php
	$connection= mysql_connect("localhost","root","root") or die("Connection Failed".mysql_error());
	mysql_select_db("school",$connection)or die("Error loading the DataBase".mysql_error());
	
	$asFaltan = array();
	$asId = $_POST["asId"];
	if(!isset($asId)){
		$results = mysql_query("SELECT * FROM asamblea WHERE abierta = 0");
		while($row = mysql_fetch_array($results)){
			array_push($asFaltan,array(
				"value"	=> $row["id"] ,
				"label"	=> $row["tipo_asamblea"] . " del ". $row["fecha"]
			));
		}
		echo Json_encode(array(
			"success"	=> true,
			"data"	=> $asFaltan
		));
	}else {
	
		$results = mysql_query("SELECT * FROM asamblea WHERE id = $asId");
		while($row = mysql_fetch_array($results)){
			$horaFin = $row["horaFin"];
			$tipo_asm = $row["tipo_asamblea"];
			$id = $row["id"];
		}
		$terminada = isOpen($horaFin);
//		echo $terminada . " <= terminada";
		if($terminada == "si"){
			$results = mysql_query("UPDATE asamblea SET abierta = 1 WHERE id = $id");
			
			echo Json_encode(array(
					"success"	=> false,
					"msg"	=> "La asamblea de $tipo_asm termino a las $horaFin <br/>cerrando asamblea"
				));
		}else{
			$matricula = $_POST["matricula"];
			$results = mysql_query("SELECT * FROM estudiantes WHERE matricula = $matricula");
		
			$existe = mysql_num_rows($results);
		
			if($existe == 1){
				$rs = mysql_query("INSERT INTO asam_estud (id_estudiante,id_asamblea,presente) VALUES ($matricula,$asId,1)");
				while($row = mysql_fetch_array($results)){
					$name = $row["nombre"] ." ". $row["apellido"];
				}
				echo Json_encode(array(
					"success"	=> mysql_errno() == 0,
					"msg"	=> mysql_errno() == 0?"Nombre: $name <br/>Matricula: $matricula asamblea $horaFin":mysql_error(),
				));
			}else{
				echo Json_encode(array(
					"success"	=> false,
					"msg"	=> "No se encontro el usuario <br/>con la matricula $matricula.$abierta"
				));
			}
		}//*/
	}
	function isOpen($horaFinal){
		$termina = "no";
		$time = time();
		$now = date("g:i A",$time);
		
		$meridianoFin = "$horaFinal[6]$horaFinal[7]";
		$hFinal = "$horaFinal[0]$horaFinal[1]";
		$mFinal = "$horaFinal[3]$horaFinal[4]";
		$meridianoHoy = date("A",$time);
		$hNow = date("g",$time);
		$mNow = date("i",$time);
		//echo $meridianoHoy ."<= meridiano Fin : " . $meridianoFin . "<=meridiano Ya";
		if($meridianoFin == $meridianoHoy){
			$mins = $mFinal - $mNow;
			$horas = $hFinal - $hNow;
//			echo $mFinal ."<= minutos Finales " . $mNow . "<=minutos Ya";
//			echo $mins." <=minutos, <br/>".$horas." <=horas <br/> ".$hNow." <= horas ya <br/>".$hFinal." <= horas Final <br/>";
			if($mins < 0 || $horas < 0){
				$termina = "si";
			}
		}
		return $termina;
	}
