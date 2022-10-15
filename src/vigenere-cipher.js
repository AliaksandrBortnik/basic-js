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

    let encrypted = '';
    let j = 0;

    for (let i = 0; i < message.length; i++) {
      const charCode = message[i].charCodeAt(0);

      if (this.isUpperCase(charCode)) {
        const keyCharCode = key[j % key.length].toUpperCase().charCodeAt();
        encrypted += String.fromCharCode((charCode + keyCharCode - 2 * 65) % 26 + 65);
        j++;
      } else if (this.isLowerCase(charCode)) {
        const keyCharCode = key[j % key.length].toLowerCase().charCodeAt();
        encrypted += String.fromCharCode((charCode + keyCharCode - 2 * 97) % 26 + 97);
        j++;
      } else {
        encrypted += message[i];
      }
    }

    return encrypted.toUpperCase();
  }

  decrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');

    let encrypted = '';
    let j = 0;

    for (let i = 0; i < message.length; i++) {
      const charCode = message[i].charCodeAt(0);

      if (this.isUpperCase(charCode)) {
        const keyCharCode = key[j % key.length].toUpperCase().charCodeAt();
        encrypted += String.fromCharCode((charCode - 65 + this.shiftKey(keyCharCode - 65)) % 26 + 65);
        j++;
      } else if (this.isLowerCase(charCode)) {
        const keyCharCode = key[j % key.length].toLowerCase().charCodeAt();
        encrypted += String.fromCharCode((charCode - 97 + this.shiftKey(keyCharCode - 97)) % 26 + 97);
        j++;
      } else {
        encrypted += message[i];
      }
    }

    return encrypted.toUpperCase();
  }

  shiftKey(key) {
    return (26 - key) % 26;
  }

  isUpperCase(char) {
    return 65 <= char && char <= 90;
  }

  isLowerCase(char) {
    return 97 <= char && char <= 122;
  }
}

module.exports = {
  VigenereCipheringMachine
};
