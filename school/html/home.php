<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Home</title>
<link rel="stylesheet" type="text/css" href="../ext-4.0.0/resources/css/ext-all.css" /> 
<script type="text/javascript" src="../ext-4.0.0/bootstrap.js"></script>
 
<link rel='stylesheet' type='text/css' href='../style.css' />

<!-- extensions-->
    <script type="text/javascript" src="../ext-4.0.0/examples/portal/classes/Portlet.js"></script>
    <script type="text/javascript" src="../ext-4.0.0/examples/portal/classes/PortalColumn.js"></script>
    <script type="text/javascript" src="../ext-4.0.0/examples/portal/classes/PortalPanel.js"></script>
    <script type="text/javascript" src="../ext-4.0.0/examples/portal/classes/PortalDropZone.js"></script>
 
<?php 
	session_start(); 
	if (isset($_SESSION['k_username'])) { ?>
	
<script type="text/javascript" src="../js/home.js"></script> 

</head>
	<body>
		
	</body>
</html>
<?php } else {?>
<script type="text/javascript" src="../js/logError.js"></script> 
</head>
	<body>
		
	</body>
</html>
<?php }?>
