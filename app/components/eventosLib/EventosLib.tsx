"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Eventos.module.scss";
import videoPlaceholder from "../../../public/video-placeholder.png";

export default function EventosLib() {
  const [eventCount, setEventCount] = useState(10);
  const [eventStarted, setEventStarted] = useState(false);

  useEffect(() => {
    if (eventCount <= 0) {
      setEventStarted(true);
      return;
    }
    const timer = setInterval(() => {
      setEventCount((prevCount) => prevCount - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [eventCount]);

  return (
    <div className={styles.eventosContainer}>
      <h2 className={styles.title}>Próximo Evento Começa em:</h2>
      <div className={styles.counter}>
        {!eventStarted ? (
          <>
            <span className={styles.countNumber}>{eventCount}</span>
            <span className={styles.unit}> segundos</span>
          </>
        ) : (
          <div className={styles.videoPlaceholder}>
            <span className={styles.message}>Evento Começou!</span>
            <Image
              src={videoPlaceholder}
              alt="Animação de evento começando"
              layout="responsive"
              width={600}
              height={400}
              className={styles.animatedImage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
