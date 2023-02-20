import React from 'react'
import styles from "@styles/components.module.scss"

interface IButton {
    onClick: () => void
    text: string
}

export const Button = ({onClick, text}: IButton) => {
  return (
    <>
    <button className={styles.primary_button}
        onClick={onClick}
    >
        {text}
    </button>
    </>
  )
}