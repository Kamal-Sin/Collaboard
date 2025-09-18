import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAdminLogin from '../../Hooks/useAdminLogin';
import {
    Box,
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Stack,
    Link as MuiLink
} from '@mui/material';

const AdminLogin = () => {
    const [input, setInput] = useState({ employee_id: '', password: '' });
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();
    const { login } = useAdminLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(input);
        if (result !== false) {
            navigate('/'); // Or wherever admin should go after login
        }
    };

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
                top: 32,
                left: 0,
                right: 0,
                zIndex: 10,
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#111', letterSpacing: 0.5, fontSize: { xs: 22, sm: 26 } }}>
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
                    {/* Header and Toggle Button Row */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#111', fontSize: { xs: 22, sm: 26 } }}>
                            Welcome back
                        </Typography>
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{
                                borderRadius: 2,
                                fontWeight: 600,
                                textTransform: 'none',
                                borderColor: '#3B82F6',
                                color: '#3B82F6',
                                '&:hover': { borderColor: '#1D4ED8', background: '#EFF6FF' }
                            }}
                            onClick={() => navigate('/user-login')}
                        >
                            User Login
                        </Button>
                    </Box>
                    <Typography variant="body1" sx={{ color: '#666', mb: 4, fontSize: { xs: 13, sm: 15 } }}>
                        Welcome back! Please enter your details.
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} autoComplete="off">
                        <Stack spacing={2}>
                            <Box>
                                <Typography component="label" variant="body2" sx={{ fontWeight: 500, mb: 0.5, color: '#222', fontSize: { xs: 12, sm: 13 } }}>
                                    Employee ID
                                </Typography>
                                <TextField
                                    fullWidth
                                    value={input.employee_id}
                                    onChange={e => setInput({ ...input, employee_id: e.target.value })}
                                    variant="outlined"
                                    size="small"
                                    placeholder="Enter your employee ID"
                                    sx={{
                                        mt: 0.5,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: '#F9FAFB',
                                            fontSize: { xs: 13, sm: 15 }
                                        }
                                    }}
                                />
                            </Box>
                            <Box>
                                <Typography component="label" variant="body2" sx={{ fontWeight: 500, mb: 0.5, color: '#222', fontSize: { xs: 12, sm: 13 } }}>
                                    Password
                                </Typography>
                                <TextField
                                    fullWidth
                                    type="password"
                                    value={input.password}
                                    onChange={e => setInput({ ...input, password: e.target.value })}
                                    variant="outlined"
                                    size="small"
                                    placeholder="Enter your password"
                                    sx={{
                                        mt: 0.5,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: '#F9FAFB',
                                            fontSize: { xs: 13, sm: 15 }
                                        }
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: -1 }}>
                                <FormControlLabel
                                    control={<Checkbox checked={remember} onChange={e => setRemember(e.target.checked)} sx={{ p: 0.5 }} />}
                                    label={<Typography variant="body2" sx={{ color: '#222', fontSize: { xs: 12, sm: 13 } }}>Remember for 30 days</Typography>}
                                    sx={{ ml: 0 }}
                                />
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
                                    py: 1.1,
                                    boxShadow: 0,
                                    '&:hover': { backgroundColor: '#1D4ED8' }
                                }}
                            >
                                Log in
                            </Button>
                        </Stack>
                    </Box>
                    <Box sx={{ mt: 1.5, textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#888', fontSize: { xs: 12, sm: 14 } }}>
                            Don't have an account?{' '}
                            <MuiLink
                                component={Link}
                                to="/admin-signup"
                                sx={{ color: '#3B82F6', fontWeight: 600, textDecoration: 'none', ml: 0.5, '&:hover': { textDecoration: 'underline' } }}
                            >
                                Sign up
                            </MuiLink>
                        </Typography>
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
                     filter: 'blur(0.5px)'
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
                            letterSpacing: '-0.02em',
                            display: 'flex',
                            gap: '0.1em',
                            '& .letter': {
                                display: 'inline-block',
                                animation: 'letterBounce 5s ease-in-out infinite',
                                animationDelay: 'calc(0.2s * var(--letter-index))',
                                '@keyframes letterBounce': {
                                    '0%, 80%': {
                                        transform: 'translateY(0px)',
                                        opacity: 1
                                    },
                                    '40%': {
                                        transform: 'translateY(-20px)',
                                        opacity: 0.8
                                    },
                                    '90%, 100%': {
                                        transform: 'translateY(0px)',
                                        opacity: 1
                                    }
                                }
                            }
                        }}
                    >
                        {'Collaboard'.split('').map((letter, index) => (
                            <span 
                                key={index} 
                                className="letter" 
                                style={{ '--letter-index': index }}
                            >
                                {letter}
                            </span>
                        ))}
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
    );
};

export default AdminLogin;
