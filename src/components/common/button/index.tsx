import { ButtonHTMLAttributes, forwardRef, memo } from "react";
import classnames from 'classnames';
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  startIcon?: string;
  endIcon?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      startIcon,
      endIcon,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={classnames(styles.button, 'button', className)}
        {...rest}
      >
        {startIcon && (
          <span className={classnames(styles.icon, 'icon', startIcon)}></span>
        )}
        {children}
        {endIcon && (
          <span className={classnames(styles.icon, 'icon', endIcon)}></span>

        )}
      </button>
    )
  }
);

export default memo(Button);
