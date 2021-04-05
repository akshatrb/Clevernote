//made for fixing the timestamps that appear coded throughout

import moment from 'moment';

export const listFormatDate = ( timestamp ) => {
    return moment(timestamp).calendar();

}

export const noteFormatDate = (timestamp) => {
    return moment(timestamp).format('ll');
    
}