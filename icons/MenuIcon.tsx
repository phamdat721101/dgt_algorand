const MenuIcon = (props: { bgColor: string; iconColor: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={`${props.bgColor}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M21 7H3V5H21V7ZM21 13H3V11H21V13ZM3 19H21V17H3V19Z"
      fill={`${props.iconColor}`}
    />
  </svg>
);

export default MenuIcon;
