import { childProps, contextTypes, IRocketReviewItem} from "@/utils/interfaces";
import React, { createContext, useState } from "react";

export const AppContext = createContext<contextTypes>({
    reviewArray: [],
    addReview: (e: IRocketReviewItem) => Function,
    removeReview: (e: string) => Function,
    editReview: (e: IRocketReviewItem) => Function,
});


export const ContextProvider = ({ children }: childProps ) => {
    const [reviewArray, setRockReviewArray] = useState<IRocketReviewItem[]>([])

    const addReview = (newReview: IRocketReviewItem) => {
        const payload = (prev: IRocketReviewItem[]) => [newReview, ...prev]
        setRockReviewArray(payload)
    }

    const editReview = (updateObj: IRocketReviewItem) => {
        for (let i=0; i < reviewArray.length; i++) {
            if (reviewArray[i].id === updateObj.id) {
                reviewArray[i] = updateObj
            }
        }
    }

    const removeReview = (id: string) => {
        const filtered = reviewArray?.filter((item: IRocketReviewItem) => item.id !== id)
        setRockReviewArray(filtered)
    }

    return (
        <AppContext.Provider value={{reviewArray, addReview, editReview, removeReview}}> 
            {children}
        </AppContext.Provider>
    )
}