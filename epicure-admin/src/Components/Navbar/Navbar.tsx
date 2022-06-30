import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const goTo = (where: number) => {
    switch (where) {
      case 1:
        window.location.href = "/SingUp";
        break;
      case 0: {
        window.location.href = "/";
        break;
      }
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit" onClick={() => goTo(0)}>Login</Button>
          <Button color="inherit" onClick={() => goTo(1)}>
            Sing Up
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
