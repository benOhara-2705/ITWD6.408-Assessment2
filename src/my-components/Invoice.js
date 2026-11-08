// Function Component
function Invoice() {
    // The booking details saved from the form will be stored in Local Storage, this retrieves them. This data will be displayed individually on the invoice
    const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails') || '{}');

    // We will render the HTML for the invoice here
    return (<>
        <div style={{ minHeight: '60vh' }}>
            <div className="container-fluid p-5">
                <div className="row">
                    <div className="col">
                        <div className="row ms-1 p-0">
                            <p className="m-0">Invoice Created: {bookingDetails.invoiceDate
                                ? new Date(bookingDetails.invoiceDate).toLocaleString()
                                : 'N/A'}</p>
                        </div>
                        <div className="row ms-1 p-0">
                            <h2>Customer Details</h2>
                            <p className="m-0 text-capitalize">Type: {bookingDetails.customerType}</p>
                            <p className="m-0 text-capitalize">Name: {[bookingDetails.title, bookingDetails.firstName, bookingDetails.lastName].filter(Boolean).join(' ')}</p>
                            <p className="m-0 text-capitalize">Street: {bookingDetails.street}</p>
                            <p className="m-0 text-capitalize">Suburb: {bookingDetails.suburb || 'N/A'}</p>
                            <p className="m-0 text-capitalize">City: {bookingDetails.city}</p>
                            <p className="m-0">Postcode: {bookingDetails.postCode || 'N/A'}</p>
                            <p className="m-0">Phone Number: {bookingDetails.phoneNumber}</p>
                            <p className="m-0">Email: {bookingDetails.email}</p>
                        </div>
                        <hr/>
                        <div className="row ms-1 p-0">
                            <h2>Courtesy Loan Details</h2>
                            <p className="m-0">Phone(s): {bookingDetails.phoneList || 'N/A'}</p>
                            <p className="m-0 text-capitalize">Phone Bond: {bookingDetails.phoneList ? `$${bookingDetails.phoneBond}` : 'N/A'}</p>
                            <p className="m-0">Charger(s): {bookingDetails.chargerList || 'N/A'}</p>
                            <p className="m-0">Charger Bond: {bookingDetails.chargerList ? `$${bookingDetails.chargerBond}` : 'N/A'}</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row ms-1 p-0">
                            <h2>Repair Details</h2>
                            <p className="m-0 text-capitalize">Job Number: {bookingDetails.jobNumber}</p>
                            <p className="m-0 text-capitalize">Purchase Date: {bookingDetails.purchaseDate}</p>
                            <p className="m-0 text-capitalize">Repair Date: {bookingDetails.repairDate}</p>
                            <p className="m-0 text-capitalize">Warranty Status: {bookingDetails.warrantyUnder ? 'Under Warranty' : 'Not Under Warranty'}</p>
                            <p className="m-0 text-capitalize">IMEI Number: {bookingDetails.imei}</p>
                            <p className="m-0 text-capitalize">Phone Make: {bookingDetails.make}</p>
                            <p className="m-0">Model Number: {bookingDetails.modelNumber || 'N/A'}</p>
                            <p className="m-0">Fault Type: {bookingDetails.faultCategory}</p>
                            <p className="m-0">Description: "{bookingDetails.repairDesc}"</p>
                        </div>
                        <hr/>
                        <div className="row ms-1 p-0 ">
                            <h2>Total Cost</h2>
                            <h5 className="m-0 text-capitalize">${bookingDetails.totalCost}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
// Export this component to the entire app, can be re-used or hooked into other Components
export default Invoice;