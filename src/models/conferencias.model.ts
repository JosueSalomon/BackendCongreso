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

}