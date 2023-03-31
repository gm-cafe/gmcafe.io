import TypewriterEffect from 'typewriter-effect';

type Props = {
  message: string;
  onStart?: () => void;
  onFinish?: () => void;
};

const Typewriter = ({ message, onStart, onFinish }: Props) => (
  <TypewriterEffect
    onInit={(typewriter) => {
      typewriter
        .changeDelay(50)
        .callFunction(() => onStart && onStart())
        .typeString(message)
        .callFunction((obj) => {
          obj.elements.cursor.remove();
          onFinish && onFinish();
        })
        .start();
    }}
    options={{
      wrapperClassName: 'font-gmcafe',
    }}
  />
);

export default Typewriter;
