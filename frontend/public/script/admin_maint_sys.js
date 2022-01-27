var results_array;

function getModuleAndAppend(acad_sem) {
    $('#module-table tbody tr').remove();
    axios.get(base_url + '/api/module?semester_code=' + acad_sem, { withCredentials: true }).then((response) => {
        let modules = response.data
        modules.forEach(element => {
            let table_row = `
            <tr class="border-bottom border-white">
            <td>${element['fk_course_id']}</td>
            <td>${element['mod_code']}</td>
            <td class = "text-wrap">${element['mod_name']}</td>
            <td>${element['fk_semester_code']}</td>
            <td>${element['mod_stage']}</td>
            <td>
            <div class= "edit-module-button" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Module Info</div>
            </td>
            <td>
            <div class= "edit-button" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Workload</div>
            </td>
            </tr>`
            $('#module-table').append(table_row)
        });
        $('caption').remove()
        $('#admin-table').append(`<caption id= 'caption'>Showing ${modules.length} Modules </caption>`)
    }).catch((error) => {
        $("#error_message_content").text('Invalid Login credientals, please try again.')
        $("#error_message").css("display", "block");
    });

}

//get available semesters
function getSemesters() {
    axios.get(base_url + '/api/report/semester/').then((results) => {
        results.data.forEach(element => {
            $('#select-semester').append(`<option>${element.semester_code}</option>`)
        });
    })
};

async function getAllModules() {
    const all_modules = await axios.get(base_url + '/api/all-modules/').then((results) => { return results.data });
    results_array = all_modules
    all_modules.forEach((element, index) => {
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
        <div class= "edit" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="">Edit Workload</div>
        </td>
        </tr>`
        $('#module-table').append(table_row)
    });
    $('#admin-table').append(`<caption id= 'caption'>Showing ${all_modules.length} Modules </caption>`)
};

getAllModules()
getSemesters()
$(document).ready(() => {

    $('#main-list>li').removeClass("active")
    $('#maintenence-system').addClass("active")

    $('#select-semester').on('change', () => {
        let b = $("#select-semester option:selected").text();
        $("tbody tr").remove();
        $("caption").remove();
        getModuleAndAppend(b)
    });
    $('#exampleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        let index = button.data('module-index') // Extract info from data-* attributes
        console.log(index)
        var modal = $(this)
        //modal.find('.modal-title').text('New message to ' + recipient)
      })
      $('#editModuleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        let index = button.data('module-index') // Extract info from data-* attributes
        console.log(index)
        var modal = $(this)
        //modal.find('.modal-title').text('New message to ' + recipient)
      })
    /* $('tbody').on('click', '.edit',() => {
        console.log("printing:")
    }); */

})