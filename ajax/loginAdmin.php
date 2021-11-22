<?php
  if (isset($_POST['dbName']) === true && empty($_POST['dbName']) === false &&
      isset($_POST['dbUser']) === true && empty($_POST['dbUser']) === false &&
      isset($_POST['dbPassword']) === true && empty($_POST['dbPassword']) === false) {
    include("../php/dbconnect.php");
    $login = (trim($_POST['login']));
    $password = (trim($_POST['password']));
    $sql = "SELECT firstname, secondname, middlename, attribute, агент_old.Район as agentArea FROM security
    INNER JOIN агент_old ON security.login = агент_old.login
    WHERE security.login LIKE '$login' AND security.password LIKE '$password' ";
    if ($result = mysqli_query($dbconnect, $sql)) {
       $resultArray = array();
       $tempArray = array();
       while($row = $result->fetch_object()) {
          $tempArray = $row;
          array_push($resultArray, $tempArray);
       }
       echo json_encode($resultArray, JSON_UNESCAPED_UNICODE);
    } else {
       $json['error'] = 'Нет такого пользователя или неверный пароль';
       echo json_encode($json, JSON_UNESCAPED_UNICODE);
    }
  }
  mysqli_close($dbconnect);
?>
