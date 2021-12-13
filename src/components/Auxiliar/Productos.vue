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
						<h5 class="p-mb-2 p-m-md-0 p-as-md-center">Productos</h5>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                        </span>
					</div>
                </template>
                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="code" header="ID" :sortable="true" style="min-width:6rem"></Column>
                <Column field="name" header="Nombre" :sortable="true" style="min-width:10rem"></Column>
                <Column field="category" header="Categoría" :sortable="true" style="min-width:10rem"></Column>
                <Column field="brand" header="Marca" :sortable="true" style="min-width:10rem"></Column>
                <Column field="gain" header="Ganancia" :sortable="true" style="min-width:8rem"></Column>
                <Column field="price" header="Precio" :sortable="true" style="min-width:2rem"></Column>
                <Column field="inventoryQuantity" header="Cantidad" :sortable="true" style="min-width:10rem"></Column>
                <Column field="enabled" header="Disponibilidad" :sortable="true" style="min-width:2rem"></Column>
               
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
                <label for="name">Nombre</label>
                <InputText id="name" v-model.trim="product.name" required="true" autofocus :class="{'p-invalid': submitted && !product.name}" />
                <small class="p-error" v-if="submitted && !product.name">Espacio requerido.</small>
            </div>
            <div class="p-field">
                <label for="category">Categoria</label>
                <InputText id="category" v-model.trim="product.category" required="true" autofocus :class="{'p-invalid': submitted && !product.category}" />
                <small class="p-error" v-if="submitted && !product.category">Espacio requerido.</small>
            </div>
            <div class="p-field">
                <label for="brand">Marca</label>
                <InputText id="brand" v-model.trim="product.brand" required="true" autofocus :class="{'p-invalid': submitted && !product.brand}" />
                <small class="p-error" v-if="submitted && !product.brand">Espacio requerido.</small>
            </div>
            <div class="p-field">
                <label for="gain">Ganancia</label>
                <InputText id="gain" v-model.trim="product.gain" required="true" autofocus :class="{'p-invalid': submitted && !product.gain}" />
                <small class="p-error" v-if="submitted && !product.gain">Espacio requerido.</small>
            </div>
            <div class="p-field">
                <label for="price">Precio</label>
                <InputText id="price" v-model.trim="product.price" required="true" autofocus :class="{'p-invalid': submitted && !product.price}" />
                <small class="p-error" v-if="submitted && !product.price">Espacio requerido.</small>
            </div>
            <div class="p-field">
                <label for="inventoryQuantity">Cantidad</label>
                <InputText id="inventoryQuantity" v-model.trim="product.inventoryQuantity" required="true" autofocus :class="{'p-invalid': submitted && !product.inventoryQuantity}" />
                <small class="p-error" v-if="submitted && !product.inventoryQuantity">Espacio requerido.</small>
            </div>
            <div class="p-field">
                <label for="enabled">Disponibilidad</label>
                <InputText id="enabled" v-model.trim="product.enabled" required="true" autofocus :class="{'p-invalid': submitted && !product.enabled}" />
                <small class="p-error" v-if="submitted && !product.enabled">Espacio requerido.</small>
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
            products: [{code:'ads1234', name:'Lapiz', category:'Escolar', brand: 'Scribe', gain:'2000', price:'5000', inventoryQuantity:'40', enabled:'Sí'},
                        {code:'ads1235', name:'Cuaderno', category:'Escolar', brand: 'estrella', gain:'3000', price:'10000', inventoryQuantity:'40', enabled:'Sí'},
                        {code:'ads1236', name:'Lapicero', category:'Escolar', brand: 'Tuk', gain:'600', price:'5000', inventoryQuantity:'40', enabled:'Sí'},
                        {code:'ads1237', name:'Tijeras', category:'Escolar', brand: 'BACO', gain:'500', price:'1500', inventoryQuantity:'40', enabled:'Sí'},
                        {code:'ads1238', name:'Borrador', category:'Escolar', brand: 'JANEL', gain:'1000', price:'2000', inventoryQuantity:'70', enabled:'Sí'},
                        {code:'ads1239', name:'Cosedora', category:'Oficina', brand: 'AZOR', gain:'500', price:'2000', inventoryQuantity:'46', enabled:'Sí'},
                        {code:'ads1241', name:'Folder tamaño carta', category:'Oficina', brand: 'MAE', gain:'500', price:'1000', inventoryQuantity:'30', enabled:'Sí'},
                        {code:'ads1242', name:'Caja de colores', category:'Escolar', brand: 'Esselte', gain:'5000', price:'10000', inventoryQuantity:'90', enabled:'Sí'},
                        {code:'ads1243', name:'Bisturi', category:'Oficina', brand: '3M', gain:'6000', price:'15000', inventoryQuantity:'80', enabled:'Sí'},
                        {code:'ads1244', name:'Cinta de enmascarar', category:'Oficina', brand: 'BIC', gain:'2000', price:'15000', inventoryQuantity:'55', enabled:'Sí'},
                        {code:'ads1245', name:'Tizas para tablero', category:'Escolar', brand: 'Fellowes', gain:'800', price:'4000', inventoryQuantity:'66', enabled:'Sí'},
                        {code:'ads1246', name:'Marcadores de vinilo', category:'Oficina', brand: 'Pelikan', gain:'900', price:'10000', inventoryQuantity:'10', enabled:'Sí'},
                        {code:'ads1247', name:'Portaminas', category:'Escolar', brand: 'MAPASA', gain:'500', price:'3000', inventoryQuantity:'40', enabled:'Sí'},
                        {code:'ads1248', name:'Regla', category:'Escolar', brand: 'ACCO', gain:'300', price:'2500', inventoryQuantity:'40', enabled:'Sí'},
                        {code:'ads1249', name:'Diccionario', category:'Escolar', brand: 'Kenkel', gain:'900', price:'3500', inventoryQuantity:'35', enabled:'Sí'},
                        {code:'ads1251', name:'Libretilla Nacho lee', category:'Escolar', brand: 'PILOT', gain:'900', price:'3500', inventoryQuantity:'25', enabled:'Sí'},
                        {code:'ads1252', name:'Papel globo', category:'Escolar', brand: 'euromac', gain:'100', price:'600', inventoryQuantity:'60', enabled:'Sí'},
                        {code:'ads1253', name:'Cartulina', category:'Escolar', brand: 'Rayler', gain:'100', price:'900', inventoryQuantity:'20', enabled:'Sí'},
                        {code:'ads1254', name:'Fomi', category:'Escolar', brand: 'Sharpie', gain:'100', price:'700', inventoryQuantity:'100', enabled:'Sí'},
                        {code:'ads1255', name:'Liquid paper', category:'Escolar', brand: 'Kores', gain:'400', price:'1000', inventoryQuantity:'10', enabled:'Sí'},
                        {code:'ads1256', name:'Sacapuntas', category:'Escolar', brand: 'ACRILES', gain:'100', price:'500', inventoryQuantity:'15', enabled:'Sí'},
                        {code:'ads1257', name:'Vinilos', category:'Escolar', brand: 'IDEAL', gain:'900', price:'2000', inventoryQuantity:'70', enabled:'Sí'},
                        {code:'ads1258', name:'Pinceles', category:'Arte', brand: 'GIOTTO', gain:'900', price:'2500', inventoryQuantity:'25', enabled:'Sí'},
                        {code:'ads1259', name:'Escuadras', category:'Escolar', brand: 'Norma', gain:'800', price:'3500', inventoryQuantity:'30', enabled:'Sí'},
                        {code:'ads2341', name:'Papel silueta', category:'Oficina', brand: 'BIC', gain:'300', price:'700', inventoryQuantity:'100', enabled:'Sí'},
                        {code:'ads2342', name:'Carton paja', category:'Escolar', brand: 'Norma', gain:'300', price:'1000', inventoryQuantity:'90', enabled:'Sí'},
                        {code:'ads2343', name:'Colbón', category:'Escolar', brand: 'MAPASA', gain:'400', price:'2000', inventoryQuantity:'60', enabled:'Sí'},
                        {code:'ads2344', name:'Libreta de apuntes', category:'Oficina', brand: 'LYRA', gain:'300', price:'1500', inventoryQuantity:'30', enabled:'Sí'},
                        {code:'ads2345', name:'Lapiz rojo', category:'Escolar', brand: 'Norma', gain:'200', price:'900', inventoryQuantity:'70', enabled:'Sí'},
                        {code:'ads2346', name:'Ganchos para cosedoras', category:'Oficina', brand: 'LYRA', gain:'600', price:'1500', inventoryQuantity:'40', enabled:'Sí'}
            
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
                    this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value: this.product.inventoryStatus;
                    this.products[this.findIndexById(this.product.id)] = this.product;
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                }
                else {
                    this.product.id = this.createId();
                    this.product.code = this.createId();
                    this.product.image = 'product-placeholder.svg';
                    this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
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