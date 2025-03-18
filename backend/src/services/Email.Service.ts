import { email } from "../types/types";
import { transport } from "../config/mail";

export class EmailService {
    static sendEmailConfirmacion = async (user: email) => {
        try {
            const email = await transport.sendMail({
                from: "test@mgonzalezh.tech",
                to: user.email,
                subject: "TTA110 - Confirma tu cuenta",
                html: `<p>Hola ${user.name}, has creado tu cuenta correctamente.</p>
                <p>Ingresa en el siguiente enlace para confirmar tu cuenta:<a href="#">Confirmar cuenta</a></p>
                <p>He ingresa código: <strong>${user.token}</strong></p>`,
            });
            console.log("Correo de confirmación enviado:", email.messageId);
            return { success: true, messageId: email.messageId };
        } catch (error) {
            console.error("Error al enviar correo de confirmación:", error);
            return { success: false, error: error.message };
        }
    };

    static sendResetPasswordEmail = async (user: email) => {
        try {
            const email = await transport.sendMail({
                from: "test@mgonzalezh.tech",
                to: user.email,
                subject: "TTA110 - Restaurar contraseña",
                html: `<p>Hola ${user.name}, Se ha pedido la restauración de contraseña.</p>
                <p>Ingresa en el siguiente enlace para restaurar tu contraseña:<a href="#"> Restaurar contraseña</a></p>
                <p>He ingresa código: <strong>${user.token}</strong></p>`,
            });
            console.log("Correo de restablecimiento enviado:", email.messageId);
            return { success: true, messageId: email.messageId };
        } catch (error) {
            console.error("Error al enviar correo de restablecimiento:", error);
            return { success: false, error: error.message };
        }
    };
}
