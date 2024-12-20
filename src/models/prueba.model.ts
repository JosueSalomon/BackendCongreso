import supabase from "../utils/connection";

export class prueba {
    static async funcionprueba(){
        const{data, error} = await supabase.rpc('p_select_tabla');
        if(error){
            throw error;
        }
        return data;
    }

    static async funcionPruebaParametro(
        id_persona: number
    ){
        const{data, error} = await supabase.rpc('p_select_tabla_parametro',{
            p_id_persona: id_persona
        });
        if(error){
            throw error;
        }
        return data;
    }
}