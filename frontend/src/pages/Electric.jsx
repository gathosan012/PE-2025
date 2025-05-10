import React from 'react'
import { useState } from 'react';
import SidePanel from '../components/SidePanel'
import '../styling/electric.scss'
import { FaSearch } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css"
import DateField from '../components/DateField';

function Electric() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [data, setData] = useState([
        { room: 1, user: "Nghia", old: 0, new: 0 },
        { room: 2, user: "Duy", old: 0, new: 0 },
        { room: 3, user: "Tuan", old: 0, new: 0 },
        { room: 4, user: "Lan", old: 0, new: 0 },
        { room: 5, user: "Tran", old: 0, new: 0 },
      ]);

    const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = parseFloat(value) || 0;
    setData(newData);
    };

    const handleSave = (index) => {
    const entry = data[index];
    const usage = entry.new - entry.old;
    alert(`Saved Room ${entry.room}, Usage: ${usage} kWh`);
    // Post to backend here
    };
    
  return (
    <div className='electric-container'>
        <SidePanel selected="electric"></SidePanel>
        <div className='electric-content'>
            <div className='electric-inner'>
                <div className='electric-upper'>
                    <h1 className="service-title">Chỉ số điện</h1>
                    <button className='search-btn'><FaSearch className='icon'></FaSearch>Xem</button>
                </div>
                <div className='break'></div>
                <div className='electric-lower'>
                    <div className='filter-section'>
                        <DateField selectedDate={selectedDate} setSelectedDate={setSelectedDate}></DateField>
                    </div>
                    <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th>Phòng</th>
                    <th>Khách thuê</th>
                    <th>CS Điện Cũ</th>
                    <th>CS Điện Mới</th>
                    <th>Sử dụng</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {data.map((entry, index) => {
                    const usage = entry.new - entry.old;
                    return (
                    <tr key={index}>
                        <td className='room'>{entry.room}</td>
                        <td className='user'>{entry.user}</td>
                        <td className='old-usage'>
                        <input
                            type="number"
                            value={entry.old}
                            onChange={(e) => handleInputChange(index, "old", e.target.value)}
                            style={{ width: "60px" }}
                        />
                        </td>
                        <td className='new-usage'>
                        <input
                            type="number"
                            value={entry.new}
                            onChange={(e) => handleInputChange(index, "new", e.target.value)}
                            style={{ width: "60px" }}
                        />
                        </td>
                        <td className='final-usage'>{usage.toFixed(1)}</td>
                        <td>
                        <button onClick={() => handleSave(index)} style={{ backgroundColor: "#4FC3F7", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px" }}>
                            💾 Lưu
                        </button>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Electric