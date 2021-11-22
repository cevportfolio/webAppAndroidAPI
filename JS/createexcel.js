var localCreateExcel = {
  "wb" : "",
  "wbx" : "",
  "ws" : "",
  "wsx" : "",
  "ws_name" : "",
  "wsx_name" : "",
  "sheetcols" : "",
  "wbout" : "",
  "wbxout" : "",
	"currDate" : formatDate(new Date()),
	"countLee" : accountingLocalVars.countLee + 1,
	"countChe" : accountingLocalVars.countChe + 1,
  "countCheRoma" : accountingLocalVars.countCheRoma + 1,
	"salesDate" : ""
};

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
	/* cell object */
	var cell = {t:'?', v:value};
  cell.t = 's';
	/* assign type */
	// if(typeof value == "string") cell.t = 's'; // string
	// else if(typeof value == "number") cell.t = 'n'; // number
	// else if(value === true || value === false) cell.t = 'b'; // boolean
	// else if(value instanceof Date) cell.t = 'd';
	// else throw new Error("cannot store value");

	/* add to worksheet, overwriting a cell if it exists */
	worksheet[address] = cell;

	/* find the cell range */
	var range = XLSX.utils.decode_range(worksheet['!ref']);
	var addr = XLSX.utils.decode_cell(address);

	/* extend the range to include the new cell */
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
   saveAs(new Blob([s2ab(localCreateExcel.wbout)],{type:"application/octet-stream"}), 'отчет_'+ localCreateExcel.currDate +'.xlsx');
});

$("#button-b").click(async function(){
	// prepairDataToSave("reports");
   await convert("b");
   await new Promise((resolve, reject) => setTimeout(resolve, 3000));
   saveAs(new Blob([s2ab(localCreateExcel.wbout)],{type:"application/octet-stream"}), 'отчет_'+ localCreateExcel.currDate +'.xlsx');
});

$("#saveAnalytics").click(function(){
	prepairDataToSave("analytics");
  // saveAs(new Blob([s2ab(localCreateExcel.wbxout)],{type:"application/octet-stream"}), 'fuck.xlsx');
  saveAs(new Blob([s2ab(localCreateExcel.wbxout)],{type:"application/octet-stream"}), analytics.checkedValue +'_анализ_за_'+ localCreateExcel.salesDate +'_сформирован_'+ localCreateExcel.currDate +'.xlsx');
});

$("#saveAnalyticsSummary").click(function(){
	prepairDataToSave("analyticsSummary");
  // saveAs(new Blob([s2ab(localCreateExcel.wbxout)],{type:"application/octet-stream"}), 'fuck.xlsx');
  saveAs(new Blob([s2ab(localCreateExcel.wbxout)],{type:"application/octet-stream"}), analytics.checkedValue +'_анализ_за_'+ localCreateExcel.salesDate +'_сформирован_'+ localCreateExcel.currDate +'.xlsx');
});

$("#saveAnalyticsExchange").click(function(){
	prepairDataToSave("analyticsExchange");
  // saveAs(new Blob([s2ab(localCreateExcel.wbxout)],{type:"application/octet-stream"}), 'fuck.xlsx');
  saveAs(new Blob([s2ab(localCreateExcel.wbxout)],{type:"application/octet-stream"}), analytics.checkedValue +'_анализ_за_'+ localCreateExcel.salesDate +'_сформирован_'+ localCreateExcel.currDate +'.xlsx');
});

$("#saveAccountantChe").click(function(){
	prepairDataToSave("accountantChe");
  saveAs(new Blob([s2ab(localCreateExcel.wbout)],{type:"application/octet-stream"}), accountingLocalVars.checkedValue +'_накладные_Че_за_'+ localCreateExcel.salesDate +'_сформирован_'+ localCreateExcel.currDate +'_'+ localCreateExcel.countChe +'.xlsx');
});

$("#saveAccountantCheRoma").click(function(){
	prepairDataToSave("accountantCheRoma");
  saveAs(new Blob([s2ab(localCreateExcel.wbxout)],{type:"application/octet-stream"}), accountingLocalVars.checkedValue +'_накладные_Рома_за_'+ localCreateExcel.salesDate +'_сформирован_'+ localCreateExcel.currDate +'_'+ localCreateExcel.countCheRoma +'.xlsx');
});

$("#saveAccountantLee").click(function(){
	prepairDataToSave("accountantLee");
	saveAs(new Blob([s2ab(localCreateExcel.wbxout)],{type:"application/octet-stream"}), accountingLocalVars.checkedValue +'_накладные_Ли_за_'+ localCreateExcel.salesDate +'_сформирован_'+ localCreateExcel.currDate +'_'+ localCreateExcel.countLee +'.xlsx');
});

$("#printReport").click(function(){
	// prepairDataToSave("reports");
  convert();
  saveAs(new Blob([s2ab(localCreateExcel.wbout)],{type:"application/octet-stream"}), 'отчет_'+ localCreateExcel.currDate +'.xlsx');
});

function prepairDataToSave(param) {
	// var wb = XLS.utils.table_to_book(document.getElementById('tableData'),{sheet:"Sheet JS"});
	if (param == "reports") { alert("Отчеты");
		localCreateExcel.wbx = XLSX.utils.book_new();
		localCreateExcel.wsx = XLSX.utils.table_to_sheet(document.getElementById('tableData'));
		localCreateExcel.wsx_name = "Отчет";
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
	if (param == "accountantChe") { alert("Бухгалтерия ИП Че");
		localCreateExcel.wb = XLSX.utils.book_new();
		localCreateExcel.ws = XLSX.utils.table_to_sheet(document.getElementById('tableDataChe'));
		localCreateExcel.ws_name = "Продажи Че";
    // wb.Sheets.ws_name.L3 = {t:'s',v:'2019-07-01 00:00:00'};
    var wsname = localCreateExcel.ws_name;
    var workbook = localCreateExcel.wb;
    var worksheet = localCreateExcel.ws;

    // var address_of_cell = 'L2';
    // workbook.Sheets[wsname].address_of_cell = {t:'s',v:'2019-07-01 00:00:00'};

    // delete sheet.A2.w;
    // sheet.A2.z = '0';

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

    // var sheet = workbook.Sheets[workbook.SheetNames[0]];
    // var desired_cell = worksheet[address_of_cell];
    // var desired_value = (desired_cell ? desired_cell.v : undefined);
    // Object.keys(worksheet).forEach(function(s) {
    //   // if (worksheet[s].w) {
    //       delete worksheet[s].w;
    //       var valueCell = worksheet[s].v;
    //       var strCell = valueCell.toString();
    //       worksheet[s] = {t: 's', v: strCell};
    //       // alert(123);
    //   // }
    // });
    // delete worksheet.K2.w;
    for (var i = 2; i < localCreateExcel.countChe + 1; i++) {
      var cellE = 'E' + i;
      var cellM = 'M' + i;
      var cellN = 'N' + i;
      var cellL = 'L' + i;
      var cellO = 'O' + i;
      var valueCell = worksheet[cellE].v;
      var strCell = valueCell.toString();
      // let valueCellL = worksheet[cellL].v;
      // let strCellL = valueCellL;
      if (valueCell == 010400323789) {
        strCell = '0' + strCell;
        // alert(strCell.substring(0, 1));
      }
      let address = worksheet[cellN].v;
      let newAddress = address.replace(/_/g,' ');
      worksheet[cellN].v = newAddress;
      // add_cell_to_sheet(worksheet, cellO, strCellL);
      add_cell_to_sheet(worksheet, cellM, strCell);
    }
    workbook.Sheets[wsname] = worksheet;
    // localCreateExcel.wbout = XLSX.writeFile(localCreateExcel.wb, 'MyExcel.xlsx');
		localCreateExcel.wbout = XLSX.write(workbook, {bookType:'xlsx', bookSST:true, type:'binary'});
	}
  if (param == "accountantLee") { alert("Бухгалтерия ИП Ли");
		localCreateExcel.wbx = XLSX.utils.book_new();
		localCreateExcel.wsx = XLSX.utils.table_to_sheet(document.getElementById('tableDataLee'));
		localCreateExcel.wsx_name = "Продажи Ли";
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
    for (var i = 2; i < localCreateExcel.countLee + 1; i++) {
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
  if (param == "accountantCheRoma") { alert("Бухгалтерия ИП Че Роман Енгунович");
		localCreateExcel.wbx = XLSX.utils.book_new();
		localCreateExcel.wsx = XLSX.utils.table_to_sheet(document.getElementById('tableDataCheRoma'), {raw: true});
		localCreateExcel.wsx_name = "Продажи Че Рома";
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
    for (var i = 2; i < localCreateExcel.countCheRoma + 1; i++) {
      var cellE = 'E' + i;
      var cellM = 'M' + i;
      var cellN = 'N' + i;
      var valueCell = worksheet[cellE].v;
      var strCell = valueCell.toString();
      let address = worksheet[cellN].v;
      let newAddress = address.replace(/_/g,' ');
      // var address = worksheet[cellN].v;
      // var strAddress = address.toString();
      // worksheet[cellN].t = "s";
      worksheet[cellN].v = newAddress;
      add_cell_to_sheet(worksheet, cellM, strCell);
    }
		workbook.Sheets[wsname] = worksheet;
		localCreateExcel.wbxout = XLSX.write(workbook, {bookType:'xlsx', bookSST:true, type:'binary'});
	}
  if (param == "analytics") { alert("Аналитика продаж");
		localCreateExcel.wbx = XLSX.utils.book_new();
		localCreateExcel.wsx = XLSX.utils.table_to_sheet(document.getElementById('tableDataAnalytics'));
		localCreateExcel.wsx_name = "Анализ продаж";
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
		localCreateExcel.wsx_name = "Анализ продаж";
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
  if (param == "analyticsExchange") { alert("Аналитика Обменов");
		localCreateExcel.wbx = XLSX.utils.book_new();
		localCreateExcel.wsx = XLSX.utils.table_to_sheet(document.getElementById('tableDataAnalyticsSummary'));
		localCreateExcel.wsx_name = "Анализ обменов";
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

     // for (var i = iStart; i < iEnd; i++) {
     //   var cellA = 'A' + i;
     //   var cellB = 'B' + i;
     //   var cellC = 'D' + i;
     //   var cellD = 'E' + i;
     //   var cellE = 'F' + i;
     //   var valueCell = worksheet[cellE].v;
     //   var strCell = valueCell.toString();
     //   add_cell_to_sheet(worksheet, cellM, strCell);
     // }

     var cellA = 'A' + sum(parseInt(Object.keys(reportsLocalVars.salesQuantity).length, 10), 5);
     var cellB = 'B' + sum(parseInt(Object.keys(reportsLocalVars.salesQuantity).length, 10), 5);
     var cellC = 'C' + sum(parseInt(Object.keys(reportsLocalVars.salesQuantity).length, 10), 5);
   }
   if (type == "b") {
     var iStart = sum(parseInt(Object.keys(reportsLocalVars.salesIngredientsQuantity).length, 10), 8);
     var iEnd = sum(parseInt(Object.keys(reportsLocalVars.salesIngredientsQuantity).length, 10), 19);
     // var iEnd = parseInt(Object.keys(reportsLocalVars.salesIngredientsQuantity).length, 10);
     var cellA = 'A' + sum(parseInt(Object.keys(reportsLocalVars.salesIngredientsQuantity).length, 10), 5);
     var cellB = 'B' + sum(parseInt(Object.keys(reportsLocalVars.salesIngredientsQuantity).length, 10), 5);
     var cellC = 'C' + sum(parseInt(Object.keys(reportsLocalVars.salesIngredientsQuantity).length, 10), 5);
   }

   // alert(cellC);
   a = a.concat(['']).concat(b);
   a = a.concat(['']).concat(c);
   a = a.concat(['']).concat(d);

   // let worksheet = XLSX.utils.json_to_sheet(a, { skipHeader: true })
   //
   // const new_workbook = XLSX.utils.book_new()
   // XLSX.utils.book_append_sheet(new_workbook, worksheet, "worksheet")
   // XLSX.writeFile(new_workbook, 'tmp_file.xls')

   // By the way, I have solved this issues by doing {raw=true}, which keep all cell format as like html table.
   // !!!
   // var tbl = XLSX.utils.table_to_book(document.getElementById('tableforexcel'), {raw:true});
   // XLSX.writeFile(tbl, file_name, {cellStyles:true});

   localCreateExcel.wb = XLSX.utils.book_new();
   localCreateExcel.ws = XLSX.utils.json_to_sheet(a, { skipHeader: true });
   localCreateExcel.ws_name = "Отчет";
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
   // delete localCreateExcel.wb.Sheets[localCreateExcel.ws_name]['C1'];
   // delete localCreateExcel.wb.Sheets[localCreateExcel.ws_name][cellA];
   // delete localCreateExcel.wb.Sheets[localCreateExcel.ws_name][cellB];
   // delete localCreateExcel.wb.Sheets[localCreateExcel.ws_name][cellC];
   for (var i = 1; i < iEnd; i++) {
     var cellA = 'A' + i;
     var cellB = 'B' + i;
     var cellC = 'C' + i;
     // delete localCreateExcel.wb.Sheets[localCreateExcel.ws_name][cellA];
     // delete localCreateExcel.wb.Sheets[localCreateExcel.ws_name][cellB];
   }
   localCreateExcel.wbout = XLSX.write(localCreateExcel.wb, {bookType:'xlsx', bookSST:true, type:'binary'});
}

function sum(a, b) {
  return parseInt(a, 10) + parseInt(b, 10);
}
