import { Box, Button, Divider, Drawer, List, ListItemText, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import Request from '../Request/Requset';
import { ThemeContext } from '../../ThemeContex';
import StudentNames from '../Request/StudentNames';

export default function Drawer1({socketref}) {
    const [open,setopen]=useState(false);
    const toggleClick=(e)=>()=>{
        setopen(e);
    }
    let st=JSON.parse(localStorage.getItem('students'));
    const dummynames=["vivek","sam","kamal","depanshu","rohit"]
    const {atd,student}=useContext(ThemeContext);
    // const a=["sam","kamal","vivek"];
    // it is an highorder functioon ,function ke ander function, 
    // agr yeah nhai hoga to setopen bhoot jada rerender hoga
    const drawer=(
        <Box width={"300px"} 
        sx={{
          display:"flex",
          flexDirection:"column",
          gap:"20px",
          p: 2,
          height: '100%',
          bgcolor: '#F8F9FA'
        }}
        >
          
            <TextField 
              placeholder='Search participants...' 
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'white',
                  '&:hover': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#3B82F6'
                    }
                  }
                }
              }}
            />
          
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
               <Typography 
                 variant="h6" 
                 color='primary' 
                 fontWeight='bold'
                 sx={{ 
                   fontSize: '1.1rem',
                   mb: 1,
                   display: 'flex',
                   alignItems: 'center',
                   gap: 1
                 }}
               >
                 👥 Participants ({student?.filter(s => s.username !== 'admin').length || 0})
               </Typography>
               <Divider sx={{ bgcolor: '#E5E7EB', height: 1 }} />
            </Box>
            
            <Box 
              sx={{
                flex: 1,
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#c1c1c1',
                  borderRadius: '3px',
                  '&:hover': {
                    background: '#a8a8a8',
                  },
                },
              }}
            >
              <List 
                sx={{
                  display:"flex",
                  flexDirection:"column",
                  gap:"12px",
                  p: 0
                }}
              >
              {/* {atd.map((e,i)=>{
               
                return<Request key={i} name={e}></Request>
              })} */}
              {
                // st.map((i)=>{console.log(i.username,"s")})
              }

                {
                  student&&student.map((i,index)=>{
                    return ((i.username!=undefined&&i.username!=='admin')?<StudentNames key={index} name={i.username} socketref={socketref} socketid={i.id}></StudentNames>:null)
                  })
                }
                {/* <ListItemText primary={"kamal"}></ListItemText> */}
              </List>
            </Box>

        </Box>
    )
  return (
    <div>
      
        <Button 
          onClick={toggleClick(true)} 
          variant='contained'
          sx={{
            background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
            color: "white",
            fontFamily: "Roboto",
            fontWeight: 600,
            fontSize: "0.9rem",
            borderRadius: 2,
            px: 3,
            py: 1,
            textTransform: 'none',
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
            '&:hover': {
              background: "linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)",
              boxShadow: "0 6px 16px rgba(59, 130, 246, 0.4)",
              transform: "translateY(-1px)"
            },
            transition: "all 0.2s ease-in-out"
          }}
        >
          View Participants
        </Button>
      <Drawer open={open} onClose={toggleClick(false)}>
        {drawer}
      </Drawer>
    </div>
  )
}
