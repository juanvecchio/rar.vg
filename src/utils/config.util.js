import config from "../../config/config.json";

export default key =>
{
    return config[key] === "" ? process.env[key] : config[key]
}