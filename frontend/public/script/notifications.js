function error(err){
    var errorModal = new bootstrap.Modal($('#submit-requests-error'), 'focus');
    errorModal.show()
    console.log(err);
}

function success(){
    var successModal = new bootstrap.Modal($('#submit-requests-success'), 'focus');
    successModal.show();
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