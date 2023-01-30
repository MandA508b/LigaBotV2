import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {TableCell, TableRow} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {setSelectedTeam} from "../redux/teams/teamsSlice";
import {useGetLigaByIdMutation} from "../redux/ligas/ligasApiSlice";

const TeamRow = ({team, isSelected}) => {
    const dispatch = useDispatch()
    const handleSelectTeam = (id) => dispatch(setSelectedTeam(id))
    const [name, setName] = useState('')

    const [getLigaById] = useGetLigaByIdMutation()

    useEffect(()=>{
        const getName = async () =>{
            const ligaName = await getLigaById({ligaId:team.ligaId})
            setName(ligaName.data.liga.name)
            console.log(ligaName)
        }
        getName()
    },[])
    return (
        <TableRow>
            <TableCell> <Checkbox checked={isSelected} onClick={()=>handleSelectTeam(team._id)}/></TableCell>
            <TableCell align="center">{team.name}</TableCell>
            <TableCell align="center">{name}</TableCell>
            <TableCell align="center">{team.status ? "Опублікований" : 'Не Опублікований'}</TableCell>
        </TableRow>
    );
};

export default TeamRow;