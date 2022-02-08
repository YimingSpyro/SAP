

function logOut(){
    window.sessionStorage.removeItem("staff_id")
    window.sessionStorage.removeItem("staff_role")
    window.sessionStorage.removeItem("isLoggedIn")
    window.sessionStorage.removeItem("navBarAppended")
    window.sessionStorage.removeItem("staff_role_name")
    window.sessionStorage.removeItem("staff_name")
    window.sessionStorage.removeItem("navBarContent")
    window.sessionStorage.clear()
    localStorage.clear()
    window.location.href="/"
}