

function getUser() {
    let user = 'none';
  
    //First check if the active user is available
    const username = Session.getActiveUser().getEmail();
  
    //Otherwise use a temp user active key at least
    if (username.length < 1){
        const secretuser = Session.getTemporaryActiveUserKey();
        user = secretuser;
    }
    else{
        user = username;
    }
 
    return user;
}
