export const signUpService = async (values: any) => {
    console.log(JSON.stringify(values))
    try {
        const response = await fetch("http://localhost:4000/api/auth/create-account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        console.log(JSON.stringify(values))

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al registrar usuario");
        }

        return { success: true, message: "Cuenta creada con éxito", data };
    } catch (error) {
        return { success: false, message: (error as Error).message };
    }
};