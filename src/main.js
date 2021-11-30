import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';

import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import RadioButton  from 'primevue/radiobutton';
import InputNumber from 'primevue/inputnumber';
import Sidebar from 'primevue/sidebar';
import PanelMenu from 'primevue/panelmenu';

import './styles/styles.scss'

const app = createApp(App);

app.use(router).mount('#app')
app.use(PrimeVue);

app.component('Toolbar', Toolbar);
app.component('Button', Button);
app.component('FileUpload', FileUpload);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Dialog', Dialog);
app.component('InputText', InputText);
app.component('Textarea', Textarea);
app.component('Dropdown', Dropdown);
app.component('RadioButton', RadioButton);
app.component('InputNumber', InputNumber);
app.component('Sidebar', Sidebar );
app.component('PanelMenu', PanelMenu );