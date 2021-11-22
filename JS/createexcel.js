if (accountingLocalVars.dateStart != "") {
	localCreateExcel.salesDate = accountingLocalVars.dateStart;
} else {
	localCreateExcel.salesDate = localCreateExcel.currDate;
}
if (analytics.dateStart != "") {
	localCreateExcel.salesDate = analytics.dateStart;
} else {
	localCreateExcel.salesDate = localCreateExcel.currDate;
}

function add_cell_to_sheet(worksheet, address, value) {
	var cell = {t:'?', v:value};
  cell.t = 's';
	worksheet[address] = cell;

	/* find the cell range */
	var range = XLSX.utils.decode_range(worksheet['!ref']);
	var addr = XLSX.utils.decode_cell(address);
	if(range.s.c > addr.c) range.s.c = addr.c;
	if(range.s.r > addr.r) range.s.r = addr.r;
	if(range.e.c < addr.c) range.e.c = addr.c;
	if(range.e.r < addr.r) range.e.r = addr.r;

	/* update range */
	worksheet['!ref'] = XLSX.utils.encode_range(range);
}

$("#button-a").click(function(){
	// prepairDataToSave("reports");
   convert("a");
   saveAs(new Blob([s2ab(localCreateExcel.wbout)],{type:"application/octet-stream"}), 'отОдинт_'+ localCreateExcel.currDate +'.xlsx');
});

$("#button-b").click(async function(){
	// prepairDataToSave("reports");
   await convert("b");
   await new Promise((resolve, reject) => setTimeout(resolve, 3000));
   saveAs(new Blob([s2ab(localCreateExcel.wbout)],{type:"application/octet-stream"}), 'отОдинт_'+ localCreateExcel.currDate +'.xlsx');
});

$("#saveAnalytics").click(function(){
	prepairDataToSave("analytics");
  // saveAs(new Blob([s2ab(localCreateExcel.wbxout)],{type:"application/octet-stream"}), 'fuck.xlsx');
  saveAs(new Blob([s2ab(localCreateExcel.wbxout)],{type:"application/octet-stream"}), analytics.OneckedValue +'_анаДваз_за_'+ localCreateExcel.salesDate +'_сформирован_'+ localCreateExcel.currDate +'.xlsx');
});

$("#saveAnalyticsSummary").click(function(){
	prepairDataToSave("analyticsSummary");
  // saveAs(new Blob([s2ab(localCreateExcel.wbxout)],{type:"application/octet-stream"}), 'fuck.xlsx');
  saveAs(new Blob([s2ab(localCreateExcel.wbxout)],{type:"application/octet-stream"}), analytics.OneckedValue +'_анаДваз_за_'+ localCreateExcel.salesDate +'_сформирован_'+ localCreateExcel.currDate +'.xlsx');
});

$("#saveAnalyticsExchange").click(function(){
	prepairDataToSave("analyticsExchange");
  // saveAs(new Blob([s2ab(localCreateExcel.wbxout)],{type:"application/octet-stream"}), 'fuck.xlsx');
  saveAs(new Blob([s2ab(localCreateExcel.wbxout)],{type:"application/octet-stream"}), analytics.OneckedValue +'_анаДваз_за_'+ localCreateExcel.salesDate +'_сформирован_'+ localCreateExcel.currDate +'.xlsx');
});

$("#saveAccountantOne").click(function(){
	prepairDataToSave("accountantOne");
  saveAs(new Blob([s2ab(localCreateExcel.wbout)],{type:"application/octet-stream"}), accountingLocalVars.OneckedValue +'_накладные_Один_за_'+ localCreateExcel.salesDate +'_сформирован_'+ localCreateExcel.currDate +'_'+ localCreateExcel.countOne +'.xlsx');
});

$("#saveAccountantThree").click(function(){
	prepairDataToSave("accountantThree");
  saveAs(new Blob([s2ab(localCreateExcel.wbxout)],{type:"application/octet-stream"}), accountingLocalVars.OneckedValue +'_накладные_Три_за_'+ localCreateExcel.salesDate +'_сформирован_'+ localCreateExcel.currDate +'_'+ localCreateExcel.countThree +'.xlsx');
});

$("#saveAccountantTwo").click(function(){
	prepairDataToSave("accountantTwo");
	saveAs(new Blob([s2ab(localCreateExcel.wbxout)],{type:"application/octet-stream"}), accountingLocalVars.OneckedValue +'_накладные_Два_за_'+ localCreateExcel.salesDate +'_сформирован_'+ localCreateExcel.currDate +'_'+ localCreateExcel.countTwo +'.xlsx');
});

$("#printReport").click(function(){
  saveAs(new Blob([s2ab(localCreateExcel.wbout)],{type:"application/octet-stream"}), 'отОдинт_'+ localCreateExcel.currDate +'.xlsx');
});

function prepairDataToSave(param) {
	if (param == "reports") { alert("ОтОдинты");
		localCreateExcel.wbx = XLSX.utils.book_new();
		localCreateExcel.wsx = XLSX.utils.table_to_sheet(document.getElementById('tableData'));
		localCreateExcel.wsx_name = "ОтОдинт";
    var wsname = localCreateExcel.wsx_name;
    var workbook = localCreateExcel.wbx;
    var worksheet = localCreateExcel.wsx;
		localCreateExcel.sheetcols = [
			{wch: 3},
			{wch: 7},
			{wch: 40},
			{wch: 8},
			{wch: 9},
			{wch: 5}
		];
		worksheet['!cols'] = localCreateExcel.sheetcols;
		workbook.SheetNames.push(wsname);
		workbook.Sheets[wsname] = worksheet;
		localCreateExcel.wbxout = XLSX.write(workbook, {bookType:'xlsx', bookSST:true, type:'binary'});
	}
	if (param == "accountantOne") { alert("Бухгалтерия ИП Один");
		localCreateExcel.wb = XLSX.utils.book_new();
		localCreateExcel.ws = XLSX.utils.table_to_sheet(document.getElementById('tableDataOne'));
		localCreateExcel.ws_name = "Продажи Один";
    var wsname = localCreateExcel.ws_name;
    var workbook = localCreateExcel.wb;
    var worksheet = localCreateExcel.ws;

		localCreateExcel.sheetcols = [
      {wch: 3},
			{wch: 9},
			{wch: 5},
			{wch: 40},
			{wch: 15},
			{wch: 12},
			{wch: 7},
			{wch: 4},
			{wch: 6},
			{wch: 6},
			{wch: 6},
			{wch: 10},
      {wch: 13},
      {wch: 13}
		];
		worksheet['!cols'] = localCreateExcel.sheetcols;
		workbook.SheetNames.push(wsname);
    for (var i = 2; i < localCreateExcel.countOne + 1; i++) {
      var cellE = 'E' + i;
      var cellM = 'M' + i;
      var cellN = 'N' + i;
      var cellL = 'L' + i;
      var cellO = 'O' + i;
      var valueCell = worksheet[cellE].v;
      var strCell = valueCell.toString();
      if (valueCell == "010400323789") {
        strCell = '0' + strCell;
      }
      let address = worksheet[cellN].v;
      let newAddress = address.replace(/_/g,' ');
      worksheet[cellN].v = newAddress;
      add_cell_to_sheet(worksheet, cellM, strCell);
    }
    workbook.Sheets[wsname] = worksheet;
		localCreateExcel.wbout = XLSX.write(workbook, {bookType:'xlsx', bookSST:true, type:'binary'});
	}
  if (param == "accountantTwo") { alert("Бухгалтерия ИП Два");
		localCreateExcel.wbx = XLSX.utils.book_new();
		localCreateExcel.wsx = XLSX.utils.table_to_sheet(document.getElementById('tableDataTwo'));
		localCreateExcel.wsx_name = "Продажи Два";
    var wsname = localCreateExcel.wsx_name;
    var workbook = localCreateExcel.wbx;
    var worksheet = localCreateExcel.wsx;
    localCreateExcel.sheetcols = [
      {wch: 3},
			{wch: 9},
			{wch: 5},
			{wch: 40},
			{wch: 15},
			{wch: 12},
			{wch: 7},
			{wch: 4},
			{wch: 6},
			{wch: 6},
			{wch: 6},
			{wch: 10},
      {wch: 13}
		];
		worksheet['!cols'] = localCreateExcel.sheetcols;
		workbook.SheetNames.push(wsname);
    for (var i = 2; i < localCreateExcel.countTwo + 1; i++) {
      var cellE = 'E' + i;
      var cellM = 'M' + i;
      var cellN = 'N' + i;
      var valueCell = worksheet[cellE].v;
      var strCell = valueCell.toString();
      let address = worksheet[cellN].v;
      let newAddress = address.replace(/_/g,' ');
      worksheet[cellN].v = newAddress;
      add_cell_to_sheet(worksheet, cellM, strCell);
    }
		workbook.Sheets[wsname] = worksheet;
		localCreateExcel.wbxout = XLSX.write(workbook, {bookType:'xlsx', bookSST:true, type:'binary'});
	}
  if (param == "accountantThree") {
		localCreateExcel.wbx = XLSX.utils.book_new();
		localCreateExcel.wsx = XLSX.utils.table_to_sheet(document.getElementById('tableDataThree'), {raw: true});
		localCreateExcel.wsx_name = "Продажи Три";
    var wsname = localCreateExcel.wsx_name;
    var workbook = localCreateExcel.wbx;
    var worksheet = localCreateExcel.wsx;
    localCreateExcel.sheetcols = [
			{wch: 3},
			{wch: 9},
			{wch: 5},
			{wch: 40},
			{wch: 15},
			{wch: 12},
			{wch: 7},
			{wch: 4},
			{wch: 6},
			{wch: 6},
			{wch: 6},
			{wch: 10},
      {wch: 13}
		];
		worksheet['!cols'] = localCreateExcel.sheetcols;
		workbook.SheetNames.push(wsname);
    for (var i = 2; i < localCreateExcel.countThree + 1; i++) {
      var cellE = 'E' + i;
      var cellM = 'M' + i;
      var cellN = 'N' + i;
      var valueCell = worksheet[cellE].v;
      var strCell = valueCell.toString();
      let address = worksheet[cellN].v;
      let newAddress = address.replace(/_/g,' ');
      worksheet[cellN].v = newAddress;
      add_cell_to_sheet(worksheet, cellM, strCell);
    }
		workbook.Sheets[wsname] = worksheet;
		localCreateExcel.wbxout = XLSX.write(workbook, {bookType:'xlsx', bookSST:true, type:'binary'});
	}
  if (param == "analytics") { alert("АнаДватика продаж");
		localCreateExcel.wbx = XLSX.utils.book_new();
		localCreateExcel.wsx = XLSX.utils.table_to_sheet(document.getElementById('tableDataAnalytics'));
		localCreateExcel.wsx_name = "АнаДваз продаж";
    var wsname = localCreateExcel.wsx_name;
    var workbook = localCreateExcel.wbx;
    var worksheet = localCreateExcel.wsx;
    localCreateExcel.sheetcols = [
			{wch: 3},
			{wch: 9},
			{wch: 5},
			{wch: 40},
			{wch: 35},
			{wch: 6},
			{wch: 6},
			{wch: 6},
			{wch: 9},
      {wch: 6}
		];
		worksheet['!cols'] = localCreateExcel.sheetcols;
		workbook.SheetNames.push(wsname);
		workbook.Sheets[wsname] = worksheet;
		localCreateExcel.wbxout = XLSX.write(workbook, {bookType:'xlsx', bookSST:true, type:'binary'});
	}
  if (param == "analyticsSummary") { alert("Сводка");
		localCreateExcel.wbx = XLSX.utils.book_new();
		localCreateExcel.wsx = XLSX.utils.table_to_sheet(document.getElementById('tableDataAnalyticsSummary'));
		localCreateExcel.wsx_name = "АнаДваз продаж";
    var wsname = localCreateExcel.wsx_name;
    var workbook = localCreateExcel.wbx;
    var worksheet = localCreateExcel.wsx;
    localCreateExcel.sheetcols = [
			{wch: 5},
			{wch: 40},
			{wch: 50},
			{wch: 25},
			{wch: 25},
			{wch: 25},
			{wch: 50}
		];
		worksheet['!cols'] = localCreateExcel.sheetcols;
		workbook.SheetNames.push(wsname);
		workbook.Sheets[wsname] = worksheet;
		localCreateExcel.wbxout = XLSX.write(workbook, {bookType:'xlsx', bookSST:true, type:'binary'});
	}
  if (param == "analyticsExchange") { alert("АнаДватика Обменов");
		localCreateExcel.wbx = XLSX.utils.book_new();
		localCreateExcel.wsx = XLSX.utils.table_to_sheet(document.getElementById('tableDataAnalyticsSummary'));
		localCreateExcel.wsx_name = "АнаДваз обменов";
    var wsname = localCreateExcel.wsx_name;
    var workbook = localCreateExcel.wbx;
    var worksheet = localCreateExcel.wsx;
    localCreateExcel.sheetcols = [
			{wch: 5},
			{wch: 40},
			{wch: 50},
			{wch: 25},
			{wch: 25},
			{wch: 25},
			{wch: 50}
		];
		worksheet['!cols'] = localCreateExcel.sheetcols;
		workbook.SheetNames.push(wsname);
		workbook.Sheets[wsname] = worksheet;
		localCreateExcel.wbxout = XLSX.write(workbook, {bookType:'xlsx', bookSST:true, type:'binary'});
	}
}

function s2ab(s) {
	var buf = new ArrayBuffer(s.length);
	var view = new Uint8Array(buf);
	for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
	return buf;
}

function formatDate(date) {
  var monthNames = [
    "01", "02", "03",
    "04", "05", "06", "07",
    "08", "09", "10",
    "11", "12"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + '-' + monthNames[monthIndex] + '-' + year;
}

function convert(type){
   let tbl1 = document.getElementById("tableReportSubjectData");
   let tbl2 = document.getElementById("tableData");
   let tbl3 = document.getElementById("tableSummaryHeaderData");
   let tbl4 = document.getElementById("tableSummaryData");

   let worksheet_tmp1 = XLSX.utils.table_to_sheet(tbl1);
   let worksheet_tmp2 = XLSX.utils.table_to_sheet(tbl2);
   let worksheet_tmp3 = XLSX.utils.table_to_sheet(tbl3);
   let worksheet_tmp4 = XLSX.utils.table_to_sheet(tbl4);

   let a = XLSX.utils.sheet_to_json(worksheet_tmp1, { header: 1 });
   let b = XLSX.utils.sheet_to_json(worksheet_tmp2, { header: 1 });
   let c = XLSX.utils.sheet_to_json(worksheet_tmp3, { header: 1 });
   let d = XLSX.utils.sheet_to_json(worksheet_tmp4, { header: 1 });

   if (type == "a") {
     var iStart = sum(parseInt(Object.keys(reportsLocalVars.salesQuantity).length, 10), 8);
     var iEnd = sum(parseInt(Object.keys(reportsLocalVars.salesQuantity).length, 10), 19);

     var cellA = 'A' + sum(parseInt(Object.keys(reportsLocalVars.salesQuantity).length, 10), 5);
     var cellB = 'B' + sum(parseInt(Object.keys(reportsLocalVars.salesQuantity).length, 10), 5);
     var cellC = 'C' + sum(parseInt(Object.keys(reportsLocalVars.salesQuantity).length, 10), 5);
   }
   if (type == "b") {
     var iStart = sum(parseInt(Object.keys(reportsLocalVars.salesIngredientsQuantity).length, 10), 8);
     var iEnd = sum(parseInt(Object.keys(reportsLocalVars.salesIngredientsQuantity).length, 10), 19);
     var cellA = 'A' + sum(parseInt(Object.keys(reportsLocalVars.salesIngredientsQuantity).length, 10), 5);
     var cellB = 'B' + sum(parseInt(Object.keys(reportsLocalVars.salesIngredientsQuantity).length, 10), 5);
     var cellC = 'C' + sum(parseInt(Object.keys(reportsLocalVars.salesIngredientsQuantity).length, 10), 5);
   }
   a = a.concat(['']).concat(b);
   a = a.concat(['']).concat(c);
   a = a.concat(['']).concat(d);

   localCreateExcel.wb = XLSX.utils.book_new();
   localCreateExcel.ws = XLSX.utils.json_to_sheet(a, { skipHeader: true });
   localCreateExcel.ws_name = "ОтОдинт";
   localCreateExcel.sheetcols = [
     {wch: 3},
     {wch: 7},
     {wch: 30},
     {wch: 8},
     {wch: 9},
     {wch: 7}
   ];
   localCreateExcel.ws['!cols'] = localCreateExcel.sheetcols;
   localCreateExcel.wb.SheetNames.push(localCreateExcel.ws_name);
   localCreateExcel.wb.Sheets[localCreateExcel.ws_name] = localCreateExcel.ws;
   delete localCreateExcel.wb.Sheets[localCreateExcel.ws_name]['A1'];
   delete localCreateExcel.wb.Sheets[localCreateExcel.ws_name]['B1'];
   for (var i = 1; i < iEnd; i++) {
     var cellA = 'A' + i;
     var cellB = 'B' + i;
     var cellC = 'C' + i;
   }
   localCreateExcel.wbout = XLSX.write(localCreateExcel.wb, {bookType:'xlsx', bookSST:true, type:'binary'});
}

function sum(a, b) {
  return parseInt(a, 10) + parseInt(b, 10);
}
