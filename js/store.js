const products = [
    {
        id: 1,
        name: "Cisco Small Business SG500X-24",
        category: "Switch de red",
        image: "img/store/products/Cisco-Small-Business-SG500X-24---Conmutador---L3.webp",
        specs: ["24 Puertos Gigabit", "Capa L3 Administrable"],
        price: 1100,
        currency: "USD"
    },
    {
        id: 2,
        name: "Dell Server Intel Xeon 6353P",
        category: "Servidor",
        image: "img/store/products/Dell---Server---Intel-Xeon-6353P.webp",
        specs: ["Intel Xeon 6353P", "Alto rendimiento empresarial"],
        price: 4200,
        currency: "USD"
    },
    {
        id: 3,
        name: "HPE Server Rack-mountable",
        category: "Servidor",
        image: "img/store/products/HPE---Server---Rack-mountable.webp",
        specs: ["Formato Rack 2U", "Escalabilidad garantizada"],
        price: 3650,
        currency: "USD"
    },
    {
        id: 4,
        name: "MSI MAG B460 TOMAHAWK",
        category: "Motherboard",
        image: "img/store/products/MSI---MAG-B460-TOMAHAWK---Motherboard.webp",
        specs: ["Socket LGA 1200", "DDR4 hasta 128GB"],
        price: 195,
        currency: "USD"
    },
    {
        id: 5,
        name: "Nexxt Floor Cabinet 41U",
        category: "Rack de piso",
        image: "img/store/products/Nexxt-Floor-Cabinet-41U-600-x-600-mm-19-steel-Black.webp",
        specs: ["600 x 600 mm", "41 Unidades - Acero"],
        price: 545,
        currency: "USD"
    },
    {
        id: 6,
        name: "Ubiquiti UVC-AI-LPR-B",
        category: "Cámara de vigilancia",
        image: "img/store/products/Ubiquiti-UVC-AI-LPR-B---Network-surveillance-camera.webp",
        specs: ["Reconocimiento IA", "Visión nocturna HD"],
        price: 875,
        currency: "USD"
    }
];


const WHATSAPP_NUMBER = '593963759482';

function createProductCard(product, index = 0) {
    const specsHTML = product.specs
        .map(spec => `<li>${spec}</li>`)
        .join('');

    return `
        <article class="product-card" data-product-id="${product.id}" style="--card-index: ${index}">
            <div class="product-image-container">
                <img 
                    src="${product.image}" 
                    alt="${product.name}" 
                    class="product-image"
                    loading="lazy"
                >
            </div>
            
            <span class="product-category">${product.category}</span>
            <h4 class="product-name">${product.name}</h4>
            
            <ul class="product-specs">
                ${specsHTML}
            </ul>
            
            <p class="product-price">
                <span class="currency">${product.currency}</span> ${product.price.toLocaleString()}
            </p>
            
            <button class="btn-quote" data-product-id="${product.id}">
                Cotizar ahora
            </button>
        </article>
    `;
}

function renderProducts(containerSelector, productsList) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error(`Container "${containerSelector}" not found`);
        return;
    }

    if (!Array.isArray(productsList) || productsList.length === 0) {
        container.innerHTML = '<p class="no-products">No hay productos disponibles.</p>';
        return;
    }

    container.innerHTML = productsList
        .map((product, index) => createProductCard(product, index))
        .join('');
    
    attachQuoteButtonListeners(container);
}


function attachQuoteButtonListeners(container) {
    const buttons = container.querySelectorAll('.btn-quote');
    buttons.forEach(button => {
        button.addEventListener('click', handleQuoteRequest);
    });
}

function handleQuoteRequest(event) {
    const productId = Number(event.target.dataset.productId);
    const product = products.find(p => p.id === productId);

    if (product) {
        const message = 
            `Hola, me interesa cotizar:\n\n` +
            `Producto: *${product.name}*\n` +
            `Categoria: ${product.category}\n` +
            `Precio ref.: ${product.currency} ${product.price.toLocaleString()}\n\n` +
            `Podrian enviarme mas informacion y disponibilidad?`;

        openWhatsApp(message);
    }
}

// Integration with WhatsApp for service inquiry
function requestService(serviceName) {
    const message = 
        `Hola, me interesa el servicio de:\n\n` +
        `*${serviceName}*\n\n` +
        `Podrian contactarme para recibir mas informacion?`;

    openWhatsApp(message);
}


function openWhatsApp(message) {
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('#products-container', products);
});

