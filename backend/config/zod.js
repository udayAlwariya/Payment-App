const z = require("zod")

const zodSignUpSchema = z.object({
    username : z.string().email(),
    password : z.string().min(8),
    firstName : z.string(),
    lastName : z.string()
})

const zodSigninSchema = z.object({
    username : z.string().email(),
    password : z.string().min(8)
})

const zodUpdateSchema = z.object({
    password : z.string().min(8).optional(),
    firstName : z.string().optional(),
    lastName : z.string().optional()
})

module.exports = {zodSigninSchema,zodSignUpSchema,zodUpdateSchema}