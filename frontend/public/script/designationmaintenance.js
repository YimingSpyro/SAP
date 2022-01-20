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

async function generateSectionList() {
    let sections = await getCourse();
    for (let index = 0; index < sections.length; index++) {
        const section = sections[index];
        $("#select-section").append(`<option value="` + section.course_id + `">`+ section.course_id +`</option`)
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

    </div>
    <button type="submit" class="btn btn-primary float-end create-designation-button">Create designation</button>`);
    let sections = await getCourse();
    for (let index = 0; index < sections.length; index++) {
        const section = sections[index];
        $("#select-section-create").append(`<option value="` + section.course_id + `">`+ section.course_id +`</option`)
    }
}

async function confirmDeleteDesignation(designation_index) {
    $("#delete-designation .designation-name-delete").empty();
    let designations = await getDesignation();
    let designation = designations[designation_index];
    $("#delete-designation .designation-name-delete").append(designation.designation_name + ` - ` + designation.fk_course_id + ` - ` + designation.section_name);
    $("#delete-designation .confirm-delete-button").empty();
    $("#delete-designation .confirm-delete-button").append(`
    <button type="button" class="btn btn-danger delete-designation mx-4" data-index="`+ designation_index +`" data-bs-dismiss="modal">Delete</button>
    <button type="button" class="btn btn-primary mx-4" data-bs-dismiss="modal">Close</button>`);
}

async function confirmedDelete(designation_index){
    let designations = await getDesignation();
    let designation = designations[designation_index];
    let designation_id = designation.designation_id
    let section = $("#select-section option:selected").val()
    deleteDesignation(designation_id)
    .then(()=>{ 
        generateDesignationList(section)
    });
}

async function confirmedCreation(){
    let section = $("#select-section option:selected").val()
    await createDesignation()
    .then(()=>{
        generateDesignationList(section)
        $("#create-designation-modal").modal('hide')
    });
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
        confirmDeleteDesignation(designation_index);
    })

    $("#delete-designation").on('click', ".delete-designation", (e) => {
        let designation_index = $(e.target).data("index");
        confirmedDelete(designation_index);
    })

    $(".create-designation").click(()=>{
        generateCreateDesignation();
    })

    $("#create-designation-modal").on('click', ".create-designation-button", ()=>{
        confirmedCreation();
    })
})