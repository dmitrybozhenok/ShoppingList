import React,{Component} from 'react';
import {variables} from "./Variables.js";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';

export class ShoppingList extends Component{
    constructor(props){
        super(props);

        this.state={
            items:[],
            title:""
        }
    }

    refreshList(){
        fetch(variables.API_URL)
        .then(response=>response.json())
        .then(data=>{
            this.setState({items:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    render(){
        const {
            items
        } = this.state;

        const handleCompleteClick = async (id) => {
            let items = [...this.state.items];
            let item = items.find(item => {
                return item.id === id;
            });
            item.isComplete = !item.isComplete;

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            };
            await fetch(variables.API_URL + item.id, requestOptions)
            .then(response => {
                if (!response.ok) {
                  throw new Error();
                }})
                ;
            this.refreshList();          
          }
          
        const handleSubmitClick = async () => {
            let data = { title: this.state.title, isComplete: false}
            await fetch(variables.API_URL, {
                method: "POST", 
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data), 
              }).then(response => {
                if (!response.ok) {
                  throw new Error();
                }});
                this.setState({title:""})
                this.refreshList();
        }

        const handleDeleteClick = async (id) => {
            const requestOptions = {
                method: 'DELETE'
            };
            await fetch(variables.API_URL + id, requestOptions);
            this.refreshList()
        }

        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Stack>
                <TextField
                    value={this.state.title}
                    label="Enter the item"
                    onChange={(e) => {
                        this.setState({title:e.target.value});
                    }}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter'){
                            handleSubmitClick();
                        }}}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton edge="end" color="primary" onClick={() => handleSubmitClick()}>
                                    <CheckIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {items.map(i =>
                        <ListItem
                            key={i.title}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={()=>handleDeleteClick(i.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                            style={{ textDecoration : i.isComplete ? 'line-through' : 'none' }} 
                            disablePadding>
                            <ListItemButton role={undefined} onClick={()=>handleCompleteClick(i.id)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={items.find(item => {
                                            return item.id === i.id;
                                        }).isComplete !== false}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': i.id }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={i.id} primary={i.title} />
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
                </Stack>
                
            </div>
        )
    }
}