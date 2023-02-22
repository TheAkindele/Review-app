import React from 'react'
import styles from "../styles/components.module.scss"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: () => void
    text: string
    btnType?: "delete" | "edit" | ""
    className?: string
}

export const Button = ({
	text,
  className,
	...rest
}: ButtonProps) => {

	return (
		<div className={styles.button_container}>
      <button
        {...rest}
        className={className ? className : styles.primary_button}
      >
        {text}
      </button>
    </div>
	);
};