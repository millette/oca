import metadata from "../../metadata.json"

export default (req, res) =>
  res.status(200).json(metadata["animals/2_dead_frogs_lumen_desig_01.svg"])
