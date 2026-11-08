import { useRef } from 'react';
import { AddressAutofill } from '@mapbox/search-js-react';

// Function Component
function FormCustomerDetail({ customerType, onCustomerTypeChange }) {

    const phoneRef = useRef(null);
    const handleInput = (e) => {
        e.target.value = e.target.value.replace(/[^0-9\s()+-]/g, '').slice(0, 15);
    }

    // Component UI: HTML Rendering
    return (<>
        <h2>Customer Details</h2>
        {/*Customer type*/}
        <div className="row">
            <fieldset className="border border-primary col-12 col-lg-11 ms-2 me-4" >
                <legend className="col-11 float-none w-auto">Customer type *</legend>
                <div>
                    <label className="col-12 col-md-12 col-lg-4">Consumer</label>
                    <input type="radio" name="customerType" value="consumer" checked={customerType === 'consumer'} onChange={(e) => onCustomerTypeChange(e.target.value)} required />
                </div>
                <div>
                    <label className="col-12 col-md-12 col-lg-4">Business</label>
                    <input type="radio" name="customerType" value="business" checked={customerType === 'business'} onChange={(e) => onCustomerTypeChange(e.target.value)} required />
                </div>
            </fieldset>
        </div>

        {/*Details*/}
        <div className="row mt-2">
            <label className="col-12 col-md-12 col-lg-4">Title: *</label>
            <select className="col-12 col-md-12 col-lg-7" name="title" defaultValue="" required >
                <option value=""> </option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Miss">Miss</option>
                <option value="Dr">Dr</option>
            </select>
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">First Name: *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" name="firstName" required />
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Last Name: *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" name="lastName" required />
        </div>
        <div className='row mt-1'>
            <label className="col-12 col-md-12 col-lg-4">Address Line 1: *</label>
            <div className='col-12 col-md-12 col-lg-7 p-0'>
                <AddressAutofill accessToken='process.env.REACT_APP_MAPBOX_TOKEN' options={{ country: 'NZ' }}>
                    <input
                        id="address-line1"
                        className="w-100"
                        name="address-1"
                        autoComplete="address-line1"
                        required
                    />
                </AddressAutofill>
            </div>
        </div>
        <div className='row mt-1'>
            <label className="col-12 col-md-12 col-lg-4">Address Line 2:</label>
            <div className='col-12 col-md-12 col-lg-7 p-0'>
                <input
                    id="address-line2"
                    className="w-100"
                    name="address-2"
                    autoComplete="address-line2"
                />
            </div>
        </div>
        <div className='row mt-1'>
            <label className="col-12 col-md-12 col-lg-4">City: *</label>
            <div className='col-12 col-md-12 col-lg-7 p-0'>
                <input
                    id="city"
                    className="w-100"
                    name="city"
                    autoComplete="address-level2"
                    required
                />
            </div>
        </div>
        <div className='row mt-1'>
            <label className="col-12 col-md-12 col-lg-4">State: *</label>
            <div className='col-12 col-md-12 col-lg-7 p-0'>
                <input
                    id="state"
                    className="w-100"
                    name="state"
                    autoComplete="address-level1"
                    required
                />
            </div>
        </div>
        <div className='row mt-1'>
            <label className="col-12 col-md-12 col-lg-4">Post Code: *</label>
            <div className='col-12 col-md-12 col-lg-7 p-0'>
                <input
                    id="postcode"
                    className="w-100"
                    name="postcode"
                    autoComplete="postal-code"
                    onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '').slice(0, 4);
                    }}
                    required
                />
            </div>
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Phone Number: *</label>
            <input className="col-12 col-md-12 col-lg-7" name="phoneNumber" ref={phoneRef} onInput={handleInput} required />
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Email: *</label>
            <input className="col-12 col-md-12 col-lg-7" type="email" name="email" required />
        </div>
    </>);
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormCustomerDetail;