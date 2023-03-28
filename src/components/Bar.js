import React, { useEffect, useState } from 'react'
import {Bar} from 'react-chartjs-2'
import numeral from 'numeral'

const options = {
    legend: {
        display: false,
      
    },
    elements: {
        point: {
            radius: 2,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        bodySpacing: 0.1,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                    // barPercentage: 0.4
                    

                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

const LineGraph = ({ casesType="cases" }) => {
    const [data, setData] = useState({})

    const buildChartData = (data, caseType) => {
        const chartData = []
        let lastPoint;
        for(let date in data.cases){
            if(lastPoint) {
                const newPoint = {
                    x: date,
                    y: data[caseType][date]-lastPoint
                }
                chartData.push(newPoint)
            }
            lastPoint = data[caseType][date]
        }
        return chartData
    }

    useEffect(() => {
        const fetchData = async () => {
            fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=10')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    const chartData = buildChartData(data, casesType)
                    setData(chartData)
            })
        }
        fetchData()
    }, [casesType])

    return (
        <div>
            {data?.length > 0 && (
                <Bar 
                    options={options}
                    data={{
                        datasets: [{
                            // rgb(217,236,251)
                            backgroundColor: "#fca311",
                            barThickness: 25,
                            borderColor: "#CC1034", 
                            borderWidth: 1,
                            barPercentage:0.1,
                            categoryPercentage:0.5,
                            borderRadius:10,
                            data: data
                        }]
                    }}  
                />
            )}
        </div>
    )
}

export default LineGraph
