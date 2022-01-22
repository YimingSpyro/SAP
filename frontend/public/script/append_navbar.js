var role_id = sessionStorage.getItem('staff_role');
var html = ""

$(window).on('load',()=>{
    var staff_name = sessionStorage.getItem('staff_name')
    $('#staff-name-text').text(staff_name);
    var staff_role = sessionStorage.getItem('staff_role_name')
    $('#welcome-text').text(`Welcome ${staff_role},`);
})
$(document).ready(()=>{
    $('#navbar-wrap').load("/shared_views/navbar_profile.html")
    $('#dashboard-view-wrap').load("/homeviews/admin_home.html")
    if (!sessionStorage.getItem("navBarAppended")){
        axios.get("http://localhost:8080/api/nav-items").then((response) => {
            var rows = response.data
            for (let i = 0; i < rows.length; i++) {
                console.log(rows[i].item_title);
                var roleIdsArray = JSON.parse(rows[i].role_ids);
                console.log(roleIdsArray);
                console.log(role_id);
                if (roleIdsArray.includes(parseInt(role_id))) {
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
                    html += rows[i].item_html
                }
            }
            $('#main-list').append(html);
            sessionStorage.setItem("navBarAppended",true)
            sessionStorage.setItem("navBarContent",html)
        }).catch((e) => {
            console.log(e);
        })
    }else{
        $('#main-list').append(  sessionStorage.getItem("navBarContent"));
    }
})