

var role_id = sessionStorage.getItem('staff_role');
role_id = JSON.parse(role_id)
var html = ""


$(document).ready(()=>{
    $('#navbar-wrap').load("/shared_views/navbar_profile.html", ()=>{
        var staff_name = sessionStorage.getItem('staff_name')
        $('#staff-name-text').text(staff_name);
        var staff_role = sessionStorage.getItem('staff_role_name')
        $('#welcome-text').text(`Welcome ${staff_role},`);
    })
 /*    $('#dashboard-view-wrap').load("/homeviews/admin_home.html")   */  
 const htmlArray = [`<div class="col-sm-6 col-lg-4 mb-4">
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
</div>`]
for(const i in htmlArray){
    $('#dashboard-view-inner-wrap').append(htmlArray[i])
}
    if (!sessionStorage.getItem("navBarAppended")){
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
            sessionStorage.setItem("navBarAppended",true)
            sessionStorage.setItem("navBarContent",html)
        }).catch((e) => {
            throw e
        })
    }else{
        $('#main-list').append(  sessionStorage.getItem("navBarContent"));
    }
})


