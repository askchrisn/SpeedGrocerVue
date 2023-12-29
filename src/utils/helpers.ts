export function adjustEmail(email: string) {
    email = email.replace(/\./gi, "D")
    email = email.replace(/@/gi, "A")
    return email
  }