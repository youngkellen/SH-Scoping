const getEngineerHours = ( engineerHours, s) => {
    
    if (s["Include in Scope?"]) {

        engineerHours+= 
            ( Number(s["Android Engineering Estimate (Resource Hours)"]) || 0 ) + 
            ( Number(s["Backend Engineering Estimate (Resource Hours)"]) || 0 ) + 
            ( Number(s["Web Engineering Estimate (Resource Hours)"]) || 0 ) +
            ( Number(s["Magento Engineering"]) || 0 ) + 
            ( Number(s["QA Estimate (Resource Hours)"]) || 0 ) + 
            ( Number(s["Hybrid Engineering"]) || 0 ) + 
            ( Number(s["iOS Engineering Estimate (Resource Hours)"]) || 0 )
    }
   
    return engineerHours;
    
}

const getEngineerCategoryHours = ( engineerHours, test, s) => {
    
    if (s["Include in Scope?"]) {
        
        test += ( Number(s["Backend Engineering Estimate (Resource Hours)"]) || 0 );  
        
    }
   
    return test;
    
}

export  { getEngineerHours, getEngineerCategoryHours }
export default getEngineerHours;