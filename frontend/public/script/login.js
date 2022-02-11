if (sessionStorage.getItem('isLoggedIn')) {
    window.location.href = "/home"
}
function login(){
    var staff_id = $("#staff_id").val();
    var password = $("#password").val();
    if (!staff_id.trim()) {
        $("#error_message_content").text("Please fill in all the fields.")
        $("#error_message").css("display", "block");
        $("input#staff_id").focus()
    } else if (!password.trim()) {
        $("#error_message_content").text("Please fill in all the fields.")
        $("#error_message").css("display", "block");
        $("input#password").focus()
    } else {
        axios.post(base_url+'/api/login', {
            staff_id: staff_id,
            password: password
        }, { withCredentials: true }).then((response) => {
            console.log("respondeed");
            if (response.status == 200) {
                var data = (response.data.data)[0]
                sessionStorage.setItem('isLoggedIn', true)
                sessionStorage.setItem('staff_id', data.staff_id)
                console.log(data);

                if(data.roles.length>0){
                    var role_name_text = ''
                    var role_remarks_text = ''
                    var role_ids = [];
                    console.log("bruh");
                    for(let i = 0; i <data.roles.length;i++){
                        console.log(data.roles.length);
                        console.log(i);
                        var row = data.roles[i];
                        console.log(row);
                        if(i==0){
                            role_name_text = row.role_name;
                            role_remarks_text = row.remarks;
                        }else{
                            console.log("if");
                            role_name_text+="/"+row.role_name
                            role_remarks_text+=","+row.remarks
                        }
                        console.log(role_name_text);
                        role_ids.push(row.role_id)
                    }
                }
                sessionStorage.setItem('staff_name', data.staff_name)
                sessionStorage.setItem('staff_role', JSON.stringify(role_ids))
                sessionStorage.setItem('staff_role_name', role_name_text)
                window.location.href = "/home"
                /* const accessToken = response.data.accessToken;
                storeAccessTokenInLocalStorage(accessToken);*/
            }
        }).catch((e) => {
            console.log("bruh");
            console.log(e);
            $("#error_message_content").text('Invalid Login credientals, please try again.')
            $("#error_message").css("display", "block");
        });
    }
}

$(document).ready(() => {
    $("#submit-button").click((e) => {
        login();
    })
    $(document).on('keypress',function(e) {
        if(e.which == 13) {
            login();
        }
    });
})
