import DOMPurify from 'isomorphic-dompurify'

export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input.trim())
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateMessage = (message: string): boolean => {
  return message.trim().length >= 10
}

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2
}
