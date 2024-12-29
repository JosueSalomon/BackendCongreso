import supabase from "../utils/connection";

export class Admin{
    static async GetUsuariosValidaciones(
        estado: boolean
    ){
        const {data, error} = await supabase.rpc('p_usuarios_validaciones',{
            validacion_param: estado
        });
        if(error){
            throw error;
        }
        return data
    }

    static async ValidarUsuarios(
        id_usuario: number,
        nuevo_estado: boolean,
        url_qr: string
    ){
        const {data, error} = await supabase.rpc('p_cambiar_validacion',{
            p_usuario_id: id_usuario,
            p_nuevo_estado: nuevo_estado,
            p_url_qr: url_qr
        });
        if(error){
            throw error;
        }
        return data
    }

    static async BuscarUsuario(
        busqueda: string
    ){
        const {data, error} = await supabase.rpc('p_buscar_usuario',{
            p_parametro_busqueda: busqueda
        });
        if(error){
            throw error;
        }
        return data
    }

    static async UpdateUser(
        p_id_persona: number,
        p_nombres: string,
        p_apellidos: string,
        p_dni: string,
        p_correo: string,
        p_contrasena: string
    ){
        const {data, error} = await supabase.rpc('p_actualizar_usuario_persona',{
            p_id_persona : p_id_persona,
            p_nombres :  p_nombres,
            p_apellidos : p_apellidos,
            p_dni : p_dni,
            p_correo : p_correo,
            p_contrasena : p_contrasena,
        });
        if(error){
            throw error;
        }
        return data
    }

    static async GetUserByID(
        userID: number
    ){
        const {data, error} = await supabase.rpc('p_buscar_usuario_por_id',{
            id_usuario_param: userID
        });
        if(error){
            throw error;
        }
        return data
    }

    static async usuario_organizador(
        correo: string, 
        codigo_verificacion: string,
        id_tipo_verificacion: number) 
        {
            const { data, error } = await supabase.rpc('p_guardar_codigo_verificacion', {
                p_correo: correo,
                p_codigo_verificacion: codigo_verificacion,
                p_id_tipo_verificacion: id_tipo_verificacion
            });
            if (error) 
                throw error;
            return data;
    }
}