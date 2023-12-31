import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; 
import ChartDataLabels from 'chartjs-plugin-datalabels';

const options = {
  
  layout: {
    padding: {
      top: 20, //now numbers of temp are not cut off
    },

  },
  plugins: { // for the plugin's data use this link: https://chartjs-plugin-datalabels.netlify.app/
    
    datalabels: {
      color: 'black',
      align: 'top',         
      offset: 5,
      font: { size: 10, weight: 400 },
      formatter: (value) => value + '°',
    },    
    legend: { display: false }

  },

  aspectRatio: 10/2, /*1200width * 120 height*/ /*aspectRatio: weregular th height*/
  scales: {
    x: {
      title: {
        display: true,
        text: " ",
      },
      
      border: {
        display: false
      },
      grid: {
        display: true,
        z: 1, //visability of the grid lines
        tickWidth: 1,         
      },

      ticks: {
       color: "white",
       font: {
        size: 12,        
       },       
      } 
        
    },
    y: {
      
      beginAtZero: true,
      grid: {
        display: false,       

      },
      border: {
        display: false
      },
      ticks: {
        display:false /*no numbers on the y axes*/
      }
    },    

  }

}

const plugins = [ChartDataLabels];

function LineChart({chartData}) {
  return   <Line data={chartData} options={options} plugins={plugins} />  
}

export default LineChart;