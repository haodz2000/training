import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
} from 'chart.js';
import { Line as LineChart } from 'react-chartjs-2';
import { dataChart } from '../../data/fake';
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const Wrapper = styled.div`
  box-sizing: border-box;
  margin-top: 15px;
  padding: 15px;
  border: 1px solid rgba(38, 56, 150, 0.14);
  background-color: #ffffff;
  box-shadow: 0px 4px 12px rgba(34, 41, 47, 0.12);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Title = styled.div``;
const Container = styled.div`
  width: 100%;
  height: 510px;
  display: flex;
  flex-direction: column;
`;
export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const
    }
  }
};
export const data = {
  labels: dataChart.map((item) => item.date),
  datasets: [
    {
      label: 'Đã tiêm',
      data: dataChart.map((item) => item.total),
      borderColor: '#281BA4',
      backgroundColor: '#281BA4',
      pointBackgroundColor: 'red'
    }
  ]
};
const Chart = () => {
  return (
    <Wrapper>
      <Title>
        <Typography
          sx={{
            color: 'rgba(0, 0, 0, 0.87)',
            fontWeight: '500'
          }}
          component={'h6'}
          variant="h6">
          Dữ liệu tiêm theo ngày
        </Typography>
      </Title>
      <Container>
        <LineChart options={options} data={data} />
      </Container>
    </Wrapper>
  );
};

export default Chart;
