const LENGTH = 12;
const CHARSET = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789';

const generatePassword = (): string => {
  const passArr = [];

  for (let i = 0; i < LENGTH; i++) {
    passArr.push(CHARSET.charAt(Math.random() * CHARSET.length));
  }

  return passArr.join('');
};

export default generatePassword;
