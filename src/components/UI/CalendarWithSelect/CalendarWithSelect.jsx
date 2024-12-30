import { useDispatch, useSelector } from 'react-redux';
import './CalendarWithSelect.scss';
import {
  setDate,
  setMonth,
  setDay,
  setYear,
  setDateStringDoc,
  hideCalendar,
} from '@/store/calendarSlice';
import { useState, useEffect } from 'react';

const CalendarWithSelect = () => {
  const storeDate = useSelector((state) => {
    const dateString = state.calendar.date;
    return dateString ? new Date(dateString) : null;
  });
  const storeDateObject = useSelector((state) => {
    return state.calendar.dateObject;
  });
  const showCalendar = useSelector((state) => {
    return state.calendar.showCalendar;
  });

  const [currentYear, setCurrentYear] = useState(
    storeDateObject.year ? storeDateObject.year : new Date().getFullYear() - 16
  );
  const [currentMonth, setCurrentMonth] = useState(
    storeDateObject.month
      ? Number(storeDateObject.month) - 1
      : new Date().getMonth()
  );
  const [selectedDate, setSelectedDate] = useState(storeDate || new Date());

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenYear, setIsOpenYear] = useState(false);
  const dispatch = useDispatch();

  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];
  const years = Array.from(
    { length: 101 },
    (_, i) => new Date().getFullYear() - 16 - i
  );

  useEffect(() => {
    if (storeDateObject.month) {
      setCurrentMonth(Number(storeDateObject.month) - 1);
    }
  }, [storeDateObject.month]);

  useEffect(() => {
    if (storeDateObject.year) {
      setCurrentYear(storeDateObject.year);
    }
  }, [storeDateObject.year]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dateString = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    )
      .toISOString()
      .split('T')[0];
    dispatch(setDate(dateString));
    dispatch(
      setDateStringDoc(
        `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
      )
    );
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    let day = date.getDate();
    const dateString = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    )
      .toISOString()
      .split('T')[0];
    dispatch(setDate(dateString));
    day.length > 1 ? (day = String(day)) : (day = String(day).padStart(2, '0'));
    dispatch(setDay(day));
    // date.length > 1
    //   ? dispatch(setDay(String(day)))
    //   : dispatch(setDay(String(day).padStart(2, '0')));
    if (showCalendar) {
      let month = date.getMonth();
      month.length > 1
        ? (month = String(month + 1))
        : (month = String(month + 1).padStart(2, '0'));
      // month.length > 1
      //   ? dispatch(setMonth(String(month + 1)))
      //   : dispatch(setMonth(String(month + 1).padStart(2, '0')));
      dispatch(setMonth(month));
      dispatch(setYear(date.getFullYear()));
      dispatch(setDateStringDoc(`${day}.${month}.${date.getFullYear()}`));
      dispatch(hideCalendar());
    }
  };

  const handleMonthChange = (month) => {
    setCurrentMonth(month);
    const newDate = new Date(selectedDate);
    newDate.setMonth(month);
    handleDateChange(newDate);
    month.length > 1
      ? dispatch(setMonth(String(month + 1)))
      : dispatch(setMonth(String(month + 1).padStart(2, '0')));
    setIsOpen(false);
  };

  const handleYearChange = (year) => {
    setCurrentYear(year);
    const newDate = new Date(selectedDate);
    newDate.setFullYear(year);
    handleDateChange(newDate);
    dispatch(setYear(newDate.getFullYear()));
    setIsOpenYear(false);
  };

  const renderCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay() || 7;
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevLastDate = new Date(currentYear, currentMonth, 0).getDate();

    const days = [];
    for (let i = firstDay - 1; i > 0; i--)
      days.push(
        <div className="day day--outside-month">{prevLastDate - i + 1}</div>
      );
    for (let i = 1; i <= lastDate; i++)
      days.push(
        <div
          className={`day ${
            i === selectedDate.getDate() &&
            currentMonth === selectedDate.getMonth() &&
            currentYear === selectedDate.getFullYear()
              ? 'day__selected'
              : ''
          }`}
          onClick={() => {
            handleDateClick(new Date(currentYear, currentMonth, i));
          }}
        >
          {i}
        </div>
      );
    for (let i = 1; days.length < 42; i++)
      days.push(<div className="day day--outside-month">{i}</div>);

    return days;
  };

  return (
    <div className="customcalendar">
      <div className="customcalendar__selectbox">
        <div
          className={`select__wrapper select_month`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={`select ${isOpen ? 'active' : ''}`}>
            {months[currentMonth]}
          </div>
          {isOpen && (
            <div className="menu__wrap">
              <div className="menu">
                {months.map((month, index) => (
                  <div
                    key={index}
                    className="option"
                    onClick={() => handleMonthChange(index)}
                  >
                    {month}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className={`select__arrow ${isOpen ? 'open' : ''}`}></div>
        </div>
        <div
          className={`select__wrapper select_year`}
          onClick={() => setIsOpenYear(!isOpenYear)}
        >
          <div className={`select ${isOpenYear ? 'active' : ''}`}>
            {currentYear}
          </div>
          {isOpenYear && (
            <div className="menu__wrap">
              <div className="menu">
                {years.map((year, index) => (
                  <div
                    key={index}
                    className="option"
                    onClick={() => handleYearChange(year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className={`select__arrow ${isOpenYear ? 'open' : ''}`}></div>
        </div>
      </div>
      <div className="calendar-grid">{renderCalendar()}</div>
    </div>
  );
};

export default CalendarWithSelect;
