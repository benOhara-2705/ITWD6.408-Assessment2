// Import all child components that will make up the form
import FormCustomerDetail from './FormCustomerDetail';
import FormRepairDetail from './FormRepairDetail';
import FormCourtesyPhone from './FormCourtesyPhone';
import FormCost from './FormCost';
import FormButtons from './FormButtons';

// Import all external tools
import { useNavigate } from "react-router-dom"; // allow component to change routes after form submittion
import { useState } from 'react'; // manages the React state
import { supabase } from './supabaseClient'; // provides the client for the Supabase database

function Home() {
    // this allows the total bond to be updated based on the value of the child components
    const updateSharedState = (value) => setsharedBond(value); 
    const [sharedBond, setsharedBond] = useState(0); // this updated value is stored here (zero by default)

    // same as above, but with the status of the warranty (determining Service Fee)
    const setUnderWarranty = (value) => { setsharedWarranty(value); };
    const [sharedWarranty, setsharedWarranty] = useState(false); // false (unchecked) by default

    // stores either 'consumer' or 'business' depending on what the user chooses
    const [customerType, setCustomerType] = useState('');

    // used by child components to clear their values (which is what the zero represents) when 'Reset' is pressed
    const [courtesyResetKey, setCourtesyResetKey] = useState(0);

    // stores the purchase and repair dates
    const [repairDates, setRepairDates] = useState({
        purchaseDate: '',
        repairDate: ''
    });

    // updates one date while ensuring the other remains the same (e.g., updating the Repair date without altering the Purchase date)
    const handleDateChange = (field, value) => {
        setRepairDates(current => ({ ...current, [field]: value }));
    };

    // if both dates have values, datesSet = True; otherwise, datesSet = False
    const datesSet = Boolean(repairDates.purchaseDate && repairDates.repairDate);

    // this will be used to send the user to the Invoice page after the form is successfully saved
    const navigate = useNavigate();

    // runs when the form is submitted
    const handleSubmit = async (e) => {
        // stops the page from reloading, which prevents React from submitting the form
        e.preventDefault();

        // the form object
        const form = e.currentTarget;
        // stores form fields that are named
        const formData = new FormData(form);
        // converts any empty values into 'null' (such as optional fields)
        const valueOrNull = (name) => {
            const value = formData.get(name);
            return value === null || value === '' ? null : value;
        };

        // reads the phone list in the courtesy table and returns 'null' if no phone is found
        const phone = valueOrNull('phoneList');
        // same above for the charger list
        const charger = valueOrNull('chargerList');

        // this stops the form from submitting if no phone or charger is selected by cancelling the submittion via returning
        if (!phone && !charger) {
            alert('Please select at least one phone or charger before submitting');
            return;
        }

        // checks whether the 'Warranty' box is checked
        const underWarranty = formData.has('warrantyUnder');
        // adds phone and charger bonds to the courtesy table
        const bond =
            Number(formData.get('phoneBond') || 0) +
            Number(formData.get('chargerBond') || 0);
        // if the user is under warranty, the service fee is $0; otherwise, it's $85
        const serviceFee = underWarranty ? 0 : 85;
        // calculates subtotal
        const subtotal = bond + serviceFee;

        // the booking data is mapped to each column of the Supabase database (if data isn't present, then 'null' is sent), GST and total_cost is calculated as well
        const bookingData = {
            customer_type: valueOrNull('customerType'),
            title: valueOrNull('title'),
            first_name: valueOrNull('firstName'),
            last_name: valueOrNull('lastName'),
            street: valueOrNull('street'),
            suburb: valueOrNull('suburb'),
            city: valueOrNull('city'),
            post_code: valueOrNull('postCode'),
            phone_number: valueOrNull('phoneNumber'),
            email: valueOrNull('email'),

            purchase_date: valueOrNull('purchaseDate'),
            repair_date: valueOrNull('repairDate'),
            under_warranty: underWarranty,
            imei: valueOrNull('imei'),
            make: valueOrNull('make'),
            model_number: valueOrNull('modelNumber'),
            fault_category: valueOrNull('faultCategory'),
            repair_description: valueOrNull('repairDesc'),

            phone,
            charger,
            bond,
            service_fee: serviceFee,
            gst: Number((subtotal * 0.15).toFixed(2)),
            total_cost: Number((subtotal * 1.15).toFixed(2)),
        };

        try {
            // the bookingData is then inserted into the database, while requesting that 'job_number' and 'invoice_date' (which are auto-generated by the database) are returned
            const { data: savedBooking, error } = await supabase
                .from('bookings')
                .insert([bookingData])
                .select('job_number, invoice_date')
                .single(); // this indicates that only one row should be returned

            // if Supabase returns an error, send it to 'catch' (below)
            if (error) throw error;

            // these form values are copied into an object
            const bookingDetails = Object.fromEntries(formData.entries());
            // the warranty status, job number & invoice date are added to this object
            bookingDetails.underWarranty = underWarranty;
            bookingDetails.jobNumber = savedBooking.job_number;
            bookingDetails.invoiceDate = savedBooking.invoice_date;

            // this object is then saved to the localStorage, where it is navigated to the Invoice component
            localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
            navigate('/invoice');
        } catch (error) {
            // if an error occurs, it is logged (for debugging purposes) and an alert is sent
            console.error('Unable to save booking details.', error);
            alert('Unable to save booking details. Please try again.');
        }
    };

    // The form is now rendered
    return (<>
        <form className="row mx-0"
            style={{ minHeight: '60vh' }}
            onSubmit={handleSubmit} /* All submit events are connected to handleSubmit */
            onReset={() => { /* Values are cleared and the reset key is incremented for child components */
                setCustomerType('');
                setRepairDates({ purchaseDate: '', repairDate: '' });
                setsharedWarranty(false);
                setCourtesyResetKey(key => key + 1)
            }}>
            {/* Customer Details */}
            <div className="col-12 col-lg-4 p-4 m-0"
                style={{ minHeight: '30vh', backgroundColor: '#FCF3CF' }}>
                <FormCustomerDetail
                    /* The selected customer type and its state setter are passed on */
                    customerType={customerType} 
                    onCustomerTypeChange={setCustomerType}
                />
            </div>
            {/* Repair Details */}
            <div className="col-12 col-lg-4 p-4 m-0"
                style={{ minHeight: '30vh', backgroundColor: '#D5F5E3' }}> <FormRepairDetail 
                /* Callbacks for the warranty updates and date changes, as well as the reset key, are passed on */
                passDataToParent={setUnderWarranty}
                    onDateChange={handleDateChange}
                    resetKey={courtesyResetKey} />
            </div>
            {/* Courtesy Phone & Cost */}
            <div className="col-12 col-lg-4 p-0 m-0">
                {/* Courtesy phone (The bond callback, customer type and reset key are passed on) */}
                <div className="p-4"
                    style={{ minHeight: '30vh', backgroundColor: '#2874A6' }}>
                    <FormCourtesyPhone
                        passDataToParent={updateSharedState}
                        customerType={customerType}
                        resetKey={courtesyResetKey}
                    /> {/* Child1 */}
                </div>
                {/* Cost */}
                <div className="p-4" style={{ minHeight: '20vh', backgroundColor: '#EDBB99' }}>
                    <FormCost
                        /* Passes on current bond, warranty status & whether both dates are set */
                        sharedPropBond={sharedBond} sharedPropWarranty={sharedWarranty}
                        datesSet={datesSet}
                    /> {/* Child2 (FormCost) */}
                </div>
            </div>
            {/* Button area (renders submit and reset buttons) */}
            <div className="p-4 text-center" style={{ minHeight: '10vh', backgroundColor: '#EDBB99' }}><FormButtons
            />
            </div>
        </form>
    </>);
}
// export this component to the entire app, so it can be re-used or hooked into other components
export default Home;