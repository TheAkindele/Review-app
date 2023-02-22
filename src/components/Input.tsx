import React from 'react'
import styles from "../styles/components.module.scss"
import { IInputProps } from '@/utils';


export const Input = ({label, placeholder, value, type, setValue, ...rest}: IInputProps) => {
  return (
    <div className={styles.input_container}>
        <label className={styles.input_label}>{label}</label>
       {type === "textarea" ?
            <textarea
                {...rest}
                className={styles.textarea}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={5}
            /> 
            :
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={styles.input}
            />
        }

    </div>
  )
}




