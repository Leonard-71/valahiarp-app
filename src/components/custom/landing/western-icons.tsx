import { SVGProps } from "react";

export function HorseshoeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 4.5c-2.4 1.4-4 4.4-4 7.8 0 4.4 2.6 7.7 6 7.7 1.1 0 1.6-.9 1.6-1.8V16l-2.2-.6V8.8C8.4 6.8 9.6 5.6 12 5.6s3.6 1.2 3.6 3.2v6.6L13.4 16v1.6c0 .9.5 1.8 1.6 1.8 3.4 0 6-3.3 6-7.7 0-3.4-1.6-6.4-4-7.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LanternIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M9 4h6M12 4v2M8 8h8v8c0 2.2-1.8 3.5-4 3.5S8 18.2 8 16V8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M10 11h4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function SheriffStarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 2.5 13.8 8h5.7l-4.6 3.4 1.8 5.6L12 13.8 7.3 17l1.8-5.6L4.5 8h5.7L12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RevolverIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3 10.5h10.5l2.2-2.2H21M13.5 10.5v3.2c0 1.4-1.1 2.5-2.5 2.5H9.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="7.2" cy="16.4" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
