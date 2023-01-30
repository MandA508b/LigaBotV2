import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {setSelectedChannel} from "../redux/channel/channelSlice";
import {TableCell, TableRow} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {useGetLeagueByIdMutation} from "../redux/leagues/leaguesApiSlice";



const ChannelRow = ({channel, isSelected}) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const [getLeagueById] = useGetLeagueByIdMutation()

    useEffect(()=>{
        const getName = async () =>{
            const leagueName = await getLeagueById({leagueId:channel.leagueId})
            setName(leagueName.data.league.name)
            console.log(leagueName)
        }
        getName()
    },[])
    const handleSelectChannel = (id) => {
        dispatch(setSelectedChannel(id))
    }
    return (
        <TableRow>
            <TableCell> <Checkbox checked={isSelected} onClick={()=>handleSelectChannel(channel._id)}/></TableCell>
            <TableCell align="center">{channel.name}</TableCell>
            <TableCell align="center">{channel.status ? "Опублікований" : 'Не Опублікований'}</TableCell>
            <TableCell align="center">{channel.status ? "Опублікований" : 'Не Опублікований'}</TableCell>
            <TableCell align="center">{channel.status ? "Опублікований" : 'Не Опублікований'}</TableCell>
            <TableCell align="center">{channel.status ? "Опублікований" : 'Не Опублікований'}</TableCell>
        </TableRow>
    );
};

export default ChannelRow;