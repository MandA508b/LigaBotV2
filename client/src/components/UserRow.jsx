import React, {useEffect, useState} from 'react';
import {TableCell, TableRow} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {useDispatch} from "react-redux";
import {setSelectedUser} from "../redux/users/usersSlice";
import {useFindTeamByIdMutation} from "../redux/teams/teamsApiSlice";
import {useGetLigaByIdMutation} from "../redux/ligas/ligasApiSlice";

const UserRow = ({data, isSelected}) => {
    const dispatch = useDispatch()
    const handleSelectUser = (id) => dispatch(setSelectedUser(id))
    const [team, setTeam] = useState('-')
    const [liga, setLiga] = useState('-')
    const [findTeamById] = useFindTeamByIdMutation()
    const [findLigaById] = useGetLigaByIdMutation()
    useEffect(()=>{
        const getTeam = async ()=>{
            if(data.teamId!=='0'){
                console.log(data.teamId)
                const res = await findTeamById({id:data.teamId})
                setTeam(res.data.teams.name)
                console.log(res)
            }

        }
        const getLiga = async ()=>{
            console.log(data.ligaId)
            if(data.ligaId!=='0'){
                console.log(data.teamId)
                const res = await findLigaById({ligaId:data.ligaId})
                setLiga(res.data.liga.name)
                console.log(res.data)
            }

        }
        getLiga()
        getTeam()
    },[])
    return (
        <TableRow sx={{background: data.isBlocked ? 'grey':'inherit'}}>
            <TableCell> <Checkbox checked={isSelected} onClick={()=>handleSelectUser(data._id)}/></TableCell>
            <TableCell align="center">{data.name}</TableCell>
            <TableCell align="center">{data.username}</TableCell>
            <TableCell align="center">{data.registrationDate?.split(".")[0].replace("T",' ')}</TableCell>
            <TableCell align="center">{data.status ? "Опублікований" : 'Не Опублікований'}</TableCell>
            <TableCell align="center">{data.role}</TableCell>
            <TableCell align="center">{team}</TableCell>
            <TableCell align="center">{liga}</TableCell>
        </TableRow>
    );
};

export default UserRow;