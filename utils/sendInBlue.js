import SibApiV3Sdk from "sib-api-v3-sdk";

const sendInBlue = async ({ receiverEmail, receiverName, message, subject, organizationName }) => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;

  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.SIB_API_KEY;

  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  const sender = {
    name: `Pulse | ${organizationName}`,
    email: "noreply@pulse.radartrail.com",
  };

  const receiver = [
    {
      email: receiverEmail,
      name: receiverName,
    },
  ];

  const replyTo = {
    email: "noreply@pulse.radartrail.com",
  };

  sendSmtpEmail = {
    sender,
    to: receiver,
    replyTo,
    subject: subject,
    htmlContent: message,
  };

  await apiInstance.sendTransacEmail(sendSmtpEmail);
};

export default sendInBlue;
