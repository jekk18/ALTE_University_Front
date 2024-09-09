import React from 'react';
import Link from 'next/link';

const SeeLink = (props) => {
  return (
    <Link href={props.link}>{props.title}</Link>
  )
}

export default SeeLink;