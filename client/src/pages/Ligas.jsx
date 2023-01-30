import React, {useEffect, useState} from 'react';
import {
    useCreateLigaMutation,
    useDeleteLigaMutation,
    useFetchAllLigasQuery,
    useUpdateLigaMutation
} from "../redux/ligas/ligasApiSlice";
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
    selectCurrentLigas,
    selectedLigasId,
    setAllSelectedLigas,
    setLigas
} from "../redux/ligas/ligasSlice";
import Checkbox from "@mui/material/Checkbox";
import LigaRow from "../components/LigaRow";

const Ligas = () => {
    const [name, setName] = useState("")
    const [level, setLevel] = useState("")
    const [newLevel, setNewLevel] = useState("")
    const [newName, setNewName] = useState('')
    const {data, isSuccess, isLoading} = useFetchAllLigasQuery()
    const dispatch = useDispatch()
    const ligas = useSelector(selectCurrentLigas)
    const selectedLigas = useSelector(selectedLigasId)
    const selectAllLigas = () => dispatch(setAllSelectedLigas())
    useEffect(() => {
        if (isSuccess) {
            console.log(data)
            dispatch(setLigas(data.teams))
            console.log(data.teams)
        }

    }, [data])
    const [updateLiga] = useUpdateLigaMutation()
    const [deleteLiga] = useDeleteLigaMutation()
    const [createLiga] = useCreateLigaMutation()
    const handlePublish = async (status) => {
        selectedLigas.forEach(async id => {
            const liga = ligas.find(liga => liga._id === id)
            const res = await updateLiga({ligaId: liga._id, data: {...liga, status}}).unwrap()
            console.log(res)
        })
    }
    const handleDelete = async () => {
        selectedLigas.forEach(async id => {
            const liga = ligas.find(liga => liga._id === id)
            const res = await deleteLiga({ligaId: liga._id}).unwrap()
            console.log(res)
        })
    }
    const handleCreate = async () => {
        if (!!name.length && !!level.length) await createLiga({name, level})
    }
    const handleChangeLevel = async () => {
        if (!!newLevel.length) {
            selectedLigas.forEach(async id => {
                const liga = ligas.find(liga => liga._id === id)
                console.log({ligaId: liga._id, data: {...liga, level: newLevel}})
                const res = await updateLiga({ligaId: liga._id, data: {...liga, level: newLevel}}).unwrap()
                console.log(res)
            })
        }
    }
    const handleRename = async ()=>{
        if(!!newName.length){
            selectedLigas.forEach(async id => {
                const liga = ligas.find(liga => liga._id === id)
                const res = await updateLiga({ligaId: liga._id, data: {...liga, name:newName}}).unwrap()
                console.log(res)
            })
        }
    }
    if (!isSuccess || isLoading) return <Typography textAlign={'center'}>Loading</Typography>

    return (
        <Stack sx={{width: '100vw', height: '100vh'}} display={'flex'} alignItems={'center'} padding={2}>
            {
                !selectedLigas.length ? null :
                    <Stack display={'flex'} alignItems={'center'} flexDirection={'row'} justifyContent={'space-between'} >
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
                                <TextField fullWidth onChange={e => setNewLevel(e.target.value)} label={'New Level'}/>
                                <Button variant={'contained'} onClick={handleChangeLevel}>Change</Button>
                            </Stack>
                        </ListItem>
                        <ListItem>
                            <Stack display={'flex'} flexDirection={'row'}  gap={1}>
                                <TextField fullWidth value={newName} onChange={e=>setNewName(e.target.value)} label='New Name'/>
                                <Button variant={'contained'} onClick={handleRename}>Rename</Button>
                            </Stack>
                        </ListItem>
                        <ListItem>
                            <Button variant={'contained'} color={'error'} onClick={handleDelete}>Delete</Button>
                        </ListItem>
                    </Stack>
            }
            <TableContainer sx={{
                maxWidth: 992,
                borderRadius: 2,
                boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;'
            }}>
                <Table sx={{minWidth: 650}} aria-label="simple table">

                    <TableHead>
                        <TableRow>
                            <TableCell> <Checkbox checked={selectedLigas?.length === ligas?.length}
                                                  onClick={() => selectAllLigas()}/></TableCell>
                            <TableCell variant={'head'} size={'small'} align="center">Name</TableCell>
                            <TableCell variant={'head'} size={'small'} align="center">Level</TableCell>
                            <TableCell variant={'head'} size={'small'} align="center">Status</TableCell>
                            <TableCell variant={'head'} size={'small'} align="center">Channel ID</TableCell>
                            <TableCell variant={'head'} size={'small'} align="center">Teams</TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {

                            ligas.map(liga => <LigaRow liga={liga} isSelected={selectedLigas.includes(liga._id)}
                                                       key={liga?.name}/>)

                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack display={'flex'} gap={1} flexDirection={'row'} margin={1}>
                <TextField label={'Name'} onChange={e => setName(e.target.value)}/>
                <TextField label={'Level'} onChange={e => setLevel(e.target.value)}/>
                <Button variant={'contained'} onClick={handleCreate}>Create</Button>
            </Stack>
        </Stack>
    );
};

export default Ligas;