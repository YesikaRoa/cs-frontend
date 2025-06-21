import { z } from 'zod'

export const createUserSchema = z.object({
  first_name: z.string().min(3, 'El nombre es obligatorio y debe tener al menos 3 caracteres'),
  last_name: z.string().min(3, 'El apellido es obligatorio y debe tener al menos 3 caracteres'),
  phone: z.string().min(10, 'El teléfono es obligatorio y debe tener al menos 10 caracteres'),
  email: z.string().email('Debe ser un correo electrónico válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').optional(),
  community_id: z.string().min(1, 'Debe seleccionar una comunidad'),
  rol_id: z.string().min(1, 'Debe seleccionar un rol'),
})

export const updateUserSchema = createUserSchema.partial()
