<?php
require $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';
use \Wikired\wrDB as wrDB;

$head = array(
  'title' => 'Canales de IPTV',
);

$_loader_custom = array(
  'grid' => array(
    'show' => true,
    'css' => array(
    ),
  ),

  'perPage' => array(
    'show' => true,
    'css' => array(
      'jquery-ui/jquery-ui.css',
      'jtable/validationEngine/validationEngine.jquery.css',
      'jtable/themes/metro/blue/jtable.min.css',
    ),
    'js' => array(
      'jquery-ui/jquery-ui.min.js',
      'jtable/validationEngine/jquery.validationEngine.min.js',
      'jtable/validationEngine/jquery.validationEngine-es.js',
      'jtable/jquery.jtable.js',
    ),
    'logic' => array('/src/index.js'),
  ),
  'finally' => array('documentReady' => true,
  ),
);

$_navbar_custom = array(
  // navbar Brand
  'navBrand' => array(
    'show' => true,
    'text' => $head['title'],
    'home' => array('show' => true, 'href' => '/index.php'),
    'items' => array(
      'help' => array('show' => false, ),
    )
  ),

  // navBar Tabs
  'navTabs' => array('show' => false, ),

  // avatar 
  'navAvatar' => array('show' => true, ),
);

?>
<!DOCTYPE html>
<html>

<head>

  <?php include INC . 'head.php'; ?>

  <style>
  </style>
</head>

<body id="page-top">

  <?php
  include INC . 'body_header.php';
  include INC . 'ee/b05.php'; //ojo ver si es necesario
  
  ?>

  <main role="main" id="mainContainer"> <!-- class="mt-5 pt-5" -->
    <div class="container-fluid">
      <div class="row ">
        <div class="col-12 ">
          <div id="wrTableContainer"></div>
        </div>
      </div>
    </div> <!-- end container-fluid-->
  </main>

  <footer>

    <script type="text/javascript" language="javascript" class="footer">
      let dataSource = 'f0591';
    </script>

    <?php include INC . 'body_footer.php'; ?>

    <script type="text/javascript" language="javascript" class="footer">
    </script>

  </footer>

</body>

</html>