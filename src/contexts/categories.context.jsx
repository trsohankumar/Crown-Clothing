import { createContext, useEffect, useState } from "react";

import {getCategoriesAndDocument} from '../utils/firebase/firebase.utils.js'

export const CategoriesContext = createContext({
    categoriesMap: {},
})


export const CategoriesProvider = ({children}) => {
    const [categoriesMap,setCategoriesMap] = useState({})

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocument();
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap()
    },[])

    //code to store values into the database
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // }, [])
    const value = {categoriesMap}

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
}