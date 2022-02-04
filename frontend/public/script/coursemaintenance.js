function getCourse(status) {
    return axios.get(base_url + '/api/course/?status='+ status)
        .then(response => response.data)
        .catch(err => error(err));
};

function createCourse() {
    return axios.post(base_url + '/api/course/',
    {
        course_code : $("#course-code-create")[0].value,
        course_name : $("#course-name-create")[0].value
    })
    .then(() => {
        $("#create-course").modal('hide')
        success("created")
        generateCourseList()
    })
    .catch(err => error(err));
}

function updateCourse(course_code_old) {
    return axios.put(base_url + '/api/course/',
    {
        course_code : $("#course-code-update")[0].value,
        course_name : $("#course-name-update")[0].value,
        course_code_old : course_code_old
    })
    .then(() => {
        success("updated");
    })
    .catch(err => error(err));
}

function disableCourse(course_code) {
    return axios.put(base_url + '/api/course/disable',
    {
        course_code : course_code
    })
    .then(() => {
        success("disabled");
    })
    .catch(err => error(err));
}

function deleteCourse(course_code) {
    return axios.delete(base_url + '/api/course?course_code=' + course_code)
    .then(() => {
        success("deleted");
    })
    .catch(err => error(err));
}

function enableCourse(course_code) {
    return axios.put(base_url + '/api/course/enable',
    {
        course_code : course_code
    })
    .then(() => {
        success("enabled");
    })
    .catch(err => error(err));
}

async function inputValidation(type) {
    let code_check = new RegExp('^[A-Z]+$')
    let name_check = new RegExp('^[A-Za-z ]+$')
    if (type == "create") {
        let code_create = $("#course-code-create")[0].value;
        let name_create = $("#course-name-create")[0].value;
        if (!code_check.test(code_create)) {
            throw "Course Code only allows uppercase letters and no spacing."
        }
        if (!name_check.test(name_create)) {
            throw "Course name only allows uppercase or lowercase letters."
        }
    }
    if (type == "update") {
        let code_update = $("#course-code-update")[0].value;
        let name_update = $("#course-name-update")[0].value;
        if (!code_check.test(code_update)) {
            throw "Course Code only allows uppercase letters and no spacing."
        }
        if (!name_check.test(name_update)) {
            throw "Course name only allows uppercase or lowercase letters."
        }
    } 
}

async function generateCourseList() {
    let status = $("#select-status option:selected").val()
    $(".course-list").empty();
    let courses = await getCourse(status)
    for (let index = 0; index < courses.length; index++) {
        const course = courses[index];
        if (status == "active") {
            $(".course-list").append(`
            <tr class="border-bottom border-white align-middle">
                <td>`+ course.course_id + `</td>
                <td>`+ course.course_name + `</td>
                <td class="text-end">
                    <button class="btn btn-success view-course"type="button" data-index="`+ index + `" data-bs-toggle="modal" data-bs-target="#view-course">Edit</button>
                </td>
                <td class="text-end">
                <button class="btn btn-danger confirm-delete-course"type="button" data-index="`+ index + `" data-bs-toggle="modal" data-bs-target="#delete-course">Deactivate</button>
            </td>
            </tr>`);
        }
        else {
            $(".course-list").append(`
            <tr class="border-bottom border-white align-middle">
                <td>`+ course.course_id + `</td>
                <td>`+ course.course_name + `</td>
                <td class="text-end">
                    <button class="btn btn-success reactivate" type="button" data-index="`+ index + `">Reactivate</button>
                </td>
                <td class="text-end">
                <button class="btn btn-danger delete-forever" type="button" data-index="`+ index + `" data-bs-toggle="modal" data-bs-target="#delete-course-forever">Delete</button>
            </td>
            </tr>`);
        }

    }
    $("#caption").empty();
    $("#caption").append(`Showing `+ courses.length +` Results`)
}

async function generateCreateCourse() {
    $(".create-course-content").empty();
    $(".create-course-content").append(`
    <div class="form-group row my-3">
        <div class="row col-5 me-2">
            <label for="course-code-create" class="col-sm-4 col-form-label col-form-label-sm">Course Code:</label>
            <div class="col-sm-8">
                <input type="text" class="form-control form-control-sm" id="course-code-create" placeholder="Enter Course Code">
            </div>
        </div>

        <div class="row col-5 ms-2">
            <label for="course-name" class="col-sm-4 col-form-label col-form-label-sm">Course Name:</label>
            <div class="col-sm-8">
                <input type="text" class="form-control form-control-sm" id="course-name-create" placeholder="Enter Course Name">
            </div>
        </div>

    </div>
    <button type="submit" class="btn btn-primary float-end create-course">Create Course</button>`);
}

async function generateCourseUpdate(course_index) {
    let status = $("#select-status option:selected").val()
    let courses = await getCourse(status);
    let course = courses[course_index];
    $("#view-course-title").empty();
    $("#view-course-title").append(course.course_name, ` (`+course.course_id+`)`);
    $(".view-course-content").empty();
    $(".view-course-content").append(`
    <div class="form-group row my-3">
        <div class="row col-5 me-2">
            <label for="course-code-update" class="col-sm-4 col-form-label col-form-label-sm">Course Code:</label>
            <div class="col-sm-8">
                <input type="text" class="form-control form-control-sm" id="course-code-update" value="`+ course.course_id +`">
            </div>
        </div>

        <div class="row col-5 ms-2">
            <label for="course-name" class="col-sm-4 col-form-label col-form-label-sm">Course Name:</label>
            <div class="col-sm-8">
                <input type="text" class="form-control form-control-sm" id="course-name-update" value="`+ course.course_name +`">
            </div>
        </div>
    </div>
    <button type="submit" class="btn btn-primary float-end update-course" data-code="`+course.course_id+`" data-index="`+course_index+`">Update Course</button>`)
}

async function confirmDeleteCourse(course_index) {
    $("#delete-course .course-name-delete").empty();
    let status = $("#select-status option:selected").val()
    let courses = await getCourse(status);
    let course = courses[course_index];
    $("#delete-course .course-name-delete").append(course.course_name, ` (`+course.course_id+`)`);
    $("#delete-course .confirm-delete-button").empty();
    $("#delete-course .confirm-delete-button").append(`
    <button type="button" class="btn btn-danger delete-course mx-4" data-index="`+course_index+`" data-bs-dismiss="modal">Deactivate</button>
    <button type="button" class="btn btn-primary mx-4" data-bs-dismiss="modal">Close</button>`);
}

async function deactivateCourse(course_index) {
    let status = $("#select-status option:selected").val()
    let courses = await getCourse(status);
    let course = courses[course_index];
    let course_code = course.course_id;
    await disableCourse(course_code);
}

async function activateCourse(course_index) {
    let status = $("#select-status option:selected").val()
    let courses = await getCourse(status);
    let course = courses[course_index];
    let course_code = course.course_id;
    await enableCourse(course_code);
}

async function confirmDeleteCourseForever(course_index) {
    $("#delete-course-forever .course-name-delete").empty();
    let status = $("#select-status option:selected").val()
    let courses = await getCourse(status);
    let course = courses[course_index];
    $("#delete-course-forever .course-name-delete").append(course.course_name, ` (`+course.course_id+`)`);
    $("#delete-course-forever .confirm-delete-button").empty();
    $("#delete-course-forever .confirm-delete-button").append(`
    <button type="button" class="btn btn-danger delete-course-forever mx-4" data-index="`+course_index+`" data-bs-dismiss="modal">Delete</button>
    <button type="button" class="btn btn-primary mx-4" data-bs-dismiss="modal">Close</button>`);
}

async function deleteCourseForever(course_index) {
    let status = $("#select-status option:selected").val()
    let courses = await getCourse(status);
    let course = courses[course_index];
    let course_code = course.course_id;
    await deleteCourse(course_code);
}

$(document).ready(() => {
    generateCourseList();


    $(".create-course-button").click(()=>{
        generateCreateCourse();
    });

    $(".create-course-content").on('click', ".create-course", ()=>{
        inputValidation("create")
        .then(async()=>{
            await createCourse();
        })
        .catch(err => error(err))
    });

    $(".course-list").on('click', ".view-course", (e) => {
        let course_index = $(e.target).data("index");
        generateCourseUpdate(course_index);
    })

    $("#view-course").on('click', ".update-course", (e) => {
        let course_index = $(e.target).data("index");
        let course_code_old = $(e.target).data("code");
        inputValidation("update")
        .then(async()=>{
            await updateCourse(course_code_old)
        })
        .then(()=>{
            generateCourseList();
            generateCourseUpdate(course_index);
        })
        .catch(err => error(err));
    })

    $(".course-list").on('click', ".confirm-delete-course", (e) => {
        let course_index = $(e.target).data("index");
        confirmDeleteCourse(course_index);
    })

    $("#delete-course").on('click', ".delete-course", (e) => {
        let course_index = $(e.target).data("index");
        deactivateCourse(course_index)
        .then(()=>{
            generateCourseList();
        });
    })

    $("#select-status").change(()=>{
        generateCourseList();
    })

    $(".course-list").on('click', ".delete-forever", (e) => {
        let course_index = $(e.target).data("index");
        confirmDeleteCourseForever(course_index);
    })

    $("#delete-course-forever").on('click', ".delete-course-forever", (e) => {
        let course_index = $(e.target).data("index");
        deleteCourseForever(course_index)
        .then(()=>{
            generateCourseList();
        });
    })

    $(".course-list").on('click', ".reactivate", (e) => {
        console.log("Test");
        let course_index = $(e.target).data("index");
        activateCourse(course_index)
        .then(()=>{
            generateCourseList();
        });
    })




});