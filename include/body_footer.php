    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>

<?php 
if ( empty( $loader) ){
	require INC . 'default_loader.php';
	$loader = array_replace_recursive( $_loader_default , $_loader_custom);
}
		if ( !empty ( $loader['core']['show'] ) ){
			echo '<!-- core js -->' . "\n";
			foreach ($loader['core']['js'] as $key => $value) {
				echo '<script src="' . $loader['folder']['libs'] . $value . '"></script>' . "\n";
			}
		}
		if ( !empty ( $loader['pivot']['show'] ) ){
			echo '<!-- pivot js -->' . "\n";
			foreach ($loader['pivot']['js'] as $key => $value) {
				echo '<script src="' . $loader['folder']['libs'] . $value . '"></script>' . "\n";
			}
			if (  array_key_exists('data', $loader['pivot']) ){
				foreach ($loader['pivot']['data'] as $key => $value) {
					echo '<script src="';
					echo $loader['folder']['obj'] .  $value . '?v=' . $loader['hash'] . '"></script>' . "\n";
				}
			}
		}
		if ( !empty ( $loader['grid']['show'] ) ){
			echo '<!-- grid js -->' . "\n";
			foreach ($loader['grid']['js'] as $key => $value) {
				echo '<script src="' . $loader['folder']['libs'] . $value . '"></script>' . "\n";
			}
			if (  $loader['grid']['data']  ){
				echo '<!-- grid data -->' . "\n";
				echo '<script src="' . $loader['folder']['obj'] . $loader['grid']['data'] . '?v=' . $loader['hash']. '"></script>' . "\n";
			}
			if ( $loader['grid']['logic'] ){
				echo '<!-- grid logic -->' . "\n";
				echo '<script src="' . $loader['folder']['obj'] . $loader['grid']['logic'] . '?v=' . $loader['hash']. '"></script>' . "\n";
			}
		}
		if ( !empty ( $loader['gauges']['show'] ) ){
			echo '<!-- gauges js -->' . "\n";
			foreach ($loader['gauges']['js'] as $key => $value) {
				echo '<script src="' . $loader['folder']['libs'] . $value . '"></script>' . "\n";
			}
			if ( !empty ( $loader['gauges']['data'] ) ){
				echo '<script src="' ;
				echo $loader['folder']['obj'] . $loader['gauges']['data'] . '?v=' . $loader['hash'] . '"></script>' . "\n";
			}
			echo '<script src="' ;
			echo $loader['folder']['obj'] . $loader['gauges']['logic'] . '?v=' . $loader['hash'] . '"></script>' . "\n";
		}
		if ( !empty ( $loader['c3']['show'] ) ){
			echo '<!-- c3 js -->' . "\n";
			foreach ($loader['c3']['js'] as $key => $value) {
				echo '<script src="' . $loader['folder']['libs'] . $value . '"></script>' . "\n";
			}
			echo '<script src="' ;
			echo $loader['folder']['obj'] . $loader['c3']['data'] . '?v=' . $loader['hash'] . '"></script>' . "\n";
			echo '<script src="' ;
			echo $loader['folder']['obj'] . $loader['c3']['logic'] . '?v=' . $loader['hash'] . '"></script>' . "\n";
		}
		if ( !empty ( $loader['mi']['show'] ) ){
			echo '<!-- mi js -->' . "\n";
			foreach ($loader['mi']['data'] as $key => $value) {
				echo '<script src="';
				echo $loader['folder']['obj'] .  $value . '?v=' . $loader['hash'] . '"></script>' . "\n";
			}
		}

		if ( !empty ( $loader['planHogar']['show'] ) ){
			echo '<!-- plan hogar  js -->' . "\n";
			foreach ($loader['planHogar']['js'] as $key => $value) {
				echo '<script src="' . $loader['folder']['libs'] . $value . '"></script>' . "\n";
			}
			echo '<script src="' ;
			echo $loader['folder']['obj'] . $loader['planHogar']['data'] . '?v=' . $loader['hash'] . '"></script>' . "\n";
			echo '<script src="' ;
			echo $loader['folder']['obj'] . $loader['planHogar']['logic'] . '?v=' . $loader['hash'] . '"></script>' . "\n";
		}
		if ( !empty ( $loader['logs']['show'] ) ){
			echo '<!-- logs  js -->' . "\n";
			foreach ($loader['logs']['js'] as $key => $value) {
				echo '<script src="' . $loader['folder']['libs'] . $value . '"></script>' . "\n";
			}
		}
		if ( !empty ( $loader['perPage']['show'] ) ){
			echo '<!-- perPage  js -->' . "\n";
			foreach ($loader['perPage']['js'] as $key => $value) {
				echo '<script src="' . $loader['folder']['libs'] . $value . '"></script>' . "\n";
			}
			if (  $loader['perPage']['data']  ){
				echo '<!-- perPage data -->' . "\n";
				foreach ($loader['perPage']['data'] as $key => $value) {
					echo '<script src="' . $loader['folder']['obj'] . $value . '?v=' . $loader['hash']. '"></script>' . "\n";
				}
			}
			// modificado el 2020-11-25
			// para que tome la ruta completa
			if ( $loader['perPage']['logic'] ){
				echo '<!-- perPage logic -->' . "\n";
				foreach ($loader['perPage']['logic'] as $key => $value) {
					echo '<script src="' . $value . '?v=' . $loader['hash']. '"></script>' . "\n";
				}
			}
		}

		if ( !empty ( $loader['finally'] ) ){
			echo '<!-- finally -->' . "\n";
			echo '<script type="text/javascript" language="javascript" class="finally">'  . "\n";

			echo '$(function () {' . "\n";
			echo '   Loader();' . "\n";
			echo '})' . "\n";

			echo 'async function Loader(){'. "\n";
			foreach ($loader['finally'] as $key => $value) {
				if ( $value ){
					echo '   const result_' . $key . ' = await ' . $key . '();' . "\n";
					echo '   console.log( "' . $key . ' : " + result_' . $key . ' ) '. "\n";
				}
			}
			echo '   const result_final = await Finally();' . "\n";
			echo '}' . "\n";


			echo 'function Finally() { return new Promise(r => {	$("body").addClass("loaded");});}' . "\n";

			echo '</script>'. "\n";
		}
?>