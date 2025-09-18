import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';
import BackHandIcon from '@mui/icons-material/BackHand';
import { useContext } from 'react';
import { ThemeContext } from '../../ThemeContex';
import { useState } from 'react';

export default function StudentNames({ name ,socketref,socketid}) {
  const[btnchange,setbtnchange]=useState(true)
  
  
  const value = false; // Replace with actual logic to determine the state
console.log(socketref.current.id,"studentname");
   let target=socketid;
   console.log(socketref,"sa")
   const {atd,setatd,roomid}=useContext(ThemeContext);

 const Handleaccess=(socketref,target,roomid)=>{
  if(btnchange==false){
    HandleDecline(socketref,target,roomid);
    setbtnchange(prv=>!prv)
    return;
  }
    console.log("access",socketref)
    if(socketref.current){
        // console.log("access")
        console.log(target,"i")
      socketref.current.emit("access",{target,roomid,value:true})
    }
    setbtnchange(prv=>!prv)
    

  }

 const HandleDecline=()=>{
   
    
    if(socketref.current){
        console.log("access")
      socketref.current.emit("access",{target,roomid,value:false})

    }
     setatd(atd.filter(i=>i.name!=i.name));

  }


  return (
    <Paper
      elevation={2}
      sx={{
        p: 2.5,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 3,
        bgcolor: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E5E7EB',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-2px)',
          borderColor: '#3B82F6',
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        
        <Box 
         sx={{
            width:"50%",
            overflow:"hidden"
        }}  
        >
          <Typography 
            variant="h6"
            sx={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#1F2937',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            👤 {name}
          </Typography>
         
        </Box>
        {value ? (
          <BackHandIcon sx={{ color: '#FFD7C2', fontSize: 40 }} />
        ) : (
          <Button
            variant='contained'
            sx={{
              height: '40px',
              minHeight: '40px',
              maxHeight: '40px',
              width: '45%',
              fontSize: '0.7rem',
              padding: '8px 12px',
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'none',
              background: btnchange 
                ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                : "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
              color: "white",
              boxShadow: btnchange 
                ? "0 2px 8px rgba(16, 185, 129, 0.3)"
                : "0 2px 8px rgba(239, 68, 68, 0.3)",
              '&:hover': {
                background: btnchange 
                  ? "linear-gradient(135deg, #059669 0%, #047857 100%)"
                  : "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)",
                boxShadow: btnchange 
                  ? "0 4px 12px rgba(16, 185, 129, 0.4)"
                  : "0 4px 12px rgba(239, 68, 68, 0.4)",
                transform: "translateY(-1px)"
              },
              transition: "all 0.2s ease-in-out"
            }}
            onClick={()=>Handleaccess(socketref,target,roomid)}
          >
            {btnchange ? "Give Access" : "Revoke Access"}
          </Button>
        )}
      </Box>
       {!value && (
            <Typography variant="body2" color="textSecondary">
              is present in class
            </Typography>
          )}

      {value && (
        <Box width="100%" mt={1}>
          <Typography variant="body2" gutterBottom>
            {name} has a doubt, resolve his/her query
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Button variant="contained" size="small" color="success">
              ACCEPT
            </Button>
            <Button variant="contained" size="small" color="error">
              DECLINE
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
}
