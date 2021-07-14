import Head from 'next/head'
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Chart from "../components/chart"
import "react-datepicker/dist/react-datepicker.css";

import { Line } from "react-chartjs-2";

export default function Home() {
  const defaultEndDate = new Date()
  const today = new Date()
  defaultEndDate.setDate(defaultEndDate.getDate() + 3)

  const defaultStartDate = new Date()
  defaultStartDate.setDate(defaultStartDate.getDate() - 4)

  const [startDate, setDate] = useState(new Date)
  const [rangeStart, setRangeStart] = useState(defaultStartDate)
  const [rangeEnd, setRangeEnd] = useState(defaultEndDate)
  const [dayArray, setDayArray] = useState([])
  const [current, setCurrent] = useState(true)

  const [productDataA, setProductDataA] = useState([])
  const [productDataB, setProductDataB] = useState([])

  const selectDateHandler = (d) => {
    setDate(d)
  }

  const selectProductA = () => {
    setCurrent(true)
  }

  const selectProductB = () => {
    setCurrent(false)
  }

  const changeDateFomart = date => {
    const dateObj = new Date(date)
    const month = dateObj.getUTCMonth() + 1 //months from 1-12
    const day = dateObj.getUTCDate()
    const year = dateObj.getUTCFullYear()
    return day + "/" + month + "/" + year
  }

  const getDateRange = (rangeStart, rangeEnd) => {
    const today = changeDateFomart(new Date())

    const productDataA = []
    const productDataB = []

    for (var arr=[], dt = new Date(rangeStart); dt <= rangeEnd; dt.setDate(dt.getDate() + 1)) {
      let date = changeDateFomart(dt);
      const dataA = Math.floor(Math.random() * 10 + 10);
      const dataB = Math.floor(Math.random() * 10 + 10);

      productDataA.push(dataA)
      productDataB.push(dataB)

      if (today === date)
        date = 'Today'

      arr.push(date)
    }
    setProductDataA(productDataA)
    setProductDataB(productDataB)
    return arr
  }

  useEffect(() => {
    setDayArray(getDateRange(rangeStart, rangeEnd))
  }, []);

  const onRandomize = () => {
    setDayArray(getDateRange(rangeStart, rangeEnd))
  }

  const selectStartDate = d => {
    setRangeStart(d)
  }

  const selectEndDate = d => {
    setRangeEnd(d)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Test Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-5xl font-bold">
          Test Project for Product Chart
        </h1>

        <div className="border bg-primary my-12 py-4 px-20">
          <h2 className="text-4xl ">Date Range</h2>

          <div className="flex py-10">
            <div className="date-picker with-50 flex items-center justify-between">
              <h3 className="text-2xl text-left mr-4">Start Date</h3>
              <DatePicker
                selectsStart
                selected={rangeStart} 
                startDate={rangeStart} 
                endDate={rangeEnd}
                onChange={selectStartDate} />
            </div> 

            <div className="date-picker with-50 flex items-center justify-between">            
              <h3 className="text-2xl text-left mr-4">End Date</h3>
              <DatePicker
                selectsEnd
                selected={rangeEnd} 
                startDate={rangeStart} 
                endDate={rangeEnd}
                onChange={selectEndDate} />
            </div>
          </div>
        </div>

        <div className="border flex items-center justify-between">
          <button
            className={current ? 'btn btn-purple' : 'btn'}
            onClick={selectProductA}>
              Product A
          </button>

          <button
            className={!current ? 'btn btn-brown' : 'btn'}
            onClick={selectProductB}>
              Product B
          </button>
        </div>

        <Chart
          label = { dayArray }
          pData = {current ? productDataA : productDataB}
          borderColor = {current ? '#48c0c0' : '#FF5733'}
          title = {current ? 'A' : 'B'}
          />

        <button
          className="btn btn-primary"
          onClick={onRandomize}>
            Randomize
        </button>

      </main>

      <footer className="flex items-center justify-center">
          Powered by <b>{' Ivars '}</b> - 2021
      </footer>
    </div>
  )
}
