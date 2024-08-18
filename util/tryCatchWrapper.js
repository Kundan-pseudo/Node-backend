exports.tryCatchWrapper = (controler) => async(req,res,next) =>{
    try{
        await controler(req,res,next);
    }catch(error){
        console.log(error);
        next(error);
    }
}
