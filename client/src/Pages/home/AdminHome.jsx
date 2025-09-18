import React, { useContext, useEffect, useState } from 'react'
import Logout from '../../Component/Logout'
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import useUserLogin from '../../Hooks/useUserLogin';
import { ThemeContext } from '../../ThemeContex';
import { useNavigate } from 'react-router-dom';


const AdminHome = () => {

  const data = [
    {
      subject: "Data Structures",
      date: "18/02/2025",
      day: "Wednesday",
      participants: "4,7,8,9,12,14,15,16,36,34,37,38,39,48,49,50,56"
    },
    {
      subject: "Data Structures",
      date: "17/02/2025",
      day: "Monday",
      participants: "2,4,6,8,22,24,25,26,31,32,35,37,40,41"
    },
    {
      subject: "Data Structures",
      date: "21/02/2025",
      day: "Friday",
      participants: "1,3,4,5,7,8,14,15,19,21,25,26,27,35,38,39"
    }
  ]

  const [sortedData, setSortedData] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  function dateToNumber(dateStr) {
    const parts = dateStr.split('/');
    const [day, month, year] = parts;
    return parseInt(year + month + day);
  }

  useEffect(() => {
    const temp = [...data]
    for (let i = 0; i < temp.length - 1; i++) {
      for (let j = 0; j < temp.length - i - 1; j++) {
        if (dateToNumber(temp[j].date) < dateToNumber(temp[j + 1].date)) {
          const x = temp[j];
          temp[j] = temp[j + 1];
          temp[j + 1] = x;
        }
      }
    }
    setSortedData(temp);
  }, []);

  const handleInfo = (item) => setCurrentItem(item);

  const navigate = useNavigate()
  const { user } = useUserLogin()
  const [roomId, setRoomId] = useState('')
  const { setusername } = useContext(ThemeContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (roomId && user.fullname) {
      setusername('admin')
      navigate(`/editor/${roomId}`)
    }
  }

  const [searchTerm, setSearchTerm] = useState('');

  // simple filter instead of manual char comparison
  const manuallyFilteredData = sortedData.filter(item =>
    item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.date.includes(searchTerm)
  );

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F7F8FA 0%, #EFF6FF 100%)',
      color: '#1f2937',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Mobile Header with Greeting and Logout */}
      <Box sx={{
        display: { xs: 'flex', md: 'none' },
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 3,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #E5E7EB',
        boxShadow: '0 2px 4px rgba(59, 130, 246, 0.1)',
        minHeight: '80px',
        position: 'relative',
        zIndex: 1000
      }}>
        <Box sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          minHeight: '48px'
        }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 'bold',
            color: '#1f2937',
            fontSize: '1.5rem',
            lineHeight: 1.2
          }}>
            Hey, {user?.fullname || 'Admin'}
          </Typography>
        </Box>
        <Box sx={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          minHeight: '48px'
        }}>
          <Button
            variant="outlined"
            onClick={() => {
              localStorage.removeItem("user-info");
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
            sx={{
              borderRadius: 2,
              minWidth: 'auto',
              width: 40,
              height: 40,
              p: 0,
              borderColor: '#3B82F6',
              color: '#3B82F6',
              '&:hover': { 
                borderColor: '#1D4ED8', 
                background: '#EFF6FF' 
              }
            }}
          >
            <LogoutIcon sx={{ fontSize: 20 }} />
          </Button>
        </Box>
      </Box>

      {/* Desktop Logout */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Logout />
      </Box>
      <Box sx={{
        display: 'flex',
        flex: 1,
        p: { xs: 2, md: 3 },
        gap: { xs: 2, md: 3 },
        flexDirection: { xs: 'column', md: 'row' }
      }}>
        {/* Past Meetings Section */}
        <Paper
          elevation={6}
          sx={{
            width: { xs: '100%', md: '25%' },
            p: { xs: 2, md: 3 },
            backgroundColor: '#ffffff',
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            color: "#1f2937",
            boxShadow: "0 4px 20px rgba(59, 130, 246, 0.1)",
            border: '1px solid #E5E7EB',
            order: { xs: 3, md: 1 }
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              pb: 2,
              borderBottom: '2px solid #3B82F6',
              letterSpacing: 1,
              color: '#1f2937',
              fontSize: { xs: '1.5rem', md: '2.125rem' }
            }}
          >
            Past Meetings
          </Typography>

          <TextField
            fullWidth
            placeholder="Search by subject or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: '#6B7280', mr: 1 }} />,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#F9FAFB',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#F3F4F6'
                }
              }
            }}
          />

          <List sx={{ 
            overflow: 'auto', 
            flex: 1,
            maxHeight: '60vh',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#F1F5F9',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#3B82F6',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#1D4ED8',
            }
          }}>
            {manuallyFilteredData.length > 0 ? (
              manuallyFilteredData.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    mb: 2,
                    background: '#F9FAFB',
                    border: '2px solid #E5E7EB',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#F9FAFB',
                      borderColor: '#3B82F6',
                      borderWidth: '2px',
                      transform: 'scale(1.02)',
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)'
                    }
                  }}
                >
                  <Button
                    fullWidth
                    onClick={() => handleInfo(item)}
                    sx={{
                      textAlign: 'left',
                      p: 2,
                      color: '#1f2937',
                      '&:hover': { backgroundColor: 'transparent' },
                    }}
                  >
                    <Box sx={{ width: '100%' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 'bold',
                          textDecoration: 'underline',
                          textDecorationThickness: '2px',
                          mb: 1,
                        }}
                      >
                        {item.subject}
                      </Typography>
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: '#6B7280'
                      }}>
                        <Typography variant="body1">{item.date}</Typography>
                        <Typography variant="body1">{item.day}</Typography>
                        
                      </Box>
       <Box 
  sx={{ 
    border: "1px solid #D1D5DB",
    borderRadius: "8px",
    padding: "8px 12px",
   width:"100%",           // fixed width so wrapping happens
    wordWrap: "break-word",   // allow wrapping
    whiteSpace: "normal",      // allow text to break into multiple lines
    backgroundColor: '#F3F4F6'
  }}
>
  <Typography variant="body1" sx={{ color: '#374151' }}>
    Participants: {item.participants}
  </Typography>
</Box>
                  
                    </Box>
                  </Button>
                </ListItem>
              ))
            ) : (
              <Typography sx={{ textAlign: 'center', color: '#6B7280', mt: 4 }}>
                No meetings found
              </Typography>
            )}
          </List>
        </Paper>

        {/* Main Content Section */}
        <Box sx={{
          width: { xs: '100%', md: '75%' },
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          overflow: 'hidden',
          order: { xs: 2, md: 2 }
        }}>

          {/* Desktop Greeting */}
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'center',
            alignItems: 'center',
            py: 4
          }}>
            <Typography variant="h3" sx={{
              fontWeight: 'bold',
              color: '#1f2937',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '2.5rem'
            }}>
              Hey, {user?.fullname || 'Admin'}
            </Typography>
          </Box>
          {/* Meeting Details */}
          {currentItem && (
            <Paper
              elevation={6}
              sx={{
                p: 4,
                backgroundColor: '#ffffff',
                borderRadius: 3,
                maxWidth: '800px',
                mx: 'auto',
                width: '100%',
                color: '#1f2937',
                boxShadow: "0 4px 25px rgba(59, 130, 246, 0.1)",
                border: '1px solid #E5E7EB'
              }}
            >
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 3
              }}>
                <Typography variant="h6">
                  <strong>Date :</strong> {currentItem.date}
                </Typography>
                <Typography variant="h6">
                  <strong>Day:</strong> {currentItem.day}
                </Typography>
              </Box>

              <Typography
                variant="h3"
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  mb: 4,
                  textDecoration: 'underline',
                  textDecorationThickness: '3px',
                  color: 'white'
                }}
              >
                {currentItem.subject}
              </Typography>

              <Typography variant="h6" sx={{ ml: 4 ,color:"#374151"}}>
                <strong>Presentees:</strong> {currentItem.participants}
              </Typography>
            </Paper>
          )}
          {/* Create Room Section */}
          <Paper
            elevation={6}
            sx={{
              p: { xs: 3, md: 4 },
              backgroundColor: '#ffffff',
              borderRadius: 3,
              maxWidth: { xs: '100%', md: '800px' },
              mx: 'auto',
              width: '100%',
              color: '#1f2937',
              mt: { xs: 0, md: 'auto' },
              mb: { xs: 2, md: 4 },
              boxShadow: "0 4px 25px rgba(59, 130, 246, 0.1)",
              border: '1px solid #E5E7EB'
            }}
          >
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                variant="outlined"
                size="small"
                placeholder="Enter room ID"
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#F9FAFB',
                    fontSize: { xs: 13, sm: 15 },
                    '&:hover': {
                      backgroundColor: '#F3F4F6'
                    }
                  }
                }}
              />
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3
              }}>
                <Typography variant="h5" sx={{ 
                  textAlign: 'center',
                  fontSize: { xs: '1.2rem', md: '1.5rem' }
                }}>
                  Want to create a Room? Click below
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  sx={{
                    backgroundColor: '#3B82F6',
                    color: 'white',
                    px: { xs: 3, md: 4 },
                    py: 1.5,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    borderRadius: 2,
                    boxShadow: "0 3px 10px rgba(59, 130, 246, 0.3)",
                    width: { xs: '100%', md: 'auto' },
                    '&:hover': {
                      backgroundColor: '#1D4ED8',
                    }
                  }}
                >
                  Create a room
                </Button>
              </Box>
            </form>
          </Paper>
        

        </Box>
      </Box>
    </Box>
  )
}

export default AdminHome
