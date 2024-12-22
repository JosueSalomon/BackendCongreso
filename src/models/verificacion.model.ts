import supabase from '../utils/connection';  // Asegúrate de que esta importación sea correcta

export class verificacion {

    static async guardarCodigoVerificacion(id_usuario: number, codigo_verificacion: string): Promise<any>  {
        try {
            const { data, error } = await supabase.rpc('p_guardar_codigo_verificacion', {
                p_id_usuario: id_usuario,
                p_codigo_verificacion: codigo_verificacion
            });
        
            if (error) throw error;
            return data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message); 
            } else {
                throw new Error('Error desconocido');
            }
        }
    }

    static async verificarCodigo(id_usuario: number, codigo_verificacion: string): Promise<boolean> {
        try {
            const { data, error } = await supabase.rpc('p_verificar_codigo', {
                p_id_usuario: id_usuario,
                p_codigo_verificacion: codigo_verificacion
            });
    
            if (error) {
                throw error;
            }
            return data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error desconocido');
            }
        }
    }
    

    // Actualizar el correo del usuario en la base de datos
    static async actualizarCorreoUsuario(id_usuario: number, nuevo_correo: string): Promise<void> {
        try {
            const { error } = await supabase.rpc('p_actualizar_correo_usuario', {
                p_id_usuario: id_usuario,
                p_nuevo_correo: nuevo_correo
            });

            if (error) throw error;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message); 
            } else {
                throw new Error('Error desconocido');
            }
        }
    }

    }









