import PropTypes from "prop-types"
import { useReducedMotion } from "motion/react"
import * as m from "motion/react-m"

const segmentText = (text) => {
    if (typeof Intl?.Segmenter === "function") {
        const segmenter = new Intl.Segmenter(undefined, {
            granularity: "grapheme",
        })
        return Array.from(segmenter.segment(text), ({ segment }) => segment)
    }

    return Array.from(text)
}

const groupWords = (text) => {
    const words = []
    let current = []

    segmentText(text).forEach((character) => {
        current.push(character)
        if (/\s/u.test(character)) {
            words.push(current)
            current = []
        }
    })

    if (current.length > 0) words.push(current)
    return words
}

const GentleReveal = ({ text }) => {
    const reduceMotion = useReducedMotion()
    const words = groupWords(text)
    const wordOffsets = words.map((_, wordIndex) =>
        words
            .slice(0, wordIndex)
            .reduce((total, word) => total + word.length, 0)
    )

    if (reduceMotion) return <span>{text}</span>

    return (
        <span aria-label={text}>
            {words.map((word, wordIndex) => (
                <span
                    key={`${word.join("")}-${wordIndex}`}
                    aria-hidden="true"
                    style={{ display: "inline-block", whiteSpace: "nowrap" }}
                >
                    {word.map((character, localIndex) => {
                        const characterIndex =
                            wordOffsets[wordIndex] + localIndex
                        const delay = characterIndex * 0.015

                        return (
                            <m.span
                                key={`${character}-${characterIndex}`}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay,
                                    ease: [0.2, 0.8, 0.2, 1],
                                }}
                                style={{
                                    display: "inline-block",
                                    whiteSpace: "pre",
                                }}
                            >
                                {character}
                            </m.span>
                        )
                    })}
                </span>
            ))}
        </span>
    )
}

GentleReveal.propTypes = {
    text: PropTypes.string.isRequired,
}

export default GentleReveal
