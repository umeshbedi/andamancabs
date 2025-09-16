import axios from 'axios';

const BREVO_API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

// Helper to get current IST time in 'YYYY-MM-DD HH:mm:ss' format
function getCurrentISTTimestamp() {
    const now = new Date();
    const istOffset = 330;
    const istTime = new Date(now.getTime() + (istOffset - now.getTimezoneOffset()) * 60000);
    const pad = n => n.toString().padStart(2, '0');
    return `${istTime.getFullYear()}-${pad(istTime.getMonth() + 1)}-${pad(istTime.getDate())} ${pad(istTime.getHours())}:${pad(istTime.getMinutes())}:${pad(istTime.getSeconds())}`;
}

export async function sendSeatConfirmationEmail({ toEmail, toName, pnr, ferryName, date, fromLocation, toLocation }) {
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
                    color: #1a73e8;
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
                    background: #f1f8e9;
                    color: #33691e;
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
                    <h2>Seat Confirmation</h2>
                </div>
                <div class="content">
                    <p>Dear ${toName},</p>
                    <p>Your seat has been successfully confirmed. Here are your booking details:</p>
                    <p><strong>PNR:</strong> <span class="booking-id">${pnr}</span></p>
                    <table>
                        <tr><td><strong>Ferry Name</strong></td><td>${ferryName}</td></tr>
                        <tr><td><strong>Date</strong></td><td>${date}</td></tr>
                        <tr><td><strong>From</strong></td><td>${fromLocation}</td></tr>
                        <tr><td><strong>To</strong></td><td>${toLocation}</td></tr>
                    </table>
                    <p>Booking time: <strong>${getCurrentISTTimestamp()}</strong></p>
                    <hr/>
                    <p>If you have any questions, feel free to contact us at <a href='mailto:enquiryandamancabs@gmail.com'>enquiryandamancabs@gmail.com</a>.</p>
                    <p>Thank you for choosing <strong>Andaman Cabs</strong>!</p>
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
    //     "subject": `Seat Confirmation - PNR ${pnr}`,
    //     "htmlContent": htmlContent,
    //     "to": [{ "email": toEmail, "name": toName }]
    // };

    const emailData2 = {
        "sender": {
            "email": "enquiryandamancabs@gmail.com",
            "name": "Andaman Cabs"
        },
        "subject": `Seat Confirmation - PNR ${pnr}`,
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
                "subject": `Copy of Seat Confirmation - PNR ${pnr} by ${toName} for ${ferryName}`
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
