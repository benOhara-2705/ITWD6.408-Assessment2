function Statement() {
    return (<>
        <div style={{ minHeight: "75vh" }}>
            <div id='js-statement' className='w-99 border border-black p-3 m-3' style={{ background: '#EAF1DD' }}>
                <h4>Statement of authenticity</h4>
                <p>I confirm that:</p>
                <ul>
                    <li>This is an original assessment and is entirely my own work.</li>
                    <li>It contains no material previously published or written by another person or myself except where
                        due acknowledgement is made in the text.</li>
                    <li>No material which to a substantial extent, has been submitted for any other academic course, is
                        included without acknowledgement.</li>
                </ul>
            </div>
        </div>
    </>);
}
// Export this Statement to be used in the project
export default Statement;