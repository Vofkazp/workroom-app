import React, {useState} from "react";
import Button from "../components/Button";
import RegisterPageSteep1, {FormValues} from "./fragments/RegisterPageSteep1";
import RegisterPageSteep2, {SelectValues} from "./fragments/RegisterPageSteep2";
import RegisterPageSteep3, {CompanyValues} from "./fragments/RegisterPageSteep3";
import RegisterPageSteep4 from "./fragments/RegisterPageSteep4";
import {useAuth} from "../services/Auth";
import {businessDirection, roleList, teamSizeList, whyUse} from "../resurses/SelectList";
import {useNavigate} from "react-router-dom";
import {useAuthentication} from "../services/AuthProvider";
import Loader from "../components/Loader";
import {useNotifications} from "../services/NitificationProvider";

type StepPayload = {
  1: FormValues;
  2: SelectValues;
  3: CompanyValues;
  4: { emails: string[] };
};

export default function Register() {
  const {saveAuthData} = useAuthentication();
  const {addNotification} = useNotifications();
  const navigate = useNavigate();
  const {register, createCompany, getCurrentUser, updateUser, inviteMembers} = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    phone_prefix: 3,
    phone: "80",
    email: "",
    password: "",
    why_use: 1,
    role: 1,
    self_employed: "true",
    name: "",
    direction: 1,
    team_size: 1,
    emails: [""]
  });

  const saveStep = <S extends keyof StepPayload>(
      step: S,
      value: StepPayload[S]
  ) => {
    setForm(prev => ({...prev, ...value}));
    if (step === 4) startRegister();
    setStep(prev => prev + 1);
  };

  const startRegister = () => {
    setLoading(true);
    setTimeout(registration, 2000);
  }

  const registration = async () => {
    try {
      await register("+" + form.phone_prefix + form.phone, form.email, form.password);
      const user = await getCurrentUser();
      if (user?.status) {
        saveAuthData({isAuth: true, user: user.response});
        const business_direction: string = businessDirection.find(el => el.value === form.direction)!.label;
        const team_size: string = teamSizeList.find(el => el.value === Number(form.team_size))!.label;
        const company = await createCompany(form.name, business_direction, team_size, user.response!.id);
        const why_use: string = whyUse.find(el => el.value === form.why_use)!.label;
        const role: string = roleList.find(el => el.value === form.role)!.label;
        await updateUser(user.response!.id, why_use, role, Boolean(form.self_employed), company!.response.companyId);
        await inviteMembers(company!.response.companyId, user.response!.id, form.emails);
      }
    } catch (error: any) {
      addNotification(error, "warning");
      console.log(error);
    } finally {
      setLoading(false);
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
        <li className={`steeps-item ${step === 1 && "active-steep"} ${step > 1 && "finish-steep"}`}>
          <div className="status-icon"></div>
          <p className="steep-title">Valid your phone</p>
        </li>
        <li className={`steeps-item ${step === 2 && "active-steep"} ${step > 2 && "finish-steep"}`}>
          <div className="status-icon"></div>
          <p className="steep-title">Tell about yourself</p>
        </li>
        <li className={`steeps-item ${step === 3 && "active-steep"} ${step > 3 && "finish-steep"}`}>
          <div className="status-icon"></div>
          <p className="steep-title">Tell about your company</p>
        </li>
        <li className={`steeps-item ${step === 4 && "active-steep"} ${step > 4 && "finish-steep"}`}>
          <div className="status-icon"></div>
          <p className="steep-title">Invite Team Members</p>
        </li>
      </ul>
    </div>
    {step === 1 && <RegisterPageSteep1 phonePref={form.phone_prefix} phoneNumber={form.phone} emailString={form.email}
                                       passwordString={form.password} onChecked={(value) => saveStep(1, value)}/>}
    {step === 2 && <RegisterPageSteep2 whyUseItem={form.why_use} roles={form.role} selfEmployed={form.self_employed}
                                       onChecked={(value) => saveStep(2, value)}
                                       prevSteep={() => setStep(prev => prev - 1)}/>}
    {step === 3 && <RegisterPageSteep3 Name={form.name} Direction={form.direction} teamSize={form.team_size}
                                       onChecked={(value) => saveStep(3, value)}
                                       prevSteep={() => setStep(prev => prev - 1)}/>}
    {step === 4 &&
        <RegisterPageSteep4 Emails={form.emails} onChecked={(value) => saveStep(4, value)}
                            prevSteep={() => setStep(prev => prev - 1)}/>}
  </div>;

  const finish = <div className="main-content success">
    <div className="success-block card">
      {loading ?
          <Loader size="large" speed="average"/> :
          <>
            <img src="/images/success-img.png" alt="success" className="success-img"/>
            <h5 className="success-title">You are successfully registered!</h5>
            <Button title="Let's Start" path="arrowRight" classList="btn-primary btn-primary-icon" click={toFinish}/>
          </>
      }
    </div>
  </div>;

  return (step < 5 ? inviteForm : finish);
}