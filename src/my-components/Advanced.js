import { useState } from 'react';

// Function Component
function AdvancedJS() {
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonName) => {
        setActiveButton(activeButton === buttonName ? null : buttonName);
    };

    // Component UI: HTML Rendering
    return (
        <div className="row align-items-stretch mx-0" style={{ minHeight: '75vh' }}>
            <div id="demo-buttons" className="col-12 col-md-3 col-lg-3">
                <div className="container-fluid my-3">
                    <div className="row gap-lg-2 gap-md-2 gap-0">
                        <button className={`btn demo-button col-6 col-md-12 col-lg-12 ${activeButton === 'one' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('one')}
                            data-bs-toggle="collapse" data-bs-target="#demo-one">Demo One</button>

                        <button className={`btn demo-button col-6 col-md-12 col-lg-12 ${activeButton === 'two' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('two')}
                            data-bs-toggle="collapse" data-bs-target="#demo-two">Demo Two</button>

                        <button className={`btn demo-button col-6 col-md-12 col-lg-12 ${activeButton === 'three' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('three')}
                            data-bs-toggle="collapse" data-bs-target="#demo-three">Demo Three</button>

                        <button className={`btn demo-button col-6 col-md-12 col-lg-12 ${activeButton === 'four' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('four')}
                            data-bs-toggle="collapse" data-bs-target="#demo-four">Demo Four</button>

                        <button className={`btn demo-button col-6 col-md-12 col-lg-12 ${activeButton === 'five' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('five')}
                            data-bs-toggle="collapse" data-bs-target="#demo-five">Demo Five</button>
                    </div>
                </div>
            </div>

            <div id="js-demos" className="col-12 col-md-9 col-lg-9 my-3">
                <div id="demo-one" className="collapse" data-bs-parent="#js-demos">
                    <div>
                        <h1>SEARCHABLE JSON LIST</h1>
                        <p>On the 'FAQ' page, the user has the ability to search through different questions and answers, retrieved from a stored JSON file, to get results that match any keywords they look up. This is helpful as it avoids the user having to look through multiple unrelated questions to get what they want.
                        </p>
                    </div>
                </div>
                <div id="demo-two" className="collapse" data-bs-parent="#js-demos">
                    <div>
                        <h1>DRAG AND DROP COURTESY FORM</h1>
                        <p>In the courtesy section of the form on the Home page, users are able to drag and drop phones and/or chargers into the courtesy list. For accessability, and because this functionality is not supported on mobile devices, the option of clicking to add is still available.</p>
                    </div>
                </div>
                <div id="demo-three" className="collapse" data-bs-parent="#js-demos">
                    <div>
                        <h1>DASHBOARD CALENDAR</h1>
                        <p>On the Dashboard page, there is a calender that displays the repair dates of every submitted form entry stored in Supabase. You are able to check every month for bookings by selecting the navigation buttons at the top. This will allow users to easily see which repairs have been completed and which are upcoming.</p>
                    </div>
                </div>
                <div id="demo-four" className="collapse" data-bs-parent="#js-demos">
                    <div>
                        <h1>DASHBOARD CHARTS</h1>
                        <p>On the Dashboard page, there are two different charts that show information about two form data fields being stored in Supabase. The first is a bar chart that shows the months that the bookings are in. The second is a pie chart that shows the phone make of each user making a booking. These charts allow for details about the data being recorded to be easily displayed and read.</p>
                    </div>
                </div>
                <div id="demo-five" className="collapse" data-bs-parent="#js-demos">
                    <div>
                        <h1>ADDRESS AUTOCOMPLETE</h1>
                        <p>On the Customer Details section of the main form, when users start to enter their address into the first Address Line, a service called MapBox allows them to autocomplete their address. When selected, these address details take up the remaining address fields. The address options have also been limited to just those in New Zealand.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
// Export this component to the entire app, can be re-used or hooked into other Components
export default AdvancedJS;