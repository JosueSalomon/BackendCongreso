import supabase from "../utils/connection";

export class registro {
  static async registrarusuario(
    nombres: string,
    apellidos: string,
    dni: string, 
    telefono: number,
    fecha_nacimiento: string,
    genero: string,
    identificador_unah: number | null = null,
    correo: string,
    contrasena: string,
    img_recibo: string,
    codigo_recibo: string
  ) {
    
    let externo = false;
    let estudiante = false;

    if (correo.endsWith('@unah.edu.hn')) {
      externo = false;
      estudiante = false;
      identificador_unah = identificador_unah || 0;
    } else if (correo.endsWith('@unah.hn')) {
      externo = false;
      estudiante = true;
      identificador_unah = identificador_unah || 0;
    } else {
      externo = true;
      estudiante = false;
      identificador_unah = 0;
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
      p_codigo_recibo: codigo_recibo
    });

    if (error) {
      console.error('Error al insertar usuario:', error);
      throw new Error('Error al insertar usuario');
    }

    return data;
  }
}


