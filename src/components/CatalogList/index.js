import { useState } from "react"
import SectionList from "../SectionList"
import Cell from "../Cells"
import TransitionLink from "../Link"
import Text from "../Text"

import config from "../../pages/config"
import {
    categoryToPrefix,
    titleToSlug,
    sortedPages,
} from "../../pages/configHelpers"

import * as styles from "./CatalogList.module.scss"

const sorted = sortedPages(config)
const totalCount = sorted.reduce(
    (total, group) => total + group.pages.length,
    0
)

const preload = (component) => {
    component?.preload?.()
}

// Reusable catalog master list. Renders the config-driven page index as cells.
// Used both as the full-screen CatalogPage (narrow) and the SplitView sidebar.
const CatalogList = () => {
    const [query, setQuery] = useState("")
    const normalizedQuery = query.trim().toLocaleLowerCase()
    const filtered = sorted
        .map((group) => ({
            ...group,
            pages: group.pages.filter(({ title }) =>
                title.toLocaleLowerCase().includes(normalizedQuery)
            ),
        }))
        .filter(({ pages }) => pages.length > 0)
    const resultCount = filtered.reduce(
        (total, group) => total + group.pages.length,
        0
    )

    return (
        <div className={styles.root}>
            <div className={styles.toolbar}>
                <label className={styles.search}>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                            d="m20 20-4.6-4.6m2.5-5.15a7.65 7.65 0 1 1-15.3 0 7.65 7.65 0 0 1 15.3 0Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                    <input
                        className={styles.input}
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search demos"
                        aria-label="Search component demos"
                    />
                </label>
                <div className={styles.resultCount} aria-live="polite">
                    {normalizedQuery
                        ? `${resultCount} of ${totalCount} demos`
                        : `${totalCount} live demos`}
                </div>
            </div>

            {filtered.length > 0 ? (
                <SectionList>
                    {filtered.map(({ category, pages }) => {
                        const prefix = categoryToPrefix(category)
                        return (
                            <SectionList.Item header={category} key={category}>
                                {pages.map(({ title, slug, component }) => {
                                    const resolvedSlug =
                                        slug || titleToSlug(title)
                                    const handlePreload = () =>
                                        preload(component)
                                    return (
                                        <Cell
                                            as={TransitionLink}
                                            to={`/${prefix}/${resolvedSlug}`}
                                            end={<Cell.Part type="Chevron" />}
                                            key={resolvedSlug}
                                            onMouseEnter={handlePreload}
                                            onFocus={handlePreload}
                                            onTouchStart={handlePreload}
                                        >
                                            <Cell.Text title={title} />
                                        </Cell>
                                    )
                                })}
                            </SectionList.Item>
                        )
                    })}
                </SectionList>
            ) : (
                <div className={styles.empty}>
                    <Text
                        apple={{ variant: "body", weight: "semibold" }}
                        material={{
                            variant: "subheadline1",
                            weight: "medium",
                        }}
                    >
                        No demos found
                    </Text>
                </div>
            )}
        </div>
    )
}

export default CatalogList
