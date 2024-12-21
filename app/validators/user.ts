import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const UserValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value) => {
        const exists = await db.from('users').where('email', value).first()
        return !exists
      })
      .maxLength(255),
    password: vine.string().trim().minLength(12),
    pseudo: vine.string().trim(),
  })
)

vine.messagesProvider = new SimpleMessagesProvider({
  'required': 'The {{ field }} field is required',
  'pseudo.database.unique': '{{ field }} already exists',
  'email.database.unique': '{{ field }} already exists',
})
