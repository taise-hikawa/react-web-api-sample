import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const DateSelector = ({ date, onChange }) => {
    // date は 'YYYY-MM-DD' 形式の文字列から Date オブジェクトに変換
    const [selectedDate, setSelectedDate] = useState(date ? new Date(date) : new Date());

    // APOD API で利用可能な最初の日付（1995年6月16日）
    const minDate = new Date('1995-06-16');
    const maxDate = new Date(); // 今日

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // ISO 形式の文字列 ('YYYY-MM-DD') に変換して親コンポーネントに渡す
        onChange(format(date, 'yyyy-MM-dd'));
    };

    return (
        <div className="mb-6 w-full max-w-md">
            <label htmlFor="date-picker" className="block text-gray-700 mb-2 font-medium">
                日付を選択:
            </label>
            <DatePicker
                id="date-picker"
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={minDate}
                maxDate={maxDate}
                dateFormat="yyyy/MM/dd"
                className="w-full p-2 border border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="日付を選択"
            />
        </div>
    );
};

export default DateSelector;