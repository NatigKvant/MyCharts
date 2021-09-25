import data from "../../data.json";

export const configObj = {
    chart: {
        type: 'scatter',
        margin: [70, 50, 60, 80],
        backgroundColor:'whitesmoke',
        accessibility: {
            enabled:true
        },
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {

    },
    yAxis: {

    },
    legend: {
        enabled: false,
        layout: 'horizontal',
        align: 'right',
        verticalAlign: 'bottom',
        className:'charts',
        itemWidth:140,
        y:0,
    },
    plotOptions: {
        series: {
            lineWidth: 1,
            label: {
                connectorAllowed: false
            },
            pointStart: 1,
            point: {
                events: {
                    click: function () {
                        if (this.series.data.length > 1) {
                            this.remove();
                        }
                    }
                }
            }
        }
    },
    series: data,
    credits: {
        enabled: false
    },
}