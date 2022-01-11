const base_url = 'localhost:8080'
function downloadReport(){

}
function getAllReports(){
    axios.get(base_url+'/uploads/reports/excel/').then((response)=>{
        console.log(response.data)
    })
}
getAllReports()
$(document).ready(() => {
    $("#update-profile").click(() => {
        updateProfileInfo();
        location.reload();
    })
})
