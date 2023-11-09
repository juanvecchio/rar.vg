const colours = [
    {
        background: "linear-gradient(135deg, rgb(23, 10, 54) 25%, rgb(50, 15, 74) 100%)",
        card: "#0e0c16",
        accent: "var(--push-text)",
        addComponentButton: "#4b4172",
        username: "#444",
        accentLines: "#333",
        linkBackground: "linear-gradient(310deg, #181623, #1e1b2d)"
    },
    {
        background: "#fa6450",
        card: "#f3f0e5",
        accent: "#f33d1d",
        addComponentButton: "#f33d1d",
        username: "#f33d1d",
        accentLines: "#f33d1d",
        linkBackground: "#f7b7b0"
    },
    {
        background: "#eee",
        card: "#fff",
        accent: "#111",
        addComponentButton: "#111",
        username: "#111",
        accentLines: "#111",
        linkBackground: "#e4e4e4"
    }
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
    }
}

module.exports = {colours, styles}