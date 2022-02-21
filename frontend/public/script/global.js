var pathname = window.location.pathname;
if(pathname=='/'){
}else if (!sessionStorage.getItem("isLoggedIn")) window.location.href = "/"
function getSemester() {
    return axios.get(base_url + '/api/semester/?status=active')
        .then(response => response.data[0])
        .catch(err => error(err));
};
function getNavAnnouncement() {
    return axios.get(base_url + '/api/announcements?order=ASC')
        .then(response => response.data)
        .catch(err => error(err));
}
async function setCurrentSemester() {
    let semester = await getSemester();
    let semester_code = semester.semester_code
    sessionStorage.setItem('semester_code', semester_code);
}

async function generateNavAnnouncements() {
    $("#notification-bell").empty();
    let announcements = await getNavAnnouncement();
    let roles = JSON.parse(sessionStorage.getItem("staff_role"));
    let assigned_role = false;
    for (let index = 0; index < announcements.length; index++) {
        const announcement = announcements[index];
        let announcement_roles = JSON.parse(announcement.fk_announcement_roles)
        let announcement_start = new Date(announcement.announcement_start.slice(0, 10) + "T24:00:00")
        let announcement_end = new Date(announcement.announcement_end.slice(0, 10) + "T24:00:00")
        let current_date = new Date()
        if (current_date >= announcement_start && current_date <= announcement_end) {
            for (let index = 0; index < roles.length; index++) {
                const role = roles[index];
                if (announcement_roles.includes(parseInt(role)) || parseInt(role) == 1) {
                    assigned_role = true;
                }
            }
            if (assigned_role) {
                $("#notification-bell").append(`
                <div class="card card-body `+ announcement.announcement_type.toLowerCase() + `" id="announcementcontent">
                <a href="/announcements">
                    <div id="announcementtitle">
                    `+ announcement.announcement_subject + `
                    </div>
                    <div id="announcementmessage">
                    `+ announcement.announcement_message + `
                    </div>
                </a>
                </div>`)
            }
        }
    }
    if (!assigned_role) {
        $("#notification-bell").append(`
        <div class="card card-body general" id="announcementcontent">
        <a href="/announcements">
            <div id="announcementtitle">
                No New Announcements
            </div>
            <div id="announcementmessage">
                Check Back Later
            </div>
        </a>
        </div>`)
    }
}

//Live URL
let base_url = "https://soctas2021.irc.sg:8080";

//Localhost Dev URL
/* let base_url = "https://localhost:8080"; */


function getProfilePicture() {
    axios.get(base_url + '/api/uploads/profile-picture/1144').then((response) => {
        console.log(response.data[0].filename)
        document.getElementById("profile-icon").src = '/profile-picture/' + response.data[0].filename;
        if (document.getElementById("form-profile-icon") != null) {
            document.getElementById("form-profile-icon").src = '/profile-picture/' + response.data[0].filename;
        }
    });
}

$(document).ready(() => {
    setCurrentSemester()
    getProfilePicture()
    generateNavAnnouncements();
})

