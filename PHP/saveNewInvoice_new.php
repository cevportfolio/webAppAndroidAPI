<?php
  mysqli_set_charset("utf8");
  include("dbconnect.php");

  $array = $_POST["array"];
  $new_array = json_decode($array, true);
  $agentID = $new_array[0]['agentID'];

  $sql = "SELECT tableName FROM invoicetables WHERE agentID LIKE '$agentID' ";
  if ($result = mysqli_query($dbconnect, $sql)) {
    while($row = mysqli_fetch_array($result)) {
      if (mysqli_num_rows($result) != 0) {
        $tableName = $row['tableName'];
        $postfix = $row['tableName'];
        $clone = $row['tableName'];
      }
    }
  }

  $postfix.="_twin";
  $clone.="_clone";

  date_default_timezone_set("UTC"); // Устанавливаем часовой пояс по Гринвичу
  $time = time(); // Вот это значение отправляем в базу
  $offset = 3; // Допустим, у пользователя смещение относительно Гринвича составляет +3 часа
  $time += 11 * 3600; // Добавляем 3 часа к времени по Гринвичу
  $dateTimeDoc = date("Y-m-d H:i:s", $time); // Выводим время пользователя, согласно его часовому поясу
  $date = date("Y-m-d H:i:s");
  $date = strtotime($dateTimeDoc);
  $date = strtotime("-14 day", $date);
  $dateTime = date('Y-m-d H:i:s', $date);
  $resultArray = array();
  $tempArray = array();
  $tmpInfo;

  for ($i = 0; $i < count($new_array); $i++) {
    $invoiceNumber = $new_array[$i]['invoiceNumber'];
    $invoiceNumberLocal = $invoiceNumber;
    $agentID = $new_array[$i]['agentID'];
    $salesPartnerID = $new_array[$i]['salesPartnerID'];
    $accountingTypeDoc = $new_array[$i]['accountingTypeDoc'];
    $accountingTypeSP = $new_array[$i]['accountingTypeSP'];
    $areaSP = $new_array[$i]['areaSP'];
    $itemName = $new_array[$i]['itemName'];
    $quantity = $new_array[$i]['quantity'];
    $price = $new_array[$i]['price'];
    $totalCost = $new_array[$i]['totalCost'];
    $exchange = $new_array[$i]['exchange'];
    $returns = $new_array[$i]['returns'];
    // $surplus = $new_array[$i]['surplus'];
    $dateTimeDocLocal = $new_array[$i]['dateTimeDocLocal'];
    $invoiceSum = $new_array[$i]['invoiceSum'];
    $comment = $new_array[$i]['comment'];


    // if ($i > 0){
    //   if ($invoiceNumber != $tmp[count($tmp) - 1]){
    //     $tmpI[$i] = $invoiceNumber;
    //      $tempArray = array('invoiceNumber' => $invoiceNumber, 'dateTimeDoc' => $dateTimeDoc);
    //      array_push($resultArray, $tempArray);
    //   }
    // } else {
    //   $tmp[$i] = $invoiceNumber;
    //   $tempArray = array('invoiceNumber' => $invoiceNumber, 'dateTimeDoc' => $dateTimeDoc);
    //   array_push($resultArray, $tempArray);
    // }
    //
    // $sql = "SELECT ID FROM salespartners WHERE salespartners.Наименование LIKE '$salesPartnerName'
    // AND salespartners.Район LIKE '$areaSP' AND salespartners.Учет LIKE '$accountingTypeSP' ";
    // if ($result = mysqli_query($dbconnect, $sql)) {
    //   while($row = mysqli_fetch_array($result)) {
    //     if (mysqli_num_rows($result) != 0) {
    //       $salesPartnerID = $row['ID'];
    //     }
    //   }
    // }

    $sql = "SELECT Артикул FROM номенклатура WHERE номенклатура.Наименование LIKE '$itemName' ";
    if ($result = mysqli_query($dbconnect, $sql)) {
      while($row = mysqli_fetch_array($result)) {
        if (mysqli_num_rows($result) != 0) {
          $itemID = $row['Артикул'];
        }
      }
    }

    $sql = "INSERT INTO $postfix (InvoiceNumber, AgentID, SalesPartnerID,
      AccountingType, ItemID, Quantity, Price, Total, ExchangeQuantity,
      ReturnQuantity, DateTimeDoc, InvoiceSum, Comment, InvoiceNumberLocal, DateTimeDocLocal)
      VALUES ($invoiceNumber, $agentID, $salesPartnerID,
      '$accountingTypeDoc', $itemID, $quantity, $price, $totalCost, $exchange,
      $returns, '$dateTimeDoc', $invoiceSum, '$comment', $invoiceNumberLocal, '$dateTimeDocLocal') ";
    mysqli_query($dbconnect, $sql);

    $sql = "SELECT COUNT(*) FROM $tableName WHERE InvoiceNumber LIKE $invoiceNumber AND ItemID LIKE $itemID
      ORDER BY ID LIMIT 1000";
    // AgentID LIKE $agentID AND SalesPartnerID LIKE $salesPartnerID AND AccountingType LIKE '$accountingTypeDoc' AND
    //  AND Quantity LIKE $quantity AND Price LIKE $price AND Total LIKE $totalCost AND
    // ExchangeQuantity LIKE $exchange AND ReturnQuantity LIKE $returns AND InvoiceSum LIKE $invoiceSum AND
    // Comment LIKE '$comment' AND DateTimeDocLocal LIKE '$dateTimeDocLocal' LIMIT 1";
    if ($result = mysqli_query($dbconnect, $sql)) {
      $row = mysqli_fetch_row($result);
      $totalMatches = $row[0];
    }
    if ($totalMatches == 0) {
    // $resultArray = array();
    // $tempArray = array();
      $sql = "INSERT INTO $tableName (InvoiceNumber, AgentID, SalesPartnerID,
        AccountingType, ItemID, Quantity, Price, Total, ExchangeQuantity,
        ReturnQuantity, DateTimeDoc, InvoiceSum, Comment, InvoiceNumberLocal, DateTimeDocLocal)
        VALUES ($invoiceNumber, $agentID, $salesPartnerID,
        '$accountingTypeDoc', $itemID, $quantity, $price, $totalCost, $exchange,
        $returns, '$dateTimeDoc', $invoiceSum, '$comment', $invoiceNumberLocal, '$dateTimeDocLocal') ";

      if (mysqli_query($dbconnect, $sql)) {
         // $tmpInfo = "New record created successfully";
         // $tempArray = array('requestMessage' => $tmpInfo);
         // array_push($resultArray, $tempArray);
         $sqlClone = "INSERT INTO $clone (InvoiceNumber, AgentID, SalesPartnerID,
           AccountingType, ItemID, Quantity, Price, Total, ExchangeQuantity,
           ReturnQuantity, DateTimeDoc, InvoiceSum, Comment, InvoiceNumberLocal, DateTimeDocLocal)
           VALUES ($invoiceNumber, $agentID, $salesPartnerID,
           '$accountingTypeDoc', $itemID, $quantity, $price, $totalCost, $exchange,
           $returns, '$dateTimeDoc', $invoiceSum, '$comment', $invoiceNumberLocal, '$dateTimeDocLocal') ";
         if (mysqli_query($dbconnect, $sqlClone)) {
         }
      } else {
         echo "Error: " . $sql . "<br>" . mysqli_error($dbconnect);
         $tmpInfo = "Error";
      }
    }
  }
  // $itemsSoldCount = 0;
  // if ($tmpInfo == "New record created successfully") {
  $sql = "SELECT DISTINCT InvoiceNumber FROM $tableName WHERE DateTimeDoc LIKE '$dateTimeDoc' ";
  if ($result = mysqli_query($dbconnect, $sql)) {
     $resultArray = array();
     $tempArray = array();
     while($row = $result->fetch_object()) {

        $tempArray = $row;
        array_push($resultArray, $tempArray);
     }

     echo json_encode($resultArray, JSON_UNESCAPED_UNICODE);
     mysqli_close($dbconnect);
  }
  //   $sql = "SELECT InvoiceNumber FROM $tableName WHERE DateTimeDoc LIKE '$dateTimeDoc' ";
  //   if ($result = mysqli_query($dbconnect, $sql)) {
  //      // $resultArray = array();
  //      $tempArray = array();
  //      while($row = $result->fetch_object()) {
  //         $itemsSoldCount += 1;
  //      }
  //      $tempArray = array('itemsSoldCount' => $itemsSoldCount);
  //      array_push($resultArray, $tempArray);
  //      echo json_encode($resultArray, JSON_UNESCAPED_UNICODE);
  //      // mysqli_close($dbconnect);
  //   }
  //   $tempArray = array('requestMessage' => $tmpInfo);
  //   array_push($resultArray, $tempArray);
  //   echo json_encode($resultArray, JSON_UNESCAPED_UNICODE);
  // }
  //  echo json_encode($resultArray, JSON_UNESCAPED_UNICODE);
?>
