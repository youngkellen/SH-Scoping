const getEngineerHours = ( engineerHours, s) => {
    engineerHours+= ( Number(s["Android Engineering Estimate (Resource Days)"]) || 0 ) + 
                    ( Number(s["Backend Engineering Estimate (Resource Days)"]) || 0 ) + 
                    ( Number(s["Web Engineering Estimate (Resource Days)"]) || 0 ) +
                    ( Number(s["Backend Engineering Estimate (Resource Days)"]) || 0 ) + 
                    ( Number(s["Magento Engineering"]) || 0 ) + 
                    ( Number(s["QA Estimate (Resource Days)"]) || 0 ) + 
                    ( Number(s["Hybrid Engineering"]) || 0 )
    return engineerHours;
    
}

export default getEngineerHours