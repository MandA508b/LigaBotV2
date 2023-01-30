import React, {useEffect, useState} from 'react';
import {
    useCreateChannelMutation,
    useDeleteChannelMutation,
    useFetchAllChannelQuery,
    useUpdateChannelMutation
} from "../redux/channel/channelApiSlice";
import {
    Button,
    ListItem, MenuItem, Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField, Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
    selectCurrentChannel,
    selectedChannelId,
    setAllSelectedChannel,
    setChannel
} from "../redux/channel/channelSlice";
import Checkbox from "@mui/material/Checkbox";
import ChannelRow from "../components/ChannelRow";

function refreshPage() {
    window.location.reload(false);
}

const Channel = () => {
    const [name, setName] = useState("")
    const [newName, setNewName] = useState("")


    const {data, isSuccess, isLoading} = useFetchAllChannelQuery()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isSuccess) {
            console.log(data)
            dispatch(setChannel(data.channels))
        }
    }, [data])
    const cities = useSelector(selectCurrentChannel)
    const selectedChannel = useSelector(selectedChannelId)
    const selectAllChannel = () => dispatch(setAllSelectedChannel())


    const [updateChannel] = useUpdateChannelMutation()
    const [deleteChannel] = useDeleteChannelMutation()
    const [createChannel] = useCreateChannelMutation()
    const handlePublish = async (status) => {
        selectedChannel.forEach(async id => {
            const channel = cities.find(channel => channel._id === id)
            await updateChannel({channelId: channel._id, data: {...channel, status}}).unwrap()
        })
    }
    const handleDelete = async () => {
        selectedChannel.forEach(async id => {
            const channel = cities.find(channel => channel._id === id)
            console.log({channelId: channel._id})
            await deleteChannel({channelId: channel._id}).unwrap()
        })
    }
    const handleCreate = async () => {
        console.log(name)
        if (!!name.length) await createChannel({name})
    }
    const handleRename = async () => {
        if (!!newName.length) {
            console.log(selectedChannel)
            selectedChannel.forEach(async id => {
                const channel = cities.find(channel => channel._id === id)
                console.log({channelId: channel._id, data: {...channel, name: newName}})
                const res = await updateChannel({channelId: channel._id, data: {...channel, name: newName}}).unwrap()
                console.log(res)
            })
        }
    }

    if (!isSuccess || isLoading) return <Typography
        textAlign={'center'}>Loading</Typography>

    return (
        <Stack sx={{width: '100vw', height: '100vh'}} display={'flex'} alignItems={'center'} padding={2}>
            {
                !selectedChannel.length ? null :
                    <Stack display={'flex'} alignItems={'flex-end'} flexDirection={'row'}
                           justifyContent={'space-between'}>


                        <ListItem>
                            <Select defaultValue={false} sx={{width: '200px'}}
                                    onChange={(e) => handlePublish(e.target.value)}>
                                <MenuItem value={false}>
                                    Не Опублікований
                                </MenuItem>
                                <MenuItem value={true}>
                                    Опублікований
                                </MenuItem>
                            </Select>
                        </ListItem>
                        <ListItem>
                            <Stack display={'flex'} flexDirection={'row'} gap={1}>
                                <TextField sx={{width: 140}} value={newName} onChange={e => setNewName(e.target.value)}
                                           label='New Name'/>
                                <Button variant={'contained'} onClick={handleRename}>Rename</Button>
                            </Stack>
                        </ListItem>
                        <ListItem>
                            <Button sx={{height: 54}} color={'error'} variant={'contained'}
                                    onClick={handleDelete}>Delete</Button>
                        </ListItem>


                    </Stack>
            }
            <TableContainer sx={{
                maxWidth: 992,
                borderRadius: 2,
                boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;'
            }}>
                <Table sx={{minWidth: 150}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell> <Checkbox checked={selectedChannel?.length === cities?.length}
                                                  onClick={() => selectAllChannel()}/></TableCell>
                            <TableCell align="center">Channel ID</TableCell>
                            <TableCell align="center">Number</TableCell>
                            <TableCell align="center">League</TableCell>
                            <TableCell align="center">URL</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            cities.map(channel => <ChannelRow channel={channel}
                                                              isSelected={selectedChannel.includes(channel._id)}
                                                              key={channel?.name}/>)

                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack display={'flex'} gap={1} flexDirection={'row'} margin={1} alignItems={'flex-end'}>
                <TextField label={'Name'} onChange={e => setName(e.target.value)}/>


                <Button sx={{height: '78%'}} variant={'contained'} onClick={handleCreate}>Create</Button>
            </Stack>
        </Stack>
    );
};

export default Channel;