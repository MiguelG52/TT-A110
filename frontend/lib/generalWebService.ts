export class WebService {

    static getAuthHeaders() {
        const token = sessionStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };
    }

    static async postAsync(endpoint: string | undefined, values: any) {
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
                message: jsonResponse.message,
                data:jsonResponse.data,
                token: jsonResponse.token
            };

        } catch (error) {
            const errorMessage = (error as Error).message || 'Error inesperado';
            return { success: false, message: errorMessage };
        }
    }

    static async postAsyncPublic(endpoint: string | undefined, values: any) {
        if (!endpoint) throw new Error("La dirección del endpoint no está definida");

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });

            const jsonResponse = await response.json();
            if (!response.ok) return { success: false, message: jsonResponse.error };

            return {
                success: true,
                message: jsonResponse.message,
                data: jsonResponse.data,
                token: jsonResponse.token
            };
        } catch (error) {
            return { success: false, message: (error as Error).message || 'Error inesperado' };
        }
    }

    // 🔐 POST con token
    static async postAsyncAuth(endpoint: string | undefined, values: any) {
        if (!endpoint) throw new Error("La dirección del endpoint no está definida");

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(values)
            });

            const jsonResponse = await response.json();
            if (!response.ok) return { success: false, message: jsonResponse.error };

            return {
                success: true,
                message: jsonResponse.message,
                data: jsonResponse.data
            };
        } catch (error) {
            return { success: false, message: (error as Error).message || 'Error inesperado' };
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
    static async getAsyncAuth(endpoint: string) {
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: this.getAuthHeaders()
            });

            const jsonResponse = await response.json();
            if (!response.ok) return { success: false, message: jsonResponse.error };

            return { success: true, data: jsonResponse };
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

    static async putAsyncAuth(endpoint: string, values: any, successMessage?: string) {
        try {
            const response = await fetch(endpoint, {
                method: "PUT",
                headers: this.getAuthHeaders(),
                body: JSON.stringify(values),
            });

            const jsonResponse = await response.json();
            if (!response.ok) return { success: false, message: jsonResponse.error };

            return {
                success: true,
                message: successMessage || jsonResponse.message,
                ...(jsonResponse && { data: jsonResponse }),
            };
        } catch (error) {
            return { success: false, message: (error as Error).message || "Error inesperado" };
        }
    }

    static async deleteAsyncAuth(endpoint: string) {
        try {
            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: this.getAuthHeaders()
            });

            const jsonResponse = await response.json();
            if (!response.ok) return { success: false, message: jsonResponse.error };

            return { success: true, message: jsonResponse.message };
        } catch (error) {
            return { success: false, message: (error as Error).message || "Error inesperado" };
        }
    }
}
