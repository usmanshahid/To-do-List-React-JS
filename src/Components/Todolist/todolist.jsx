import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, Container, Box, Typography, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function TodoList() {
    const [todo, setTodo] = useState("");
    const [alltodoes, setAlltodoes] = useState([]);
    const [deletedItems, setDeletedItems] = useState([]);
    const [editedTodo, setEditedTodo] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [showDeletedItems, setShowDeletedItems] = useState(false);

    const handleAdd = () => {
        const newTodo = { id: uuidv4(), todo, isCompleted: false };
        setAlltodoes([...alltodoes, newTodo]);
        setTodo("");
    };

    const handleEdit = (id) => {
        const todoToEdit = alltodoes.find(item => item.id === id);
        setEditedTodo({ ...todoToEdit });
        setEditingId(id);
    };

    const handleEditSubmit = () => {
        // Update the edited todo item
        const updatedTodos = alltodoes.map(todoItem => {
            if (todoItem.id === editedTodo.id) {
                return { ...todoItem, todo: editedTodo.todo };
            }
            return todoItem;
        });
        setAlltodoes(updatedTodos);
        setEditedTodo(null);
        setEditingId(null);
    };

    const handleDelete = (id) => {
        const deletedItem = alltodoes.find(item => item.id === id);
        setDeletedItems([...deletedItems, deletedItem]);
        const newTodos = alltodoes.filter(item => item.id !== id);
        setAlltodoes(newTodos);
    };

    const handleChange = (e) => {
        setTodo(e.target.value);
    };

    const toggleDeletedItems = () => {
        setShowDeletedItems(!showDeletedItems);
    };

    return (
        <Container maxWidth="xl">
            <Box
                sx={{
                    backgroundColor: "#5D4A39",
                    height: "100vh",
                }}
            >
                <Container maxWidth="sm">
                    <Box sx={{
                        paddingTop: "50px"
                    }}>
                        <Box
                            sx={{
                                backgroundColor: '#091B1A',
                                padding: 3,
                                borderRadius: 2,
                                paddingTop: 4,
                            }}
                        >
                            <TextField
                                label="Click Here "
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                                value={todo}
                                InputLabelProps={{ style: { color: 'white' } }}
                                InputProps={{ style: { color: 'white' } }}
                            />
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: "20px"
                            }}>
                                <Button variant="contained" color="secondary" onClick={handleAdd} >
                                    ADD
                                </Button>

                                <Button variant="contained" color="secondary" onClick={toggleDeletedItems} >
                                    {showDeletedItems ? 'Hide Deleted Items' : 'View Deleted List'}
                                </Button>
                            </Box>

                            <Box>
                                {alltodoes.length === 0 ? (
                                    <Typography sx={{ fontSize: "20px", color: 'white', marginTop: "10px" }}>No Todos</Typography>
                                ) : (
                                    <>
                                        <Typography sx={{ fontSize: "20px", color: 'white', marginTop: "10px" }}> Todo List</Typography>
                                        {alltodoes.map((item, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    marginTop: '10px'
                                                }}
                                            >
                                                {editingId === item.id ? (
                                                    <TextField
                                                        value={editedTodo.todo}
                                                        onChange={(e) => setEditedTodo({ ...editedTodo, todo: e.target.value })}
                                                        onBlur={handleEditSubmit}
                                                        autoFocus
                                                    />
                                                ) : (
                                                    <Typography sx={{ fontSize: '20px', color: 'white', marginRight: '20px' }}>{item.todo}</Typography>
                                                )}
                                                <Box>
                                                    <Button variant="contained" color="secondary" onClick={() => handleEdit(item.id)}>
                                                        <EditIcon />
                                                    </Button>
                                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(item.id)} sx={{ marginLeft: '20px' }}>
                                                        <DeleteIcon />
                                                    </Button>
                                                </Box>
                                            </Box>
                                        ))}
                                    </>
                                )}
                            </Box>

                            {showDeletedItems && (
                                <Box sx={{ marginTop: '20px' }}>
                                    <Typography variant="h5" sx={{ color: 'white' }}>Deleted Items</Typography>
                                    {deletedItems.map((item, index) => (
                                        <Typography key={index} sx={{ color: 'white' }}>{item.todo}</Typography>
                                    ))}
                                </Box>
                            )}

                        </Box>
                    </Box>
                </Container>
            </Box >
            {/* Edit Modal */}
            <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: 3,
                        borderRadius: 2,
                    }}
                >
                    <TextField
                        label="Edit Todo"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={editedTodo ? editedTodo.todo : ""}
                        onChange={(e) => setEditedTodo({ ...editedTodo, todo: e.target.value })}
                    />
                    <Button variant="contained" color="primary" onClick={handleEditSubmit}>Save</Button>
                </Box>
            </Modal>
        </Container >
    );
}

export default TodoList;
