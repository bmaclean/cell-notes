

function getUser() {
  var user = "none";
  
  //First check if the active user is available
  var username = Session.getActiveUser().getEmail();
  
  //Otherwise use a temp user active key at least
  if (username.length < 1){
    var secretuser = Session.getTemporaryActiveUserKey();
    user = secretuser;
  }
  else{
    user = username
  }
 
  return user;
}
