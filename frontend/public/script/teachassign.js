
let base_url = "http://localhost:8080"
function getSection() {
    return axios.get(base_url + '/api/section/')
        .then(response => response.data)
        .catch(err => error(err));
};

function getModulesBySection(section) {
    return axios.get(base_url + '/api/module/section?section=' + section)
        .then(response => response.data)
        .catch(err => error(err));
};

function getAssignedModulesByCode(mod_code) {
    return axios.get(base_url + '/api/module/assign?mod_code=' + mod_code)
        .then(response => response.data)
        .catch(err => error(err));
};

function getStaffBySection(section) {
    return axios.get(base_url + '/api/tas/section?section=%' + section + '%')
        .then(response => response.data)
        .catch(err => error(err));
};

function getAssignedModules(staff_id) {
    return axios.get(base_url + '/api/module/assign/' + staff_id)
        .then(response => response.data)
        .catch(err => error(err));
}

function getPreference(staff_id) {
    return axios.get(base_url + '/api/module/preference/' + staff_id)
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
            ma_lecture: 0,
            ma_tutorial: 0,
            ma_practical: 0,
            semester_code: "AY 2021/2022 SEM2", //SAMPLE DATA
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
        staff_id : data.staff_id,
        semester_code : "AY 2021/2022 SEM2", //SAMPLE DATA
        module_code : data.mod_code,
        ma_lecture : data.lecture_hours,
        ma_tutorial : data.tutorial_hours,
        ma_practical : data.practical_hours
    })
    .then(() => {
        $("#submit-requests-success-confirm").modal('hide')
        success("confirm")
    })
    .catch(err => {
        error(err)
    });
}

async function checkAssignedModule(staff_id, module_code) {
    let data = await getAssignedModules(staff_id);
    let assigned = false;
    let assignment_id = null;
    let lecture_hours = 0;
    let tutorial_hours = 0;
    let practical_hours = 0;
    let total_hours = 0;
    for (let index = 0; index < data.length; index++) {
        const assigned_module = data[index];
        let assigned_code = assigned_module.mod_code;
        if (assigned_code == module_code) {
            assigned = true;
            lecture_hours = assigned_module.ma_lecture
            tutorial_hours = assigned_module.ma_tutorial
            practical_hours = assigned_module.ma_practical
            assignment_id = "MA" + assigned_module.assignment_id
            total_hours =  lecture_hours + tutorial_hours + practical_hours
        }
    }
    return {
        "ma_id": assignment_id,
        "assigned": assigned,
        "lecture_hours": lecture_hours,
        "tutorial_hours": tutorial_hours,
        "practical_hours": practical_hours,
        "total_hours": total_hours
    };
}

async function calculateStaffHours(staff_id) {
    let data = await getAssignedModules(staff_id);
    let total_hours = 0;
    for (let index = 0; index < data.length; index++) {
        const module = data[index];
        let hours = module.ma_lecture + module.ma_tutorial + module.ma_practical;
        total_hours += hours;
    }
    return total_hours;
}

async function calculateModuleHours(module) {
    let assigned = await getAssignedModulesByCode(module.mod_code);
    let assigned_hours = 0;
    let assigned_lecture = 0;
    let assigned_tutorial = 0;
    let assigned_practical = 0;
    for (let index = 0; index < assigned.length; index++) {
        const assignment = assigned[index];
        let assignment_hours = assignment.ma_lecture + assignment.ma_tutorial + assignment.ma_practical;
        assigned_lecture += assignment.ma_lecture;
        assigned_tutorial += assignment.ma_tutorial;
        assigned_practical += assignment.ma_practical;
        assigned_hours += assignment_hours;
    }
    let total_hours = module.mod_lecture + module.mod_tutorial + module.mod_practical;
    let to_be_assigned_hours = total_hours - assigned_hours;
    let tba_lecture = module.mod_lecture - assigned_lecture;
    let tba_tutorial = module.mod_tutorial - assigned_tutorial;
    let tba_practical = module.mod_practical - assigned_practical;

    return {
        "lecture_per_week": module.mod_lecture,
        "tutorial_per_week": module.mod_tutorial,
        "practical_per_week": module.mod_practical,
        "tba_lecture": tba_lecture,
        "tba_tutorial": tba_tutorial,
        "tba_practical": tba_practical,
        "assigned_lecture": assigned_lecture,
        "assigned_tutorial": assigned_tutorial,
        "assigned_practical": assigned_practical,
        "total_hours": total_hours,
        "to_be_assigned_hours": to_be_assigned_hours,
        "assigned_hours": assigned_hours
    }
}

async function generateSection() {
    let sections = await getSection();
    for (let index = 0; index < sections.length; index++) {
        const section = sections[index];
        $("#select-section").append(`<option value="` + section.fk_course_id + `">` + section.section_name + `</option>`)
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
        let hours = await calculateModuleHours(module);
        $(".module-list").append(`
        <tr class="border-bottom border-white module-`+ index + ` align-middle">
            <td>`+ module.mod_code + `</td>
            <td>`+ module.mod_name + `</td>
            <td>`+ hours.total_hours + `</td>
            <td>`+ hours.to_be_assigned_hours + `</td>
            <td>`+ hours.assigned_hours + `</td>
            <td class="text-end">
                <button class="btn btn-success view-module"type="button" data-id="`+ index + `" data-bs-toggle="modal" data-bs-target="#teaching-assignment-modal">View</button>
            </td>
        </tr>`);
        if (hours.to_be_assigned_hours != 0) {
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
        let hours = module.ma_lecture + module.ma_tutorial + module.ma_practical;
        total_hours += hours;
        $(".assigned-modules").append(`
        <tr>
            <td id="module-`+ index + `">` + module.mod_code + ` ` + module.fk_course_id + `: ` + module.mod_name + ` (` + module.mod_abbrv + `) YR ` + module.mod_stage + `/S` + module.fk_semester_code.slice(-1) + `</th>
            <td>`+ module.ma_lecture.toFixed(1) + `</td>
            <td>`+ module.ma_tutorial.toFixed(1) + `</td>
            <td>`+ module.ma_practical.toFixed(1) + `</td>
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
    let hours = await calculateModuleHours(module);
    let mod_code = module.mod_code;
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
        <table id="admin-table" class="table table-dark rounded-top">
            <thead>
                <tr>
                    <th scope="col" class="col-3">`+ module.mod_name + `</th>
                    <th scope="col" class="col-3">Lecture</th>
                    <th scope="col" class="col-3">Tutorial</th>
                    <th scope="col" class="col-3">Practical</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-bottom border-white">
                    <td>Hours per week</td>
                    <td>`+ hours.lecture_per_week + `</td>
                    <td>`+ hours.tutorial_per_week + `</td>
                    <td>`+ hours.practical_per_week + `</td>
                </tr>
                <tr class="border-bottom border-white">
                    <td>To be assigned</td>
                    <td>`+ hours.tba_lecture + `</td>
                    <td>`+ hours.tba_tutorial + `</td>
                    <td>`+ hours.tba_practical + `</td>
                </tr>
                <tr class="border-bottom border-white">
                    <td>Hours Assigned</td>
                    <td>`+ hours.assigned_lecture + `</td>
                    <td>`+ hours.assigned_tutorial + `</td>
                    <td>`+ hours.assigned_practical + `</td>
                </tr>
            </tbody>
        </table>
    
        <!-- Select Staff -->
        <div class="mb-3">
            <div class="modal-section-title">Unassigned Section Staff</div>
            <div class="line2"></div>
        </div>
        <!-- Table -->
        <div class = "staff-table overflow-auto">
            <table id="admin-table" class="table table-dark rounded-top">
                <thead>
                    <tr>
                        <th scope="col" class="col-3">Section Members</th>
                        <th scope="col" class="col-2">Staff Type</th>
                        <th scope="col" class="col-2">Total Hours</th>
                        <th scope="col" class="col-2">No. of Classes</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody class="staff-list">

                </tbody>
            </table>
        </div>

        <!-- Teaching Assignment -->
        <div class="modal-section-title">Teaching Assignment</div>
        <div class="line2"></div>
        <!-- Table -->
        <table id="admin-table" class="table table-dark rounded-top">
            <thead>
                <tr>
                    <th scope="col" class="col-3">Assigned Staff</th>
                    <th scope="col" class="col-2">Lecture</th>
                    <th scope="col" class="col-2">Tutorial</th>
                    <th scope="col" class="col-2">Practical</th>
                    <th scope="col" class="col-2">Total Hours</th>
                    <th scope="col" class="col"></th>
                </tr>
            </thead>
            <tbody class="assigned-staff">

            </tbody>
            <tfoot class="tba-footer">

            </tfoot>
        </table>

        <!-- Update Button -->
        <button type="button" class="btn btn-primary float-end confirm-assignment">Confirm Assignment</button>
    </div>
    `);
    // Filling up Staff List and Assigned Staff in Modal
    let staff_list = await getStaffBySection(section);
    for (let index = 0; index < staff_list.length; index++) {
        const staff = staff_list[index];
        let staff_id = staff.staff_id
        let staff_name = staff.staff_name
        let staff_type = staff.fk_staff_type;
        let staff_hours = await calculateStaffHours(staff_id)
        let assigned = await checkAssignedModule(staff_id, mod_code)
        if (assigned.assigned) {
            $(".assigned-staff").append(`
            <tr data-staff="`+ staff_id + `" data-code="`+ mod_code + `" data-index="`+module_index+`" class="border-bottom border-white align-middle staff">
                <td><a data-staff="`+ staff_id + `" data-bs-toggle="modal" data-bs-target="#staff-modal" class="view-staff view-staff-link">` + staff_name + `</a></td>
                <td>
                    <input type="text" value="`+ assigned.lecture_hours + `" class="form-control form-control-sm" id="input-lecture">
                </td>
                <td>
                    <input type="text" value="`+ assigned.tutorial_hours + `" class="form-control form-control-sm" id="input-tutorial">
                </td>
                <td>
                    <input type="text" value="`+ assigned.practical_hours + `" class="form-control form-control-sm" id="input-practical">
                </td>
                <td class="text-success">`+assigned.total_hours+`</td>
                <td>
                    <button class="btn btn-danger unassign-staff" type="button"  data-index="`+module_index+`" data-code="`+ mod_code + `" data-id="`+ assigned.ma_id + `" data-staff="` + staff_id + `">Unassign</button>
                </td>
            </tr>`);
        }
        else {
            $(".staff-list").append(`
            <tr data-staff="`+ staff_id + `" class="border-bottom border-white align-middle">
                <td><a data-staff="`+ staff_id +`" data-bs-toggle="modal" data-bs-target="#staff-modal" class="view-staff-link view-staff">` + staff_name + `</a></td>
                <td>`+ staff_type + `</td>
                <td>`+ staff_hours + `</td>
                <td>3</td>
                <td class="text-center px-2 py-3">
                    <button class="btn btn-success assign-staff" type="button" data-index="`+module_index+`" data-code="`+ mod_code + `" data-staff="` + staff_id + `">Assign</button>
                </td>
                <td class="text-center px-2 py-3">
                    <button class="btn btn-info text-white view-staff"type="button" data-staff="`+ staff_id + `" data-bs-toggle="modal" data-bs-target="#staff-modal">Staff Info</button>
                </td>
            </tr>`);
        }
    }
    $(".tba-footer").append(`
    <tr>
        <td>To be assigned</td>
        <td>`+ hours.tba_lecture + `</td>
        <td>`+ hours.tba_tutorial + `</td>
        <td>`+ hours.tba_practical + `</td>
        <td>`+ hours.to_be_assigned_hours + `</td>
        <td></td>
    </tr>`);

}

async function assignStaff(staff_id, mod_code, module_index) {
    $(".staff-list tr[data-staff='" + staff_id + "']").remove()
    assignModule(staff_id, mod_code);
    let staff = await getStaffByID(staff_id);
    let assigned = await checkAssignedModule(staff_id, mod_code);
    let staff_name = staff.staff_name;
    $(".assigned-staff").append(`
    <tr data-staff="`+ staff_id + `" data-code="`+ mod_code + `" data-index="`+module_index+`" class="border-bottom border-white align-middle staff">
        <td><a data-staff="`+ staff_id + `" data-bs-toggle="modal" data-bs-target="#staff-modal" class="view-staff-link">` + staff_name + `</a></td>
        <td>
            <input type="text" value="`+ assigned.lecture_hours + `" class="form-control form-control-sm" id="input-lecture">
        </td>
        <td>
            <input type="text" value="`+ assigned.tutorial_hours + `" class="form-control form-control-sm" id="input-tutorial">
        </td>
        <td>
            <input type="text" value="`+ assigned.practical_hours + `" class="form-control form-control-sm" id="input-practical">
        </td>
        <td class="text-success">0</td>
        <td>
            <button class="btn btn-danger unassign-staff" type="button" data-index="`+module_index+`" data-id="`+ assigned.ma_id + `" data-staff="` + staff_id + `">Unassign</button>
        </td>
    </tr>`);
}

async function unassignStaff(staff_id, ma_id, mod_code, module_index) {
    $(".assigned-staff tr[data-staff='" + staff_id + "']").remove()
    unassignModule(ma_id);
    let staff = await getStaffByID(staff_id);
    let staff_name = staff.staff_name;
    let staff_type = staff.fk_staff_type;
    let staff_hours = await calculateStaffHours(staff_id)
    $(".staff-list").append(`
    <tr data-staff="`+ staff_id + `" class="border-bottom border-white align-middle">
        <td><a data-staff="`+ staff_id + `" data-bs-toggle="modal" data-bs-target="#staff-modal" class="view-staff-link view-staff">` + staff_name + `</a></td>
        <td>`+ staff_type + `</td>
        <td>`+ staff_hours + `</td>
        <td>3</td>
        <td class="text-center px-2 py-3">
            <button class="btn btn-success assign-staff" type="button" data-index="`+module_index+`" data-code="`+ mod_code + `" data-staff="` + staff_id + `">Assign</button>
        </td>
        <td class="text-center px-2 py-3">
            <button class="btn btn-info text-white view-staff"type="button" data-staff="`+ staff_id + `" data-bs-toggle="modal" data-bs-target="#staff-modal">Staff Info</button>
        </td>
    </tr>`);
    let section = $("#select-section option:selected").val();
    let modules = await getModulesBySection(section);
    let module = modules[module_index]
    let hours = await calculateModuleHours(module);
    $(".tba-footer").empty();
    $(".tba-footer").append(`
    <tr>
        <td>To be assigned</td>
        <td>`+ hours.tba_lecture + `</td>
        <td>`+ hours.tba_tutorial + `</td>
        <td>`+ hours.tba_practical + `</td>
        <td>`+ hours.to_be_assigned_hours + `</td>
        <td></td>
    </tr>`);
}
async function confirmAssignment(){
    let module_index = null;
    $(".staff").each(async(index,staff)=>{
        let lecture_hours = $(staff).find("#input-lecture")[0].value;
        let tutorial_hours = $(staff).find("#input-tutorial")[0].value;
        let practical_hours = $(staff).find("#input-practical")[0].value;
        let staff_id = $(staff).data("staff")
        let mod_code = $(staff).data("code")
        module_index = $(staff).data("index")
        let data = {
            "lecture_hours" : lecture_hours,
            "tutorial_hours" : tutorial_hours,
            "practical_hours" : practical_hours,
            "staff_id" : staff_id,
            "mod_code" : mod_code
        }
        updateAssignedModule(data)
    })

    let section = $("#select-section option:selected").val();
    let modules = await getModulesBySection(section);
    let module = modules[module_index]
    let hours = await calculateModuleHours(module);
    $(".tba-footer").empty();
    $(".tba-footer").append(`
    <tr>
        <td>To be assigned</td>
        <td>`+ hours.tba_lecture + `</td>
        <td>`+ hours.tba_tutorial + `</td>
        <td>`+ hours.tba_practical + `</td>
        <td>`+ hours.to_be_assigned_hours + `</td>
        <td></td>
    </tr>`);
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

    $("#teaching-assignment-modal").on('click', ".view-staff", (e) => {
        let staff_id = $(e.target).data("staff");
        generateStaffInfo(staff_id);
    })

    $("#teaching-assignment-modal").on('click', ".assign-staff", (e) => {
        let staff_id = $(e.target).data("staff")
        let mod_code = $(e.target).data("code")
        let module_index = $(e.target).data("index")
        assignStaff(staff_id, mod_code, module_index)
    })

    $("#teaching-assignment-modal").on('click', ".unassign-staff", (e) => {
        let staff_id = $(e.target).data("staff")
        let ma_id = $(e.target).data("id")
        let mod_code = $(e.target).data("code")
        let module_index = $(e.target).data("index")
        unassignStaff(staff_id, ma_id, mod_code, module_index)
    })

    $("#teaching-assignment-modal").on('click', ".confirm-assignment", () => {
        confirmAssignment()

    })


});