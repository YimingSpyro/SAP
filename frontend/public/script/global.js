let base_url = "http://localhost:8080";
localStorage.setItem('semester_code','AY 2021/2022 SEM2');

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
