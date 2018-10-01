import React from 'react';
import { Heading } from './common';

const Mentor = ({ firstName, lastName, headshot }) => (
  <figure css={`padding: 0 32px; text-align: center;`}>
    {headshot && (
      <img
        src={headshot}
        css={`
          border-radius: 100px;
          width: 120px;
          margin-bottom: 10px;
        `}
      />
    )}
    <figcaption>{`${firstName} ${lastName}`}</figcaption>
  </figure>
);

export const MentorList = ({ people }) => (
  <section css={`margin-bottom: 32px;`}>
    <Heading>On-Site Mentorship By</Heading>
    <div css="display: flex; justify-content:center">
      {people.map((person, i) => (
        <Mentor
          key={i}
          firstName={person.firstName.rendered}
          lastName={person.lastName.rendered}
          headshot={person.headshot.src}
        />
      ))}
    </div>
  </section>
);

export default MentorList;
