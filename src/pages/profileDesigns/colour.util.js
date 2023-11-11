const colours = [
    {
        background: "#170b37",
        card: "#0e0c16",
        accent: "var(--push-text)",
        addComponentButton: "#4b4172",
        username: "#444",
        accentLines: "#333",
        linkBackground: "linear-gradient(310deg, #181623, #1e1b2d)",
        selectComponent: "rgba(255, 255, 255, 0.06)"
    },
    {
        background: "#fa6450",
        card: "#f3f0e5",
        accent: "#cc1c16",
        addComponentButton: "#f33d1d",
        username: "#f33d1d",
        accentLines: "#f33d1d",
        linkBackground: "#f7b7b0",
        selectComponent: "rgba(255, 255, 255, 0.06)"
    },
    {
        background: "#eee",
        card: "#fff",
        accent: "#111",
        addComponentButton: "#111",
        username: "#111",
        accentLines: "#111",
        linkBackground: "#e4e4e4",
        selectComponent: "rgba(0, 0, 0, 0.2)"
    },
    {
        background: "#64c27b",
        card: "#d0fdd7",
        accent: "#2a8c4a",
        addComponentButton: "#2a8c4a",
        username: "#2a8c4a",
        accentLines: "#2a8c4a",
        linkBackground: "#9bfab0",
        selectComponent: "rgba(0, 0, 0, 0.2)"
    },
]

let styles = (colour) =>
{
    return {
        "background": colours[colour].background,
        "--card-background": colours[colour].card,
        "--profile-text-accent": colours[colour].accent,
        "--add-comp-btn-clr": colours[colour].addComponentButton,
        "--username-text": colours[colour].username,
        "--accent-lines": colours[colour].accentLines,
        "--link-background": colours[colour].linkBackground,
        "--select-component": colours[colour].selectComponent,
    }
}

module.exports = {colours, styles}