import axios from 'axios';
import { getCurrentISTTimestamp } from "@/components/utils/getCurrentISTTimeStamp";

const BREVO_API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

export async function sendTicketNotConfirmedEmail({ toEmail, toName, error, ferryName, date, fromLocation, toLocation }) {
    const htmlContent = `
        <html>
        <head>
            <style>
                body {
                    font-family: 'Segoe UI', Arial, sans-serif;
                    background: #f4f8fb;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    background: #fff;
                    max-width: 500px;
                    margin: 40px auto;
                    border-radius: 10px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    padding: 32px 24px;
                }
                .header {
                    text-align: center;
                    padding-bottom: 16px;
                    border-bottom: 1px solid #e0e7ef;
                }
                .header h2 {
                    color: #d32f2f;
                    margin: 0;
                    font-size: 26px;
                    letter-spacing: 1px;
                }
                .content {
                    margin-top: 24px;
                    color: #333;
                    font-size: 16px;
                }
                .booking-id {
                    background: #fbe9e7;
                    color: #b71c1c;
                    padding: 4px 10px;
                    border-radius: 5px;
                    font-weight: 500;
                    display: inline-block;
                    margin: 8px 0;
                }
                table {
                    width: 100%;
                    margin-top: 16px;
                    border-collapse: collapse;
                }
                td {
                    padding: 8px;
                    border-bottom: 1px solid #e0e7ef;
                }
                .footer {
                    margin-top: 32px;
                    text-align: center;
                    color: #888;
                    font-size: 13px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <center>
                    <img src="https://www.shutterstock.com/image-vector/taxi-service-logo-design-set-260nw-2330988463.jpg" alt="Andaman Cabs Logo" style="height:50px;" />
                </center>
                <div class="header">
                    <h2>Ticket Not Confirmed</h2>
                </div>
                <div class="content">
                    <p>Dear ${toName},</p>
                    <p>We regret to inform you that your ticket could not be confirmed. Below are your booking details:</p>
                    <p><strong>Issue:</strong> <span class="booking-id">${error}</span></p>
                    <table>
                        <tr><td><strong>Ferry Name</strong></td><td>${ferryName}</td></tr>
                        <tr><td><strong>Date</strong></td><td>${date}</td></tr>
                        <tr><td><strong>From</strong></td><td>${fromLocation}</td></tr>
                        <tr><td><strong>To</strong></td><td>${toLocation}</td></tr>
                    </table>
                    <p><strong>Refund:</strong> Your payment will be refunded within <strong>3–7 working days</strong>.</p>
                    <p>Booking time: <strong>${getCurrentISTTimestamp()}</strong></p>
                    <hr/>
                    <p>If you have any questions, feel free to contact us at <a href='mailto:enquiryandamancabs@gmail.com'>enquiryandamancabs@gmail.com</a>.</p>
                    <p>We sincerely apologize for the inconvenience caused.</p>
                </div>
                <div class="footer">
                    &copy; ${new Date().getFullYear()} Andaman Cabs. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    `;

    // const emailData = {
    //     "sender": { "email": "enquiryandamancabs@gmail.com", "name": "Andaman Cabs" },
    //     "subject": `Ticket Not Confirmed`,
    //     "htmlContent": htmlContent,
    //     "to": [{ "email": toEmail, "name": toName }]
    // };

    const emailData2 = {
        "sender": {
            "email": "enquiryandamancabs@gmail.com",
            "name": "Andaman Cabs"
        },
        "subject": `Ticket is Not Confirmed`,
        "htmlContent": htmlContent,
        "messageVersions": [
            //Definition for Message Version 1 
            {
                "to": [
                    {
                        "email": "enquiryandamancabs@gmail.com",
                        "name": "Andman Cabs"
                    }
                    
                ],
                "htmlContent": htmlContent,
                "subject": `Copy of Ticket is Not Confirmed by ${toName} for ${ferryName}`
            },

            // Definition for Message Version 2
            {
                "to": [{ email: toEmail, name: toName }]
            }
        ]
    }

    try {
        const response = await axios.post(BREVO_API_URL, emailData2, {
            headers: {
                'api-key': BREVO_API_KEY,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error sending payment received email:', error.response?.data || error.message);
        throw error;
    }
}
