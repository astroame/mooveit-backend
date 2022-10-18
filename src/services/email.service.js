import asyncHandler from "../middlewares/async.js";
import ErrorResponse from "../utils/errorResponse.js";
import sendInBlue from "../utils/sendInBlue.js";

export const sendEmail = asyncHandler(
  async ({ subject, req, user, path, buttonText, body, method, errorResponse, userToken, userTokenExpire }) => {
    // Get reset token
    const token = await method;

    // send the invite
    const url = "https://movveit.vercel.app/" + path + "/" + token;

    const message = `
    <html>
    <head>
    <style>
      @media (max-width: 450px) {
        img {
          width: 95%;
        }
      }

      @media (min-width: 769px) {
        .container {
          width: 40%;
        }
      }
    </style>
  </head>
  <body
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(214, 214, 214);
    "
  >
    <div
      class="container"
      style="
        border: 1px solid rgb(222, 222, 222);
        border-radius: 10px;
        background-color: white;
        margin: 50px auto;
        text-align: center;
        padding: 30px 40px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      "
    >

      <p style="text-align: left; margin-top: 15px; color: rgb(83, 83, 83)">
       ${body}
        <br />
        <br />
        <br />
      </p>
      <a
        href="${url}"
        style="
          background: #26348c;
          padding: 10px 20px;
          border-radius: 15px;
          color: white;
          display: inline-block;
          margin-bottom: 10px;
          text-decoration: none;
        "
      >
      ${buttonText}
      </a>
    </div>
  </body>
    </html>
   `;

    // Send verification email
    try {
      await sendInBlue({
        receiverEmail: user.email,
        receiverName: `${user.firstName}`,
        message,
        subject,
      });

      return;
    } catch (error) {
      userToken = undefined;
      userTokenExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new ErrorResponse(`${errorResponse}`, 500));
    }
  }
);
