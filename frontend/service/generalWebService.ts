export class WebService {
    static async getAsync(){
        
    }
    static async postAsync(endpoint:string|undefined, values:any, successMessage?:string ){
        if(!endpoint){
            throw new Error("La direccion del endpoint no esta definida");
        }
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            })
            const jsonResponse = await response.json();
            if(!response.ok) return { success: false, message: jsonResponse.error};
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
    static async putAsync(){

    }
}