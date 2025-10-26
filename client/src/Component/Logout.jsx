import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../authContext/AuthContext";
import toast from 'react-hot-toast';
import { 
    Box, 
    Button
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = () => {
    const { logout } = useAuthContext();
    const navigate = useNavigate();
    
    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
        toast.success("Logout Successfully");
        navigate("/");
    }

    const userName = "Rogue Trooper"; // Replace with dynamic username later
    
    return (
        <Box 
            sx={{ 
                position: 'fixed',
                top: 32,
                right: { xs: 20, md: 40 },
                zIndex: 10,
                display: 'flex'
            }}
        >
            <Button
                variant="outlined"
                onClick={handleLogout}
                sx={{
                    borderRadius: 2,
                    minWidth: 'auto',
                    width: { xs: 32, md: 40 },
                    height: { xs: 32, md: 40 },
                    p: 0,
                    borderColor: '#3B82F6',
                    color: '#3B82F6',
                    '&:hover': { 
                        borderColor: '#1D4ED8', 
                        background: '#EFF6FF' 
                    },
                    '& .MuiSvgIcon-root': {
                        fontSize: { xs: 18, md: 24 }
                    }
                }}
            >
                <LogoutIcon />
            </Button>
        </Box>
    );
}

export default Logout;