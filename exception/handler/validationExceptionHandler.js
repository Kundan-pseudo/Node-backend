const { ZodError } = require("zod");

const validationExceptionHandler = (error,req,res,next) =>{
    if(error instanceof ZodError){
        const errorMsg = error.flatten((issue) => ({
            message: issue.message,
            errorCode: issue.code,
          }));
        return res.status(403).json({message:errorMsg});
    }
    next(error);
} 
module.exports = validationExceptionHandler;