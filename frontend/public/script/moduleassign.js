function getAssignedModules(){
    return axios.get(base_url + '/api/module/assign/8405')//SAMPLE DATA
    .then(response => response.data)
    .catch(err => error(err));
}

async function generateAssignedModules(){
    let data = await getAssignedModules();
    let total_hours = 0;
    for (let index = 0; index < data.length; index++) {
        const module = data[index];
        let hours = module.ma_lecture + module.ma_tutorial + module.ma_practical;
        total_hours += hours;
        $(".assigned-modules").append(`
        <tr>
            <td id="module-`+index+`">`+module.mod_code+` `+module.fk_course_id+`: `+module.mod_name+` (`+module.mod_abbrv+`) YR `+module.mod_stage+`</th>
            <td>`+module.ma_lecture.toFixed(1)+`</td>
            <td>`+module.ma_tutorial.toFixed(1)+`</td>
            <td>`+module.ma_practical.toFixed(1)+`</td>
            <td>`+hours.toFixed(1)+`</td>
        </tr>`);
        //SAMPLE DATA USED HERE PLEASE UPDATE TO USE COOKIE STAFF_ID
        if (parseInt(module.fk_mod_coord) == 8405) {
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

generateAssignedModules();