function getAnnouncement() {
    return axios.get(base_url + '/api/announcements')
        .then(response => response.data)
        .catch(err => error(err));
}

function createAnnouncement(roles) {
    return axios.post(base_url + '/api/announcements', {
        announcement_type: $("#announcement-type option:selected").val(),
        announcement_roles: roles,
        announcement_start: $("#start-date")[0].value,
        announcement_end: $("#end-date")[0].value,
        announcement_message: $("#message")[0].value,
        announcement_subject: $("#subject")[0].value
    })
        .then(() => {
            success("created")
            generateActiveAnnouncements()
        })
        .catch(err => error(err));
}
async function generateActiveAnnouncements() {
    $("#content-view-admin").empty();
    let announcements = await getAnnouncement();
    let roles = JSON.parse(sessionStorage.getItem("staff_role"));
    let assigned_role = null;
    $("#content-view-admin").prepend(`
    <!-- Content Header -->
    <div id="content-header-admin">
        <p>Active Announcements</p>
    </div>
    <!-- Content Item -->
    <div id="content-item-admin" class="active-announcements">
        <!-- Admin Announcement Bar -->

    </div>

    <!-- Content Header -->
    <div id="content-header-admin">
        <p>Old Announcements</p>
    </div>

    <div id="content-item-admin" class="old-announcements">

    </div>`)
    if (roles.includes("1")) {
        $("#content-view-admin").prepend(`
        <!-- Content Header -->
        <div id="content-header-admin">
            <p>Upcoming Announcements</p>
        </div>
        <!-- Content Item -->
        <div id="content-item-admin" class="upcoming-announcements">
            <!-- Admin Announcement Bar -->

        </div>`)
        $("#content-view-admin").append(`
        <!-- Content Header -->
        <div id="content-header-admin">
            <p>Create New Announcement</p>
        </div>

        <div id="content-view" class="container">

            <!-- Content Header -->
            <div id="content-header">
                <p>New Announcement</p>
            </div>

            <!-- Content Item -->
            <div id="content-item" class="create-announcement-section">

                <!-- ======== NOTE: Existing Staff Data should show in the placeholders  ========-->

                <!-- Form Item -->
                <div class="form-group row">
                    <label for="announcement-type" class="col-sm-3 col-form-label">Announcement
                        Type:</label>
                    <div class="col-sm">
                        <select class="form-select-sm" id="announcement-type">
                            <option value="Important">Important</option>
                            <option value="General">General Info</option>
                            <option value="Maintenance">Maintenance</option>
                        </select>
                    </div>
                </div>

                <!-- Form Item -->
                <div class="form-group row ">
                    <div class="col-sm-3">
                        <label for="lecturers" class="col-form-label ">Announcement To:</label>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="lecturers">
                            <label class="form-check-label" for="lecturers">
                                Lecturers
                            </label>
                        </div>

                        <div class="form-check">
                            <input class=" form-check-input " type="checkbox" value=" "
                                id="modulecoordinator">
                            <label class="form-check-label " for="modulecoordinator">
                                Module Coordinators
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input " type="checkbox" value=" " id="examrep">
                            <label class="form-check-label " for="examrep">
                                Exam Reps
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input " type="checkbox" value=" " id="adminsupport">
                            <label class="form-check-label " for="adminsupport">
                                Admin Support
                            </label>
                        </div>
                    </div>

                </div>

                <!-- Form Item -->
                <div class="form-group row">
                    <label for="start-date" class="col-sm-3 col-form-label">Announcement Period:</label>
                    <div class="col-sm-3">
                        <input type="date" class="form-control form-control-sm" id="start-date"
                            placeholder="Start Date">
                    </div>

                    <label for="end-date" class="col-sm-1 col-form-label">to</label>
                    <div class="col-sm-3">
                        <input type="date" class="form-control form-control-sm" id="end-date"
                            placeholder="End Date">
                    </div>
                </div>

                <!-- Form Item -->
                <div class="form-group row">
                    <label for="message" class="col-sm-3 col-form-label">Subject:</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control form-control-sm" id="subject"
                            placeholder="Subject"></input>
                    </div>
                </div>

                <!-- Form Item -->
                <div class="form-group row">
                    <label for="message" class="col-sm-3 col-form-label">Message:</label>
                    <div class="col-sm-8">
                        <textarea type="text" class="form-control form-control-sm" id="message" rows="3"
                            placeholder="Message"></textarea>
                    </div>
                </div>

                <!-- Update Button -->
                <button type="button" class="btn btn-primary float-end create-announcement">Create New
                    Announcement</button>
            </div>
        </div>`)
    }
    for (let index = 0; index < announcements.length; index++) {
        const announcement = announcements[index];
        let announcement_roles = JSON.parse(announcement.fk_announcement_roles)
        let announcement_start = new Date(announcement.announcement_start)
        let announcement_end = new Date(announcement.announcement_end)
        let current_date = new Date()

        // NEW Announcements
        if (current_date >= announcement_start && current_date <= announcement_end) {
            for (let index = 0; index < roles.length; index++) {
                const role = roles[index];
                if (announcement_roles.includes(parseInt(role)) || parseInt(role) == 1) {
                    assigned_role = true;
                }
            }
            if (assigned_role) {
                let announcement_to = "";
                for (let index = 0; index < announcement_roles.length; index++) {
                    const role = announcement_roles[index];
                    switch (role) {
                        case 2:
                            announcement_to += " Lecturer,"
                            break;
                        case 3:
                            announcement_to += " Exam-Rep,"
                            break;
                        case 4:
                            announcement_to += " Module-Coordinator,"
                            break;
                        case 5:
                            announcement_to += " Admin-Support,"
                            break;
                    }
                }
                announcement_to = announcement_to.slice(0, -1)
                $(".active-announcements").append(`
                <div id="announcement-bar-admin">
                    <!-- Actions -->
                    <div id="announcementactions" class="float-end align-items-center `+ announcement.announcement_type.toLowerCase() + `">
                        <div id="editannouncement">
                            <button class="btn btn-link edit-button">Edit</button>
                        </div>
                        <div id="deleteannouncement">
                            <button class="btn btn-link delete-button">Delete</button>
                        </div>
                    </div>
                    <!-- Contents -->
                    <div id="announcementcontent" class="`+ announcement.announcement_type.toLowerCase() + `">
                        <!-- Title -->
                        <div id="announcementtitle" class="float-start">
                            `+ announcement.announcement_subject + `
                        </div>
                        <!-- To -->
                        <div id="announcementto" class="text-end">
                            `+ announcement_to + `
                        </div>
                        <!-- Duration -->
                        <div id="announcementduration" class="text-end">
                        `+ announcement.announcement_start.slice(0, 10) + ` to ` + announcement.announcement_end.slice(0, 10) + `
                        </div>
                        <!-- Message -->
                        <div id="announcementmessage" class="mt-3">
                            `+ announcement.announcement_message + `
                        </div>
                    </div>
                </div>`)
            }
        }
        // OLD Announcements
        else if (current_date > announcement_end) {
            for (let index = 0; index < roles.length; index++) {
                const role = roles[index];
                if (announcement_roles.includes(parseInt(role)) || parseInt(role) == 1) {
                    assigned_role = true;
                }
            }
            if (assigned_role) {
                let announcement_to = "";
                for (let index = 0; index < announcement_roles.length; index++) {
                    const role = announcement_roles[index];
                    switch (role) {
                        case 2:
                            announcement_to += " Lecturer,"
                            break;
                        case 3:
                            announcement_to += " Exam-Rep,"
                            break;
                        case 4:
                            announcement_to += " Module-Coordinator,"
                            break;
                        case 5:
                            announcement_to += " Admin-Support,"
                            break;
                    }
                }
                announcement_to = announcement_to.slice(0, -1)
                $(".old-announcements").append(`
                <div id="announcement-bar-admin">
                    <!-- Actions -->
                    <div id="announcementactions" class="float-end align-items-center `+ announcement.announcement_type.toLowerCase() + `">
                        <div id="editannouncement">
                            <button class="btn btn-link edit-button">Edit</button>
                        </div>
                        <div id="deleteannouncement">
                            <button class="btn btn-link delete-button">Delete</button>
                        </div>
                    </div>
                    <!-- Contents -->
                    <div id="announcementcontent" class="`+ announcement.announcement_type.toLowerCase() + `">
                        <!-- Title -->
                        <div id="announcementtitle" class="float-start">
                            `+ announcement.announcement_subject + `
                        </div>
                        <!-- To -->
                        <div id="announcementto" class="text-end">
                            `+ announcement_to + `
                        </div>
                        <!-- Duration -->
                        <div id="announcementduration" class="text-end">
                        `+ announcement.announcement_start.slice(0, 10) + ` to ` + announcement.announcement_end.slice(0, 10) + `
                        </div>
                        <!-- Message -->
                        <div id="announcementmessage" class="mt-3">
                            `+ announcement.announcement_message + `
                        </div>
                    </div>
                </div>`)
            }
        }
        else {
            let announcement_to = "";
            for (let index = 0; index < announcement_roles.length; index++) {
                const role = announcement_roles[index];
                switch (role) {
                    case 2:
                        announcement_to += " Lecturer,"
                        break;
                    case 3:
                        announcement_to += " Exam-Rep,"
                        break;
                    case 4:
                        announcement_to += " Module-Coordinator,"
                        break;
                    case 5:
                        announcement_to += " Admin-Support,"
                        break;
                }
            }
            announcement_to = announcement_to.slice(0, -1)
            $(".upcoming-announcements").append(`
                <div id="announcement-bar-admin">
                    <!-- Actions -->
                    <div id="announcementactions" class="float-end align-items-center `+ announcement.announcement_type.toLowerCase() + `">
                        <div id="editannouncement">
                            <button class="btn btn-link edit-button">Edit</button>
                        </div>
                        <div id="deleteannouncement">
                            <button class="btn btn-link delete-button">Delete</button>
                        </div>
                    </div>
                    <!-- Contents -->
                    <div id="announcementcontent" class="`+ announcement.announcement_type.toLowerCase() + `">
                        <!-- Title -->
                        <div id="announcementtitle" class="float-start">
                            `+ announcement.announcement_subject + `
                        </div>
                        <!-- To -->
                        <div id="announcementto" class="text-end">
                            `+ announcement_to + `
                        </div>
                        <!-- Duration -->
                        <div id="announcementduration" class="text-end">
                        `+ announcement.announcement_start.slice(0, 10) + ` to ` + announcement.announcement_end.slice(0, 10) + `
                        </div>
                        <!-- Message -->
                        <div id="announcementmessage" class="mt-3">
                            `+ announcement.announcement_message + `
                        </div>
                    </div>
                </div>`)

        }
    }
    $(".active-announcements").append(`
    <!-- Show More -->
    <div id="showmore" class="d-flex justify-content-center">
        <div>
            Show More
        </div>
        <div class="triangle-down"></div>
    </div>`)
    $(".old-announcements").append(`
    <!-- Show More -->
    <div id="showmore" class="d-flex justify-content-center">
        <div>
            Show More
        </div>
        <div class="triangle-down"></div>
    </div>`)
}

async function submitCreateAnnouncement() {
    let roles = [];
    if ($("#lecturers").is(':checked')) {
        roles.push(2)
    }
    if ($("#examrep").is(':checked')) {
        roles.push(3)
    }
    if ($("#modulecoordinator").is(':checked')) {
        roles.push(4)
    }
    if ($("#adminsupport").is(':checked')) {
        roles.push(5)
    }
    roles = JSON.stringify(roles)
    await createAnnouncement(roles)
        .then(() => {
            $(".create-announcement-section").empty();
            $(".create-announcement-section").append(`
        <!-- Form Item -->
        <div class="form-group row">
            <label for="announcement-type" class="col-sm-3 col-form-label">Announcement
                Type:</label>
            <div class="col-sm">
                <select class="form-select-sm" id="announcement-type">
                    <option value="Important">Important</option>
                    <option value="General">General Info</option>
                    <option value="Maintenance">Maintenance</option>
                </select>
            </div>
        </div>

        <!-- Form Item -->
        <div class="form-group row ">
            <div class="col-sm-3">
                <label for="lecturers" class="col-form-label ">Announcement To:</label>
            </div>
            <div class="col">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="lecturers">
                    <label class="form-check-label" for="lecturers">
                        Lecturers
                    </label>
                </div>

                <div class="form-check">
                    <input class=" form-check-input " type="checkbox" value=" "
                        id="modulecoordinator">
                    <label class="form-check-label " for="modulecoordinator">
                        Module Coordinators
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input " type="checkbox" value=" " id="examrep">
                    <label class="form-check-label " for="examrep">
                        Examp Reps
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input " type="checkbox" value=" " id="adminsupport">
                    <label class="form-check-label " for="adminsupport">
                        Admin Support
                    </label>
                </div>
            </div>

        </div>

        <!-- Form Item -->
        <div class="form-group row">
            <label for="start-date" class="col-sm-3 col-form-label">Announcement Period:</label>
            <div class="col-sm-3">
                <input type="date" class="form-control form-control-sm" id="start-date"
                    placeholder="Start Date">
            </div>

            <label for="end-date" class="col-sm-1 col-form-label">to</label>
            <div class="col-sm-3">
                <input type="date" class="form-control form-control-sm" id="end-date"
                    placeholder="End Date">
            </div>
        </div>

        <!-- Form Item -->
        <div class="form-group row">
            <label for="message" class="col-sm-3 col-form-label">Subject:</label>
            <div class="col-sm-8">
                <input type="text" class="form-control form-control-sm" id="subject"
                    placeholder="Subject"></input>
            </div>
        </div>

        <!-- Form Item -->
        <div class="form-group row">
            <label for="message" class="col-sm-3 col-form-label">Message:</label>
            <div class="col-sm-8">
                <textarea type="text" class="form-control form-control-sm" id="message" rows="3"
                    placeholder="Message"></textarea>
            </div>
        </div>

        <!-- Update Button -->
        <button type="button" class="btn btn-primary float-end create-announcement">Create New Announcement</button>`)
        })
}

$(document).ready(() => {
    generateActiveAnnouncements();
    $("#content-view-admin").on('click', ".create-announcement", () => {
        submitCreateAnnouncement();
    })
})