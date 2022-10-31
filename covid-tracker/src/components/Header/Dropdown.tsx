import * as React from 'react';
import { styled as sx, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { peopleAlt1, peopleAlt2 } from '../../assets/images';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StyledMenu = sx((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        )
      }
    }
  }
}));
const Wrapper = styled.div``;
const DropDown = styled(Button)`
  margin: 0 2px;
  padding: 0px 10px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  color: white;
  text-decoration: none;
  text-transform: none;
`;
const Li = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px 10px;
  text-decoration: none;
  color: black;
`;
const Icon = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 15px;
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 10px;
`;
export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Wrapper>
      <DropDown
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}>
        <Typography sx={{ fontWeight: '500' }}>Tra cứu</Typography>
      </DropDown>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <MenuItem onClick={handleClose} disableRipple>
          <Li to={'/user/certification'}>
            <Icon src={peopleAlt1} alt="People" />
            <Title>
              <Typography variant="body1">Tra cứu chứng nhận tiêm</Typography>
              <Typography sx={{ fontSize: '12px' }}>
                Cập nhật nhanh và chính xác nhất
              </Typography>
            </Title>
            <ArrowForwardIcon
              sx={{ fontSize: '32px !important', color: '#5E35B1 !important' }}
            />
          </Li>
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <Li to={'/registration-step-3'}>
            <Icon src={peopleAlt2} alt="People" />
            <Title>
              <Typography variant="body1">Tra cứu kết quả đăng kí</Typography>
              <Typography sx={{ fontSize: '12px' }}>
                Cập nhật nhanh và chính xác nhất
              </Typography>
            </Title>
            <ArrowForwardIcon
              sx={{ fontSize: '32px !important', color: '#1E88E5 !important' }}
            />
          </Li>
        </MenuItem>
      </StyledMenu>
    </Wrapper>
  );
}
