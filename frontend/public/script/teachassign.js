$(document).ready(()=>{
    $('#main-list>li').removeClass("active")
    $('#teaching-assignment-system').addClass("active")
})
function getCourse() {
    return axios.get(base_url + '/api/course/?status=active')
        .then(response => response.data)
        .catch(err => error(err));
};

function getStaffTypes(){
    return axios.get(base_url + '/api/staff/types')
        .then(response => response.data)
        .catch(err => error(err));
}

function getModulesBySection(section) {
    return axios.get(base_url + '/api/module/section?section=' + section + '&semester_code=' + sessionStorage.getItem('semester_code'))
        .then(response => response.data)
        .catch(err => error(err));
};

function getAssignedModulesByCode(mod_code) {
    return axios.get(base_url + '/api/module/assign?mod_code=' + mod_code + '&semester_code=' + sessionStorage.getItem('semester_code'))
        .then(response => response.data)
        .catch(err => error(err));
};

function getAllStaff() {
    return axios.get(base_url + '/api/tas/staff')
        .then(response => response.data)
        .catch(err => error(err));
};

function getAssignedModules(staff_id) {
    return axios.get(base_url + '/api/module/assign/' + staff_id + '?semester_code=' + sessionStorage.getItem('semester_code'))
        .then(response => response.data)
        .catch(err => error(err));
}

function getPreference(staff_id) {
    return axios.get(base_url + '/api/module/preference/' + staff_id + '?semester_code=' + sessionStorage.getItem('semester_code'))
        .then(response => response.data)
        .catch(err => error(err));
}

function getStaffByID(staff_id) {
    return axios.get(base_url + '/api/staff/' + staff_id)
        .then(response => response.data[0])
        .catch(err => error(err));
};

function assignModule(staff_id, mod_code) {
    return axios.post(base_url + '/api/module/assign/',
        {
            staff_id: staff_id,
            ma_lecture: $("#input-lecture-assign")[0].value,
            ma_tutorial: $("#input-tutorial-assign")[0].value,
            ma_practical: $("#input-practical-assign")[0].value,
            semester_code: sessionStorage.getItem('semester_code'), 
            module_code: mod_code
        })
        .then(() => success("assigned"))
        .catch(err => error(err));
}

function unassignModule(ma_id) {
    return axios.delete(base_url + '/api/module/assign/' + ma_id)
        .then(() => success("unassigned"))
        .catch(err => error(err));

}

function updateAssignedModule(data) {
    return axios.put(base_url + '/api/module/assign',
        {
            ma_lecture: data.lecture_classes,
            ma_tutorial: data.tutorial_classes,
            ma_practical: data.practical_classes,
            ma_id: data.ma_id
        })
        .then(() => {
            success("confirm")
        })
        .catch(err => {
            error(err)
        });
}

function updateModule(mod_code) {
    return axios.put(base_url + '/api/tas/module',
    {
        mod_coord: $("#select-mc option:selected").val(),
        mod_lecture: $("#input-lecture-hours")[0].value * 15,
        mod_tutorial: $("#input-tutorial-hours")[0].value * 15,
        mod_practical: $("#input-practical-hours")[0].value * 15,
        lecture_class: $("#input-lecture-classes")[0].value,
        tutorial_class: $("#input-tutorial-classes")[0].value,
        practical_class: $("#input-practical-classes")[0].value,
        total_students: $("#input-student")[0].value,
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

async function inputValidation(type,data) {
    let number = new RegExp('^[0-9]+$')
    if (type == "create-assigned") {
        let lecture_create = $("#input-lecture-assign")[0].value
        let tutorial_create = $("#input-tutorial-assign")[0].value
        let practical_create = $("#input-practical-assign")[0].value
        if (!number.test(lecture_create) || !number.test(tutorial_create) || !number.test(practical_create)) {
            throw "Only numeric inputs allowed."
        }
    }
    if (type == "update-assigned") {
        let lecture_update = data.lecture_classes
        let tutorial_update = data.tutorial_classes
        let practical_update = data.practical_classes
        if (!number.test(lecture_update) || !number.test(tutorial_update) || !number.test(practical_update)) {
            throw "Only numeric inputs allowed."
        }
    } 
    if (type == "update-module") {
        let module_lecture_hours = $("#input-lecture-hours")[0].value
        let module_tutorial_hours = $("#input-tutorial-hours")[0].value 
        let module_practical_hours = $("#input-practical-hours")[0].value 
        let module_lecture_classes = $("#input-lecture-classes")[0].value
        let module_tutorial_classes = $("#input-tutorial-classes")[0].value
        let module_practical_classes = $("#input-practical-classes")[0].value
        let module_student = $("#input-student")[0].value
        if (!number.test(module_lecture_hours) || !number.test(module_tutorial_hours) || !number.test(module_practical_hours) || !number.test(module_lecture_classes) ||
        !number.test(module_tutorial_classes) || !number.test(module_practical_classes) || !number.test(module_student)) {
            throw "Only numeric inputs allowed."
        }
    }
}

async function checkAssignedModule(staff_id, module_code) {
    let data = await getAssignedModules(staff_id);
    let assigned = false;
    let assignment_id = null;
    let lecture_classes = 0;
    let tutorial_classes = 0;
    let practical_classes = 0;
    let total_classes = 0;
    for (let index = 0; index < data.length; index++) {
        const assigned_module = data[index];
        let assigned_code = assigned_module.mod_code;
        if (assigned_code == module_code) {
            assigned = true;
            lecture_classes = assigned_module.ma_lecture
            tutorial_classes = assigned_module.ma_tutorial
            practical_classes = assigned_module.ma_practical
            assignment_id = "MA" + assigned_module.assignment_id
            total_classes = lecture_classes + tutorial_classes + practical_classes
        }
    }
    return {
        "ma_id": assignment_id,
        "assigned": assigned,
        "lecture_classes": lecture_classes,
        "tutorial_classes": tutorial_classes,
        "practical_classes": practical_classes,
        "total_classes": total_classes
    };
}

async function calculateStaffHours(staff_id) {
    let assigned = await getAssignedModules(staff_id);
    let total_hours = 0;
    for (let index = 0; index < assigned.length; index++) {
        const module = assigned[index];
        total_hours += module.ma_lecture * module.mod_lecture + module.ma_tutorial * module.mod_tutorial + module.ma_practical * module.mod_practical;
    }
    return total_hours / 15;
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

async function calculateClassesTBA() {
    let unsaved = false;
    if ($(".unsaved-changes").length > 0) {
        unsaved = true;
    }
    $("#assignment-warning").empty();
    let tba_lecture = 0;
    let tba_tutorial = 0;
    let tba_practical = 0;
    $(".assigned-lecture").each((index, lecture_class) => {
        tba_lecture += parseInt($(lecture_class).val());
    })
    $(".assigned-tutorial").each((index, tutorial_class) => {
        tba_tutorial += parseInt($(tutorial_class).val());
    })
    $(".assigned-practical").each((index, practical_class) => {
        tba_practical += parseInt($(practical_class).val())
    })
    tba_lecture = $("#input-lecture-classes").val() - tba_lecture
    tba_tutorial = $("#input-tutorial-classes").val() - tba_tutorial
    tba_practical = $("#input-practical-classes").val() - tba_practical
    if (tba_lecture < 0) {
        tba_lecture = 0;
        $("#assignment-warning").append(`<p>More lecture classes assigned than specified!</p>`);
    }
    if (tba_tutorial < 0) {
        tba_tutorial = 0;
        $("#assignment-warning").append(`<p>More tutorial classes assigned than specified!</p>`);
    }
    if (tba_practical < 0) {
        tba_practical = 0;
        $("#assignment-warning").append(`<p>More practical classes assigned than specified!</p>`);
    }
    $(".tba-footer").empty();
    $(".tba-footer").append(`
    <tr>
        <td>Classes to Assign</td>
        <td>`+ tba_lecture + `</td>
        <td>`+ tba_tutorial + `</td>
        <td>`+ tba_practical + `</td>
        <td></td>
        <td></td>
    </tr>`);

    $(".staff").each(async (index, staff) => {
        let staff_id = $(staff).data("staff");
        let assigned = await getAssignedModules(staff_id);
        let mod_code = $(staff).data("code");
        let staff_type = $(staff).data("type");
        let staff_name = $(staff).data("name");
        let total_hours = 0;
        let staff_hours = $(staff).find(".staff-hours");
        let lecture_classes = $(staff).find("#input-lecture")[0].value;
        let tutorial_classes = $(staff).find("#input-tutorial")[0].value;
        let practical_classes = $(staff).find("#input-practical")[0].value;
        for (let index = 0; index < assigned.length; index++) {
            const module = assigned[index];
            if (mod_code == module.mod_code) {
                total_hours += lecture_classes * module.mod_lecture + tutorial_classes * module.mod_tutorial + practical_classes * module.mod_practical;
            }
            else {
                total_hours += module.ma_lecture * module.mod_lecture + module.ma_tutorial * module.mod_tutorial + module.ma_practical * module.mod_practical;
            }
        }
        staff_hours.empty()
        staff_hours.append(total_hours / 15)
        let types = await getStaffTypes();
        for (let index = 0; index < types.length; index++) {
            const type = types[index];
            if (type.staff_type == staff_type) {
                if (total_hours / 15> type.hours) {
                    $("#assignment-warning").append(`<p>Hours assigned exceeded limit for `+staff_name+`</p>`);
                }
            }
        }
    })

    if (unsaved) {
        $("#assignment-warning").append(`<p class="unsaved-changes">Changes Not Saved!</p>`);
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
        $(".module-list").append(`
        <tr class="border-bottom border-white module-`+ index + ` align-middle">
            <td>`+ module.mod_code + `</td>
            <td>`+ module.mod_name + `</td>
            <td>`+ classes.total_hours + `</td>
            <td>`+ classes.to_be_assigned_classes + `</td>
            <td>`+ classes.assigned_classes + `</td>
            <td class="text-end">
                <button class="btn btn-success view-module"type="button" data-id="`+ index + `" data-bs-toggle="modal" data-bs-target="#teaching-assignment-modal">View</button>
            </td>
        </tr>`);
        if (classes.to_be_assigned_classes != classes.assigned_classes || classes.assigned_classes == 0 || classes.assigned_lecture > classes.classes_lecture || classes.assigned_tutorial > classes.classes_tutorial || classes.assigned_practical > classes.classes_practical) {
            $('.module-' + index).addClass("status-unassigned")
        }
    }
};

async function generateStaffInfo(staff_id) {
    let preferences = await getPreference(staff_id);
    if (preferences.length > 0) {
        preferences = JSON.parse(preferences[0].preference);
        for (let index = 0; index < preferences.length; index++) {
            const preference = preferences[index];
            let choice = index + 1;
            if (preference.module != null) {
                $("#choice-" + choice).val(preference.module)
            }
            else {
                $("#choice-" + choice).val(null)
            }
            if (preference.module_coordinator) {
                $("#mc-" + choice).prop('checked', true)
            }
        }
    }
    else {
        for (let count = 1; count <= 6; count++) {
            $("#choice-" + count).val(null)
            $("#mc-" + count).prop('checked', false)
        }
    }
    $(".assigned-modules").empty();
    let assigned = await getAssignedModules(staff_id);
    let total_hours = 0;
    for (let index = 0; index < assigned.length; index++) {
        const module = assigned[index];
        let hours = (module.ma_lecture * module.mod_lecture + module.ma_tutorial * module.mod_tutorial + module.ma_practical * module.mod_practical) / 15;
        total_hours += hours;
        $(".assigned-modules").append(`
        <tr>
            <td id="module-`+ index + `">` + module.mod_code + ` ` + module.fk_course_id + `: ` + module.mod_name + ` (` + module.mod_abbrv + `) YR ` + module.mod_stage + `</th>
            <td>`+ module.ma_lecture + `</td>
            <td>`+ module.ma_tutorial + `</td>
            <td>`+ module.ma_practical + `</td>
            <td>`+ hours.toFixed(1) + `</td>
        </tr>`);
        if (parseInt(module.fk_mod_coord) == staff_id) {
            $("#module-" + index).css("color", "orange");
        }
    }
    $(".total-hours").empty();
    $(".total-hours").append(`
    <tr>
        <th>Total Hours: `+ total_hours + `</th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
    </tr>`);
    let staff = await getStaffByID(staff_id);
    let staff_name = staff.staff_name;
    $(".staff-name").empty();
    $(".staff-name").append(staff_name);

}

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
                <div class="col-2">
                    <input type="number" min="0" value="`+ total_students + `"class="form-control form-control-sm module-input" id="input-student">   
                </div>
                <label for="select-mc" class="col-2 col-form-label">Module Coordinator:</label>
                <div class="col-3">
                    <select class="form-select module-input" id="select-mc">
                        <option value="not-selected">Select Staff</option>
                    </select>
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
                    <tr class="border-bottom border-white classes-assigned">
                        <td>Classes Assigned</td>
                        <td>`+ classes.assigned_lecture + `</td>
                        <td>`+ classes.assigned_tutorial + `</td>
                        <td>`+ classes.assigned_practical + `</td>
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

        <!-- Teaching Assignment -->
        <div class="modal-section-title">Teaching Assignment</div>
        <div class="line2"></div>
        <!-- Table -->
        <div class = "overflow-hidden py-1">
            <table id="admin-table" class="table table-dark rounded-top">
                <thead>
                    <tr class = "align-middle">
                        <th scope="col" class="col-3">Assigned Staff</th>
                        <th scope="col" class="col-2">Lecture</th>
                        <th scope="col" class="col-2">Tutorial</th>
                        <th scope="col" class="col-2">Practical</th>
                        <th scope="col" class="col-2">Total Module Hours</th>
                        <th scope="col" class="col"></th>
                    </tr>
                </thead>
                <tbody class="assigned-staff">

                </tbody>
                <tfoot class="tba-footer">

                </tfoot>
            </table>
            <div class = "row py-1">
                <div class = "col warning-message" id="assignment-warning">
                    
                </div>
                <div class = "col">
                    <!-- Update Button -->
                    <button type="button" class="btn btn-primary float-end confirm-assignment" data-index="`+ module_index + `">Confirm Assignment</button>
                </div>
            </div>
        </div>

        <!-- Select Staff -->
        <div class="modal-section-title">Assign Staff</div>
        <div class="line2"></div>

        <!-- Table -->
        <div class = "staff-table overflow-auto  py-1">
            <table id="admin-table" class="table table-dark rounded-top">
                <thead>
                    <tr>
                        <th scope="col" class="col-4">Staff</th>
                        <th scope="col" class="col-2">Lecture</th>
                        <th scope="col" class="col-2">Tutorial</th>
                        <th scope="col" class="col-2">Practical</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody class="staff-list">

                </tbody>
            </table>
        </div>


    </div>
    `);
    // Filling up Staff List and Assigned Staff in Modal
    $(".staff-list").append(`
    <tr class="border-bottom border-white align-middle">
        <td>
            <select class="form-select select-staff">
                <option selected>Select Staff</option>
            </select>
        </td>
        <td>
            <input type="number" min="0" value="`+ 0 + `" class="form-control form-control-sm" id="input-lecture-assign">
        </td>
        <td>
            <input type="number" min="0" value="`+ 0 + `" class="form-control form-control-sm" id="input-tutorial-assign">
        </td>
        <td>
            <input type="number" min="0" value="`+ 0 + `" class="form-control form-control-sm" id="input-practical-assign">
        </td>
        <td>
            <button class="btn btn-success assign-staff" type="button"  data-index="`+ module_index + `" data-code="` + mod_code + `">Assign</button>
        </td>
    </tr>`)
    let staff_list = await getAllStaff();
    for (let index = 0; index < staff_list.length; index++) {
        const staff = staff_list[index];
        let staff_id = staff.staff_id
        let staff_name = staff.staff_name
        let staff_type = staff.fk_staff_type
        let assigned = await checkAssignedModule(staff_id, mod_code)
        if (assigned.assigned) {
            $(".assigned-staff").append(`
            <tr data-name="`+staff_name+`" data-type="`+staff_type+`" data-staff="`+ staff_id + `" data-id="` + assigned.ma_id + `" data-code="` + mod_code + `" class="border-bottom border-white align-middle staff">
                <td><a data-staff="`+ staff_id + `" data-bs-toggle="modal" data-bs-target="#staff-modal" class="view-staff view-staff-link">` + staff_name + `</a></td>
                <td>
                    <input type="number" min="0" value="`+ assigned.lecture_classes + `" class="assigned assigned-lecture form-control form-control-sm" id="input-lecture">
                </td>
                <td>
                    <input type="number" min="0" value="`+ assigned.tutorial_classes + `" class="assigned assigned-tutorial form-control form-control-sm" id="input-tutorial">
                </td>
                <td>
                    <input type="number" min="0" value="`+ assigned.practical_classes + `" class="assigned assigned-practical form-control form-control-sm" id="input-practical">
                </td>
                <td class="text-success staff-hours fw-bold"></td>
                <td>
                    <button class="btn btn-danger unassign-staff" type="button" data-code="` + mod_code + `" data-id="` + assigned.ma_id + `" data-staff="` + staff_id + `">Unassign</button>
                </td>
            </tr>`)
        }
        else {
            $(".select-staff").append(`<option value="` + staff_id + `">` + staff_name + ` (` + staff_id + `)</option>`)
        }
        if (module.fk_mod_coord == staff_id) {
            $("#select-mc").append(`<option selected value="` + staff_id + `">` + staff_name + ` (` + staff_id + `)</option>`)
        }
        else {
            $("#select-mc").append(`<option value="` + staff_id + `" >` + staff_name + ` (` + staff_id + `)</option>`)
        }

    }
    
    calculateClassesTBA();

}

async function assignStaff(staff_id, mod_code, module_index) {
    await assignModule(staff_id, mod_code);
    let staff = await getStaffByID(staff_id);
    let assigned = await checkAssignedModule(staff_id, mod_code);
    let staff_name = staff.staff_name;
    $(".assigned-staff").append(`
    <tr data-staff="`+ staff_id + `" data-id="` + assigned.ma_id + `" data-code="` + mod_code + `" class="border-bottom border-white align-middle staff">
        <td><a data-staff="`+ staff_id + `" data-bs-toggle="modal" data-bs-target="#staff-modal" class="view-staff view-staff-link">` + staff_name + `</a></td>
        <td>
            <input type="number" min="0" value="`+ assigned.lecture_classes + `" class="assigned assigned-lecture form-control form-control-sm" id="input-lecture">
        </td>
        <td>
            <input type="number" min="0" value="`+ assigned.tutorial_classes + `" class="assigned assigned-tutorial form-control form-control-sm" id="input-tutorial">
        </td>
        <td>
            <input type="number" min="0" value="`+ assigned.practical_classes + `" class="assigned assigned-practical form-control form-control-sm" id="input-practical">
        </td>
        <td class="text-success staff-hours fw-bold"></td>
        <td>
            <button class="btn btn-danger unassign-staff" type="button" data-code="` + mod_code + `" data-id="` + assigned.ma_id + `" data-staff="` + staff_id + `">Unassign</button>
        </td>
    </tr>`);
    $(".staff-list").empty();
    $(".staff-list").append(`
    <tr class="border-bottom border-white align-middle">
        <td>
            <select class="form-select select-staff">
                <option selected>Select Staff</option>
            </select>
        </td>
        <td>
            <input type="number" min="0" value="`+ 0 + `" class="form-control form-control-sm" id="input-lecture-assign">
        </td>
        <td>
            <input type="number" min="0" value="`+ 0 + `" class="form-control form-control-sm" id="input-tutorial-assign">
        </td>
        <td>
            <input type="number" min="0" value="`+ 0 + `" class="form-control form-control-sm" id="input-practical-assign">
        </td>
        <td>
            <button class="btn btn-success assign-staff" type="button"  data-index="`+ module_index + `" data-code="` + mod_code + `">Assign</button>
        </td>
    </tr>`)
    let staff_list = await getAllStaff();
    for (let index = 0; index < staff_list.length; index++) {
        const staff = staff_list[index];
        let staff_id = staff.staff_id
        let staff_name = staff.staff_name
        let assigned = await checkAssignedModule(staff_id, mod_code)
        if (!assigned.assigned) {
            $(".select-staff").append(`<option value="` + staff_id + `">` + staff_name + ` (` + staff_id + `)</option>`)
        }
    }
    $("#assignment-warning").empty();
    calculateClassesTBA();
}

async function unassignStaff(staff_id, ma_id) {
    $(".assigned-staff tr[data-staff='" + staff_id + "']").remove()
    await unassignModule(ma_id);
    let staff = await getStaffByID(staff_id);
    let staff_name = staff.staff_name;
    $(".select-staff").append(`<option value="` + staff_id + `">` + staff_name + ` (${staff_id})</option>`)
    calculateClassesTBA()
}

async function confirmAssignment(module_index) {
    $(".staff").each((index, staff) => {
        let lecture_classes = $(staff).find("#input-lecture")[0].value;
        let tutorial_classes = $(staff).find("#input-tutorial")[0].value;
        let practical_classes = $(staff).find("#input-practical")[0].value;
        let ma_id = $(staff).data("id")
        let data = {
            "lecture_classes": lecture_classes,
            "tutorial_classes": tutorial_classes,
            "practical_classes": practical_classes,
            "ma_id": ma_id
        }
        inputValidation("update-assigned",data)
        .then(async()=>{
            await updateAssignedModule(data)
        })
        .catch(err => error(err))
    })
    $("#assignment-warning").empty();
    calculateClassesTBA();
    let section = $("#select-section option:selected").val();
    let modules = await getModulesBySection(section);
    let module = modules[module_index]
    let classes = await calculateModuleClasses(module);
    $(".classes-assigned").empty()
    $(".classes-assigned").append(`
        <td>Classes Assigned</td>
        <td>`+ classes.assigned_lecture + `</td>
        <td>`+ classes.assigned_tutorial + `</td>
        <td>`+ classes.assigned_practical + `</td>`)

}

async function updateModuleInformation(mod_code) {
    if ($("#select-mc option:selected").val() == "not-selected") {
        throw "Module Coordinator Not Selected";
    }
    inputValidation("update-module")
    .then(async()=>{
        await updateModule(mod_code)
    })
    .then(()=>{
        calculateClassesTBA();
    })
    .then(() => {
        generateModuleList();
    })
    .catch(err => error(err));
    
}

generateSection();

$(document).ready(() => {
    
    $(".module-list").on('click', ".view-module", (e) => {
        let index = $(e.target).data("id");
        generateModal(index);
    })
    $("#select-section").on('change', () => {
        generateModuleList();
    });

    $("#teaching-assignment-modal").on('click', ".view-staff", (e) => {
        let staff_id = $(e.target).data("staff");
        generateStaffInfo(staff_id);
    })

    $("#teaching-assignment-modal").on('click', ".assign-staff", (e) => {
        let staff_id = $(".select-staff option:selected").val();
        let mod_code = $(e.target).data("code");
        let module_index = $(e.target).data("index");
        inputValidation("create-assigned")
        .then(()=>{
            assignStaff(staff_id, mod_code, module_index)
        })
        .then(() => {
            generateModuleList();
        })
        .catch(err => error(err));
    })

    $("#teaching-assignment-modal").on('click', ".unassign-staff", (e) => {
        let staff_id = $(e.target).data("staff");
        let ma_id = $(e.target).data("id");
        unassignStaff(staff_id, ma_id)
        .then(() => {
            generateModuleList();
        });
    })

    $("#teaching-assignment-modal").on('click', ".confirm-assignment", (e) => {
        let module_index = $(e.target).data("index");
        confirmAssignment(module_index)
        .then(() => {
            generateModuleList();
        });
    })

    $("#teaching-assignment-modal").on('change', ".assigned", () => {
        $("#assignment-warning").empty();
        calculateClassesTBA();
        $("#assignment-warning").append(`<p class="unsaved-changes">Changes Not Saved!</p>`);

    })

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