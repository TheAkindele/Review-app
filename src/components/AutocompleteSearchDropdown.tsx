import React from 'react'
import styles from "../styles/components.module.scss"
import { IAutocompleteSearchDropdown } from '@/utils';

export const AutocompleteSearchDropdown = ({label, keyword, value, setKeyword, setSelected, setValue, options, placeholder}: IAutocompleteSearchDropdown) => {

    return (
        <div>
            <label className={styles.input_label}>{label}</label>
            <div>
                <div className={styles.select_input_row}>
                    <input
                        type="text"
                        value={keyword ? keyword : value}
                        placeholder={placeholder}
                        onChange={(e) => setKeyword(e.target.value)}
                        className={styles.select_input}
                    />
                    <span className={styles.cancel} onClick={() => {
                        setSelected && setSelected({username: "", avatar_url: ""})
                        setValue("")
                        setKeyword("")
                    }}>
                        &#x2715;
                    </span>
                </div>
                {options && keyword && (
                    <div className={styles.options_cont}>
                        {options?.map((item: any, i: number) => (
                            <p key={i} 
                                onClick={() => {
                                    setSelected && setSelected(item.value)
                                    setValue(item.value.username)
                                    setKeyword("")
                                }}
                                className={styles.option_row}
                            >
                                {item.label}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
