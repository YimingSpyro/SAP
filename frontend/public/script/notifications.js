function error(err){
    var errorModal = new bootstrap.Modal($('#submit-requests-error'), 'focus');
    errorModal.show()
    console.log(err);
}

function success(){
    var successModal = new bootstrap.Modal($('#submit-requests-success'), 'focus');
    successModal.show();
}