import { getUser, saveUser, insertUser as insertUserDB } from "../db/users.js"
import bcryptjs from "bcryptjs"
const saltRounds = 10;

async function insertUser(email, senha) {
    const hash = bcryptjs.hashSync(senha, saltRounds)
    let result =  { success: true, msg: "usuário cadastrado com sucesso" }
    try {
        await insertUserDB(email, hash)
    } catch (error) {
        result =  { success: false, msg: error }
    }
    return result
}

async function checkCredentials(email, senha) {
    const user = await getUser(email)
    if (user) return bcryptjs.compareSync(senha, user.senha)
    return false
}

async function changePassword(email, senha) {
    const hash = bcryptjs.hashSync(senha, saltRounds)
    const result = await saveUser(email, hash)
    if (result) return { success: true }
    return false
}

export { insertUser, checkCredentials, changePassword }