const staff_id = sessionStorage.getItem("staff_id");
function getProfileInfo() {
    return axios.get(base_url + '/api/staff/' + staff_id + '')
        .then(response => response.data)
        .catch(err => error(err));
};

function updateProfileInfo() {
    axios.put(base_url + '/api/staff/personal/' + staff_id + '',
        {
            staff_abbrv: $("#staff-abbrv")[0].value,
            staff_email: $("#staff-email")[0].value,
            staff_number: $("#staff-contactnumber")[0].value,
            staff_mobile: $("#staff-mobilenumber")[0].value,
            staff_remarks: $("#staff-remarks")[0].value
        })
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

async function inputValidation() {
    let upper = new RegExp('^[A-Z]+$')
    let numbers = new RegExp('^[0-9]+$')
    let remarks = new RegExp('^[a-zA-Z1-9,!.? ]+$')
    let staff_abbrv = $("#staff-abbrv")[0].value
    let staff_number =$("#staff-contactnumber")[0].value
    let staff_mobile = $("#staff-mobilenumber")[0].value
    let staff_remarks = $("#staff-remarks")[0].value
    if (!numbers.test(staff_number) || !numbers.test(staff_mobile)) {
        throw "Only numbers are allowed for contact info."
    }
    if (!remarks.test(staff_remarks)) {
        throw "Only alphanumerics and ' ,  !  .  ? ' allowed for remarks."
    }
    if (!upper.test(staff_abbrv)) {
        throw "Only uppercase letters allowed for staff abbrv."
    }



}


// START OF SCRIPT
generateProfile();

$(document).ready(() => {
    $("#update-profile").click(() => {
        inputValidation()
        .then(()=>{
            updateProfileInfo();
        })
        .catch(err => error(err))
    })
})
