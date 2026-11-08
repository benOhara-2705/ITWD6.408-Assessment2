import { useEffect, useState } from 'react';

// Get current date (NZ)
function localDateStr(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
const d = new Date();
d.setDate(d.getDate() - 1); // yesterday
const yesterday = localDateStr(d);
d.setDate(d.getDate() + 2); // tomorrow
const tommorow = localDateStr(d);

// Function Component
function FormRepairDetail({ passDataToParent, onDateChange, resetKey }) {

    const [value, setValue] = useState('');
    useEffect(() => {
        setValue('');
    }, [resetKey]);

    const handleChange = (e) => {
        const v = e.target.value;
        if (v === '' || v.length <= 15) {
            setValue(v);
        }
        // ignore any value entered into the IMEI number fields when the length is at 15
    };

    const [warrantyEligible, setWarrantyEligible] = useState(false);
    const [underWarranty, setUnderWarranty] = useState(false);

    useEffect(() => {
        passDataToParent(underWarranty);
    }, [underWarranty, passDataToParent]);

    const handleWarrantyChange = (e) => { // this will run every time the purchase date is changed
        const purchaseDate = e.target.value;

        if (!purchaseDate) { // if no purchase date is provided (default), make the warranty uncheckable
            setWarrantyEligible(false);
            setUnderWarranty(false);
            return;
        }

        const cutoff = new Date(); // the earliest date you can be eligable for a warranty (24 months before the repair date)
        cutoff.setMonth(cutoff.getMonth() - 24);

        const eligible = purchaseDate >= localDateStr(cutoff); // check if the 24 month warranty is still eligible
        setWarrantyEligible(eligible);
        setUnderWarranty(eligible);

        if (!eligible) { // if your not eligable, make the warranty checkbox uncheckable
            setUnderWarranty(false);
        }
    }

    //Component UI: HTML Rendering
    return (<>
        <h2>Repair Details</h2>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Purchase Date: *</label>
            <input className="col-12 col-md-12 col-lg-7" name="purchaseDate" type="date" max={yesterday}
                onChange={e => {
                    onDateChange('purchaseDate', e.target.value);
                    handleWarrantyChange(e);
                }} required />
        </div>
        <div class="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Repair Date: *</label>
            <input className="col-12 col-md-12 col-lg-7" name="repairDate" type="date" min={tommorow}
                onChange={e => onDateChange('repairDate', e.target.value)} required />
        </div>
        {/*Under Warranty*/}
        <div className="row">
            <fieldset className="border border-primary col-12 col-lg-11 ms-1 me-4 mb-3">
                <legend className="col-11 float-none w-auto">Under Warranty</legend>
                <div>
                    <label className="col-12 col-md-12 col-lg-4">Warranty:</label>
                    <input name="warrantyUnder" type="checkbox" id='warranty' checked={underWarranty} disabled={!warrantyEligible} onChange={(e) => setUnderWarranty(e.target.checked)} />
                    {/*passDataToParent(event.target.checked).
This is shared warranty need to pass upto parent Component "Home" */}
                </div>
            </fieldset>
        </div>
        {/*Other details*/}
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">IMEI: *</label>
            <input className="col-12 col-md-12 col-lg-7" name='imei' value={value} type="number" onChange={handleChange} required />
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Make: *</label>
            <select className="col-12 col-md-12 col-lg-7" name='make' defaultValue="" required>
                <option value=""> </option>
                <option value="Apple">Apple</option>
                <option value="LG">LG</option>
                <option value="Moterola">Moterola</option>
                <option value="Nokia">Nokia</option>
                <option value="Samsung">Samsung</option>
                <option value="Sony">Sony</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Model Number: </label>
            <input className="col-12 col-md-12 col-lg-7" type="number" name='modelNumber' />
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Fault Category: *</label>
            <select className="col-12 col-md-12 col-lg-7" name='faultCategory' defaultValue="" required >
                <option value=""> </option>
                <option value="Battery">Battery</option>
                <option value="Charging">Charging</option>
                <option value="Screen">Screen</option>
                <option value="SD-Storage">SD-Storage</option>
                <option value="Software">Software</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Description: *</label>
            <textarea className="col-7 col-md-7 col-lg-7" rows="5" type="text" name='repairDesc' required />
        </div>
    </>);
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormRepairDetail;