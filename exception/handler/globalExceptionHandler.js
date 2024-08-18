const globalExceptionHandler = (error,req,res,next) =>{
    return res.status(500).json({status:500,message:"Something Went wrong"});
} 
module.exports = globalExceptionHandler;