<!-- Hidden Sections -->
<!-- preloader -->
<?php if ($loader['preloader'] === true): ?>
	<div id="loader-wrapper">
		<center>
			<p class="loading" id="preLoaderText">Cargando Página</p>
		</center>
		<div id="loader"></div>
		<div class="loader-section section-left"></div>
		<div class="loader-section section-right"></div>
	</div>
<?php endif; ?>

<!-- Processing Banner -->
<div id="procesando" role="progressbar" class="progress-bar progress-bar-striped progress-bar-animated  bg-primary ">
	<span id="procesandoMsg">Procesando</span>
</div>
<!-- Hidden Sections -->
<!-- preloader -->

<?php // php Session to js
if ($_SESSION['wr'][_appName]) {
	$wrJs = [
		'uid' => $_SESSION['wr'][_appName]['uid'],
		'name' => $_SESSION['wr'][_appName]['name'],
		'rol' => $_SESSION['wr'][_appName]['rol'],

	];
	if (!empty($isChat)) {
		$wrJs['avatar'] = $_SESSION['wr'][_appName]['avatar'];
		// $wrJs['rol'] = $_SESSION['wr'][_appName]['rol'];
	}
	echo '<script type="text/javascript" >let wr = ' . json_encode($wrJs) . ';</script>';
	unset($wrJs);

}
;
// load navBar Data
require INC . 'default_navbar.php';
$navBar = array_replace_recursive($_navbar_default, $_navbar_custom);
?>

<!-- begin page header -->
<header>
	<!-- Navigation-->
	<nav class="navbar navbar-expand-lg navbar-darkw rLight wrBkg fixed-top " id="mainNav">
		<?php
		// navbar-brand
		if (!empty($navBar['navBrand']['show'])) {
			echo '<div class="navbar-brand">';
			if (!empty($navBar['navBrand']['home']['show'])) {
				echo '<a  class="navbar-brand" href="' . $navBar['navBrand']['home']['href'] . '">';
				echo '<i class="' . $navBar['navBrand']['home']['icon'] . '"></i></a>' . "\n";
			}
			echo '<span class="font-weight-bold font-italic ' . $navBar['navBrand']['class'] . '" ';
			if (!empty($navBar['navBrand']['style'])) {
				echo 'style="' . $navBar['navBrand']['style'] . '" ';
			}
			echo ' >' . $navBar['navBrand']['text'] . '</span>' . "\n";

			foreach ($navBar['navBrand']['items'] as $keyItem => $item) {
				if (true === $item['show']) {
					echo '<a  class="' . $item['class'] . '" target="_blank"  href="' . $item['href'] . '" ' . "\n";
					foreach ($item['options'] as $keyOption => $option) {
						echo $keyOption . '= "' . $option . '" ';
					}
					// echo ' >' . '" ' ; 
					echo ' >';
					if (isset($item['icon'])) {
						echo ' <i class="' . $item['icon'] . '"></i>';
					}
					echo ' </a>';
				}
			}
			// echo ' </div>' . '" ' ; 
			echo ' </div>' . "\n";
		}
		//navbar
		if (isset($navBar) && isset($navBar['id']) && !empty($navBar['id'])) {
			echo '<button class="navbar-toggler custom-toggler" type="button" ';
			echo ' data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation" ';
			echo ' data-target="#' . $navBar['id'] . '"  aria-controls="' . $navBar['id'] . '" >' . "\n";
			echo ' <span ><i class="fas fa-bars"></i></span>  </button>' . "\n";

			echo '<div class="' . $navBar['class'] . '" id="' . $navBar['id'] . '" > ' . "\n";
			// navItems - conjunto de  <a> sencillos
			if (!empty($navBar['navItem']['show'])) {
				echo '<div class="' . $navBar['navItem']['classDiv'] . '"> ' . "\n";
				foreach ($navBar['navItem']['items'] as $itemKey => $itemValue) {
					if (!empty($itemValue['show'])) {
						echo ' <a class="' . $navBar['navItem']['classA'] . '" href="' . $itemValue['href'] . '"';
						echo ' target="' . $navBar['navItem']['target'] . '">' . $itemValue['text'] . '</a>' . "\n";
						if (!empty($itemValue['badge']['show'])) {
							//echo '<span class="sr-only">(current)</span>';
							echo '<sup class="wrSup">';
							echo '<span class="' . $itemValue['badge']['class'] . '" >' . $itemValue['badge']['text'] . '</span>';
							echo '</sup>';
							echo "\n";
						}
					}
				}

				if (!empty($navBar['navAvatar']['show']) && $_SESSION['wr'][_appName]['rol'] > 0) {
					echo navAvatar($navBar['navAvatar']);
				}
				echo '</div> ' . "\n";
			}
			// navTabs pills - conjunto de buttons en forma de pildoras
			if (!empty($navBar['navTabs']['show'])) {
				echo '<ul class="' . $navBar['navTabs']['classUL'] . '" id="' . $navBar['navTabs']['ulID'] . '" role="tablist">' . "\n";
				foreach ($navBar['navTabs']['items'] as $keyTabs => $valueTab) {
					if ($valueTab['show']) {
						echo '<li class="' . $navBar['navTabs']['classLI'] . '">' . "\n";
						echo '<button class="' . $navBar['navTabs']['classButton'];
						echo ($valueTab['active']) ? ' active "' : '"';
						echo ' type="button" id="' . $valueTab['id'] . '" ';
						foreach ($valueTab['options'] as $keyOption => $option) {
							echo $keyOption . ' = "' . $option . '" ';
						}
						echo 'aria-selected = "';
						echo ($valueTab['active']) ? 'true"' : 'false"';

						echo ' >' . $valueTab['text'];

						if (!empty($valueTab['badge']['show'])) {
							echo '<span  class="' . $valueTab['badge']['class'] . ' " >' . $valueTab['badge']['text'] . '</span>' . "\n";
						}

						echo '</button>' . "\n";
						echo '</li>' . "\n";
					}
				}
				if (!empty($navBar['navAvatar']['show']) && $_SESSION['wr'][_appName]['rol'] > 0) {
					echo navAvatar($navBar['navAvatar']);
				}
				echo '</ul>';
			}
			// navButtons - buttons on navbar
			if (!empty($navBar['navButtons']['show'])) {
				// falta agregar 
			}
			// agregado el 2020-11-25 - w2ui Toolbar
			if (!empty($navBar['navToolbar']['show'])) {
				echo '<div class="navbar-nav ml-auto">' . "\n";
				echo '<div id="' . $navBar['navToolbar']['id'] . '" ></div>' . "\n";
				echo '</div>' . "\n";
				if (!empty($navBar['navAvatar']['show']) && $_SESSION['wr'][_appName]['rol'] > 0) {
					echo navAvatar($navBar['navAvatar']);
				}
			}
			// fin
			echo '</div>';
		}
		?>
	</nav>

</header>


<?php
function navAvatar($p)
{

	$return = '<a class="' . $p['class'] . ' " ';
	foreach ($p['options'] as $key => $value) {
		$return .= $key . ' = "' . $value . '" ';
	}
	unset($key, $value);

	$return .= ' >' . "\n";
	$return .= ' <img    id="gAvatar" class="' . $p['image']['class'] . '" ';
	$return .= ' src="' . $_SESSION['wr'][_appName]['avatar'] . '" ';
	$return .= ' alt="' . $_SESSION['wr'][_appName]['name'] . '"';
	$return .= ' title="Desconectarse"';
	$return .= ' height="' . $p['image']['size'] . '" width="' . $p['image']['size'] . '"  > ' . "\n";
	$return .= ' </a>' . "\n";

	// submenu
	$return .= ' <div class="' . $p['submenu']['classDiv'] . '" aria-labelledby="' . $p['options']['id'] . '" >' . "\n";
	foreach ($p['submenu']['items'] as $key => $value) {
		if ($_SESSION['wr'][_appName]['rol'] >= $value['level']) {
			$return .= '<a class="' . $value['class'] . '" ';
			foreach ($value['options'] as $optionKey => $optionValue) {
				$return .= $optionKey . ' = "' . $optionValue . '" ';
			}
			$return .= ' >' . "\n";
			$return .= ' <i class="' . $value['icon'] . '"></i> ' . $value['text'] . '</a>' . "\n";
		}
	}
	$return .= ' </div>' . "\n";

	return $return;

}

?>