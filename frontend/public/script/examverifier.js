function getCourse() {
    return axios.get(base_url + '/api/course/?status=active')
        .then(response => response.data)
        .catch(err => error(err));
};

function getModulesBySection(section) {
    return axios.get(base_url + '/api/module/section?section=' + section + '&semester_code=' + sessionStorage.getItem('semester_code'))
        .then(response => response.data)
        .catch(err => error(err));
};

function getExamByModule(mod_code, section) {
    return axios.get(base_url + '/api/exam/module?mod_code=' + mod_code + '&semester_code=' + sessionStorage.getItem('semester_code') + '&course_id=' + section)
        .then(response => response.data)
        .catch(err => error(err));
};

function getAllStaff() {
    return axios.get(base_url + '/api/tas/staff/')
        .then(response => response.data)
        .catch(err => error(err));
};

function createExam(mod_code) {
    return axios.post(base_url + '/api/exam/',
        {
            moderator: $("#select-moderator option:selected").val(),
            mdeo_marker: $("#select-mdeo-marker option:selected").val(),
            co_marker: $("#select-marker option:selected").val(),
            verifier: $("#select-verifier option:selected").val(),
            verifier_details: $("#input-verifier-details")[0].value,
            markers_moderator: $("#select-mark-moderator option:selected").val(),
            module_mcl: $("#select-mcl option:selected").val(),
            chief_examiner: $("#select-chief-examiner option:selected").val(),
            co_examiner: $("#select-co-examiner option:selected").val(),
            shared_paper: $("#input-shared-paper")[0].value,
            shared_question: $("#input-shared-question")[0].value,
            type_of_module: $("#select-module-type option:selected").val(),
            external: $("#input-external")[0].value,
            module_code: mod_code,
            semester_code: sessionStorage.getItem('semester_code'),
            course_id: $("#select-section option:selected").val()
        })
        .then(() => success())
        .catch(err => error(err));
}

function updateExam(mod_code) {
    return axios.put(base_url + '/api/exam/',
        {
            moderator: $("#select-moderator option:selected").val(),
            mdeo_marker: $("#select-mdeo-marker option:selected").val(),
            co_marker: $("#select-marker option:selected").val(),
            verifier: $("#select-verifier option:selected").val(),
            verifier_details: $("#input-verifier-details")[0].value,
            markers_moderator: $("#select-mark-moderator option:selected").val(),
            module_mcl: $("#select-mcl option:selected").val(),
            chief_examiner: $("#select-chief-examiner option:selected").val(),
            co_examiner: $("#select-co-examiner option:selected").val(),
            shared_paper: $("#input-shared-paper")[0].value,
            shared_question: $("#input-shared-question")[0].value,
            type_of_module: $("#select-module-type option:selected").val(),
            external: $("#input-external")[0].value,
            module_code: mod_code,
            semester_code: sessionStorage.getItem('semester_code'),
            course_id: $("#select-section option:selected").val()
        })
        .then(() => success())
        .catch(err => error(err));
}


async function generateSection() {
    let courses = await getCourse();
    for (let index = 0; index < courses.length; index++) {
        const section = courses[index];
        $("#select-section").append(`<option value="` + section.course_id + `">` + section.course_id + `</option>`)
    }
}

async function generateModuleList() {
    $(".module-list").empty();
    let section = $("#select-section option:selected").val();
    let modules = await getModulesBySection(section);
    $("#caption").empty();
    $("#caption").append(`Showing ` + modules.length + ` Results`);
    for (let index = 0; index < modules.length; index++) {
        const module = modules[index];
        $(".module-list").append(`
        <tr class="border-bottom border-white module-`+ index + ` align-middle">
            <td>`+ module.mod_code + `</td>
            <td>`+ module.mod_name + `</td>
            <td class="text-end">
                <button class="btn btn-success view-module"type="button" data-id="`+ index + `" data-bs-toggle="modal" data-bs-target="#exam-modal">View</button>
            </td>
        </tr>`);
    }
};

async function generateModal(module_index) {
    $(".modal-information").empty()
    let section = $("#select-section option:selected").val();
    let modules = await getModulesBySection(section);
    let module = modules[module_index]
    let mod_code = module.mod_code
    let exam = await getExamByModule(mod_code, section);
    let exam_details = exam[0];
    let verifier_details;
    let external;
    let shared_paper;
    let shared_question;
    if (exam.length > 0) {
        verifier_details = exam_details.verifier_details;
        external = exam_details.external;
        shared_paper = exam_details.shared_paper;
        shared_question = exam_details.shared_question;
    }
    if (verifier_details == null || verifier_details == undefined) {
        verifier_details = ""
    }
    if (external == null || external == undefined) {
        external = ""
    }
    if (shared_paper == null || shared_paper == undefined) {
        shared_paper = ""
    }
    if (shared_question == null || shared_question == undefined) {
        shared_question = ""
    }

    $(".modal-information").append(`
        <!-- Content header -->
        <div class="modal-header">
            <h5 class="modal-title" id="teaching-assignment-modal">`+ module.mod_name + ` ` + module.mod_code + `</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
    
        <!-- Content -->
        <div class="modal-body">
            <!-- Module Information -->
            <div class="modal-section-title">Module Information</div>
            <div class="line2"></div>
            <!-- Table -->
            <div class = "overflow-hidden py-1">
                <div class="form-group row mt-4 mb-3">
                    <div class="row col-5 me-2">
                        <label for="select-module-type" class="col-sm-5 col-form-label col-form-label-sm">Type:</label>
                        <div class="col-sm-7">
                            <select id="select-module-type" class="form-select form-select-sm exam-input">
                                <option value="">Select Type</option>
                                <option value="ica-term-test">ICA WITH TERM TEST</option>
                                <option value="ica-no-test">ICA WITH NO TEST</option>
                                <option value="exam">EXAM</option>
                            </select>
                        </div>
                    </div>
                    <div class="row col-5 ms-2">
                        <label for="select-mcl" class="col-sm-5 col-form-label col-form-label-sm">Module MCL:</label>
                        <div class="col-sm-7">
                            <select id="select-mcl" class="form-select form-select-sm exam-input">
                                <option value="">Select Module MCL</option>
                            </select>
                        </div>
                    </div>
                </div>


                <div class="form-group row mt-3 mb-5">
                    <div class="row col-5 me-2">
                        <label for="select-co-examiner" class="col-sm-5 col-form-label col-form-label-sm">Offered to:</label>
                        <div class="col-sm-7">
                            `+ module.fk_course_id + ` ` + module.mod_stage + `
                        </div>
                    </div>

            
                </div>
            
                
                <div class="form-group row mt-5 mb-3">
                    <div class="row col-5 me-2">
                        <label for="select-chief-examiner" class="col-sm-5 col-form-label col-form-label-sm">Chief Examiner:</label>
                        <div class="col-sm-7">
                            <select id="select-chief-examiner" class="form-select form-select-sm exam-input">
                                <option value="">Select Chief Examiner</option>
                            </select>
                        </div>
                    </div>

                    <div class="row col-5 ms-2">
                        <label for="select-mdeo-marker" class="col-sm-5 col-form-label col-form-label-sm">MDEO & Marker:</label>
                        <div class="col-sm-7">
                            <select id="select-mdeo-marker" class="form-select form-select-sm exam-input">
                                <option value="">Select MDEO & Marker</option>
                            </select>
                        </div>
                    </div>
                </div>


                <div class="form-group row mt-3 mb-5">
                    <div class="row col-5 me-2">
                        <label for="select-co-examiner" class="col-sm-5 col-form-label col-form-label-sm">Co-Examiner (optional):</label>
                        <div class="col-sm-7">
                            <select id="select-co-examiner" class="form-select form-select-sm exam-input">
                                <option value="">Select Co-Examiner</option>
                            </select>
                        </div>
                    </div>
            
                    <div class="row col-5 ms-2">
                        <label for="select-marker" class="col-sm-5 col-form-label col-form-label-sm">Marker (optional):</label>
                        <div class="col-sm-7">
                            <select id="select-marker" class="form-select form-select-sm exam-input">
                                <option value="">Select Marker</option>
                            </select>
                        </div>
                    </div>
                </div>


                <div class="form-group row mt-5 mb-3">
                    <div class="row col-5 me-2">
                        <label for="select-moderator" class="col-sm-5 col-form-label col-form-label-sm">Moderator:</label>
                        <div class="col-sm-7">
                            <select id="select-moderator" class="form-select form-select-sm exam-input">
                                <option value="">Select Moderator</option>
                            </select>
                        </div>
                    </div>
            
                    <div class="row col-5 ms-2">
                        <label for="select-verifier" class="col-sm-5 col-form-label col-form-label-sm">Verifier:</label>
                        <div class="col-sm-7">
                            <select id="select-verifier" class="form-select form-select-sm exam-input">
                                <option value="">Select Verifier</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="form-group row my-3">
                    <div class="row col-5 me-2">
                        <label for="input-external" class="col-sm-5 col-form-label col-form-label-sm">External Moderation:</label>
                        <div class="col-sm-7">
                            <input type="text" value="` + external + `" class="form-control form-control-sm" id="input-external">
                        </div>
                    </div>
            
                    <div class="row col-5 ms-2">
                        <label for="input-verifier-details" class="col-sm-5 col-form-label col-form-label-sm">Verifier Details:</label>
                        <div class="col-sm-7">
                            <input type="text" value="` + verifier_details + `" class="form-control form-control-sm" id="input-verifier-details">
                        </div>
                    </div>
                </div>


                <div class="form-group row my-3">
                    <div class="row col-5 me-2">

                    </div>
            
                    <div class="row col-5 ms-2">
                        <label for="select-mark-moderator" class="col-sm-5 col-form-label col-form-label-sm">Marks Moderator:</label>
                        <div class="col-sm-7">
                            <select id="select-mark-moderator" class="form-select form-select-sm exam-input">
                                <option value="">Select Marks Moderator</option>
                            </select>
                        </div>
                    </div>
            
                </div>


                <div class="form-group row mt-5 mb-3">
                    <div class="row col-5 me-2">
                        <label for="input-shared-paper" class="col-sm-5 col-form-label col-form-label-sm">Shared Paper With:</label>
                        <div class="col-sm-7">
                            <input type="text" value="` + shared_paper + `" class="form-control form-control-sm" id="input-shared-paper">
                        </div>
                    </div>
            
                    <div class="row col-5 ms-2">
                        <label for="input-shared-question" class="col-sm-5 col-form-label col-form-label-sm">Shared Questions With:</label>
                        <div class="col-sm-7">
                            <input type="text" value="` + shared_question + `" class="form-control form-control-sm" id="input-shared-question">
                        </div>
                    </div>
                </div>

                <div class = "row py-1">
                    <div class = "col warning-message" id="module-warning">
                        
                    </div>
                    <div class = "col">
                        <!-- Update Button -->
                        <button type="button" class="btn btn-primary float-end exam-changes" data-code="`+ mod_code + `" data-index="` + module_index + `">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>`);
    if (exam.length > 0) {
        let staff_list = await getAllStaff();
        for (let index = 0; index < staff_list.length; index++) {
            const staff = staff_list[index];
            let staff_id = staff.staff_id
            let staff_name = staff.staff_name
            // CHIEF EXAMINER
            if (exam_details.chief_examiner == staff_id) {
                $("#select-chief-examiner").append(`<option selected value="` + staff_id + `">` + staff_name + ` (` + staff_id + `)</option>`)
            }
            else {
                $("#select-chief-examiner").append(`<option value="` + staff_id + `" >` + staff_name + ` (` + staff_id + `)</option>`)
            }
    
            // MDEO & MARKER
            if (exam_details.mdeo_marker == staff_id) {
                $("#select-mdeo-marker").append(`<option selected value="` + staff_id + `">` + staff_name + ` (` + staff_id + `)</option>`)
            }
            else {
                $("#select-mdeo-marker").append(`<option value="` + staff_id + `" >` + staff_name + ` (` + staff_id + `)</option>`)
            }
    
            // CO EXAMINER
            if (exam_details.co_examiner == staff_id) {
                $("#select-co-examiner").append(`<option selected value="` + staff_id + `">` + staff_name + ` (` + staff_id + `)</option>`)
            }
            else {
                $("#select-co-examiner").append(`<option value="` + staff_id + `" >` + staff_name + ` (` + staff_id + `)</option>`)
            }
    
            // MARKER
            if (exam_details.co_marker == staff_id) {
                $("#select-marker").append(`<option selected value="` + staff_id + `">` + staff_name + ` (` + staff_id + `)</option>`)
            }
            else {
                $("#select-marker").append(`<option value="` + staff_id + `" >` + staff_name + ` (` + staff_id + `)</option>`)
            }
    
            // MODERATOR
            if (exam_details.moderator == staff_id) {
                $("#select-moderator").append(`<option selected value="` + staff_id + `">` + staff_name + ` (` + staff_id + `)</option>`)
            }
            else {
                $("#select-moderator").append(`<option value="` + staff_id + `" >` + staff_name + ` (` + staff_id + `)</option>`)
            }
    
            // VERIFIER
            if (exam_details.verifier == staff_id) {
                $("#select-verifier").append(`<option selected value="` + staff_id + `">` + staff_name + ` (` + staff_id + `)</option>`)
            }
            else {
                $("#select-verifier").append(`<option value="` + staff_id + `" >` + staff_name + ` (` + staff_id + `)</option>`)
            }
    
            // MARKS MODERATOR
            if (exam_details.markers_moderator == staff_id) {
                $("#select-mark-moderator").append(`<option selected value="` + staff_id + `">` + staff_name + ` (` + staff_id + `)</option>`)
            }
            else {
                $("#select-mark-moderator").append(`<option value="` + staff_id + `" >` + staff_name + ` (` + staff_id + `)</option>`)
            }
    
            // MODULE MCL
            if (exam_details.module_mcl == staff_id) {
                $("#select-mcl").append(`<option selected value="` + staff_id + `">` + staff_name + ` (` + staff_id + `)</option>`)
            }
            else {
                $("#select-mcl").append(`<option value="` + staff_id + `" >` + staff_name + ` (` + staff_id + `)</option>`)
            }
        }
        $("#select-module-type option[value="+ exam_details.type_of_module +"]").attr("selected","selected")
    }
    else {
        let staff_list = await getAllStaff();
        for (let index = 0; index < staff_list.length; index++) {
            const staff = staff_list[index];
            let staff_id = staff.staff_id
            let staff_name = staff.staff_name
            // CHIEF EXAMINER
            $("#select-chief-examiner").append(`<option value="` + staff_id + `" >` + staff_name + ` (` + staff_id + `)</option>`)
            
    
            // MDEO & MARKER
            $("#select-mdeo-marker").append(`<option value="` + staff_id + `" >` + staff_name + ` (` + staff_id + `)</option>`)

    
            // CO EXAMINER
            $("#select-co-examiner").append(`<option value="` + staff_id + `" >` + staff_name + ` (` + staff_id + `)</option>`)
    
            // MARKER
            $("#select-marker").append(`<option value="` + staff_id + `" >` + staff_name + ` (` + staff_id + `)</option>`)
    
            // MODERATOR
            $("#select-moderator").append(`<option value="` + staff_id + `" >` + staff_name + ` (` + staff_id + `)</option>`)
    
            // VERIFIER
            $("#select-verifier").append(`<option value="` + staff_id + `" >` + staff_name + ` (` + staff_id + `)</option>`)
            
            // MARKS MODERATOR
            $("#select-mark-moderator").append(`<option value="` + staff_id + `" >` + staff_name + ` (` + staff_id + `)</option>`)
    
            // MODULE MCL
            $("#select-mcl").append(`<option value="` + staff_id + `" >` + staff_name + ` (` + staff_id + `)</option>`)
            
        }
    }
}

async function submitChanges(mod_code) {
    let section = $("#select-section option:selected").val();
    let exam = await getExamByModule(mod_code, section);
    if (exam.length == 0) {
        await createExam(mod_code);
    }
    else {
        await updateExam(mod_code);
    }
}


$(document).ready(() => {

    
    generateSection()

    $("#select-section").on('change', () => {
        generateModuleList();
    });

    $(".module-list").on('click', ".view-module", (e) => {
        let index = $(e.target).data("id");
        generateModal(index);
    })

    $("#exam-modal").on('change', ".exam-input", () => {
        $("#module-warning").empty();
        $("#module-warning").append(`<p>Changes Not Saved!</p>`);
    })

    $("#exam-modal").on('click', ".exam-changes", (e) => {
        let mod_code = $(e.target).data("code");
        let module_index = $(e.target).data("index");
        submitChanges(mod_code)
            .then(() => {
                generateModal(module_index)
            });
    })
})
