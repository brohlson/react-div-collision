import React, { useState } from 'react';
import styled from 'styled-components';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import Icon from './Icon';
import Global from './style/global';
import Reboot from './style/reset';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fafafa;
`;

const Block = styled.div`
  height: 100vh;
  width: 100%;
`;

const BlackBlock = styled(Block)`
  background: #222831;
`;

const GreyBlock = styled(Block)`
  background: #393e46;
`;

const GreenBlock = styled(Block)`
  background: #a3f7bf;
`;

const YellowBlock = styled(Block)`
  background: #e9ea77;
`;

const Credit = styled.div(
  props => `
width: 20rem;
position: fixed;
bottom: 2rem;
left: calc(50% - 10rem);
z-index: 100;
text-align: center;
display: flex;
flex-direction: column;
* {
  transition: .3s ease all;
  color: ${props.textLight ? 'white' : 'black'};;
}
a {
  text-decoration: underline;
}
`
);

export default function App() {
  const [light, setLight] = useState(false);
  const [textLight, setTextLight] = useState(false);

  const isColliding = (a, b) => {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();

    return !(
      aRect.top + aRect.height < bRect.top ||
      aRect.top > bRect.top + bRect.height ||
      aRect.left + aRect.width < bRect.left ||
      aRect.left > bRect.left + bRect.width
    );
  };

  const detectCollision = (id, handler) => {
    const darkElements = document.querySelectorAll('.dark');
    const myIcon = document.getElementById(id);
    const collisions = [];
    darkElements.forEach(currentElement =>
      collisions.push(isColliding(currentElement, myIcon))
    );
    handler(collisions.includes(true));
  };

  /**
   * Effect from scrolling (I'm lazy version)
   */
  useScrollPosition(() => {
    detectCollision('icon', setLight);
    detectCollision('text', setTextLight);
  });

  return (
    <Wrapper>
      <Global />
      <Reboot />
      <Icon light={light} />
      <YellowBlock />
      <BlackBlock className="dark" />
      <GreenBlock />
      <GreyBlock className="dark" />
      <Credit textLight={textLight} id="text">
        <p>Scroll down!</p>
        <small>
          smiley face by Denis Sazhin from the{' '}
          <a
            target="blank"
            href="https://thenounproject.com/term/smiley-face/472922/"
          >
            Noun Project
          </a>
        </small>
      </Credit>
    </Wrapper>
  );
}
