export default class newProject {
    constructor(scope, json) {
        this.scope = scope.name.split("/")[0]
        this.versions = [
            { "fileName" : scope.name, "v" : scope.metageneration, "lastEdit" : scope.updated, "description" : json.Description, "platforms" : json.Platforms, "types" : json.Types, "approve" : json.Approve }
           
        ]
    }
}