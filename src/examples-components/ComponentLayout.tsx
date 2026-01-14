import React, {useEffect, useState} from 'react';
import styles from './ComponentLayout.module.scss';
import {content} from "./content";
import * as Yup from "yup";
import {Form, Formik} from "formik";

type contentItem = {
  name: string;
  title: string;
  components: componentItem[];
}

type componentItem = {
  example: React.ReactNode;
  code: string;
  comment: string;
}

export default function ComponentLayout() {
  const [activePage, setActivePage] = useState<string>("buttons");
  const [components, setComponents] = useState<componentItem[]>([]);

  useEffect(() => {
    const page: contentItem | undefined = content.find((item: contentItem) => item.name === activePage);
    if (page) setComponents(page.components);
  }, [activePage]);

  const initialValues = {
    email: "",
    password: "",
    remember_me: true,
    why_use: 1,
    description: "",
    isLink: false
  };

  const regexp = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
    description: /^[а-яА-Яa-zA-Z0-9,.!?@#$%^&*()_+=\-*/ ]{10,500}$/
  }

  const email = Yup.string().matches(regexp.email, "Должно быть в формате 'example@test.com'").required("Введите название");
  const password = Yup.string()
      .matches(regexp.password, "Минимум 8 символов, одна заглавная, одна строчная, цифра и спецсимвол")
      .required("Введите пароль");
  const remember_me = Yup.boolean();
  const why_use = Yup.number().required("Выберете...");
  const description = Yup.string().matches(regexp.description, "Количество символов от 10 до 500").required("Введите описание");
  const isLink = Yup.boolean();


  const schemas = {
    custom: Yup.object().shape({
      email, password, remember_me, why_use, description, isLink
    })
  }

  return (
      <div className={styles.grid}>
        <aside className={styles.aside}>
          <h3 className={styles.title}>Menu:</h3>
          <ul className={styles.list}>
            {content.map((item: contentItem, index) => (
                <li
                    key={index}
                    className={`${styles.listItem} ${activePage === item.name ? styles.active : ""}`}
                    onClick={() => setActivePage(item.name)}
                >
                  <span>{item.title}</span>
                </li>
            ))}
          </ul>
        </aside>
        <main>
          <Formik initialValues={initialValues} validationSchema={schemas.custom} onSubmit={() => {
          }}>
            <Form>
              <div className={styles.LayoutItem}>
                <div className={styles.header}>
                  <h5 className={styles.headerTitle}>Приклад</h5>
                  <h5 className={styles.headerTitle}>Код</h5>
                  <h5 className={styles.headerTitle}>Коментар</h5>
                </div>
                {components.map((el: componentItem, index) => (
                    <div key={index} className={styles.item}>
                      <div className={styles.itemExample}>{el.example}</div>
                      <div className={styles.itemCode}>
                        <span className={styles.code}>{el.code}</span>
                      </div>
                      <div className={styles.itemTitle}>
                        <span className={styles.comment}>{el.comment}</span>
                      </div>
                    </div>
                ))}
              </div>
            </Form>
          </Formik>
        </main>
      </div>
  );
}