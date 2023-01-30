import React from 'react';
import {useDispatch} from "react-redux";
import {setSelectedChannel} from "../redux/channel/channelSlice";
import {TableCell, TableRow} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";



const ChannelRow = ({channel, isSelected}) => {
    const dispatch = useDispatch()

    const handleSelectChannel = (id) => {
        dispatch(setSelectedChannel(id))
    }
    return (
        <TableRow>
            <TableCell> <Checkbox checked={isSelected} onClick={()=>handleSelectChannel(channel._id)}/></TableCell>
            <TableCell align="center">{channel.name}</TableCell>
            <TableCell align="center">{channel.status ? "Опублікований" : 'Не Опублікований'}</TableCell>
        </TableRow>
    );
};

export default ChannelRow;