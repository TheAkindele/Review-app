import Error from 'next/error'
import React, { useState, useEffect, useContext, SetStateAction, Dispatch } from 'react'
import { Input, AutocompleteSearchDropdown, Button} from '@/components'
import styles from "@/styles/components.module.scss"
import { v4 as uuid } from 'uuid';
import { AppContext } from '@/context/AppContext'
import { IRocketReviewItem, IUser } from '@/utils';
import { useDebounce } from "use-debounce";
import { useQuery } from '@tanstack/react-query';
import axios from "axios"

interface IFormProps {
  editObj?: IRocketReviewItem
  setSingleRocket?: Dispatch<SetStateAction<IRocketReviewItem | undefined>>
  setEdit: Dispatch<SetStateAction<boolean>>
  editCard: Boolean
}

export const ReviewForm = ({editObj, setSingleRocket, setEdit, editCard}: IFormProps) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [rocketName, setRocketName] = useState("")
  const [options, setOptions] = useState<{[key: string]: string}[] | []>([]) //{[key: string]: string}[]
  const [keyword, setKeyword] = useState("")
  const [value, setValue] = useState<string>("")
  const [username, setUsername] = useState("")
  const [avatar, setAvatar] = useState("")
  const [selectedValue, setSelectedValue] = useState<IUser | undefined>() 

  const [debounceValue] = useDebounce(keyword, 500)

  const {addReview, editReview} = useContext(AppContext)

  const getSelectGithubUser = ({username, avatar_url}: IUser) => {
    setUsername(username)
    setAvatar(avatar_url)
  }


  const {data, isError, isLoading} = useQuery(
      ["search-users", debounceValue, keyword],
      async () => await axios.get(`https://api.github.com/search/users?q=${debounceValue}`),
      {
        onSuccess: ((res) => {
          setOptions(res?.data?.items)
        }),
        retry: 0,
        enabled: !!(debounceValue)
      }
  )

  const createRocketReview = () => {
    if (editCard && editObj ) { 
      let reviewDetails = {...editObj}
      if (title) Object.defineProperties(reviewDetails, {title: {value: title, writable: true, enumerable: true}})
      if (rocketName) Object.defineProperties(reviewDetails, {rocketName: {value: rocketName, writable: true, enumerable: true}})
      if (description) Object.defineProperties(reviewDetails, {description: {value: description, writable: true, enumerable: true}})
      if (selectedValue?.username && selectedValue.avatar_url) {
        Object.defineProperties(reviewDetails, {
          username: {value: selectedValue?.username, writable: true, enumerable: true},
          avatar_url: {value: selectedValue?.avatar_url, writable: true, enumerable: true}
        })
      } 
     
      editReview(reviewDetails)
      setSingleRocket && setSingleRocket({username: "", id: "", description: "", title: "", rocketName: ""})
      setEdit(false)
      // 
    }
    
    else {
      let reviewDetails = {id: uuid(), title, description, rocketName, avatar_url: selectedValue?.avatar_url, username: selectedValue?.username}
      addReview(reviewDetails)
    } 

    setTitle("")
    setDescription("")
    setRocketName("")
    setKeyword("")
    setSelectedValue({username: "", avatar_url: ""})
    setValue("")
  }

  return (
    <div>
      <form className={styles.form}>
        <Input
          label="Title"
          placeholder={editObj?.title || "Enter title"}
          value={title}
          setValue={setTitle}
        />

        <Input
          label="Rocket Name"
          placeholder={editObj?.rocketName || "Enter rocket name"}
          value={rocketName}
          setValue={setRocketName}
        />

        <Input
          label="Description"
          placeholder={editObj?.description || "Enter description"}
          type="textarea"
          value={description}
          setValue={setDescription}
        />

        <AutocompleteSearchDropdown
          label="Select Github user"
          keyword={keyword}
          setKeyword={setKeyword}
          value={value}
          setValue={setValue}
          selectedValue={getSelectGithubUser}
          placeholder={editObj?.username || "Select Github user"}
          setSelected={setSelectedValue}
          options={options?.map((item: {[k: string]: string}, i: number) => ({
            label: item.login,
            value: {username: item.login, avatar_url: item.avatar_url},
          }))}
        />

        <Button
          text={editObj ? "Edit Rocket" : "Create New Rocket"}
          type="button"
          className={styles.button_primary}
          onClick={() => createRocketReview()}
        />
      </form>
    </div>
  )
}