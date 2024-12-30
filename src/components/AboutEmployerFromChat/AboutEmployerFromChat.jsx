"use client";
import { linkHrefApplicantChat, linkHrefEmployerChat } from "@/Links";
import Link from "next/link";
import styles from "./AboutEmployerFromChat.module.scss";

const AboutEmployerFromChat = ({ isApplicant = true }) => {
  const chatPath = isApplicant ? linkHrefApplicantChat : linkHrefEmployerChat;
  return (
    <div className={styles.grid}>
      <div className={styles.titleContainer}>
        <Link href={chatPath}>
          <img
            src="/images/chats/back.svg"
            alt="back"
            style={{ cursor: "pointer" }}
          />
        </Link>
        <h1 className={styles.titleCompany}>О компании</h1>
      </div>
      <div className={styles.mobileLogo}>
        <div className={styles.logoContainer}>
          <img
            src="/images/chats/company.svg"
            alt="logo"
            className={styles.logo}
          />
          <p>СберАналитика</p>
        </div>
      </div>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <h2 className={styles.heading}>Адрес</h2>
          <p className={styles.paragraph2}>Московское шоссе, 212, оф. 400</p>
        </div>
        <div className={styles.sidebarContent}>
          <h2 className={styles.heading}>Контакты</h2>
          <p className={styles.paragraph2}>sberanalytics.ru</p>
        </div>
        <div className={styles.sidebarContent}>
          <h2 className={styles.heading}>Вакансии компании</h2>
          <a href="#" className={styles.link}>
            6 вакансий
          </a>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>О компании</h1>
          <div className={styles.logoContainer}>
            <img
              src="/images/chats/company.svg"
              alt="logo"
              className={styles.logo}
            />
            <p>СберАналитика</p>
          </div>
        </div>
        <hr className={styles.divider} />
        <p className={styles.paragraph}>
          Мы ИТ-компания Экосистемы Сбера и работаем под брендом СберАналитика.{" "}
          <br /> <br />
          СберАналитика – это аналитическая платформа, продукты которой помогают
          нашим клиентам открывать и развивать бизнес, изучать конкурентов,
          управлять рисками и оценивать аудиторию. <br /> <br />
          На данный момент у нас открыта вакансия аналитик данных в команду,
          которая занимается страховыми и корпоративными продуктами. Продукт -
          витрины данных по продуктам управления благосостоянием.
          <br /> <br /> Мы ИТ-компания Экосистемы Сбера и работаем под брендом
          СберАналитика. <br /> <br />
          СберАналитика – это аналитическая платформа, продукты которой помогают
          нашим клиентам открывать и развивать бизнес, изучать конкурентов,
          управлять рисками и оценивать аудиторию. <br /> <br />
          На данный момент у нас открыта вакансия аналитик данных в команду,
          которая занимается страховыми и корпоративными продуктами. Продукт -
          витрины данных по продуктам управления благосостоянием.
        </p>
      </main>
    </div>
  );
};

export default AboutEmployerFromChat;
