var tableConstructor = {
   "tbodyOpen" : "<tbody>",
   "tbodyClose" : "</tbody>",
   "tdOpen" : "<td>",
   "tdClose" : "</td>",
   "trOpen" : "<tr>",
   "trClose" : "</tr>"
};

var blocks = {
   "divOpen" : "",
   "divClose" : "</div>",
   "spanOpen" : "",
   "spanClose" : "</span>",
   "labelOpen" : "",
   "labelClose" : "</label>",
   "input" : ""
};

var loginAdmin = {
  "loginSecurityData" : new Object(),
  "firstname" : "",
  "secondname" : "",
  "middlename" : "",
  "attribute" : ""
};

var agentStatus = {
  "area" : "Район: ",
  "endTriggerOne" : "",
  "endTriggerTwo" : "",
  "endTriggerThree" : "",
  "tmpAgentID" : "",
  "endTriggerFour" : "",
  "space" : " ",
  "salesTotal" : "На сумму: ",
  "salesCash" : "Наличный: ",
  "salesCashless" : "Безналичный: ",
  "debtSale" : "Реализация: ",
  "salesInvoicesQuantity" : "Накладных: ",
  "areaDevelopmentStatusLabel" : "Развитие: ",
  "lastSyncDateTime" : "Завершение: ",
  "responseDataObject" : new Object(),
  "areaStatusSalesSum" : new Object(),
  "areaStatusInvoicesNumber" : new Object(),
  "areaStatusLastSyncDateTime" : new Object(),
  "areaCashStatus" : new Object(),
  "areaCashlessStatus" : new Object(),
  "areaDevelopmentStatus" : new Object(),
  "tmpAgentID" : "",
  "endTriggerOne" : "",
  "endTriggerTwo" : "",
  "endTriggerThree" : "",
  "endTriggerFour" : "",
  "trigger" : false,
  "loginSecurityData" : new Object()
};

var analytics = {
  "checkRadio" : ["checkOne", "checkTwo", "checkThree", "checkFour", "checkFive", "checkSeven"],
  "checkedValue" : "",
  "dateControl" : "",
  "dateStart" : "",
  "dateEnd" : "",
  "tmp" : new Object(),
  "executeChoice" : "analyticsExecuteChoice",
  "subjectHead" : "Анализ продаж за период: ",
  "trigger" : false,
  "tmpQuantity" : 0,
  "quantity" : 0,
  "tmpExchangeQuantity" : 0,
  "exchange" : 0,
  "spoiled" : 0,
  "tmpName" : "",
  "salesQuantity" : new Object(),
  "exchangeQuantity" : new Object(),
  "exchangeSpoiled" : new Object()
};

var reportsLocalVars = {
  "ingredientsNameLabel" : "Ингредиент",
  "ingredientsQuantityLabel" : "Расход",
  "ingredientsIDLabel" : "Артикул",
  "ingredientsPriceLabel" : "Цена",
  "itemNameLabel" : "Номенклатура",
  "itemPriceLabel" : "Цена",
  "salesQuantityLabel" : "Кол-во",
  "sumLabel" : "Сумма",
  "exchangeQuantityLabel" : "Обмен",
  "returnQuantityLabel" : "Возврат",
  "IDLabel" : "№",
  "totalLabel" : "Сумма",
  "dateStartLabel" : "Начало периода:",
  "dateEndLabel" : "Конец периода:",
  "reportSubjectHeadIngredientsLabel" : "Краткий отчет расхода ингредиентов",
  "reportSubjectHeadSalesManagerLabel" : "Краткий отчет за период:",
  "reportSubjectHeadByNetCostLabel" : "Отчет относительно себестоимости:",
  "reportSubjectHeadCEOLabel" : "Подробный отчет за период:",
  "reportSubjectHeadByDayLabel" : "Сквозной отчет за период:",
  "reportSubjectHeadSalaryLabel" : "Расчетный лист за период: ",
  "reportSubjectDashLabel" : "---",
  "reportSubjectDash" : "",
  "totalNetWeightLabel" : "Чистая продажа вес",
  "totalNetQuantitySpecialLabel" : "Чистая продажа штучка (спец.категория)",
  "totalNetQuantityCanLabel" : "Чистая продажа ким-ча банка",
  "totalNetQuantityMustardLabel" : "Чистая продажа горчица",
  "totalNetQuantityOrdinaryLabel" : "Чистая продажа штучка (остальное)",
  "totalReturnLabel" : "Совокупный возврат",
  "totalSalaryLabel" : "Совокупный расчёт",
  "rateLabel" : "Кэф",
  "netQuantityLabel" : "Чистое",
  "salaryLabel" : "Зарплата",
  "totalExchangeWeightLabel" : "Всего обменов весовой (кг)",
  "totalReturnWeightLabel" : "Всего возвратов весовой (кг)",
  "totalExchangeQuantityLabel" : "Всего обменов в пачках (шт)",
  "totalReturnQuantityLabel" : "Всего возвратов в пачках (шт)",
  "totalExchangeSumLabel" : "Всего обменов",
  "totalReturnSumLabel" : "Всего возвратов",
  "totalSalesWeightLabel" : "Всего продаж весовой (кг)",
  "totalSalesQuantityLabel" : "Всего продаж в пачках (шт)",
  "totalSalesSumLabel" : "Всего продаж",
  "choosePeriodLabel" : "Выберите период",
  "chooseDayOfTheWeekLabel" : "Выберите день недели",
  "chooseAreaLable" : "Выберите район",
  "reportSubjectHeadPerDayLabel" : "Отчет по дням",
  "multipliedQuantityIngredients" : 0,
  "multipliedSumIngredients" : 0,
  "salary" : 0,
  "netQuantity" : 0,
  "quantity" : 0,
  "exchangeQuantity" : 0,
  "returnQuantity" : 0,
  "total" : 0,
  "totalNetCost" : 0,
  "exchangeSalaryLoss" : 0,
  "salesIngredientsQuantity" : new Object(),
  "salesIngredientsSum" : new Object(),
  "salesIngredientsQuantityYannim" : new Object(),
  "salesIngredientsSumYannim" : new Object(),
  "exchangeSalaryLossList" : new Object(),
  "netQuantityList" : new Object(),
  "salesQuantity" : new Object(),
  "salesExchange" : new Object(),
  "salesReturn" : new Object(),
  "salesTotal" : new Object(),
  "salesTotalNetCost" : new Object(),
  "tmp" : new Object(),
  "tmp2" : new Object(),
  "tmp3" : new Object(),
  "salesPartnersList" : new Object(),
  "agentSalaryRatesList" : new Object(),
  "agentSalaryRatesTmp" : new Object(),
  "salaryList" : new Object(),
  "tmpMultipliedQuantityIngredients" : 0,
  "tmpMultipliedSumIngredients" : 0,
  "tmpExchangeSalaryLoss" : 0,
  "tmpSalary" : 0,
  "tmpName" : "",
  "tmpNetQuantity" : 0,
  "tmpQuantity" : 0,
  "tmpExchange" : 0,
  "tmpReturn" : 0,
  "text" : "",
  "trigger" : false,
  "dateStart" : "",
  "dateEnd" : "",
  "tmpTotal" : 0,
  "reportSubjectHead" : "",
  "reportSubjectDash" : "",
  "totalNetWeight" : 0,
  "totalExchangeWeightLossSalary" : 0,
  "totalExchangeQuantityLossSalary" : 0,
  "totalReturnQuantityLossSalary" : 0,
  "totalReturnQuantityWeightLossSalary" : 0,
  "totalReturnWeightLossSalary" : 0,
  "totalNetQuantitySpecialSalary" : 0,
  "totalNetQuantityCanSalary" : 0,
  "totalNetQuantityMustardSalary" : 0,
  "totalNetQuantityOrdinarySalary" : 0,
  "totalNetWeightSalary" : 0,
  "totalSalary" : 0,
  "totalNetQuantitySpecial" : 0,
  "totalNetQuantityCan" : 0,
  "totalNetQuantityMustard" : 0,
  "totalNetQuantityOrdinary" : 0,
  "totalNetQuantity" : 0,
  "totalExchangeQuantity" : 0,
  "totalReturnQuantity" : 0,
  "totalExchangeQuantitySum" : 0,
  "totalExchangeQuantitySumNetCost" : 0,
  "totalReturnQuantitySum" : 0,
  "totalReturnQuantitySumNetCost" : 0,
  "totalExchangeWeight" : 0,
  "totalReturnWeight" : 0,
  "totalExchangeWeightSum" : 0,
  "totalExchangeWeightSumNetCost" : 0,
  "totalReturnWeightSum" : 0,
  "totalReturnWeightSumNetCost" : 0,
  "totalExchangeSum" : 0,
  "totalReturnSum" : 0,
  "totalExchangeSumNetCost" : 0,
  "totalReturnSumNetCost" : 0,
  "totalSalesQuantity" : 0,
  "totalSalesQuantitySum" : 0,
  "totalSalesQuantitySumNetCost" : 0,
  "totalSalesWeight" : 0,
  "totalSalesWeightSum" : 0,
  "totalSalesSum" : 0,
  "totalSalesWeightSumNetCost" : 0,
  "totalSalesSumNetCost" : 0,
  "dateControl" : document.querySelector('input[type="date"]'),
  "checkDayRadio" : ["checkDayOne", "checkDayTwo", "checkDayThree", "checkDayFour", "checkDayFive", "checkDaySix"],
  "checkedDayValue" : "",
  "checkAreaRadio" : ["checkAreaOne", "checkAreaTwo", "checkAreaThree", "checkAreaFour", "checkAreaFive", "checkAreaSeven"],
  "checkRootRadio" : ["checkRootMonday", "checkRootTuesday", "checkRootWendsday", "checkRootAny", "checkRootNorth"],
  "checkedAreaValue" : "",
  "radioCheckedAreaTrigger" : false,
  "radioCheckedDayTrigger" : false,
  "reportSubjectHeadCheckedDay" : "",
  "reportSubjectHeadCheckedArea" : "",
  "chooseSalesPartnerLable" : "Выберите магазин",
  "areaCurrentValue" : 0,
  "rootCurrentValue" : 0,
  "chooseRootLabel" : "Выберите маршрут",
  "areaTrigger" : false,
  "optionValue" : "",
  "checkSumErrorsTrigger" : true,
  "header" : "",
  "dummy" : ">"
};

var accountingLocalVars = {
  "itemName" : "Номенклатура",
  "itenmPrice" : "Цена",
  "quantity" : "Кол-во",
  "invoiceSum" : "Всего",
  "itemID" : "Артикул",
  "ID" : "№",
  "total" : "Сумма",
  "invoiceID" : "Накладная №",
  "areaID" : "Район",
  "salesPartnerName" : "Контрагент(наименование)",
  "taxPayerID" : "ИНН",
  "date" : "Дата",
  "salesPartnerOfficialName" : "Организация",
  "dateStartLabel" : "Начало периода:",
  "dateEndLabel" : "Конец периода:",
  "dateStart" : "",
  "dateEnd" : "",
  "dash" : "---",
  "choosePeriod" : "Выберите период",
  "chooseArea" : "Выберите район",
  "checkRadio" : ["checkOne", "checkTwo", "checkThree", "checkFour", "checkFive", "checkSeven"],
  "checkedValue" : "",
  "tmp" : new Object(),
  "spNamesStolichniySales" : new Object(),
  "stolichniySalesData" : new Object(),
  "stolichniyItems" : new Object(),
  "stolichniyQuantity" : new Object(),
  "stolichniyExchange" : new Object(),
  "accounting" : "1",
  "salesListLee" : [],
  "salesListChe" : [],
  "listLeeElem" : [],
  "listCheElem" : [],
  "accountantSubjectHead" : "Продажи провод за период: ",
  "accountantSubjectDash" : " --- ",
  "countChe" : 0,
  "countLee" : 0,
  "countCheRoma" : 0,
  "radioCheckedTrigger" : false,
  "dateControl" : "",
  "chooseFileLabel" : "Выберите файл (Столичные)",
  "spNameStolichniy" : ["Гастроном В-Лазер", "Столичный 41-ый км (ж/д 83Б)", "Столичный №16", "Столичный Дальнее", "Столичный Егорка (1-ый этаж)",
  "Столичный Калинка (Продукты)", "Столичный Луговое (Продукты)", "Столичный Мегаполис (Продукты)", "Столичный Мозаика", "Столичный Москва",
  "Столичный Невельск", "Столичный Родной", "Столичный Северный ветер", "Столичный Сити-Молл", "Столичный Славянский базар", "Столичный ТДЦ",
  "Столичный Холмск 1", "Столичный Холмск 3", "Столичный Час Пик", "Фабрика Вкуса Пограничная", "Столичный Поронайск", "Фабрика Вкуса Макаров"],
  "tableHeaderRow" : "",
  "tmpSPName" : "",
  "tmpSalesQuantity" : "",
  "sheet" : "",
  "chooseAccountantSubjectLabel" : "С каким ИП работать?",
  "checkAccSubjectRadio" : ["checkOne", "checkTwo", "checkThree"],
  "accSubjectCheckedValue" : "",
  "chooseAccChe" : "ИП один",
  "chooseAccLee" : "ИП два",
  "chooseAccCheRoma" : "ИП три"
};

var warehouseLocalVars = {
  "itemNameLabel" : "Номенклатура"
};

var commonLabels = {
  "itemName" : "Номенклатура",
  "itenmPrice" : "Цена",
  "quantity" : "Кол-во",
  "exchangeQuantity" : "Обмен",
  "exchangeExpired" : "Просрочка",
  "exchangeSpoiled" : "Брак",
  "invoiceSum" : "Всего",
  "itemID" : "Артикул",
  "ID" : "№",
  "total" : "Сумма",
  "invoiceID" : "Накладная №",
  "areaID" : "Район",
  "salesPartnerName" : "Контрагент(наименование)",
  "taxPayerID" : "ИНН",
  "date" : "Дата",
  "salesPartnerOfficialName" : "Организация",
  "dateStartLabel" : "Начало периода:",
  "dateEndLabel" : "Конец периода:",
  "dateStart" : "",
  "dateEnd" : "",
  "dash" : "---",
  "choosePeriod" : "Выберите период",
  "chooseArea" : "Выберите район",
  "tableHeaderRow" : "",
  "difference" : "разница",
  "evaluation" : "оценка"
};

var analyticsStyles = {
  "styles" : ["", "", "", "", "", ""],
  "style" : ""
};

var changeDBTablesLocalVars = {
  "someLabel" : "Nothing yet here",
  "dbChangeLabel" : "Управление Базой Данных",
  "chooseTableToChangeLabel" : "Выберите подменю для работы",
  "chooseSPTableToChangeLabel" : "Выберите район контрагентов",
  "chooseSalesTableToChangeLabel" : "Выберите район продаж",
  "chooseReceiveTableToChangeLabel" : "Выберите район загрузки",
  "chooseItemsTableToChangeLabel" : "Выберите вариант изменения номенклатуры",
  "chooseItemsBasicTableToChangeLabel" : "Изменить общую номенклатуру",
  "chooseItemsDiscountTableToChangeLabel" : "Изменить индивидуальные скидки",
  "areaCurrentValue" : "",
  "salesPartnersList" : new Object(),
  "chooseSalesPartnerLable" : "Выберите контрагента из списка",
  "selectedSPID" : "",
  "spGetName" : new Object(),
  "spGetLegalName" : new Object(),
  "spGetArea" : new Object(),
  "spGetDayOfTheWeek" : new Object(),
  "spGetTaxNumber" : new Object(),
  "spGetAccType" : new Object(),
  "spGetAddress" : new Object(),
  "spGetContacts" : new Object(),
  "spGetCurrState" : new Object(),
  "spGetLattitude" : new Object(),
  "spGetLongitude" : new Object(),
  "spGetByPass" : new Object(),
  "spGetAccSubject" : new Object(),
  "spGetAccAddress" : new Object(),
  "tmpName" : "",
  "tmpID" : "",
  "spInfoLable" : "Подробные сведения об контрагенте",
  "statusUpdateData" : new Object(),
  "reloadTrigger" : false,
  "backButton" : new Object(),
  "backButtonTriggers" : ["spName", "spLegalName", "spArea", "spRoot", "spTaxNumber", "spAccType", "spAddress", "spContacts", "spCurrState", "spLattitude", "spLongitude", "spByPass", "spAccSubject", "spAccAddress"],
  "logFileData" : ""
};

var hidemenu = true;

var receivedAgentStatus;

function blockConstructor(blockBlock, classBlock, idBlock, typeBlock, nameBlock, forBlock, valueBlock) {

}

function toTop(el) {

  let element = document.getElementById(el);
  element.scrollIntoView();
  element.scrollIntoView(false);
  element.scrollIntoView({block: "end"});
  element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}
