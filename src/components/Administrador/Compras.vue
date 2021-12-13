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
						<h5 class="p-mb-2 p-m-md-0 p-as-md-center">Compras</h5>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                        </span>
					</div>
                </template>
                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="code" header="ID" :sortable="true" style="min-width:6rem"></Column>
                <Column field="date" header="Fecha" :sortable="true" style="min-width:10rem"></Column>
                <Column field="product" header="Produto" :sortable="true" style="min-width:10rem"></Column>
                <Column field="price" header="Precio" :sortable="true" style="min-width:10rem"></Column>
                <Column field="quantity" header="Cantidad" :sortable="true" style="min-width:8rem"></Column>
               
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
                <label for="date">Fecha</label>
                <InputText id="date" v-model.trim="product.date" required="true" autofocus :class="{'p-invalid': submitted && !product.date}" />
                <small class="p-error" v-if="submitted && !product.date">Espacio requerido.</small>
            </div>
            <div class="p-field">
                <label for="product">Producto</label>
                <InputText id="product" v-model.trim="product.product" required="true" autofocus :class="{'p-invalid': submitted && !product.product}" />
                <small class="p-error" v-if="submitted && !product.product">Espacio requerido.</small>
            </div>
            <div class="p-field">
                <label for="price">Precio</label>
                <InputText id="price" v-model.trim="product.price" required="true" autofocus :class="{'p-invalid': submitted && !product.price}" />
                <small class="p-error" v-if="submitted && !product.price">Espacio requerido.</small>
            </div>
            <div class="p-field">
                <label for="quantity">Cantidad</label>
                <InputText id="quantity" v-model.trim="product.quantity" required="true" autofocus :class="{'p-invalid': submitted && !product.quantity}" />
                <small class="p-error" v-if="submitted && !product.quantity">Espacio requerido.</small>
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
            products: [{code:'a1231', date:'07-05-2021', product:'Lapiz', price:'5000',quantity:'12'},
                        {code:'a1232', date:'08-05-2021', product:'Cuaderno', price:'10000',quantity:'10'},
                        {code:'a1233', date:'21-05-2021', product:'Lapicero', price:'5000',quantity:'15'},
                        {code:'a1234', date:'27-05-2021', product:'Tijeras', price:'1000',quantity:'05'},
                        {code:'a1235', date:'01-06-2021', product:'Borrador', price:'2000',quantity:'12'},
                        {code:'a1236', date:'03-06-2021', product:'Cosedora', price:'1500',quantity:'11'},
                        {code:'a1237', date:'22-06-2021', product:'Folder tamaño carta', price:'1000',quantity:'09'},
                        {code:'a1238', date:'28-06-2021', product:'Caja de colores', price:'10000',quantity:'15'},
                        {code:'a1239', date:'11-07-2021', product:'Bisturi', price:'15000',quantity:'10'},
                        {code:'b1231', date:'13-07-2021', product:'Cinta de enmascarar', price:'1500',quantity:'05'},
                        {code:'b1232', date:'15-07-2021', product:'Tizas para tablero', price:'4000',quantity:'20'},
                        {code:'b1233', date:'29-07-2021', product:'Marcadores de vinilo', price:'1000',quantity:'10'},
                        {code:'b1234', date:'02-08-2021', product:'Portaminas', price:'3000',quantity:'12'},
                        {code:'b1235', date:'08-08-2021', product:'Regla', price:'3500',quantity:'05'},
                        {code:'b1236', date:'20-08-2021', product:'Diccionario', price:'3500',quantity:'12'},
                        {code:'b1236', date:'22-08-2021', product:'Libretilla Nacho lee', price:'3500',quantity:'20'},
                        {code:'b1237', date:'30-08-2021', product:'Papel globo', price:'600',quantity:'15'},
                        {code:'b1238', date:'01-09-2021', product:'Cartulina', price:'900',quantity:'10'},
                        {code:'b1239', date:'06-09-2021', product:'Fomi', price:'700',quantity:'05'},
                        {code:'c1231', date:'14-09-2021', product:'Liquid paper', price:'1000',quantity:'10'},
                        {code:'c1232', date:'21-09-2021', product:'Sacapuntas', price:'500',quantity:'15'},
                        {code:'c1233', date:'05-10-2021', product:'Vinilos', price:'2000',quantity:'05'},
                        {code:'c1234', date:'07-10-2021', product:'Pinceles', price:'2500',quantity:'12'},
                        {code:'c1235', date:'09-10-2021', product:'Escuadras', price:'3500',quantity:'20'},
                        {code:'c1236', date:'10-10-2021', product:'Papel silueta', price:'700',quantity:'10'},
                        {code:'c1237', date:'07-11-2021', product:'Carton paja', price:'1000',quantity:'10'},
                        {code:'c1238', date:'12-11-2021', product:'Colbón', price:'2000',quantity:'05'},
                        {code:'c1239', date:'15-11-2021', product:'Libreta de apuntes', price:'1500',quantity:'15'},
                        {code:'d1231', date:'16-11-2021', product:'Lapiz rojo', price:'900',quantity:'20'},
                        {code:'d1232', date:'19-12-2021', product:'Ganchos para cosedoras', price:'600',quantity:'10'}],
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