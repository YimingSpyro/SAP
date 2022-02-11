$(document).ready(() => {
    $('#main-list>li').removeClass("active")
    $('#change-password').addClass("active")
    $("#submit-button").click((e) => {
        console.log("clicked");
        var old_password = $("#old-password").val();
        var new_password = $("#new-password").val();
        var re_new_password = $("#re-new-password").val();
        if (!old_password.trim()) {
            error("Fill in the fields")
            $("input#old-password").focus()
        } else if (!new_password.trim() || !re_new_password.trim()) {
            error("Fill in the fields")
            $("input#new-password").focus()
            $("input#re-new-password").focus()
        } else {
            axios.post(base_url+'/api/change-password', {
                old_password: old_password,
                new_password: new_password,
                re_new_password: re_new_password
            }, { withCredentials: true }).then((response) => {
                if (response.status == 200) {
                    success()
                }
            }).catch((e) => {
                error(e);
            });
        }
    })
})