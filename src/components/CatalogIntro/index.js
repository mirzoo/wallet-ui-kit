import GentleReveal from "../GentleReveal"
import Tappable from "../Tappable"
import Text from "../Text"
import config from "../../pages/config"

import * as styles from "./CatalogIntro.module.scss"

const pageCount = config.reduce((total, group) => total + group.pages.length, 0)

const CatalogIntro = () => (
    <section className={styles.root}>
        <div className={styles.heading}>
            <Text
                apple={{ variant: "title1", weight: "semibold" }}
                material={{ variant: "title1", weight: "medium" }}
            >
                <GentleReveal text="Wallet UI Kit" />
            </Text>
        </div>
        <div className={styles.description}>
            <Text
                apple={{ variant: "body", weight: "regular" }}
                material={{ variant: "subheadline1", weight: "regular" }}
            >
                Real components, text effects, Telegram integrations and full
                flows from the original repository. Open any demo and interact
                with it in place.
            </Text>
        </div>

        <div className={styles.stats}>
            <div className={styles.stat}>
                <strong>{pageCount}</strong>
                <span>live demos</span>
            </div>
            <div className={styles.stat}>
                <strong>{config.length}</strong>
                <span>collections</span>
            </div>
            <div className={styles.stat}>
                <strong>2</strong>
                <span>platform skins</span>
            </div>
        </div>

        <Tappable
            as="a"
            href="https://github.com/IlyaGrshin/wallet_animations"
            target="_blank"
            rel="noreferrer"
            className={styles.credit}
            mode="opacity"
        >
            <div className={styles.creditIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-1.05-.02-1.9-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .08 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.35 9.35 0 0 1 12 6.94a9.3 9.3 0 0 1 2.5.35c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
                </svg>
            </div>
            <div className={styles.creditContent}>
                <span className={styles.creditEyebrow}>Source repository</span>
                <div className={styles.creditTitle}>
                    <Text
                        apple={{ variant: "title3", weight: "semibold" }}
                        material={{ variant: "title2", weight: "medium" }}
                    >
                        wallet_animations
                    </Text>
                </div>
                <div className={styles.creditUrl}>
                    <Text
                        apple={{ variant: "footnote", weight: "regular" }}
                        material={{
                            variant: "subheadline2",
                            weight: "regular",
                        }}
                    >
                        github.com/IlyaGrshin/wallet_animations
                    </Text>
                </div>
            </div>
            <div className={styles.creditArrow} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                    <path
                        d="M8 16 16 8m0 0H9m7 0v7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </Tappable>
    </section>
)

export default CatalogIntro
