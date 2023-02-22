import React, { useContext } from 'react'
import styles from "@/styles/components.module.scss"
import { AppContext } from '@/context/AppContext'
import { IRocketReviewItem } from '@/utils'
import { Button } from './Button'


export const ReviewCard = ({avatar_url, title, id, rocketName, description, onClick, username}: IRocketReviewItem) => {
  const {removeReview} = useContext(AppContext) 

  return (
    <div className={styles.card_container}>
      <div className={styles.card_img} style={{backgroundImage: `url(${avatar_url})`}}></div>
      <div className={styles.card_details}>
        <div className={styles.card_text_row}>
          <p className={styles.card_text_title}>Title</p>
          <p className={styles.card_text}>{title}</p>
        </div>
        
        <div className={styles.card_text_row}>
          <p className={styles.card_text_title}>Rocket Name</p>
          <p className={styles.card_bold_text}>{rocketName}</p>
        </div>

        <div className={styles.card_text_row}>
          <p className={styles.card_text_title}>Description</p>
          <p className={styles.card_text}>{description}</p>
        </div>

        <div className={styles.card_text_row}>
          <p className={styles.card_text_title}>Creator</p>
          <p className={styles.card_bold_text}>{username}</p>
        </div>

        <div className={styles.card_btn_cont}>
          <Button
            text="Edit Card"
            type="button"
            className={styles.button_edit}
            onClick={() => onClick && onClick({avatar_url: avatar_url, title, id, rocketName, description, username: username})}
          />
          <Button
            text="Delete Card"
            type="button"
            className={styles.button_delete}
            onClick={() => removeReview(id)}
          />
        </div>
      </div>
    </div>
  )
}