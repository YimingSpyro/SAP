function getSemester() {
    return axios.get(base_url + '/api/semester/?status=active')
        .then(response => response.data[0])
        .catch(err => error(err));
};
async function setCurrentSemester(){
    let semester = await getSemester();
    let semester_code = semester.semester_code
    sessionStorage.setItem('semester_code',semester_code);
}
let base_url = "http://localhost:8080";


function getProfilePicture() {
    axios.get(base_url + '/uploads/profile-picture/1144').then((response) => {
        console.log(response.data[0].filename)
        document.getElementById("profile-icon").src = '/profile-picture/' + response.data[0].filename;
        if (document.getElementById("form-profile-icon") != null) {
            document.getElementById("form-profile-icon").src = '/profile-picture/' + response.data[0].filename;
        }
    });
}
setCurrentSemester()
getProfilePicture()
