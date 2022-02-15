
function copyText(element) {
    element.setAttribute('fill', '#000000');
    var copyText = element.previousElementSibling.textContent;
    navigator.clipboard.writeText(copyText);
}


let rows;
let filteredRows;
var currentPage = 0;
var rowsShown = 4;
var totalRows = 0;
var totalPages = 0;
function deleteStaffById(element) {
    var staff_id = $(element).attr("data-staff-id")
    customConfirm("This will remove this staff with staff id: " + staff_id,
        () => {
            axios.put(base_url + '/api/admin/maintenance/staff/deactivate/' + staff_id).then((response) => {
                $('#custom-reconfirm').modal('hide');
                customMessage("Successfully Deleted!")
                location.reload();
                /* getStaffandAppend();
                currentPage = 0;
                console.log(rows.length);
                for (const i in rows) {
                    if (rows[i].staff_id == staff_id) {
                        console.log(staff_id);
                        rows.splice(i, 1)

                    }
                }
                console.log(filteredRows);
                console.log(rows);
                appendPaginationNav();
                paginateRows(); */
            }).catch((e) => {
                customMessage("Unable to delete")
            })

        },
        () => {

        })
}
function getStaffandAppend() {
    $('#staff-row-table').empty();
    $('#section-select').empty();
    axios.get(base_url + '/api/admin/maintenance/staff-info', { withCredentials: true }).then((response) => {
        if (response.status == 200) {
            rows = response.data
            if (rows == null || rows.length <= 0) $('#staff-row-table').append(`<tr style="text-align:center" class=" border-bottom border-white">
                <td colspan="8">No records found</td>
                
                </tr>`)
            else {
                totalRows = rows.length;
                var html;
                var sectionArray = [];
                var section_options = `<option value="default">Showing All Sections</option>`;
                for (let i = 0; i < rows.length; i++) {
                    html += `<tr class="staff-row border-bottom border-white">
                                <td>${rows[i].staff_id}</td>
                                <td>${rows[i].staff_name}</td>
                                <td class="email-col"><span>${rows[i].staff_email}</span> <img src="/SVG Icons/Copy.svg" onclick="copyText(this)" style="width:13px;height:13px"></img><br><span>${rows[i].staff_mobile}</span> <img src="/SVG Icons/Copy.svg" onclick="copyText(this)" style="width:13px;height:13px"></img></td>
                                <td>${rows[i].designation_name}</td>
                                <td>${rows[i].section_name}</td>
                                <td>${rows[i].staff_status}</td>
                                <td class="text-end">
                                    <a  class="btn btn-success view-staff" data-bs-toggle="modal" data-bs-target="#editStaffModal" data-staff-id="${rows[i].staff_id}"><div>View/Edit</div></a>
                                </td>
                                <td class="text-end">
                                    <a  class="btn btn-danger delete-staff" onclick="deleteStaffById(this)" data-staff-id="${rows[i].staff_id}" > <div >Delete</div></a>
                                </td>
                            </tr>`
                    if (!sectionArray.includes(rows[i].section_name)) sectionArray.push(rows[i].section_name);
                }
                for (const i of sectionArray) {
                    section_options += `<option class="section-select-options" value="${i}">${i}</option>`
                }

                /*   window.location.href = "./home.html" */
                /* const accessToken = response.data.accessToken;
                storeAccessTokenInLocalStorage(accessToken); */
                $('#section-select').append(section_options)
                $('#staff-row-table').append(html).then(appendStaffFormValues(rows))
            }
            //fill in staff-inf-edit modal values
        }
    }).catch((error) => {
        $("#error_message_content").text('Invalid Login credientals, please try again.')
        $("#error_message").css("display", "block");
    });
}
function appendPaginationNav() {
    try {
        $('.pagination').empty();
        totalPages = Math.ceil(totalRows / rowsShown);
        var pagination_html = '<li class="page-item"><a onclick="pageChange(this)" data-pagination-id="minus"  class="page-link" href="#">Previous</a></li>'
        for (let i = 0; i < totalPages; i++) {
            pagination_html += '<li class="page-item"><a onclick="pageChange(this)" data-pagination-id="' + i + '" class="page-link page-no" href="#">' + (i + 1) + '</a></li>'
        }
        pagination_html += '<li class="page-item"><a onclick="pageChange(this)" data-pagination-id="add" class="page-link" href="#">Next</a></li>'
        $('.pagination').append(pagination_html)
        $('li:nth-child(2) .page-no').css("background", "#a5c6fa")
    } catch (e) {
        throw e
    }
}
var expanded = false;

function showCheckboxes() {
    var checkboxes = document.getElementById("role-checkboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}

function showCheckboxesUpdate() {
    var checkboxes = document.getElementById("role-checkboxes-edit");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}
function pageChange(element) {
    if (element.textContent == "Previous") {
        if (currentPage > 0) currentPage--;
    } else if (element.textContent == "Next") {
        if (currentPage < totalPages - 1) currentPage++;
    } else {
        currentPage = parseInt(element.textContent) - 1;
    }
    $('.page-no').css("background", "none");
    $('.page-no')[currentPage].style.background = "#a5c6fa"
    paginateRows()
}
function filterSection(page) {
    var select = $('#section-select option:selected').val()
    var status = $('#select-status option:selected').val()
    if (select === "default") {
        $('tr.staff-row').removeClass("row-hide")
    } else $('tr.staff-row').addClass("row-hide");
    ($('tr.staff-row:contains(' + select + ')')).removeClass("row-hide")
    if (status != "all") {
        $('tr.staff-row:contains(' + status + ')').addClass("row-hide")
    }


    filteredRows = $('tr.staff-row').not('.row-hide');
    totalRows = filteredRows.length
    currentPage = page;
    appendPaginationNav();
    paginateRows();
}
function filterDate() {
    var select = $('#section-select option:selected').val()
    if (select === "default") {
        $('tr.staff-row').removeClass("row-hide")
    } else $('tr.staff-row').addClass("row-hide");
    ($('tr.staff-row:contains(' + select + ')')).removeClass("row-hide")
    filteredRows = $('tr.staff-row').not('.row-hide');
    paginateRows();
}
function paginateRows() {
    try {
        if (!filteredRows) {
            filteredRows = $('tr.staff-row');
        }
        // var dataRows = $('tr.staff-row:not(row-hide)');
        var showRows = filteredRows.slice(currentPage * rowsShown, currentPage * rowsShown + rowsShown);
        filteredRows.addClass("row-hide")
        for (let i = 0; i < showRows.length; i++) {
            showRows[i].classList.remove("row-hide")
        }
        let showRowsNumber = rowsShown;
        if ((currentPage * rowsShown + rowsShown) > rows.length) showRowsNumber = rows.length - ((currentPage * rowsShown + rowsShown) - rowsShown)
        $("#results-length").text(showRowsNumber + " out of " + rows.length)
    } catch (e) {

    }
}
function getStaffRoles(staff_id) {
    return axios.get(base_url + '/api/admin/maintenance/staff/roles?staff_id=' + staff_id)
        .then(response => response.data)
        .catch(err => error(err));
};
function appendStaffFormValues(rows) {
    $('.view-staff').on('click', async function () {
        var index = $('.view-staff').index(this);
        //  var dataId = $(this).attr("data-staff-id")
        $('#staff-id-edit-input').val(rows[index].staff_id)
        $('#staff-name-edit-input').val(rows[index].staff_name)
        $('#staff-abbrv-edit-input').val(rows[index].staff_abbrv)
        $('#staff-type-edit-input').val(rows[index].fk_staff_type)
        $('#staff-schedule-edit-input').val(rows[index].schedule_id)
        $('#staff-designation-edit-input').val(rows[index].designation_id)
        $('#staff-email-edit-input').val(rows[index].staff_email)
        $('#staff-contact-edit-input').val((rows[index].staff_number).replace(/[^0-9]/g, ''))
        $('#staff-mobile-edit-input').val((rows[index].staff_mobile).replace(/[^0-9]/g, ''))
        $('#staff-remarks-edit-input').val(rows[index].staff_remarks)
        $('#staff-status-edit-input').val(rows[index].staff_status)
        $('#update-staff-submit').attr("data-staff-id", rows[index].staff_id)
        $('.reset-password').attr("data-staff-id", rows[index].staff_id)
        // Get assigned roles
        let roles = await getStaffRoles(rows[index].staff_id);
        $("#one-edit").prop("checked", false)
        $("#two-edit").prop("checked", false)
        $("#three-edit").prop("checked", false)
        $("#four-edit").prop("checked", false)
        $("#five-edit").prop("checked", false)
        roles.forEach(role => {
            switch (role.fk_role_id) {
                case "1":
                    $("#one-edit").prop("checked", true)
                    break;
                case "2":
                    $("#two-edit").prop("checked", true)
                    break;
                case "3":
                    $("#three-edit").prop("checked", true)
                    break;
                case "4":
                    $("#four-edit").prop("checked", true)
                    break;
                case "5":
                    $("#five-edit").prop("checked", true)
                    break;
            }
        });
    })
    appendPaginationNav();
    paginateRows();
    filterSection(0);
}
function createStaff() {
    var selected = new Array()
    $('#role-checkboxes input:checked').each((i, ob) => {
        selected.push($(ob).val());
    })
    var data = {
        staff_id: $('#staff-id-input').val(),
        staff_name: $('#staff-name-input').val(),
        staff_password: $('#staff-password-input').val(),
        staff_abbrv: $('#staff-abbrv-input').val(),
        staff_type: $('#staff-type-input').val(),
        staff_schedule: $('#staff-schedule-input').val(),
        staff_designation: $('#staff-designation-input').val(),
        staff_email: $('#staff-email-input').val(),
        staff_contact: $('#staff-contact-input').val(),
        staff_mobile: $('#staff-mobile-input').val(),
        staff_remarks: $('#staff-remarks-input').val(),
        staff_status: $('#staff-status-input').val(),
        staff_role: selected,
    }
    axios.post(base_url + '/api/admin/maintenance/staff/create', data)
        .then((response) => {
            $('#createStaffModal').modal('hide');
            customMessage("Successfully Created!")
            location.reload();
        }).catch((e) => {
            customMessage("Unable to create")
        })
}
function resetPassword(data) {
    let staff_id = $(data).data("staff-id");
    return axios.put(base_url + '/api/admin/maintenance/staff/password/',
        {
            new_password: $("#staff-reset-password")[0].value,
            staff_id: staff_id
        })
        .then(() => {
            success("reset");
        })
        .catch(err => error(err));
}
function updateStaffById(element) {
    var selected = new Array()
    $('#role-checkboxes-edit input:checked').each((i, ob) => {
        selected.push($(ob).val());
    })
    var staff_id = $(element).attr("data-staff-id")
    var data = {
        staff_id: $('#staff-id-edit-input').val(),
        staff_name: $('#staff-name-edit-input').val(),
        staff_abbrv: $('#staff-abbrv-edit-input').val(),
        staff_type: $('#staff-type-edit-input').val(),
        staff_schedule: $('#staff-schedule-edit-input').val(),
        staff_designation: $('#staff-designation-edit-input').val(),
        staff_email: $('#staff-email-edit-input').val(),
        staff_contact: $('#staff-contact-edit-input').val(),
        staff_mobile: $('#staff-mobile-edit-input').val(),
        staff_remarks: $('#staff-remarks-edit-input').val(),
        staff_status: $('#staff-status-edit-input').val(),
        staff_role: selected
    }
    console.log("staf role is " + data.staff_role);
    axios.put(base_url + '/api/admin/maintenance/staff/update/' + staff_id, data)
        .then((response) => {
            $('#editStaffModal').modal('hide');
            customMessage("Successfully Updated!")
            filterSection(currentPage)
            let content = { textContent: (currentPage + 1) }
            pageChange(content)


        }).catch((e) => {
            customMessage("Unable to update")
            /* error(e) */
        })
    console.log(selected);
}
function clearModal() {
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
}

function getDesignation() {
    return axios.get(base_url + '/api/designation/')
        .then(response => response.data)
        .catch(err => error(err));
};

function getStaffTypes() {
    return axios.get(base_url + '/api/staff/types')
        .then(response => response.data)
        .catch(err => error(err));
}

async function generateCreateFormData() {
    let designations = await getDesignation();
    for (let index = 0; index < designations.length; index++) {
        const designation = designations[index];
        $("#staff-designation-input").append(`<option value="` + designation.designation_id + `">` + designation.section_name + `</option>`)
        $('#staff-designation-edit-input').append(`<option value="` + designation.designation_id + `">` + designation.section_name + `</option>`)
    }
    let types = await getStaffTypes();
    for (let index = 0; index < types.length; index++) {
        const type = types[index];
        $("#staff-type-input").append(`<option value="` + type.staff_type + `">` + type.staff_description + ` (` + type.staff_type + `)</option>`)
        $("#staff-type-edit-input").append(`<option value="` + type.staff_type + `">` + type.staff_description + ` (` + type.staff_type + `)</option>`)
    }
}




$(document).ready(() => {
    generateCreateFormData()

    $('#section-select').change(() => {
        filterSection(0)
    })
    $('#select-status').change(() => {
        filterSection(0)
    })
    $('#btn-module, #btn-staff').click(function () {
        $('#btn-module, #btn-staff').css("background", "white");
        $('#btn-module, #btn-staff').removeClass('active');
        $(this).css("background", "blue");
        $(this).addClass('active');
    });
    getStaffandAppend()
    /* $('#main-list>li').removeClass("active")
    $('#maintenence-system').addClass("active")
    $('.accordion-body a:nth-child(2)').addClass("text-active")
    $('.accordion-button') */

    $(".reset-password").click((e) => {
        let staff_id = $(e.target).data("staff-id");
        $("#reset-staff-password").attr("data-staff-id", staff_id)
    })
})