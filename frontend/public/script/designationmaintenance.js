function getDesignation() {
    return axios.get(base_url + '/api/designation/')
        .then(response => response.data)
        .catch(err => error(err));
};

function getCourse() {
    return axios.get(base_url + '/api/course/?status=active')
        .then(response => response.data)
        .catch(err => error(err));
};

function createDesignation() {
    return axios.post(base_url + '/api/designation',
    {
        designation_name :  $("#designation-name-create")[0].value,
        course_id :  $("#select-section-create option:selected").val(),
        section_name : $("#section-name-create")[0].value
    })
    .then(() => {
        success("created");
    })
    .catch(err => error(err));
}

function deleteDesignation(id) {
    let designation_id = "DESIG" + id;
    return axios.delete(base_url + '/api/designation?designation_id=' + designation_id)
    .then(() => {
        success("deleted");
    })
    .catch(err => error(err));
}

function updateDesignation(id){
    let designation_id = "DESIG" + id;
    return axios.put(base_url + '/api/designation/',
    {
        designation_name :  $("#designation-name-update")[0].value,
        course_id :  $("#select-section-update option:selected").val(),
        section_name : $("#section-name-update")[0].value,
        designation_id : designation_id
    })
    .then(() => {
        success("updated");
        generateDesignationList()
    })
    .catch(err => error(err));
}

async function inputValidation(type) {
    let sections = await getCourse();
    let courses = []
    let alpha_num = new RegExp('^[A-Za-z0-9- ]+$')
    for (let index = 0; index < sections.length; index++) {
        const section = sections[index];
        courses.push(section.course_id);
    }
    if (type == "create") {
        let create_course = $("#select-section-create option:selected").val()
        if (!courses.includes(create_course)) {
            throw "Invalid Input Detected"
        }
        let create_name = $("#designation-name-create")[0].value;
        let create_section = $("#section-name-create")[0].value
        if (!alpha_num.test(create_name) || !alpha_num.test(create_section)) {
            throw "Invalid Input Detected. Only Alphanumerics and '-' are allowed."
        }
    }
    if (type == "update") {
        let update_course = $("#select-section-update option:selected").val()
        if (!courses.includes(update_course)) {
            throw "Invalid Input Detected"
        }
        let update_name = $("#designation-name-update")[0].value;
        let update_section = $("#section-name-update")[0].value
        if (!alpha_num.test(update_name) || !alpha_num.test(update_section)) {
            throw "Invalid Input Detected. Only Alphanumerics and '-' are allowed."
        }
    } 
}

async function generateSectionList() {
    let sections = await getCourse();
    for (let index = 0; index < sections.length; index++) {
        const section = sections[index];
        $("#select-section").append(`<option value="` + section.course_id + `">`+ section.course_id +`</option>`)
    }
}

async function generateDesignationList(section) {
    $(".designation-list").empty();
    let designations = await getDesignation();
    let result_count = 0;
    if (section == "all sections") {
        for (let index = 0; index < designations.length; index++) {
            const designation = designations[index];
            $(".designation-list").append(`
            <tr class="border-bottom border-white align-middle">
                <td>`+ designation.designation_name + `</td>
                <td>`+ designation.fk_course_id + `</td>
                <td>`+ designation.section_name + `</td>
                <td class="text-end">
                    <button class="btn btn-success update-designation"type="button" data-index="`+ index + `" data-bs-toggle="modal" data-bs-target="#update-designation-modal">Edit</button>
                </td>
                <td class="text-end">
                <button class="btn btn-danger confirm-delete-designation"type="button" data-index="`+ index + `" data-bs-toggle="modal" data-bs-target="#delete-designation">Delete</button>
                </td>
            </tr>`  
            )
            
        }
        result_count = designations.length;
    }
    else {
        for (let index = 0; index < designations.length; index++) {
            const designation = designations[index];
            if (section == designation.fk_course_id) {
                $(".designation-list").append(`
                <tr class="border-bottom border-white align-middle">
                    <td>`+ designation.designation_name + `</td>
                    <td>`+ designation.fk_course_id + `</td>
                    <td>`+ designation.section_name + `</td>
                    <td class="text-end">
                        <button class="btn btn-success update-designation"type="button" data-index="`+ index + `" data-bs-toggle="modal" data-bs-target="#update-designation-modal">Edit</button>
                    </td>
                    <td class="text-end">
                    <button class="btn btn-danger confirm-delete-designation"type="button" data-index="`+ index + `" data-bs-toggle="modal" data-bs-target="#delete-designation">Delete</button>
                    </td>
                </tr>`  
                )
                result_count += 1;
            }
        }
    }
    $("#caption").empty();
    $("#caption").append(`Showing `+ result_count +` Results`);

}

async function generateCreateDesignation() {
    $(".create-designation-modal").empty();
    $(".create-designation-modal").append(`
    <div class="form-group my-3">
        <div class="row my-4">
            <label for="select-section-create" class="col-2 col-form-label col-form-label-sm">Select Course</label>
            <div class="col-4">
                <select class="form-select form-select-sm col-4" id="select-section-create">
                    
                </select>
            </div>
        </div>
        <div class="row my-4">
            <label for="designation-name-create" class="col-sm-2 col-form-label col-form-label-sm">Designation Name:</label>
            <div class="col-sm-4">
                <input type="text" class="form-control form-control-sm" id="designation-name-create" placeholder="Staff, Admin, etc.">
            </div>
        </div>
        <div class="row my-4">
            <label for="section-name-create" class="col-sm-2 col-form-label col-form-label-sm">Section Name:</label>
            <div class="col-sm-4">
                <input type="text" class="form-control form-control-sm" id="section-name-create" placeholder="DIT - Staff">
            </div>
        </div>
        <div><p id ="note">NOTE: Designation can only be created for active courses.</p></div>

    </div>
    <button type="submit" class="btn btn-primary float-end create-designation-button">Create designation</button>`);
    let sections = await getCourse();
    for (let index = 0; index < sections.length; index++) {
        const section = sections[index];
        $("#select-section-create").append(`<option value="` + section.course_id + `">`+ section.course_id +`</option>`)
    }
}

async function generateUpdateDesignation(designation_index) {
    let designations = await getDesignation();
    let designation = designations[designation_index];
    $(".update-designation-modal").empty();
    $(".update-designation-modal").append(`
    <div class="form-group my-3">
        <div class="row my-4">
            <label for="select-section-update" class="col-2 col-form-label col-form-label-sm">Select Course</label>
            <div class="col-4">
                <select class="form-select form-select-sm col-4" id="select-section-update">
                    
                </select>
            </div>
        </div>
        <div class="row my-4">
            <label for="designation-name-update" class="col-sm-2 col-form-label col-form-label-sm">Designation Name:</label>
            <div class="col-sm-4">
                <input type="text" class="form-control form-control-sm" id="designation-name-update" value="`+designation.designation_name+`">
            </div>
        </div>
        <div class="row my-4">
            <label for="section-name-update" class="col-sm-2 col-form-label col-form-label-sm">Section Name:</label>
            <div class="col-sm-4">
                <input type="text" class="form-control form-control-sm" id="section-name-update" value="`+designation.section_name+`">
            </div>
        </div>

    </div>
    <button type="submit" class="btn btn-primary float-end update-designation-button" data-id="`+designation.designation_id+`">Update designation</button>`);
    let sections = await getCourse();
    for (let index = 0; index < sections.length; index++) {
        const section = sections[index];
        if (section.course_id == designation.fk_course_id) {
            $("#select-section-update").append(`<option value="` + section.course_id + `" selected>`+ section.course_id +`</option>`)
        } 
        else {
            $("#select-section-update").append(`<option value="` + section.course_id + `">`+ section.course_id +`</option>`)
        }
        
    }
}

async function generateDeleteDesignation(designation_index) {
    $("#delete-designation .designation-name-delete").empty();
    let designations = await getDesignation();
    let designation = designations[designation_index];
    $("#delete-designation .designation-name-delete").append(designation.designation_name + ` - ` + designation.fk_course_id + ` - ` + designation.section_name);
    $("#delete-designation .confirm-delete-button").empty();
    $("#delete-designation .confirm-delete-button").append(`
    <button type="button" class="btn btn-danger delete-designation mx-4" data-id="`+ designation.designation_id +`" data-bs-dismiss="modal">Delete</button>
    <button type="button" class="btn btn-primary mx-4" data-bs-dismiss="modal">Close</button>`);
}

async function confirmedDelete(designation_id){
    let section = $("#select-section option:selected").val()
    deleteDesignation(designation_id)
    .then(()=>{ 
        generateDesignationList(section)
    });
}

async function confirmedCreation(){
    let section = $("#select-section option:selected").val()
    await inputValidation("create")
    .then(async()=>{
        await createDesignation()
    })
    .then(()=>{
        generateDesignationList(section)
        $("#create-designation-modal").modal('hide')
    })
    .catch(err => error(err));
}

async function submitUpdateDesignation(designation_id){
    let section = $("#select-section option:selected").val()
    await inputValidation("update")
    .then(async()=>{
        await updateDesignation(designation_id)
    })
    .then(()=>{ 
        generateDesignationList(section)
        $("#update-designation-modal").modal('hide');
    })
    .catch(err => error(err));
}



$(document).ready(()=>{
    generateSectionList();
    generateDesignationList($("#select-section option:selected").val());

    $("#select-section").change(()=>{
        let section = $("#select-section option:selected").val()
        generateDesignationList(section)
    })

    $(".designation-list").on('click', ".confirm-delete-designation", (e) => {
        let designation_index = $(e.target).data("index");
        generateDeleteDesignation(designation_index);
    })

    $(".designation-list").on('click', ".update-designation", (e) => {
        let designation_index = $(e.target).data("index");
        generateUpdateDesignation(designation_index);
    })

    $("#delete-designation").on('click', ".delete-designation", (e) => {
        let designation_id = $(e.target).data("id");
        confirmedDelete(designation_id);
    })

    $("#update-designation-modal").on('click', ".update-designation-button", (e) => {
        let designation_id = $(e.target).data("id");
        submitUpdateDesignation(designation_id);
    })

    $(".create-designation").click(()=>{
        generateCreateDesignation();
    })

    $("#create-designation-modal").on('click', ".create-designation-button", ()=>{
        confirmedCreation();
    })
})