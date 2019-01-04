const buildTree = data => {
    let types = {}
    data.forEach((s, i) => {
    if (!types.hasOwnProperty(s.SOURCE)) {
      types[s.SOURCE] = {
        featureSet: [
          {
            name: s["Feature set"],
            features: [
              {
                feature: s.Feature, id: i
              }
            ]
          }
        ]
      };
    } else {
      let pos = types[s.SOURCE].featureSet.map(e => e.name).indexOf(s["Feature set"]);
      if (pos === -1) {
        types[s.SOURCE].featureSet = [...types[s.SOURCE].featureSet, { name: s["Feature set"], features: [{ feature: [s.Feature], id: i }] }]
      } else {
        types[s.SOURCE].featureSet[pos].features = [...types[s.SOURCE].featureSet[pos].features, { feature: s.Feature, id: i }]
      }
    }
  })
  return types
}

export default buildTree;