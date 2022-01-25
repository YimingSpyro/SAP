function ExportToExcel(table_head, type, fn, dl) {
    //using the npm package SheetJS, we will export the whole html table
    var table_data = document.getElementById('admin-table');
    var ws_name = table_head;
    var ws = XLSX.utils.table_to_sheet(table_data);
    const testHeadValue = /^\w+ \w+ : \w+ \w+ \w+/
    const testSA = ['Staff Assigned', 'Classes']
    const testLTP = ['L', 'T', 'P', 'Lecture', 'Tutorial', 'Practical']
    const testHTA = ['Hours Per Week', 'To Be Assigned', 'Assigned']
    const testDigit = /^\d+$/

    //cell styling
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
    };

    //text alignments
    var horizontalAlign = {
        horizontal: "center",
        vertical: "center"
    };

    //colour fills
    var fillffcc00 = { // background color
        patternType: "solid",
        fgColor: { rgb: "ffcc00" },
        bgColor: { rgb: "ffcc00" }
    };
    var fillffffa0 = {
        patternType: "solid",
        fgColor: { rgb: "ffffa0" },
        bgColor: { rgb: "ffffa0" }
    };
    var fillff9933 = {
        patternType: "solid",
        fgColor: { rgb: "ff9933" },
        bgColor: { rgb: "ff9933" }
    }

    //text stylings
    var styleheader = {
        sz: 13.5,
        bold: true
    };
    var setbold = {
        bold: true
    };
    if (table_head == "Assignment Report") {
        var wscols = [
            { wch: 20 },
            { wch: 10 },
            { wch: 10 },
            { wch: 10 }
        ];
        ws['!cols'] = wscols;
        for (const i in ws) {
            if (typeof (ws[i]) != "object") continue;
            let cell = XLSX.utils.decode_cell(i);
            if (cell.r != 0) { ws[i].s = { border: style } }; //style all the columns except first
            if (testHeadValue.test(ws[i].v)) {
                ws[i].s = {
                    fill: fillff9933,
                    font: setbold,
                    border: style
                }
            } else if (testLTP.includes(ws[i].v)) {
                ws[i].s = {
                    font: setbold,
                    alignment: horizontalAlign,
                    border: style
                }
            } else if (testDigit.test(ws[i].v)) {
                ws[i].s = {
                    alignment: horizontalAlign,
                    border: style
                }
            } else if (testSA.includes(ws[i].v)) {
                ws[i].s = {
                    font: setbold,
                    border: style
                }
            }
            ws["A1"].s = {
                font: styleheader
            }

        }
    } else if (table_head == "MC List") {
        var wscols = [
            { wch: 15 },
            { wch: 15 },
            { wch: 10 },
            { wch: 20 }
        ];
        ws['!cols'] = wscols;
        for (const i in ws) {
            if (typeof (ws[i]) != "object") continue;
            let cell = XLSX.utils.decode_cell(i);
            if (cell.r != 0) { ws[i].s = { border: style } }; //style all the columns except first
            ws["A1"].s = {
                font: styleheader
            }
        }
    } else if (table_head == "Summary By Module") {
        var wscols = [
            { wch: 30 },
            { wch: 5 },
            { wch: 5 },
            { wch: 5 }
        ];
        ws['!cols'] = wscols;
        for (const i in ws) {
            if (typeof (ws[i]) != "object") continue;
            let cell = XLSX.utils.decode_cell(i);

            if (cell.r > 1) { ws[i].s = { border: style } }; //style all the columns except first two
            if (testHeadValue.test(ws[i].v) || testSA.includes(ws[i].v)) { //style all the module name columns
                ws[i].s = {
                    fill: fillffcc00,
                    font: setbold,
                    border: style
                }
            } else if (testLTP.includes(ws[i].v)) {
                ws[i].s = {
                    fill: fillffcc00,
                    font: setbold,
                    border: style,
                    alignment: horizontalAlign
                }
            } else if (testDigit.test(ws[i].v)) {
                ws[i].s = {
                    fill: fillffffa0,
                    border: style,
                    alignment: horizontalAlign
                }
            } else if (testHTA.includes(ws[i].v)) {
                ws[i].s = {
                    fill: fillffffa0,
                    border: style,
                }
            }


            ws["A1"].s = {
                font: styleheader
            }
        }
    }

    var wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    return dl ?
        XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64', showGridLines: false }) :
        XLSX.writeFile(wb, fn || (ws_name + '.' + (type || 'xlsx')));
};
//get available semesters
function getSemesters() {
    axios.get(base_url + '/api/report/semester/').then((results) => {
        //$("#select-semester select option[value*='AY']").remove();
        results.data.forEach(element => {
            $('#select-semester').append(`<option>${element.semester_code}</option>`)
        });
    })
};

//get teaching assignment reports
function getTAReports(acad_sem) {
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

};

//get module coordinators list
function getMCList(acad_sem) {
    axios.get(base_url + '/reports/download/mc-list/' + encodeURIComponent(acad_sem)).then((response) => {
        let results = response.data
        //console.log(results)
        results.forEach(element => {
            let table_row = `
            <tr> 
            <td>${element['mod_code']}</td>
            <td>${element['mod_abbrv']}</td>
            <td>${element['fk_mod_coord']}</td>
            <td>${element['staff_name']}</td>
            </tr>`
            $('#mc-report-table').append(table_row)
        });
        document.getElementById("acad-year-head").innerHTML = acad_sem;
        $('#admin-table').append(`<caption id= 'caption'>Showing ${response.data.length} Results</caption>`)
    }).catch((error) => {
        //window.alert(error.response.data.message)
    })
};

//get summary by module
async function getSummaryList(acad_sem) {
    const assignment_report = await axios.get(base_url + '/reports/download/assignment-report/' + encodeURIComponent(acad_sem)).then((response) => { return response.data })
    const summary_by_module = await axios.get(base_url + '/reports/download/summary-by-module/' + encodeURIComponent(acad_sem)).then((response) => { return response.data })
    //console.log(assignment_report)
    for (let i = 0; i < assignment_report.length; i++) {
        let table_row = `
            <tr>
            <th>${assignment_report[i]['mod_code']} ${assignment_report[i]['mod_abbrv']} : ${assignment_report[i]['mod_abbrv']} ${assignment_report[i]['fk_course_id']} ${assignment_report[i]['mod_stage']} </th>
            <td>L</td>
            <td>T</td>
            <td>P</td>
            </tr>
            <tr> 
            <td>Hours Per Week</th>
            <td>${assignment_report[i]['FLOOR(mod_lecture/15)']}</td>
            <td>${assignment_report[i]['FLOOR(mod_practical/15)']}</td>
            <td>${assignment_report[i]['FLOOR(mod_tutorial/15)']}</td>
            </tr>
            <tr> 
            <td>To Be Assigned</th>
            <td>${assignment_report[i]['lecture_class']}</td>
            <td>${assignment_report[i]['practical_class']}</td>
            <td>${assignment_report[i]['tutorial_class']}</td>
            </tr>
            <tr> 
            <td>Assigned</th>
            <td>${assignment_report[i]['SUM(ma_lecture)']}</td>
            <td>${assignment_report[i]['SUM(ma_tutorial)']}</td>
            <td>${assignment_report[i]['SUM(ma_practical)']}</td>
            </tr>
            <tr>
            <th colspan ="4">Staff Assigned</th>
            </tr>`
        for (let j = 0; j < summary_by_module.length; j++) {
            if (summary_by_module[j]['mod_code'] == assignment_report[i]['mod_code'] && summary_by_module[j]['mod_stage'] == assignment_report[i]['mod_stage']) {
                if (summary_by_module[j]['fk_staff_id'] == summary_by_module[j]['fk_mod_coord']) {
                    table_row += `<tr>
                    <td>*${summary_by_module[j]['fk_staff_id']} ${summary_by_module[j]['staff_name']}</td>
                    <td>${summary_by_module[j]['ma_lecture']}</td>
                    <td>${summary_by_module[j]['ma_tutorial']}</td>
                    <td>${summary_by_module[j]['ma_practical']}</td>
                    </tr>`
                } else {
                    table_row += `<tr>
                    <td>${summary_by_module[j]['fk_staff_id']} ${summary_by_module[j]['staff_name']}</td>
                    <td>${summary_by_module[j]['ma_lecture']}</td>
                    <td>${summary_by_module[j]['ma_tutorial']}</td>
                    <td>${summary_by_module[j]['ma_practical']}</td>
                    </tr>`
                }
            }
        };
        table_row += `<tr>
        <th colspan ="4"></th>
        </tr>`

        $('#summary-by-module-table').append(table_row)
    };
    $('#admin-table').append(`<caption id= 'caption'>Showing ${assignment_report.length} Module Summaries</caption>`)
};

//get summary by module
async function getSummaryByStaff(acad_sem) {
    const summary_by_staff = await axios.get(base_url + '/reports/download/summary-by-staff/' + encodeURIComponent(acad_sem)).then((response) => { return response.data })
    //console.log(summary_by_staff)
    summary_by_staff.forEach(element => {
        let module = ""
        if (element['fk_staff_id'] == element['fk_mod_coord']) {
            module += '*' 
        }
        let table_row = `
            <tr>
            <th>No. Of Classes For ${element['fk_staff_id']} ${element['staff_name']}</th>
            <td>L Classes</td>
            <td>L Hours</td>
            <td>T Classes</td>
            <td>T Hours</td>
            <td>P Classes</td>
            <td>P Hours</td>
            </tr>
            </tr>
            <td colspan ="7">Modules:</td>
            </tr>
            <tr>
            <td>${module}${element['mod_code']} ${element['mod_abbrv']} : ${element['mod_abbrv']} ${element['course']} ${element['mod_stage']} </th>
            <td>L Classes</td>
            <td>L Hours</td>
            <td>T Classes</td>
            <td>T Hours</td>
            <td>P Classes</td>
            <td>P Hours</td>
            </tr>
            <td colspan ="4"></td>
            </tr>`
        $('#summary-by-module-table').append(table_row)
    });



    $('#admin-table').append(`<caption id= 'caption'>Showing ${assignment_report.length} Module Summaries</caption>`)

};

getSemesters()
$(document).ready(() => {
    $('#select-semester').on('change', () => {
        //console.log(workbook)
        document.getElementById("export-table").hidden = false;
        let table_head = document.getElementById("th-label").innerHTML;
        let b = $("#select-semester option:selected").text();
        if (table_head == "Assignment Report") {
            $("tbody tr").remove();
            $("caption").remove();
            getTAReports(b)
        } else if (table_head == "MC List") {
            $("tbody tr").remove();
            $("caption").remove();
            getMCList(b)
        } else if (table_head == "Summary By Module") {
            $("tbody tr").remove();
            $("caption").remove();
            getSummaryList(b)
        } else if (table_head == "Summary By Staff") {
            $("tbody tr").remove();
            $("caption").remove();
            getSummaryByStaff(b)
        }

    });
    $('#export-table').on('click', () => {
        let table_head = document.getElementById("th-label").innerHTML;
        //console.log(workbook)
        ExportToExcel(table_head, 'xlsx')
    });
})
