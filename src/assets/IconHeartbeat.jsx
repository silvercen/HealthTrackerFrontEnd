// icon:heartbeat | Tabler Icons https://tablericons.com/ | Csaba Kissi
import * as React from "react";

function IconHeartbeat(props) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M19.5 13.572L12 21l-2.896-2.868m-6.117-8.104A5 5 0 0112 7.006a5 5 0 117.5 6.572" />
      <path d="M3 13h2l2 3 2-6 1 3h3" />
    </svg>
  );
}

export default IconHeartbeat;
