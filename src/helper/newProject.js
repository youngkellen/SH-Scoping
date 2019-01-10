export default class newProject {
    constructor(scope, json) {
        if (scope.length > 0 && scope[0].name.split("/").length > 1){
            this.scope = scope[0].name.split("/")[0]
            this.versions = scope.map((s,i) => {
                return { 
                    "fileName" : s.name, 
                    "v" : scope.length - i, 
                    "lastEdit" : s.updated, 
                    "description" : json[i].Description, 
                    "platforms" : json[i].Platforms, 
                    "types" : json[i].Types, 
                    "approve" : json[i].Approve,
                    "generation": s.generation, 
                    "mediaLink": s.mediaLink
                }
            })
            
        } else {
            return null
        }
      
    }
}