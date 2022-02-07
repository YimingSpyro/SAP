var results_array;
var old_mod_code;
var current_stage;
var workload_arr;
var global_indx = 0; //for indexing the module workloads in each modal

//regex patterns for workload summary
const exam_pattern = /.+ST$/
const ca_pattern = /^CA\d/
//get available semesters
function _getSemesters() {
    axios.get(base_url + '/api/report/semester/').then((results) => {
        results.data.forEach(element => {
            $('#select-semester').append(`<option>${element.semester_code}</option>`)
            $('#edit-semester-code').append(`<option>${element.semester_code}</option>`)
        });
    });
};

//get available courses
function _getCourses() {
    axios.get(base_url + '/api/course?status=Active').then((results) => {
        results.data.forEach(element => {
            $('#course-offered-to, #select-course').append(`<option value= ${element.course_id}>${element.course_id}</option>`)
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

//get selected semester and append modules accordingly
async function _getModuleAndAppend(acad_sem,course) {
    //$('#module-table tbody tr').remove();
    const filtered_modules = await axios.get(base_url + '/api/module?semester_code=' + acad_sem +'&course='+course, { withCredentials: true }).then((response) => { return response.data });
    results_array = filtered_modules;
    filtered_modules.forEach((element, index) => {
        let table_row = `
        <tr class="border-bottom border-white table_row">
        <td>${element['fk_course_id']}</td>
        <td>${element['mod_code']}</td>
        <td class = "text-wrap">${element['mod_name']}</td>
        <td class = "text-wrap">${element['fk_semester_code']}</td>
        <td>${element['mod_stage']}</td>
        <td>
        <button type="button" class= "edit-module-button btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#editModuleModal" 
        data-module-index="${index}" >Module Info</button>
        </td>
        <td>
        <button type="button" class= "edit-workload-button btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#editWorkloadSummary" 
        data-module-code="${element['mod_code']}" 
        data-module-name="${element['mod_name']}"
        data-sem-code="${element['fk_semester_code']}"
        data-mod-stage="${element['mod_stage']}">Workload</button>
        </td>
        </tr>`
        $('#module-table').append(table_row)
    });
    $('#admin-table').append(`<caption id= 'caption'>Showing ${filtered_modules.length} Modules </caption>`)
}

//find and replace the values of the modal
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
    //set modal values
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
    old_mod_code = selected_val['mod_code']
    current_stage = selected_val['mod_stage']

    if (selected_val['mass_lect'] == "Yes") {
        radio_yes = document.getElementById('masslectradio1')
        radio_yes.checked = true
    } else {
        radio_no = document.getElementById('masslectradio2')
        radio_no.checked = true
    }
};

//update db record
async function _updateModule(current_sem) {
    let _data = {
        old_mod_code: old_mod_code,
        current_sem: current_sem,
        current_stage: current_stage,
        mod_code: $('#edit-module-code').val(),
        mod_name: $('#edit-module-name').val(),
        mod_stage: $('#edit-module-stage').val(),
        mod_abbrv: $('#edit-module-abbrv').val(),
        year_offered: $('#module-year-created').val(),
        fk_semester_code: $('#edit-semester-code').val(),
        normal_students: $('#edit-students').val(),
        os_students: $('#edit-oos-students').val(),
        total_students: $('#edit-total-students').val(),
        remarks: $('#mod-remarks').val(),
        mod_lecture: $('#mod-lect-hours').val(),
        mod_tutorial: $('#mod-tut-hours').val(),
        mod_practical: $('#mod-prac-hours').val(),
        total_hours: $('#mod-total-hr').val(),
        credit_unit: $('#mod-cu').val(),
        lecture_class: $('#mod-lect-classes').val(),
        practical_class: $('#mod-tut-classes').val(),
        tutorial_class: $('#mod-prac-classes').val(),
        mod_dlt: $('#mod-dlt').val(),
        prereq: $('#mod-prereq').val(),
        mod_type: $('#mod-mod-type').val(),
        type: $('#mod-type').val(),
        mod_type: $('#mod-mod-type').val(),
        fk_mod_coord: $('#edit-module-coord').val(),
        fk_course_id: $('#course-offered-to').val(),
    }
    axios.put(base_url + '/api/update-module/', {
        data: _data
    }).then((response) => {
        let b = $("#select-semester option:selected").text();
        $("tbody tr").remove();
        $("caption").remove();
        _getWorkload(b)
        _getModuleAndAppend(b)
    }).catch((error) => {
        window.alert(error.response.data.message)
    });
};

//WORKLOAD------------------------------------------------------------------------
async function _getWorkload(acad_sem) {
    const workload = await axios.get(base_url + '/api/module-workload/admin?code=' + acad_sem, { withCredentials: true }).then((response) => { return response.data });
    workload_arr = workload
    //console.log(workload)
};

//dynamic appending of workloads from previously retrieved data
async function _appendWorkloads(mod_name) {
    global_indx = 0
    document.getElementById("workload-module-code").innerHTML = `Module: ${summary_obj['mod_code']} ${mod_name}`
    workload_arr.forEach((element, index) => {
        if (element['fk_mod_code'] == summary_obj['mod_code'] && element['mod_stage'] == summary_obj['mod_stage']) {
            let new_req = `<div class="form-group row" id="cc-form-group-${global_indx}">
            <label for="component-code-${global_indx}" class="col-sm-2 col-form-label col-form-label-sm">Component
                Code:</label>
            <div class="col-sm-1">
                <input type="text" class="form-control  form-control-sm" id="component-code-${global_indx}"
                    value="${element['component_code']}" readonly>
            </div>
            <label for="nrc-${index}" class="col-sm-1 col-form-label col-form-label-sm">NRC:</label>
            <div class="col-sm-2">
                <input type="text" class="form-control form-control-sm" id="nrc-${global_indx}" 
                value="${element['nrc']}" readonly>
            </div>
            <label for="weightage-${global_indx}"
                class="col-sm-1 col-form-label col-form-label-sm">Weightage:</label>
            <div class="col-sm-1">
                <input type="text" class="form-control form-control-sm" id="weightage-${global_indx}"
                value="${element['weightage']}" readonly>
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
                            value="${element['group_size']}" readonly>
                    </div>
                </div>
                <!-- Input Item -->
                <div class="form-group row">
                    <label for="start-week-${global_indx}" class="col-sm-2 col-form-label col-form-label-sm">Start
                        Week:</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control form-control-sm" id="start-week-${global_indx}"
                        value="${element['start_weeks']}" readonly>
                    </div>
                </div>
                <!-- Input Item -->
                <div class="form-group row">
                    <label for="end-week-${global_indx}" class="col-sm-2 col-form-label col-form-label-sm">End
                        Week:</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control form-control-sm" id="end-week-${global_indx}"
                        value="${element['end_weeks']}" readonly>
                    </div>
                </div>
                <!-- Input Item -->
                <div class="form-group row">
                    <label for="remarks"
                        class="col-sm-2 col-form-label col-form-label-sm align-self-center p-2">Remarks:</label>
                    <div class="col-sm-8">
                        <textarea class="form-control form-control-sm" id="remarks-${global_indx}" rows="2"
                        readonly >${element['remarks']}</textarea>
                    </div>
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
                            value="${element['testwk_type']}" readonly>
                    </div>
                </div>
                <!-- Input Item -->
                <div class="form-group row">
                    <label for="start-week-${global_indx}" class="col-sm-2 col-form-label col-form-label-sm">Type:</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control form-control-sm" id="type-${global_indx}"
                        value="${element['type']}" readonly>
                    </div>
                </div>
                <!-- Input Item -->
                <div class="form-group row">
                    <label for="end-week-${global_indx}" class="col-sm-2 col-form-label col-form-label-sm">Duration:</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control form-control-sm" id="duration-${global_indx}"
                        value="${element['duration']}" readonly>
                    </div>
                </div>
                <!-- Input Item -->
                <div class="form-group row">
                    <label for="special-requirement-${global_indx}"
                        class="col-sm-2 col-form-label col-form-label-sm align-self-center p-2">Special Requirement:</label>
                    <div class="col-sm-8">
                        <textarea class="form-control form-control-sm" id="special-requirement-${global_indx}" rows="2"
                        readonly>${element['special_requirement']}</textarea>
                    </div>
                </div>
                </div>
                </div>`
                $('#workloadtable').append(new_workload)
            }
            global_indx++
        }
    });
};
//prepare the website with all this data
_getCourses()
_getStaff()
_getSemesters()
$(document).ready(() => {
    $('#main-list>li').removeClass("active");
    $('#maintenence-system').addClass("active");

    $('#select-semester, #select-course').on('change', () => {
        let b = $("#select-semester option:selected").text();
        let course = $("#select-course option:selected").text();
        $("tbody tr").remove();
        $("caption").remove();
        _getWorkload(b)
        _getModuleAndAppend(b,course)
    });
    $('#editWorkloadSummary').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        let mod_code = button.data('module-code'); // Extract info from data-* attributes
        let mod_name = button.data('module-name');
        let mod_stage = button.data('mod-stage');
        let semester_code = button.data('sem-code');

        summary_obj = {
            mod_code: mod_code,
            mod_name: mod_name,
            mod_stage: mod_stage,
            semester_code: semester_code
        };
        var modal = $(this)
        $('#requirement-container').empty();
        $('#workloadtable').empty();
        _appendWorkloads(mod_name)
    });
    $('#editWorkloadSummary').on('hidden.bs.modal', function (event) {
        let b = $("#select-semester option:selected").text();
        _getWorkload(b)
    });
    $('#editModuleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        let index = button.data('module-index') // Extract info from data-* attributes
        var modal = $(this)
        _findTextFields(modal, index)
        //modal.find('.modal-title').text('New message to ' + recipient)
    });
    $('#editModuleModal').on('hidden.bs.modal', function (event) {
        let b = $("#select-semester option:selected").text();
        let course = $("#select-course option:selected").text();
        $("tbody tr").remove();
        $("caption").remove();
        _getWorkload(b)
        _getModuleAndAppend(b,course)
    });
    $('#module-coord-name').on('change', () => {
        let selected_value = $('#module-coord-name').val();
        $('#edit-module-coord').val(selected_value)
    });
    $('#update-module').on('click', () => {
        let b = $("#select-semester option:selected").text();
        _updateModule(b)
    });
    $('#mod-prac-hours,#mod-tut-hours,#mod-lect-hours').on('change', () => {
        let lecthr = parseInt($('#mod-lect-hours').val());
        let tuthr = parseInt($('#mod-tut-hours').val());
        let prachr = parseInt($('#mod-prac-hours').val());
        $('#mod-total-hr').val(lecthr + tuthr + prachr);
    });
    $('#edit-students, #edit-oos-students').on('change', () => {
        let students = parseInt($('#edit-students').val());
        let oos_students = parseInt($('#edit-oos-students').val());
        $('#edit-total-students').val(students + oos_students);
    });
})