import supabase from '../utils/connection'

export class Conferencia {
    static async obtenerConferencias(
        dia: string
    ){
        const{data, error} = await supabase.rpc('p_obtener_conferencias', {
            p_dia: dia
        });
        if(error){
            throw error;
        }
        return data;
    }

    static async obtenerConferencia(id_conferencia: number){
        const {data, error} = await supabase.rpc('p_obtener_conferencia',{
            p_id_conferencia: id_conferencia
        });
        if(error){
            throw error;
        }
        return data;
    }

    static async crearConferencia(
        nombre_conferencia: string,
        nombres_ponente: string,
        apellidos_ponente: string,
        descripcion_ponente: string,
        img_perfil_ponente: string,
        descripcion_conferencia: string,
        direccion: string,
        fecha_conferencia: string,
        hora_inicio: string,
        hora_final: string,
        cupos: number,
        img_conferecia: string
    ){
        const {data, error} = await supabase.rpc('p_crear_conferencia', {
            p_nombre_conferencia: nombre_conferencia,
            p_nombres_ponente: nombres_ponente,
            p_apellidos_ponente: apellidos_ponente,
            p_descripcion_ponente: descripcion_ponente,
            p_img_perfil_ponente: img_perfil_ponente,
            p_descripcion_conferencia: descripcion_conferencia,
            p_direccion: direccion,
            p_fecha_conferencia: fecha_conferencia,
            p_hora_inicio: hora_inicio,
            p_hora_final: hora_final,
            p_cupos: cupos,
            p_img_conferecia: img_conferecia
        });
        if(error){
            throw error;
        }
        return data;
    }

    static async editarConferencia(
        id_conferencia: number,
        nombre: string,
        nombres_ponente: string,
        apellidos_ponente: string,
        descripcion_conferencia: string,
        descripcion_ponente: string,
        direccion: string,
        fecha_conferencia: string,
        hora_inicio: string,
        hora_final: string,
        cupos: number,
        finalizado: boolean,
        inactivo: boolean,
        img_conferecia: string,
        img_ponente: string,
    ){
        const {data, error} = await supabase.rpc('p_editar_conferencia', {
            p_id_conferencia: id_conferencia,
            p_nombre: nombre,
            p_nombres_ponente: nombres_ponente,
            p_apellidos_ponente: apellidos_ponente,
            p_descripcion_conferencia: descripcion_conferencia,
            p_descripcion_ponente: descripcion_ponente,
            p_direccion: direccion,
            p_fecha_conferencia: fecha_conferencia,
            p_hora_inicio: hora_inicio,
            p_hora_final: hora_final,
            p_cupos: cupos,
            p_finalizado: finalizado,
            p_inactivo: inactivo,
            p_img_conferecia: img_conferecia,
            p_img_ponente: img_ponente
        });
        if(error){
            throw error;
        }
        return data;
    }

    static async eliminarConferencia(idConferencia: number){
        const {data, error} = await supabase.rpc('p_eliminar_conferencia',{
            p_id_conferencia: idConferencia
        });
        if(error){
            throw error;
        }
        return data;
    }

    static async insertarRecursoPorConferencia(url_descarga: string, url_vista_previa:string ,id_conferencia:number, nombre_recurso:string){
        try {
            const {data, error} = await supabase.rpc('insertar_recurso', {
                p_url_descarga: url_descarga,
                p_url_vista_previa: url_vista_previa,
                p_id_conferencia: id_conferencia,
                p_nombre_recurso: nombre_recurso
            });

            return data;
        } catch (error: unknown) {
            throw new Error(error as string);
        }
    }

    static async traerRecursosPorConferencia(id_conferencia: number){
        const {data, error} = await supabase.rpc('traer_recurso_por_conferencia',{
            p_id_conferencia: id_conferencia
        });
        if(error){
            throw error;
        }
        return data;
    }
}