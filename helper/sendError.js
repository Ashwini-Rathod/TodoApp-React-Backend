const sendError = (error, req, res) =>{
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message, 
    })
}

module.exports = sendError;