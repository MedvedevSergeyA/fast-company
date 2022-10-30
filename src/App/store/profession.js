import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";


const professionSlice = createSlice({
    name: "profession",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        professionRequested: (state) => {
            state.isLoading = true
        },
        professionReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        professionRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
}
    }
})


const { reducer: professionReducer, actions } = professionSlice

const { professionRequested, professionReceved, professionRequestFiled } = actions

export const loadProfessionList = () => async (dispatch) => {
    dispatch(professionRequested())
    try {
        const { content } = await professionService.get();
        dispatch(professionReceved(content))
    } catch (error) {
        dispatch(professionRequestFiled(error.message))
    }
}
export const getProfession = () => (state) => state.profession.entities
export const getProfessionLoadingStatus = () => (state) => state.profession.isLoading

export const getProfessionByIds = (professionIds) => (state) => {
    if (state.profession.entities) {
        const professionArray = []
        for (const professionId of professionIds) {
            for (const profession of state.qualities.entities) {
                if (profession.id === professionId) {
                    professionArray.push(profession)
                    break
                }
            }
        }
        return professionArray
    }
    return []
}



export default professionReducer
