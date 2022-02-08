function getSemester(status) {
    return axios.get(base_url + '/api/semester/?status='+ status)
        .then(response => response.data)
        .catch(err => error(err));
};

function createSemester() {
    return axios.post(base_url + '/api/semester/',
    {
        semester_id : $("#semester-id-create")[0].value,
        semester_code : $("#semester-code-create")[0].value,
        remarks : $("#semester-remarks-create")[0].value
    })
    .then(() => {
        $("#create-semester").modal('hide')
        success("created")
        generateSemesterList()
    })
    .catch(err => error(err));
}

function updateSemester(semester_id_old) {
    return axios.put(base_url + '/api/semester/',
    {
        semester_id : $("#semester-id-update")[0].value,
        semester_code : $("#semester-code-update")[0].value,
        remarks : $("#semester-remarks-update")[0].value,
        semester_id_old : semester_id_old
    })
    .then(() => {
        $("#view-semester").modal('hide')
        success("updated");
    })
    .catch(err => error(err));
}

function disableSemester(semester_id) {
    return axios.put(base_url + '/api/semester/disable',
    {
        semester_id : semester_id
    })
    .then(() => {
        success("disabled");
    })
    .catch(err => error(err));
}

function deleteSemester(semester_id) {
    return axios.delete(base_url + '/api/semester?semester_id=' + semester_id)
    .then(() => {
        success("deleted");
    })
    .catch(err => error(err));
}

function enableSemester(semester_id) {
    return axios.put(base_url + '/api/semester/enable',
    {
        semester_id : semester_id
    })
    .then(() => {
        success("enabled");
    })
    .catch(err => error(err));
}

async function inputValidation(type) {
    let id_check = new RegExp('^[A-Za-z0-9]+$')
    let code_check = new RegExp('^[A-Za-z0-9/ ]+$')
    let alpha_num = new RegExp('^[A-Za-z0-9 ]+$')
    if (type == "create") {
        let create_id = $("#semester-id-create")[0].value
        let create_code = $("#semester-code-create")[0].value
        let create_remarks = $("#semester-remarks-create")[0].value
        if (!id_check.test(create_id)) {
            throw "Semester ID only allows alphanumerics and no spacing."
        }
        if (!code_check.test(create_code)) {
            throw "Semester Code only allows alphanumerics and '/'."
        }
        if (!alpha_num.test(create_remarks)) {
            throw "Remarks only allows alphanumerics."
        }
    }
    if (type == "update") {
        let update_id = $("#semester-id-update")[0].value
        let update_code = $("#semester-code-update")[0].value
        let update_remarks = $("#semester-remarks-update")[0].value
        if (!id_check.test(update_id)) {
            throw "Semester ID only allows alphanumerics and no spacing."
        }
        if (!code_check.test(update_code)) {
            throw "Semester Code only allows alphanumerics and '/'."
        }
        if (!alpha_num.test(update_remarks)) {
            throw "Remarks only allows alphanumerics."
        }
    } 
}

async function generateSemesterList() {
    let status = $("#select-status option:selected").val()
    $(".semester-list").empty();
    let semesters = await getSemester(status)
    for (let index = 0; index < semesters.length; index++) {
        const semester = semesters[index];
        let remarks =  semester.remarks;
        if (remarks == null) {
            remarks = ""
        }
        if (status == "active") {
            $(".semester-list").append(`
            <tr class="border-bottom border-white align-middle">
                <td>`+ semester.semester_id + `</td>
                <td>`+ semester.semester_code + `</td>
                <td>`+ remarks + `</td>
                <td class="text-end">
                    <button class="btn btn-success view-semester"type="button" data-index="`+ index + `" data-bs-toggle="modal" data-bs-target="#view-semester">Edit</button>
                </td>
                <td class="text-end">
                <button class="btn btn-danger confirm-delete-semester"type="button" data-index="`+ index + `" data-bs-toggle="modal" data-bs-target="#delete-semester">Deactivate</button>
            </td>
            </tr>`);
        }
        else {
            $(".semester-list").append(`
            <tr class="border-bottom border-white align-middle">
                <td>`+ semester.semester_id + `</td>
                <td>`+ semester.semester_code + `</td>
                <td>`+ remarks + `</td>
                <td class="text-end">
                    <button class="btn btn-success reactivate" type="button" data-index="`+ index + `">Reactivate</button>
                </td>
                <td class="text-end">
                <button class="btn btn-danger delete-forever" type="button" data-index="`+ index + `" data-bs-toggle="modal" data-bs-target="#delete-semester-forever">Delete</button>
            </td>
            </tr>`);
        }

    }
    $("#caption").empty();
    $("#caption").append(`Showing `+ semesters.length +` Results`)
    $(".semester-warning").empty();
    if (semesters.length > 1 && status == "active") { 
        $(".semester-warning").append(`<p>WARNING: More than 2 semesters active!</p>`);
    }
}

async function generateCreateSemester() {
    $(".create-semester-content").empty();
    $(".create-semester-content").append(`
    <div class="form-group row my-4">
        <div class="row col-4 me-2">
            <label for="semester-id" class="col-sm-5 col-form-label col-form-label-sm">Semester ID:</label>
            <div class="col-sm-7">
                <input type="text" class="form-control form-control-sm" id="semester-id-create" placeholder="20212022SEM1">
            </div>
        </div>
        <div class="row col-4 mx-2">
            <label for="semester-code-create" class="col-sm-5 col-form-label col-form-label-sm">Semester Code:</label>
            <div class="col-sm-7">
                <input type="text" class="form-control form-control-sm" id="semester-code-create" placeholder="AY 2021/2022 SEM1">
            </div>
        </div>
        <div class="row col-3 ms-2 mb-4">
            <label for="semester-remarks-create" class="col-sm-4 col-form-label col-form-label-sm">Remarks:</label>
            <div class="col-sm-8">
                <input type="text" class="form-control form-control-sm" id="semester-remarks-create" placeholder="Enter Remarks">
            </div>
        </div>
        <div><p id="create-note">NOTE: New Semesters will be inactive by default.</p></div>
    </div>
    <button type="submit" class="btn btn-primary float-end create-semester">Create Semester</button>`);
}

async function generateSemesterUpdate(semester_index) {
    let status = $("#select-status option:selected").val()
    let semesters = await getSemester(status);
    let semester = semesters[semester_index];
    let remarks =  semester.remarks;
    if (remarks == null) {
        remarks = ""
    }
    $("#view-semester-title").empty();
    $("#view-semester-title").append(semester.semester_code);
    $(".view-semester-content").empty();
    $(".view-semester-content").append(`
    <div class="form-group row my-3">
        <div class="row col-4 me-2">
            <label for="semester-id" class="col-sm-5 col-form-label col-form-label-sm">Semester ID:</label>
            <div class="col-sm-7">
                <input type="text" class="form-control form-control-sm" id="semester-id-update" value="`+ semester.semester_id +`">
            </div>
        </div>
        <div class="row col-4 mx-2">
            <label for="semester-code-update" class="col-sm-5 col-form-label col-form-label-sm">Semester Code:</label>
            <div class="col-sm-7">
                <input type="text" class="form-control form-control-sm" id="semester-code-update" value="`+ semester.semester_code +`">
            </div>
        </div>
        <div class="row col-3 ms-2 mb-4">
            <label for="semester-remarks-update" class="col-sm-4 col-form-label col-form-label-sm">Remarks</label>
            <div class="col-sm-8">
                <input type="text" class="form-control form-control-sm" id="semester-remarks-update" value="`+ remarks +`">
            </div>
        </div>


    </div>
    <button type="submit" class="btn btn-primary float-end update-semester" data-id="`+semester.semester_id+`" data-index="`+semester_index+`">Update Semester</button>`)
}

async function confirmDeleteSemester(semester_index) {
    $("#delete-semester .semester-name-delete").empty();
    let status = $("#select-status option:selected").val()
    let semesters = await getSemester(status);
    let semester = semesters[semester_index];
    $("#delete-semester .semester-name-delete").append(semester.semester_code);
    $("#delete-semester .confirm-delete-button").empty();
    $("#delete-semester .confirm-delete-button").append(`
    <button type="button" class="btn btn-danger delete-semester mx-4" data-index="`+semester_index+`" data-bs-dismiss="modal">Deactivate</button>
    <button type="button" class="btn btn-primary mx-4" data-bs-dismiss="modal">Close</button>`);
}

async function deactivateSemester(semester_index) {
    let status = $("#select-status option:selected").val()
    let semesters = await getSemester(status);
    let semester = semesters[semester_index];
    let semester_id = semester.semester_id;
    await disableSemester(semester_id);
}

async function activateSemester(semester_index) {
    let status = $("#select-status option:selected").val()
    let semesters = await getSemester(status);
    let semester = semesters[semester_index];
    let semester_id = semester.semester_id;
    await enableSemester(semester_id);
}

async function confirmDeleteSemesterForever(semester_index) {
    $("#delete-semester-forever .semester-name-delete").empty();
    let status = $("#select-status option:selected").val()
    let semesters = await getSemester(status);
    let semester = semesters[semester_index];
    $("#delete-semester-forever .semester-name-delete").append(semester.semester_code);
    $("#delete-semester-forever .confirm-delete-button").empty();
    $("#delete-semester-forever .confirm-delete-button").append(`
    <button type="button" class="btn btn-danger delete-semester-forever mx-4" data-index="`+semester_index+`" data-bs-dismiss="modal">Delete</button>
    <button type="button" class="btn btn-primary mx-4" data-bs-dismiss="modal">Close</button>`);
}

async function deleteSemesterForever(semester_index) {
    let status = $("#select-status option:selected").val()
    let semesters = await getSemester(status);
    let semester = semesters[semester_index];
    let semester_id = semester.semester_id;
    await deleteSemester(semester_id);
}

$(document).ready(() => {
    generateSemesterList();


    $(".create-semester-button").click(()=>{
        generateCreateSemester();
    });

    $(".create-semester-content").on('click', ".create-semester", ()=>{
        inputValidation("create")
        .then(()=>{
            createSemester();
        })
        .catch(err => error(err))
        
    });

    $(".semester-list").on('click', ".view-semester", (e) => {
        let semester_index = $(e.target).data("index");
        generateSemesterUpdate(semester_index);
    })

    $("#view-semester").on('click', ".update-semester", (e) => {
        let semester_index = $(e.target).data("index");
        let semester_id_old = $(e.target).data("id");
        inputValidation("update")
        .then(async()=>{
            await updateSemester(semester_id_old)
        })
        .then(()=>{
            generateSemesterList();
            generateSemesterUpdate(semester_index);
        })
        .catch(err => error(err));
    })

    $(".semester-list").on('click', ".confirm-delete-semester", (e) => {
        let semester_index = $(e.target).data("index");
        confirmDeleteSemester(semester_index);
    })

    $("#delete-semester").on('click', ".delete-semester", (e) => {
        let semester_index = $(e.target).data("index");
        deactivateSemester(semester_index)
        .then(()=>{
            generateSemesterList();
        });
    })

    $("#select-status").change(()=>{
        generateSemesterList();
    })

    $(".semester-list").on('click', ".delete-forever", (e) => {
        let semester_index = $(e.target).data("index");
        confirmDeleteSemesterForever(semester_index);
    })

    $("#delete-semester-forever").on('click', ".delete-semester-forever", (e) => {
        let semester_index = $(e.target).data("index");
        deleteSemesterForever(semester_index)
        .then(()=>{
            generateSemesterList();
        });
    })

    $(".semester-list").on('click', ".reactivate", (e) => {
        let semester_index = $(e.target).data("index");
        activateSemester(semester_index)
        .then(()=>{
            generateSemesterList();
        });
    })




});