// CREATE JWT TOKEN AND SAVE IN COOKIES


const sendToken=(user,statusCode,res)=>{

    const Token = user.getJWTtoken()
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
       
    }

    res.status(statusCode).cookie("token", Token,options).json({
        success: true,
        user,
        Token
    })

}


module.exports = sendToken