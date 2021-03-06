<!DOCTYPE html>
<html lang="en">
<head>
  <title>Login</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" href="../images/favicon.ico" type="image/x-icon">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link href="https://fonts.googleapis.com/css?family=Carter+One|Chewy|Cinzel+Decorative|Della+Respira|El+Messiri|Fahkwang|Kalam|Lobster|Merienda|Mirza|Oleo+Script|Oswald|Playfair+Display|Pridi|Righteous|Shrikhand" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Indie+Flower|Pacifico" rel="stylesheet">
  <link rel="stylesheet" href="../CSS/menuLayout.css">
  <link rel="stylesheet" href="../CSS/report.css">
  <link rel="stylesheet" href="../CSS/adminMenu.css">
  <link rel="stylesheet" href="../CSS/accounting.css">
  <link rel="stylesheet" href="../CSS/map.css">
  <link rel="stylesheet" href="../CSS/settings.css">
  <link rel="stylesheet" href="../CSS/changeDBTables.css">
  <script type="text/javascript" src="../sheetjs/dist/xlsx.full.min.js"></script>
  <script type="text/javascript" src="../filesaver/dist/FileSaver.min.js"></script>
  <script type="text/javascript" src="../js/globalVariables.js"></script>
  <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=keygoeshere" type="text/javascript"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/exif-js"></script>
</head>
<body  onload="starter();">
  <div class="navigationContainer">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#menu">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>
    <div class="collapse navbar-collapse" id="menu">
      <ul class="nav navbar-nav">
        <li><div id="home" data-toggle="collapse" data-target=".navbar-collapse.in" ><img src="../images/icons/home.ico"></div></li>
        <li><input type="submit" id="reports" data-toggle="collapse" data-target=".navbar-collapse.in" value="????????????"></li>
        <li><input type="submit" id="accounting" data-toggle="collapse" data-target=".navbar-collapse.in"  value="??????????????????????"></li>
        <li><input type="submit" id="analytics" data-toggle="collapse" data-target=".navbar-collapse.in" value="??????????????????"></li>
        <li><input type="submit" id="printReport" data-toggle="collapse" data-target=".navbar-collapse.in" value="????????????"></li>
        <li><input type="submit" id="changeDataBaseTables" data-toggle="collapse" data-target=".navbar-collapse.in" value="????????????????"></li>
        <li><input type="submit" id="warehouse" data-toggle="collapse" data-target=".navbar-collapse.in" value="??????????"></li>
        <li><input type="submit" id="mapCaiman" data-toggle="collapse" data-target=".navbar-collapse.in" value="??????????"></li>
        <li><input type="submit" id="adminSettings" data-toggle="collapse" data-target=".navbar-collapse.in" value="??????????????????"></li>
      </ul>
    </div>
  </div>
  <div id="connection-data"></div>
  <script type="text/javascript" src="../js/globalVariables.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="../js/receiveAgentStatus.js"></script>
  <script type="text/javascript" src="../js/loginAdmin.js"></script>
  <script type="text/javascript" src="../js/reports.js"></script>
  <script type="text/javascript" src="../js/settings.js"></script>
  <script type="text/javascript" src="../js/analytics.js"></script>
  <script type="text/javascript" src="../js/accounting.js"></script>
  <script type="text/javascript" src="../js/createexcel.js"></script>
  <script type="text/javascript" src="../js/request_map.js"></script>
  <script type="text/javascript" src="../js/changeDataBaseTables.js"></script>
  <script type="text/javascript" src="../js/warehouse.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/exif-js"></script>
  <!-- Yandex Disk REST API jQuery Plugin -->
  <script type="text/javascript" src="../js/jquery.ydisk.js"></script>
</body>
</html>
