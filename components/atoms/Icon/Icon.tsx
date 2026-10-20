import type { SVGProps } from "react";

const paths = {
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  phone: (
    <path d="M5 3.5h3.2l1.6 4.2-2 1.3a11 11 0 0 0 7.2 7.2l1.3-2 4.2 1.6V19a1.5 1.5 0 0 1-1.5 1.5A16.5 16.5 0 0 1 3.5 5 1.5 1.5 0 0 1 5 3.5z" />
  ),
  chat: (
    <>
      <path d="M4 4.5h16v11H10l-6 4.5v-15.5z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" />
      <path d="M3 6.5l9 6.5 9-6.5" />
    </>
  ),
  camera: (
    <>
      <rect x="3" y="7" width="18" height="13" />
      <path d="M8.5 7l1.5-2.5h4L15.5 7" />
      <circle cx="12" cy="13.5" r="3.5" />
    </>
  ),
  menu: <path d="M3 7h18M3 12h18M3 17h18" />,
  close: <path d="M5 5l14 14M19 5L5 19" />,
  chevL: <path d="M15 3l-9 9 9 9" />,
  chevR: <path d="M9 3l9 9-9 9" />,
  chevD: <path d="M5 9l7 7 7-7" />,
  arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
};

export type IconName = keyof typeof paths;
export const iconNames = Object.keys(paths) as IconName[];

type IconProps = Omit<SVGProps<SVGSVGElement>, "name" | "stroke"> & {
  name: IconName;
  size?: number;
  stroke?: number;
};

export function Icon({ name, size = 24, stroke = 1.5, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      className={className ? `block flex-none ${className}` : "block flex-none"}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
