function getStaffTypes(){
    return axios.get(base_url + '/api/staff/types')
        .then(response => response.data)
        .catch(err => error(err));
}

function createStaffType() {
    return axios.post(base_url + '/api/staff/types/',
    {
        staff_type : $("#staff-type-create")[0].value,
        staff_description : $("#description-create")[0].value,
        hours : $("#hours-create")[0].value,
        remarks : $("#remarks-create")[0].value
    })
    .then(() => {
        $("#create-staff-type-modal").modal('hide')
        success("created")
        generateStaffTypesList()
    })
    .catch(err => error(err));
}

function deleteStaffType(staff_type){
    return axios.delete(base_url + '/api/staff/types/?staff_type=' + staff_type)
    .then(() => {
        success("deleted");
        generateStaffTypesList()
    })
    .catch(err => error(err));
}

function updateStaffType(){
    return axios.put(base_url + '/api/staff/types/',
    {
        staff_type : $("#staff-type-update")[0].value,
        staff_description : $("#description-update")[0].value,
        hours : $("#hours-update")[0].value,
        remarks : $("#remarks-update")[0].value
    })
    .then(() => {
        success("updated");
        generateStaffTypesList()
    })
    .catch(err => error(err));
}

async function inputValidation(type) {
    let description_check = new RegExp('^[A-Za-z ]+$')
    let type_check = new RegExp('^[A-Za-z0-9 ]+$')
    let hours = new RegExp('^[0-9]+$')
    if (type == "create") {
        let create_type = $("#staff-type-create")[0].value
        let create_description = $("#description-create")[0].value
        let create_hours = $("#hours-create")[0].value
        let create_remarks = $("#remarks-create")[0].value
        if (!hours.test(create_hours) ) {
            throw "Only numeric inputs allowed for hours."
        }
        if (!type_check.test(create_type) ) {
            throw "Only alphanumerics allowed for staff type."
        }
        if (!description_check.test(create_description)) {
            throw "Only uppercase and lowercase letters allowed for description."
        }
        if (!description_check.test(create_remarks)) {
            throw "Only uppercase and lowercase letters allowed for remarks."
        }
    }
    if (type == "update") {
        let update_type = $("#staff-type-update")[0].value
        let update_description = $("#description-update")[0].value
        let update_hours = $("#hours-update")[0].value
        let update_remarks = $("#remarks-update")[0].value
        if (!hours.test(update_hours) ) {
            throw "Only alphanumerics allowed for staff type."
        }
        if (!type_check.test(update_type) ) {
            throw "Only numeric inputs allowed for hours."
        }
        if (!description_check.test(update_description)) {
            throw "Only uppercase and lowercase letters allowed for description."
        }
        if (!description_check.test(update_remarks)) {
            throw "Only uppercase and lowercase letters allowed for remarks."
        }
    }
}

async function generateStaffTypesList(){
    $(".staff-type-list").empty();
    let types = await getStaffTypes();
    for (let index = 0; index < types.length; index++) {
        const type = types[index];
        let remarks = type.remarks;
        if(remarks == null){
            remarks = "";
        }
        
        $(".staff-type-list").append(`
        <tr class="border-bottom border-white align-middle">
            <td>`+ type.staff_type + `</td>
            <td>`+ type.staff_description + `</td>
            <td>`+ type.hours + `</td>
            <td>`+ remarks + `</td>
            <td class="text-end">
                <button class="btn btn-success update-staff-type"type="button" data-index="`+ index + `" data-bs-toggle="modal" data-bs-target="#update-staff-type-modal">Edit</button>
            </td>
            <td class="text-end">
                <button class="btn btn-danger confirm-delete-type"type="button" data-index="`+ index + `" data-bs-toggle="modal" data-bs-target="#delete-staff-type-modal">Delete</button>
            </td>
        </tr>`)
    }
}

async function generateCreateStaffType(){
    $(".create-staff-type-modal").empty();
    $(".create-staff-type-modal").append(`
    <div class="form-group">
        <div class="row mb-4">
            <label for="staff-type-id" class="col-sm-3 col-form-label col-form-label-sm">Staff Type:</label>
            <div class="col-sm-1">
                <input type="text" class="form-control form-control-sm" id="staff-type-create" placeholder="AL">
            </div>
        </div>
        <div class="row mb-4">
            <label for="description-create" class="col-sm-3 col-form-label col-form-label-sm">Description:</label>
            <div class="col-sm-3">
                <input type="text" class="form-control form-control-sm" id="description-create" placeholder="Adjunct Lecturer">
            </div>
        </div>
        <div class="row mb-4">
            <label for="hours-create" class="col-sm-3 col-form-label col-form-label-sm">Hours:</label>
            <div class="col-sm-1">
                <input type="number" min="0"  class="form-control form-control-sm" id="hours-create" value="0">
            </div>
        </div>
        <div class="row mb-4">
            <label for="remarks-create" class="col-sm-3 col-form-label col-form-label-sm">Remarks:</label>
            <div class="col-sm-5">
                <input type="text" class="form-control form-control-sm" id="remarks-create" placeholder="Enter Remarks">
            </div>
        </div>
    </div>
    <button type="submit" class="btn btn-primary float-end submit-create-staff-type">Create Staff Type</button>`);
}

async function generateUpdateStaffType(index){
    let types = await getStaffTypes();
    let type = types[index]
    let remarks = type.remarks;
    if(remarks == null){
        remarks = "";
    }
    $(".update-staff-type-modal").empty();
    $(".update-staff-type-modal").append(`
    <div class="form-group">
        <div class="row mb-4">
            <label for="staff-type-update" class="col-sm-3 col-form-label col-form-label-sm">Staff Type:</label>
            <div class="col-sm-1">
                <input type="text" class="form-control form-control-sm" id="staff-type-update" value="`+type.staff_type+`">
            </div>
        </div>
        <div class="row mb-4">
            <label for="description-update" class="col-sm-3 col-form-label col-form-label-sm">Description:</label>
            <div class="col-sm-3">
                <input type="text" class="form-control form-control-sm" id="description-update" value="`+type.staff_description+`">
            </div>
        </div>
        <div class="row mb-4">
            <label for="hours-update" class="col-sm-3 col-form-label col-form-label-sm">Hours:</label>
            <div class="col-sm-1">
                <input type="number" min="0"  class="form-control form-control-sm" id="hours-update" value="`+type.hours+`">
            </div>
        </div>
        <div class="row mb-4">
            <label for="remarks-update" class="col-sm-3 col-form-label col-form-label-sm">Remarks:</label>
            <div class="col-sm-5">
                <input type="text" class="form-control form-control-sm" id="remarks-update" value="`+remarks+`">
            </div>
        </div>
    </div>
    <button type="submit" class="btn btn-primary float-end update-staff-type" data-bs-dismiss="modal">Update Staff Type</button>`);
}

async function generateDelete(index){
    let types = await getStaffTypes();
    let type = types[index]
    $(".staff-type-name-delete").empty();
    $(".staff-type-name-delete").append(type.staff_type + ` - ` + type.staff_description);
    $(".confirm-delete-button").empty();
    $(".confirm-delete-button").append(`
    <button type="button" class="btn btn-danger delete-staff-type mx-4" data-index="`+index+`" data-bs-dismiss="modal">Delete</button>
    <button type="button" class="btn btn-primary mx-4" data-bs-dismiss="modal">Close</button>`);
}

async function confirmedDelete(index){
    let types = await getStaffTypes();
    let type = types[index]
    let staff_type = type.staff_type;
    await deleteStaffType(staff_type)
}

async function confirmedUpdate(){
    inputValidation("update")
    .then(async()=>{
        await updateStaffType();
    })
    .catch(err => error(err))
}

$(document).ready(()=>{
    generateStaffTypesList()

    $(".create-staff-type").click(()=>{
        generateCreateStaffType();
    })

    $("#create-staff-type-modal").on('click', '.submit-create-staff-type',()=>{
        inputValidation("create")
        .then(async()=>{
            await createStaffType();
        })
        .catch(err => error(err));
    })

    $(".staff-type-list").on('click', ".confirm-delete-type", (e)=>{
        let index = $(e.target).data("index");
        generateDelete(index);
    })

    $(".staff-type-list").on('click', ".update-staff-type", (e)=>{
        let index = $(e.target).data("index");
        generateUpdateStaffType(index);
    })

    $("#delete-staff-type-modal").on('click',".delete-staff-type", (e)=>{
        let index = $(e.target).data("index");
        confirmedDelete(index);
    })

    $("#update-staff-type-modal").on('click',".update-staff-type", ()=>{
        confirmedUpdate();
    })
})