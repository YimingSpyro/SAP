//declare local variables to be used
var results_array;
var old_mod_code;
var current_stage;
var current_sem;
var workload_arr;
var global_indx = 0; //for indexing the module workloads in each modal
var staff_id = sessionStorage.getItem('staff_id');

//regex patterns for workload summary
const exam_pattern = /.+ST$/
const ca_pattern = /^CA\d/

//get available courses
function _getCourses() {
    axios.get(base_url + '/api/course?status=Active').then((results) => {
        results.data.forEach(element => {
            $('#course-offered-to').append(`<option value= ${element.course_id}>${element.course_id}</option>`)
        });
    });
};

//get available staff
function _getStaff() {
    axios.get(base_url + '/api/admin/maintenance/staff-names').then((results) => {
        results.data.forEach(element => {
            $('#module-coord-name').append(`<option value= ${element.staff_id}>${element.staff_name}</option>`)
        });
    });
};

//get modules by coordinator and append modules accordingly
async function _getModuleAndAppend(coord_id) {
    $("tbody tr").remove()
    $("caption").remove()
    //console.log(coord_id)
    const filtered_modules = await axios.get(base_url + '/api/mod-coord/modules?mod_coord=' + coord_id, { withCredentials: true }).then((response) => { return response.data });
    results_array = filtered_modules;
    //console.log(filtered_modules)
    filtered_modules.forEach((element, index) => {
        let table_row = `
        <tr class="border-bottom border-white table_row">
        <td>${element['fk_course_id']}</td>
        <td>${element['mod_code']}</td>
        <td class = "text-wrap">${element['mod_name']}</td>
        <td class = "text-wrap">${element['fk_semester_code']}</td>
        <td>${element['mod_stage']}</td>
        <td>
        <button type="button" class= "edit-module-button btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#editModuleModal" data-module-index="${index}">Module Info</button>
        </td>
        <td>
        <button type="button" class= "edit-workload-button btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#editWorkloadSummary" 
        data-module-code="${element['mod_code']}">Workload</button>
        </td>
        </tr>`
        $('#module-table').append(table_row)
    });
    $('#admin-table').append(`<caption id= 'caption'>Showing ${filtered_modules.length} Modules </caption>`)
};

//find and replace the values of the workload summary modal
//find and replace the values of the module details modal
function _findTextFields(modal, index) {
    //sample: modal.find('#sample').val(selected_val['mod_name'])
    let selected_val = results_array[index]
    for (const key in selected_val) {
        if (Object.hasOwnProperty.call(selected_val, key)) {
            let element = selected_val[key];
            if (element === '') {
                selected_val[key] = "NA"
            } else if (element == null) {
                selected_val[key] = 0
            }
        };
    };
    document.getElementById("module-name").innerHTML = `Module: ${selected_val['mod_code']} ${selected_val['mod_abbrv']}`
    //append modal values
    modal.find('#edit-module-code').val(selected_val['mod_code']);
    modal.find('#edit-module-name').val(selected_val['mod_name']);
    modal.find('#edit-module-stage').val(selected_val['mod_stage']);
    modal.find('#edit-module-abbrv').val(selected_val['mod_abbrv']);
    modal.find('#module-year-created').val(selected_val['year_offered']);
    modal.find('#edit-semester-code').val(selected_val['fk_semester_code']);
    modal.find('#edit-students').val(selected_val['normal_students']);
    modal.find('#edit-oos-students').val(selected_val['os_students']);
    modal.find('#mod-remarks').val(selected_val['remarks']);
    modal.find('#mod-lect-hours').val(selected_val['mod_lecture']);
    modal.find('#mod-tut-hours').val(selected_val['mod_tutorial']);
    modal.find('#mod-prac-hours').val(selected_val['mod_practical']);
    modal.find('#mod-cu').val(selected_val['credit_unit']);
    modal.find('#mod-lect-classes').val(selected_val['lecture_class']);
    modal.find('#mod-tut-classes').val(selected_val['practical_class']);
    modal.find('#mod-prac-classes').val(selected_val['tutorial_class']);
    modal.find('#mod-dlt').val(selected_val['mod_dlt']);
    modal.find('#mod-prereq').val(selected_val['prereq']);
    modal.find('#mod-mod-type').val(selected_val['module_type']);
    modal.find('#mod-type').val(selected_val['type']);
    modal.find('#odd-lechr').val(selected_val['odd_lechr'])
    modal.find('#even-lechr').val(selected_val['even_lechr'])
    modal.find('#odd-prachr').val(selected_val['odd_prachr'])
    modal.find('#even-prachr').val(selected_val['even_prachr'])
    modal.find('#odd-tuthr').val(selected_val['odd_tuthr'])
    modal.find('#even-tuthr').val(selected_val['even_tuthr'])
    modal.find('#edit-module-coord').val(selected_val['fk_mod_coord'])
    modal.find('#course-offered-to').val(selected_val['fk_course_id'])
    modal.find('#module-coord-name').val(selected_val['fk_mod_coord'])

    //dynamically generated data
    modal.find('#edit-total-students').val(selected_val['normal_students'] + selected_val['os_students'])
    modal.find('#mod-total-hr').val(selected_val['mod_lecture'] + selected_val['mod_tutorial'] + selected_val['mod_practical'])

    //fix some data for composite key database
    old_mod_code = selected_val['mod_code'];
    current_stage = selected_val['mod_stage'];
    current_sem = selected_val['fk_semester_code'];

    $(`input[name^="masslectradio"][value='${selected_val['mass_lect']}']`).prop("checked", true);
};

//update db record
async function _updateModuleCoord(mass_lect) {
    let _data = {
        //old data to be used for composite key in database
        old_mod_code: old_mod_code,
        current_sem: current_sem,
        current_stage: current_stage,
        mass_lect: mass_lect,
        year_offered: $('#module-year-created').val(),
        odd_lechr: $('#odd-lechr').val(),
        even_lechr: $('#even-lechr').val(),
        odd_prachr: $('#odd-prachr').val(),
        even_prachr: $('#even-prachr').val(),
        odd_tuthr: $('#odd-tuthr').val(),
        even_tuthr: $('#even-tuthr').val(),
    }
    axios.put(base_url + '/api/mod-coord/update-module/', {
        data: _data
    }).then((response) => {
        window.alert("Module Successfully Updated.")
    }).catch((error) => {
        window.alert(error.response.data.message)
    });
};

//get mod workload requirements
async function _getWorkload(coord_id) {
    const workload = await axios.get(base_url + '/api/module-workload/mc?mod_coord=' + coord_id, { withCredentials: true }).then((response) => { return response.data });
    workload_arr = workload
    console.log(workload)
};

async function _appendWorkloads(modal, mod_code) {
    global_indx = 0
    workload_arr.forEach((element, index) => {
        if (element['fk_mod_code'] == mod_code) {
            let new_req = `<div class="form-group row" id="cc-form-group-${global_indx}">
            <label for="component-code-${index}" class="col-sm-2 col-form-label col-form-label-sm">Component
                Code:</label>
            <div class="col-sm-1">
                <input type="text" class="form-control  form-control-sm" id="component-code-${global_indx}"
                    value="${element['component_code']}">
            </div>
            <label for="nrc-${index}" class="col-sm-1 col-form-label col-form-label-sm">NRC:</label>
            <div class="col-sm-1">
                <input type="text" class="form-control form-control-sm" id="nrc-${global_indx}" 
                value="${element['nrc']}" >
            </div>
            <label for="weightage-${global_indx}"
                class="col-sm-1 col-form-label col-form-label-sm">Weightage:</label>
            <div class="col-sm-1">
                <input type="text" class="form-control form-control-sm" id="weightage-${global_indx}"
                value="${element['weightage']}">
            </div>
            <div class="col-sm-1">
            <button type="button" class= "btn btn-outline-dark btn-sm" name="save-requirement" value="${global_indx}" 
            onclick="__saveComponent(this.value)">Save</button>
            </div>
            <div class="col-sm-1">
            <button type="button" class= "btn btn-outline-danger btn-sm" name="delete-requirement" value="${global_indx}" 
            onclick="_deleteComponent(this.value)">Delete</button>
            </div>
            </div>`
            $('#requirement-container').append(new_req)

            if (ca_pattern.test(element['component_code'])) {
                let new_workload = `
                <div id ="workload-table-entry-${global_indx}" class="mb-3 mt-3 pb-2 workload-entry">
                <div class="tabletitle">
                <h6 class="component-code-workload pt-2">${element['component_code']}</h6>
                </div>
                <div id="workloadtablecontent-${global_indx}" class="col-12">
                <!-- Input Item -->
                <div class="form-group row">
                    <label for="group-size-${global_indx}" class="col-sm-2 col-form-label col-form-label-sm">Group
                        Size:</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control form-control-sm" id="group-size-${global_indx}"
                            value="${element['group_size']}">
                    </div>
                </div>
                <!-- Input Item -->
                <div class="form-group row">
                    <label for="start-week-${index}" class="col-sm-2 col-form-label col-form-label-sm">Start
                        Week:</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control form-control-sm" id="start-week-${global_indx}"
                        value="${element['start_weeks']}">
                    </div>
                </div>
                <!-- Input Item -->
                <div class="form-group row">
                    <label for="end-week-${global_indx}" class="col-sm-2 col-form-label col-form-label-sm">End
                        Week:</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control form-control-sm" id="end-week-${global_indx}"
                        value="${element['end_weeks']}">
                    </div>
                </div>
                <!-- Input Item -->
                <div class="form-group row">
                    <label for="remarks"
                        class="col-sm-2 col-form-label col-form-label-sm align-self-center p-2">Remarks:</label>
                    <div class="col-sm-8">
                        <textarea class="form-control form-control-sm" id="remarks-${global_indx}" rows="2"
                        value="${element['remarks']}"></textarea>
                    </div>
                </div>
                <div class="d-flex flex-row-reverse p-2">
                    <button type="button" class= "col-2 btn btn-outline-dark btn-sm p-2" name= "save">Save Requirement</button>
                </div>
                </div>
                </div>`
                $('#workloadtable').append(new_workload)
            } else if (exam_pattern.test(element['component_code'])) {
                let new_workload = `
                <div id ="workload-table-entry-${global_indx}" class="mb-3 mt-3 pb-2 workload-entry">
                <div class="tabletitle">
                <h6 class="component-code-workload pt-2">${element['component_code']}</h6>
                </div>
                <div id="workloadtablecontent-${global_indx}" class="col-12">
                <!-- Input Item -->
                <div class="form-group row">
                    <label for="group-size-${global_indx}" class="col-sm-2 col-form-label col-form-label-sm">Testwk Type:</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control form-control-sm" id="testwk-type-${global_indx}"
                            value="${element['testwk_type']}">
                    </div>
                </div>
                <!-- Input Item -->
                <div class="form-group row">
                    <label for="start-week-${global_indx}" class="col-sm-2 col-form-label col-form-label-sm">Type:</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control form-control-sm" id="type-${global_indx}"
                        value="${element['type']}">
                    </div>
                </div>
                <!-- Input Item -->
                <div class="form-group row">
                    <label for="end-week-${global_indx}" class="col-sm-2 col-form-label col-form-label-sm">Duration:</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control form-control-sm" id="duration-${global_indx}"
                        value="${element['duration']}">
                    </div>
                </div>
                <!-- Input Item -->
                <div class="form-group row">
                    <label for="remarks"
                        class="col-sm-2 col-form-label col-form-label-sm align-self-center p-2">Special Requirement:</label>
                    <div class="col-sm-8">
                        <textarea class="form-control form-control-sm" id="special-requirement-${global_indx}" rows="2"
                        value="${element['special_requirement']}"></textarea>
                    </div>
                </div>
                <div class="d-flex flex-row-reverse p-2">
                    <button type="button" class= "col-2 btn btn-outline-dark btn-sm p-2" name= "save">Save Requirement</button>
                </div>
                </div>
                </div>`
                $('#workloadtable').append(new_workload)
            }
            global_indx++
        }
    });
};
//append new form row
function _appendNewRequirement() {
    let new_req = `<div class="form-group row" id="cc-form-group-${global_indx}">
    <label for="component-code-${global_indx}" class="col-sm-2 col-form-label col-form-label-sm">Component
        Code:</label>
    <div class="col-sm-1">
        <input type="text" class="form-control  form-control-sm" id="component-code-${global_indx}"
            placeholder="EST">
    </div>
    <label for="nrc-${global_indx}" class="col-sm-1 col-form-label col-form-label-sm">NRC:</label>
    <div class="col-sm-1">
        <input type="text" class="form-control form-control-sm" id="nrc-${global_indx}" 
        placeholder="Yes" >
    </div>
    <label for="weightage-${global_indx}"
        class="col-sm-1 col-form-label col-form-label-sm">Weightage:</label>
    <div class="col-sm-1">
        <input type="text" class="form-control form-control-sm" id="weightage-${global_indx}"
        placeholder="30">
    </div>
    <div class="col-sm-1">
        <button type="button" class= "btn btn-outline-dark btn-sm" name="save-requirement" value="${global_indx}" 
        onclick="_saveComponent(this.value)">Save</button>
    </div>
    <div class="col-sm-1">
        <button type="button" class= "btn btn-outline-danger btn-sm" name="delete-requirement" value="${global_indx}" 
        onclick="_deleteComponent(this.value)">Delete</button>
    </div>
    </div>`
    $('#requirement-container').append(new_req)
    global_indx++
};
function _saveComponent(button_value) {
    let component_code = $('#component-code-' + button_value).val()
    if (ca_pattern.test(component_code)) {
        let new_workload = `
        <div id ="workload-table-entry-${button_value}" class="mb-3 mt-3 pb-2 workload-entry">
        <div class="tabletitle">
        <h6 class="component-code-workload pt-2">${component_code}</h6>
        </div>
        <div id="workloadtablecontent-${button_value}" class="col-12">
        <!-- Input Item -->
        <div class="form-group row">
            <label for="group-size-${global_indx}" class="col-sm-2 col-form-label col-form-label-sm">Group
                Size:</label>
            <div class="col-sm-2">
                <input type="text" class="form-control form-control-sm" id="group-size-${button_value}"
                    placeholder="1">
            </div>
        </div>
        <!-- Input Item -->
        <div class="form-group row">
            <label for="start-week-${button_value}" class="col-sm-2 col-form-label col-form-label-sm">Start
                Week:</label>
            <div class="col-sm-2">
                <input type="number" class="form-control form-control-sm" id="start-week-${button_value}"
                placeholder="1">
            </div>
        </div>
        <!-- Input Item -->
        <div class="form-group row">
            <label for="end-week-${button_value}" class="col-sm-2 col-form-label col-form-label-sm">End
                Week:</label>
            <div class="col-sm-2">
                <input type="number" class="form-control form-control-sm" id="end-week-${button_value}"
                placeholder="18">
            </div>
        </div>
        <!-- Input Item -->
        <div class="form-group row">
            <label for="remarks"
                class="col-sm-2 col-form-label col-form-label-sm align-self-center p-2">Remarks:</label>
            <div class="col-sm-8">
                <textarea class="form-control form-control-sm" id="remarks-${button_value}" rows="2"
                placeholder="NIL"></textarea>
            </div>
        </div>
        <div class="d-flex flex-row-reverse p-2">
            <button type="button" class= "col-2 btn btn-outline-dark btn-sm p-2" name= "save">Save Requirement</button>
        </div>
        </div>
        </div>`
        $('#workloadtable').append(new_workload)
        
    } else if (exam_pattern.test(component_code)) {
        let new_workload = `
        <div id ="workload-table-entry-${button_value}" class="mb-3 mt-3 pb-2 workload-entry">
        <div class="tabletitle">
        <h6 class="component-code-workload pt-2">${component_code}</h6>
        </div>
        <div id="workloadtablecontent-${button_value}" class="col-12">
        <!-- Input Item -->
        <div class="form-group row">
            <label for="testwk-type-${button_value}" class="col-sm-2 col-form-label col-form-label-sm">Testwk Type:</label>
            <div class="col-sm-2">
                    <select class="form-select" id="testwk-type-${button_value}">
                    <option value= 'Mid Semester Test'>Mid Semester Test</option>
                    <option value= 'End Semester Test'>End Semester Test</option>
                    </select>
            </div>
        </div>
        <!-- Input Item -->
        <div class="form-group row">
            <label for="type-${button_value}" class="col-sm-2 col-form-label col-form-label-sm">Type:</label>
            <div class="col-sm-2">
                <select class="form-select" id="type-${button_value}">
                    <option value= 'Written'>Written</option>
                    <option value= 'Practical'>Practical</option>
                    </select>
            </div>
        </div>
        <!-- Input Item -->
        <div class="form-group row">
            <label for="duration-${button_value}" class="col-sm-2 col-form-label col-form-label-sm">Duration:</label>
            <div class="col-sm-2">
                <input type="number" class="form-control form-control-sm" id="duration-${button_value}"
                placeholder="120">
            </div>
        </div>
        <!-- Input Item -->
        <div class="form-group row">
            <label for="special-requirement-${button_value}"
                class="col-sm-2 col-form-label col-form-label-sm align-self-center p-2">Special Requirement:</label>
            <div class="col-sm-8">
                <textarea class="form-control form-control-sm" id="special-requirement-${button_value}" rows="2"
                placeholder="NIL"></textarea>
            </div>
        </div>
        <div class="d-flex flex-row-reverse p-2">
            <button type="button" class= "col-2 btn btn-outline-dark btn-sm p-2" name= "save">Save Requirement</button>
        </div>
        </div>
        </div>`
        $('#workloadtable').append(new_workload)
    }
}
function _deleteComponent(button_value) {
    $('#cc-form-group-' + button_value).remove()
    $('#workload-table-entry-' + button_value).remove()
}
//prepare the website with all this data
_getStaff()
_getCourses()
_getModuleAndAppend(staff_id)
_getWorkload(staff_id)

$(document).ready(() => {
    $('#main-list>li').removeClass("active");
    $('#maintenence-system').addClass("active");

    $('#editModuleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        let index = button.data('module-index') // Extract info from data-* attributes
        var modal = $(this)
        _findTextFields(modal, index)
    });
    $('#module-coord-name').on('change', () => {
        let selected_value = $('#module-coord-name').val();
        $('#edit-module-coord').val(selected_value)
    });
    $('#update-module').on('click', () => {
        let mass_lect = $('input[name^="masslectradio"]:checked').val();
        _updateModuleCoord(mass_lect)
        _getModuleAndAppend(staff_id)
    });
    $('#editWorkloadSummary').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        let mod_code = button.data('module-code') // Extract info from data-* attributes
        var modal = $(this)
        console.log()
        $('#requirement-container').empty();
        $('#workloadtable').empty();
        _appendWorkloads(modal, mod_code)
    });
    $('#add-requirement').on('click', () => {
        _appendNewRequirement()
    });
})