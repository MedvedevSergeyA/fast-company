import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";


const professionSlice = createSlice({
    name: "profession",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionRequested: (state) => {
            state.isLoading = true
        },
        professionReceved: (state, action) => {
            state.entities = action.payload
            state.lastFetch = Date.now()
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


function isOutDated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true
    }
    return false
}

export const loadProfessionList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().profession
    if (isOutDated(lastFetch)) {
    dispatch(professionRequested())
    try {
        const { content } = await professionService.get();
        dispatch(professionReceved(content))
    } catch (error) {
        dispatch(professionRequestFiled(error.message))
    }
    }
}
export const getProfession = () => (state) => state.profession.entities
export const getProfessionLoadingStatus = () => (state) => state.profession.isLoading

export const getProfessionByIds = (id) => (state) => {
    if (state.profession.entities) {
        return state.profession.entities.find((p) => p._id === id)
    }
}



export default professionReducer
