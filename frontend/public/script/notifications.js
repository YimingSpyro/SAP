function error(err){
    $("#submit-requests-error").modal('show')
    $(".error-message").empty();
    if (err.response) {
        if (err.response.data.message) {
            $(".error-message").append(err.response.data.message);
        } 
        else {
            $(".error-message").append(err);
        }
        
    }
    else if(err.request) {
        $(".error-message").append(err, ". Client side error.");
    }
    else {
        $(".error-message").append(err);
    }

}

function success(type){
    let success_modal = '#submit-requests-success-' + type;
    if (type == null) {
        success_modal = '#submit-requests-success'
    }
    $(success_modal).modal('show')
}

function customMessage(message){
    if(message==null)message ="Submitted"
    $('#custom-message-title').text(message);
    var successModal = new bootstrap.Modal($('#custom-message-success'), 'focus');
    successModal.show();
    
}

function customConfirm(message, yesCallback, noCallback) {
    $('#custom-reconfirm-title').text(message);
    var successModal = new bootstrap.Modal($('#custom-reconfirm'), 'focus');
    successModal.show();
    $('#reconfirm-yes').click(function() {

        yesCallback();
    });
    $('#btnNo').click(function() {
        noCallback();
    });
}