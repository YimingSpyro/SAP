function ExportToExcel(type, fn, dl) {
    var table_data = document.getElementById('admin-table');
    var ws_name = "Assignment Report";
    var ws = XLSX.utils.table_to_sheet(table_data);

    var wscols = [
        {wch:20},
        {wch:10},
        {wch:10},
        {wch:10}
    ];
    ws['!cols'] = wscols;

    var wb = XLSX.utils.book_new();
    
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    return dl ?
        XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
        XLSX.writeFile(wb, fn || (ws_name+'.' + (type || 'xlsx')));
}

/* function downloadReport(file_id, filename) {
    window.open(`${base_url}/reports/download/${file_id}/${filename}`, '_blank')
}; */
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
            <th colspan= "4">${element['mod_code']} ${element['mod_abbrv']} : ${element['mod_abbrv']} ${element['fk_course_id']} ${element['mod_stage']} ${acad_sem}</th>
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
            </tr>`
            $('#ta-report-table').append(table_row)
        });
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
