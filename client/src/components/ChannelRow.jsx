import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {setSelectedChannel} from "../redux/channel/channelSlice";
import {TableCell, TableRow} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {useGetLigaByIdMutation} from "../redux/ligas/ligasApiSlice";



const ChannelRow = ({channel, isSelected}) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const [getLigaById] = useGetLigaByIdMutation()

    useEffect(()=>{
        const getName = async () =>{
            const ligaName = await getLigaById({ligaId:channel.ligaId})
            setName(ligaName.data.liga.name)
            console.log(ligaName)
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