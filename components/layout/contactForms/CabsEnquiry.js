
// Helper to get current IST time in 'YYYY-MM-DD HH:mm:ss'
import { getCurrentISTTimestamp } from "@/components/utils/getCurrentISTTimeStamp";

export async function cabsEnquiryEmail({
  service,
  name,
  email,
  price,
  mobile,
  noOfPersons,
  pickupLocation,
  dropLocation,
  dateAndTime
}) {
  const htmlContent = `
    <html>

<body style="background: #f4f8fb; font-family: poppins;">
    <div style="background: #fff;
            max-width: 480px;
            margin: 40px auto;
            border-radius: 18px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.10);
            padding: 36px 28px;">
        <center style="margin-bottom: 10px;">
            <img src="https://andamancabs.vercel.app/img/logos/logo-header.png"
                alt="Andaman Cabs Logo" style="height:100px; border-radius:8px;" />
        </center>
        <div style="text-align: center;
            padding-bottom: 18px;
            border-bottom: 1px solid #e0e7ef;">
            <h2 style="color: #fd9d0d;
            margin: 0;
            font-size: 28px;
            letter-spacing: 1px;
            font-weight: 700;">Cabs Booking Enquiry</h2>
        </div>
        <div style=" margin-top: 28px;
            color: #222;
            font-size: 16px;
            line-height: 1.7;">
            <p>Hello <b>${name}</b>,</p>
            <p>Thank you for your Booking Cab! Here are your details:</p>
            <table style="width: 100%;
            margin-top: 18px;
            border-collapse: collapse;
            background: #fafbfc;
            border-radius: 8px;
            overflow: scroll;">
                <tr>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;"><strong>Service
                            Name</strong></td>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;">${service}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;"><strong>Price</strong></td>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;">₹${price}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;">
                        <strong>Name</strong>
                    </td>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;">
                        <strong>Email</strong>
                    </td>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;">${email}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;">
                        <strong>Mobile</strong>
                    </td>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;">${mobile}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;">
                        <strong>No. of People</strong>
                    </td>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;">${noOfPersons}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;">
                        <strong>Date and Time</strong>
                    </td>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;">${dateAndTime}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;">
                        <strong>Pickup Location</strong>
                    </td>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;">${pickupLocation}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;"><strong>Drop Location</strong></td>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;">${dropLocation}</td>
                </tr>
            </table>
            <p style="margin-top:18px;">Booking time: <strong>${getCurrentISTTimestamp()}</strong></p>
            <hr style="margin:24px 0; border: none; border-top: 1px solid #e0e7ef;" />
            <p>If you have any questions, feel free to contact us at <a
                    href='mailto:enquiryandamancabs@gmail.com'>enquiryandamancabs@gmail.com</a>.</p>
            <p>Thank you for choosing <strong>Andaman Cabs</strong>!</p>
        </div>
        <div style=" margin-top: 36px;
            text-align: center;
            color: #888;
            font-size: 13px;">
            &copy; ${new Date().getFullYear()} Andaman Cabs. All rights reserved.
        </div>
    </div>
</body>

</html>
  `;

  const emailData = {
    sender: { email: "enquiryandamancabs@gmail.com", name: "Andaman Cabs" },
    subject: `Cab Booking Received - ${service}`,
    htmlContent,
    messageVersions: [
      // Admin copy
      {
        to: [{ email: "enquiryandamancabs@gmail.com", name: "Admin AndamanCabs" }],
        subject: `New Cab Booking - ${service} by ${name}`,
        htmlContent,
      },
      // User confirmation
      {
        to: [{ email, name }],
        subject: `Thank you for Booking Cab - ${service}`,
        htmlContent,
      },
    ],
  };

  try {
    const response = await fetch("/api/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailData), // 👈 directly sending emailData
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error sending enquiry email:", error.response?.data || error.message);
    throw error;
  }
}
