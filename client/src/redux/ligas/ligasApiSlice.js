import {apiSlice} from "../apiSlice";

export const ligasApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({

        fetchAllLigas: build.query({
            query: () => '/ligas/findAll',
            providesTags:["Ligas"]
        }),
        createLiga: build.mutation({
            query:body=>({
                url:'/ligas/create',
                method:"POST",
                body
            }),
            invalidatesTags:["Ligas"]
        }),
        updateLiga: build.mutation({
            query:body=>({
                url:'/ligas/redact',
                method:"PUT",
                body
            }),
            invalidatesTags:["Ligas"]
        }),
        deleteLiga: build.mutation({
            query:body=>({
                url:'/ligas/delete',
                method:'DELETE',
                body
            }),
            invalidatesTags:["Ligas"]
        }),
        getLigaById: build.mutation({
            query:body=>({
                url:'/ligas/getLigaById',
                method:"POST",
                body
            })
        })
    })
})

export const {useFetchAllLigasQuery, useCreateLigaMutation,useUpdateLigaMutation, useDeleteLigaMutation,useGetLigaByIdMutation} = ligasApiSlice