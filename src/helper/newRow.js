export default class newRow {
    constructor(
        id = "",
        source = "",
        fs = "",
        feature = "",
        fd = "",
        androidHours = "",
        assumptions = "",
        backendHours = "",
        designHours = "",
        hybridHours = "",
        inScope = "",
        magentoHours = "",
        notes = "",
        platform = "",
        qaHours = "",
        type = "",
        webHours = "",
        iosHours = "",
        ) {
        this["Android Engineering Estimate (Resource Days)"] = androidHours
        this.Assumptions = assumptions
        this["Backend Engineering Estimate (Resource Days)"] = backendHours
        this["Design estimate (resource days)"] = designHours
        this.Feature = feature
        this["Feature description"] = fd
        this["Feature set"] = fs
        this["Hybrid Engineering"] = hybridHours
        this["Include in Scope?"] = inScope
        this["Magento Engineering"] = magentoHours
        this.Notes = notes
        this.Platform = platform
        this["QA Estimate (Resource Days)"] = qaHours
        this.SOURCE = source
        this.Type = type
        this["Web Engineering Estimate (Resource Days)"] = webHours
        this["iOS Engineering Estimate (Resource Days)"] = iosHours
        this.id = id
    }
}