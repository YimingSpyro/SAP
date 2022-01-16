//global variable so other functions can use data
var workbook;
var jsonArr;
var base_url = 'http://localhost:8080'
//functions to validate the excel file
function Upload() {
    //Reference the FileUpload element.
    var fileUpload = document.getElementById("fileUpload");

    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    ProcessExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    ProcessExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid Excel file.");
    }
};
//function to format and handle excel upload locally
function ProcessExcel(data) {
    //Read the Excel File data.
    workbook = XLSX.read(data, {
        type: 'binary'
    });

    console.log('Entering Process Excel')
    //Fetch Sheet.
    var firstSheet = workbook.SheetNames;
    //remove select options
    $("select option").remove();
    firstSheet.forEach(element => {
        $('#select-section').append(`<option value=${element} >${element}</option>`)
    });
    $('#select-section option:contains(' + firstSheet[0] + ')').prop({ selected: true });
    //console.log(workbook.SheetNames)
    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet[0]]);
    //Create a HTML Table element.
    document.createElement('tbody')
    var table = document.getElementById("dvExcel").getElementsByTagName('tbody')[0];

    //Add the header row.
    var row = table.insertRow(-1);
    var header_names = ['Row Num', 'Stage', 'Code', 'Abbrev', 'Full Name', 'Name', 'Prerequisite (Pass\/Taken)', 'Type', 'L', 'T', 'P', 'DLT', 'Total', 'CU', 'Remarks']
    //let obj = header_names.reduce((o, key) => Object.assign(o, { [key]: null }), {}, 0)
    jsonArr = [];
    const testField = /^\d\w/
    //Add the data rows from Excel file.
    //console.log(excelRows)
    for (let i = 0; i < excelRows.length; i++) {
        let obj = header_names.reduce((o, key) => Object.assign(o, { [key]: null }), {}, 0)
        let objectProperties = Object.getOwnPropertyNames(excelRows[i])
        if (testField.test(excelRows[i][objectProperties[1]])) {
            //Add the data row.
            var row = table.insertRow(-1);
            //Add the data cells.
            for (let j = 0; j < header_names.length; j++) {
                if (excelRows[i][objectProperties[j]] == undefined) {
                    excelRows[i][objectProperties[j]] = 'Nil'
                    var cell = row.insertCell(-1);
                    cell.innerHTML = excelRows[i][objectProperties[j]];
                } else {
                    var cell = row.insertCell(-1);
                    cell.innerHTML = excelRows[i][objectProperties[j]];
                }
                let tmpObj = { [header_names[j]]: excelRows[i][objectProperties[j]] }
                Object.assign(obj, tmpObj)
            };
            jsonArr.push(obj)
        };
    };
    //console.log(jsonArr)

};
//change the sheet to the corresponding year selected
function selectOption(year) {
    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[year]);
    //remove table tr elements
    $("tbody tr").remove();

    //Create a HTML Table element.
    document.createElement('tbody')
    var table = document.getElementById("dvExcel").getElementsByTagName('tbody')[0];
    //Add the header row.
    var row = table.insertRow(-1);
    var header_names = ['Row Num', 'Stage', 'Code', 'Abbrev', 'Name', 'Type', 'Prerequisite (Pass\/Taken)', 'Type', 'L', 'T', 'P', 'DLT', 'Total', 'CU', 'Remarks']
    jsonArr = [];
    const testField = /^\d\w/
    //Add the data rows from Excel file.
    //console.log(excelRows)
    for (let i = 0; i < excelRows.length; i++) {
        let obj = header_names.reduce((o, key) => Object.assign(o, { [key]: null }), {}, 0)
        let objectProperties = Object.getOwnPropertyNames(excelRows[i])
        if (testField.test(excelRows[i][objectProperties[1]])) {
            //Add the data row.
            var row = table.insertRow(-1);
            //Add the data cells.
            for (let j = 0; j < header_names.length; j++) {
                if (excelRows[i][objectProperties[j]] == undefined) {
                    excelRows[i][objectProperties[j]] = 'Nil'
                    var cell = row.insertCell(-1);
                    cell.innerHTML = excelRows[i][objectProperties[j]];
                } else {
                    var cell = row.insertCell(-1);
                    cell.innerHTML = excelRows[i][objectProperties[j]];
                }
                let tmpObj = { [header_names[j]]: excelRows[i][objectProperties[j]] }
                Object.assign(obj, tmpObj)
            };
            jsonArr.push(obj)
        };
    };
    //console.log(jsonArr)
}
$(document).ready(() => {
    $("#upload").click(() => {
        document.getElementById("upload-file").hidden = false;
        Upload()
    })
    $("#change-semester").click(() => {
        let e = document.getElementById("select-section");
        let year = e.value;
        selectOption(year)
        document.getElementById("upload-file").hidden = false;
    })
    /* $("#upload-file").click(() => {
        console.log(jsonArr)
        axios.post(base_url + '/reports/upload/excel/', {
            data: jsonArr
        }).then((result) => {
            console.log(result)
            console.log(result.data.message)
        })
    }) */
    $('#upload-file').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var acad_sem = button.data('acad-sem') // Extract info from data-* attributes
        console.log(acad_sem)
    })
})