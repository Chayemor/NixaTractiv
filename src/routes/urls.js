import {required} from '../utils/utils';

const base_url = 'http://0.0.0.0:3004/';

const URLS = {
    'getSchedule' : (date=required(), limit=null) => {
        let date_lte = limit ? `&date_lte=${limit}` : '';
        return `${base_url}schedule?date_gte=${date}&date_ne=${date}${date_lte}&_sort=date&_order=asc`
    },
    'addActivity' : () => `${base_url}schedule`,
};

export default URLS;
