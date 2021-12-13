<template>
    <div>
        <div class="card">
            <Toolbar class="p-mb-4">
                <template #start>
                    <Button label="Nuevo" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
                    <Button label="Eliminar" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                </template>

                
            </Toolbar>

            <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
						<h5 class="p-mb-2 p-m-md-0 p-as-md-center">Usuarios</h5>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                        </span>
					</div>
                </template>
                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="code" header="ID" :sortable="true" style="min-width:6rem"></Column>
                <Column field="username" header="Usuario" :sortable="true" style="min-width:10rem"></Column>
                <Column field="password" header="Contraseña" :sortable="true" style="min-width:10rem"></Column>
                <Column field="name" header="Nombre" :sortable="true" style="min-width:10rem"></Column>
                <Column field="lastName" header="Apellidos" :sortable="true" style="min-width:8rem"></Column>
                <Column field="document" header="Identifición" :sortable="true" style="min-width:2rem"></Column>
                <Column field="email" header="Correo" :sortable="true" style="min-width:10rem"></Column>
                <Column field="phoneNumber" header="Teléfono" :sortable="true" style="min-width:2rem"></Column>
                <Column field="role" header="Rol" :sortable="true" style="min-width:2rem"></Column>
               
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Detalles del registro" :modal="true" class="p-fluid">
            <div class="p-field">
                <label for="username">Usuario</label>
                <InputText id="username" v-model.trim="product.username" required="true" autofocus :class="{'p-invalid': submitted && !product.username}" />
                <small class="p-error" v-if="submitted && !product.username">Espacio requerido.</small>
            </div>
            <div class="p-field">
                <label for="password">Contraseña</label>
                <InputText id="password" v-model.trim="product.password" required="true" autofocus :class="{'p-invalid': submitted && !product.password}" />
                <small class="p-error" v-if="submitted && !product.password">Espacio requerido.</small>
            </div>
            <div class="p-field">
                <label for="name">Nombre</label>
                <InputText id="name" v-model.trim="product.name" required="true" autofocus :class="{'p-invalid': submitted && !product.name}" />
                <small class="p-error" v-if="submitted && !product.name">Espacio requerido.</small>
            </div>
            <div class="p-field">
                <label for="lastName">Apellidos</label>
                <InputText id="lastName" v-model.trim="product.lastName" required="true" autofocus :class="{'p-invalid': submitted && !product.lastName}" />
                <small class="p-error" v-if="submitted && !product.lastName">Espacio requerido.</small>
            </div>
            <div class="p-field">
                <label for="document">Identificación</label>
                <InputText id="document" v-model.trim="product.document" required="true" autofocus :class="{'p-invalid': submitted && !product.document}" />
                <small class="p-error" v-if="submitted && !product.document">Espacio requerido.</small>
            </div>
            <div class="p-field">
                <label for="email">Correo</label>
                <InputText id="email" v-model.trim="product.email" required="true" autofocus :class="{'p-invalid': submitted && !product.email}" />
                <small class="p-error" v-if="submitted && !product.email">Espacio requerido.</small>
            </div>
            <div class="p-field">
                <label for="phoneNumber">Teléfono</label>
                <InputText id="phoneNumber" v-model.trim="product.phoneNumber" required="true" autofocus :class="{'p-invalid': submitted && !product.phoneNumber}" />
                <small class="p-error" v-if="submitted && !product.phoneNumber">Espacio requerido.</small>
            </div>
           <div class="p-field">
                <label for="role">Rol</label>
                <InputText id="role" v-model.trim="product.role" required="true" autofocus :class="{'p-invalid': submitted && !product.role}" />
                <small class="p-error" v-if="submitted && !product.role">Espacio requerido.</small>
            </div>

            
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                <span v-if="product"> ¿Está seguro que quiere eliminar este registro? <b>{{product.name}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false"/>
                <Button label="Sí" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                <span v-if="product"> ¿Está seguro que quiere eliminar los registros seleccionados? </span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false"/>
                <Button label="Sí" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts" />
            </template>
        </Dialog>
	</div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import ProductService from '../service/ProductService';

export default {
    data() {
        return {
            products: [{code:'ELG8p',username:'mep2476', password:'MariaE', name:'Maria Elena', lastName:'Prado', 
                document:'43850368', email:'maelena@gmail.com', phoneNumber:'3132356894', role:'Vendedor'},

                {code:'4a4O2 ',username:'PlAre', password:'PaAbeta1245', name:'Paulo', lastName:'Arredondo Betancur', 
                document:'1000921256', email:'paulo7655@gmail.com', phoneNumber:'3026994387', role:'Auxliar'},

                {code:'HGbGs',username:'Andresfgl', password:'andresfelpi123', name:'Andres Felipe', lastName:'Giraldo Lopez', 
                document:'1023158939', email:'Andresfgl@gmail.com', phoneNumber:'3012560893', role:'Administrador'},

                {code:'dzYmJ',username:'JazminB', password:'Dahiana8346', name:'Jasmin Dahiana', lastName:'Bustamante', 
                document:'1026138167', email:'jdbc@gmail.com', phoneNumber:'3005522206', role:'Vendedor'},

                {code:'YoB06',username:'Adrilu', password:'LuciaA569', name:'Adriana Lucía', lastName:'Giraldo', 
                document:'10009216532', email:'adrilu@gmail.com', phoneNumber:'3012570892', role:'Vendedor'},

                {code:'PACMM',username:'RendonJ', password:'Jp1515Rc', name:'Juan Pablo', lastName:'Rendón Corrales', 
                document:'10132546984', email:'jurendon@gmail.com', phoneNumber:'3183650465', role:'Auxliar'},

                {code:'52rus',username:'SaritaO', password:'SaraOsp16', name:'Sara', lastName:'Ospina Mejia', 
                document:'10364688654', email:'sara45@gmail.com', phoneNumber:'3216549870', role:'Vendedor'},

                {code:'Xrtfq',username:'PaezA', password:'AndresCpaez', name:'Andres', lastName:'Paez', 
                document:'10235462345', email:'paezc12@gmail.com', phoneNumber:'3156458792', role:'Auxliar'},

                {code:'pbpmK',username:'MaicolQ', password:'MaicolQuiroz12', name:'Maicol', lastName:'Quiroz', 
                document:'10005367787', email:'quirozm3@gmail.com', phoneNumber:'3147209456', role:'Vendedor'},

                {code:'IddSc',username:'Maleja1', password:'Maleja123', name:'Maria Alejandra', lastName:'Restrepo', 
                document:'10000897653', email:'maleja1564@gmail.com', phoneNumber:'3073216549', role:'Vendedor'},
                
                {code:'JMIXn',username:'PauAr', password:'Arroyave345', name:'Paulina', lastName:'Arroyave', 
                document:'1000261745', email:'PaulinaA5@gmail.com', phoneNumber:'3183284695', role:'Auxliar'},
                
                {code:'aJ9kZ',username:'JorgS', password:'Jorge56M', name:'Josge Steven', lastName:'Mosquera', 
                document:'1026123457', email:'jorgM@gmail.com', phoneNumber:'3205468391', role:'Vendedor'},

                {code:'7bGsm',username:'KnAMl', password:'KevinA156', name:'Kevin', lastName:'Muriel', 
                document:'1026132659', email:'kevinmu59@gmail.com', phoneNumber:'3147856943', role:'Vendedor'},

                {code:'nOW7E',username:'JojoO', password:'JJOo3521', name:'Juan José', lastName:'Orozco', 
                document:'1000759623', email:'Juanjo3521@gmail.com', phoneNumber:'3216543217', role:'Vendedor'},

                {code:'nMlDh',username:'JuanJo', password:'jjortiz65', name:'Juan José', lastName:'Ortiz', 
                document:'1000156483', email:'juanjoseo@gmail.com', phoneNumber:'3053268971', role:'Auxliar'},

               {code:'jQPpw',username:'juandavid1092', password:'juanda123', name:'Juan David', lastName:'Restrepo', 
                document:'1000134695', email:'juandrestrepo1092@gmail.com', phoneNumber:'3012356478', role:'Auxliar'},

                {code:'jN4xS',username:'zeleniaandrea6742', password:'zele123', name:'Zelenia Andrea', lastName:'Zapata Urrego', 
                document:'1000236874', email:'zelezapata@gmail.com', phoneNumber:'3006621804', role:'Vendedor'},

                {code:'jd39L',username:'verogonzalez95', password:'verogonzalez123', name:'Veronica', lastName:'Gonzales', 
                document:'43414870', email:'verogonzalez95@gmail.com', phoneNumber:'3026983254', role:'Auxliar'},

                {code:'IgaLs',username:'maleja2020', password:'mariarios123', name:'Maria Alejandra', lastName:'Rios', 
                document:'43415698', email:'malejarios2020', phoneNumber:'3013640586', role:'Vendedor'},

                {code:'XiGqX',username:'lauraecheverri6090', password:'lauris123', name:'Laura', lastName:'Echeverri', 
                document:'43413264', email:'lauraecheverri6090@gmail.com', phoneNumber:'3132356409', role:'Auxliar'},

                {code:'IVivW',username:'estefa10', password:'estefania1290', name:'Estefania', lastName:'Arango', 
                document:'1000922239', email:'estefa10@gmail.com', phoneNumber:'3007733260', role:'Vendedor'},

                {code:'hnzc7',username:'gabrieljaime7005', password:'grabriel123', name:'Gabriel Jaime', lastName:'Montoya', 
                document:'8463906', email:'gabrieljmontoya7@gmail.com', phoneNumber:'3145956402', role:'Auxliar'},

                {code:' OTJj35',username:'andresfsanchez1', password:'andresfsanchez123', name:'Andres Felipe', lastName:'Sanchez', 
                document:'8461598', email:'andresfsanchez1@gmail.com', phoneNumber:'3136562392', role:'Vendedor'},

                {code:'0YGYG',username:'migueltabares96', password:'miguel4020', name:'Miguel Angel', lastName:'Tabares Cuadros', 
                document:'8463697', email:'migueltcuadros@gmail.com', phoneNumber:'3225416132', role:'Administrador'},

                {code:'UNbYZ',username:'checho12', password:'checho123', name:'Sergio Alejandro', lastName:'Manrique', 
                document:'8460543', email:'sergioalejandrom16@gmail.com', phoneNumber:'3183620564', role:'Administrador'},

                {code:'VhUZF',username:'ander4565', password:'piedrahita123', name:'Anderson', lastName:'Piedrahita', 
                document:'8462351', email:'andersonpiedrahita45@gmail.com', phoneNumber:'3012570898', role:'Vendedor'},

                {code:'1Vchj',username:'santiagopelaez12', password:'santi123', name:'Santiago', lastName:'Pelaez', 
                document:'8464862', email:'santiagopelaez12@gmail.com', phoneNumber:'3205416192', role:'Auxliar'},

                {code:'zDFXq',username:'michaelperez105', password:'michaelchumajer', name:'Michael', lastName:'Perez', 
                document:'8461278', email:'michaelperez105@gmail.com', phoneNumber:'3152356401', role:'Auxliar'},

                {code:'EP2T0',username:'valen2070', password:'valen123', name:'Valentina', lastName:'Escobar', 
                document:'43412358', email:'valentinaescobar95@gmail.com', phoneNumber:'3506661235', role:'Auxliar'},
                
                {code:'RBBU7',username:'paulina18', password:'pauli789', name:'Paulina', lastName:'Quintero', 
                document:'43415968', email:'paulinaquintero1895@gmail.com', phoneNumber:'3216548256', role:'Vendedor'}
                ],
            productDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            product: {},
            selectedProducts: null,
            filters: {},
            submitted: false,
        }
    },
    productService: null,
    created() {
        this.productService = new ProductService();
        this.initFilters();
    },
    mounted() {
        this.productService.getProducts().then(data => this.products = data);
    },
    methods: {
        formatCurrency(value) {
            if(value)
				return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
			return;
        },
        openNew() {
            this.product = {};
            this.submitted = false;
            this.productDialog = true;
        },
        hideDialog() {
            this.productDialog = false;
            this.submitted = false;
        },
        saveProduct() {
            this.submitted = true;

			if (this.product.name.trim()) {
                if (this.product.id) {
                    this.products[this.findIndexById(this.product.id)] = this.product;
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                }
                else {
                    this.product.id = this.createId();
                    this.product.code = this.createId();
                    this.products.push(this.product);
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
                }

                this.productDialog = false;
                this.product = {};
            }
        },
        editProduct(product) {
            this.product = {...product};
            this.productDialog = true;
        },
        confirmDeleteProduct(product) {
            this.product = product;
            this.deleteProductDialog = true;
        },
        deleteProduct() {
            this.products = this.products.filter(val => val.id !== this.product.id);
            this.deleteProductDialog = false;
            this.product = {};
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        },
        findIndexById(id) {
            let index = -1;
            for (let i = 0; i < this.products.length; i++) {
                if (this.products[i].id === id) {
                    index = i;
                    break;
                }
            }

            return index;
        },
        createId() {
            let id = '';
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for ( var i = 0; i < 5; i++ ) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        confirmDeleteSelected() {
            this.deleteProductsDialog = true;
        },
        deleteSelectedProducts() {
            this.products = this.products.filter(val => !this.selectedProducts.includes(val));
            this.deleteProductsDialog = false;
            this.selectedProducts = null;
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        },
        initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 960px) {
        align-items: start;
	}
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
    width: 50px;
    margin: 0 auto 2rem auto;
    display: block;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
@media screen and (max-width: 960px) {
	::v-deep(.p-toolbar) {
		flex-wrap: wrap;
        
		.p-button {
            margin-bottom: 0.25rem;
        }
	}
}
</style>