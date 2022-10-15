/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect; // direct / reverse
  }

  encrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');

    let keyLetterNo = 0;

    const output = [...message].map(char => {
      // Encrypt only English alphabet. Leave 'as is' otherwise.
      if (!this.isEnglishLetter(char)) return char;

      const charCode = char.charCodeAt();
      const isUpperCase = this.isUpperCase(charCode);
      const baseCode = isUpperCase ? 65 : 97;
      const keyCharCode = isUpperCase ?
        key[keyLetterNo % key.length].toUpperCase().charCodeAt() :
        key[keyLetterNo % key.length].toLowerCase().charCodeAt();

      keyLetterNo++;
      return String.fromCharCode((charCode + keyCharCode - 2 * baseCode) % 26 + baseCode).toUpperCase();
    }).join('');

    return this.isDirect ? output : this.reverseMessage(output);
  }

  decrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');

    let keyLetterNo = 0;

    const output = [...message].map(char => {
      // Encrypt only English alphabet. Leave 'as is' otherwise.
      if (!this.isEnglishLetter(char)) return char;

      const charCode = char.charCodeAt();
      const isUpperCase = this.isUpperCase(charCode);
      const baseCode = isUpperCase ? 65 : 97;
      const keyCharCode = isUpperCase ?
        key[keyLetterNo % key.length].toUpperCase().charCodeAt() :
        key[keyLetterNo % key.length].toLowerCase().charCodeAt();

      keyLetterNo++;
      return String.fromCharCode((charCode - baseCode + this.shiftKey(keyCharCode - baseCode)) % 26 + baseCode).toUpperCase();
    }).join('');

    return this.isDirect ? output : this.reverseMessage(output);
  }

  reverseMessage(msg) {
    return [...msg].reverse().join('');
  }

  isEnglishLetter(char) {
    return char?.length === 1 && /[a-z]/i.test(char);
  }

  shiftKey(key) {
    return (26 - key) % 26;
  }

  isUpperCase(charCode) {
    return 65 <= charCode && charCode <= 90;
  }
}

module.exports = {
  VigenereCipheringMachine
};
