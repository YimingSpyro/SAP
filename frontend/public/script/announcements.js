function getAnnouncement(order) {
    return axios.get(base_url + '/api/announcements?order=' + order)
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
            generateAnnouncements()
        })
        .catch(err => error(err));
}

function updateAnnouncement(roles, announcement_id) {
    return axios.put(base_url + '/api/announcements', {
        announcement_id : announcement_id,
        announcement_type: $("#announcement-type-update option:selected").val(),
        announcement_roles: roles,
        announcement_start: $("#start-date-update")[0].value,
        announcement_end: $("#end-date-update")[0].value,
        announcement_message: $("#message-update")[0].value,
        announcement_subject: $("#subject-update")[0].value
    })
        .then(() => {
            success("updated")
            generateAnnouncements()
        })
        .catch(err => error(err));
}

function deleteAnnouncement(announcement_id){
    return axios.delete(base_url + '/api/announcements?announcement_id=' + announcement_id)
        .then(()=>{
            success("deleted");
            generateAnnouncements();
        })
        .catch(err => error(err));
}
async function generateAnnouncements() {
    $("#content-view-admin").empty();
    let asc = "ASC"
    let dsc = "DESC"
    let announcements = await getAnnouncement(asc);
    let roles = JSON.parse(sessionStorage.getItem("staff_role"));
    let assigned_role = null;
    let old_count = 0;
    let start_month,end_month,start_date,end_date;
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
    // NEW AND UPCOMING
    for (let index = 0; index < announcements.length; index++) {
        const announcement = announcements[index];
        let announcement_roles = JSON.parse(announcement.fk_announcement_roles)
        let announcement_start = new Date(announcement.announcement_start.slice(0,10) + "T24:00:00")
        let announcement_end = new Date(announcement.announcement_end.slice(0,10) + "T24:00:00")
        let current_date = new Date()
        

        if (announcement_start.getMonth() + 1 >= 10) {
            start_month = (announcement_start.getMonth() + 1)
        }
        else {
            start_month = "0" + (announcement_start.getMonth() + 1)
        }

        if (announcement_end.getMonth() + 1 >= 10) {
            end_month = (announcement_end.getMonth() + 1)
        }
        else {
            end_month = "0" + (announcement_end.getMonth() + 1)
        }
        if (announcement_start.getDate() >= 10) {
            start_date = announcement_start.getDate()
        }
        else {
            start_date = "0" + announcement_start.getDate()
        }

        if (announcement_end.getDate() >= 10) {
            end_date = announcement_end.getDate()
        }
        else {
            end_date = "0" + announcement_end.getDate()
        }
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
                if (roles.includes("1")) {
                    $(".active-announcements").append(`
                    <div id="announcement-bar-admin">
                        <!-- Actions -->
                        <div id="announcementactions" class="float-end align-items-center `+ announcement.announcement_type.toLowerCase() + `">
                            <div id="editannouncement">
                                <button class="btn btn-link edit-button" data-order="ASC" data-index=`+ index +` data-bs-toggle="modal" data-bs-target="#edit-modal">Edit</button>
                            </div>
                            <div id="deleteannouncement">
                                <button class="btn btn-link delete-button" data-order="ASC" data-index=`+ index +` data-bs-toggle="modal" data-bs-target="#delete-announcement">Delete</button>
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


                            `+ start_date + `-` + start_month + `-`+ announcement_start.getFullYear() + ` to ` + end_date + `-` + end_month + `-` + announcement_end.getFullYear() + `

                            </div>
                            <!-- Message -->
                            <div id="announcementmessage" class="mt-3">
                                `+ announcement.announcement_message + `
                            </div>
                        </div>
                    </div>`)
                }
                else {
                    $(".active-announcements").append(`
                    <div id="announcement-bar-admin">
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

                            `+ start_date + `-` + start_month + `-`+ announcement_start.getFullYear() + ` to ` + end_date + `-` + end_month + `-` + announcement_end.getFullYear() + `

                            </div>
                            <!-- Message -->
                            <div id="announcementmessage" class="mt-3">
                                `+ announcement.announcement_message + `
                            </div>
                        </div>
                    </div>`)
                }

            }
        }
        // UPCOMING Announcements
        else if (current_date < announcement_start) {
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
                            <button class="btn btn-link edit-button" data-order="ASC" data-index=`+ index +` data-bs-toggle="modal" data-bs-target="#edit-modal">Edit</button>
                        </div>
                        <div id="deleteannouncement">
                            <button class="btn btn-link delete-button" data-order="ASC" data-index=`+ index +` data-bs-toggle="modal" data-bs-target="#delete-announcement">Delete</button>
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
                        `+ start_date + `-` + start_month + `-`+ announcement_start.getFullYear() + ` to ` + end_date + `-` + end_month + `-` + announcement_end.getFullYear() + `

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
    announcements = await getAnnouncement(dsc);
    for (let index = 0; index < announcements.length; index++) {
        const announcement = announcements[index];
        let announcement_roles = JSON.parse(announcement.fk_announcement_roles)
        let announcement_start = new Date(announcement.announcement_start.slice(0,10) + "T24:00:00")
        let announcement_end = new Date(announcement.announcement_end.slice(0,10) + "T24:00:00")
        let current_date = new Date()
        if (announcement_start.getMonth() + 1 >= 10) {
            start_month = (announcement_start.getMonth() + 1)
        }
        else {
            start_month = "0" + (announcement_start.getMonth() + 1)
        }

        if (announcement_end.getMonth() + 1 >= 10) {
            end_month = (announcement_end.getMonth() + 1)
        }
        else {
            end_month = "0" + (announcement_end.getMonth() + 1)
        }

        if (announcement_start.getDate() >= 10) {
            start_date = announcement_start.getDate()
        }
        else {
            start_date = "0" + announcement_start.getDate()
        }

        if (announcement_end.getDate() >= 10) {
            end_date = announcement_end.getDate()
        }
        else {
            end_date = "0" + announcement_end.getDate()
        }
        if (current_date > announcement_end) {
            for (let index = 0; index < roles.length; index++) {
                const role = roles[index];
                if (announcement_roles.includes(parseInt(role)) || parseInt(role) == 1) {
                    assigned_role = true;
                }
            }
            if (assigned_role) {
                old_count += 1;
                if (old_count == 3) {
                    $(".old-announcements").append(`
                        <!-- Show More -->
                        <div id="showmore" class="d-flex justify-content-center">
                            <div>
                                <button class="btn btn-link show-more-button">Show More</button>
                            </div>
                            <div class="triangle-down"></div>
                        </div>`)
                }
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
                if (roles.includes("1")) {
                    if (old_count >= 3) {
                        $(".old-announcements").append(`
                            <div id="announcement-bar-admin" class="show-more-item">
                                <!-- Actions -->
                                <div id="announcementactions" class="float-end align-items-center `+ announcement.announcement_type.toLowerCase() + `">
                                    <div id="editannouncement">
                                        <button class="btn btn-link edit-button" data-order="DESC" data-index=`+ index +` data-bs-toggle="modal" data-bs-target="#edit-modal">Edit</button>
                                    </div>
                                    <div id="deleteannouncement">
                                        <button class="btn btn-link delete-button" data-order="DESC" data-index=`+ index +` data-bs-toggle="modal" data-bs-target="#delete-announcement">Delete</button>
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
                                    `+ start_date + `-` + start_month + `-`+ announcement_start.getFullYear() + ` to ` + end_date + `-` + end_month + `-` + announcement_end.getFullYear() + `
                                    </div>
                                    <!-- Message -->
                                    <div id="announcementmessage" class="mt-3">
                                        `+ announcement.announcement_message + `
                                    </div>
                                </div>
                            </div>`)
                    }
                    else {
                        $(".old-announcements").append(`
                            <div id="announcement-bar-admin">
                                <!-- Actions -->
                                <div id="announcementactions" class="float-end align-items-center `+ announcement.announcement_type.toLowerCase() + `">
                                    <div id="editannouncement">
                                        <button class="btn btn-link edit-button" data-order="DESC" data-index=`+ index +` data-bs-toggle="modal" data-bs-target="#edit-modal">Edit</button>
                                    </div>
                                    <div id="deleteannouncement">
                                        <button class="btn btn-link delete-button" data-order="DESC" data-index=`+ index +` data-bs-toggle="modal" data-bs-target="#delete-announcement">Delete</button>
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
                                    `+ start_date + `-` + start_month + `-`+ announcement_start.getFullYear() + ` to ` + end_date + `-` + end_month + `-` + announcement_end.getFullYear() + `

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
                    if (old_count >= 3) {
                        $(".old-announcements").append(`
                            <div id="announcement-bar-admin" class="show-more-item">
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

                                    `+ start_date + `-` + start_month + `-`+ announcement_start.getFullYear() + ` to ` + end_date + `-` + end_month + `-` + announcement_end.getFullYear() + `

                                    </div>
                                    <!-- Message -->
                                    <div id="announcementmessage" class="mt-3">
                                        `+ announcement.announcement_message + `
                                    </div>
                                </div>
                            </div>`)
                    }
                    else {
                        $(".old-announcements").append(`
                            <div id="announcement-bar-admin">
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
                                    `+ start_date + `-` + start_month + `-`+ announcement_start.getFullYear() + ` to ` + end_date + `-` + end_month + `-` + announcement_end.getFullYear() + `
                                    </div>
                                    <!-- Message -->
                                    <div id="announcementmessage" class="mt-3">
                                        `+ announcement.announcement_message + `
                                    </div>
                                </div>
                            </div>`)
                    }
                }

            }
        }
        if (index == announcements.length - 1 && old_count >= 2) {
            $(".old-announcements").append(`
            <!-- Show Less -->
            <div id="showless" class="d-flex justify-content-center">
                <div>
                    <button class="btn btn-link show-less-button">Show Less</button>
                </div>
                <div class="triangle-up"></div>
            </div>`)
        }
    }


}
async function generateUpdate(announcement_index, order){
    let announcements = await getAnnouncement(order);
    let announcement = announcements[announcement_index]
    let announcement_start = new Date(announcement.announcement_start.slice(0,10) + "T24:00:00")
    let announcement_end = new Date(announcement.announcement_end.slice(0,10) + "T24:00:00")
    let start_month,end_month,start_date,end_date;
    if (announcement_start.getMonth() + 1 >= 10) {
        start_month = (announcement_start.getMonth() + 1)
    }
    else {
        start_month = "0" + (announcement_start.getMonth() + 1)
    }

    if (announcement_end.getMonth() + 1 >= 10) {
        end_month = (announcement_end.getMonth() + 1)
    }
    else {
        end_month = "0" + (announcement_end.getMonth() + 1)
    }
    if (announcement_start.getDate() >= 10) {
        start_date = announcement_start.getDate()
    }
    else {
        start_date = "0" + announcement_start.getDate()
    }

    if (announcement_end.getDate() >= 10) {
        end_date = announcement_end.getDate()
    }
    else {
        end_date = "0" + announcement_end.getDate()
    }
    $(".modal-information").empty();
    $(".modal-information").append(`
    <!-- Content header -->
    <div class="modal-header">
        <h5 class="modal-title" id="teaching-assignment-modal">`+ announcement.announcement_subject + `</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <!-- Content -->
    <div class="modal-body">
        <!-- Module Information -->
        <div class="modal-section-title">Announcement Information</div>
        <div class="line2"></div>
        <!-- Table -->
        <div class = "overflow-hidden py-2">
            <!-- Form Item -->
            <div class="form-group row">
                <label for="announcement-type" class="col-sm-3 col-form-label">Announcement
                    Type:</label>
                <div class="col-sm">
                    <select class="form-select-sm" id="announcement-type-update">
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
                        <input class="form-check-input" type="checkbox" value="" id="lecturers-update">
                        <label class="form-check-label" for="lecturers">
                            Lecturers
                        </label>
                    </div>

                    <div class="form-check">
                        <input class=" form-check-input " type="checkbox" value=" " id="modulecoordinator-update">
                        <label class="form-check-label " for="modulecoordinator">
                            Module Coordinators
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input " type="checkbox" value=" " id="examrep-update">
                        <label class="form-check-label " for="examrep">
                            Exam Reps
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input " type="checkbox" value=" " id="adminsupport-update">
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
                    <input type="date" class="form-control form-control-sm" id="start-date-update" value="`+ announcement_start.getFullYear() + `-` + start_month + `-` + start_date+`">
                </div>

                <label for="end-date" class="col-sm-1 col-form-label">to</label>
                <div class="col-sm-3">
                    <input type="date" class="form-control form-control-sm" id="end-date-update" value="`+ announcement_end.getFullYear() + `-` + end_month + `-` + end_date +`">

                </div>
            </div>

            <!-- Form Item -->
            <div class="form-group row">
                <label for="message" class="col-sm-3 col-form-label">Subject:</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control form-control-sm" id="subject-update" value="`+ announcement.announcement_subject +`"></input>
                </div>
            </div>

            <!-- Form Item -->
            <div class="form-group row">
                <label for="message" class="col-sm-3 col-form-label">Message:</label>
                <div class="col-sm-8">
                    <textarea type="text" class="form-control form-control-sm" id="message-update" rows="3" >`+ announcement.announcement_message + `</textarea>
                </div>
            </div>
        
            <div class = "row py-1">
                <div class = "col warning-message" id="announcement-warning">
                    
                </div>
                <div class = "col">
                    <!-- Update Button -->
                    <button type="button" class="btn btn-primary float-end announcement-changes"  data-id="` + announcement.announcement_id + `" data-bs-dismiss="modal">Save Changes</button>
                </div>
            </div>
        </div>
    </div>`);
    $("#announcement-type-update option[value="+ announcement.announcement_type +"]").attr('selected', 'selected');
    let roles = announcement.fk_announcement_roles;
    roles = JSON.parse(roles)
    for (let index = 0; index < roles.length; index++) {
        const role = roles[index];
        switch (role) {
            case 2:
                $("#lecturers-update").prop('checked', true)
                break;
            case 3:
                $("#modulecoordinator-update").prop('checked', true)
                break;
            case 4:
                $("#examrep-update").prop('checked', true)
                break;
            case 5:
                $("#adminsupport-update").prop('checked', true)
                break;
        }
    }
}
async function submitUpdateAnnouncement(announcement_id) {
    let roles = [];
    if ($("#lecturers-update").is(':checked')) {
        roles.push(2)
    }
    if ($("#examrep-update").is(':checked')) {
        roles.push(3)
    }
    if ($("#modulecoordinator-update").is(':checked')) {
        roles.push(4)
    }
    if ($("#adminsupport-update").is(':checked')) {
        roles.push(5)
    }
    roles = JSON.stringify(roles)
    await updateAnnouncement(roles, announcement_id)
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
async function confirmDelete(announcement_index, order) {
    let announcements = await getAnnouncement(order);
    let announcement = announcements[announcement_index]
    $(".announcement-name-delete").empty();
    $(".announcement-name-delete").append(announcement.announcement_subject);
    $(".confirm-delete-button").empty();
    $(".confirm-delete-button").append(`
    <button type="button" class="btn btn-danger delete-announcement mx-4" data-id="`+ announcement.announcement_id +`" data-bs-dismiss="modal">Delete</button>
    <button type="button" class="btn btn-primary mx-4" data-bs-dismiss="modal">Close</button>`);
}

async function confirmedDelete(announcement_id){
    await deleteAnnouncement(announcement_id);
}

$(document).ready(() => {
    generateAnnouncements();
    $("#content-view-admin").on('click', ".create-announcement", () => {
        submitCreateAnnouncement();
    })

    $("#content-view-admin").on('click', ".show-more-button", () => {
        $("#showmore").attr('style', 'display: none !important;')
        $(".show-more-item").attr('style', 'display: block !important;')
        $("#showless").attr('style', 'display: flex !important;')
    })
    $("#content-view-admin").on('click', ".show-less-button", () => {
        $("#showless").attr('style', 'display: none !important;')
        $(".show-more-item").attr('style', 'display: none !important;')
        $("#showmore").attr('style', 'display: flex !important;')
    })

    $("#content-view-admin").on('click', ".delete-button", (e) => {
        let announcement_index = $(e.target).data("index");
        let order = $(e.target).data("order");
        confirmDelete(announcement_index, order);
    })
    $("#delete-announcement").on('click', ".delete-announcement", (e) => {
        let announcement_id = $(e.target).data("id");
        confirmedDelete(announcement_id);
    })

    $("#content-view-admin").on('click', ".edit-button", (e) => {
        let announcement_index = $(e.target).data("index");
        let order = $(e.target).data("order");
        generateUpdate(announcement_index, order);
    })

    $("#edit-modal").on('click', ".announcement-changes", (e) => {
        let announcement_id = $(e.target).data("id");
        submitUpdateAnnouncement(announcement_id);
    })

})