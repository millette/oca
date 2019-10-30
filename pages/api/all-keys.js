import metadata from "../../metadata.json"

export default (req, res) => res.status(200).json(Object.keys(metadata))
