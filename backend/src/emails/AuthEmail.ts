import { transporter } from "../config/nodemailer"

interface IEmail {
    email: string
    name: string
    token: string
}

export class AuthEmail {
    static sendeConfirmationEmail = async (user: IEmail) => {
        const infor = await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'Confirma tu cuenta',
            text: 'Confirma tu cuenta',
            html: `<p>Hola: ${user.name}, has creado tu cuenta en UpTask, solo deber confirmar tu cuenta</p>
            <p>Visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
            <p>E ingresa el código: ${user.token}</p>
            <p>Este token expira en 10 minutos</p>
            `
        })
        console.log('Mensaje enviado', infor.messageId)
    }



    static sendPasswordResetToken = async (user: IEmail) => {
        const infor = await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'Reestablece tu contraseña',
            text: 'Reestablece tu contraseña',
            html: `<p>Hola: ${user.name}, has solicitado reestablecer tu password:</p>
            <p>Visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer contraseña</a>
            <p>E ingresa el código: ${user.token}</p>
            <p>Este token expira en 10 minutos</p>
            `
        })
        console.log('Mensaje enviado', infor.messageId)
    }
}