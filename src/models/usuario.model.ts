import supabase from '../utils/connection';  // Asegúrate de que esta importación sea correcta
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { hacerToken } from '../services/jwt';
dotenv.config()

export class usuario {

    static async registrarusuario(
        nombres: string,
        apellidos: string,
        id_universidad: number,
        id_tipo_usuario : number,
        dni: string, 
        telefono: string,
        fecha_nacimiento: string,
        genero: string,
        identificador_unah: string,
        correo: string,
        contrasena: string,
        img_recibo: string,
        codigo_recibo: string,
        id_qr: number,
        validacion: boolean
      ) {
        
        let externo = false;
        let estudiante = false;
    
        if (correo.endsWith('@unah.edu.hn')) {
          externo = false;
          estudiante = false;
        } else if (correo.endsWith('@unah.hn')) {
          externo = false;
          estudiante = true;
        } else {
          externo = true;
          estudiante = false;
          identificador_unah = "null"
        }
        const { data: duplicados, error: errorDuplicados } = await supabase.rpc('p_verificar_duplicados', {
            p_dni: dni,
            p_identificador_unah: identificador_unah,
            p_correo: correo,
            p_codigo_recibo: codigo_recibo,

          });
        
          if (errorDuplicados) {
            console.error('Error al verificar duplicados:', errorDuplicados);
            throw new Error('Error al verificar duplicados.');
          }
        
          if (duplicados && duplicados.length > 0) {
            const duplicado = duplicados[0];
            throw new Error(`El campo '${duplicado.campo_duplicado}' con el valor '${duplicado.valor}' ya está en uso.`);
          }
    
        const { data: PersonaData, error: PersonaError } = await supabase.rpc('p_insertar_persona', {
          p_nombres: nombres,
          p_apellidos: apellidos
        });
    
        if (PersonaError) {
          console.error('Error al insertar persona:', PersonaError);
          throw new Error('Error al insertar persona');
        }
    
        if (!PersonaData || typeof PersonaData !== 'number') {
          throw new Error('El procedimiento almacenado no devolvió un ID válido para la persona.');
        }
    
        const id_persona = PersonaData;
    
        // Insertar usuario en la base de datos
        const { data, error } = await supabase.rpc('p_insertar_usuario', {
          p_id_persona: id_persona,
          p_id_universidad : id_universidad,
          p_id_tipo_usuario: id_tipo_usuario,
          p_dni: dni,
          p_telefono: telefono,
          p_fecha_nacimiento: fecha_nacimiento,
          p_genero: genero,
          p_externo: externo,
          p_estudiante: estudiante,
          p_identificador_unah: identificador_unah,
          p_correo: correo,
          p_contrasena: contrasena,
          p_img_recibo: img_recibo,
          p_codigo_recibo: codigo_recibo,
          p_id_qr: id_qr,
          p_validacion: validacion
        });
    
        if (error) {
          console.error('Error al insertar usuario:', error);
          throw new Error('Error al insertar usuario');
        }
    
        return data;
      }
    
    
    static async usuariocodigocorreo(id_usuario: number, codigo_verificacion: string): Promise<any>  {
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

    static async usuarioverificarcorreo(id_usuario: number, codigo_verificacion: string): Promise<boolean> {
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
    static async usuarioexternoactualizarcorreo(id_usuario: number, nuevo_correo: string): Promise<void> {
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

    static async login(correo: string, contrasenia : string): Promise<any> {
      try {
        const { data, error } = await supabase.rpc('p_login', {
          p_correo : correo,
          p_contrasenia : contrasenia
        });
        if(error){
          throw new Error(`Ocurrió el siguiente error ${error.message}`)
        }

        if(!data || data.length === 0 || data.codigo_resultado === 0) {
          throw new Error("Credenciales inválidas o usuario no verificado");
        }

        const token = hacerToken(data.correo_salida, data.contrasenia_salida);
        const resultado = await this.insertarTokenDelUsuario(data.correo_salida, data.contrasenia_salida, token);
        
        data.token = token;

        return data;
      } catch (error: unknown) {
        if(error instanceof Error){
          throw new Error(error.message);
        }else {
          throw new Error("Error desconocido");
        }
      }
    }

    static async insertarTokenDelUsuario (correo:any, contrasenia:any, token: any):Promise<any> {
      try {
        const { data, error } = await supabase.rpc('insertar_token_usuario', {
          p_correo: correo, 
          p_contrasenia: contrasenia,
          p_token: token
        });

        if(error){
          throw new Error(`Ocurrió el siguiente error ${error.message}`)
        }

        console.log(data);

      } catch (error:unknown) {
        if(error instanceof Error){
          throw new Error(error.message);
        }else {
          throw new Error("Error desconocido");
        }
      }
    }

    static async logout(correo: any){
      try {
        const { data, error } = await supabase.rpc('logout', {
          p_correo : correo
        });

        if(error){
          throw new Error(`Ocurrió el siguiente error ${error.message}`)
        }
        return data;
      } catch (error) {
        if(error instanceof Error){
          throw new Error(error.message);
        }else {
          throw new Error("Error desconocido");
        }
      }
    }
}









