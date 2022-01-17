function getProfilePicture() {
    axios.get(base_url + '/uploads/profile-picture/1144').then((response) => {
        console.log(response.data[0].filename)
        document.getElementById("profile-icon").src = '/profile-picture/' + response.data[0].filename;
        if (document.getElementById("form-profile-icon") != null) {
            document.getElementById("form-profile-icon").src = '/profile-picture/' + response.data[0].filename;
        }
    });
}

getProfilePicture()
