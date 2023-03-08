import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { Engine } from 'tsparticles-engine';

const Confetti = () => {
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };
  return (
    <Particles
      init={particlesInit}
      options={{
        emitters: [
          {
            position: {
              x: 0,
              y: 30,
            },
            rate: {
              quantity: 8,
              delay: 0.15,
            },
            particles: {
              move: {
                direction: 'top-right',
                outModes: {
                  top: 'none',
                  left: 'none',
                  default: 'destroy',
                },
              },
            },
          },
          {
            position: {
              x: 100,
              y: 30,
            },
            rate: {
              quantity: 8,
              delay: 0.15,
            },
            particles: {
              move: {
                direction: 'top-left',
                outModes: {
                  top: 'none',
                  right: 'none',
                  default: 'destroy',
                },
              },
            },
          },
        ],
        particles: {
          color: {
            value: ['#8946ab', '#ffffff', '#ff7dbd', '#ffb8d9'],
          },
          move: {
            decay: 0.05,
            direction: 'top',
            enable: true,
            gravity: {
              enable: true,
            },
            outModes: {
              top: 'none',
              default: 'destroy',
            },
            speed: {
              min: 10,
              max: 50,
            },
          },
          number: {
            value: 0,
          },
          opacity: {
            value: 1,
          },
          rotate: {
            value: {
              min: 0,
              max: 360,
            },
            direction: 'random',
            animation: {
              enable: true,
              speed: 30,
            },
          },
          tilt: {
            direction: 'random',
            enable: true,
            value: {
              min: 0,
              max: 360,
            },
            animation: {
              enable: true,
              speed: 30,
            },
          },
          size: {
            value: {
              min: 2,
              max: 4,
            },
            animation: {
              enable: true,
              startValue: 'min',
              count: 1,
              speed: 16,
              sync: true,
            },
          },
          roll: {
            enable: true,
            speed: {
              min: 5,
              max: 15,
            },
          },
          wobble: {
            distance: 30,
            enable: true,
            speed: {
              min: -7,
              max: 7,
            },
          },
          shape: {
            type: ['circle', 'square'],
            options: {},
          },
        },
      }}
    />
  );
};

export default Confetti;
