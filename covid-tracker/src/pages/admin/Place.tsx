import React from 'react';
import styled from '@emotion/styled';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Location from './Location';
import Register from './Register';
import Document from './Document';
import Account from './Account';

const Wrapper = styled.div`
  width: 100vw;
  min-height: calc(100vh - 80px - 256px);
`;
const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 36px;
  box-sizing: border-box;
`;
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
const Place = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Wrapper>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container>
          <Tabs
            sx={{
              height: '64px'
            }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example">
            <Tab
              sx={{
                '&.MuiTab-root': {
                  textTransform: 'none',
                  fontSize: '16px'
                },
                '&.Mui-selected': {
                  color: 'rgba(0, 0, 0, 0.87)'
                }
              }}
              label="Tài liệu"
              {...a11yProps(0)}
            />
            <Tab
              sx={{
                height: '64px',
                '&.MuiTab-root': {
                  textTransform: 'none',
                  fontSize: '16px'
                },
                '&.Mui-selected': {
                  color: 'rgba(0, 0, 0, 0.87)'
                }
              }}
              label="Điểm tiêm"
              {...a11yProps(1)}
            />
            <Tab
              sx={{
                '&.MuiTab-root': {
                  textTransform: 'none',
                  fontSize: '16px'
                },
                '&.Mui-selected': {
                  color: 'rgba(0, 0, 0, 0.87)'
                }
              }}
              label="Đăng ký"
              {...a11yProps(2)}
            />
            <Tab
              sx={{
                '&.MuiTab-root': {
                  textTransform: 'none',
                  fontSize: '16px'
                },
                '&.Mui-selected': {
                  color: 'rgba(0, 0, 0, 0.87)'
                }
              }}
              label="Account"
              {...a11yProps(3)}
            />
          </Tabs>
        </Container>
      </Box>
      <TabPanel value={value} index={0}>
        <Document />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Location />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Register />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Account />
      </TabPanel>
    </Wrapper>
  );
};

export default Place;
