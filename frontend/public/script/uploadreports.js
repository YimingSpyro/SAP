//global variable so other functions can use data
var workbook;
var jsonArr;

//functions to handle excel upload locally
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
    $("option[value*=2]").remove();

    //retrieve and render new options from the selected sheet
    let parsedSheet = firstSheet.map(element => parseInt(element))
    parsedSheet.sort(function (a, b) { return b-a })
    let studentYears = ["Year 1: ", "Year 2: ", "Year 3: "]
    for (let index = 0; index < studentYears.length; index++) {
        studentYears[index] += parsedSheet[index];
    };
    studentYears.forEach(element => {
        $('#select-section').append(`<option value='${element}' >${element}</option>`)
    });
    //console.log(workbook.SheetNames)
    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet[0]]);
    //Create a HTML Table element.
    $("tbody tr").remove();
    document.createElement('tbody')
    var table = document.getElementById("dvExcel").getElementsByTagName('tbody')[0];

    //Add the header row.
    var row = table.insertRow(-1);
    var header_names = ['Year', 'Stage', 'Code', 'Abbrev', 'Name', 'Module', 'Prerequisite (Pass\/Taken)', 'Type', 'L', 'T', 'P', 'DLT', 'Total', 'CU', 'Remarks'];
    jsonArr = [];
    const testField = /^[1-3]+[A|B|S][1-2]*/
    //Add the data rows from Excel file.
    //console.log(excelRows)
    for (let i = 0; i < excelRows.length; i++) {
        let objectProperties = Object.getOwnPropertyNames(excelRows[i])
        if (testField.test(excelRows[i][objectProperties[1]])) {
            //Add the data row.
            var row = table.insertRow(-1);
            //Add the data cells.
            for (let j = 0; j < header_names.length; j++) {
                if (excelRows[i][objectProperties[j]] == undefined || excelRows[i][objectProperties[j]] == 'Nil') {
                    excelRows[i][objectProperties[j]] = 0
                    var cell = row.insertCell(-1);
                    cell.innerHTML = excelRows[i][objectProperties[j]];
                } else {
                    var cell = row.insertCell(-1);
                    cell.innerHTML = excelRows[i][objectProperties[j]];
                }
            };
        };
    };
};
//change the sheet to the corresponding year selected
function selectOption(input) {
    let userInput = input.split(": ");
    let studentYear = userInput[0].split('');
    //Read all rows from the Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[userInput[1]]);
    //remove table tr elements
    $("tbody tr").remove();
    //console.log(studentYear[studentYear.length - 1])
    //Create a HTML Table element.
    document.createElement('tbody')
    var table = document.getElementById("dvExcel").getElementsByTagName('tbody')[0];
    //Add the header row.
    var row = table.insertRow(-1);
    var header_names = ['Year', 'Stage', 'Code', 'Abbrev', 'Name', 'Module Type', 'Prerequisite (Pass\/Taken)', 'Type', 'L', 'T', 'P', 'DLT', 'Total', 'CU', 'Remarks']
    jsonArr = [];
    const testField = new RegExp(`^${studentYear[studentYear.length - 1]}\\w`);
    //Add the data rows from Excel file.
    //console.log(excelRows)
    for (let i = 0; i < excelRows.length; i++) {
        let obj = header_names.reduce((o, key) => Object.assign(o, { [key]: userInput[1] }), {}, 0)
        let objectProperties = Object.getOwnPropertyNames(excelRows[i])
        if (testField.test(excelRows[i][objectProperties[1]])) {
            //Add the data row.
            var row = table.insertRow(-1);
            //Add the data cells.
            for (let j = 0; j < header_names.length; j++) {
                if (excelRows[i][objectProperties[j]] == undefined || excelRows[i][objectProperties[j]] == 'Nil') {
                    excelRows[i][objectProperties[j]] = 0
                    var cell = row.insertCell(-1);
                    cell.innerHTML = excelRows[i][objectProperties[j]];
                } else {
                    var cell = row.insertCell(-1);
                    cell.innerHTML = excelRows[i][objectProperties[j]];
                }
                let tmpObj = { [header_names[j]]: excelRows[i][objectProperties[j]] }
                Object.assign(obj, tmpObj)
                tmpObj = { 'Year': userInput[1] }
                Object.assign(obj, tmpObj)
            };
            jsonArr.push(obj)
        };
    };
    //console.log(jsonArr)
};

//get available courses
function getCourses() {
    axios.get(base_url + '/api/courses/').then((results) => {
        $("option[value*='D']").remove();
        results.data.forEach(element => {
            $('#select-course').append(`<option value=${element.course_id} >${element.course_id}</option>`)
        });
    })
}
//get available semesters
function getSemesters() {
    axios.get(base_url + '/api/report/semester/').then((results) => {
        //$("#select-semester select option[value*='AY']").remove();
        results.data.forEach(element => {
            $('#select-semester').append(`<option>${element.semester_code}</option>`)
        });
    })
}

getSemesters()
getCourses()

//get local filename
function getFileName(course_id,semester_code ) {
    let filename = document.getElementById("fileUpload");
    let e = document.getElementById("select-section");
    let year = e.value;
    let message = `You are currently submitting: ${filename.value.split("\\").pop()} - Sheet ${year} for ${course_id} ${semester_code}<br> Confirm Submission?`
    document.getElementById("confirmation").innerHTML = message
}
$(document).ready(() => {
    $("#upload").click(() => {
        document.getElementById("upload-file").hidden = false;
        document.getElementById("select-course").hidden = false;
        document.getElementById("select-semester").hidden = false;
        Upload()
        getFileName()
    });
    $('#select-section').on('change', () => {
        let e = document.getElementById("select-section");
        let year = e.value;
        selectOption(year)
    });
    $('#select-course').on('change', () => {
        let a = document.getElementById("select-course");
        let b = $( "#select-semester option:selected" ).text();
        getFileName(a.value, b)
    });
    $('#select-semester').on('change', () => {
        //console.log(workbook)
        let a = document.getElementById("select-course");
        let b = $( "#select-semester option:selected" ).text();
        console.log()
        getFileName(a.value, b)
    });
    $('#upload-file').on('show.bs.modal')
    $("#uploadModalConfirmation").click(() => {
        let a = document.getElementById("select-course")
        let b = $( "#select-semester option:selected" ).text();
        console.log(jsonArr)
        axios.post(base_url + '/api/reports/upload/excel/', {
            data: {excelData: jsonArr, course_id: a.value, semester_code: b }
        }).then((result) => {
            console.log(result)
            window.alert(result.data.message)
            //location.reload()
        }).catch((error) => {
            window.alert(error.response.data.message)
        })
    })

})