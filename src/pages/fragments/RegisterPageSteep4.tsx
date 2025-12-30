import React, {Fragment, useEffect, useState} from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function RegisterPageSteep4({emails = [""], error, saveEmails}: {
  emails: string[],
  error: boolean,
  saveEmails: (emails: string[]) => void
}) {
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    setEmailError(error);
  }, [error])

  const saveEmail = (name: string, email: string) => {
    setEmailError(false);
    const nextEmails = [...emails];
    nextEmails[nextEmails.length - 1] = email;
    saveEmails(nextEmails);
  }

  const checkEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailPattern.test(emails[emails.length - 1]);
    setEmailError(!isEmail);
    return isEmail;
  }

  const addEmail = () => {
    if (checkEmail()) {
      const arrEmails = [...emails];
      arrEmails.push("");
      saveEmails(arrEmails);
    }
  }

  return (
      <>
        <span className="sign-up-content-steeps">Step 4/4</span>
        <h2 className="sign-up-title">Invite Team Members</h2>
        <Input type="text" title="Member’s Email" placeholder="memberemail@gmail.com" name="email"
               value={emails[emails.length - 1] ?? ""} error={emailError} errorText="Невірний формат Email"
               changed={saveEmail}/>
        {emails.map((element, index) => (<Fragment key={index}>
          {index !== emails.length - 1 && <p className="invited-email">{element}</p>}
        </Fragment>))}
        <Button title="Add another Member" path="add" classList="back" click={addEmail}/>
      </>
  );
}