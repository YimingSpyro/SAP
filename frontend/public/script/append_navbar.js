

var role_id = sessionStorage.getItem('staff_role');
role_id = JSON.parse(role_id)
var html = ""
var dashboardHtml = "";
var navbarAppended = false;
var dashboardAppended = false;

$(document).ready(()=>{
    $('#navbar-wrap').load("/shared_views/navbar_profile.html", ()=>{
        var staff_name = sessionStorage.getItem('staff_name')
        $('#staff-name-text').text(staff_name);
        var staff_role = sessionStorage.getItem('staff_role_name')
        $('#welcome-text').text(`Welcome ${staff_role},`);
    })
    /* $('#dashboard-view-wrap').load('homeviews/admin_home.html') */
 /*    $('#dashboard-view-wrap').load("/homeviews/admin_home.html")   */  
 /* const htmlArray = [`<div class="col-sm-6 col-lg-4 mb-4">
 <div class="card">
   <svg class="bd-placeholder-img card-img-top" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>
   <div class="card-body">
     <h5 class="card-title">Card title that wraps to a new line</h5>
     <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
   </div>
 </div>
</div>`,`<div class="col-sm-6 col-lg-4 mb-4">
<div class="card p-3">
  <figure class="p-3 mb-0">
    <blockquote class="blockquote">
      <p>A well-known quote, contained in a blockquote element.</p>
    </blockquote>
    <figcaption class="blockquote-footer mb-0 text-muted">
      Someone famous in <cite title="Source Title">Source Title</cite>
    </figcaption>
  </figure>
</div>
</div>`,`<div class="col-sm-6 col-lg-4 mb-4">
<div class="card">
  <svg class="bd-placeholder-img card-img-top" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>

  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>
</div>
</div>`,`<div class="col-sm-6 col-lg-4 mb-4">
<div class="card bg-primary text-white text-center p-3">
  <figure class="mb-0">
    <blockquote class="blockquote">
      <p>A well-known quote, contained in a blockquote element.</p>
    </blockquote>
    <figcaption class="blockquote-footer mb-0 text-white">
      Someone famous in <cite title="Source Title">Source Title</cite>
    </figcaption>
  </figure>
</div>
</div>`,`<div class="col-sm-6 col-lg-4 mb-4">
<div class="card text-center">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">This card has a regular title and short paragraph of text below it.</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>
</div>
</div>`,`<div class="col-sm-6 col-lg-4 mb-4">
<div class="card bg-primary text-white text-center p-3">
  <figure class="mb-0">
    <blockquote class="blockquote">
      <p>A well-known quote, contained in a blockquote element.</p>
    </blockquote>
    <figcaption class="blockquote-footer mb-0 text-white">
      Someone famous in <cite title="Source Title">Source Title</cite>
    </figcaption>
  </figure>
</div>
</div>`,`<div class="col-sm-6 col-lg-4 mb-4">
<div class="card text-center">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">This card has a regular title and short paragraph of text below it.</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>
</div>
</div>`,`<div class="col-sm-6 col-lg-4 mb-4">
<div class="card">
  <svg class="bd-placeholder-img card-img" width="100%" height="260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Card image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Card image</text></svg>

</div>
</div>`,`<div class="col-sm-6 col-lg-4 mb-4">
<div class="card p-3 text-end">
  <figure class="mb-0">
    <blockquote class="blockquote">
      <p>A well-known quote, contained in a blockquote element.</p>
    </blockquote>
    <figcaption class="blockquote-footer mb-0 text-muted">
      Someone famous in <cite title="Source Title">Source Title</cite>
    </figcaption>
  </figure>
</div>
</div>`,`<div class="col-sm-6 col-lg-4 mb-4">
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">This is another card with title and supporting text below. This card has some additional content to make it slightly taller overall.</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>
</div>
</div>`]
for(const i in htmlArray){
    $('#dashboard-view-inner-wrap').append(htmlArray[i])
} */
    if (!sessionStorage.getItem("navBar&DashboardAppended")){
        axios.get(base_url+"/api/nav-items").then((response) => {
            var rows = response.data
            var allNavItems = []
            var staffNavItemsArrayId = []
            for (let i = 0; i < rows.length; i++) {
                allNavItems.push(rows[i])
                var roleIdsArrayForItem = [];
                roleIdsArrayForItem = (JSON.parse(rows[i].role_ids))
                for(let j = 0;j<role_id.length;j++){
                    if (roleIdsArrayForItem.includes(parseInt(role_id[j]))) {
                        if(!staffNavItemsArrayId.includes(rows[i].item_id)){
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
            sessionStorage.setItem("navBarContent",html)
        }).catch((e) => {
            sessionStorage.clear();
            throw e
        })
        axios.get(base_url+"/api/dashboard-items").then((response) => {
            var rows = response.data
            console.log(rows);
            var allDashboardItems = []
            var staffDashboardItemsArrayId = []
            for (let i = 0; i < rows.length; i++) {
                allDashboardItems.push(rows[i])
                var roleIdsArrayForItem = [];
                roleIdsArrayForItem = (JSON.parse(rows[i].d_role_ids))
                for(let j = 0;j<role_id.length;j++){
                    if (roleIdsArrayForItem.includes(parseInt(role_id[j]))) {
                      if(!staffDashboardItemsArrayId.includes(rows[i].d_item_html)){
                          staffDashboardItemsArrayId.push(rows[i].d_item_html);
                          console.log(rows[i].d_item_html);
                          dashboardHtml += rows[i].d_item_html
                      }
                    }
                }
                console.log(dashboardHtml);
            }

            $('#dashboard-view-inner-wrap div.row').append(dashboardHtml);
            dashboardAppended = true;
            console.log(dashboardAppended&&navbarAppended);
            if(dashboardAppended&&navbarAppended) sessionStorage.setItem("navBar&DashboardAppended",true)
            sessionStorage.setItem("dashboardContent",dashboardHtml)
        }).catch((e)=>{
            console.log(e)
        })
    }else{
        $('#main-list').append(  sessionStorage.getItem("navBarContent"));
        $('#dashboard-view-inner-wrap div.row').append(sessionStorage.getItem("dashboardContent"))
        console.log(sessionStorage.getItem("dashboardContent"));
        console.log("appeneding");
    }
})


