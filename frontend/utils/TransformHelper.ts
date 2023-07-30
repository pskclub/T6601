export class TransformHelper {
  static getSlugFromText = (str: string): string => {
    const regexpSpacialLetter =
      /[\_|\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s]+/g

    return str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
      .replace(regexpSpacialLetter, '')
  }

  static getAliasFromText = (str: string): string => {
    const regexpSpacialLetter =
      /[\_|\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s]+/g

    return str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
      .replace(/[ก-๙]/g, '')
      .replace(regexpSpacialLetter, '')
  }

  static getOnlyNumber = (str: string): string => {
    return str.replace(/\D/g, '')
  }

  static maskEmail = (email: string): string => {
    if (!email) {
      return ''
    }

    const [first, last] = email.split('@')
    const middle = Math.floor(first.length / 2)
    const before = first.substring(0, middle)
    const after = first.substring(middle, first.length)
    const masked = after.replaceAll(/./g, '*')

    return `${before + masked}@${last}`
  }
}
