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

  /**
   * Determine if two things are touchin
   * https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
   */

  const isColliding = (a, b) => {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();

    return !(
      aRect.top + aRect.height < bRect.top ||
      aRect.top > bRect.top + bRect.height ||
      aRect.left + aRect.width < bRect.left ||
      aRect.left > bRect.left + bRect.width
    );
  };

  const detectCollision = (id, handler) => {
    /**
     * Gather ye dark elements
     */
    const darkElements = document.querySelectorAll('.dark');

    /**
     * Get your thing you passed in by ID
     */
    const myThing = document.getElementById(id);

    /**
     * Apparently you cant reduce a NodeList,
     * so we have to use forEach like dinosaurs.
     */
    const collisions = [];
    darkElements.forEach(currentElement =>
      collisions.push(isColliding(currentElement, myThing))
    );
    /**
     * If any are colliding, handle it with the state handler
     * we passed in.  You could probably just return a boolean
     * here too.  Thats probably better on second thought.
     */
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
