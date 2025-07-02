import { z } from 'zod'

const updateProfileSchema = z.object({
  first_name: z
    .string()
    .min(3, 'El nombre es obligatorio y debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  last_name: z
    .string()
    .min(3, 'El apellido es obligatorio y debe tener al menos 3 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres'),
  phone: z.string().max(20, 'El teléfono no puede tener más de 15 caracteres').optional(),
  email: z.string().email('El correo debe ser válido'),
})

const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, 'La contraseña actual es obligatoria y debe tener al menos 6 caracteres'),
  newPassword: z.string().min(6, 'La nueva contraseña debe tener al menos 6 caracteres'),
  confirmNewPassword: z.string().min(6, 'La confirmación debe tener al menos 6 caracteres'),
})

export { updateProfileSchema, changePasswordSchema }