

var role_id = sessionStorage.getItem('staff_role');
role_id = JSON.parse(role_id)
var html = ""
var dashboardHtml = "";
var navbarAppended = false;
var dashboardAppended = false;
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
  
  appendDashboard()  
    .then(async () => {
      if (location.pathname=="/home") {
        let staff_role = JSON.parse(sessionStorage.getItem('staff_role'))
        // DASHBOARD ITEM CONTENT CODE GOES HERE
        if (staff_role.includes('2')) {
          $('.dashboard-item-lecturer').append(`
          <table class="table table-dark ">
          <thead>
              <tr>
                  <th scope="col">Classes</th>
                  <th scope="col">L</th>
                  <th scope="col">T</th>
                  <th scope="col">P</th>
                  <th scope="col">Hours</th>
              </tr>
          </thead>
          <tbody class="assigned-modules">
  
          </tbody>
          <thead class="total-hours">
  
          </thead>
        </table>
        `)
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
        if (staff_role.includes('4')) {
          $('.dashboard-item-mc').append(`
          <table class="table table-dark ">
          <thead>
              <tr>
                  <th scope="col">Classes</th>
                  <th scope="col">L</th>
                  <th scope="col">T</th>
                  <th scope="col">P</th>
                  <th scope="col">Hours</th>
              </tr>
          </thead>
          <tbody class="assigned-modules">
  
          </tbody>
          <thead class="total-hours">
  
          </thead>
        </table>
        `)
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
      }


    })

})


