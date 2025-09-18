import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography, Stack } from '@mui/material'
import { ThemeContext } from '../../ThemeContex'
import { AuthContext } from '../../authContext/AuthContext'
import useUserSignup from '../../Hooks/useUserSignup'
import useUserLogin from '../../Hooks/useUserLogin'


export default function Login() {
  const navigate = useNavigate()
  const [roomId, setRoomId] = useState('')
  const [username, setUsername] = useState('')
  const { setusername } = useContext(ThemeContext)
  const {user}=useUserLogin()
  console.log(user,"user from rohit");
console.log(user.fullname,"after login")
  const handleSubmit = (e) => {
    e.preventDefault()
  
    if (roomId && user.fullname) {
      setusername(user.fullname)
      navigate(`/editor/${roomId}`)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', height: '100vh', width: '100vw', display: 'flex', background: '#F7F8FA', overflow: 'hidden', position: 'relative' }}>
      {/* Top Left Branding */}
      
      <Box sx={{
        position: 'fixed',
        top: 32,
        left: 40,
        zIndex: 10,
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
      }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#111', letterSpacing: 0.5, fontSize: { xs: 22, sm: 26 } }}>
          Collaboard
        </Typography>
      </Box>
      {/* Mobile Header */}
      <Box sx={{
        position: 'fixed',
        top: { xs: 80, sm: 32 },
        left: 0,
        right: 0,
        zIndex: 10,
        display: { xs: 'flex', md: 'none' },
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#111', letterSpacing: 0.5, fontSize: 22 }}>
          Collaboard
        </Typography>
      </Box>
      {/* Bottom Left Copyright */}
      <Box sx={{
        position: 'fixed',
        bottom: 32,
        left: 40,
        zIndex: 10,
        display: { xs: 'none', md: 'block' }
      }}>
        <Typography variant="body2" sx={{ color: '#888' }}>
          © Collaboard 2025
        </Typography>
      </Box>
      {/* Left Side */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: { xs: 2, md: 8 },
        py: 0,
        background: '#fff',
        minWidth: 0,
        position: 'relative',
        height: '100vh',
      }}>
        {/* Form */}
        <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', my: { xs: 4, sm: 8 }, px: { xs: 0.5, sm: 0 } }}>
          {/* Header */}
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#111', fontSize: { xs: 22, sm: 26 }, mb: 1 }}>
            Join Room
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', mb: 4, fontSize: { xs: 13, sm: 15 } }}>
            Enter room details to join a session.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} autoComplete="off">
            <Stack spacing={0.7}>
              <Box>
                <Typography component="label" variant="body2" sx={{ fontWeight: 500, mb: 0.2, color: '#222', fontSize: { xs: 12, sm: 13 } }}>
                  Room ID
                </Typography>
                <TextField
                  fullWidth
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  variant="outlined"
                  size="small"
                  placeholder="Enter room ID"
                  sx={{
                    mt: 0.2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#F9FAFB',
                      fontSize: { xs: 13, sm: 15 }
                    }
                  }}
                />
              </Box>
              <Box>
                <Typography component="label" variant="body2" sx={{ fontWeight: 500, mb: 0.2, color: '#222', fontSize: { xs: 12, sm: 13 } }}>
                  Username
                </Typography>
                {/* <TextField
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  variant="outlined"
                  size="small"
                  placeholder="Enter your username"
                  sx={{
                    mt: 0.2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#F9FAFB',
                      fontSize: { xs: 13, sm: 15 }
                    }
                  }}
                /> */}
              </Box>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  width: '100%',
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: 15,
                  textTransform: 'none',
                  py: 1,
                  boxShadow: 0,
                  '&:hover': { backgroundColor: '#1D4ED8' }
                }}
              >
                Join Room
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
      {/* Right Side - Blurred Square with Collaboard */}
      <Box sx={{
        flex: 1,
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F7F8FA',
        position: 'relative',
        overflow: 'hidden',
        height: '100vh',
      }}>
         <Box sx={{
           width: 320,
           height: 320,
           background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)',
           borderRadius: 3,
           position: 'relative',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
           boxShadow: '0 8px 32px 0 rgba(59, 130, 246, 0.18)',
           overflow: 'hidden',
           filter: 'blur(0.5px)',
           animation: 'float 6s ease-in-out infinite',
           '@keyframes float': {
             '0%, 100%': {
               transform: 'translateY(0px)'
             },
             '50%': {
               transform: 'translateY(-10px)'
             }
           }
         }}>
          <Typography
            variant="h1"
            sx={{
              color: 'rgba(59, 130, 246, 0.4)',
              fontWeight: 700,
              fontSize: '3.5rem',
              zIndex: 2,
              filter: 'blur(1.5px)',
              textAlign: 'center',
              lineHeight: 1,
              letterSpacing: '-0.02em'
            }}
          >
            Collaboard
          </Typography>
          {/* Half-blur overlay */}
          <Box sx={{
            position: 'absolute',
            left: 0,
            top: '50%',
            width: '100%',
            height: '50%',
            background: 'rgba(247,248,250,0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 3
          }} />
        </Box>
      </Box>
    </Box>
  )
}
