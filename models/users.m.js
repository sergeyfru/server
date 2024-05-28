import {db} from '../config/db.js'

export const register = async({email,password})=>{
    try {
        const [user] = await db('users').insert({email,password},['id','email'])
        return user
    } catch (error) {
        console.log('Error in register model',error);
        throw new Error('Registration failed')
    }
}

export const login = async(email)=>{
    try {
        const user =  await db('users')
        .select('id','email','password')
        .where({email})
        .first()
        return user ||null
    } catch (error) {
        console.error('Error in login model',error);
        throw new Error('login failed')
    }
}

export const all = async ()=>{
    try {
        const users = await db('users').select('id','email').orderBy('id')
        return users
    } catch (error) {
        console.error('Error in get all users model',error);
        throw new Error('Do not get users')        
    }
}