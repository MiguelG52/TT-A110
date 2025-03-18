import jwt from "jsonwebtoken";

export const generateJWT = async (id: string) =>{
    const token = jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:'10d'
    })
    return token
}

export const verfyJWT = async(encodedToken:string)=>{
    const user = jwt.verify(encodedToken, process.env.JWT_SECRET)
    return user
}