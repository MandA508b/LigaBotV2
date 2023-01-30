import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {TableCell, TableRow} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {setSelectedLiga} from "../redux/ligas/ligasSlice";
import {useGetLigaByIdMutation} from "../redux/ligas/ligasApiSlice";
import {useFindTeamsByLigaIdMutation} from "../redux/teams/teamsApiSlice";

const LigaRow = ({liga, isSelected}) => {
    const dispatch = useDispatch()
    const handleSelectLiga = (id) => dispatch(setSelectedLiga(id))
    const [findTeamsByLigaId] = useFindTeamsByLigaIdMutation()
    const [teams, setTeams] = useState('')
    useEffect(()=>{
        const getTeams = async ()=>{
            let teams = ''
            const res = await findTeamsByLigaId({ligaId:liga._id})
            console.log(res)
            res.data.teams.forEach((team,i)=>teams+= i ? ', '+ team.name : '' + team.name)
            setTeams(teams)
        }
            getTeams()
    },[])
    return (
        <TableRow>
            <TableCell> <Checkbox checked={isSelected} onClick={()=>handleSelectLiga(liga._id)}/></TableCell>
            <TableCell align="center">{liga.name}</TableCell>
            <TableCell align="center">{liga.level}</TableCell>
            <TableCell align="center">{liga.status ? "Опублікований" : 'Не Опублікований'}</TableCell>
            <TableCell align="center">{liga.channelId}</TableCell>
            <TableCell align="center">{teams}</TableCell>
        </TableRow>
    );
};

export default LigaRow;