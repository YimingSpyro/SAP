function downloadReport(file_id, filename) {
    window.open(`${base_url}/reports/download/${file_id}/${filename}`, '_blank')
};
function getAllReports() {
    axios.get(base_url + '/uploads/reports/').then((response) => {
        console.log(response.data)
        $('#admin-table').append(`<caption id= 'caption'>Showing ${response.data.length} Results</caption>`)
        for (let i = 0; i < response.data.length; i++) {
            let date = new Date(response.data[i].uploaded_time)
            options = {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric', 
                hour12: true,
              };
            $('#admin-table').append(
                `<tr class="border-bottom border-white">
                <th scope = "row">${response.data[i].filename}</td>
                <td>${response.data[i].fk_semester_code}</td>
                <td>${response.data[i].stafF_name}</td>
                <td>${response.data[i].remarks}</td>
                <td>${new Intl.DateTimeFormat('default', options).format(date)}</td>
                <td>${response.data[i].file_remarks}</td>
                <td>
                    <a class="btn btn-outline-light" id="download-button" onclick= downloadReport('${response.data[i].file_id}','${response.data[i].filename}') role="button">Download</a>
                </td>
                </tr>`)
        }
        
    })
}
getAllReports()
$(document).ready(() => {
    $("#update-profile").click(() => {
        updateProfileInfo();
        location.reload();
    })
})
