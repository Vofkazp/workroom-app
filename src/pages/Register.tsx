import React, {useState} from "react";
import Button from "../components/Button";
import RegisterPageSteep1 from "./fragments/RegisterPageSteep1";
import RegisterPageSteep2 from "./fragments/RegisterPageSteep2";
import RegisterPageSteep3 from "./fragments/RegisterPageSteep3";
import RegisterPageSteep4 from "./fragments/RegisterPageSteep4";
import {useAuth} from "../services/Auth";
import {businessDirection, roleList, teamSizeList, whyUse} from "../resurses/SelectList";
import {useNavigate} from "react-router-dom";
import {useAuthentication} from "../services/AuthProvider";

export default function Register() {
  const {saveAuthData} = useAuthentication();
  const navigate = useNavigate();
  const {register, createCompany, getCurrentUser, updateUser, inviteMembers} = useAuth();
  const [steep, setSteep] = useState(1);
  const [form, setForm] = useState({
    phone: "80",
    email: "",
    password: "",
    why_use: 1,
    role: 1,
    self_employed: true,
    name: "",
    direction: 1,
    team_size: 1,
    emails: [""]
  });


  const registration = async (emailsArr: string[]) => {
    try {
      // await register("+" + prefixPhone + form.phone, form.email, form.password);
      const user = await getCurrentUser();
      if (user?.status) {
        saveAuthData({isAuth: true, user: user.response});
        const business_direction: string = businessDirection.find(el => el.value === form.direction)!.label;
        const team_size: string = teamSizeList.find(el => el.value === form.team_size)!.label;
        const company = await createCompany(form.name, business_direction, team_size, user.response!.id);
        const why_use: string = whyUse.find(el => el.value === form.why_use)!.label;
        const role: string = roleList.find(el => el.value === form.role)!.label;
        await updateUser(user.response!.id, why_use, role, form.self_employed, company!.response.companyId);
        if (emailsArr.length > 0) await inviteMembers(company!.response.companyId, user.response!.id, emailsArr);
        setSteep(steep + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const toFinish = () => {
    navigate("/");
  }

  const inviteForm = <div className="main-content sign-up">
    <div className="sign-up-info">
      <img src="/images/logo_white.png" alt="logo" className="sign-up-logo"/>
      <h3 className="sign-up-info-title">Get started</h3>
      <ul className="steeps-block">
        <li className={`steeps-item ${steep === 1 && "active-steep"} ${steep > 1 && "finish-steep"}`}>
          <div className="status-icon"></div>
          <p className="steep-title">Valid your phone</p>
        </li>
        <li className={`steeps-item ${steep === 2 && "active-steep"} ${steep > 2 && "finish-steep"}`}>
          <div className="status-icon"></div>
          <p className="steep-title">Tell about yourself</p>
        </li>
        <li className={`steeps-item ${steep === 3 && "active-steep"} ${steep > 3 && "finish-steep"}`}>
          <div className="status-icon"></div>
          <p className="steep-title">Tell about your company</p>
        </li>
        <li className={`steeps-item ${steep === 4 && "active-steep"} ${steep > 4 && "finish-steep"}`}>
          <div className="status-icon"></div>
          <p className="steep-title">Invite Team Members</p>
        </li>
      </ul>
    </div>
    {/*<div className="sign-up-content-block card">*/}
    {/*  <div className="sign-up-content">*/}
    {steep === 1 && <RegisterPageSteep1 phonePref={3} phoneNumber="80" emailString="" passwordString=""/>}
    {/*{steep === 2 && <RegisterPageSteep2 why_use={form.why_use} role={form.role} self_employed={form.self_employed}*/}
    {/*                                    onSave={onSave}/>}*/}
    {/*{steep === 3 && <RegisterPageSteep3 name={form.name} nameError={nameError} direction={form.direction}*/}
    {/*                                    team_size={form.team_size} onSave={onSave}/>}*/}
    {/*{steep === 4 && <RegisterPageSteep4 emails={form.emails} error={emailsError} saveEmails={saveEmail}/>}*/}
    {/*  </div>*/}
    {/*  <div className="sign-up-content-footer">*/}
    {/*    <div>*/}
    {/*      {steep > 1 && <Button title="Previous" path="back" classList="back" click={prevSteep}/>}*/}
    {/*    </div>*/}
    {/*    <Button title="Next Step" path="arrowRight" classList="btn-primary btn-primary-icon" click={nextSteep}/>*/}
    {/*  </div>*/}
    {/*</div>*/}
  </div>;

  const finish = <div className="main-content success">
    <div className="success-block card">
      <img src="/images/success-img.png" alt="success" className="success-img"/>
      <h5 className="success-title">You are successfully registered!</h5>
      <Button title="Let's Start" path="arrowRight" classList="btn-primary btn-primary-icon" click={toFinish}/>
    </div>
  </div>;

  return (steep < 5 ? inviteForm : finish);
}