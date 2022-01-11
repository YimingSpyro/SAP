function getProfilePicture() {
    axios.get('http://localhost:8080/uploads/profile-picture/1144').then((response) => {
        console.log(response.data[0].filename)
        document.getElementById("profile-icon").src = '/profile-picture/' + response.data[0].filename;
        document.getElementById("form-profile-icon").src = '/profile-picture/' + response.data[0].filename;
    });
}

getProfilePicture()
