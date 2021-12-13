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
						<h5 class="p-mb-2 p-m-md-0 p-as-md-center">Ventas</h5>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                        </span>
					</div>
                </template>
                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="code" header="ID" :sortable="true" style="min-width:6rem"></Column>
                <Column field="date" header="Fecha" :sortable="true" style="min-width:10rem"></Column>
                <Column field="product" header="Producto" :sortable="true" style="min-width:10rem"></Column>
                <Column field="price" header="Precio" :sortable="true" style="min-width:10rem"></Column>
               
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
            products: [{code:'r1fgn',date:'01-07-2021', product:'Regla', price:'2000'},
                        {code:'d2fbf',date:'10-05-2021', product:'Diccionario', price:'35000'},
                        {code:'t3tjf',date:'12-06-2021', product:'Tijeras', price:'5000'},
                        {code:'g4fgv',date:'12-06-2021', product:'Grapadora', price:'8000'},
                        {code:'b5gda',date:'26-10-2021', product:'Block', price:'4000'},
                        {code:'l1ygn',date:'30-05-2021', product:'Lapicero', price:'1200'},
                        {code:'co1ñpb',date:'18-09-2021', product:'Colores', price:'14000'},
                        {code:'cc2ljgt',date:'24-12-2021', product:'Cartulina', price:'2000'},
                        {code:'rr2iuy',date:'01-06-2021', product:'Resma', price:'26000'},
                        {code:'v9kty',date:'28-10-2021', product:'Vinilo', price:'2600'},
                        {code:'p2zsw',date:'22-09-2021', product:'Pincel', price:'3200'},
                        {code:'c3tjf',date:'12-07-2021', product:'Colbon', price:'5000'},
                        {code:'ca4fgv',date:'12-08-2021', product:'Carpeta', price:'10000'},
                        {code:'l5gda',date:'26-10-2021', product:'Libreta', price:'16800'},
                        {code:'b1gngf',date:'25-11-2021', product:'Borrador', price:'800'},
                        {code:'t1xzz',date:'18-09-2021', product:'Tajalapiz', price:'700'},
                        {code:'m2lagt',date:'12-12-2021', product:'Micropuntas', price:'2500'},
                        {code:'co2sdz',date:'01-06-2021', product:'Compas', price:'14000'},
                        {code:'t9kty',date:'28-10-2021', product:'Transportador', price:'2600'},
                        {code:'pb2zsw',date:'22-09-2021', product:'Papel bond', price:'4000'},
                        {code:'pg8tjf',date:'19-07-2021', product:'Papel globo', price:'3000'},
                        {code:'m4fgv',date:'12-08-2021', product:'Marcador', price:'4000'},
                        {code:'s5gda',date:'26-10-2021', product:'Sobre', price:'1800'},
                        {code:'cl1dfb',date:'25-11-2021', product:'Cleeps', price:'2000'},
                        {code:'pc1jhn',date:'18-09-2021', product:'Papel Contact', price:'700'},
                        {code:'ar2lagt',date:'12-12-2021', product:'Archivador', price:'25000'},
                        {code:'la2sdz',date:'01-06-2021', product:'Lapiz', price:'1500'},
                        {code:'gr7jhn',date:'24-02-2021', product:'Grapas', price:'3500'},
                        {code:'ci2ggb',date:'12-12-2021', product:'Cinta', price:'4800'},
                        {code:'si2sdz',date:'20-08-2021', product:'Silicona', price:'4000'}],
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