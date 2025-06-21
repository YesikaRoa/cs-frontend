import { z } from 'zod'

const venezuelaPhoneRegex = /^(?:(?:\+58|0058))?(?:0)?(212|234|235|238|239|240|241|242|243|244|245|246|247|248|249|251|252|253|254|255|256|257|258|259|261|262|263|264|265|266|267|268|269|271|272|273|274|275|276|277|278|279|281|282|283|284|285|286|287|288|289|291|292|293|294|295|412|414|416|424|426)\d{7}$/;



export const createUserSchema = z.object({
  first_name: z.string().min(3, 'El nombre es obligatorio y debe tener al menos 3 caracteres'),
  last_name: z.string().min(3, 'El apellido es obligatorio y debe tener al menos 3 caracteres'),
  phone: z.string()
    .regex(venezuelaPhoneRegex, 'Debe ser un número telefónico válido (ej: 02761234567, 04161234567)'),
  email: z.string().email('Debe ser un correo electrónico válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').optional(),
  community_id: z.union([z.string(), z.number()]).refine(val => String(val).length > 0, {
    message: 'Debe seleccionar una comunidad',
  }),
  rol_id: z.union([z.string(), z.number()]).refine(val => String(val).length > 0, {
    message: 'Debe seleccionar un rol',
  }),
})

export const updateUserSchema = createUserSchema.partial()
