import Chart from 'chart.js/auto'
import React, { useEffect, useRef, useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import SideBarAdmin from '../../components/SideBarAdmin'
import { getUsersCreated } from '../../services/admin/clientService'
import { getOrdersCreated } from '../../services/admin/orderClientService'
import { getHotProduct } from '../../services/productService'
import './Admin.scss'

const Admin = () => {

    const [userStats, setUserStats] = useState({
        todayCount: 0,
        monthlyCount: 0,
        totalCount: 0
    })

    const [orderStats, setOrderStats] = useState({
        todayCount: 0,
        monthlyCount: 0,
        totalCount: 0,
        todayTotal: 0,
        monthlyTotal: 0,
        dailyData: [],
        statusCounts: {},
        deliveredProductsQuantity: 0
    })

    const [earnStats, setEarnStats] = useState({
        todayCount: 0,
        monthlyCount: 0,
        totalCount: 0
    })

    const barChartRef = useRef(null)
    const doughnutChartRef = useRef(null)

    const [weeklyTotal, setWeeklyTotal] = useState(0)
    const [allOrders, setAllOrders] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await getUsersCreated()
                const orderResponse = await getOrdersCreated()

                setUserStats({
                    todayCount: userResponse.todayCount,
                    monthlyCount: userResponse.monthlyCount,
                    totalCount: userResponse.totalCount.count
                })

                setOrderStats({
                    todayCount: orderResponse.todayCount.count,
                    monthlyCount: orderResponse.monthlyCount.count,
                    totalCount: orderResponse.totalCount.count,
                    todayTotal: orderResponse.todayCount.total,
                    monthlyTotal: orderResponse.monthlyCount.total,
                    dailyData: orderResponse.order,
                    statusCounts: orderResponse.totalCount.statusCounts,
                    deliveredProductsQuantity: orderResponse.totalCount.deliveredProductsQuantity
                })

                console.log(orderResponse.totalCount.statusCounts)
                setAllOrders(orderResponse.allOrder.orders)

                setEarnStats({
                    todayCount: orderResponse.todayCount.total,
                    monthlyCount: orderResponse.monthlyCount.total,
                    totalCount: orderResponse.totalCount.totalPrice
                })
                const weeklyTotalAmount = orderResponse.order.reduce((total, data) => total + data.total, 0)
                setWeeklyTotal(weeklyTotalAmount)

            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    const timeAgo = (date) => {
        const currentDate = new Date()
        const orderDate = new Date(date)
        const timeDifference = currentDate.getTime() - orderDate.getTime()
        const minutesDifference = Math.floor(timeDifference / (1000 * 60)) // Chuyển đổi sang phút
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)) // Chuyển đổi sang giờ
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) // Chuyển đổi sang ngày
    
        if (minutesDifference < 1) {
            return "just now"
        } else if (minutesDifference < 60) {
            return `${minutesDifference} minutes ago`
        } else if (hoursDifference < 24) {
            if (hoursDifference === 1) {
                return "1 hour ago"
            } else {
                return `${hoursDifference} hours ago`
            }
        } else {
            if (daysDifference === 1) {
                return "1 day ago"
            } else {
                return `${daysDifference} days ago`
            }
        }
    }

    const renderBarChart = () => {
        const ctx = barChartRef.current?.getContext('2d')
        if (ctx) {
            if (barChartRef.current.chartInstance) {
                barChartRef.current.chartInstance.destroy()
            }

            const dayLabels = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su']
            barChartRef.current.chartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: dayLabels,
                    datasets: [{
                        label: 'Orders per day',
                        data: getDataByDayOfWeek(orderStats.dailyData),
                        borderColor: '#007bff',
                        backgroundColor: 'rgba(0, 123, 255, 0.1)',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return formatCurrency(value)
                                }
                            }
                        }
                    }
                }
            })
        }
    }

    const renderDoughnutChart = () => {
        const ctx = doughnutChartRef.current?.getContext('2d')
        if (ctx) {
            if (doughnutChartRef.current.chartInstance) {
                doughnutChartRef.current.chartInstance.destroy()
            }
            const { statusCounts } = orderStats

            const labels = Object.keys(statusCounts)
            const data = Object.values(statusCounts)

            doughnutChartRef.current.chartInstance = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Order Status',
                        data: data,
                        backgroundColor: [
                            '#0d6efd',   
                            '#ffc107',   
                            '#198754',   
                            '#adb5bd'    
                        ],
                        weight: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    const label = tooltipItem.label || ''
                                    if (label) {
                                        const dataValue = data[labels.indexOf(label)]
                                        const percentage = ((dataValue / data.reduce((a, b) => a + b, 0)) * 100).toFixed(2)
                                        return `${label}: ${dataValue} (${percentage}%)`
                                    }
                                    return ''
                                }
                            }
                        }
                    },
                    cutout: '80%'
                }
            })
        }
    }

    useEffect(() => {
        renderBarChart()

        return () => {
            if (barChartRef.current.chartInstance) {
                barChartRef.current.chartInstance.destroy()
            }
        }
    }, [orderStats])

    useEffect(() => {
        renderDoughnutChart()

        return () => {
            if (doughnutChartRef.current.chartInstance) {
                doughnutChartRef.current.chartInstance.destroy()
            }
        }
    }, [orderStats])

    const getDataByDayOfWeek = (dailyData) => {
        const dayIndexMapping = {
            'Monday': 1,
            'Tuesday': 2,
            'Wednesday': 3,
            'Thursday': 4,
            'Friday': 5,
            'Saturday': 6,
            'Sunday': 0
        }

        const dataByDay = new Array(7).fill(0) 

        dailyData.forEach(data => {
            const dayIndex = dayIndexMapping[data.day] 
            dataByDay[dayIndex] = data.total 
        })

        return dataByDay
    }

    const formatCurrency = (value) => {
        const trillion = 1e12
        const billion = 1e9
        const million = 1e6
        const thousand = 1e3

        if (value >= trillion) {
            return (value / trillion).toFixed(1) + 'T'
        } else if (value >= billion) {
            return (value / billion).toFixed(1) + 'B'
        } else if (value >= million) {
            return (value / million).toFixed(1) + 'M'
        } else if (value >= thousand) {
            return (value / thousand).toFixed(1) + 'K'
        } else {
            return value.toLocaleString('vi-VN') + 'đ'
        }
    }

    const [hotProducts, setHotProducts] = useState([])

    useEffect(() => {
        const fetchHotProducts = async () => {
            try {
                const response = await getHotProduct()
                setHotProducts(response)
            } catch (error) {
                console.error('Error fetching hot products:', error)
            }
        }

        fetchHotProducts()
    }, [])

    return (
        <div className="container-fluid background-admin pb-5">
            <div className="row">
                <div className="col-md-3 col-lg-2 d-md-block bg-blue sidebar">
                    <SideBarAdmin />
                </div>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Overview</h1>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-xxl-3 d-flex card-info">
                            <div className='card border-0 flex-fill w-100'>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col'>
                                            <h5 className='text-uppercase text-muted fw-semibold mb-2'>Clients</h5>
                                            <h2 className='mb-0'>{userStats.totalCount}</h2>
                                        </div>
                                        <div className='col-auto'>
                                            <FaUsers className='text-primary' style={{maxHeight: '70px', width: 'auto'}}/>
                                        </div>
                                    </div>
                                </div>
                                <div className='card-footer'>
                                    <div className='row justify-content-between'>
                                        <div className='col-auto'>
                                            <p className='fs-6 text-muted text-uppercase mb-0'>Today clients</p>
                                            <p className='fs-5 fw-bold mb-0'>{userStats.todayCount}</p>
                                        </div>
                                        <div className='col text-end text-truncate'>
                                            <p className='fs-6 text-muted text-uppercase mb-0'>Monthly clients</p>
                                            <p className='fs-5 fw-bold mb-0'>{userStats.monthlyCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xxl-3 d-flex card-info">
                            <div className='card border-0 flex-fill w-100'>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col'>
                                            <h5 className='text-uppercase text-muted fw-semibold mb-2'>Orders</h5>
                                            <h2 className='mb-0'>{orderStats.totalCount}</h2>
                                        </div>
                                        <div className='col-auto'>
                                            <FaUsers className='text-primary' style={{maxHeight: '70px', width: 'auto'}}/>
                                        </div>
                                    </div>
                                </div>
                                <div className='card-footer'>
                                    <div className='row justify-content-between'>
                                        <div className='col-auto'>
                                            <p className='fs-6 text-muted text-uppercase mb-0'>Today orders</p>
                                            <p className='fs-5 fw-bold mb-0'>{orderStats.todayCount}</p>
                                        </div>
                                        <div className='col text-end text-truncate'>
                                            <p className='fs-6 text-muted text-uppercase mb-0'>Monthly orders</p>
                                            <p className='fs-5 fw-bold mb-0'>{orderStats.monthlyCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xxl-3 d-flex card-info">
                            <div className='card border-0 flex-fill w-100'>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col'>
                                            <h5 className='text-uppercase text-muted fw-semibold mb-2'>Earnings</h5>
                                            <h2 className='mb-0'>{(earnStats.totalCount).toLocaleString('vi-VN')} đ</h2>
                                        </div>
                                        <div className='col-auto'>
                                            <FaUsers className='text-primary' style={{height: '30px'}}/>
                                        </div>
                                    </div>
                                </div>
                                <div className='card-footer'>
                                    <div className='row justify-content-between'>
                                        <div className='col-auto'>
                                            <p className='fs-6 text-muted text-uppercase mb-0'>Today earnings</p>
                                            <p className='fs-5 fw-bold mb-0'>{(earnStats.todayCount).toLocaleString('vi-VN')} đ</p>
                                        </div>
                                        <div className='col text-end text-truncate'>
                                            <p className='fs-6 text-muted text-uppercase mb-0'>Monthly earnings</p>
                                            <p className='fs-5 fw-bold mb-0'>{(earnStats.monthlyCount).toLocaleString('vi-VN')} đ</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xxl-3 d-flex card-info">
                            <div className='card border-0 flex-fill w-100 card-info'>
                                <div className='card-body'>
                                    <h4 className='text-uppercase fw-semibold mb-2'>
                                        Current Balance
                                    </h4>
                                    <h2 className='mb-0'>{weeklyTotal.toLocaleString('vi-VN')} đ</h2>
                                    <div className='chart-container h-70px'>
                                        <canvas ref={barChartRef} id='dailyOrdersChart' style={{display: 'block', boxSizing: 'border-box', height: '70px', width: '230px'}} width={287} height={87}></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-xxl-9 d-flex card-info'>
                            <div className='card border-0 flex-fill w-100' data-list="{&quotvalueNames&quot: [&quotname&quot, &quotprice&quot, &quotquantity&quot, &quotamount&quot, {&quotname&quot: &quotsales&quot, &quotattr&quot: &quotdata-sales&quot}], &quotpage&quot: 5}" id="topSellingProducts">
                                <div className='card-header border-0 card-header-space-between'>
                                    <h2 className='card-header-title h4 text-uppercase'>
                                        Top Selling Products
                                    </h2>
                                </div>
                                <div className='table-responsive'>
                                    <table className='table align-middle table-edge table-nowrap mb-0'>
                                        <thead className='thead-light'>
                                            <tr>
                                                <th>
                                                    <a className='text-muted list-sort desc' data-sort='name'>Name</a>
                                                </th>
                                                <th className='text-end'>
                                                    <a className='text-muted list-sort desc' data-sort='price'>Price</a>
                                                </th>
                                                <th className='text-center'>
                                                    <a className='text-muted list-sort desc' data-sort='quantity'>Qty</a>
                                                </th>
                                                <th className='text-end'>
                                                    <a className='text-muted list-sort desc' data-sort='amount'>Amount</a>
                                                </th>
                                                <th className='text-center pe-7'>
                                                    <a className='text-muted list-sort desc' data-sort='sale'>Sale</a>
                                                </th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody className='list'>
                                            {hotProducts.map(product => {
                                                const totalQuantityAllProducts = hotProducts.reduce((total, product) => total + product.totalQuantity, 0)
                                                const progressPercentage = totalQuantityAllProducts > 0 ? (product.totalQuantity / totalQuantityAllProducts) * 100 : 0

                                                return (
                                                    <tr key={product.ProductID}>
                                                        <td className='name text-start ps-4 fw-bold'>
                                                            {product.Name}
                                                        </td>
                                                        <td className='price text-end'>{product.Price.toLocaleString('vi-VN')} đ</td>
                                                        <td className='quantity text-center'>{product.totalQuantity}</td>
                                                        <td className='amount text-end'>{(product.Price * product.totalQuantity).toLocaleString('vi-VN')} đ</td>
                                                        <td className='sales text-end' data-sales={progressPercentage}>
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div className='progress w-100'>
                                                                <div 
                                                                    className='progress-bar bg-primary' 
                                                                    role='progressbar' 
                                                                    style={{ width: `${progressPercentage}%` }} 
                                                                    aria-valuenow={progressPercentage} 
                                                                    aria-valuemin={0} 
                                                                    aria-valuemax={100}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td><div>{Math.round(progressPercentage)}%</div></td>
                                                </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='col-xxl-3 d-flex card-info'>
                            <div className='card border-0 flex-fill w-100'>
                                <div className='card-header border-0'>
                                    <h2 className='card-header-title h4 text-uppercase'>
                                        Recent orders
                                    </h2>
                                </div>
                                <div className='table-responsive'>
                                    <table className='table table-sm table-borderless align-middle mb-0'>
                                        <thead className='thead-light'>
                                            <tr>
                                                <th className=''>Name</th>
                                                <th className=''>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allOrders.map(order => (
                                                <tr key={order.OrderID}>
                                                    <td>
                                                        <div className='d-flex align-items-center'>
                                                            <div className='d-flex flex-column ms-2'>
                                                                <span className='fw-bold d-block'>{order.UserName}</span>
                                                                <small className='text-muted'>{timeAgo(order.OrderDate)}</small>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='text-end'>
                                                        <div className='me-2'>{order.TotalPrice.toLocaleString('vi-VN')} đ</div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-xxl-6 d-flex'>
                            <div className='card border-0 flex-fill w-100 card-info'>
                                <div className='card-header border-0 card-header-space-between'>
                                    <h2 className='card-header-title h4 text-uppercase'>Order Status</h2>
                                </div>
                                <div className='card-body'>
                                    <div className='row justify-content-around'>
                                        <div className='col-lg-6 col-xl-4 mb-5 mb-lg-0'>
                                            <div className='chart-container flex-grow-1'>
                                                <canvas id='orderStatusChart' ref={doughnutChartRef} style={{ display: 'block', boxSizing: 'border-box', height: '115px', width: '100%' }}></canvas>
                                                <div className='position-absolute top-50 start-50 translate-middle text-center'>
                                                    <p className='mb-0 text-muted' style={{fontSize: '15px'}}>Ordered Products</p>
                                                    <h3 className='display-2 fw-bold mb-4' style={{fontSize: '40px'}}>{orderStats.deliveredProductsQuantity}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row mt-4'>
                                            <div className='d-flex align-items-center mb-2'>
                                                <div className='bullet-item bg-primary me-2'></div>
                                                <h6 className='text-body fw-semibold flex-1 mb-0'>Pending Pickup</h6>
                                                <h6 className='text-body fw-semibold mb-0'>{((orderStats.statusCounts.pickup / orderStats.totalCount) * 100).toFixed(2)}%</h6>
                                            </div>
                                            <div className='d-flex align-items-center mb-2'>
                                                <div className='bullet-item bg-warning me-2'></div>
                                                <h6 className='text-body fw-semibold flex-1 mb-0'>Pending Delivery</h6>
                                                <h6 className='text-body fw-semibold mb-0'>{((orderStats.statusCounts.delivery / orderStats.totalCount) * 100).toFixed(2)}%</h6>
                                            </div>
                                            <div className='d-flex align-items-center mb-2'>
                                                <div className='bullet-item bg-success me-2'></div>
                                                <h6 className='text-body fw-semibold flex-1 mb-0'>Delivered</h6>
                                                <h6 className='text-body fw-semibold mb-0'>{((orderStats.statusCounts.delivered / orderStats.totalCount) * 100).toFixed(2)}%</h6>
                                            </div>
                                            <div className='d-flex align-items-center mb-2'>
                                                <div className='bullet-item bg-secondary me-2'></div>
                                                <h6 className='text-body fw-semibold flex-1 mb-0'>Canceled</h6>
                                                <h6 className='text-body fw-semibold mb-0'>{((orderStats.statusCounts.canceled / orderStats.totalCount) * 100).toFixed(2)}%</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Admin
