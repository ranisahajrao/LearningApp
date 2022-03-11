const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')

const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')

const hashFunction = async() =>
{
    const pwd = "Konverge123"
    const hashpwd = await bcrypt.hash(pwd,8)

    const token=jwt.sign({userid:2},'KonvergeToken')
    console.log(hashpwd)

    const isMatch = await bcrypt.compare(pwd, hashpwd)
    console.log(isMatch)

    console.log(token)
    const decode=jwt.verify(token,'KonvergeToken')
    console.log(decode)
}

hashFunction()