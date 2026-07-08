import type { ReactNode } from 'react';

type AppButtonVariant = 'primary' | 'secondary' | 'ghost';

type AppButtonProps = {
  'aria-label'?: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  download?: boolean;
  href?: string;
  rel?: string;
  target?: string;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: AppButtonVariant;
};

export function AppButton({
  children,
  className,
  disabled = false,
  download = false,
  href,
  rel,
  target,
  type = 'button',
  variant = 'primary',
  ...props
}: AppButtonProps) {
  const classes = ['button', variant, disabled ? 'is-disabled' : '', className].filter(Boolean).join(' ');
  const external = href?.startsWith('http');

  if (disabled) {
    return (
      <span aria-disabled="true" className={classes} role="button" tabIndex={-1} {...props}>
        {children}
      </span>
    );
  }

  if (href) {
    return (
      <a
        className={classes}
        download={download || undefined}
        href={href}
        rel={rel ?? (external ? 'noopener noreferrer' : undefined)}
        target={target ?? (external ? '_blank' : undefined)}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}
