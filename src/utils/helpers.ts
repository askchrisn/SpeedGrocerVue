export function adjustEmail(email: string) {
    email = email.replace(/\./gi, "D")
    email = email.replace(/@/gi, "A")
    return email
  }

  export function capitalizeAndTrimAllWordsInString(input: string): string {
    return input
      .split(' ')
      .map(word => word.trim())
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }