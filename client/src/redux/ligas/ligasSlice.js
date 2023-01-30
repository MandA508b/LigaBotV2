import {createSlice} from "@reduxjs/toolkit"

const ligasState = createSlice({
    name: "ligas",
    initialState: {
        data: [],
        selectedLigasId: []
    },
    reducers: {
        setLigas: (state, action) => {
            state.data = action.payload
        },
        setAllSelectedLigas: (state, action) => {
            if (state.selectedLigasId.length === state.data.length) {
                state.selectedLigasId = []
            } else {
                state.selectedLigasId = state.data.map(liga => liga._id)
            }
        },
        setSelectedLiga: (state, action) => {
            if (state.selectedLigasId.includes(action.payload)) {
                state.selectedLigasId = state.selectedLigasId.filter(liga => liga !== action.payload)
            } else {
                state.selectedLigasId.push(action.payload)

            }
        },
        updateLiga: (state, action) => {
            state.selectedLigasId.forEach(ligaId => {
                console.log(state.data.find(liga => liga._id === ligaId))
            })
        }
    }
})

export const {setLigas, setAllSelectedLigas, setSelectedLiga, updateLiga} = ligasState.actions
export const selectCurrentLigas = state => state.ligas.data
export const selectedLigasId = state => state.ligas.selectedLigasId
export default ligasState.reducer