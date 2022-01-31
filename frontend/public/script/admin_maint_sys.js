var results_array;
var old_mod_code;
var current_stage;

//get available semesters
function _getSemesters() {
    axios.get(base_url + '/api/report/semester/').then((results) => {
        results.data.forEach(element => {
            $('#select-semester').append(`<option>${element.semester_code}</option>`)
            $('#edit-semester-code').append(`<option>${element.semester_code}</option>`)
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
async function _getModuleAndAppend(acad_sem) {
    //$('#module-table tbody tr').remove();
    const filtered_modules = await axios.get(base_url + '/api/module?semester_code=' + acad_sem, { withCredentials: true }).then((response) => { return response.data });
    results_array = filtered_modules;
    filtered_modules.forEach((element, index) => {
        let table_row = `
        <tr class="border-bottom border-white table_row">
        <td>${element['fk_course_id']}</td>
        <td>${element['mod_code']}</td>
        <td class = "text-wrap">${element['mod_name']}</td>
        <td>${element['fk_semester_code']}</td>
        <td>${element['mod_stage']}</td>
        <td>
            <div class= "edit-module-button" data-bs-toggle="modal" data-bs-target="#editModuleModal" data-module-index="${index}">Edit Module Info</div>
        </td>
        <td>
        <div class= "edit" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Workload</div>
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
        window.alert("Module Successfully Updated. Please refresh the page to view changes")
    }).catch((error) => {
        window.alert(error.response.data.message)
    });
};
//prepare the website with all this data
_getStaff()
_getSemesters()
$(document).ready(() => {
    $('#main-list>li').removeClass("active");
    $('#maintenence-system').addClass("active");

    $('#select-semester').on('change', () => {
        let b = $("#select-semester option:selected").text();
        $("tbody tr").remove();
        $("caption").remove();
        _getModuleAndAppend(b)
    });
    $('#exampleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        let index = button.data('module-index') // Extract info from data-* attributes
        var modal = $(this)
    });
    $('#editModuleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        let index = button.data('module-index') // Extract info from data-* attributes
        var modal = $(this)
        _findTextFields(modal, index)
        //modal.find('.modal-title').text('New message to ' + recipient)
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
        $('#mod-total-hr').val(lecthr+tuthr+prachr)
    });
})