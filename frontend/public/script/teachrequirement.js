// FUNCTIONS
function getTeachingRequirements(){
    axios.get('http://localhost:8080/api/teaching-requirement/8405')
    .then((response) => {
        console.log(response.data);
        let data = response.data;
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

    });
}

function addTeachingRequirement(){
    axios.put('http://localhost:8080/api/staff/8405',
    {
        staff_name : $("#staff-name")[0].value,
        staff_abbrv : $("#staff-abbrv")[0].value,
        staff_email : $("#staff-email")[0].value,
        staff_number : $("#staff-contactnumber")[0].value,
        staff_mobile : $("#staff-mobilenumber")[0].value,
        staff_remarks : $("#staff-remarks")[0].value
    })
    .then((response) => {
        console.log(response.data);
    });
}

function deleteTeachingRequirement(ptr_id){
    axios.delete('http://localhost:8080/api/teaching-requirement/' + ptr_id)
}
// START OF SCRIPT
getTeachingRequirements();

$(document).ready(() => {
    // Delete Requirement 
    $(".requirements").on('click',".delete-requirement", (e)=>{
        axios.get('http://localhost:8080/api/teaching-requirement/8405')
        .then((response) => {
            let index = $(e.target).data("id");
            let data = response.data[index];
            let ptr_id = data.prefix + data.ptr_id;
            deleteTeachingRequirement(ptr_id);
            location.reload();
        });
    })

    // Add Requirement
    $("#add-requirement").click(()=>{
        axios.post('http://localhost:8080/api/teaching-requirement/', 
        {
            staff_id : 8405, //SAMPLE DATA
            ptr_day : $("#day")[0].value,
            ptr_time : $("#time")[0].value,
            ptr_duration : $("#duration")[0].value,
            ptr_reason : $("#reason")[0].value,
            semester_code : "AY 2021/2022 SEM2" //SAMPLE DATA
        })
        .then(
            location.reload()
        );
    });
});
