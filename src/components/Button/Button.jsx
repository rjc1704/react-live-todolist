import styles from "./Button.module.css";

export default function Button({
  variant = "default",
  shape = "pill",
  size = "md",
  iconSrc,
  disabled = false,
  onClick,
  type = "button",
  children,
  className,
  ...rest
}) {
  const cls = [
    styles.button,
    styles[variant],
    styles[shape],
    styles[`size-${size}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={cls}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {iconSrc && <img src={iconSrc} alt="" />}
      {shape === "pill" && children}
    </button>
  );
}
