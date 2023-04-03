import bcrypt from "bcrypt"
import userRepositories from "../repositories/userRepositories.js"

async function create ({name, email, password}){
 const {rows:user}= await userRepositories.findByEmail(email)
 if(user.length !==0) throw new Error("Email or Password incorrect")

 const hashPass = await bcrypt.hash(password,10)
 await userRepositories.create({name, email, password: hashPass})
}

export default {
    create
}