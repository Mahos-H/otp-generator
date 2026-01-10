"use client";
import { useState, useEffect } from "react";
import QRcomp from "../components/qr-comp";

export default function Generator() {
  const [finalOtp, setFinalOtp] = useState("");
  const [userIp, setUserIp] = useState("");
  const [qrGen,setQrGen] = useState(false);
  const [email, setEmail] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { 
    setIsClient(true);}, 
    []);
  
  if (!isClient) {
    return null;
  }

  // Helper function to hash input and truncate to 8 digits
 const generate8DigitOtp = async (input) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // Convert first 4 bytes into a number, then limit to 8 digits
  const otp = ((hashArray[0] << 24) | (hashArray[1] << 16) | (hashArray[2] << 8) | hashArray[3]) >>> 0;
  return otp % 100000000;
  };

  const generateOtp = async () => {
    if (!isClient) return;

    if (!email) {
      alert("Please enter an email address");
      return;
    }
    try {
      // Fetch the user's IP address
      const response = await fetch("https://api64.ipify.org?format=json"); // Get user's public IP
      const data = await response.json();
      const ipAddress = data.ip; // Extract the IP address
      setUserIp(ipAddress);
      // Generate OTP based on time and IP
      const currentTime = Math.floor(Date.now() / (1000 * 60 * 2)); // Time rounded to 2-minute intervals
      const otp = (await generate8DigitOtp(`${currentTime}-${ipAddress}-${email}`)).toString().padStart(8, "0");
      setQrGen(false);
      setFinalOtp(otp);
      const mailtoLink = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Your OTP")}&body=${encodeURIComponent(`Your OTP is: ${otp}`)}`;
      
      console.log(`User IP: ${ipAddress}`);
      console.log(`Generated OTP: ${otp}`);
    } catch (error) {
      console.error("Error fetching IP or generating OTP:", error);
    }
  };
  const sendOtpToEmail = () => {
  if (!finalOtp || !email) return;

  const subject = encodeURIComponent(
   "Your Secure OTP (Valid for 2 Minutes)"
   );

  const body = encodeURIComponent(
   `Your One-Time Password (OTP) is: ${finalOtp}

    This code is valid for 2 minutes.
    Do not share this code with anyone.`
   );

   const mailtoLink = `mailto:${encodeURIComponent(email)}?subject=${subject}&body=${body}`;
   window.open(mailtoLink, "_blank");

  };

  const generateQR = () =>
    {
      setQrGen(true);
    }
  return (
    <div className="block">
      <h1 className="otp fade-in">Secure OTP Generator</h1>
      <div className="input-group">
      <form autoComplete="on">
      <label className="input-label">Email address</label>
      <input type="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
      </form>
      </div>
      <button className="links fade-in" onClick={generateOtp}><span className="front">Generate OTP</span></button>
      {finalOtp && (<>
        <p className="valid">
          Your OTP: <strong>{finalOtp}</strong> <br />
          Note: Valid for 2 minutes.
        </p>
        <div className="action-group">
        <button className="links fade-in" onClick={sendOtpToEmail}>
        <span className="front">Send OTP to Email</span>
        </button>
        <button className="links fade-in" onClick={generateQR}>
        <span className="front">
        GENERATE QR-CODE
        </span>
        </button>
        </div></>
      )}
      <div>
        {qrGen && (<QRcomp otp={finalOtp}/>)}
      </div>
    </div>
  );
}
