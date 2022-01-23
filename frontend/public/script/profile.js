const staff_id = sessionStorage.getItem("staff_id");
function getProfileInfo(){
    return axios.get(base_url + '/api/staff/'+staff_id+'') //SAMPLE
    .then(response => response.data)
    .catch(err => error(err));
};

function updateProfileInfo(){
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    axios.put(base_url + '/api/staff/personal/'+staff_id+'',
    {
        staff_name: $("#staff-name")[0].value,
        staff_abbrv: $("#staff-abbrv")[0].value,
        staff_email: $("#staff-email")[0].value,
        staff_number: $("#staff-contactnumber")[0].value,
        staff_mobile: $("#staff-mobilenumber")[0].value,
        staff_remarks: $("#staff-remarks")[0].value
    })
    /* .then(() => {
        return axios.post(base_url + '/uploads/profile-picture/8405',{},config)
    }) */
    .then(() => success())
    .catch(err => error(err));
}

async function generateProfile() {
    let response = await getProfileInfo();
    let data = response[0];
    $("#staff-id")[0].value = data.staff_id;
    $("#staff-name")[0].value = data.staff_name;
    $("#staff-abbrv")[0].value = data.staff_abbrv;
    $("#staff-type")[0].value = data.fk_staff_type;
    $("#staff-des")[0].value = data.designation_name;
    $("#staff-email")[0].value = data.staff_email;
    $("#staff-contactnumber")[0].value = data.staff_number;
    $("#staff-mobilenumber")[0].value = data.staff_mobile;
    $("#staff-remarks")[0].value = data.staff_remarks;
}


// START OF SCRIPT
generateProfile();

$(document).ready(() => {
    $("#update-profile").click(() => {
        updateProfileInfo();
    })
})
