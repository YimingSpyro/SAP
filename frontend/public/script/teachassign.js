function getSection(){
    return axios.get('http://localhost:8080/api/section/')
    .then(response => response.data)
    .catch(err => error(err));
};

function getModulesBySection(section) {
    return axios.get('http://localhost:8080/api/module/section?section='+section)
        .then(response => response.data)
        .catch(err => error(err));
};

function getAssignedModulesByCode(mod_code) {
    return axios.get('http://localhost:8080/api/module/assign?mod_code=' + mod_code)
        .then(response => response.data)
        .catch(err => error(err));
};

function getStaffBySection(section) {
    return axios.get('http://localhost:8080/api/tas/section?section=%'+section+'%')
        .then(response => response.data)
        .catch(err => error(err));
};

function getAssignedModules(staff_id){
    return axios.get('http://localhost:8080/api/module/assign/'+staff_id)
    .then(response => response.data)
    .catch(err => error(err));
}

async function checkAssignedModule(staff_id,module_code){
    let data = await getAssignedModules(staff_id);
    let assigned = false;
    let lecture_hours = 0;
    let tutorial_hours = 0;
    let practical_hours = 0;
    for (let index = 0; index < data.length; index++) {
        const assigned_module = data[index];
        let assigned_code = assigned_module.mod_code;
        if (assigned_code == module_code) {
            assigned = true;
            lecture_hours = assigned_module.ma_lecture
            tutorial_hours = assigned_module.ma_tutorial
            practical_hours = assigned_module.ma_practical
        }
    }
    return {
        "assigned" : assigned,
        "lecture_hours" : lecture_hours,
        "tutorial_hours" : tutorial_hours,
        "practical_hours" : practical_hours
    };
}

async function calculateStaffHours(staff_id){
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

async function generateSection(){
    let sections = await getSection();
    for (let index = 0; index < sections.length; index++) {
        const section = sections[index];
        $("#select-section").append(`<option value="`+section.fk_course_id+`">`+section.section_name+`</option>`)
    }
}

async function generateModuleList() {
    $(".module-list").empty();
    let section = $("#select-section option:selected").val();
    let modules = await getModulesBySection(section);
    $("#caption").empty();
    $("#caption").append(`Showing `+modules.length+` Results`);
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

async function generateModal(index) {
    let section = $("#select-section option:selected").val();
    let modules = await getModulesBySection(section);
    let module = modules[index]
    let hours = await calculateModuleHours(module);
    let mod_code = module.mod_code;
    $(".modal-information").empty();
    $(".modal-information").append(`
    <!-- Content header -->
    <div class="modal-header">
        <h5 class="modal-title" id="teaching-assignment-modal">`+module.mod_name+` `+module.mod_code+`</h5>
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
                    <th scope="col" class="col-3">`+module.mod_name+`</th>
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
            <div class="modal-section-title">Unassigned Staff</div>
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
                    <th scope="col" class="col-1"></th>
                </tr>
            </thead>
            <tbody class="assigned-staff">

            </tbody>
            <tfoot>
                <tr>
                    <td>Hours Assigned</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>

        <!-- Update Button -->
        <button type="button" class="btn btn-primary float-end">Confirm Assignment</button>
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
            <tr class="border-bottom border-white align-middle">
                <td>`+staff_name+`</td>
                <td>
                    <input type="text" value="`+assigned.lecture_hours+`" class="form-control form-control-sm" id="input-lecture">
                </td>
                <td>
                    <input type="text" value="`+assigned.tutorial_hours+`" class="form-control form-control-sm" id="input-tutorial">
                </td>
                <td>
                    <input type="text" value="`+assigned.practical_hours+`" class="form-control form-control-sm" id="input-practical">
                </td>
                <td class="text-success">0</td>
                <td>
                    <button class="btn btn-danger unassign-staff" type="button">Unassign</button>
                </td>
            </tr>`);
        }
        else {
            $(".staff-list").append(`
            <tr class="border-bottom border-white align-middle">
                
                <td>`+staff_name+`</td>
                <td>`+staff_type+`</td>
                <td>`+staff_hours+`</td>
                <td>3</td>
                <td class="text-center px-2 py-3">
                    <button class="btn btn-success assign-staff" type="button">Assign</button>
                </td>
                <td class="text-center px-2 py-3">
                    <button class="btn btn-info text-white view-staff"type="button" data-bs-toggle="modal" data-bs-target="#staff-modal">Staff Info</button>
                </td>
            </tr>`);
        }

    }


}

generateSection();

$(document).ready(() => {
    // Delete Requirement 
    $(".module-list").on('click', ".view-module", (e) => {
        let index = $(e.target).data("id");
        generateModal(index);
    })
    $("#select-section").on('change', ()=>{
        generateModuleList();
    });
});