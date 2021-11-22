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
	"countTwo" : accountingLocalVars.countTwo + 1,
	"countOne" : accountingLocalVars.countOne + 1,
	"salesDate" : ""
};

if (accountingLocalVars.dateStart != "") {
	localCreateExcel.salesDate = accountingLocalVars.dateStart;
} else {
	localCreateExcel.salesDate = localCreateExcel.currDate;
}

function add_cell_to_sheet(worksheet, address, value) {
	/* cell object */
	var cell = {t:'?', v:value};
  cell.t = 's';
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
   convert();
   saveAs(new Blob([s2ab(localCreateExcel.wbout)],{type:"application/octet-stream"}), 'отчет_'+ localCreateExcel.currDate +'.xlsx');
});

$("#saveaccountantOne").click(function(){
	prepairDataToSave("accountantOne");
  saveAs(new Blob([s2ab(localCreateExcel.wbxout)],{type:"application/octet-stream"}), accountingLocalVars.checkedValue +'_накладные_Один_за_'+ localCreateExcel.salesDate +'_сформирован_'+ localCreateExcel.currDate +'_'+ localCreateExcel.countOne +'.xlsx');
});

$("#saveaccountantTwo").click(function(){
	prepairDataToSave("accountantTwo");
	saveAs(new Blob([s2ab(localCreateExcel.wbxout)],{type:"application/octet-stream"}), accountingLocalVars.checkedValue +'_накладные_Два_за_'+ localCreateExcel.salesDate +'_сформирован_'+ localCreateExcel.currDate +'_'+ localCreateExcel.countTwo +'.xlsx');
});

$("#printReport").click(function(){
  convert();
  saveAs(new Blob([s2ab(localCreateExcel.wbout)],{type:"application/octet-stream"}), 'отчет_'+ localCreateExcel.currDate +'.xlsx');
});

function prepairDataToSave(param) {
	if (param == "reports") {
    alert("Отчеты");
		localCreateExcel.wb = XLSX.utils.book_new();
		localCreateExcel.ws = XLSX.utils.table_to_sheet(document.getElementById('tableData'));
		localCreateExcel.ws_name = "Отчет";
		localCreateExcel.sheetcols = [
			{wch: 3},
			{wch: 7},
			{wch: 40},
			{wch: 8},
			{wch: 9},
			{wch: 5}
		];
		localCreateExcel.ws['!cols'] = localCreateExcel.sheetcols;
		localCreateExcel.wb.SheetNames.push(localCreateExcel.ws_name);
		localCreateExcel.wb.Sheets[localCreateExcel.ws_name] = localCreateExcel.ws;
		localCreateExcel.wbout = XLSX.write(localCreateExcel.wb, {bookType:'xlsx', bookSST:true, type:'binary'});
	}
	if (param == "accountantOne") {
    alert("Бухгалтерия ИП Один");
		localCreateExcel.wb = XLSX.utils.book_new();
		localCreateExcel.ws = XLSX.utils.table_to_sheet(document.getElementById('tableDataOne'));
		localCreateExcel.ws_name = "Продажи Один";
    var wsname = localCreateExcel.ws_name;
    var workbook = localCreateExcel.wb;
    var worksheet = localCreateExcel.ws;

		localCreateExcel.sheetcols = [
			{wch: 3},
			{wch: 7},
			{wch: 10},
			{wch: 40},
			{wch: 25},
			{wch: 5},
			{wch: 3},
			{wch: 7},
			{wch: 10},
			{wch: 8},
			{wch: 9},
			{wch: 20}
		];
		worksheet['!cols'] = localCreateExcel.sheetcols;
		workbook.SheetNames.push(wsname);

    for (var i = 2; i < localCreateExcel.countOne + 1; i++) {
      var cellE = 'E' + i;
      var cellM = 'M' + i;
      var valueCell = worksheet[cellE].v;
      var strCell = valueCell.toString();
      add_cell_to_sheet(worksheet, cellM, strCell);
    }
    workbook.Sheets[wsname] = worksheet;
		localCreateExcel.wbout = XLSX.write(workbook, {bookType:'xlsx', bookSST:true, type:'binary'});
	}
  if (param == "accountantTwo") {
    alert("Бухгалтерия ИП Два");
		localCreateExcel.wbx = XLSX.utils.book_new();
		localCreateExcel.wsx = XLSX.utils.table_to_sheet(document.getElementById('tableDataTwo'));
		localCreateExcel.wsx_name = "Продажи Два";
    var wsname = localCreateExcel.wsx_name;
    var workbook = localCreateExcel.wbx;
    var worksheet = localCreateExcel.wsx;
    localCreateExcel.sheetcols = [
			{wch: 3},
			{wch: 7},
			{wch: 10},
			{wch: 40},
			{wch: 25},
			{wch: 25},
			{wch: 3},
			{wch: 7},
			{wch: 10},
			{wch: 8},
			{wch: 9},
			{wch: 20}
		];
		worksheet['!cols'] = localCreateExcel.sheetcols;
		workbook.SheetNames.push(wsname);
    for (var i = 2; i < localCreateExcel.countTwo + 1; i++) {
      var cellE = 'E' + i;
      var cellM = 'M' + i;
      var valueCell = worksheet[cellE].v;
      var strCell = valueCell.toString();
      add_cell_to_sheet(worksheet, cellM, strCell);
    }
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

function convert(){
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

   var iStart = sum(parseInt(Object.keys(reportsLocalVars.salesQuantity).length, 10), 8);
   var iEnd = sum(parseInt(Object.keys(reportsLocalVars.salesQuantity).length, 10), 19);

   var cellA = 'A' + sum(parseInt(Object.keys(reportsLocalVars.salesQuantity).length, 10), 5);
   var cellB = 'B' + sum(parseInt(Object.keys(reportsLocalVars.salesQuantity).length, 10), 5);
   var cellC = 'C' + sum(parseInt(Object.keys(reportsLocalVars.salesQuantity).length, 10), 5);
   a = a.concat(['']).concat(b);
   a = a.concat(['']).concat(c);
   a = a.concat(['']).concat(d);

   localCreateExcel.wb = XLSX.utils.book_new();
   localCreateExcel.ws = XLSX.utils.json_to_sheet(a, { skipHeader: true });
   localCreateExcel.ws_name = "Отчет";
   localCreateExcel.sheetcols = [
     {wch: 3},
     {wch: 7},
     {wch: 40},
     {wch: 8},
     {wch: 9},
     {wch: 7}
   ];
   localCreateExcel.ws['!cols'] = localCreateExcel.sheetcols;
   localCreateExcel.wb.SheetNames.push(localCreateExcel.ws_name);
   localCreateExcel.wb.Sheets[localCreateExcel.ws_name] = localCreateExcel.ws;
   delete localCreateExcel.wb.Sheets[localCreateExcel.ws_name]['A1'];
   delete localCreateExcel.wb.Sheets[localCreateExcel.ws_name]['B1'];
   delete localCreateExcel.wb.Sheets[localCreateExcel.ws_name][cellA];
   delete localCreateExcel.wb.Sheets[localCreateExcel.ws_name][cellB];
   delete localCreateExcel.wb.Sheets[localCreateExcel.ws_name][cellC];
   for (var i = iStart; i < iEnd; i++) {
     var cellA = 'A' + i;
     var cellB = 'B' + i;
     delete localCreateExcel.wb.Sheets[localCreateExcel.ws_name][cellA];
     delete localCreateExcel.wb.Sheets[localCreateExcel.ws_name][cellB];
   }
   localCreateExcel.wbout = XLSX.write(localCreateExcel.wb, {bookType:'xlsx', bookSST:true, type:'binary'});
}

function sum(a, b) {
  return parseInt(a, 10) + parseInt(b, 10);
}
