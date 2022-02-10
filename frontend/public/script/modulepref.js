
$(document).ready(() => {
    $('#main-list>li').removeClass("active")
    $('#choose-module-preference').addClass("active")
})
function getModules(){
    return axios.get(base_url + '/api/module/sem' + '?semester_code=' + sessionStorage.getItem('semester_code'))
    .then(response => response.data)
    .catch(err => error(err));
};

function getPreference(){
    return axios.get(base_url + '/api/module/preference/' + sessionStorage.getItem('staff_id') + '?semester_code=' + sessionStorage.getItem('semester_code'))
    .then(response => response.data)
    .catch(err => error(err));
}

function uploadPreference(preference){
    return axios.post(base_url + '/api/module/preference', 
    {
        staff_id : sessionStorage.getItem('staff_id'), 
        semester_code : sessionStorage.getItem('semester_code'), 
        preference : preference
    })
    .then(() => success())
    .catch(err => error(err));
}

function updatePreference(preference){
    return axios.put(base_url + '/api/module/preference', 
    {
        staff_id : sessionStorage.getItem('staff_id'), 
        semester_code : sessionStorage.getItem('semester_code'),
        preference : preference
    })
    .then(() => success())
    .catch(err => error(err));
}

async function submitPreference(){
    let preference = [];
    let number_of_choices = 6
    for (let count = 1; count <= number_of_choices; count++) {
        let choice = $("#choice-"+count)[0].value;
        let mc_checked = $("#mc-"+count).is(':checked');
        if (choice == "Choose Module") {
            choice = null;
        }
        switch (mc_checked) {
            case true:
                choice = {
                    "module" : choice,
                    "module_coordinator" : true
                }
                break;
            default:
                choice = {
                    "module" : choice,
                    "module_coordinator" : false
                }
                break;
        }
        preference.push(choice);
    }
    preference = JSON.stringify(preference);
    
    let exists = await checkPreferenceExist();
    if (exists) {
        updatePreference(preference)
    }
    else {
        uploadPreference(preference)
    }
}

async function generateModuleList(){
    let data = await getModules();
    for (let index = 0; index < data.length; index++) {
        const module = data[index];
        $("#content-item-left").append(`
        <p id="title">Section: `+module.fk_course_id+`</p>
        <table class="table table-dark">
            <thead>
                <tr>
                    <th scope="col" class="module-info">`+ module.mod_code +` `+ module.mod_name +`<br>`+ module.mod_abbrv +` (`+module.fk_course_id+`) Year `+module.mod_stage+`</th>
                    <th scope="col">L</th>
                    <th scope="col">T</th>
                    <th scope="col">P</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Hours per week</th>
                        <td>`+(module.mod_lecture / 15).toFixed(1) +`</td>
                        <td>`+(module.mod_lecture / 15).toFixed(1) +`</td>
                        <td>`+(module.mod_lecture / 15).toFixed(1) +`</td>
                </tr>

            </tbody>

        </table>`);
        $(".choices").append(`<option value=`+module.mod_code+`>`+module.mod_code+`</option>`)
    }
};

async function checkPreferenceExist(){
    let data = await getPreference();
    if (data.length > 0) {
        return true;
    } 
    else {
        return false;
    }
}

async function generateExistingPreference(){
    let exists = await checkPreferenceExist();
    if (exists) {
        let data = await getPreference();
        data = JSON.parse(data[0].preference);
        for (let index = 0; index < data.length; index++) {
            const preference = data[index];
            let choice = index + 1;
            if (preference.module != null) {
                $("#choice-"+choice).val(preference.module)
            }
            if (preference.module_coordinator) {
                $("#mc-"+choice).prop('checked', true)
            }
        }
    }
}

generateModuleList()
.then(()=>generateExistingPreference());

$(document).ready(() => {
    $("#submit-preference").click(()=>{
        submitPreference();
    })
});