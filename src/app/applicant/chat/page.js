"use client";
import ChatWindow from "@/components/Chat/ChatWindow/ChatWindow";
import SearchAndMenu from "@/components/Chat/SearchAndMenu/SearchAndMenu";
import Nav from "@/components/Nav/Nav";
import styles from "./page.module.scss";
import { addBackLink } from "@/helpers/addBackLinkToNavigationSlice";
import { linkHrefApplicantAboutEmployer } from "@/Links";

export default function ApplicantChat() {
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Nav page="Чат и отклики" />
      </nav>
      <div className={styles.container}>
        <div className={styles.container__aside}>
          <SearchAndMenu />
        </div>
        <div className={styles.container__content}>
          <ChatWindow
            addBackLink={() =>
              addBackLink(
                linkHrefApplicantAboutEmployer,
                "Чат и отклики",
                "О компании/Вакансии компании"
              )
            }
          />
        </div>
      </div>
    </main>
  );
}
