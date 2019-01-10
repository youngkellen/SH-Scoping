export default class newProject {
    constructor(scope, json) {
        if (scope.length > 0 && scope[0].name.split("/").length > 1){
            this.scope = scope[0].name.split("/")[0]
            this.versions = scope.map(s => {
                return { "fileName" : s.name, "v" : s.metageneration, "lastEdit" : s.updated, "description" : json.Description, "platforms" : json.Platforms, "types" : json.Types, "approve" : json.Approve }
            })
            
        } else {
            return null
        }
      
    }
}