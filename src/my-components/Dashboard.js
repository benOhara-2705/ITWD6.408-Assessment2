// NOTE: Ensure the command: 'npm install @fullcalendar/core@^6 @fullcalendar/react@^6 @fullcalendar/daygrid@^6' is run to ensure there are no inconsistencies with the version numbers
// Imports
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // allows us to render the calendar
import dayGridPlugin from '@fullcalendar/daygrid'; // allows the events to display depending on the month
import { supabase } from './supabaseClient'; // provides the client for the Supabase database
import { Bar, Pie } from 'react-chartjs-2'; // these elements will be used to create the bar and pie charts
import { // this will import the elements used to display the charts
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend); // This will define the elements of the charts

function Dashboard() {
    const [events, setEvents] = useState([]); // all the events displayed on the calendar will be stored here
    const [error, setError] = useState(''); // if any error is encountered, it will be stored here
    const [chartData, setChartData] = useState({ // all data that will be shown on the bar chart will be stored here
        labels: [],
        datasets: []
    });
    const [pieData, setPieData] = useState({ // likewise, all of the pie chart data will be stored here
        labels: [],
        datasets: []
    })

    useEffect(() => {
        async function loadRepairs() {
            const { data, error } = await supabase // select this data from the 'bookings' tables, in order of the 'repair_date'
                .from('bookings')
                .select('job_number, title, last_name, repair_date, make')
                .order('repair_date');

            if (error) { // if an error is given, save it to be sent later
                setError(error.message);
                return;
            }

            // each row of the chart data will be grouped by its month
            const countsByMonth = (data ?? []).reduce((counts, repair) => {
                const month = repair.repair_date?.slice(0, 7); // the repair date will be stored and structured as: YYYY-MM
                if (month) counts[month] = (counts[month] ?? 0) + 1;
                return counts;
            }, {});

            // each row of the pie data will be grouped by their booking date
            const countsByMake = (data ?? []).reduce((counts, booking) => {
                const make = booking.make?.trim() // the phone make is stored here
                if (make) counts[make] = (counts[make] ?? 0) + 1;
                return counts;
            }, {});

            // these labels will be assigned to each item based on their month/make
            const monthLabels = Object.keys(countsByMonth).sort();
            const makeLabels = Object.keys(countsByMake).sort();

            setChartData({
                labels: monthLabels,
                datasets: [{
                    label: 'Monthly repair bookings',
                    data: monthLabels.map((month) => countsByMonth[month]),
                    backgroundColor: 'rgba(54, 162, 235, 0.6)' // the last value (alpha) ensures the colour is slightly transparent
                }]
            });

            setPieData({
                labels: makeLabels,
                datasets: [{
                    data: makeLabels.map((make) => countsByMake[make]),
                    backgroundColor: [ // the colours of the sections
                        'blue', 'red', 'yellow', 'lightblue',
                        'purple', 'orange', 'green'
                    ]
                }]
            });

            setEvents(
                // Each event on the calendar will be marked as so
                data.map((repair) => ({
                    id: String(repair.job_number),
                    title: `ID: ${repair.job_number}, Name: ${repair.title} ${repair.last_name}`, // The repair number will be displayed here
                    start: repair.repair_date // the event date will be the repair date
                }))
            );
        }

        loadRepairs();
    }, []);

    if (error) return <p>Could not load repairs: {error}</p>;

    return (
        <div className='container-fluid'>
            <div className="row g-3 my-2 align-items-start">
                <div className="col-12 col-lg-6">
                    <FullCalendar // This will display the calendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={events}
                        height="auto"
                    />
                </div>
                <div className='col-12 col-lg-6 my-2 align-items-center'>
                    <h5 className='text-center'>Monthly Repair Bookings</h5>
                    <div class="card-body">
                        <div style={{ height: '300px', maxWidth: '500px', margin: '0 auto' }}>
                            <Bar
                                data={chartData}
                                options={{ // we don't want to allow the chart to dynamically resize or maintain its original aspect ratio (we want to keep it at a fixed size)
                                    responsive: true, maintainAspectRatio: false, plugins: { // we won't display the legend, as it is redundant due to the header
                                        legend: { display: false }
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <hr />
                    <h5 className='text-center'>Phone Make</h5>
                    <div class="card-body">
                        <div style={{ height: '300px', maxWidth: '500px', margin: '0 auto' }}>
                            <Pie
                                data={pieData}
                                options={{ // same as with the Bar chart
                                    responsive: true, maintainAspectRatio: false, plugins: { // we will show the legend to display the make types
                                        legend: { display: true }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Export this component to allow it to be shown on the webpage
export default Dashboard;