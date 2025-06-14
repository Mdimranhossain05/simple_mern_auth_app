const setAccessToken = (res, accessToken) => {
    //cookie option
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });
}


module.exports = { setAccessToken }