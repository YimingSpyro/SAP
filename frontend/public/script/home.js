if (!sessionStorage.getItem("isLoggedIn")) window.location.href = "./login";
var coord_id = sessionStorage.getItem('staff_id');

async function _appendMCModules() {
    const regMC = /Module Coordinator/
    const mc_modules = await axios.get(base_url + '/api/mod-coord/dashboard-modules?mod_coord=' + coord_id, { withCredentials: true }).then((response) => { return response.data }).catch((error) => { console.log(error) });
    const title = $(".dashboard-item-title").text()
    if (regMC.test(title)) { //if the page is module coordinator
        let list_item = `<div class="list-item p-2 col">
        <p class="text-danger"> *Status refers to whether the module has reached 100% in component weightages</p>
        <table class = "table table-dark" id="dashboard-table-modules"> 
        <thead>
        <tr > 
        <th scope="col" class="col-8">Modules</th>
        <th scope="col">Status</th>
        <th scope="col"> </th>
        </tr>
        </thead>
        <tbody id ="dashboard-modules">
        </tbody>
        </table>
        </div>`
        $(".dashboard-item > .list-group > .list-item ").empty()
        $(".dashboard-item > .list-group > .list-item ").prepend(list_item)
        mc_modules.forEach(element => {
            let table_row = `<tr>
            <td class = "text-wrap">${element["mod_code"]} ${element.fk_course_id}: ${element.mod_name} (${element.mod_abbrv}) ${element.mod_stage}</td>
            `
            if (element["SUM(mod_workload.weightage)"] == 100) {
                table_row += `<td>Complete</td>
                            <td><a href="/module-coordinator/maintenance" class="badge badge-light">View</a></td>
                            </tr>`
            }else{
                table_row += `<td class="text-warning">Incomplete</td>
                            <td><a href="/module-coordinator/maintenance" class="button">View</a></td>
                            </tr>`
            }
            $("#dashboard-modules").append(table_row)
        });
    };


}

$(document).ready(function () {
    _appendMCModules()
})
/*     $(window).on('load', function () {
                                $('.maintenance-system-menu').click(function getMaintenenceSystem() {
                                    window.location.href="./maintenance-system"
                                })
                            }); */
