/* eslint-disable quotes */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Text from '../components/Text';
import SEO from '../components/SEO';

const Wrapper = styled.div`
  width: 42rem;
  max-width: 100%;
  text-align: center;
`;

export default function About() {
  return (
    <Wrapper>
      <SEO
        title="About | Parcel-React Serverless Starter"
        meta="Read more about the project here."
      />
      <Text.P text={'About'} />
      <Link to="/">
        <button>Back home</button>
      </Link>
    </Wrapper>
  );
}
