//Function Component
function FormCost(props) {
    // These values will be displayed as $0 until both the purchase date and repair date are selected
    const bond = props.datesSet ? props.sharedPropBond : 0;
    const serviceFee = props.datesSet && !props.sharedPropWarranty ? 85 : 0;
    const total = bond + serviceFee;
    //Component UI: HTML Rendering
    return(<>
        <h2>Cost</h2>
        <div className="row mt-2 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Bond ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value={bond} onlyread />
        </div>
        <div className="row mt-1 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Service Fee ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value={serviceFee} onlyread />
        </div>
        <div className="row mt-1 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Total ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value={total} onlyread />
        </div>
        <div className="row mt-1 ms-3">
            <label className="col-12 col-md-12 col-lg-4">GST ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value={(total * 0.15).toFixed(2)} onlyread />
        </div>
        <div className="row mt-1 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Total (+GST) ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value={(total * 1.15).toFixed(2)} onlyread name="totalCost" />
        </div>
    </> );
}

//Export this component to the entire app, can be re-used or hooked into other Components
export default FormCost;