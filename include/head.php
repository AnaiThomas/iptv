	<meta charset="utf-8">
	<link rel="icon" type="image/x-icon" href="/favicon.ico" />
	<meta name="author" content="Luis Carrizo">
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title><?php echo $head['title']?></title>

	<?php 
		// verificación de rol requerido
		try {
			if ( isset( $minRol ) ){
				if ( isset( $_SESSION['wr'][_appName]['rol']) ){
					if ( $_SESSION['wr'][_appName]['rol'] < $minRol ){
						throw new Exception('Tu perfil de usuario no tiene el rol para acceder a esta aplicación'); ;
					};
				} else {
						throw new Exception( 'Tu perfil de usuario no cumple los requisitos mínimos para acceder a esta aplicación');
				}
			}
			
		} catch (Exception $e) {
			echo '<center>';
			echo '<h1><strong>' . $e->getMessage() . " ( $minRol )" . '</strong></h1>' . _ff;
			echo '<a href="/index.php">Presione acá para volver a la página principal</a></center>';
			die;
		}

		require INC . 'default_loader.php';
		$loader = array_replace_recursive( $_loader_default , $_loader_custom);

		// agregado el 2020-11-25 para tener otra version de core
		if ( !empty ( $loader['core2']['show'] ) ){
			unset( $loader['core'] );
			$loader['core']= $loader['core2'];
			unset($loader['core2']);
		}

		if ( !empty ( $loader['core']['show'] ) ){
			foreach ($loader['core']['css'] as $cssKey => $cssValue) {
				echo '<link href="' . $loader['folder']['libs'] . $cssValue . '" rel="stylesheet">' . "\n";
			}
		}
		if ( !empty ( $loader['gauges']['show'] ) ){
			foreach ($loader['gauges']['css'] as $cssKey => $cssValue) {
				echo '<link href="' . $loader['folder']['libs'] . $cssValue . '" rel="stylesheet">' . "\n";
			}
		}
		if ( !empty ( $loader['c3']['show'] ) ){
			foreach ($loader['c3']['css'] as $cssKey => $cssValue) {
				echo '<link href="' . $loader['folder']['libs'] . $cssValue . '" rel="stylesheet">' . "\n";
			}
		}
		if ( !empty ( $loader['pivot']['show'] ) ){
			foreach ($loader['pivot']['css'] as $cssKey => $cssValue) {
				if ( _left( $cssValue , 6) == 'https:') {
					echo '<link href="' .  $cssValue . '" rel="stylesheet">' . "\n";
				} else {
					echo '<link href="' . $loader['folder']['libs'] . $cssValue . '" rel="stylesheet">' . "\n";	
				}
				
			}
		}
		if ( !empty ( $loader['grid']['show'] ) ){
			foreach ($loader['grid']['css'] as $cssKey => $cssValue) {
				echo '<link href="' . $loader['folder']['libs'] . $cssValue . '" rel="stylesheet">' . "\n";
			}
		}
		if ( !empty ( $loader['planHogar']['show'] ) ){
			foreach ($loader['planHogar']['css'] as $cssKey => $cssValue) {
				echo '<link href="' . $loader['folder']['libs'] . $cssValue . '" rel="stylesheet">' . "\n";
			}
		}
		if ( !empty ( $loader['logs']['show'] ) ){
			foreach ($loader['logs']['css'] as $cssKey => $cssValue) {
				echo '<link href="' . $loader['folder']['libs'] . $cssValue . '" rel="stylesheet">' . "\n";
			}
		}
		if ( !empty ( $loader['perPage']['show'] ) ){
			foreach ($loader['perPage']['css'] as $cssKey => $cssValue) {
				echo '<link href="' . $loader['folder']['libs'] . $cssValue . '" rel="stylesheet">' . "\n";
			}
		}

	?>