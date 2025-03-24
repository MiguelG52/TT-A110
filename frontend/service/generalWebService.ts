export class WebService {
    static async postAsync(endpoint: string | undefined, values: any, successMessage?: string) {
        if (!endpoint) {
            throw new Error("La direccion del endpoint no esta definida");
        }
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            })
            const jsonResponse = await response.json();
            if (!response.ok) return { success: false, message: jsonResponse.error };
            return {
                success: true,
                message: successMessage,
                ...(jsonResponse && { response: jsonResponse })
            };

        } catch (error) {
            const errorMessage = (error as Error).message || 'Error inesperado';
            return { success: false, message: errorMessage };
        }
    }

    static async getAsync(endpoint: string) {
        try {
            const response = await fetch(endpoint);
            const jsonResponse = await response.json();
            if (!response.ok) return { success: false, message: jsonResponse.error };
            return { success: true, response: jsonResponse };
        } catch (error) {
            return { success: false, message: (error as Error).message || "Error inesperado" };
        }
    }

    static async putAsync(endpoint: string, values: any, successMessage?: string) {
        try {
            const response = await fetch(endpoint, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const jsonResponse = await response.json();
            if (!response.ok) return { success: false, message: jsonResponse.error };

            return {
                success: true,
                message: successMessage,
                ...(jsonResponse && { response: jsonResponse }),
            };
        } catch (error) {
            return { success: false, message: (error as Error).message || "Error inesperado" };
        }
    }
}
