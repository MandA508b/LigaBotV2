import {apiSlice} from "../apiSlice";

export const teamsApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({

        fetchAllTeams: build.query({
            query: () => '/teams/findAll',
            providesTags:["Teams"]
        }),
        createTeam: build.mutation({
            query:body=>({
                url:'/teams/create',
                method:"POST",
                body
            }),
            invalidatesTags:["Teams"]
        }),
        updateTeam: build.mutation({
            query:body=>({
                url:'/teams/redact',
                method:"PUT",
                body
            }),
            invalidatesTags:["Teams"]
        }),
        deleteTeam: build.mutation({
            query:body=>({
                url:'/teams/delete',
                method:'DELETE',
                body
            }),
            invalidatesTags:["Teams"]
        }),
        findTeamsByLigaId: build.mutation({
            query:body=>({
                url:'/teams/findTeamsByLigaId',
                method:"POST",
                body
            })
        }),
        findTeamById:build.mutation({
            query: body=> ({
                url:'/teams/findTeamById',
                method:'POST',
                body
            })
        })
    })
})

export const {useFetchAllTeamsQuery, useCreateTeamMutation,useUpdateTeamMutation, useDeleteTeamMutation, useFindTeamsByLigaIdMutation, useFindTeamByIdMutation} = teamsApiSlice