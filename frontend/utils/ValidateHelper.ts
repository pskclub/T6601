export class ValidateHelper {
  static isSequentialCharacter = (str: string | any): boolean => {
    for (const i in str) {
      if (
        +str[+i + 1] === +str[i] + 1 &&
        +str[+i + 2] === +str[i] + 2 &&
        +str[+i + 3] === +str[i] + 3
      ) {
        return true
      }
    }

    for (const i in str) {
      if (
        String.fromCharCode(str.charCodeAt(i) + 1) === str[+i + 1] &&
        String.fromCharCode(str.charCodeAt(i) + 2) === str[+i + 2] &&
        String.fromCharCode(str.charCodeAt(i) + 3) === str[+i + 3]
      ) {
        return true
      }
    }

    return false
  }
}
