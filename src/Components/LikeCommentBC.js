import React from "react";
import { Line } from "react-chartjs-2";

//Set Chart Option & Data structure
var Chart = {
  data: {
    labels: null,
    type: 'line',
    defaultFontFamily: 'Montserrat',

    datasets: [
      {
        label: "Like",
        backgroundColor: 'transparent',
                borderColor: '#08F7FE',
                borderWidth: 3,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#08F7FE',
        data: null,
        yAxisID: "y-axis-1"
      },
      {
        label: "Comment",
        backgroundColor: 'transparent',
        borderColor: '#F5D300',
        borderWidth: 3,
        pointStyle: 'circle',
        pointRadius: 5,
        pointBorderColor: 'transparent',
        pointBackgroundColor: '#F5D300',
        data: null,
        yAxisID: "y-axis-2"
      }
    ]
  },
  option: {
    responsive: true,
    hoverMode: "index",
    stacked: false,
    tooltips: {
      mode: 'index',
      titleFontSize: 12,
      titleFontColor: '#000',
      bodyFontColor: '#000',
      backgroundColor: '#fff',
      titleFontFamily: 'Montserrat',
      bodyFontFamily: 'Montserrat',
      cornerRadius: 3,
      intersect: false,
    },
    title: {
      fontFamily: 'Normal Legend',
      display: false,
      text: "Like & Comment through time"
    },
    legend: {
      labels: {
          usePointStyle: true,
          fontFamily: 'Montserrat',
      },
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false
          },
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1"
        },
        {
          gridLines: {
            display: false,
            drawBorder: false
          },
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",

          gridLines: {
            drawOnChartArea: false // only want the grid lines for one axis to show up
          }
        }
      ]
    }
  }
  
};

function LikeCommentBC(props) {
  var Likes = props.data.Medias.edges.map(x => {
    return x.node.edge_media_preview_like.count;
  });
  var Comments = props.data.Medias.edges.map(x => {
    return x.node.edge_media_to_comment.count;
  });
  var Dates = props.data.Medias.edges.map(x => {
    return new Date(
      Number(x.node.taken_at_timestamp + "000")
    ).toLocaleDateString();
  });
  Chart.data.labels = Dates;
  Chart.data.datasets[0].data = Likes;
  Chart.data.datasets[1].data = Comments;

  return (
    <div className="card">
      <div className="card-body">
        <Line
          options={Chart.option}
          data={Chart.data}
          //   legend={this.state.legend}
          height={256}
        />
      </div>
    </div>
  );
}
export default LikeCommentBC;
