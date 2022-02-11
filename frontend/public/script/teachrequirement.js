$(document).ready(() => {
    $('#main-list>li').removeClass("active")
    $('#update-teaching-assignment').addClass("active")
})
function getTeachingRequirements() {
    return axios.get(base_url + '/api/teaching-requirement/'  + sessionStorage.getItem('staff_id') + '?semester_code=' + sessionStorage.getItem('semester_code')) 
        .then(response => response.data)
        .catch(err => error(err));
};

function addTeachingRequirement() {
    return axios.post(base_url + '/api/teaching-requirement/',
        {
            staff_id: sessionStorage.getItem('staff_id'), 
            ptr_day: $("#day")[0].value,
            ptr_time: $("#time")[0].value,
            ptr_duration: $("#duration")[0].value,
            ptr_reason: $("#reason")[0].value,
            semester_code: sessionStorage.getItem('semester_code') 
        })
        .then(response => response.data)
        .catch(err => error(err));
}

function deleteTeachingRequirement(ptr_id) {
    return axios.delete(base_url + '/api/teaching-requirement/' + ptr_id)
        .then(() => success("deleted"))
        .catch(err => error(err));
}

function getRemarks() {
    return axios.get(base_url + '/api/teaching-requirement/remarks/'  + sessionStorage.getItem('staff_id') +  '?semester_code=' + sessionStorage.getItem('semester_code')) 
        .then(response => response.data)
        .catch(err => error(err));
};

function addRemarks() {
    return axios.post(base_url + '/api/teaching-requirement/remarks',
        {
            staff_id: sessionStorage.getItem('staff_id'), 
            ptr_remarks: $("#additional-requests")[0].value,
            semester_code: sessionStorage.getItem('semester_code') 
        })
        .then(() => success())
        .catch(err => error(err));
}

function updateRemarks() {
    return axios.put(base_url + '/api/teaching-requirement/remarks',
        {
            staff_id: sessionStorage.getItem('staff_id'), 
            ptr_remarks: $("#additional-requests")[0].value,
            semester_code: sessionStorage.getItem('semester_code') 
        })
        .then(() => success())
        .catch(err => error(err));
}



async function checkRemarksExist() {
    let data = await getRemarks();
    if (data.length > 0) {
        return true;
    }
    else {
        return false;
    }
}

async function submitRemark() {
    let data = await checkRemarksExist();
    if (data) {
        updateRemarks()
    }
    else {
        addRemarks()
    }
}

async function generateTeachingRequirements() {
    let data = await getTeachingRequirements();
    $(".requirements").empty();
    $(".requirements").append(
        `                                            
    <!-- Add Requirement Section -->
    <tr>
        <td>
            <div class="form-group my-1">
                <select class="form-control form-control-sm" id="day">
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                </select>
            </div>
        </td>
        <td>
            <div class="form-group my-1">
                <input type="time" class="form-control form-control-sm" id="time">
            </div>
        </td>
        <td>
            <div class="form-group my-1">
                <input type="number" step="0.5" class="form-control form-control-sm" id="duration">
            </div>
        </td>
        <td>
            <div class="form-group my-1">
                <input type="text" class="form-control form-control-sm" id="reason">
            </div>
        </td>
        <td>
            <!-- Add Button -->
            <button type="button" class="btn btn-primary float-end my-3" id="add-requirement">Add</button>
        </td>
    </tr>`);

    for (let index = data.length - 1; index >= 0; index--) {
        var interation = data[index];
        $(".requirements").prepend(`                                            
        <tr>
            <td>`+ interation.ptr_day + `</td>
            <td>`+ interation.ptr_time + `</td>
            <td>`+ interation.ptr_duration + `</td>
            <td>`+ interation.ptr_reason + `</td>
            <td>
                <div>
                    <!-- Delete Button -->
                    <button type="button" class="delete-requirement btn btn-danger float-end my-3" data-id="`+ index + `">Delete</button>
                </div>
            </td>
        </tr>`);
    }
}

async function generateRemarks() {
    let data = await getRemarks();
    if (data.length != 0) {
        $("#additional-requests")[0].value = data[0].ptr_remarks
    }
}
// START OF SCRIPT
generateTeachingRequirements();
generateRemarks();

$(document).ready(() => {
    // Delete Requirement 
    $(".requirements").on('click', ".delete-requirement", (e) => {
        getTeachingRequirements()
            .then(response => {
                let index = $(e.target).data("id");
                let data = response[index];
                let ptr_id = data.prefix + data.ptr_id;
                deleteTeachingRequirement(ptr_id)
                    .then(()=>generateTeachingRequirements());
            })
    })

    // Add Requirement
    $(".requirements").on('click', "#add-requirement", () => {
        addTeachingRequirement()
            .then(()=>generateTeachingRequirements());
    });

    // Submit Requests
    $("#submit-requests").click(() => {
        submitRemark();
    });

});

