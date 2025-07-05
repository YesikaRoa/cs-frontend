import { z } from 'zod'

const venezuelaPhoneRegex = /^(?:(?:\+58|0058))?(?:0)?(212|234|235|238|239|240|241|242|243|244|245|246|247|248|249|251|252|253|254|255|256|257|258|259|261|262|263|264|265|266|267|268|269|271|272|273|274|275|276|277|278|279|281|282|283|284|285|286|287|288|289|291|292|293|294|295|412|414|416|424|426)\d{7}$/;

export const contactSchema = z.object({
  PHONE_NUMBER: z.string()
    .regex(venezuelaPhoneRegex, 'Debe ser un número telefónico válido (ej: 02761234567, 04161234567)'),
  EMAIL: z.string().email('Debe ser un correo electrónico válido'),
  LOCATION: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
})

export const contactFieldSchema = z.object({
  value: z.string().min(1, 'El campo no puede estar vacío'),
})
