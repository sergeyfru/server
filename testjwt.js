import jwt, { decode } from 'jsonwebtoken'

/**
 * sign ({payload}, secret-code, {expire})
 */

const token  = jwt.sign(
    {id:12,email:'jjj@mail.com',name:'Jack'},
    '123456',
    {
        expiresIn: 60 * 1000 //
    }
)

// console.log(token);


const mytoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoiampqQG1haWwuY29tIiwibmFtZSI6IkphY2siLCJpYXQiOjE3MTY3OTMyNTIsImV4cCI6MTcxNjg1MzI1Mn0.7hUjM-U5T0yubqCPrljMhN-DNC87KB_0HlNvyv_kjkk"
/**
 * verify(token, secret,(err,decode) => {})
 */

jwt.verify(mytoken,'123456',(err,decode)=>{
    if(err) return console.log(err.message);

    console.log(decode);
})