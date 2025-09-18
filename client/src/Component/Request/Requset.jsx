import { Box, Button, Paper, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { ThemeContext } from '../../ThemeContex'

export default function Request({name,socketid,socketref}) {
  const {atd,setatd,roomid}=useContext(ThemeContext);
   let target=socketid;
  const HandleDecline=()=>{
   
    
    if(socketref.current){
        console.log("access")
      socketref.current.emit("access",{target,roomid,value:false})

    }
     setatd(atd.filter(i=>i.name!=i.name));

  }
  
 
  const Handleaccess=(socketref,target,roomid)=>{
    console.log("access",socketref)
    if(socketref.current){
        console.log("access")
      socketref.current.emit("access",{target,roomid,value:true})
    }

  }
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 3,
        bgcolor: 'white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        border: '1px solid #E5E7EB',
        minWidth: '280px'
      }}
    >
        <Box 
          display={"flex"}
          flexDirection={"column"}
          gap={2}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <span style={{ fontSize: '1.2rem' }}>✋</span>
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#1F2937' }}>
              {name} requests writing access
            </Typography>
          </Box>
          
          <Box 
            display={"flex"} 
            gap={1.5}
            justifyContent={"space-between"}
          >
            <Button 
              variant='contained' 
              size='small' 
              sx={{
                flex: 1,
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                color: 'white',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
                '&:hover': {
                  background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.4)",
                }
              }}
              onClick={()=>Handleaccess(socketref,target,roomid)}
              >
                Accept
              </Button> 
              <Button 
                variant='contained' 
                size='small' 
                sx={{
                  flex: 1,
                  background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                  color: 'white',
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: "0 2px 8px rgba(239, 68, 68, 0.3)",
                  '&:hover': {
                    background: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)",
                    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.4)",
                  }
                }}
                onClick={HandleDecline}
              >
                Decline
              </Button>
          </Box>
        </Box>
    </Paper>
  )
}
