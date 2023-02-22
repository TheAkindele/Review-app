import { StaticImageData } from "next/image"
import { ReactNode } from "react"

export interface childProps {children: ReactNode}

export interface IUser {
    username: string
    avatar_url: string
}

export interface IRocketReviewItem {
    id: string
    title?: string
    rocketName?: string
    description?: string
    //user: IUser
    username?: string
    avatar_url?: string
    onClick?: (e?: {[k: string]: string | undefined}) => void
}

export interface IInputProps {
    label: string
    value: string
    type?: string
    placeholder: string
    setValue: (e?: any) => void  
}

export interface IAutocompleteSearchDropdown {
    label: string
    keyword?: string
    placeholder?: string
    selectedValue?: (e: IUser) => void
    value: string
    setValue: (e: string) => void
    setKeyword: (e: string) => void
    setSelected: (e?: IUser) => void
    options: {label: string, value: {[k:string]: string}}[]
}

export interface IDeleteItem {id: string}

export interface contextTypes {
    reviewArray: IRocketReviewItem[]
    singleReview?: IRocketReviewItem
    addReview: (e: IRocketReviewItem) => void
    editReview: (e: IRocketReviewItem) => void
    removeReview: (e: string) => void
}