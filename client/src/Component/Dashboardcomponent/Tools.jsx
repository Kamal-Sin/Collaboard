import React, { useContext, useState } from 'react'
import ColorLensIcon from '@mui/icons-material/ColorLens';
import CreateIcon from '@mui/icons-material/Create';
import ImagesearchRollerIcon from '@mui/icons-material/ImagesearchRoller';
import { Avatar, Box, Button, Paper, IconButton, Tooltip } from '@mui/material';
import { ThemeContext } from '../../ThemeContex';

export default function Tools() {
  const { setpen, setpenColor, pen, showpen, setshowpen, eraserSize, setEraserSize } = useContext(ThemeContext);
  const [showPalette, setShowPalette] = useState(false);
  const [showeraser, setshoweraser] = useState(false);

  const Increasepx = () => {
    setpen((prv) => prv + 1);
  };

  const Decreaesepx = () => {
    setpen((prv) => prv - 1);
  };

  const IncreaseEraserSize = () => {
    setEraserSize((prv) => prv + 1);
  };

  const DecreaseEraserSize = () => {
    setEraserSize((prv) => prv - 1);
  };

  const Showpx = () => {
     console.log("showpen")
    setshowpen(prv => !prv);
    setshoweraser(false);
    setShowPalette(false);
    // Reset to black color when selecting pen tool
    setpenColor('black');
  };

  const setpxcolor = (e) => {
    setpenColor(e);
    // When selecting a color, ensure we're in drawing mode
    setshowpen(false);
    setshoweraser(false);
    setShowPalette(false);
  };

  const showcolorpalette = () => {
    setShowPalette(prv => !prv);
    setshoweraser(false);
    setshowpen(false);
    // Ensure we're in drawing mode when selecting colors
    setpenColor('black');
  };

  const eraser = () => {
    setpenColor('#D9D9D9');
    setshowpen(false);
    setShowPalette(false);
    setshoweraser(prv => !prv);
  };

  const colorpalette = [
    '#000000', // Black
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#FFFFFF'  // White
  ];

  console.log("showpen",showpen)
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        flexWrap: 'wrap'
      }}
    >
      <Box>
        {showpen && (
          <Paper
            elevation={3}
            sx={{
              position: 'absolute',
              top: '80%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(0, 0, 0, 0.8)',
              color: 'green',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 16px',
              borderRadius: '20px',
              minWidth: '120px',
              zIndex: 1000
            }}
          >
            <Button
              size="small"
              onClick={Decreaesepx}
              sx={{ color: 'white', minWidth: '30px' }}
            >
              -
            </Button>
            <Box sx={{ px: 2 }}>{pen}</Box>
            <Button
              size="small"
              onClick={Increasepx}
              sx={{ color: 'white', minWidth: '30px' }}
            >
              +
            </Button>
          </Paper>
        )}
        <Tooltip title="Pen Size">
          <IconButton
            onClick={Showpx}
            sx={{
              color: showpen ? '#4B8F17' : 'inherit',
              '&:hover': { color: '#4B8F17' }
            }}
          >
            <CreateIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box>
        {showPalette && (
          <Paper
            elevation={3}
            sx={{
              position: 'absolute',
              top: '90%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              gap: '8px',
              padding: '8px',
              borderRadius: '20px',
              zIndex: 1000
            }}
          >
            {colorpalette.map((color) => (
              <Box
                key={color}
                sx={{
                  width: '24px',
                  height: '24px',
                  background: color,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  '&:hover': {
                    border: '2px solid #4B8F17'
                  }
                }}
                onClick={() => setpxcolor(color)}
              />
            ))}
          </Paper>
        )}
        <Tooltip title="Color Palette">
          <IconButton
            onClick={showcolorpalette}
            sx={{
              color: showPalette ? '#4B8F17' : 'inherit',
              '&:hover': { color: '#4B8F17' }
            }}
          >
            <ColorLensIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box>
        {showeraser && (
          <Paper
            elevation={3}
            sx={{
              position: 'absolute',
              top: '-60px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 16px',
              borderRadius: '20px',
              minWidth: '120px',
              zIndex: 1000
            }}
          >
            <Button
              size="small"
              onClick={DecreaseEraserSize}
              sx={{ color: 'white', minWidth: '30px' }}
            >
              -
            </Button>
            <Box sx={{ px: 2 }}>{eraserSize}</Box>
            <Button
              size="small"
              onClick={IncreaseEraserSize}
              sx={{ color: 'white', minWidth: '30px' }}
            >
              +
            </Button>
          </Paper>
        )}
        <Tooltip title="Eraser">
          <IconButton
            onClick={eraser}
            sx={{
              color: showeraser ? '#4B8F17' : 'inherit',
              '&:hover': { color: '#4B8F17' }
            }}
          >
            <ImagesearchRollerIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
