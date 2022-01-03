// FUNCTIONS
function getProfileInfo(){
    axios.get('http://localhost:8080/api/staff/8405')
    .then((response) => {
        console.log(response.data[0]);
        let data = response.data[0];
        $("#staff-id")[0].value = data.staff_id;
        $("#staff-name")[0].value = data.staff_name;
        $("#staff-abbrv")[0].value = data.staff_abbrv;
        $("#staff-type")[0].value = data.fk_staff_type;
        $("#staff-des")[0].value = data.fk_designation_id;
        $("#staff-email")[0].value = data.staff_email;
        $("#staff-contactnumber")[0].value = data.staff_number;
        $("#staff-mobilenumber")[0].value = data.staff_mobile;
        $("#staff-remarks")[0].value = data.staff_remarks;
    });
}

function updateProfileInfo(){
    axios.put('http://localhost:8080/api/staff/8405',
    {
        staff_name : $("#staff-name")[0].value,
        staff_abbrv : $("#staff-abbrv")[0].value,
        staff_email : $("#staff-email")[0].value,
        staff_number : $("#staff-contactnumber")[0].value,
        staff_mobile : $("#staff-mobilenumber")[0].value,
        staff_remarks : $("#staff-remarks")[0].value
    })
}
// START OF SCRIPT
getProfileInfo();

$(document).ready(() => {
    $("#update-profile").click(() => {
        updateProfileInfo();
    })
})
