export default class newRow {
    constructor(
        id = "",
        source = "",
        fs = "",
        feature = "",
        fd = "",
        assumptions = "",
        inScope = "",
        notes = "",
        platform = "",
        type = "",
        qaHours = "",
        webHours = "",
        iosHours = "",
        androidHours = "",
        backendHours = "",
        designHours = "",
        hybridHours = "",
        magentoHours = ""
        ) {
        this["Android Engineering Estimate (Resource Hours)"] = androidHours
        this.Assumptions = assumptions
        this["Backend Engineering Estimate (Resource Hours)"] = backendHours
        this["Design Estimate (Resource Hours)"] = designHours
        this.Feature = feature
        this["Feature description"] = fd
        this["Feature set"] = fs
        this["Hybrid Engineering"] = hybridHours
        this["Include in Scope?"] = inScope
        this["Magento Engineering"] = magentoHours
        this.Notes = notes
        this.Platform = platform
        this["QA Estimate (Resource Hours)"] = qaHours
        this.SOURCE = source
        this.Type = type
        this["Web Engineering Estimate (Resource Hours)"] = webHours
        this["iOS Engineering Estimate (Resource Hours)"] = iosHours
        this.id = id
    }
}