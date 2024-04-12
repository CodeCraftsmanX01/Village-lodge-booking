import React from 'react'
import brahmakamal from '../components/Images/Brahmakamal'
import rathuadhab from '../components/Images/Rathuadhab'
import devalsari from '../components/Images/Devalsari'
import dehradun from '../components/Images/Dehradun'
import farms from '../components/Images/Farms'
import { Fragment } from 'react'

const config = {
    brahmakamal: {
        navigationItems: '',
        backgroundImage: brahmakamal.general,
        header: {
            headerText: 'Welcome to Brahmakamal',
            bodyText: (<Fragment>
                <p className='info'>Discover our Hospitality,Reconnect with Nature</p>
                <p className='info'>Choose any one option to continue</p>
            </Fragment>),
            buttons: ['Farms', 'Village Lodges', 'Resorts'],
            renderedFrom: 'home'
        },
        'Village Lodges': {
            isLive: true,
            comingSoonImage: rathuadhab.general,
            places: [
                {
                    placeName: 'rathuadhab', image: rathuadhab.general, isLive: true,
                    details: 'A great place to relax during your visit to Jim Corbett National Park'
                },
                { placeName: 'dehradun', image: dehradun.general, isLive: false, details: 'blah blah blah' },
                { placeName: 'devalsari forest', image: devalsari.general, isLive: false, details: 'blah blah blah' }
            ],
        },
        'Farms': {
            isLive: false,
            comingSoonImage: farms.general,
            places: [
                { placeName: 'rathuadhab', image: rathuadhab.general, isLive: true },
                { placeName: 'dehradun', image: rathuadhab.general, isLive: false },
                { placeName: 'dehradun', image: rathuadhab.general, isLive: false }
            ],
        },
        'Resorts': {
            isLive: false,
            comingSoonImage: rathuadhab.general,
            places: [
                { placeName: 'rathuadhab', image: rathuadhab.general, isLive: true },
                { placeName: 'dehradun', image: rathuadhab.general, isLive: false },
                { placeName: 'dehradun', image: rathuadhab.general, isLive: false }
            ],
        },
        about: {
            header: {
                headerText: 'About us',
                bodyText: 'Know about Brahmakamal',
                renderedFrom: 'aboutUs',
                backgroundImage: brahmakamal.general,
            },
            bodyText: [
                'We are a new partnership firm whose launch was severely delayed due to this pandemic, the firm is headed by Atul S Rawat, the senior partner and has two other partners. We propose to develop farms which produce fruit, edible herbs, and fresh salad greens which are grown without the use of chemicals and using only organic manure. Since these are located in fairly remote regions this will reduce our dependance on expensive transportation and erratic supply chains provide our visitors  with fresh fruits, herbs and salads grown in polyhouses straight from “Farm to Fork”.  ',
                'This project has been ongoing for some time now, commenced with purchase of land by the senior partner and planting of fruit trees on the two tranches of land, one on the fringe of Devalsari forest and another in Rathuadhab located on the fringe of the Corbett National Park. Both are in Uttarkhand.',
                'The farm in Devalsari area which is around one hectare in size was planted with several fruit trees some time back, these have commenced fruiting. A small unit of two bedrooms was partially built when work ceased due to lockdown, work on this unit shall resume soon and completed in a short period of time. This is about an hour drive from Mussoorie which will provide us with a market for our produce. The area under coverage of polyhouses is being doubled to enhance volumes.',
                'The farm at Rathuadhab on the fringe of Corbett National Park is also around one hectare in size, this property was fenced off to keep cattle away and fruit trees were planted this year during the monsoon season. Polyhouses for growing herbs and exotic vegetables will also be shortly installed. One of the positive fall outs of the pandemic was that we were able to procure fairly aged fruit tree saplings and hope that they shall commence fruiting post the Monsoons of 2022.',
                'In 2019, commenced construction in Rathuadhab of a small residential unit in partnership with a property owner from the village, work on which was severely impeded due to various fall out effects of the Covid situation, however, it has now been completed and is fully operational.',
                'Another property located in Dehra Doon is currently under renovation and completion is expected sometime in December. In line with our thought process this property is located in serene surroundings away from the hustle and bustle of high-density urban areas.',
                'There are empty houses in several villages of Uttarkhand belonging to people who have migrated to urban areas, some suitable locations have been identified and after interaction with owners they shall be refurbished and operationalized. These will be under the brand name of “The Village Lodge” and the first of these in Rathuadhab is coming on line in November this year.',
                'We intend to provide a good quality accommodation with quality service at a reasonable rate where families can visit and enjoy our hospitality. Considerable effort has gone into arranging supply chains so that our visitors may have the best quality raw ingredients in their meals which will be Organic as far as is practicable.',
                'We shall also be happy to provide onward link up with other facilities in Uttarkhand to enhance your holiday experience.'
            ],
            images: brahmakamal.about
        },
        contactUs: {
            header: {
                headerText: 'Contact Us',
                bodyText: 'Info on how to reach us',
                renderedFrom: 'aboutUs',
                backgroundImage: brahmakamal.general,
            },
        },
        footer: {
            name: 'BRAHMAKAMAL',
            requiredIcons: ['Facebook', 'Twitter', 'Instagram'],
            address: (<Fragment>
                <p>Khazra 14-15 Daniyo ka Danda, Old Mussoorie Rd, Dehradun 248009</p>
            </Fragment>),
        },
        privacyPolicy: {
            header: {
                headerText: 'Privacy Policy',
                bodyText: 'Know about Brahmakamal',
                renderedFrom: 'aboutUs',
                backgroundImage: brahmakamal.general,
            },
            body: (<ul className="privacyPolicyList">
                <li>At the time of Check-in, every individual guest staying in the hotel is required to present a valid government identity proof which mentions the residential address. In case of foreign national, valid passport along with visa is required. Also, the guests are requested to carry the reservation letter at the time of arrival, an electronic format will be acceptable. Please submit your vaccination proof while booking.</li>
                <li>Total room rent along with F&B as well as Safari vehicle bookings are payable in advance to confirm the bookings, Corbett Park entry fees and Guide payment will be refundable. </li>
                <li>We don’t serve alcohol.</li>
                <li>Hookahs and personal music/speaker systems are not allowed in the hotel. Guests are requested to adhere to “No loud noise after 10 pm” since it disturbs and keeps the villagers awake, we are located where the ambient noise is very low and therefore sound carries great distances. If you are lucky then you may even hear a Tiger roar.</li>
                <li>The Lodge shall not be responsible for any loss of or damage to your personal belongings.</li>
                <li>In case any damage is done to the Lodge property by guests during their stay, it will be the sole accountability of the guest that made the booking, and we will levy damage charges as deemed fit.</li>
                <li>Any request for wildlife trophies or parts of animals etc shall be reported to the relevant authorities. Guests are advised not to pick up any items which may be lying on the forest floor. Please refer to “Do’s and Don’ts” for Corbett National Park which is dealt with elsewhere on this site.</li>
                <li>No charge for child below 5 years and a half rate for child below 10 on meals. 11 years and above will be charged adult price. </li>
                <li>Child up to the age of 10 years can share the bed with parents and an extra bed is mandatory for child of and above the age of 10 years, adult charges are applicable. If an extra bed is placed for a child between 6 to 10, charges are Rs. 750 + taxes. For child above 10 years and for adults an extra bed is placed on request separately, it is chargeable @ Rs.1100 + taxes (GST will be applicable as per the rate of the room). The extra bed cost will be inclusive of breakfast.</li>
                <li>Morning and evening tea are included in the room rent. Packed Breakfast Hamper with Beverage for consumption during Safari in the Corbett National Park is included in the room rent.</li>
                <li>Chota Hazri will be served in the morning before you proceed for Safari, timings shall be adjusted according to season being at 1 Hrs prior to opening of the park entry gate. Please check timing with staff on arrival. Breakfast is served packed and can be consumed in the park, lunch from 12:30 pm. and dinner at 7.30 pm during winter and 8 pm during Summer.</li>
                <li>All prices mentioned regarding rooms, meals, services, and other facilities are exclusive of taxes. CGST and SGST rates as per the GST Act and GST Rules & Regulations will be levied on the corresponding services availed at the properties. All taxes are subject to change as per the Government regulations from time to time.</li>
            </ul>)
        },
        termsAndConditions: {
            header: {
                headerText: 'Terms & Conditions',
                bodyText: 'Know about Brahmakamal',
                renderedFrom: 'aboutUs',
                backgroundImage: brahmakamal.general,
            },
            body: (<ul className="termsAndConditionList">
                <li>Brahma Kamal Farms and Resorts welcomes you to its website and looks forward to a meaningful interaction with you.</li>
                <li>Brahma Kamal Farms and Resorts respects your right to privacy. Any personal information that you share with us, like your name, date of birth, address, marital status, telephone number, credit card particular and the like, shall be entitled to privacy and kept confidentially.</li>
                <li>Brahma Kamal Farms and Resorts assures you that your personal information shall not be used/disclosed by it, save for the purpose of doing the intended business with you, or if required to be disclosed under the due process of law.</li>
                <li>Brahma Kamal Farms and Resorts assures you that in the event of your personal information being shared with its subsidiaries, business associates etc, such sharing of information shall be for the purpose of doing the intended business with you.</li>
                <li>Brahma Kamal Farms and Resorts reserves its right to collect, analyse and disseminate aggregate site usage patterns of all its visitors with the view to enhancing services to its visitors, This includes sharing the information with its subsidiaries, and business associates as a general business practice.</li>
                <li>If you have any question or concerns regarding your privacy issues, please do not hesitate to contact Brahma Kamal Farms and Resorts brahmakamal.co@gmail.com</li>
                <li>While Brahma Kamal Farms and Resorts assures you that it will do its best to ensure the privacy and security of your personal information, it shall not be responsible in any manner whatsoever for any violation or misuse of your personal information by unauthorised persons consequent to misuse of the internet environment.</li>
                <li>Brahma Kamal Farms and Resorts reserves its right to revise this privacy policy from time to time at its discretion with the view to making the policy more user-friendly.</li>
                <li>In the design of our website, we have taken care to draw your attention to this privacy policy so that you are aware of the terms under which you may decide to share your personal information with us. Accordingly, should you choose to share your personal information with us, Brahma Kamal Farms and Resorts will assume that you have no objections to the term of this privacy policy.</li>
            </ul>)
        },
        cancellationPolicy: {
            header: {
                headerText: 'Cancellation Policy',
                bodyText: 'Know about Brahmakamal',
                renderedFrom: 'aboutUs',
                backgroundImage: brahmakamal.general,
            },
            body: (<ul className="cancellationPolicyList">
                <p className='listHeading'>Cancellation Charges (for individual bookings)</p>
                <li>If cancelled 96 hours prior to the arrival date full refund will be processed. There will be 5% cancellations charges in case payment is done via Instamojo/Credit/Debit card.</li>
                <li>If cancelled within 48-72 hours prior to CK Inn date, then the amount would be kept as credit which can be utilized for future bookings until 6 months from the cancellation date.</li>
                <li>Cancellation within 24 hours before the check-in will attract one night retention.</li>
                <li>The mentioned amount can be adjusted against future booking as per the applicable tariff for the amended date.</li>
                <li>Credit/Debit card cancellations will be charged 5% extra.</li>
                <li>For Special Celebration Dates (24th, 25th, 30th & 31st of December & Long weekends)</li>
                <li>25% if cancelled within 48 – 72 Hrs in advance.</li>
                <li>50% if cancelled within 24 – 48 Hrs in advance. </li>
                <li>100% if cancelled less than 24 Hrs in advance or later.</li>
                <li>Credit/Debit card cancellations will be charged 5% extra.</li>
                <li>In case of any cancellation the GST of 18% on the advance will have to be retained as it is to be paid by us to the authorities by the 5th of the next month.</li>
                <li>Note: Any postponement of the booking will be treated as a cancellation and will be governed by the Cancellation Policy.</li>
                <li>Refunds only through cheque for bookings made by cash/cheque/bank transfer.</li>
                <li>Online refunds for bookings made through the website usually take 7-10 working days.</li>
                <li>Credit/debit card/ Instamojo online refunds will only be made against credit/debit card bookings and usually take 15 working days.</li>
                <li>The original receipt must be presented for processing the refund.</li>
                <li>Credit/debit card/ Instamojo cancellations will be charged 5% extra</li>
            </ul>)
        },
    },
    rathuadhab: {
        backgroundImage: rathuadhab.general,
        navigationItems: 'regular',
        footer: {
            name: 'THE VILLAGE LODGE',
            requiredIcons: ['Facebook', 'Twitter', 'Instagram'],
            address: (<Fragment>
                <p>Rathuadhab, PO Dhamdhar, district Pauri Garhwal, Uttarakhand - 246179</p>
            </Fragment>),
        },
        home: {
            header: {
                headerText: 'WELCOME TO THE VILLAGE LODGE',
                bodyText: 'Discover the world for the simple beauty and hospitality of the village lodge',
                renderedFrom: 'home',
                buttons: ['Book now'],
            },
            body1: {
                background: brahmakamal.general,
                images: rathuadhab.views,
                text: (<Fragment>
                    <h1 className='mainHeadings'>Stay and Enjoy and the view</h1>
                    <p style={{ textAlign: 'center' }}>Travelling is discovering, letting go, enjoying.
                        We offer you several amenities to make your stay at village lodge an unforgettable experience.</p>
                </Fragment>)
            },
            amenities: ['Refrigrator', 'Laundry', 'FirePlace', 'HotWater', 'RoomHeaters', 'HairDryers', 'Hangers', 'WollenCarpet',
                'Towels', 'FirstAid', 'Microwave', 'DriverRoom', 'Flask', 'Soap', 'Barbeque', 'Safari', 'ElectricBlanket'],
            body2: {
                images: rathuadhab.rooms,
                text: (<Fragment>
                    <h1 className='mainHeadings'>Featured Rooms</h1>
                </Fragment>),
            },
            locateUs: {
                center: [29.666567, 78.854767],
                zoom: 13,
                url: 'https://www.google.com/maps/dir//29.666567,78.854767/@29.666567,78.8525783,17z',
                landmarkText: 'Village lodge is 46 KM away from Dogadda and 15 KM beyond Vatanvasa gate.',
                pickUpFacilityText: 'We also provide pickup and drop facility from Jolly Grant airport, New Delhi Airport and Haridwar railway station.',
                pickUpDropPrices: {
                    'Jolly grant airport': '₹ 4000/-',
                    'New Delhi airport': '₹ 4000/-',
                    'Haridwar Railway Station': '₹ 3500/-'
                },
                images: rathuadhab.locations
            },
        },
        registration: {
            header: {
                headerText: 'Registration',
                bodyText: 'Get access to our premium lodge and services',
                renderedFrom: 'registration',
                backgroundImage: rathuadhab.general,
            },
        },
        gallery: {
            header: {
                headerText: 'Rathuadhab\'s Gallery ',
                bodyText: 'Know about the village lodge',
                renderedFrom: 'aboutUs',
                backgroundImage: rathuadhab.general,
            },
            images: rathuadhab.views,
        }
    },
}

export default config