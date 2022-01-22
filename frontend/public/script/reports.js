
function ExportToExcel(type, fn, dl) {
    //using the npm package SheetJS, we will export the whole html table
    var table_data = document.getElementById('admin-table');
    var ws_name = "Assignment Report";
    var ws = XLSX.utils.table_to_sheet(table_data);

    var wscols = [
        { wch: 20 },
        { wch: 10 },
        { wch: 10 },
        { wch: 10 }
    ];
    ws['!cols'] = wscols;
    var style = {
        right: {
            style: "thin",
            color: "000000"
        },
        left: {
            style: "thin",
            color: "000000"
        },
        top: {
            style: "thin",
            color: "000000"
        },
        bottom: {
            style: "thin",
            color: "000000"
        },
    }
    for (const i in ws) {
        if (typeof (ws[i]) != "object") continue;
        let cell = XLSX.utils.decode_cell(i);
        if (cell.r != 0) { ws[i].s = { border: style } }; //style all the columns except first
        if (cell.c != 0 && cell.r != 0) { //style the ltp value columns
            ws[i].s = {
                border: style,
                alignment: {
                    horizontal: "center",
                    vertical: "center"
                }
            }
        }
        if (cell.r % 5 == 1) { // every elective row
            ws[i].s = {
                fill: { // background color
                    patternType: "solid",
                    fgColor: { rgb: "ff9933" },
                    bgColor: { rgb: "ff9933" }
                },
                font: {
                    bold: true
                }
            }

        } else if (cell.r % 5 == 2) { //every class,ltp row
            ws[i].s = {
                border: style,
                font: {
                    bold: true
                }
            }
        }
        if (cell.c != 0 && cell.r % 5 == 2) { //class,ltp header row
            ws[i].s = {
                border: style,
                alignment: {
                    horizontal: "center",
                    vertical: "center"
                },
                font: {
                    bold: true
                }
            }
        }
        ws["A1"].s = {
            font: {
                sz: 13.5,
                bold: true
            }
        }

    }
    var wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    return dl ?
        XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64', showGridLines: false }) :
        XLSX.writeFile(wb, fn || (ws_name + '.' + (type || 'xlsx')));
}
//get available semesters
function getSemesters() {
    axios.get(base_url + '/api/semester/').then((results) => {
        //$("#select-semester select option[value*='AY']").remove();
        results.data.forEach(element => {
            $('#select-semester').append(`<option>${element.semester_code}</option>`)
        });
    })
}

function getTAReports(acad_sem) {
    console.log(encodeURIComponent(acad_sem))
    axios.get(base_url + '/reports/download/assignment-report/' + encodeURIComponent(acad_sem)).then((response) => {
        let results = response.data
        console.log(results)
        results.forEach(element => {
            let table_row = `
            <tr>
            <th colspan= "4">${element['mod_code']} ${element['mod_abbrv']} : ${element['mod_abbrv']} ${element['fk_course_id']} ${element['mod_stage']} </th>
            </tr>
            <tr>
            <th>Classes</th>
            <td>Lecture</td>
            <td>Tutorial</td>
            <td>Practical</td>
            </tr>
            <tr> 
            <td>To Be Assigned</th>
            <td>${element['lecture_class']}</td>
            <td>${element['practical_class']}</td>
            <td>${element['tutorial_class']}</td>
            </tr>
            <tr> 
            <td>Assigned</th>
            <td>${element['SUM(ma_lecture)']}</td>
            <td>${element['SUM(ma_tutorial)']}</td>
            <td>${element['SUM(ma_practical)']}</td>
            </tr>
            <tr>
            <td colspan ="4"></td>
            </tr>`
            $('#ta-report-table').append(table_row)
        });
        document.getElementById("acad-year-head").innerHTML = acad_sem;
        $('#admin-table').append(`<caption id= 'caption'>Showing ${response.data.length} Results</caption>`)
    }).catch((error) => {
        //window.alert(error.response.data.message)
    })

}

getSemesters()
$(document).ready(() => {
    $('#select-semester').on('change', () => {
        //console.log(workbook)
        let b = $("#select-semester option:selected").text();
        getTAReports(b)
    });
})
