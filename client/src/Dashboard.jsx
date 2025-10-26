import { Box, Button } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ReactSketchCanvas } from "react-sketch-canvas";

import Drawer1 from './Component/Dashboardcomponent/Drawer1';
import Tools from './Component/Dashboardcomponent/Tools';
import { ThemeContext } from './ThemeContex';
import { initsocket } from './socket';
import Attendance from './Component/form/Attendance';
import { ToastContainer, toast } from 'react-toastify';
import Request from './Component/Request/Requset';
import { Atd_popUp } from './Component/Atd_pop_up/Atd_popUp';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
  const socketref=useRef(null);
  const canvasRef = useRef(null);
  const[access,setacess]=useState(false);
       const navigate = useNavigate();
   console.log("dashboard value",access)

    const[message,setmessage]=useState('');
    const{pen,penColor,username,setatd,atd,mark,setmark,roomid,student,setstudent,eraserSize}=useContext(ThemeContext);
    const boxstyle={
        display:"flex",
        justifyContent:"space-evenly",
        alignItems:"center",
        gap:"10px"
        // border:"2px solid red",
       
        
    }
 
    console.log(username)
    const handleChange = async () => {
    
      if (!canvasRef.current || !socketref.current||(username!='admin'&&!access)) return;
      console.log("change")
      const paths = await canvasRef.current.exportPaths();
      socketref.current.emit('drawing', {
        roomid: roomid,
        data: paths,
      });
    
      console.log("Stroke finished and sent");
    };
    
    
//change mark
 
const changeMark=(number)=>{


  let index=Number(number)
  console.log(mark,",",index);
  let updatemark=JSON.parse(localStorage.getItem('mark'));
  console.log("updated",updatemark);
  updatemark[index]+=1;
  localStorage.setItem('mark', JSON.stringify(updatemark));
  // console.log(updatemark[index],"yha hua change");

  setmark(updatemark);
  console.log(mark)
  console.log(updatemark)

}
   //leave

    

    useEffect(()=>{
      const init=async()=>{
        socketref.current=await initsocket();
        socketref.current.emit('join',{
          id:roomid,
          userename:username
        })
        socketref.current.emit('join', { roomid: roomid ,username:username});
        socketref.current.on("r-drawing",(data)=>{
        // console.log("data",data);
        // console.log("data2",canvasRef.current);
        console.log("r-draw")
        console.log(roomid)
          if(canvasRef.current){
            canvasRef.current.loadPaths(data);
           
          }
        })
        //on join of student
         socketref.current.on('student', ({ id, username }) => {
  if (!id || !username) return;

  console.log(id, username, "student");

  setstudent(prev => {
    // Check for duplicates
    const alreadyExists = prev.some(student => student.id === id && student.username === username);
    if (alreadyExists) return prev;

    const updated = [...prev, { id, username }];
    
    // Save to localStorage

    return updated;
  });
});

//disconnect of socket
socketref.current.on('disconnect-del',({username,id})=>{
    if (!id) return;

  setstudent(prev =>
    prev.filter((i) => i.id && i.id !== id)
  );
  console.log("after disconnect",student);
})





        //attendance message
        socketref.current.on('r-attendance',({message})=>{
          console.log("socket username",username)
          if(username!="admin"&& username!=undefined){
            console.log("socket username2",username)
            toast(
              <Attendance socketref={socketref}></Attendance>
            )
          }
        })
       



        //recv  req
        socketref.current.on('r-sendreq',({message,socketid})=>{
          console.log('bhai  ka nam',message)
          setatd(prv=>[...prv,{name:message,socketid:socketid}]);

          toast(
 username=='admin'&& <Request name={message} socketid={socketid} socketref={socketref} />,
  {
    position: "bottom-left",
    autoClose: 5000,       // 5 seconds = 5000 ms
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }
); 


        })



          // take access
        socketref.current.on("access-g",({value})=>{
          console.log(value,"hello");
          setacess(value);
        })



        //recv mark
        socketref.current.on('r-mark', ({ rollnumber }) => {
          console.log("socket roll", rollnumber);
          changeMark(rollnumber);
        });
        //del student from local storage
       
     
      }
      init();

      return () => {
        if (socketref.current) {
          socketref.current.emit('leave', { roomid: roomid });
          // socketref.current.disconnect(); // optional
        }
      };
    },[])
    const notify=()=>{
      toast(
        <Attendance ></Attendance>
      )
    }
    const sendMessage=(e)=>{
      e.preventDefault();
      if(socketref.current && username=='admin'){
        socketref.current.emit('send-attendance',{
          message:"attendance is sended",
          roomid:roomid
        })
      }
    }
   const sendRequest=(e)=>{
    if(socketref.current){
      console.log("socketid",socketref.current.id)
      socketref.current.emit('sendreq',{message:username
        ,roomid:roomid,
      socketid:socketref.current.id})
    }
  }
  

   //leave
   const leave=()=>{
    if(username=='admin'){
      console.log("leave ho gya",mark);
      const mark1= JSON.parse(localStorage.getItem('mark')) || [];

      let message="";
      {mark1.map((i,key)=>{
       i>=2?message+=`${key},`:"";
      })


      }
   
      
      toast(<Atd_popUp message={message||'None'} socketref={socketref}></Atd_popUp>, {
      position: 'top-right',
      autoClose: false, 
      closeOnClick: false,
      draggable: false,
      closeButton: true,
    })
     
      
    }
  else {
   
const updatearray=student.filter((i)=>{i.name!=username});
setstudent(updatearray);
 socketref.current.emit('leave',{roomid})
 
localStorage.removeItem('username')
navigate('/');
}
  
   }
         useEffect(() => {
           console.log("Updated atd:", message);
         }, [message]);
  
console.log(student)

  return (
    
    <Box width={"100%"} 
    height={"100vh"}
    >
         <ReactSketchCanvas
  ref={canvasRef}
  width="100%"
  height="80%"
  strokeWidth={penColor === '#D9D9D9' ? eraserSize : pen}
  strokeColor={penColor}
  canvasColor="#D9D9D9"
  withTimestamp={true}
  onStroke={(username === "admin" || access === true) ? handleChange : undefined}
  allowOnlyPointerType={username === 'admin' ? 'all' : undefined}
  style={{
    pointerEvents: (username === "admin" || access === true) ? 'auto' : 'none',
    opacity: (username === "admin" || access === true) ? 1 : 0.5,
    border: '2px solid #ccc',
    borderRadius: '8px'
  }}
/>
{
  student.map((i)=>{
    console.log(i.id,i.username);
  })
}


      <Box style={boxstyle} width={"100%"} mt="30px" height={"20%"}>
       
       {/* <Attendance></Attendance> */}
       <ToastContainer
  position="bottom-right"
  autoClose={6000}
  hideProgressBar={false}
  newestOnTop={true}
  closeButton={false}
  pauseOnHover={true}
  draggable={true}
/>
       



       
       { username=="admin"&&<Drawer1 socketref={socketref}></Drawer1>}
        {/* box for icon button */}
          {/* <Box style={boxstyle} width={"30%"}>
          <CreateIcon></CreateIcon>
          <ColorLensIcon></ColorLensIcon>
          <ImagesearchRollerIcon></ImagesearchRollerIcon>

              
          </Box >  */}
       {username=="admin"&&<Tools></Tools>} 
      {/* box for button */}
      <Box sx={boxstyle} width={"50%"}>


   {  
  //  username=="admin"&& <Button variant='contained' sx={{background:"#4761DF",
  //       color:"white",
        
  //       fontSize:"0.9rem"
        
  //      }}>go_to code_collab</Button>
      }
       

  {username=="admin"?<Button 
        variant='contained' 
        sx={{
          background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
          color: "white",
          fontFamily: "Roboto",
          fontWeight: 600,
          fontSize: "0.9rem",
          borderRadius: 2,
          px: 3,
          py: 1,
          textTransform: 'none',
          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
          '&:hover': {
            background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
            boxShadow: "0 6px 16px rgba(16, 185, 129, 0.4)",
            transform: "translateY(-1px)"
          },
          transition: "all 0.2s ease-in-out"
        }} 
        onClick={sendMessage}
       >
        Send Attendance
       </Button>:
       <Button 
         variant='contained'
         onClick={sendRequest}
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
         Send Request
       </Button>
      }


      
       <Button 
         variant='contained' 
         sx={{
           background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
           color: "white",
           fontFamily: "Roboto",
           fontWeight: 600,
           fontSize: "0.9rem",
           borderRadius: 2,
           px: 3,
           py: 1,
           textTransform: 'none',
           boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
           '&:hover': {
             background: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)",
             boxShadow: "0 6px 16px rgba(239, 68, 68, 0.4)",
             transform: "translateY(-1px)"
           },
           transition: "all 0.2s ease-in-out"
         }}
         onClick={leave}
       >
         Leave Room
       </Button>
      </Box>


      </Box>

    </Box>
  )
}
