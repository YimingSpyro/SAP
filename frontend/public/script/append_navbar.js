

var role_id = sessionStorage.getItem('staff_role');
role_id = JSON.parse(role_id)
var html = ""
var dashboardHtml = "";
var navbarAppended = false;
var dashboardAppended = false;
var coord_id = sessionStorage.getItem('staff_id');
async function _appendMCModules() {
  const regMC = /Module Coordinator/
  const mc_modules = await axios.get(base_url + '/api/mod-coord/dashboard-modules?mod_coord=' + coord_id, { withCredentials: true }).then((response) => { return response.data }).catch((error) => { console.log(error) });
  const title = $(".dashboard-item-title").text()
  if (regMC.test(title)) { //if the page is module coordinator
    let list_item = `<div class="">
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
    $(".dashboard-item-mc").prepend(list_item)
    mc_modules.forEach(element => {
      let table_row = `<tr>
      <td class = "text-wrap">${element["mod_code"]} ${element.fk_course_id}: ${element.mod_name} (${element.mod_abbrv}) ${element.mod_stage}</td>
      `
      if (element["SUM(mod_workload.weightage)"] == 100) {
        table_row += `<td>Complete</td>
                      <td><a href="/module-coordinator/maintenance" class="badge badge-light">View</a></td>
                      </tr>`
      } else {
        table_row += `<td class="text-warning">Incomplete</td>
                      <td><a href="/module-coordinator/maintenance" class="button view-workload">View</a></td>
                      </tr>`
      }
      $("#dashboard-modules").append(table_row)
    });
  };


}
async function appendDashboard() {
  if (!sessionStorage.getItem("navBar&DashboardAppended")) {
    axios.get(base_url + "/api/nav-items").then((response) => {
      var rows = response.data
      var allNavItems = []
      var staffNavItemsArrayId = []
      for (let i = 0; i < rows.length; i++) {
        allNavItems.push(rows[i])
        var roleIdsArrayForItem = [];
        roleIdsArrayForItem = (JSON.parse(rows[i].role_ids))
        for (let j = 0; j < role_id.length; j++) {
          if (roleIdsArrayForItem.includes(parseInt(role_id[j]))) {
            if (!staffNavItemsArrayId.includes(rows[i].item_id)) {
              staffNavItemsArrayId.push(rows[i].item_id);
              html += rows[i].item_html
            }
            /* html += `
            <li id="maintenence-system">
            <a href="./maintenance" class="nav-link px-0 align-middle">
            <div style="width: 100%; display: table">
            <div style="display: table-row">
            <img src="${[rows[i].item_icon_url]}"" class="icons"></img>
            <div class="navbar-title">${rows[i].item_title}</div>
            </div>
            </div>
            </a>
            </li>
            ` */
            //console.log(rows[i].item_html);
          }
        }
      }

      $('#main-list').append(html);
      navbarAppended = true;
      sessionStorage.setItem("navBarContent", html)
    }).catch((e) => {
      sessionStorage.clear();
      throw e
    })
    axios.get(base_url + "/api/dashboard-items").then((response) => {
      var rows = response.data
      var allDashboardItems = []
      var staffDashboardItemsArrayId = []

      for (let i = 0; i < rows.length; i++) {
        allDashboardItems.push(rows[i])
        var roleIdsArrayForItem = [];
        roleIdsArrayForItem = (JSON.parse(rows[i].d_role_ids))
        for (let j = 0; j < role_id.length; j++) {
          if (roleIdsArrayForItem.includes(parseInt(role_id[j]))) {
            if (!staffDashboardItemsArrayId.includes(rows[i].d_item_html)) {
              staffDashboardItemsArrayId.push(rows[i].d_item_html);
              dashboardHtml += rows[i].d_item_html
            }
          }
        }
      }

      $('#dashboard-view-inner-wrap div.row').append(dashboardHtml);
      dashboardAppended = true;
      if (dashboardAppended && navbarAppended) sessionStorage.setItem("navBar&DashboardAppended", true)
      sessionStorage.setItem("dashboardContent", dashboardHtml)
    }).catch((e) => {
      error(e)
    })
  } else {
    $('#main-list').append(sessionStorage.getItem("navBarContent"));
    $('#dashboard-view-inner-wrap div.row').append(sessionStorage.getItem("dashboardContent"))
  }
}
async function generateDashboardItems() {
  await appendDashboard()
    .then(async ()=> {
      if (location.pathname == "/home") {
        // DASHBOARD ITEM CONTENT CODE GOES HERE
        let data = await getAssignedModulesDashboard();
        let total_hours = 0;
        for (let index = 0; index < data.length; index++) {
          const module = data[index];
          let hours = (module.ma_lecture * module.mod_lecture + module.ma_tutorial * module.mod_tutorial + module.ma_practical * module.mod_practical) / 15;
          total_hours += hours;
          $(".assigned-modules").append(`
          <tr>
              <td id="module-`+ index + `">` + module.mod_code + ` ` + module.fk_course_id + `: ` + module.mod_name + ` (` + module.mod_abbrv + `) Year ` + module.mod_stage + `</th>
              <td>`+ module.ma_lecture + `</td>
              <td>`+ module.ma_tutorial + `</td>
              <td>`+ module.ma_practical + `</td>
              <td>`+ hours.toFixed(1) + `</td>
          </tr>`);
          if (module.fk_mod_coord == sessionStorage.getItem('staff_id')) {
            $("#module-" + index).css("color", "orange");
          }
        }
        $(".total-hours").append(`
        <tr>
            <th>Total Hours: `+ total_hours + `</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
        </tr>`);
      }
    })
    .then(() => {
      _appendMCModules()
    })
}
function getAssignedModulesDashboard() {
  return axios.get(base_url + '/api/module/assign/' + sessionStorage.getItem('staff_id') + '?semester_code=' + sessionStorage.getItem('semester_code'))
    .then(response => response.data)
    .catch(err => error(err));
}
$(document).ready(() => {
  $('#navbar-wrap').load("/shared_views/navbar_profile.html", () => {
    var staff_name = sessionStorage.getItem('staff_name')
    $('#staff-name-text').text(staff_name);
  })
  generateDashboardItems();


})


