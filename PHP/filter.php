<?php
   include("dbconnect.php");
   if($_SERVER["REQUEST_METHOD"]=="POST")
   {
      if (isset($_POST["Area"], $_POST["AccountingType"])) {
         $area = $_POST["Area"];
         $accountingType = $_POST["AccountingType"];
         $dayOfTheWeek = $_POST["DayOfTheWeek"];

         if (!empty($area) && !empty($accountingType)) {
            $sql = "SELECT Наименование FROM salespartners where Район LIKE '$area'
            and Учет LIKE '$accountingType' and DayOfTheWeek LIKE '$dayOfTheWeek' ";

            if ($result = mysqli_query($dbconnect, $sql)) {
               $resultArray = array();
               $tempArray = array();
               while($row = $result->fetch_object()) {
                  $tempArray = $row;
                  array_push($resultArray, $tempArray);
               }
               echo json_encode($resultArray, JSON_UNESCAPED_UNICODE);
               mysqli_close($dbconnect);
            }else{
               $json['error'] = 'Something went wrong';
               echo json_encode($json, JSON_UNESCAPED_UNICODE);
               mysqli_close($dbconnect);
            }
         } else {
            echo json_encode("Not all fields are filled");
         }
      }
   }
?>
