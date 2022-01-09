// FUNCTIONS
function getTeachingRequirements(){
    return axios.get('http://localhost:8080/api/teaching-requirement/8405')
    .then(response => response.data)
    .catch(err => error(err));
};

function addTeachingRequirement(){
    return axios.post('http://localhost:8080/api/teaching-requirement/', 
    {
        staff_id : 8405, //SAMPLE DATA
        ptr_day : $("#day")[0].value,
        ptr_time : $("#time")[0].value,
        ptr_duration : $("#duration")[0].value,
        ptr_reason : $("#reason")[0].value,
        semester_code : "AY 2021/2022 SEM2" //SAMPLE DATA
    })
    .then(response => response.data)
    .catch(err => error(err));
}

function deleteTeachingRequirement(ptr_id){
    return axios.delete('http://localhost:8080/api/teaching-requirement/' + ptr_id)
    .then(response => response.data)
    .catch(err => error(err));
}

function getRemarks(){
    return axios.get('http://localhost:8080/api/teaching-requirement/remarks/8405?semester_code=AY 2021/2022 SEM2')
    .then(response => response.data)
    .catch(err => error(err));
};

function addRemarks(){
    return axios.post('http://localhost:8080/api/teaching-requirement/remarks', 
    {
        staff_id : 8405, //SAMPLE DATA
        ptr_remarks : $("#additional-requests")[0].value,
        semester_code : "AY 2021/2022 SEM2" //SAMPLE DATA
    })
    .then(() => success())
    .catch(err => error(err));
}

function updateRemarks(){
    return axios.put('http://localhost:8080/api/teaching-requirement/remarks', 
    {
        staff_id : 8405, //SAMPLE DATA
        ptr_remarks : $("#additional-requests")[0].value,
        semester_code : "AY 2021/2022 SEM2" //SAMPLE DATA
    })
    .then(() => success())
    .catch(err => error(err));
}

function error(err){
    var errorModal = new bootstrap.Modal($('#submit-requests-error'), 'focus');
    errorModal.show()
    console.log(err);
}

function success(){
    var successModal = new bootstrap.Modal($('#submit-requests-success'), 'focus');
    successModal.show();
}

async function checkRemarksExist(){
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

async function generateTeachingRequirements(){
    let data = await getTeachingRequirements();
    $(".requirements").empty();
    $(".requirements").append(
    `                                            
    <!-- Add Requirement Section -->
    <tr>
        <td>
            <div class="form-group col-12 my-1">
                <select class="form-control form-control-sm" id="day">
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
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
            <div>
                <!-- Add Button -->
                <button type="button" class="btn btn-primary float-end m-3 p-0" id="add-requirement">Add</button>
            </div>
        </td>
    </tr>`);

    for (let index = data.length - 1; index >= 0; index--) {
        var interation = data[index];
        $(".requirements").prepend(`                                            
        <tr>
            <td>`+ interation.ptr_day+`</td>
            <td>`+ interation.ptr_time+`</td>
            <td>`+ interation.ptr_duration+`</td>
            <td>`+ interation.ptr_reason+`</td>
            <td>
                <div>
                    <!-- Delete Button -->
                    <button type="button" class="delete-requirement btn btn-danger float-end m-3 p-0" data-id="`+index+`">Delete</button>
                </div>
            </td>
        </tr>`);
    }
}

async function generateRemarks(){
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
    $(".requirements").on('click',".delete-requirement", (e)=>{
        getTeachingRequirements()
        .then(response => { 
            let index = $(e.target).data("id");
            let data = response[index];
            let ptr_id = data.prefix + data.ptr_id;
            deleteTeachingRequirement(ptr_id)
            .then(getTeachingRequirements())
            .then(generateTeachingRequirements());
        })
    })

    // Add Requirement
    $(".requirements").on('click',"#add-requirement", ()=>{
        addTeachingRequirement()
        .then(getTeachingRequirements())
        .then(generateTeachingRequirements());
    });

    // Submit Requests
    $("#submit-requests").click(()=>{
        console.log(submitRemark());
    });

});

