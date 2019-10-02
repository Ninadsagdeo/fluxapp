import React from 'react';
import {Drawer,IconButton,AppBar ,CssBaseline,Toolbar,
    List,ListItem,ListItemIcon,ListItemText,Divider,Typography,Switch, 
} from '@material-ui/core';
import clsx from 'clsx';

//icons
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';

import { withStyles } from "@material-ui/core/styles";
import MaterialTable from 'material-table';

//flux
import * as TodoActions from "./actions/TodoActions";
import TodoStore from "./stores/TodoStore";



const drawerWidth = 240;

const useStyles = theme => ({
    root: {
        display: 'flex',
      },
      appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
});

class Main extends React.Component {
    state={
        todos:TodoStore.getAll(),
        open:false,
    }
    handleDrawerOpen = () => {
        this.setState({open:true});
      };
    
    handleDrawerClose = () => {
        this.setState({open:false});
    };
    //call after 1st render
   componentDidMount(){
    console.log('AFTER 1st RENDER');
    TodoActions.reloadTodos(); //call action with API
    TodoStore.on("change", this.updateTodos); // must have function for getting changes in the store
   }

   updateTodos =()=>{
    console.log('AFTER UPDATE');
    this.setState({
        todos:TodoStore.getAll()
    })
   }


//    reload =()=>{
//     //reloading todos
//     TodoActions.reloadTodos();
//    }
 
   render(){
    console.log('1st RENDER -> ',this.state.todos);
    const { classes } = this.props;
    
  return (
    <div className={classes.root}>
      <CssBaseline />

      {/* <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar> */}

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: this.state.open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={()=>this.handleDrawerOpen()}
            edge="start"
            className={clsx(classes.menuButton, this.state.open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>


      {/* <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer> */}

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={this.state.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={()=>this.handleDrawerClose()}>
            {/* {this.props.theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />} */}
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>


      <main  className={clsx(classes.content, {
          [classes.contentShift]: this.state.open,
        })}>
        <div className={classes.drawerHeader} />
        
       <MaterialTable
        title="TITLE"
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Title', field: 'title' },
          { title: 'Body', field: 'body'},
          {
            field: 'Checkbox',
            title: 'Switch',
            filtering: false,
            render: props => <Switch
            checked={false}
            // onChange={props.handleChange('checkedA')}
            value="checkedA"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          }
        ]}
        data={this.state.todos}        
        options={{
          filtering: true
        }}
      />
      </main>
    </div>
  );
    }
}

export default withStyles(useStyles)(Main);
