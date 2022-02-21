function getAssignedModules(){
    return axios.get(base_url + '/api/module/assign/' + sessionStorage.getItem('staff_id') + '?semester_code=' + sessionStorage.getItem('semester_code'))
    .then(response => response.data)
    .catch(err => error(err));
}

async function generateAssignedModules(){
    let data = await getAssignedModules();
    let total_hours = 0;
    for (let index = 0; index < data.length; index++) {
        const module = data[index];
        let hours = (module.ma_lecture * module.mod_lecture + module.ma_tutorial  * module.mod_tutorial + module.ma_practical  * module.mod_practical) / 15;
        total_hours += hours;
        $(".assigned-modules").append(`
        <tr>
            <td id="module-`+index+`">`+module.mod_code+` `+module.fk_course_id+`: `+module.mod_name+` (`+module.mod_abbrv+`) Year `+module.mod_stage+`</th>
            <td>`+module.ma_lecture+`</td>
            <td>`+module.ma_tutorial+`</td>
            <td>`+module.ma_practical+`</td>
            <td>`+hours.toFixed(1)+`</td>
        </tr>`);
        if (module.fk_mod_coord == sessionStorage.getItem('staff_id')) {
            $("#module-"+index).css("color","orange");
        }
    }
    $(".total-hours").append(`
    <tr>
        <th>Total Hours: `+total_hours+`</th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
    </tr>`);
}

$(document).ready(()=>{
    generateAssignedModules();
})
