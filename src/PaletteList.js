import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette' ;
import './styles/main.scss'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { ListItemButton } from '@mui/material';
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import { Check, Close } from '@mui/icons-material';
import { red, blue } from "@mui/material/colors";


const PaletteList = ({palettes, deletePalette}) => {

    const [deleteDialog, setdeleteDialog] = useState(false);
    const [deleteingId, setdeletingId] = useState('')

    const openDialog = (id) => {
        setdeleteDialog(true)
        setdeletingId(id)
    }

    const closeDialog = () => {
        setdeleteDialog(false)
        setdeletingId('')
    }
   
    const handleDelete = () => {
        deletePalette(deleteingId)
        closeDialog()
    }
    return (
      <div className="palette-list">
        <div className="pl-container">
          <nav className="pl-nav">
            <h1 className="pl-heading">React Colors</h1>
            <Link to={"/Color-App/palette/new"}>Create New Palette</Link>
          </nav>

          <TransitionGroup className="pl-palettes">
            {palettes.map((palette) => (
              <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                <MiniPalette
                  {...palette}
                  key={palette.paletteName}
                  openDeleteDialog={openDialog}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
          <Dialog
            open={deleteDialog}
            aria-labelledby="delte-dialog-title"
            onClose={closeDialog}
          >
            <DialogTitle id="delete-dialog-title">
              Delete this Palette?
            </DialogTitle>
            <List>
              <ListItem onClick={handleDelete}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      style={{ backgroundColor: blue[100], color: blue[600] }}
                    >
                      <Check />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>Delete</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem onClick={closeDialog}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      style={{ backgroundColor: red[100], color: red[600] }}
                    >
                      <Close />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>Cancel</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Dialog>
        </div>
      </div>
    );
    
}

export default PaletteList;
