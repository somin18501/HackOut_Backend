import React, { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts';
import { graph1, graph2 } from '../services/api'

export default function Graphs() {
    const [graphData, setGraphData] = useState(null)
    const [graphData2, setGraphData2] = useState(null)

    useEffect(() => {
        graph1().then((data)=>{
            setGraphData(data);
        });
        graph2().then((data)=>{
            setGraphData2(data);
        });
        // setGraphData(await graph1());
        // setGraphData2(await graph2());
    }, [])

    return (
        <>
            <div className='container bg-secondary p-5 rounded shadow my-4' >

                <Chart
                    width={'100%'}
                    height={'300px'}
                    chartType='ColumnChart'
                    isStacked={true}
                    loader={<div className="spinner-border text-primary m-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
                    data={graphData}
                    options={{
                        title: 'Top 10 Available Hospitals',
                        chartArea: { width: '80%' },
                        hAxis: {
                            title: 'Hospital',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'Availability',
                        },
                    }}
                />


            </div>

            <div className='container bg-secondary p-5 rounded shadow my-4' >

                <Chart
                    width={'100%'}
                    height={'300px'}
                    chartType='ColumnChart'
                    isStacked={true}
                    loader={<div className="spinner-border text-primary m-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
                    data={graphData2}
                    options={{
                        title: 'Patient to Doctor/Nurse Ratio',
                        chartArea: { width: '80%' },
                        hAxis: {
                            title: 'Hospital',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'Ratio',
                        },
                    }}
                />


            </div>
        </>
    )
}
