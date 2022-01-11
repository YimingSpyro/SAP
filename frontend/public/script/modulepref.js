function getModules(){
    return axios.get('http://localhost:8080/api/module')
    .then(response => response.data)
    .catch(err => error(err));
};

async function generateModuleList(){
    let data = await getModules();
    console.log(data);
    for (let index = 0; index < data.length; index++) {
        const module = data[index];
        $("#content-item-left").append(`
        <p id="title">Section: `+module.fk_course_id+`</p>
        <table class="table table-dark">
            <thead>
                <tr>
                    <th scope="col" class="module-info">`+ module.mod_code +` `+ module.mod_name +`<br>`+ module.mod_abbrv +` (`+module.fk_course_id+`) `+module.year_offered+`/S</th>
                    <th scope="col">L</th>
                    <th scope="col">T</th>
                    <th scope="col">P</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Hours per week</th>
                        <td>`+module.mod_lecture.toFixed(1)+`</td>
                        <td>`+module.mod_lecture.toFixed(1)+`</td>
                        <td>`+module.mod_lecture.toFixed(1)+`</td>
                </tr>

            </tbody>

        </table>`);
        $(".choices").append(`<option>`+module.mod_code+`</option>`)
    }
};

generateModuleList();

$(document).ready(() => {


});