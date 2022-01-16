function error(err){
    $("#submit-requests-error").modal('show')
    $(".error-message").empty();
    if (err.response) {
        $(".error-message").append(err.response.data.message);
    }
    else if(err.request) {
        $(".error-message").append(err, ". Client side error.");
    }
    else {
        $(".error-message").append(err.message);
    }

}

function success(type){
    let success_modal = '#submit-requests-success-' + type;
    if (type == null) {
        success_modal = '#submit-requests-success'
    }
    $(success_modal).modal('show')
}