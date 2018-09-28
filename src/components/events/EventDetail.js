import React from 'react';
import * as R from 'ramda';
import { COLORS } from '../common';
import RichText from "../RichText";
import Link from "gatsby-link";
import slugify from "slugify";

const EventDetail = ({
  eventId,
  title,
  slug,
  date,
  location,
  venue,
  summary,
  tags,
  mentors,
  description,
}) => {
  const mentorNames = mentors.targetItems.map(
    v => `${v.firstName.rendered} ${v.lastName.rendered}`
  );
  const truncatedDescription = `${R.take(
    40,
    R.split(' ', description.rendered)
  ).join(' ')}...`;
  const eventPath = slugify(title.rendered);

  return (
    <article
      css={`
        height: 100%;
        padding: 1rem 3rem;
        background-color: #fff;
        box-shadow: 6px 6px 20px #ccc;
      `}
    >
      <h4
        css={`
          font-size: 1.6rem;
          padding: ;
        `}
      >
        {title.rendered}
      </h4>
      <p
        css={`
          font-size: 12px;
          margin-bottom: 0.6rem;
          text-transform: uppercase;
          color: #999;
          line-height: 1.4;
        `}
      >
        {venue.rendered}
      </p>
      <p
        css={`
          font-size: 14px;
          line-height: 1.4;
          color: #999;
          font-style: italic;
          margin-bottom: 0.5rem;
        `}
      >
        Hosted By {mentorNames.join(', ')}
      </p>
      <RichText body={truncatedDescription} />
      <Link
        to={`/events/${eventPath}`}
        css={`
          background-color: ${COLORS.awesome.string()};
          display: block;
          padding: 0.6rem 0.8rem;
          font-size: 0.9rem;
          width: 40%;
          margin: 0 auto;
          color: #fff;
          text-decoration: none;
          text-transform: uppercase;
          text-align: center;
          font-weight: 700;
          transition: background-color 0.2s ease-out;

          &:hover {
            background-color: ${COLORS.lapis.string()};
          }
        `}
      >
        More Info
      </Link>
    </article>
  );
};

export default EventDetail;
