function getAnnouncement(){
    return axios.get(base_url + '/api/announcements')
    .then(response => response.data)
    .catch(err => error(err));
}