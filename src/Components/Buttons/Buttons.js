 export const highchartsCallback = (chart) => {

    chart.series.forEach((item, index) => {
        const td = document.createElement('td')
        td.textContent = item.name
        td.style.backgroundColor = item.color

        td.addEventListener('click',()=>{
            item.setVisible(!item.visible)
            if(td.style.opacity === '') {
                td.style.opacity = '0.3'
            } else if (td.style.opacity === '0.3') {
                td.style.opacity = '1'
            } else if (td.style.opacity === '1') {
                td.style.opacity = '0.3'
            }
        })

        const tbody = document.querySelector('.table tbody')
        const tr = document.createElement('tr')

        tr.appendChild(td)
        let td_s = ''
        tr.insertAdjacentHTML('beforeend',td_s)
        tbody.appendChild(tr)
    })
}