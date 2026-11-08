//Import all dependencies, other Components
import { useEffect, useRef, useState } from 'react';
//Function Component
function FormCourtesyPhone({ passDataToParent, customerType, resetKey }) {
    //"passDataToParent" is a callback function: function passDataToParent(value)
    //The callback function is to change a piece of the state that is a part of the parent component.
    //Assume there is a list of courtesy items as below
    let courtesyList = [
        { id: 1, type: 'phone', name: 'iPhone 10', bond: 275 },
        { id: 2, type: 'phone', name: 'iPhone 14', bond: 300 },
        { id: 3, type: 'phone', name: 'iPhone 16', bond: 500 },
        { id: 4, type: 'phone', name: 'Samsung Galaxy', bond: 200 },
        { id: 5, type: 'phone', name: 'Nokia', bond: 150 },
        { id: 6, type: 'phone', name: 'Xiaomi', bond: 100 },
        { id: 7, type: 'charger', name: 'iPhone Charger', bond: 45 },
        { id: 8, type: 'charger', name: 'Samsung Charger', bond: 30 },
        { id: 9, type: 'charger', name: 'Nokia Charger', bond: 25 },
        { id: 10, type: 'charger', name: 'Xiaomi Charger', bond: 25 }];
    //Declare "state" variables
    const [borrowedItems, setBorrowedItems] = useState([]); // start with an empty list, this is where the selected items will go
    const nextSelectionId = useRef(0);

    useEffect(() => {
        setBorrowedItems([]);
    }, [resetKey]);

    const addItem = (item) => {
        const next = [
            ...borrowedItems,
            { ...item, selectionId: nextSelectionId.current++ }
        ];
        setBorrowedItems(next);
    };

    const removeItem = (selectionId) => {
        const next = borrowedItems.filter(
            item => item.selectionId !== selectionId
        );
        setBorrowedItems(next);
    };

    // DRAG and DROP logic
    const handleDragStart = (event, item) => {
        event.dataTransfer.setData('text/plain', String(item.id));
        event.dataTransfer.effectAllowed = 'copy';
    };

    const handleDragOver = (event) => {
        // This is required to allow dropping
        event.preventDefault();
    }

    const handleDrop = (event) => {
        event.preventDefault();

        const itemId = Number(event.dataTransfer.getData('text/plain'));
        const item = courtesyList.find(item => item.id === itemId);

        if (item) addItem(item);
    };

    // We will now determine whether to show the bond or not based on whether the customer is a consumer or a business
    const totalBond = customerType === 'consumer'
        ? borrowedItems.reduce((total, item) => total + item.bond, 0)
        : 0;

    useEffect(() => {
        passDataToParent(totalBond);
    }, [totalBond, passDataToParent]);

    const customerTypeSelected =
        customerType === 'consumer' || customerType === 'business';

    const phoneItems = borrowedItems.filter(item => item.type === 'phone')
    const chargerItems = borrowedItems.filter(item => item.type === 'charger')

    const phoneBond = customerType === 'consumer'
        ? phoneItems.reduce((total, item) => total + item.bond, 0)
        : 0;

    const chargerBond = customerType === 'consumer'
        ? chargerItems.reduce((total, item) => total + item.bond, 0)
        : 0;

    //Component UI: HTML Rendering
    return (<>
        <h2>Courtesy Phone</h2>
        {/*Item types*/}
        <h4>Choose a phone: </h4>
        <div className='container-fluid'>
            <div className="row g-2">
                {courtesyList
                    .filter(item => item.type === 'phone')
                    .map(item => (
                        <div className='col-6 col-md-4'>
                            <button
                                key={item.id}
                                className='btn btn-light w-100'
                                type='button'
                                draggable="true"
                                onDragStart={(event) => handleDragStart(event, item)}
                                onClick={() => addItem(item)} disabled={!customerTypeSelected}
                            >
                                Drag or add {item.name}
                            </button>
                        </div>
                    ))}
                <input type="hidden" name="phoneList" value={phoneItems.map(item => item.name).join(', ')} />
                <input type="hidden" name="phoneBond" value={phoneBond} />
            </div>
            <h4>Choose a charger: </h4>
            <div className="row g-2">
                {courtesyList
                    .filter(item => item.type === 'charger')
                    .map(item => (
                        <div className='col-6 col-md-4'>
                            <button
                                key={item.id}
                                className='btn btn-light w-100'
                                draggable="true"
                                type='button'
                                onDragStart={(event) => handleDragStart(event, item)}
                                onClick={() => addItem(item)} disabled={!customerTypeSelected}
                            >
                                Drag or add {item.name}
                            </button>
                        </div>
                    ))}
                <input type="hidden" name="chargerList" value={chargerItems.map(item => item.name).join(', ')} />
                <input type="hidden" name="chargerBond" value={chargerBond} />
            </div>
        </div>
        {/*Table of added Courtesy items*/}
        <div className="row mt-2 ms-3 me-3 bg-white"
        onDragOver={handleDragOver}
        onDrop={handleDrop}>
            <table className="table table-bordered" id="borrowItems">
                <thead>
                    <tr>
                        <td>Item</td>
                        {customerType === 'consumer' && <td>Bond ($)</td>}
                    </tr>
                </thead>
                {/*Display all items in the state "borrowItems" in the table */}
                <tbody>
                    {borrowedItems.map(item => (
                        <tr key={item.selectionId}>
                            <td>{item.name}</td>
                            {customerType === 'consumer' && <td>{item.bond}</td>}
                            <td>
                                <button type='button' className='btn btn-primary' onClick={() => removeItem(item.selectionId)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>);
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormCourtesyPhone;