import React, { useState } from 'react';
import './Attendance.css'
 import { lady } from '../../assets';
 import { FaChevronLeft, FaChevronRight  } from "react-icons/fa";
 import { LuChevronsLeft, LuChevronsRight  } from "react-icons/lu";


function Attendance() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Months are zero-based

 
  
  const createCalendar = () => {
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December",
      ];
    
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Get the first day of the month
    const firstDay = new Date(year, month - 1, 1).getDay();

    // Get the number of days in the month
    const numDays = new Date(year, month, 0).getDate();

    // Create an array to hold the days in the month
    let days = [];

    // Add empty placeholders for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push('');
    }

    // Add the days of the month
    for (let day = 1; day <= numDays; day++) {
      days.push(day);
    }

    // Split the days into weeks
    let weeks = [];
    let week = [];
   
    days.forEach((day, index) => {
      week.push(day);
      if ((index + 1) % 7 === 0 || index === days.length - 1) {
        weeks.push(week);
        week = [];
      }
    });

   
    return (
      <div>
          <h2>{monthNames[month-1]}{year} </h2>
          <div className="days-of-week">
              {daysOfWeek.map(day =>(
                  <div key={day}>
                      {day}</div>
                  
              ))}
          </div>
  
          {weeks.map((week, index) => (
              <div key={index} className='week'>
                {week.map((day, index) => (
                    <div key={{index}}className={`day ${day === '' ? 'empty' : ''} ${isToday(year, month, day) ? 'today' : ''}`}>
                {day}
                    </div>

                ))};
  
              </div>
          ))}
      </div>
    );
   
  };
};


// Function to check if a given date is today
const isToday = (checkYear, checkMonth, checkDay) => {
  const today = new Date();
  return checkYear === today.getFullYear() &&
    checkMonth === today.getMonth() + 1 &&
    checkDay === today.getDate();
};


  

 





export default  Attendance;