function getCourse() {
    return axios.get(base_url + '/api/course/?status=active')
        .then(response => response.data)
        .catch(err => error(err));
};

function getStage() {
    return axios.get(base_url + '/api/cas/module/stage/?semester_code=' + sessionStorage.getItem('semester_code'))
        .then(response => response.data)
        .catch(err => error(err));
};

function getModulesBySectionAndStage(section, mod_stage) {
    return axios.get(base_url + '/api/module/section/stage?section=' + section + '&semester_code=' + sessionStorage.getItem('semester_code') + '&mod_stage=' + mod_stage)
        .then(response => response.data)
        .catch(err => error(err));
};

function getAssignedModulesByCode(mod_code) {
    return axios.get(base_url + '/api/module/assign?mod_code=' + mod_code + '&semester_code=' + sessionStorage.getItem('semester_code'))
        .then(response => response.data)
        .catch(err => error(err));
};

function updateModule(mod_code) {
    return axios.put(base_url + '/api/cas/module',
    {
        normal_students: $("#input-student-normal")[0].value,
        os_students: $("#input-student-os")[0].value,
        total_students: $("#input-student-total")[0].value,
        mod_code : mod_code,
        semester_code : sessionStorage.getItem('semester_code')
    })
    .then(() => {
        $("#module-warning").empty();
        success("module");
    })
    .catch(err => {
        error(err)
    });
}

function updateNormalStudents(section,mod_stage) {
    return axios.put(base_url + '/api/cas/module/stage',
    {
        normal_students: $("#input-module-normal")[0].value,
        course_id : section,
        mod_stage : mod_stage,
        semester_code : sessionStorage.getItem('semester_code')
    })
    .then(() => {
        $("#normal-warning").empty();
        success("normal");
    })
    .catch(err => {
        error(err)
    });
}

async function inputValidation(type) {
    let number = new RegExp('^[0-9]+$')
    if (type == "normal") {
        let normal_students = $("#input-module-normal")[0].value
        if (!number.test(normal_students) ) {
            throw "Only numeric inputs allowed."
        }
    }
    if (type == "os") {
        let normal = $("#input-student-normal")[0].value
        let os = $("#input-student-os")[0].value
        let total = $("#input-student-total")[0].value
        if (!number.test(normal) || !number.test(os) || !number.test(total)) {
            throw "Only numeric inputs allowed."
        }
    }
}


async function calculateModuleClasses(module) {
    return {
        // Total Students taking module
        "normal_students" : module.normal_students,
        "os_students" : module.os_students,
        "total_students": module.normal_students + module.os_students,
    }
}

async function generateSection() {
    let courses = await getCourse();
    for (let index = 0; index < courses.length; index++) {
        const section = courses[index];
        $("#select-section").append(`<option value="` + section.course_id + `">` + section.course_id + `</option>`)
    }
}

async function generateStage() {
    let stages = await getStage();
    for (let index = 0; index < stages.length; index++) {
        const stage = stages[index];
        $("#select-stage").append(`<option value="` + stage.mod_stage + `">` + stage.mod_stage + `</option>`)
    }
}

async function generateModuleList() {
    $(".module-list").empty();
    let section = $("#select-section option:selected").val();
    let mod_stage = $("#select-stage option:selected").val();
    let modules = await getModulesBySectionAndStage(section,mod_stage);
    let normal_students = null;
    $("#caption").empty();
    $("#caption").append(`Showing ` + modules.length + ` Results`);
    if (modules.length > 0) {
        normal_students = modules[0].normal_students;
    }
    if (normal_students == null) {
        normal_students = 0;
    }
    $("#input-module-normal")[0].value = normal_students;
    for (let index = 0; index < modules.length; index++) {
        const module = modules[index];
        let classes = await calculateModuleClasses(module);
        let normal_students = classes.normal_students
        let os_students = classes.os_students
        let total_students = classes.total_students;
        if (normal_students == null) {
            normal_students = 0;
        }
        if (os_students == null) {
            os_students = 0;
        }
        if (total_students == null) {
            total_students = 0;
        }
        $(".module-list").append(`
        <tr class="border-bottom border-white module-`+ index + ` align-middle">
            <td>`+ module.mod_code + `</td>
            <td>`+ module.mod_name + `</td>
            <td>`+ normal_students + `</td>
            <td>`+ os_students + `</td>
            <td>`+ total_students + `</td>
            <td class="text-end">
                <button class="btn btn-success view-module"type="button" data-id="`+ index + `" data-bs-toggle="modal" data-bs-target="#teaching-assignment-modal">View</button>
            </td>
        </tr>`);
        if (total_students == 0) {
            $('.module-' + index).addClass("status-unassigned")
        }
    }
};


async function generateModal(module_index) {
    let section = $("#select-section option:selected").val();
    let mod_stage = $("#select-stage option:selected").val();
    let modules = await getModulesBySectionAndStage(section,mod_stage);
    let module = modules[module_index]
    let classes = await calculateModuleClasses(module);
    let mod_code = module.mod_code;
    let normal_students = classes.normal_students
    let os_students = classes.os_students
    let total_students = classes.total_students;
    if (normal_students == null) {
        normal_students = 0;
    }
    if (os_students == null) {
        os_students = 0;
    }
    if (total_students == null) {
        total_students = 0;
    }
    $(".modal-information").empty();
    $(".modal-information").append(`
    <!-- Content header -->
    <div class="modal-header">
        <h5 class="modal-title" id="teaching-assignment-modal">`+ module.mod_name + ` ` + module.mod_code + `</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <!-- Content -->
    <div class="modal-body">
        <!-- Module Information -->
        <div class="modal-section-title">Module Information</div>
        <div class="line2"></div>
        <!-- Table -->
        <div class = "overflow-hidden py-1">
            <div class = "form-group row align-middle py-1">
                <label for="input-student" class="col-4 col-form-label">Normal Students:</label>
                <div class="col-4">
                    <input type="number" min="0" value="`+ normal_students + `"class="form-control form-control-sm" id="input-student-normal" disabled>   
                </div>
            </div>
            <div class = "form-group row align-middle py-1">

                <label for="input-student" class="col-4 col-form-label">Out-Of-Sync Students:</label>
                <div class="col-4">
                    <input type="number" min="0" value="`+ os_students + `"class="form-control form-control-sm module-input" id="input-student-os">   
                </div>
                
            </div>
            <div class = "form-group row align-middle py-1">
                <label for="input-student" class="col-4 col-form-label">Total No. of Students:</label>
                <div class="col-4">
                    <input type="number" min="0" value="`+ total_students + `"class="form-control form-control-sm" id="input-student-total" disabled>   
                </div>
                
            </div>            
            <div class = "row py-1">
            <div class = "col warning-message" id="module-warning">
                
            </div>
            <div class = "col">
                <!-- Update Button -->
                <button type="button" class="btn btn-primary float-end module-changes" data-code="`+ mod_code +`">Save Changes</button>
            </div>
        </div>

        </div>


    </div>
    `);

}


async function updateModuleInformation(mod_code) {
    inputValidation("os")
    .then(async()=>{
        await updateModule(mod_code)
    })
    .then(() => {
        generateModuleList();
    })
    .catch(err => error(err));
    
}

async function submitNormalStudents(){
    let section = $("#select-section option:selected").val();
    let mod_stage = $("#select-stage option:selected").val();
    let modules = await getModulesBySectionAndStage(section,mod_stage);
    if (modules.length == 0) {
        error("There are currently no modules to update")
    }
    else {
        inputValidation("normal")
        .then(async()=>{
            await updateNormalStudents(section,mod_stage)
        })
        .then(() => {
            generateModuleList();
        })
        .catch(err => error(err));
    }
    
}

async function updateTotalStudents(){
    $("#input-student-total")[0].value = parseInt($("#input-student-os")[0].value) + parseInt($("#input-student-normal")[0].value)
}


$(document).ready(() => {
    generateSection();
    generateStage();

    $(".module-list").on('click', ".view-module", (e) => {
        let index = $(e.target).data("id");
        generateModal(index);
    })
    $("#select-section").on('change', () => {
        generateModuleList();
    });
    $("#select-stage").on('change', () => {
        generateModuleList();
    });

    $("#teaching-assignment-modal").on('click', ".module-changes", (e) => { 
        let mod_code = $(e.target).data("code");

        updateModuleInformation(mod_code)
        .catch(err => {
            error(err)
        });
    })

    $("#teaching-assignment-modal").on('change', ".module-input", () => {
        $("#module-warning").empty();
        $("#module-warning").append(`<p>Changes Not Saved!</p>`);
        updateTotalStudents();
    })

    $("#input-module-normal").change(()=>{
        $("#normal-warning").empty();
        $("#normal-warning").append(`<p>Changes Not Saved!</p>`);
    })

    $(".submit-normal").click(()=>{
        submitNormalStudents();
    })


});