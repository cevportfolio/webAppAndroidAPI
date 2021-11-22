$('#analytics').on('click', function() {
    renderAnalyticsOptions();
    toTop("connection-data");
});

$('#analyticsExecuteChoiceDetailed').on('click', function() {
  recieveAnalyticsData('analyticsExecuteChoiceDetailed');
});

$('#analyticsExecuteChoiceSummary').on('click', function() {
  recieveAnalyticsData('analyticsExecuteChoiceSummary');
});

$('#analyticsExecuteChoiceRaw').on('click', function() {
  recieveAnalyticsData('analyticsExecuteChoiceRaw');
});

$('#analyticsExecuteChoiceDetailedSummary').on('click', function() {
  recieveAnalyticsData('analyticsExecuteChoiceDetailedSummary');
});

$('#analyticsExecuteChoiceExchange').on('click', function() {
  recieveAnalyticsData('analyticsExecuteChoiceExchange');
});

this.recieveAnalyticsData = async function(type) {
  analytics.dateControl = document.querySelector('input[type="date"]');
  let analyticsType = document.getElementById(type).value;
  let analyticsAreaTrigger = false;
  for (var i = 0; i < 6; i++) {
    if (document.getElementById(analytics.checkRadio[i]).checked == true) {
      analytics.checkedValue = document.getElementById(analytics.checkRadio[i]).value;
      analyticsAreaTrigger = true;
    }
  }
  analytics.dateStart = $('input#dateStart').val();
  analytics.dateEnd = $('input#dateEnd').val();
  if (analyticsAreaTrigger == true && agentStatus.loginSecurityData[0].agentArea == analytics.checkedValue) {
    await $.post('../php/receiveReportData.php', {dbName: localStorage.getItem('dbName'), dbUser: localStorage.getItem('dbUser'),
                                            dbPassword: localStorage.getItem('dbPassword'), dateStart: analytics.dateStart,
                                            dateEnd: analytics.dateEnd, area: analytics.checkedValue,
                                            reportType: "analytics"}, function(data) {
      analytics.tmp = JSON.parse(data);
    });
  } else {
    if (agentStatus.loginSecurityData[0].attribute == "ceo" ||
        agentStatus.loginSecurityData[0].attribute == "admin" ||
        agentStatus.loginSecurityData[0].attribute == "super") {
          await $.post('../php/receiveReportData.php', {dbName: localStorage.getItem('dbName'), dbUser: localStorage.getItem('dbUser'),
                                                  dbPassword: localStorage.getItem('dbPassword'), dateStart: analytics.dateStart,
                                                  dateEnd: analytics.dateEnd, area: analytics.checkedValue,
                                                  reportType: "analytics"}, function(data) {
            analytics.tmp = JSON.parse(data);
          });
    } else {
      alert("У вас нет прав на это действие");
    }
  }

  if (analyticsType == "Сводный анализ" || analyticsType == "Чистый сводный") {
    await calcAnalytics();
    await createAnalyticsReport(analyticsType);
  } else if (analyticsType == "Подробный анализ" || analyticsType == "Без анализа") {
    await createAnalyticsReport(analyticsType);
  } else {
    await calcAnalytics();
    await createAnalyticsReport(analyticsType);
  }
}

this.tableHeaderRowFunc = function(analyticsType) {
  if (analyticsType == 'Подробный анализ' || analyticsType == 'Без анализа') {
    commonLabels.tableHeaderRow  = tableConstructor.tbodyOpen + tableConstructor.trOpen +
                                          tableConstructor.tdOpen + commonLabels.ID + tableConstructor.tdClose +
                                          tableConstructor.tdOpen + commonLabels.invoiceID + tableConstructor.tdClose +
                                          tableConstructor.tdOpen + commonLabels.areaID + tableConstructor.tdClose +
                                          tableConstructor.tdOpen + commonLabels.salesPartnerName + tableConstructor.tdClose +
                                          tableConstructor.tdOpen + commonLabels.itemName + tableConstructor.tdClose +
                                          tableConstructor.tdOpen + commonLabels.quantity + tableConstructor.tdClose +
                                          tableConstructor.tdOpen + commonLabels.exchangeQuantity + tableConstructor.tdClose +
                                          tableConstructor.tdOpen + commonLabels.invoiceSum + tableConstructor.tdClose +
                                          tableConstructor.tdOpen + commonLabels.date + tableConstructor.tdClose +
                                          tableConstructor.trClose + tableConstructor.tbodyClose;
  } else if (analyticsType == 'Сводный анализ' || analyticsType == 'Чистый сводный') {
    commonLabels.tableHeaderRow  = tableConstructor.tbodyOpen + tableConstructor.trOpen +
                                          tableConstructor.tdOpen + commonLabels.ID + tableConstructor.tdClose +
                                          tableConstructor.tdOpen + commonLabels.salesPartnerName + tableConstructor.tdClose +
                                          tableConstructor.tdOpen + commonLabels.itemName + tableConstructor.tdClose +
                                          tableConstructor.tdOpen + commonLabels.quantity + tableConstructor.tdClose +
                                          tableConstructor.tdOpen + commonLabels.exchangeQuantity + tableConstructor.tdClose +
                                          tableConstructor.tdOpen + commonLabels.difference + tableConstructor.tdClose +
                                          tableConstructor.tdOpen + commonLabels.evaluation + tableConstructor.tdClose +
                                          tableConstructor.trClose + tableConstructor.tbodyClose;
  } else {
    commonLabels.tableHeaderRow  = tableConstructor.tbodyOpen + tableConstructor.trOpen +
                                          tableConstructor.tdOpen + commonLabels.ID + tableConstructor.tdClose +
                                          tableConstructor.tdOpen + commonLabels.salesPartnerName + tableConstructor.tdClose +
                                          tableConstructor.tdOpen + commonLabels.itemName + tableConstructor.tdClose +
                                          tableConstructor.tdOpen + commonLabels.quantity + tableConstructor.tdClose +
                                          tableConstructor.tdOpen + commonLabels.exchangeQuantity + tableConstructor.tdClose +
                                          tableConstructor.tdOpen + commonLabels.exchangeExpired + tableConstructor.tdClose +
                                          tableConstructor.tdOpen + commonLabels.exchangeSpoiled + tableConstructor.tdClose +
                                          tableConstructor.trClose + tableConstructor.tbodyClose;
  }
}

this.renderAnalyticsOptions = function() {
  let currScriptName = "analytics";
  $('div#connection-data').html("");
  $('div#connection-data').append(" \
    <div id='" + currScriptName + " menuContainer' class='" + currScriptName + " menuContainer'> \
      <div class='panel panel-custom border'> \
        <div class='panel-heading col-100'><span>" + commonLabels.choosePeriod + "</span></div> \
        <div class='panel-body'> \
          <div class='col-60'>" + commonLabels.dateStartLabel + "</div><div class='col-40'><input type='date' id='dateStart'></div> \
          <div class='col-60'>" + commonLabels.dateEndLabel + "</div><div class='col-40'><input type='date' id='dateEnd'></div> \
        </div> \
      </div> \
      <div class='panel panel-custom border'> \
        <div class='panel-heading col-100'><span>" + commonLabels.chooseArea + "</span></div> \
        <div class='panel-body'> \
           <div class='radioContainer'><input type='radio' id='checkOne' name='chooseone' value='1'><label for='Район 1' id='radioLabel'>Район 1</label></div> \
           <div class='radioContainer'><input type='radio' id='checkTwo' name='chooseone' value='2'><label for='Район 2' id='radioLabel'>Район 2</label></div> \
           <div class='radioContainer'><input type='radio' id='checkThree' name='chooseone' value='3'><label for='Район 3' id='radioLabel'>Район 3</label></div> \
           <div class='radioContainer'><input type='radio' id='checkFour' name='chooseone' value='4'><label for='Район 4' id='radioLabel'>Район 4</label></div> \
           <div class='radioContainer'><input type='radio' id='checkFive' name='chooseone' value='5'><label for='Район 5' id='radioLabel'>Район 5</label></div> \
           <div class='radioContainer'><input type='radio' id='checkSeven' name='chooseone' value='7'><label for='Район 7' id='radioLabel'>Район 7</label></div> \
        </div> \
      </div> \
      <div class='panel panel-custom border'> \
        <div class='panel-body'> \
          <div class='col-50'><input type='submit' id='analyticsExecuteChoiceDetailed' value='Подробный анализ'></div> \
          <div class='col-50'><input type='submit' id='analyticsExecuteChoiceSummary' value='Сводный анализ'></div> \
          <div class='col-50'><input type='submit' id='analyticsExecuteChoiceRaw' value='Без анализа'></div> \
          <div class='col-50'><input type='submit' id='analyticsExecuteChoiceDetailedSummary' value='Чистый сводный'></div> \
          <div class='col-50'><input type='submit' id='analyticsExecuteChoiceExchange' value='Обмены'></div> \
        </div> \
      </div> \
    </div> \
  ");
  let url = "../js/analytics.js";
  $.getScript(url);

  if (commonLabels.dateStart != "" && commonLabels.dateEnd != "") {
     $('input#dateStart').val(commonLabels.dateStart);
     $('input#dateEnd').val(commonLabels.dateEnd);
  }
  $(".loginContainer").html("");
  $(".loginContainer").hide();
}

this.createAnalyticsReport = function(analyticsType) {
  let currScriptName = "analytics";
  tableHeaderRowFunc(analyticsType);
  $('div#connection-data').html("");
  $(".analytics").show();
  $('div#connection-data').append(" \
    <div id='" + currScriptName + "Container' class='" + currScriptName + " container'> \
      <div id='closeAnalytics' href='#' onclick='closeAnalyticsTable();'> \
        <img width='30px' style='float:right' src='../images/icons/black-close-icon-3.png' /> \
        <div class='analyticsSubject' style='float:left'>" + analytics.subjectHead + ' ' + analytics.dateStart + ' ' + commonLabels.dash + ' ' + analytics.dateEnd + "</div> \
      </div> \
      <div id='tableContainer'> \
        <table class='tableDataAnalytics' id='tableDataAnalytics'></table> \
        <table class='tableDataAnalyticsSummary' id='tableDataAnalyticsSummary'></table> \
      </div> \
    </div> \
  ");
  renderAnalyticsTable(analyticsType);
  if (analyticsType == 'Подробный анализ' || analyticsType == 'Без анализа') {
    $("#tableContainer").append(" \
                                <br><br> \
                                <button id='saveAnalytics'>Сохранить Аналитику</button> \
                                <br><br> \
                                ");
  } else if (analyticsType == 'Сводный анализ' || analyticsType == 'Чистый сводный') {
    $("#tableContainer").append(" \
                                <br><br> \
                                <button id='saveAnalyticsSummary'>Сохранить Сводку</button> \
                                <br><br> \
                                ");
  } else {
    $("#tableContainer").append(" \
                                <br><br> \
                                <button id='saveAnalyticsExchange'>Сохранить Анализ Обменов</button> \
                                <br><br> \
                                ");
  }
  url = "../js/createexcel.js";
  $.getScript(url);
}

this.renderAnalyticsTable = function(analyticsType) {

  var tableHeaderRow = commonLabels.tableHeaderRow;
  var count = 0;
  let triggerAnalytics = true;
  var tableRow;
  if (analyticsType == 'Подробный анализ' || analyticsType == 'Без анализа') {
    for (var i = 0; i < Object.keys(analytics.tmp).length; i++) {
      if (analyticsType == 'Подробный анализ') {
        if (parseFloat(analytics.tmp[i].ExchangeQuantity) >= parseFloat(analytics.tmp[i].Quantity)) {

          var dTStrSource = analytics.tmp[i].DateTimeDocLocal;
          var dt = new Date(dTStrSource);
          var dTStrOut = formatDate(dt);
          count += 1;
          tableRow = '<tbody><tr> \
                              <td>' + count + '</td> \
                              <td>' + analytics.tmp[i].InvoiceNumber + '</td> \
                              <td>' + analytics.tmp[i].AgentID + '</td> \
                              <td>' + analytics.tmp[i].spName + '</td> \
                              <td>' + analytics.tmp[i].itemName + '</td> \
                              <td>' + analytics.tmp[i].Quantity + '</td> \
                              <td>' + analytics.tmp[i].ExchangeQuantity + '</td> \
                              <td>' + analytics.tmp[i].InvoiceSum + '</td> \
                              <td>' + dTStrOut + '</td> \
                            </tr></tbody>';
          if (triggerAnalytics == true) {
             $("#tableDataAnalytics").html("");
             $("#tableDataAnalytics").append(tableHeaderRow);
             triggerAnalytics = false;
          }
          $("#tableDataAnalytics").append(tableRow);
        }
      }
      if (analyticsType == 'Без анализа') {
        var dTStrSource = analytics.tmp[i].DateTimeDocLocal;
        var dt = new Date(dTStrSource);
        var dTStrOut = formatDate(dt);
        count += 1;
        tableRow = '<tbody><tr> \
                            <td>' + count + '</td> \
                            <td>' + analytics.tmp[i].InvoiceNumber + '</td> \
                            <td>' + analytics.tmp[i].AgentID + '</td> \
                            <td>' + analytics.tmp[i].spName + '</td> \
                            <td>' + analytics.tmp[i].itemName + '</td> \
                            <td>' + analytics.tmp[i].Quantity + '</td> \
                            <td>' + analytics.tmp[i].ExchangeQuantity + '</td> \
                            <td>' + analytics.tmp[i].InvoiceSum + '</td> \
                            <td>' + dTStrOut + '</td> \
                          </tr></tbody>';

        if (triggerAnalytics == true) {
           $("#tableDataAnalytics").html("");
           $("#tableDataAnalytics").append(tableHeaderRow);
           triggerAnalytics = false;
        }
        $("#tableDataAnalytics").append(tableRow);
      }
    }
  } else {
    for (var i = 0; i < Object.keys(analytics.salesQuantity).length; i++) {
      if (analyticsType == 'Сводный анализ') {
        count += 1;
        tableRow = '<tbody><tr> \
                            <td>' + count + '</td> \
                            <td>' + (Object.keys(analytics.salesQuantity)[i]).slice(0, (Object.keys(analytics.salesQuantity)[i]).indexOf(" --- ")) + '</td> \
                            <td>' + (Object.keys(analytics.salesQuantity)[i]).slice((Object.keys(analytics.salesQuantity)[i]).indexOf(" --- ") + 4) + '</td> \
                            <td>' + analytics.salesQuantity[Object.keys(analytics.salesQuantity)[i]].toFixed(2) + '</td> \
                            <td>' + analytics.exchangeQuantity[Object.keys(analytics.salesQuantity)[i]].toFixed(2) + '</td> \
                            <td>' + (analytics.salesQuantity[Object.keys(analytics.salesQuantity)[i]].toFixed(2) - analytics.exchangeQuantity[Object.keys(analytics.salesQuantity)[i]].toFixed(2)).toFixed(2) + '</td> \
                            <td>' + "---" + '</td> \
                          </tr></tbody>';

        if (triggerAnalytics == true) {
           $("#tableDataAnalyticsSummary").html("");
           $("#tableDataAnalyticsSummary").append(tableHeaderRow);
           triggerAnalytics = false;
        }
        $("#tableDataAnalyticsSummary").append(tableRow);
      }
      if (analyticsType == 'Чистый сводный') {
        if ((analytics.salesQuantity[Object.keys(analytics.salesQuantity)[i]].toFixed(2) - analytics.exchangeQuantity[Object.keys(analytics.salesQuantity)[i]].toFixed(2)).toFixed(2) <= 0) {
          count += 1;
          tableRow = '<tbody><tr> \
                              <td>' + count + '</td> \
                              <td>' + (Object.keys(analytics.salesQuantity)[i]).slice(0, (Object.keys(analytics.salesQuantity)[i]).indexOf(" --- ")) + '</td> \
                              <td>' + (Object.keys(analytics.salesQuantity)[i]).slice((Object.keys(analytics.salesQuantity)[i]).indexOf(" --- ") + 4) + '</td> \
                              <td>' + analytics.salesQuantity[Object.keys(analytics.salesQuantity)[i]].toFixed(2) + '</td> \
                              <td>' + analytics.exchangeQuantity[Object.keys(analytics.salesQuantity)[i]].toFixed(2) + '</td> \
                              <td>' + (analytics.salesQuantity[Object.keys(analytics.salesQuantity)[i]].toFixed(2) - analytics.exchangeQuantity[Object.keys(analytics.salesQuantity)[i]].toFixed(2)).toFixed(2) + '</td> \
                              <td>' + "---" + '</td> \
                            </tr></tbody>';

          if (triggerAnalytics == true) {
             $("#tableDataAnalyticsSummary").html("");
             $("#tableDataAnalyticsSummary").append(tableHeaderRow);
             triggerAnalytics = false;
          }
          $("#tableDataAnalyticsSummary").append(tableRow);
        }
      }
      if (analyticsType == 'Обмены') {
        if (analytics.exchangeQuantity[Object.keys(analytics.salesQuantity)[i]].toFixed(2) > 0) {
          count += 1;
          tableRow = '<tbody><tr> \
                              <td>' + count + '</td> \
                              <td>' + (Object.keys(analytics.salesQuantity)[i]).slice(0, (Object.keys(analytics.salesQuantity)[i]).indexOf(" --- ")) + '</td> \
                              <td>' + (Object.keys(analytics.salesQuantity)[i]).slice((Object.keys(analytics.salesQuantity)[i]).indexOf(" --- ") + 4) + '</td> \
                              <td>' + analytics.salesQuantity[Object.keys(analytics.salesQuantity)[i]].toFixed(2) + '</td> \
                              <td>' + analytics.exchangeQuantity[Object.keys(analytics.salesQuantity)[i]].toFixed(2) + '</td> \
                              <td>' + (analytics.exchangeQuantity[Object.keys(analytics.salesQuantity)[i]].toFixed(2) - analytics.exchangeSpoiled[Object.keys(analytics.salesQuantity)[i]].toFixed(2)).toFixed(2) + '</td> \
                              <td>' + analytics.exchangeSpoiled[Object.keys(analytics.salesQuantity)[i]].toFixed(2) + '</td> \
                            </tr></tbody>';

          if (triggerAnalytics == true) {
             $("#tableDataAnalyticsSummary").html("");
             $("#tableDataAnalyticsSummary").append(tableHeaderRow);
             triggerAnalytics = false;
          }
          $("#tableDataAnalyticsSummary").append(tableRow);
        }
      }
    }
  }
}

this.calcAnalytics = function() {

  for (var i = 0; i < Object.keys(analytics.tmp).length; i++) {
    analytics.trigger = false;
    if (Object.keys(analytics.salesQuantity).length > 0) {
      for (var key in analytics.salesQuantity) {
        if (key == (analytics.tmp[i].spName + " --- " + analytics.tmp[i].itemName)) {
          createObject(0, 1, i);
        }
      }
      if (analytics.trigger == false) {
        createObject(0, 0, i);
      }
    } else {
      createObject(0, 0, i);
    }
  }
}

this.createObject = function(paramOne, paramTwo, paramThree) {

  analytics.tmpName = analytics.tmp[paramThree].spName + " --- " + analytics.tmp[paramThree].itemName;
  analytics.tmpQuantity = parseFloat(analytics.tmp[paramThree].Quantity, 10);
  analytics.tmpExchangeQuantity = parseFloat(analytics.tmp[paramThree].ExchangeQuantity, 10);

  //Redefined "Surplus" field and functionality to "differentiate exchange functionality" in order not to make changes to Android app.
  analytics.tmpExchangeSpoiled = parseFloat(analytics.tmp[paramThree].Surplus, 10);

  if (paramTwo == 0) {

    Object.defineProperty(analytics.salesQuantity, analytics.tmpName, {
       value: analytics.tmpQuantity,
       writable: true,
       enumerable: true,
       configurable: true
    });

    Object.defineProperty(analytics.exchangeQuantity, analytics.tmpName, {
       value: analytics.tmpExchangeQuantity,
       writable: true,
       enumerable: true,
       configurable: true
    });

    Object.defineProperty(analytics.exchangeSpoiled, analytics.tmpName, {
       value: analytics.tmpExchangeSpoiled,
       writable: true,
       enumerable: true,
       configurable: true
    });
  }
  if (paramTwo == 1) {

    analytics.quantity = parseFloat(analytics.salesQuantity[analytics.tmpName], 10) + parseFloat(analytics.tmpQuantity, 10);
    analytics.salesQuantity[analytics.tmpName] = analytics.quantity;

    analytics.exchange = parseFloat(analytics.exchangeQuantity[analytics.tmpName], 10) + parseFloat(analytics.tmpExchangeQuantity, 10);
    analytics.exchangeQuantity[analytics.tmpName] = analytics.exchange;

    analytics.spoiled = parseFloat(analytics.exchangeSpoiled[analytics.tmpName], 10) + parseFloat(analytics.tmpExchangeSpoiled, 10);
    analytics.exchangeSpoiled[analytics.tmpName] = analytics.spoiled;

    analytics.trigger = true;
  }
}

this.closeAnalyticsTable = function() {
  $(".analytics container").html("");
  $(".analytics container").hide();
  $("#connection-data").html("");
  $(".analytics menuContainer").show();
  renderAnalyticsOptions();
}
