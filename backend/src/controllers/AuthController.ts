import type { Request, Response } from 'express'
import User from '../models/User'
import { checkPassword, hashPassword } from '../utils/auth'
import Token from '../models/Token'
import { generateToken } from '../utils/token'
import { AuthEmail } from '../emails/AuthEmail'

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        try {
            const {password, email} = req.body

            //Check if user already exists
            const userExists = await User.findOne({email})
            if(userExists) {
                const error = new Error('El usuario ya existe')
                return res.status(409).json({ error: error.message })
            }

            //create user
            const user = new User(req.body)
            
            //Hash password
            user.password = await hashPassword(password)

            //Generate token
            const token = new Token()
            token.token = generateToken()
            token.user = user._id

            //send email
            AuthEmail.sendeConfirmationEmail({
                email: user.email,
                name: user.email,
                token: token.token
            })
            
            
            await Promise.allSettled([user.save(), token.save()])
            res.send('Usuario creado correctamente, revisa tu email para confirmarla')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }


    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body
            const tokenExists = await Token.findOne({ token })
            if (!tokenExists) {
                const error = new Error('El token no es válido')
                return res.status(404).json({ error: error.message })
            }

            const user = await User.findById(tokenExists.user)
            user.confirmed = true

            await Promise.allSettled([user.save(), tokenExists.deleteOne()])
            res.send('Usuario confirmado correctamente')

        }catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }


    static login = async (req: Request, res: Response) => {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if(!user) {
                const error = new Error('Usuario no encontrado')
                return res.status(404).json({ error: error.message })
            }

            if(!user.confirmed) {
                const token = new Token()
                token.user = user._id
                token.token = generateToken()
                await token.save()

                //send email
                AuthEmail.sendeConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token
            })

                const error = new Error('La cuenta no ha sido confirmada, hemos enviado un email de confirmación')
                return res.status(401).json({ error: error.message })
            }

            //Check password
            const isPasswordCorrect = await checkPassword(password, user.password)
            if(!isPasswordCorrect) {
                const error = new Error('Password incorrecto')
                return res.status(401).json({ error: error.message })
            }


        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }
}