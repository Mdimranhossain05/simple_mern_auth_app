const errorRespose = (res, {statusCode = 500, message = "Internal server error"} ) => {
    return res.status(statusCode).json({
        success : false,
        message
    });
}

const successReponse = (res, {statusCode = 200, message = "Success", payload = {}}) => {
    return res.status(statusCode).json({
        success: true,
        message,
        payload
    });
}

module.exports = {errorRespose, successReponse};