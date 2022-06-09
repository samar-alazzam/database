'use strict';
module.exports=(error , req , res , next)=>{
    console.log(error);
    res.status(500).send({
        code :500,
        route: req.path,
        message: `server Error: ${error.message || error}`,

    });
};