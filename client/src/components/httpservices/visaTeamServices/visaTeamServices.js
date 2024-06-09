/* eslint-disable prettier/prettier */

import requests from "../httpServices";

class VisaTeamServices {
    updateStatus(id,status) {
        const body = {
            "status" : status,
        }
        return requests.patch(`/visa/update-visa-status/${id}`,body );
    }
    
}

export default  new VisaTeamServices();