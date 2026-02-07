import React from 'react';
import ReactECharts from 'echarts-for-react';

interface CourseChartProps {
  color?: string;
}

export const CourseChart: React.FC<CourseChartProps> = ({ color = '#5751D5' }) => {
  const option = {
    grid: { top: 10, right: 10, bottom: 20, left: 10, containLabel: false },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      show: false
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: color,
          width: 3
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: color }, // 100% opacity
              { offset: 1, color: 'rgba(255, 255, 255, 0)' } // 0% opacity
            ]
          },
          opacity: 0.2
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '60px', width: '100%' }} opts={{ renderer: 'svg' }} />;
};
