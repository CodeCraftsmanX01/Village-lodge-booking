import React from 'react'
import './DialogInfo.scss'

export const FoodMenu = () => {
    return (
        <div className='dialog'>
            <h3 className='secondaryHeading'>Early morning</h3>
            <ul>
                <li>Chota Hazri before going into the park.</li>
                <li>Packed Breakfast and beverages for consumption in the park.</li>
            </ul>
            <h3 className='secondaryHeading' >Lunch</h3>
            <ul>
                <li>Local cuisine (veg/non-veg)</li>
            </ul>
            <h3 className='secondaryHeading'>Dinner</h3>
            <ul>
                <li>Indian and barbeque(extra charges apply)</li>
            </ul>
            <h3 className='secondaryHeading'>Some other useful information</h3>
            <ul>
                <li>Tea and Coffee through the day. We have a selection, please ask our staff for details.</li>
                <li>In the summer months please ask for cold refreshment.</li>
                <li>Seasonal fruit shall be available.</li>
                <li>Our food shall largely be sourced from within Uttarkhand with Organic being the preferred choice.</li>
                <li>Currently we shall be serving only Indian food, our menu will be based upon local cuisine.
                    We can provide a BBQ station which ideally should be ordered in advance.</li>
                <li>Any meal shall at a minimum, consist of Rice and Chapatti, Non Veg dish, Pulse,2 vegetables, salad and condiments.</li>
                <li>We have a selection of Basmati, Red Rice as well as gluten free, at least 5 types of Rajma,
                    the small soft local variety which is tastier and other dals.
                    There is also a selection of Atta for your chapati and parathas.</li>
                <li>All Pulses will be from the hills of Uttarkhand as will the cereals and flour.</li>
                <li>Milk is procured directly from local villagers.</li>
                <li>Chicken and Eggs will be Country.</li>
                <li>Mutton - our preferred brand is Bakraw, which is marketed by the state govt and is meat of goats from
                    the hilly regions of Uttarkhand.</li>
                <li>Our Pork products will be standard packaged brands. Currently Bacon and Ham.</li>
                <li>We don't serve Beef.</li>
                <li>We have provided vegetable seeds to the villagers and locally grown farm fresh vegetables
                    and salads will start appearing on the table soon, till then we shall be using fruit and
                    vegetables from the market, only seasonals shall be procured.</li>
                <li>Jams, Jellies and Pickels will be Organic.</li>
                <li>We maintain a stock or Normal Salt as well as Black Rock Salt and Himalayan Pink salt for our own use.
                    Some salts for salads and fruit which are ground and mixed locally is also available for consumption.</li>
                <li>We shall avoid using Mass marketed food brands where ever possible except when quality demands.</li>
                <li>Please note that some of our food products come from Dehra Doon which is about 175 KM away,
                    so should you have any specific food requests it would help us to be pre informed so that we can
                    attempt to make it available.</li>
                <li>Hyegiene standards that we maintain are high.</li>
                <li>Each meal shall be freshly made.</li>
            </ul>
        </div>
    )
}

export const TripInfo = (prices) => {
    return (<div className='dialog'>
        <h3 >Currently charges for park visit are as follows :</h3>
        <ul>
            <li>Gypsy - <strong>₹ {prices?.otherPrices.GYPSY}/-</strong> per trip Maximum of 6 persons + 1 Driver.</li>
            <li>Park Entry Fee <strong>₹ {prices?.otherPrices.PARK_FEES}/- </strong>which will be charged on every trip.</li>
            <li>A mandatory guide of <strong>₹ {prices?.otherPrices.GUIDE_FEES}/- </strong> is accompanied with the visitor for every trip.</li>
            <li>Guests shall be charged for full vehicle, extra third party persons shall not be accommodated within same vehicle.</li>
            <li>Four hrs is the max duration for each trip according to government guidelines.</li>
        </ul>
    </div>)
}
export const PaymentInfo = () => {
    return (
        <div className="formTableDescription">
            <table >
                <tbody>
                    <tr>
                        <th>ITEM</th>
                        <th>DESCRIPTION</th>
                    </tr>
                    <tr>
                        <td>ROOM COST</td>
                        <td> ( per room cost ) X  ( no of days )</td>
                    </tr>
                    <tr>
                        <td>MEAL</td>
                        <td> ( no of days ) X  ( no of guest ) X  ( per meal cost )</td>
                    </tr>
                    <tr>
                        <td>TRIPS COST</td>
                        <td>( per trip cost [ gypsy + park fee + guide ] ) X  ( no of trips )</td>
                    </tr>
                    <tr>
                        <td>EXTRA BED</td>
                        <td> ( extra bed cost ) X  ( no of extra bed )</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export const PrivacyPolicy = () => {
    return (
        <div className="privacyPolicy">
            <p>Brahma Kamal Farms and Resorts welcomes you to its website and looks forward to a meaningful interaction with you.</p>
            <p>Brahma Kamal Farms and Resorts respects your right to privacy. Any personal information that you share with us, like your name, date of birth, address, marital status, telephone number, credit card particular and the like, shall be entitled to privacy and kept confidentially.</p>
            <p>Brahma Kamal Farms and Resorts assures you that your personal information shall not be used/disclosed by it, save for the purpose of doing the intended business with you, or if required to be disclosed under the due process of law.</p>
            <p>Brahma Kamal Farms and Resorts assures you that in the event of your personal information being shared with its subsidiaries, business associates etc, such sharing of information shall be for the purpose of doing the intended business with you.</p>
            <p>Brahma Kamal Farms and Resorts reserves its right to collect, analyse and disseminate aggregate site usage patterns of all its visitors with the view to enhancing services to its visitors, This includes sharing the information with its subsidiaries, and business associates as a general business practice.</p>
            <p>If you have any question or concerns regarding your privacy issues, please do not hesitate to contact Brahma Kamal Farms and Resorts brahmakamal.co@gmail.com</p>
            <p>While Brahma Kamal Farms and Resorts assures you that it will do its best to ensure the privacy and security of your personal information, it shall not be responsible in any manner whatsoever for any violation or misuse of your personal information by unauthorised persons consequent to misuse of the internet environment.</p>
            <p>Brahma Kamal Farms and Resorts reserves its right to revise this privacy policy from time to time at its discretion with the view to making the policy more user-friendly.</p>
            <p>In the design of our website, we have taken care to draw your attention to this privacy policy so that you are aware of the terms under which you may decide to share your personal information with us. Accordingly, should you choose to share your personal information with us, Brahma Kamal Farms and Resorts will assume that you have no objections to the term of this privacy policy.</p>
        </div>
    )
}