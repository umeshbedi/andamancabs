import { getCurrentISTTimestamp } from "@/components/utils/getCurrentISTTimeStamp";

// Helper to get current IST time in 'YYYY-MM-DD HH:mm:ss'

export async function contactUsEmail({
    name,
    email,
    mobile,
    childs,
    adults,
    message,
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
            font-weight: 700;">Contact Us Enquiry</h2>
        </div>
        <div style=" margin-top: 28px;
            color: #222;
            font-size: 16px;
            line-height: 1.7;">
            <p>Hello <b>Andaman Cabs</b>,</p>
            <p>New Enquiry from contact us page! Here are details:</p>
            <table style="width: 100%;
            margin-top: 18px;
            border-collapse: collapse;
            background: #fafbfc;
            border-radius: 8px;
            overflow: scroll;">
                
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
                        <strong>No. Adults</strong>
                    </td>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;">${adults}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;">
                        <strong>No. Child</strong>
                    </td>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;">${childs||0}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;">
                        <strong>Message</strong>
                    </td>
                    <td style="padding: 10px 8px;border-bottom: 1px solid #e0e7ef;font-size: 15px;">${message}</td>
                </tr>
                
            </table>
            <p style="margin-top:18px;">Mailing Time: <strong>${getCurrentISTTimestamp()}</strong></p>
            <hr style="margin:24px 0; border: none; border-top: 1px solid #e0e7ef;" />
            
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
        subject: `New Contact Us Enquiry`,
        htmlContent,
        messageVersions: [
            // Admin copy
            {
                to: [{ email: "enquiryandamancabs@gmail.com", name: "Admin AndamanCabs" }],
                subject: `New Contact Us Enquiry`,
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
