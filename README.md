# If you want to check out the project go here: [link](https://otp-generator-eta.vercel.app/)
#Sanity_Check (kindly ignore this line)
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). To run this, you would 
need to install both Node JS and Next JS.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Issues you can solve or things you can help out with:

First of all the OTP generation logic is based on current time and the IP address of the device accessing this web app. To run this, you need to install and set up Next JS
and download this repo and run the command ```npm run dev``` in your command prompt after changing to the directory where you have saved this project.

### List of things you can try out and improve upon:
1. Make the frontend better using various styles and effects.
2. Add a rate limiter to prevent brute-forcing of OTP
3. Check whether the OTP generated is actually safe or not, i.e., check whether a scenario might occur when two people get the same OTP simultaneously. Improve the logic for that case.
4. Add a QR code feature so it allows the OTP being displayed as a QR code and the receiver can scan QR codes and check whether OTP is valid or not.
5. Suggest ways to make it even more secure by implementing 2-factor authentication like OTPs directly sent to email or even facial scan to check whether the same person who has received the OTP is entering it or not.


