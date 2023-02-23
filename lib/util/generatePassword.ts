const LENGTH = 12;
const CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ023456789';

const generatePassword = (): string => {
  const passArr = [];

  for (let i = 0; i < LENGTH; i++) {
    passArr.push(CHARSET.charAt(Math.random() * CHARSET.length));
  }

  return passArr.join('');
};

export default generatePassword;
