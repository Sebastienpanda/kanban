import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const TaskValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(4).maxLength(255),
    description: vine.string().trim().minLength(4),
  })
)

vine.messagesProvider = new SimpleMessagesProvider({
  'required': 'The {{ field }} field is required',
  'pseudo.database.unique': '{{ field }} already exists',
  'email.database.unique': '{{ field }} already exists',
})
