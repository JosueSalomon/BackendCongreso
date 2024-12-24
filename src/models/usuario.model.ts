import { isNull } from 'util';
import supabase from '../utils/connection';  // Asegúrate de que esta importación sea correcta

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
        validacion: boolean,
        codigo_organizador :string
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
          identificador_unah = "1";
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
          p_validacion: validacion,
          p_codigo_organizador: codigo_organizador
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

    }









