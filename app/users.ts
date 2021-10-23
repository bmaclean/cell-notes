function getUser() {
    let user = 'none';

    //First check if the active user is available
    const username = Session.getActiveUser().getEmail();

    //Otherwise use a temp user active key at least
    if (username.length < 1) {
        const secretUser = Session.getTemporaryActiveUserKey();
        user = secretUser;
    } else {
        user = username;
    }

    return user;
}
