function getCourse() {
    return axios.get(base_url + '/api/course/')
        .then(response => response.data)
        .catch(err => error(err));
};

function getModulesBySection(section) {
    return axios.get(base_url + '/api/module/section?section=' + section + '&semester_code=' + localStorage.getItem('semester_code'))
        .then(response => response.data)
        .catch(err => error(err));
};

function getAssignedModulesByCode(mod_code) {
    return axios.get(base_url + '/api/module/assign?mod_code=' + mod_code + '&semester_code=' + localStorage.getItem('semester_code'))
        .then(response => response.data)
        .catch(err => error(err));
};

function updateModule(mod_code) {
    return axios.put(base_url + '/api/tas/cas/module',
    {
        mod_lecture: $("#input-lecture-hours")[0].value * 15,
        mod_tutorial: $("#input-tutorial-hours")[0].value * 15,
        mod_practical: $("#input-practical-hours")[0].value * 15,
        lecture_class: $("#input-lecture-classes")[0].value,
        tutorial_class: $("#input-tutorial-classes")[0].value,
        practical_class: $("#input-practical-classes")[0].value,
        total_students: $("#input-student")[0].value,
        mod_code : mod_code,
        semester_code : localStorage.getItem('semester_code') // SAMPLE DATA
    })
    .then(() => {
        $("#module-warning").empty();
        success("module");
    })
    .catch(err => {
        error(err)
    });
}


async function calculateModuleClasses(module) {
    let assigned = await getAssignedModulesByCode(module.mod_code);
    let assigned_classes = 0;
    let assigned_lecture = 0;
    let assigned_tutorial = 0;
    let assigned_practical = 0;
    for (let index = 0; index < assigned.length; index++) {
        const assignment = assigned[index];
        let assignment_classes = assignment.ma_lecture + assignment.ma_tutorial + assignment.ma_practical;
        assigned_lecture += assignment.ma_lecture;
        assigned_tutorial += assignment.ma_tutorial;
        assigned_practical += assignment.ma_practical;
        assigned_classes += assignment_classes;
    }
    let total_hours = module.mod_lecture + module.mod_tutorial + module.mod_practical;
    let to_be_assigned_classes = module.lecture_class + module.tutorial_class + module.practical_class;


    return {
        // Hours Per Week
        "lecture_per_week": module.mod_lecture / 15,
        "tutorial_per_week": module.mod_tutorial / 15,
        "practical_per_week": module.mod_practical / 15,
        // Number of Classes
        "classes_lecture": module.lecture_class,
        "classes_tutorial": module.tutorial_class,
        "classes_practical": module.practical_class,
        // Total Assigned to Module
        "assigned_lecture": assigned_lecture,
        "assigned_tutorial": assigned_tutorial,
        "assigned_practical": assigned_practical,
        // Module Total Hours Per Week
        "total_hours": total_hours / 15,
        // Total Students taking module
        "total_students": module.total_students,
        // Classes in total to assign
        "to_be_assigned_classes": to_be_assigned_classes,
        // Classes assigned in total
        "assigned_classes": assigned_classes
    }
}

async function generateSection() {
    let courses = await getCourse();
    for (let index = 0; index < courses.length; index++) {
        const section = courses[index];
        $("#select-section").append(`<option value="` + section.course_id + `">` + section.course_id + `</option>`)
    }
}

async function generateModuleList() {
    $(".module-list").empty();
    let section = $("#select-section option:selected").val();
    let modules = await getModulesBySection(section);
    $("#caption").empty();
    $("#caption").append(`Showing ` + modules.length + ` Results`);
    for (let index = 0; index < modules.length; index++) {
        const module = modules[index];
        let classes = await calculateModuleClasses(module);
        let classes_lecture = classes.classes_lecture;
        let classes_tutorial = classes.classes_tutorial;
        let classes_practical = classes.classes_practical;
        if (classes_lecture == null) {
            classes_lecture = 0;
        }
        if (classes_tutorial == null) {
            classes_tutorial = 0;
        }
        if (classes_practical == null) {
            classes_practical = 0;
        }
        $(".module-list").append(`
        <tr class="border-bottom border-white module-`+ index + ` align-middle">
            <td>`+ module.mod_code + `</td>
            <td>`+ module.mod_name + `</td>
            <td>`+ classes.total_hours + `</td>
            <td>`+ classes_lecture + `</td>
            <td>`+ classes_tutorial + `</td>
            <td>`+ classes_practical + `</td>
            <td class="text-end">
                <button class="btn btn-success view-module"type="button" data-id="`+ index + `" data-bs-toggle="modal" data-bs-target="#teaching-assignment-modal">View</button>
            </td>
        </tr>`);
        if (classes.to_be_assigned_classes == 0) {
            $('.module-' + index).addClass("status-unassigned")
        }
    }
};


async function generateModal(module_index) {
    let section = $("#select-section option:selected").val();
    let modules = await getModulesBySection(section);
    let module = modules[module_index]
    let classes = await calculateModuleClasses(module);
    let mod_code = module.mod_code;
    let total_lecture = classes.classes_lecture;
    let total_tutorial = classes.classes_tutorial;
    let total_practical = classes.classes_practical;
    let total_students = classes.total_students;
    if (classes.classes_lecture == null) {
        total_lecture = 0;
    }
    if (classes.classes_tutorial == null) {
        total_tutorial = 0;
    }
    if (classes.classes_practical == null) {
        total_practical = 0;
    }
    if (classes.total_students == null) {
        total_students = 0
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
                <label for="input-student" class="col-2 col-form-label">Total No. of Students:</label>
                <div class="col-1">
                    <input type="number" min="0" value="`+ total_students + `"class="form-control form-control-sm module-input" id="input-student">   
                </div>
                
                
            </div>
            <table id="admin-table" class="table table-dark rounded-top">
                <thead>
                    <tr class="align-bottom">
                        <th scope="col" class="col-3">`+ module.mod_name + `</th>
                        <th scope="col" class="col-3">Lecture</th>
                        <th scope="col" class="col-3">Tutorial</th>
                        <th scope="col" class="col-3">Practical</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-bottom border-white align-middle">
                        <td>Hours per Week</td>
                        <td><input type="number" min="0" value="`+ classes.lecture_per_week + `" class="form-control form-control-sm module-input" id="input-lecture-hours"></td>
                        <td><input type="number" min="0" value="`+ classes.tutorial_per_week + `" class="form-control form-control-sm module-input" id="input-tutorial-hours"></td>
                        <td><input type="number" min="0" value="`+ classes.practical_per_week + `" class="form-control form-control-sm module-input" id="input-practical-hours"></td>
                    </tr>
                    <tr class="border-bottom border-white align-middle">
                        <td>No. of Classes</td>
                        <td><input type="number" min="0" value="`+ total_lecture + `" class="form-control form-control-sm module-input" id="input-lecture-classes"></td>
                        <td><input type="number" min="0" value="`+ total_tutorial + `" class="form-control form-control-sm module-input" id="input-tutorial-classes"></td>
                        <td><input type="number" min="0" value="`+ total_practical + `" class="form-control form-control-sm module-input" id="input-practical-classes"></td>
                    </tr>
                </tbody>
            </table>
            <div class = "row py-1">
            <div class = "col warning-message" id="module-warning">
                
            </div>
            <div class = "col">
                <!-- Update Button -->
                <button type="button" class="btn btn-primary float-end module-changes" data-code="`+ mod_code +`" data-index="` + module_index +`">Save Changes</button>
            </div>
        </div>

        </div>


    </div>
    `);

}


async function updateModuleInformation(mod_code) {
    updateModule(mod_code)
    .then(() => {
        generateModuleList();
    });
    
}

generateSection();

$(document).ready(() => {
    // Delete Requirement 
    $(".module-list").on('click', ".view-module", (e) => {
        let index = $(e.target).data("id");
        generateModal(index);
    })
    $("#select-section").on('change', () => {
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
    })


});