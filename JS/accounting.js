if ($('.fileInput').length > 0)	{
  document.getElementById('file-input').addEventListener('change', readFile, false);
}

function tableHeaderRowFunc() {
   accountingLocalVars.tableHeaderRow  = tableConstructor.tbodyOpen + tableConstructor.trOpen +
                                         tableConstructor.tdOpen + accountingLocalVars.ID + tableConstructor.tdClose +
                                         tableConstructor.tdOpen + accountingLocalVars.invoiceID + tableConstructor.tdClose +
                                         tableConstructor.tdOpen + accountingLocalVars.areaID + tableConstructor.tdClose +
                                         tableConstructor.tdOpen + accountingLocalVars.salesPartnerName + tableConstructor.tdClose +
                                         tableConstructor.tdOpen + accountingLocalVars.taxPayerID + tableConstructor.tdClose +
                                         tableConstructor.tdOpen + accountingLocalVars.itemName + tableConstructor.tdClose +
                                         tableConstructor.tdOpen + accountingLocalVars.itemID + tableConstructor.tdClose +
                                         tableConstructor.tdOpen + accountingLocalVars.itenmPrice + tableConstructor.tdClose +
                                         tableConstructor.tdOpen + accountingLocalVars.quantity + tableConstructor.tdClose +
                                         tableConstructor.tdOpen + accountingLocalVars.total + tableConstructor.tdClose +
                                         tableConstructor.tdOpen + accountingLocalVars.invoiceSum + tableConstructor.tdClose +
                                         tableConstructor.tdOpen + accountingLocalVars.date + tableConstructor.tdClose +
                                         tableConstructor.trClose + tableConstructor.tbodyClose;
}

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  hours = hours < 10 ? '0'+hours : hours;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  seconds = seconds < 10 ? '0'+seconds : seconds;
  day = day < 10 ? '0'+day : day;
  month = month < 10 ? '0'+month : month;
  var strTime = hours + ':' + minutes + ':' + seconds;
  return  year + "." + month + "." + day + "  " + strTime;
}

function receiveStolichniySPNames() {
  $.post('../php/receiveStolichniyData.php', {dbName: localStorage.getItem('dbName'), dbUser: localStorage.getItem('dbUser'),
                                          dbPassword: localStorage.getItem('dbPassword')}, function(data) {
    accountingLocalVars.tmp = JSON.parse(data);
  });
}

function readFile(e) {
  receiveStolichniySPNames();
  var files = e.target.files, f = files[0];
  var reader = new FileReader();
  var spNameTrigger = false;
  reader.onload = function(e) {
    var data = new Uint8Array(e.target.result);
    var workbook = XLSX.read(data, {type: 'array'});
    accountingLocalVars.sheet = workbook.Sheets[workbook.SheetNames[0]]
    var sheet = accountingLocalVars.sheet;
    var itemIDColNum;
    var itemIDRowNum;
    var spNameTrigger = false;
    var range = XLSX.utils.decode_range(sheet['!ref']);
    for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
        for (colNum=range.s.c; colNum<=range.e.c; colNum++) {
           var nextCell = sheet[
              XLSX.utils.encode_cell({r: rowNum, c: colNum})
           ];
           if (typeof nextCell === 'undefined') {
           } else {
             if (nextCell.w === "??????") {
               itemIDColNum = colNum;
               itemIDRowNumStart = rowNum + 1;
               var tmpCell = sheet[XLSX.utils.encode_cell({r: itemIDRowNumStart, c: itemIDColNum})];
               alert(tmpCell.v);
             }
             if (spNameTrigger === false) {
               for (var i = 0; i < accountingLocalVars.spNameStolichniy.length; i++) {
                 if (accountingLocalVars.spNameStolichniy[i] === nextCell.v) {
                   createObject(i, itemIDColNum, itemIDRowNumStart, colNum);
                   spNameTrigger = true;
                 }
               }
             }
           }
        }
    }

  };
  reader.readAsArrayBuffer(f);
}

function sheet2arr(sheet) {
   var result = [];
   var row;
   var rowNum;
   var colNum;
   var range = XLSX.utils.decode_range(sheet['!ref']);
   for(rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
      row = [];
       for(colNum=range.s.c; colNum<=range.e.c; colNum++){
          var nextCell = sheet[
             XLSX.utils.encode_cell({r: rowNum, c: colNum})
          ];
          if( typeof nextCell === 'undefined' ){
             row.push(void 0);
          } else row.push(nextCell.w);
       }
       result.push(row);
   }
   return result;
}

function numToAlpha(num) {
  var alpha = '';
  for (; num >= 0; num = parseInt(num / 26, 10) - 1) {
    alpha = String.fromCharCode(num % 26 + 0x41) + alpha;
  }
  return alpha;
}

function createObject(paramOne, paramTwo, paramThree, paramFour) {
  let raw = paramThree;
  let column = paramFour;
  accountingLocalVars.tmpSPName = accountingLocalVars.spNameStolichniy[paramOne];
  let spNameCell = sheet[XLSX.utils.encode_cell({r: paramThree, c: paramFour})];
  for (let i = 0; i < 7; i++) {

    if (typeof nextCell != 'undefined') {

    }
  }
  accountingLocalVars.tmpSalesQuantity = accountingLocalVars.sheet[XLSX.utils.encode_cell({r: paramFour, c: paramFive})];

  Object.defineProperty(accountingLocalVars.spNamesStolichniySales, accountingLocalVars.tmpSPName, {
     value: accountingLocalVars.stolichniySalesData,
     writable: true,
     enumerable: true,
     configurable: true
  });
}

$('#accounting').on('click', async function() {
  if (hidemenu == false) {  //an idiot attempt to hide menu from random people.
    await renderAccountingOptions();
  }
  toTop("connection-data");
});

$('#executeChoice').on('click', async function() {
  accountingLocalVars.dateControl = document.querySelector('input[type="date"]');
  for (var i = 0; i < 6; i++) {
    if (document.getElementById(accountingLocalVars.checkRadio[i]).checked == true) {
      accountingLocalVars.checkedValue = document.getElementById(accountingLocalVars.checkRadio[i]).value;
      accountingLocalVars.radioCheckedTrigger = true;
    }
  }
  for (var i = 0; i < 3; i++) {
    if (document.getElementById(accountingLocalVars.checkAccSubjectRadio[i]).checked == true) {
      accountingLocalVars.accSubjectCheckedValue = document.getElementById(accountingLocalVars.checkAccSubjectRadio[i]).value;
    }
  }
  if (accountingLocalVars.radioCheckedTrigger == false) {
    document.getElementById(accountingLocalVars.checkRadio[0]).checked = true;
    accountingLocalVars.checkedValue = document.getElementById(accountingLocalVars.checkRadio[0]).value;
  }
  accountingLocalVars.dateStart = $('input#dateStart').val();
  accountingLocalVars.dateEnd = $('input#dateEnd').val();
  $.post('../php/receiveReportData.php', {dbName: localStorage.getItem('dbName'), dbUser: localStorage.getItem('dbUser'),
                                          dbPassword: localStorage.getItem('dbPassword'), dateStart: accountingLocalVars.dateStart,
                                          dateEnd: accountingLocalVars.dateEnd, area: accountingLocalVars.checkedValue,
                                          accounting: accountingLocalVars.accounting,
                                          accSubject: accountingLocalVars.accSubjectCheckedValue}, await function(data) {
    try {
      accountingLocalVars.tmp = JSON.parse(data);
      createAccountantTables();
    } catch(e) {
      console.log(e);
    }
  });
});

this.createAccountantTables = function() {
  tableHeaderRowFunc();
  $('div#connection-data').html("");
  $(".accountantContainer").show();
  $('div#connection-data').append(" \
    <div id='accountantContainer' class='accountantContainer'> \
      <div id='closeAccountant' href='#' onclick='closeAccountantTable();'> \
        <div class='accountantSubject' style='float:left'>" + accountingLocalVars.accountantSubjectHead + ' ' + accountingLocalVars.dateStart + ' ' + accountingLocalVars.accountantSubjectDash + ' ' + accountingLocalVars.dateEnd + "</div> \
        <img width='30px' style='float:right' src='../images/icons/black-close-icon-3.png' /> \
      </div> \
      <div id='tableContainer'> \
        <table class='tableDataOne' id='tableDataOne'></table> \
        <table class='tableDataTwo' id='tableDataTwo'></table> \
        <table class='tableDataThree' id='tableDataThree'></table> \
      </div> \
    </div> \
  ");
  var tableHeaderRow = accountingLocalVars.tableHeaderRow;
  var count = 0;
  var triggerLee = true;
  var triggerChe = true;
  var triggerCheRoma = true;
  var tableRow;
  for (var i = 0; i < Object.keys(accountingLocalVars.tmp).length; i++) {
    if (accountingLocalVars.tmp[i].Quantity > 0) {
      if (accountingLocalVars.tmp[i].type === "???? ??????") {
        // accountingLocalVars.countLee += 1;
        // count += 1;
        var dTStrSource = accountingLocalVars.tmp[i].DateTimeDocLocal;
        var dt = new Date(dTStrSource);
        var dTStrOut = formatDate(dt);
        var taxNumber = accountingLocalVars.tmp[i].??????;
        var spID = accountingLocalVars.tmp[i].ID;

        if (accountingLocalVars.tmp[i].AgentID != 7) {
          if (taxNumber.trim().toString() != "2543122686" && taxNumber.trim().toString() != "2724235106" && taxNumber.trim().toString() != "2724187340") {
            accountingLocalVars.countLee += 1;
            count += 1;
            tableRow = '<tbody><tr> \
                                <td>' + count + '</td> \
                                <td>' + accountingLocalVars.tmp[i].InvoiceNumber + '</td> \
                                <td>' + accountingLocalVars.tmp[i].AgentID + '</td> \
                                <td>' + accountingLocalVars.tmp[i].???????????????????????? + '</td> \
                                <td>' + taxNumber + '</td> \
                                <td>' + accountingLocalVars.tmp[i].itemName + '</td> \
                                <td>' + accountingLocalVars.tmp[i].item + '</td> \
                                <td>' + accountingLocalVars.tmp[i].Price + '</td> \
                                <td>' + accountingLocalVars.tmp[i].Quantity + '</td> \
                                <td>' + accountingLocalVars.tmp[i].Total + '</td> \
                                <td>' + accountingLocalVars.tmp[i].InvoiceSum + '</td> \
                                <td>' + dTStrOut + '</td> \
                                <td>' + count + '</td> \
                                <td><pre>' + String(accountingLocalVars.tmp[i].accAddress) + '</pre></td> \
                              </tr></tbody>';
            if (triggerLee == true) {
               $("#tableDataTwo").html("?????????????? ???? ???? ??????");
               $("#tableDataTwo").append(tableHeaderRow);
               triggerLee = false;
            }
            $("#tableDataTwo").append(tableRow);
          }
          if (accountingLocalVars.tmp[i].AgentID == 5 || accountingLocalVars.tmp[i].AgentID == 2) {
            if (spID.trim() == 1208 || spID.trim() == 1872) {
              accountingLocalVars.countLee += 1;
              count += 1;
              tableRow = '<tbody><tr> \
                                  <td>' + count + '</td> \
                                  <td>' + accountingLocalVars.tmp[i].InvoiceNumber + '</td> \
                                  <td>' + accountingLocalVars.tmp[i].AgentID + '</td> \
                                  <td>' + accountingLocalVars.tmp[i].???????????????????????? + '</td> \
                                  <td>' + taxNumber + '</td> \
                                  <td>' + accountingLocalVars.tmp[i].itemName + '</td> \
                                  <td>' + accountingLocalVars.tmp[i].item + '</td> \
                                  <td>' + accountingLocalVars.tmp[i].Price + '</td> \
                                  <td>' + accountingLocalVars.tmp[i].Quantity + '</td> \
                                  <td>' + accountingLocalVars.tmp[i].Total + '</td> \
                                  <td>' + accountingLocalVars.tmp[i].InvoiceSum + '</td> \
                                  <td>' + dTStrOut + '</td> \
                                  <td>' + count + '</td> \
                                  <td><pre>' + String(accountingLocalVars.tmp[i].accAddress) + '</pre></td> \
                                </tr></tbody>';
              if (triggerLee == true) {
                 $("#tableDataTwo").html("?????????????? ???? ???? ??????");
                 $("#tableDataTwo").append(tableHeaderRow);
                 triggerLee = false;
              }
              $("#tableDataTwo").append(tableRow);
            }
          }
        }
        // if (accountingLocalVars.tmp[i].AgentID == 7) {
        //   tableRow = '<tbody><tr> \
        //                       <td>' + count + '</td> \
        //                       <td>' + accountingLocalVars.tmp[i].InvoiceNumber + '</td> \
        //                       <td>' + accountingLocalVars.tmp[i].AgentID + '</td> \
        //                       <td>' + accountingLocalVars.tmp[i].???????????????????????? + '</td> \
        //                       <td>' + taxNumber + '</td> \
        //                       <td>' + accountingLocalVars.tmp[i].itemName + '</td> \
        //                       <td>' + accountingLocalVars.tmp[i].item + '</td> \
        //                       <td>' + accountingLocalVars.tmp[i].Price + '</td> \
        //                       <td>' + accountingLocalVars.tmp[i].Quantity + '</td> \
        //                       <td>' + accountingLocalVars.tmp[i].Total + '</td> \
        //                       <td>' + accountingLocalVars.tmp[i].InvoiceSum + '</td> \
        //                       <td>' + dTStrOut + '</td> \
        //                     </tr></tbody>';
        // }
        //
        // if (triggerLee == true) {
        //    $("#tableDataTwo").html("?????????????? ???? ???? ??????");
        //    $("#tableDataTwo").append(tableHeaderRow);
        //    triggerLee = false;
        // }
        // $("#tableDataTwo").append(tableRow);
      }
      if (accountingLocalVars.tmp[i].type === "???? ??????") {
        var dTStrSource = accountingLocalVars.tmp[i].DateTimeDocLocal;
        var dt = new Date(dTStrSource);
        var dTStrOut = formatDate(dt);
        var taxNumber = accountingLocalVars.tmp[i].??????;

        if (accountingLocalVars.tmp[i].AgentID != 7) {
          if (taxNumber.trim().toString() != "2543122686" && taxNumber.trim().toString() != "2543115022") {
            accountingLocalVars.countCheRoma += 1;
            count += 1;
            tableRow = '<tbody><tr> \
                                <td>' + count + '</td> \
                                <td>' + accountingLocalVars.tmp[i].InvoiceNumber + '</td> \
                                <td>' + accountingLocalVars.tmp[i].AgentID + '</td> \
                                <td>' + accountingLocalVars.tmp[i].???????????????????????? + '</td> \
                                <td>' + taxNumber + '</td> \
                                <td>' + accountingLocalVars.tmp[i].itemName + '</td> \
                                <td>' + accountingLocalVars.tmp[i].item + '</td> \
                                <td>' + accountingLocalVars.tmp[i].Price + '</td> \
                                <td>' + accountingLocalVars.tmp[i].Quantity + '</td> \
                                <td>' + accountingLocalVars.tmp[i].Total + '</td> \
                                <td>' + accountingLocalVars.tmp[i].InvoiceSum + '</td> \
                                <td>' + dTStrOut + '</td> \
                                <td>' + count + '</td> \
                                <td><pre>' + String(accountingLocalVars.tmp[i].accAddress) + '</pre></td> \
                              </tr></tbody>';
            if (triggerCheRoma == true) {
               $("#tableDataThree").html("?????????????? ???? ???? ??????");
               $("#tableDataThree").append(tableHeaderRow);
               triggerCheRoma = false;
            }
            $("#tableDataThree").append(tableRow);
          }
        }
      }
      if (accountingLocalVars.tmp[i].type === "") {
        var dTStrSource = accountingLocalVars.tmp[i].DateTimeDocLocal;
        var dt = new Date(dTStrSource);
        var dTStrOut = formatDate(dt);
        var taxNumber = accountingLocalVars.tmp[i].??????;

        if (accountingLocalVars.tmp[i].AgentID != 7) {
          if (accountingLocalVars.tmp[i].????_????????????????????????.trim() != "?????? ??????" && accountingLocalVars.tmp[i].????_????????????????????????.trim() != "?????? ????????????????" && taxNumber.trim().toString() != "6501158938") {
            count += 1;
            accountingLocalVars.countChe += 1;
            tableRow = '<tbody><tr> \
                                <td>' + count + '</td> \
                                <td>' + accountingLocalVars.tmp[i].InvoiceNumber + '</td> \
                                <td>' + accountingLocalVars.tmp[i].AgentID + '</td> \
                                <td>' + accountingLocalVars.tmp[i].???????????????????????? + '</td> \
                                <td>' + taxNumber + '</td> \
                                <td>' + accountingLocalVars.tmp[i].itemName + '</td> \
                                <td>' + accountingLocalVars.tmp[i].item + '</td> \
                                <td>' + accountingLocalVars.tmp[i].Price + '</td> \
                                <td>' + accountingLocalVars.tmp[i].Quantity + '</td> \
                                <td>' + accountingLocalVars.tmp[i].Total + '</td> \
                                <td>' + accountingLocalVars.tmp[i].InvoiceSum + '</td> \
                                <td>' + dTStrOut + '</td> \
                                <td>' + count + '</td> \
                                <td><pre>' + String(accountingLocalVars.tmp[i].accAddress) + '</pre></td> \
                              </tr></tbody>';
            if (triggerChe == true) {
               $("#tableDataOne").html("?????????????? ???? ???? ????????");
               $("#tableDataOne").append(tableHeaderRow);
               triggerChe = false;
            }
            $("#tableDataOne").append(tableRow);
          }
        }
        if (accountingLocalVars.tmp[i].AgentID == 7) {
          count += 1;
          accountingLocalVars.countChe += 1;
          tableRow = '<tbody><tr> \
                              <td>' + count + '</td> \
                              <td>' + accountingLocalVars.tmp[i].InvoiceNumber + '</td> \
                              <td>' + accountingLocalVars.tmp[i].AgentID + '</td> \
                              <td>' + accountingLocalVars.tmp[i].???????????????????????? + '</td> \
                              <td>' + taxNumber + '</td> \
                              <td>' + accountingLocalVars.tmp[i].itemName + '</td> \
                              <td>' + accountingLocalVars.tmp[i].item + '</td> \
                              <td>' + accountingLocalVars.tmp[i].Price + '</td> \
                              <td>' + accountingLocalVars.tmp[i].Quantity + '</td> \
                              <td>' + accountingLocalVars.tmp[i].Total + '</td> \
                              <td>' + accountingLocalVars.tmp[i].InvoiceSum + '</td> \
                              <td>' + dTStrOut + '</td> \
                              <td>' + count + '</td> \
                              <td><pre>' + String(accountingLocalVars.tmp[i].accAddress) + '</pre></td> \
                            </tr></tbody>';
          if (triggerChe == true) {
             $("#tableDataOne").html("?????????????? ???? ???? ????????");
             $("#tableDataOne").append(tableHeaderRow);
             triggerChe = false;
          }
          $("#tableDataOne").append(tableRow);
        }
      }
    }
    // if (accountingLocalVars.tmp[i].type != "???? ??????" && accountingLocalVars.tmp[i].Quantity > 0) {
    //   countChe += 1;
    //   accountingLocalVars.countChe += 1;
    //   var dTStrSource = accountingLocalVars.tmp[i].DateTimeDocLocal;
    //   var dt = new Date(dTStrSource);
    //   var dTStrOut = formatDate(dt);
    //   var taxNumber = accountingLocalVars.tmp[i].??????;
    //   // var strTaxNumber = taxNumber.toString();
    //
    //   if (accountingLocalVars.tmp[i].AgentID != 7) {
    //     if (accountingLocalVars.tmp[i].????_????????????????????????.trim() != "?????? ??????" && accountingLocalVars.tmp[i].????_????????????????????????.trim() != "?????? ????????????????") {
    //       tableRow = '<tbody><tr> \
    //                           <td>' + countChe + '</td> \
    //                           <td>' + accountingLocalVars.tmp[i].InvoiceNumber + '</td> \
    //                           <td>' + accountingLocalVars.tmp[i].AgentID + '</td> \
    //                           <td>' + accountingLocalVars.tmp[i].???????????????????????? + '</td> \
    //                           <td>' + taxNumber + '</td> \
    //                           <td>' + accountingLocalVars.tmp[i].itemName + '</td> \
    //                           <td>' + accountingLocalVars.tmp[i].item + '</td> \
    //                           <td>' + accountingLocalVars.tmp[i].Price + '</td> \
    //                           <td>' + accountingLocalVars.tmp[i].Quantity + '</td> \
    //                           <td>' + accountingLocalVars.tmp[i].Total + '</td> \
    //                           <td>' + accountingLocalVars.tmp[i].InvoiceSum + '</td> \
    //                           <td>' + dTStrOut + '</td> \
    //                         </tr></tbody>';
    //     }
    //   }
    //   if (accountingLocalVars.tmp[i].AgentID == 7) {
    //     tableRow = '<tbody><tr> \
    //                         <td>' + countChe + '</td> \
    //                         <td>' + accountingLocalVars.tmp[i].InvoiceNumber + '</td> \
    //                         <td>' + accountingLocalVars.tmp[i].AgentID + '</td> \
    //                         <td>' + accountingLocalVars.tmp[i].???????????????????????? + '</td> \
    //                         <td>' + taxNumber + '</td> \
    //                         <td>' + accountingLocalVars.tmp[i].itemName + '</td> \
    //                         <td>' + accountingLocalVars.tmp[i].item + '</td> \
    //                         <td>' + accountingLocalVars.tmp[i].Price + '</td> \
    //                         <td>' + accountingLocalVars.tmp[i].Quantity + '</td> \
    //                         <td>' + accountingLocalVars.tmp[i].Total + '</td> \
    //                         <td>' + accountingLocalVars.tmp[i].InvoiceSum + '</td> \
    //                         <td>' + dTStrOut + '</td> \
    //                       </tr></tbody>';
    //   }
    //
    //   if (triggerChe == true) {
    //      $("#tableDataOne").html("?????????????? ???? ???? ????????");
    //      $("#tableDataOne").append(tableHeaderRow);
    //      triggerChe = false;
    //   }
    //   $("#tableDataOne").append(tableRow);
    // }
  }
  var saveTriggerLee = false;
  var saveTriggerChe = false;
  var saveTriggerCheRoma = false;
  var saveTriggerBtn = false;
  for (var i = 0; i < Object.keys(accountingLocalVars.tmp).length; i++) {
    if (accountingLocalVars.tmp[i].type == "???? ??????" && accountingLocalVars.tmp[i].Quantity > 0
        && saveTriggerLee == false) {
      saveTriggerLee = true;
    }
    if (accountingLocalVars.tmp[i].type == "" && accountingLocalVars.tmp[i].Quantity > 0
        && saveTriggerChe == false) {
      saveTriggerChe = true;
    }
    if (accountingLocalVars.tmp[i].type == "???? ??????" && accountingLocalVars.tmp[i].Quantity > 0
        && saveTriggerCheRoma == false) {
      saveTriggerCheRoma = true;
    }
  }
  if (saveTriggerCheRoma == true) {
    saveTriggerBtn = true;
    $("#tableContainer").append(" \
                                <br><br> \
                                <button id='saveAccountantCheRoma'>?????????????????? ???? ??????</button> \
                                <br><br> \
                                ");
  }
  if ((saveTriggerLee == true && saveTriggerChe == true) && saveTriggerBtn == false) {
    saveTriggerBtn = true;
    $("#tableContainer").append(" \
                                <br><br> \
                                <button id='saveAccountantLee'>?????????????????? ???? ??????</button> \
                                <button id='saveAccountantChe'>?????????????????? ???? ????????</button> \
                                <br><br> \
                                ");
  }
  if ((saveTriggerLee == false && saveTriggerChe == true) && saveTriggerBtn == false) {
    saveTriggerBtn = true;
    $("#tableContainer").append(" \
                                <br><br> \
                                <button id='saveAccountantChe'>?????????????????? ???? ????????</button> \
                                <br><br> \
                                ");
  }
  if ((saveTriggerLee == true && saveTriggerChe == false) && saveTriggerBtn == false) {
    saveTriggerBtn = true;
    $("#tableContainer").append(" \
                                <br><br> \
                                <button id='saveAccountantLee'>?????????????????? ???? ??????</button> \
                                <br><br> \
                                ");
  }
  let url = "../js/createexcel.js";
  $.getScript(url);
}

this.closeAccountantTable = function() {
  $(".accountantContainer").html("");
  $(".accountantContainer").hide();
  $("#connection-data").html("");
  $(".accountingMenuContainer").show();
  renderAccountingOptions();
}

this.renderAccountingOptions = function() {
  $('div#connection-data').html("");
  $('div#connection-data').append(" \
    <div id='accountingMenuContainer' class='accountingMenuContainer'> \
      <div class='panel panel-custom border'> \
        <div class='panel-heading col-100'><span>" + accountingLocalVars.choosePeriod + "</span></div> \
        <div class='panel-body'> \
          <div class='col-60'>" + accountingLocalVars.dateStartLabel + "</div><div class='col-40'><input type='date' id='dateStart'></div> \
          <div class='col-60'>" + accountingLocalVars.dateEndLabel + "</div><div class='col-40'><input type='date' id='dateEnd'></div> \
        </div> \
      </div> \
      <div class='panel panel-custom border'> \
        <div class='panel-heading col-100'><span>" + accountingLocalVars.chooseArea + "</span></div> \
        <div class='panel-body'> \
           <div class='radioContainer'><input type='radio' id='checkOne' name='chooseone' value='1'><label for='?????????? 1' id='radioLabel'>?????????? 1</label></div> \
           <div class='radioContainer'><input type='radio' id='checkTwo' name='chooseone' value='2'><label for='?????????? 2' id='radioLabel'>?????????? 2</label></div> \
           <div class='radioContainer'><input type='radio' id='checkThree' name='chooseone' value='3'><label for='?????????? 3' id='radioLabel'>?????????? 3</label></div> \
           <div class='radioContainer'><input type='radio' id='checkFour' name='chooseone' value='4'><label for='?????????? 4' id='radioLabel'>?????????? 4</label></div> \
           <div class='radioContainer'><input type='radio' id='checkFive' name='chooseone' value='5'><label for='?????????? 5' id='radioLabel'>?????????? 5</label></div> \
           <div class='radioContainer'><input type='radio' id='checkSeven' name='chooseone' value='7'><label for='?????????? 7' id='radioLabel'>?????????? 7</label></div> \
        </div> \
      </div> \
      <div class='panel panel-custom border'> \
        <div class='panel-heading col-100'><span>" + accountingLocalVars.chooseFileLabel + "</span></div> \
        <div class='panel-body'> \
           <div class='fileInput'><input type='file' id='file-input'></div> \
        </div> \
      </div> \
      <div class='panel panel-custom border'> \
        <div class='panel-heading col-100'><span>" + accountingLocalVars.chooseAccountantSubjectLabel + "</span></div> \
        <div class='panel-body'> \
          <div class='radioContainer'><input type='radio' id='checkOne' name='chooseAccSubject' value='1'><label for='???? ????????' id='radioLabel'>???? ????????</label></div> \
          <div class='radioContainer'><input type='radio' id='checkTwo' name='chooseAccSubject' value='2'><label for='???? ??????' id='radioLabel'>???? ??????</label></div> \
          <div class='radioContainer'><input type='radio' id='checkThree' name='chooseAccSubject' value='3'><label for='???? ??????' id='radioLabel'>???? ??????</label></div> \
        </div> \
      </div> \
      <div class='panel panel-custom border'> \
        <div class='panel-body'><input type='submit' id='executeChoice' value='?????????????????? ????????????'></div> \
      </div> \
    </div> \
  ");
  let url = "../js/accounting.js";
  $.getScript(url);
  if (accountingLocalVars.dateStart != "" && accountingLocalVars.dateEnd != "") {
     $('input#dateStart').val(accountingLocalVars.dateStart);
     $('input#dateEnd').val(accountingLocalVars.dateEnd);
  }
  $(".loginContainer").html("");
  $(".loginContainer").hide();
}
