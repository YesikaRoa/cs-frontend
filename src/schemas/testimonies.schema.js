import { z } from 'zod'

export const testimonySchema = z.object({
  name: z.string().min(3, 'El nombre es obligatorio y debe tener al menos 3 caracteres'),
  comment: z.string().min(10, 'El comentario es obligatorio y debe tener al menos 10 caracteres'),
  community_id: z.union([z.string(), z.number()]).refine(val => String(val).length > 0, {
    message: 'Debe seleccionar una comunidad',
  }),
})