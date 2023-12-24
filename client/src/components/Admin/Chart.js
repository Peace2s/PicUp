import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';

const MyComponent = () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/mypost');
        const data = await response.json();

        if (data.status === 'ok') {
          setPostData(data.data);
        } else {
          console.error('Error fetching data:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (postData.length > 0) {
      // Tạo mảng labels và data cho biểu đồ từ dữ liệu bài đăng
      const dateCountMap = {};
      postData.forEach(post => {
        const date = post.createdAt.split('T')[0]; // Giả sử có trường createdAt trong dữ liệu
        dateCountMap[date] = (dateCountMap[date] || 0) + 1;
      });
      const like = postData.map(post => post.likes.length);
      const labels = Object.keys(dateCountMap);
      const data = Object.values(dateCountMap);

      // Vẽ biểu đồ
      const ctx = document.getElementById('myChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Tổng số bài post',
              data: data,
              fill: true,
              backgroundColor: 'rgba(75, 192, 192, 0.4)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderCapStyle: 'butt',
            },
            {
                label: 'Tổng số lượt thích',
                data: like,
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.4)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderCapStyle: 'butt',
              },
          ],
        },
        options: {
          scales: {
            x: [
              {
                type: 'time',
                time: {
                  unit: 'day',
                },
              },
            ],
            y: [
              {
                ticks: {
                  beginAtZero: true,
                  precision: 0, // Chỉ hiển thị số nguyên
                },
              },
            ],
          },
        },
      });
    }
  }, [postData]);

  return (
    <div>
      <h2 style={{textAlign: 'center'}}>Thống kê số lượt tương tác</h2>
      <canvas id="myChart" style={{ width: '400px', height: '150px' }} />
    </div>
  );
};

export default MyComponent;
