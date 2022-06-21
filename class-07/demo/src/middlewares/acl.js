'use strict';

module.exports= (capability)=>{
    return (req , res , next)=>{
        try{
            if(req.user.actions.includes(capability)){
                next();
            }else{
                next('access denied')

            }
        }catch(e){
            next('invalid login');
        }
    }
}