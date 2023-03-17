import TypewriterEffect from 'typewriter-effect';

type Props = {
  message: string;
};

const Typewriter = ({ message }: Props) => (
  <TypewriterEffect
    onInit={(typewriter) => {
      typewriter
        .changeDelay(50)
        .typeString(message)
        .callFunction((obj) => {
          obj.elements.cursor.remove();
        })
        .start();
    }}
    options={{
      wrapperClassName: 'font-gmcafe',
    }}
  />
);

export default Typewriter;
