export const appliedTemplate = ({ name, jobTitle, company }) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>Application Submitted ✅</h2>

    <p>Hi <b>${name}</b>,</p>

    <p>
      You have successfully applied for the
      <b>${jobTitle}</b> role at <b>${company}</b>.
    </p>

    <p>
      We’ll notify you if there are any updates regarding your application.
    </p>

    <p>Best of luck!! </p>

    <p><b>${company} Hiring Team</b></p>
  </div>
`;

export const interviewTemplate = ({ name, jobTitle, company, date, time }) => `
  <h2>Interview Scheduled 📅</h2>

  <p>Hi <b>${name}</b>,</p>

  <p>
    Congratulations! 🎉 You have been shortlisted for the
    <b>${jobTitle}</b> role at <b>${company}</b>.
  </p>

  <p><b>Interview Details:</b></p>

  <ul>
    <li><b>Date:</b> ${date}</li>
    <li><b>Time:</b> ${time}</li>
    <li><b>Mode:</b> Online</li>
  </ul>

  <p>
    Please be available at the scheduled time. The recruiter will
    reach out if any additional information is required.
  </p>

  <br/>

  <p>
    Best of luck! 🍀<br/>
    <b>Insider Jobs Team</b>
  </p>
`;

export const rejectedTemplate = ({ name, jobTitle, company }) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>Application Update</h2>

    <p>Hi <b>${name}</b>,</p>

    <p>
      Thank you for applying for the
      <b>${jobTitle}</b> role at <b>${company}</b>.
    </p>

    <p>
      After careful consideration, we won’t be moving forward with your
      application at this time.
    </p>

    <p>
      We truly appreciate your interest in <b>${company}</b> and encourage
      you to apply again in the future.
    </p>

    <p>We wish you the very best.</p>

    <p><b>${company} Hiring Team</b></p>
  </div>
`;

export const newJobPostedTemplate = ({
  jobTitle,
  company,
  location,
  level,
}) => `
  <h2>New Job Opportunity 🚀</h2>

  <p>Hello,</p>

  <p>
    A new job has just been posted on <b>InsiderJobs</b> that might
    interest you.
  </p>

  <p><b>Job Details:</b></p>

  <ul>
    <li><b>Role:</b> ${jobTitle}</li>
    <li><b>Company:</b> ${company}</li>
    <li><b>Location:</b> ${location}</li>
    <li><b>Level:</b> ${level}</li>
  </ul>

  <p>
    Visit InsiderJobs now to apply before the position fills up.
  </p>

  <br/>

  <p>
    Happy Job Hunting!!<br/>
    <b>Insider Jobs Team</b>
  </p>
`;
