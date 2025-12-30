import React, {useEffect, useState} from 'react';
import styles from './ComponentLayout.module.scss';
import {content} from "./content";

interface contentItem {
  name: string;
  title: string;
  components: componentItem[];
}

interface componentItem {
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
        </main>
      </div>
  );
}