const jwt=require("jsonwebtoken");
const createError=require("http-errors");
module.exports={
    //middleware
    signAccessToken: (userId)=>{
        return new Promise((resolve,reject)=>{
            const payload={
                name:'booking website' ,
                iss:"my website.com",
            }
            const secret=process.env.ACCESS_TOKEN_SECRET
            const options={
                expiresIn:"9h",
                audience:userId
            }
            jwt.sign(payload,secret,options,(err,token)=>{
                if(err) 
                {
                    console.log(err.message)
                    reject(createError.InternalServerError());
                }
                resolve(token)
            })
        })
    },
    //middleware
    verifyAccessToken:(req,res,next)=>{
      
            console.log("heeh")
            if(!req.headers["authorization"])  return next(createError.Unauthorized())
            const authHeader=req.headers["authorization"]
            const bearerToken=authHeader.split(" ");
            const token=bearerToken[1];
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
                
                console.log(payload)
                if(err){
    
                    const message=err.message ==="JsonWebTokenError "? "Unauthorized":err.message
                    return next(createError.Unauthorized(message));
                    
                }
                req.payload=payload
                console.log(req.payload);
                next()
            })
        
        
    },
    signRefreshToken:(userId)=>{
        return new Promise((resolve,reject)=>{
            const payload={ }
            const secret=process.env.REFRESH_TOKEN_SECRET
            const options={
                expiresIn:"1Y",
                issuer:"my website.com",
                audience:userId
            }
            jwt.sign(payload,secret,options,(err,token)=>{
                if(err) 
                {
                    console.log(err.message)
                    reject(createError.InternalServerError());
                }
                resolve(token)
            })
        })
    },
    verifyRefreshToken:(refreshToken)=>{
        return new Promise((resolve,reject)=>{
            jwt.verify(refreshToken,process.env,REFRESH_TOKEN_SECRET,(err,payload)=>{
                if(err)return reject (createError.Unauthorized());
                const userId=payload.aud
                resolve(userId);
            })
        })
    },

    authenticateToken:(req,res,next)=>{
        const authHeader=req.headers['authorization'];
        const token=authHeader && authHeader.split(' ')[1];
        if(token== null){
            return res.sendStatus(401);
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,userId)=>{
            if(err){
                return res.sendStatus(403);
            }
            req.userId=userId;
            next();
        })
    }

}