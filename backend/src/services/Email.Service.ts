import { Email } from "../types/types"
import { transport } from "../config/mail"
export class EmailService{
    static sendEmailConfirmacion = async( user:Email) =>{
        const email = await transport.sendMail({
            from:"test@mgonzalezh.tech",
            to:user.email,
            subject:'TTA110 - Confirma tu cuenta',
            html:`<p>Hola ${user.name}, has creado tu cuenta correctamente.</p>
            <p>He ingresa codigo: <strong>${user.token}</strong></p>
            <p>En el siguiente enlace para confirmar tu cuenta:<a href="#">Confirmar cuenta</a></p>
            `
        })
    }
}
